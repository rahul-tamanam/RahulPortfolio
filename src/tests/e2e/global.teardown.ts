import { test as teardown } from '@playwright/test'
import { eq, like } from 'drizzle-orm'

import { db } from '@/db'
import { sessions, users } from '@/db/schemas'
import { redis } from '@/lib/kv'

import { TEST_UNIQUE_ID } from './fixtures/auth'

teardown('teardown global', async () => {
  // Delete test user related data
  await db.delete(sessions).where(like(sessions.userId, TEST_UNIQUE_ID))
  await db.delete(users).where(eq(users.id, TEST_UNIQUE_ID))

  // Clean cache
  await redis.flushall()
})
