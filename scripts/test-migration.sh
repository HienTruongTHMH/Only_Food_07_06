#!/bin/bash

# Script test migration trên development environment
# Sử dụng: ./scripts/test-migration.sh

set -e

echo "🧪 Starting migration test..."

# Backup current environment
cp .env .env.backup

# Switch to test environment
if [ -f .env.test ]; then
    cp .env.test .env
    echo "🔄 Switched to test environment"
else
    echo "❌ .env.test not found. Please create test environment first."
    exit 1
fi

# Function to restore environment
restore_env() {
    mv .env.backup .env
    echo "♻️ Restored original environment"
}

# Trap to ensure we restore environment on exit
trap restore_env EXIT

echo "📊 Testing migration on test database..."

# Reset test database
echo "🗑️ Resetting test database..."
npx prisma migrate reset --force --skip-generate

# Apply migrations
echo "⚡ Applying migrations..."
npx prisma migrate deploy

# Generate client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Test data seeding
echo "🌱 Testing data seeding..."
npm run crawl

# Run some basic tests
echo "🔍 Running basic database tests..."
npx prisma db pull

# Test queries
echo "📝 Testing basic queries..."
npx tsx scripts/test-queries.ts

echo "✅ Migration test completed successfully!"
echo "🔄 Environment restored to original state"
