#!/bin/bash

# Script backup database trước khi migrate
# Sử dụng: ./scripts/backup-database.sh

set -e

# Tạo thư mục backup nếu chưa có
mkdir -p backups

# Tạo tên file backup với timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="backups/backup_${TIMESTAMP}.sql"

echo "🔄 Starting database backup..."

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Kiểm tra DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL not found in .env file"
    exit 1
fi

# Extract connection details từ DATABASE_URL
# Format: postgresql://username:password@host:port/database?schema=public
DB_DETAILS=$(echo $DATABASE_URL | sed 's/postgresql:\/\///' | sed 's/\?.*$//')
USER_PASS=$(echo $DB_DETAILS | cut -d'@' -f1)
HOST_PORT_DB=$(echo $DB_DETAILS | cut -d'@' -f2)

USERNAME=$(echo $USER_PASS | cut -d':' -f1)
PASSWORD=$(echo $USER_PASS | cut -d':' -f2)
HOST=$(echo $HOST_PORT_DB | cut -d':' -f1)
PORT=$(echo $HOST_PORT_DB | cut -d':' -f2 | cut -d'/' -f1)
DATABASE=$(echo $HOST_PORT_DB | cut -d'/' -f2)

echo "📊 Database: $DATABASE"
echo "🌐 Host: $HOST:$PORT"

# Tạo backup sử dụng pg_dump
PGPASSWORD="$PASSWORD" pg_dump \
    -h "$HOST" \
    -p "$PORT" \
    -U "$USERNAME" \
    -d "$DATABASE" \
    --no-password \
    --verbose \
    --clean \
    --if-exists \
    --create \
    --format=plain \
    > "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "✅ Backup completed successfully!"
    echo "📁 Backup file: $BACKUP_FILE"
    echo "📏 File size: $(du -h $BACKUP_FILE | cut -f1)"
else
    echo "❌ Backup failed!"
    exit 1
fi

# Giữ lại chỉ 10 backup gần nhất
echo "🧹 Cleaning old backups (keeping latest 10)..."
ls -t backups/backup_*.sql | tail -n +11 | xargs -I {} rm -- {}

echo "🎉 Backup process completed!"
