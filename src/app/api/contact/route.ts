import { NextResponse } from 'next/server'

import { Resend } from 'resend'

import { env } from '@/lib/env'
import { MY_NAME } from '@/lib/constants'

const CONTACT_EMAIL = env.AUTHOR_EMAIL ?? 'rahultamanam24@gmail.com'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body as { name?: string; email?: string; message?: string }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    if (!env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not set. Skipping email sending.')
      return NextResponse.json({ error: 'Email service not configured. Add RESEND_API_KEY to .env.local' }, { status: 503 })
    }

    const resend = new Resend(env.RESEND_API_KEY)

    // Use Resend's test domain for unverified domains. Change to 'me@nelsonlai.dev' once your domain is verified in Resend.
    const fromAddress = 'onboarding@resend.dev'

    const { error } = await resend.emails.send({
      from: `${MY_NAME} <${fromAddress}>`,
      to: CONTACT_EMAIL,
      replyTo: email.trim(),
      subject: `Contact form: ${name.trim()}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(message.trim())}</pre>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Contact form error:', e)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
