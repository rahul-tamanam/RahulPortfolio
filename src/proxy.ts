import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

import { env } from '@/lib/env'

const IS_PREVIEW = env.VERCEL_ENV === 'preview'

export function proxy(_request: NextRequest) {
  const csp = `
    default-src 'none';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.nelsonlai.dev https://*.posthog.com https://va.vercel-scripts.com ${IS_PREVIEW ? 'https://vercel.live' : ''};
    style-src 'self' 'unsafe-inline' https://*.posthog.com ${IS_PREVIEW ? 'https://vercel.live' : ''};
    img-src 'self' data: https://avatars.githubusercontent.com https://*.googleusercontent.com https://*.posthog.com https://github.com https://images.unsplash.com ${env.CLOUDFLARE_R2_PUBLIC_URL} ${IS_PREVIEW ? 'https://vercel.live https://vercel.com blob:' : ''};
    font-src 'self' https://*.posthog.com ${IS_PREVIEW ? 'https://vercel.live https://assets.vercel.com' : ''};
    worker-src 'self' blob:;
    object-src 'none';
    base-uri 'none';
    form-action 'none';
    connect-src 'self' https://*.nelsonlai.dev https://*.posthog.com ${env.CLOUDFLARE_R2_ENDPOINT} ${IS_PREVIEW ? 'https://vercel.live wss://ws-us3.pusher.com' : ''};
    media-src 'self' https://*.posthog.com;
    manifest-src 'self';
    frame-ancestors 'self' https://*.posthog.com;
    ${IS_PREVIEW ? 'frame-src https://vercel.live;' : ''}
  `

  const response = NextResponse.next()

  response.headers.set('Content-Security-Policy', csp.replaceAll('\n', ''))

  return response
}

export const config = {
  matcher: [
    '/((?!api|rpc|_next/static|_next/image|_vercel|_ph|favicon|android-chrome|apple-touch-icon|fonts|images|videos|favicon.ico|sitemap.xml|robots.txt|site.webmanifest).*)',
  ],
}
