#!/bin/bash

# Script để apply migration sau khi edit manual
# Sử dụng: ./scripts/apply-manual-migration.sh

set -e

echo "🚀 Applying manual migration..."

# Backup trước khi apply
echo "💾 Creating backup before migration..."
npm run db:backup

# Kiểm tra migration status
echo "📊 Current migration status:"
npx prisma migrate status

echo ""
echo "⚠️  WARNING: About to apply pending migrations"
echo "   Make sure you have:"
echo "   ✅ Reviewed the migration SQL file"
echo "   ✅ Tested on development environment"
echo "   ✅ Created backup"
echo ""

read -p "🤔 Continue with migration? (y/N): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "⚡ Applying migration..."
    
    # Apply migration
    npx prisma migrate dev
    
    # Generate Prisma client
    echo "🔧 Generating Prisma client..."
    npx prisma generate
    
    # Verify migration
    echo "🔍 Verifying migration..."
    npx prisma migrate status
    
    # Test basic queries
    echo "🧪 Testing basic queries..."
    npx tsx scripts/test-queries.ts
    
    echo "✅ Migration applied successfully!"
    echo "🔄 Don't forget to restart your application"
    
else
    echo "❌ Migration cancelled"
    exit 1
fi
