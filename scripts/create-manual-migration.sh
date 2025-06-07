#!/bin/bash

# Script helper để tạo và edit migration manually
# Sử dụng: ./scripts/create-manual-migration.sh "migration_name"

set -e

if [ -z "$1" ]; then
    echo "❌ Usage: ./scripts/create-manual-migration.sh \"migration_name\""
    echo "   Example: ./scripts/create-manual-migration.sh \"add_indexes_to_recipes\""
    exit 1
fi

MIGRATION_NAME="$1"

echo "🔧 Creating migration: $MIGRATION_NAME"

# Step 1: Create migration file only
echo "1️⃣ Creating migration file (--create-only)..."
npx prisma migrate dev --create-only --name "$MIGRATION_NAME"

# Find the latest migration file
LATEST_MIGRATION=$(find prisma/migrations -name "*$MIGRATION_NAME" -type d | sort | tail -1)
MIGRATION_FILE="$LATEST_MIGRATION/migration.sql"

if [ -f "$MIGRATION_FILE" ]; then
    echo "📝 Migration file created: $MIGRATION_FILE"
    echo ""
    echo "🔍 Current migration content:"
    echo "─────────────────────────────────────"
    cat "$MIGRATION_FILE"
    echo "─────────────────────────────────────"
    echo ""
    
    echo "✏️ Steps to edit migration manually:"
    echo "1. Edit file: $MIGRATION_FILE"
    echo "2. Add your custom SQL commands"
    echo "3. Run: npx prisma migrate dev (without --create-only)"
    echo "4. Or run: ./scripts/apply-manual-migration.sh"
    echo ""
    echo "💡 Common manual edits:"
    echo "   - Add custom indexes"
    echo "   - Data transformations"
    echo "   - Complex ALTER statements"
    echo "   - Conditional logic"
    
    # Open file in default editor if available
    if command -v code >/dev/null 2>&1; then
        echo ""
        echo "🚀 Opening migration file in VS Code..."
        code "$MIGRATION_FILE"
    fi
else
    echo "❌ Migration file not found: $MIGRATION_FILE"
    exit 1
fi
