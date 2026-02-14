import { adminRouter } from './admin.router'
import { authRouter } from './auth.router'
import { r2Router } from './r2.router'
import { settingsRouter } from './settings.router'

export const router = {
  admin: adminRouter,
  auth: authRouter,
  r2: r2Router,
  settings: settingsRouter,
}
