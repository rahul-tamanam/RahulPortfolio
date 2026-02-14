/**
 * Quick script to test database connection.
 * Run: pnpm with-env node scripts/test-db-connection.mjs
 */
import postgres from 'postgres'

const url = process.env.DATABASE_URL
if (!url) {
  console.error('❌ DATABASE_URL is not set')
  process.exit(1)
}

// Redact password for logging
const safeUrl = url.replace(/:([^@]+)@/, ':***@')
console.log('Testing connection to:', safeUrl)
console.log('')

const sql = postgres(url, { max: 1 })

try {
  const result = await sql`SELECT 1 as test`
  console.log('✅ Connection successful:', result)
} catch (err) {
  console.error('❌ Connection failed:', err.message)
  process.exit(1)
} finally {
  await sql.end()
}
