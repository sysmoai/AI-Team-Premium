# AI Team Premium — Database Setup Guide

## Overview
AI Team Premium uses PostgreSQL with Drizzle ORM. To run the development server, you need to configure a PostgreSQL database connection.

## Quick Start Options

### Option 1: Supabase (Recommended for Development)
Free PostgreSQL hosting with 500MB storage.

1. Go to [supabase.com](https://supabase.com)
2. Sign up for free account
3. Create new project
4. Copy the connection string from Settings → Database → Connection string
5. Update `.env` file:
   ```
   DATABASE_URL=postgresql://[user]:[password]@[host]:5432/[database]
   ```

### Option 2: Local PostgreSQL Installation

#### Windows
1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Install with default settings (remember admin password)
3. Open pgAdmin or Command Prompt
4. Create database:
   ```sql
   CREATE DATABASE aiteampremium_dev;
   ```
5. Update `.env`:
   ```
   DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/aiteampremium_dev
   ```

#### macOS
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql

# Create database
createdb aiteampremium_dev

# Update .env
DATABASE_URL=postgresql://localhost/aiteampremium_dev
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql

# Create database
sudo -u postgres createdb aiteampremium_dev

# Update .env
DATABASE_URL=postgresql://postgres:password@localhost:5432/aiteampremium_dev
```

### Option 3: Docker (Fastest)
```bash
# Run PostgreSQL container
docker run --name aiteampremium-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=aiteampremium \
  -p 5432:5432 \
  -d postgres:latest

# Update .env
DATABASE_URL=postgresql://postgres:password@localhost:5432/aiteampremium
```

## Configuration

### 1. Set Environment Variables

Update `.env` file in project root:
```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/database_name

# Server
NODE_ENV=development
PORT=5001
HOST=0.0.0.0

# Security
JWT_SECRET=your_jwt_secret_key_here
SESSION_SECRET=your_session_secret_here
BCRYPT_ROUNDS=10
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Database Migrations
```bash
npm run migrate
# or
npx drizzle-kit push:pg
```

### 4. Start Development Server
```bash
npm run dev
# Server will start on http://localhost:5001
```

## Verification

### Check Database Connection
```bash
# Using psql
psql -h localhost -U postgres -d aiteampremium_dev -c "\dt"

# Should show tables like:
# - users
# - teams
# - projects
# - etc.
```

### Verify Dev Server
```bash
curl http://localhost:5001/health
# Should return: {"status": "ok"}
```

## Troubleshooting

### Error: "connect ECONNREFUSED 127.0.0.1:5432"
**Solution:** PostgreSQL is not running
- Windows: Start PostgreSQL service
- macOS: `brew services start postgresql`
- Linux: `sudo systemctl start postgresql`
- Docker: `docker start aiteampremium-db`

### Error: "database does not exist"
**Solution:** Create the database
```bash
createdb aiteampremium_dev
# or in psql:
CREATE DATABASE aiteampremium_dev;
```

### Error: "FATAL: password authentication failed"
**Solution:** Check credentials in DATABASE_URL
```bash
# Test connection with psql
psql postgresql://user:password@localhost:5432/aiteampremium_dev
```

### Error: "command not found: psql"
**Solution:** PostgreSQL CLI not in PATH
- Windows: Add `C:\Program Files\PostgreSQL\15\bin` to PATH
- macOS: `brew link postgresql`
- Linux: `sudo apt install postgresql-client`

## Database Schema

Tables created by Drizzle migrations:
- `users` — User accounts and profiles
- `teams` — Team management
- `projects` — Project records
- `subscriptions` — Team subscriptions
- `audit_logs` — Activity tracking
- etc. (check `shared/schema.ts` for complete schema)

## Environment-Specific Configurations

### Development
```
NODE_ENV=development
DATABASE_URL=postgresql://localhost/aiteampremium_dev
LOG_LEVEL=debug
```

### Production
```
NODE_ENV=production
DATABASE_URL=<Supabase or RDS URL>
LOG_LEVEL=info
JWT_SECRET=<strong-secret>
SESSION_SECRET=<strong-secret>
```

## SSL Connection (For Production)

If your PostgreSQL uses SSL:
```
DATABASE_URL=postgresql://user:password@host:5432/db?sslmode=require
```

## Performance Optimization

### Connection Pooling
Already configured via Drizzle with:
- Min connections: 5
- Max connections: 10
- Connection timeout: 30s

### Query Optimization
Monitor slow queries in `server/db.ts` and optimize via Drizzle relations.

## Backup & Recovery

### Backup Database
```bash
pg_dump aiteampremium_dev > backup.sql
```

### Restore Database
```bash
psql aiteampremium_dev < backup.sql
```

## Next Steps

1. ✅ Install PostgreSQL or set up Supabase
2. ✅ Update `.env` with DATABASE_URL
3. ✅ Run `npm install`
4. ✅ Run `npm run migrate`
5. ✅ Run `npm run dev`
6. ✅ Verify at `http://localhost:5001`

## Support

For issues:
1. Check `.env` file is in project root
2. Verify DATABASE_URL format
3. Check PostgreSQL is running
4. Review server logs for errors
5. See `BLOCKERS.md` for known issues

---

*Last Updated: July 27, 2026*  
*Status: Database setup required before dev server start*
