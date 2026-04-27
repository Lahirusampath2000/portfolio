import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

/* ── Rate-limit: simple in-memory store (per deployment instance) ── */
const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT  = 3   // max submissions
const RATE_WINDOW = 60 * 60 * 1000 // per hour (ms)

function isRateLimited(ip: string): boolean {
  const now  = Date.now()
  const rec  = rateMap.get(ip)
  if (!rec || now > rec.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return false
  }
  if (rec.count >= RATE_LIMIT) return true
  rec.count++
  return false
}

/* ── Email template ── */
function buildHtml(name: string, email: string, subject: string, message: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Portfolio Message</title>
  <style>
    body        { margin:0; padding:0; background:#0f0f14; font-family:'Segoe UI',system-ui,sans-serif; }
    .wrap       { max-width:580px; margin:40px auto; background:#1a1a22; border-radius:24px; overflow:hidden;
                  border:1px solid rgba(76,175,114,0.2); }
    .header     { background:linear-gradient(135deg,#1e1e28,#27272e); padding:36px 32px 28px;
                  border-bottom:1px solid rgba(76,175,114,0.15); }
    .badge      { display:inline-flex; align-items:center; gap:6px; background:rgba(76,175,114,0.12);
                  border:1px solid rgba(76,175,114,0.3); border-radius:99px;
                  padding:4px 12px; margin-bottom:16px; }
    .badge-dot  { width:6px; height:6px; border-radius:50%; background:#4caf72; }
    .badge-txt  { font-size:10px; font-weight:800; letter-spacing:0.18em; text-transform:uppercase; color:#4caf72; }
    .h1         { font-size:26px; font-weight:900; color:#e8e8f0; margin:0; line-height:1.3; }
    .h1 span    { color:#4caf72; }
    .body       { padding:28px 32px; }
    .field      { margin-bottom:20px; }
    .field-lbl  { font-size:9px; font-weight:800; letter-spacing:0.22em; text-transform:uppercase;
                  color:#5a5a6a; margin-bottom:6px; }
    .field-val  { background:#0f0f14; border:1px solid rgba(76,175,114,0.15); border-radius:12px;
                  padding:12px 16px; color:#c8c8d8; font-size:14px; line-height:1.6; font-weight:500; }
    .msg        { white-space:pre-wrap; }
    .divider    { height:1px; background:linear-gradient(to right,rgba(76,175,114,0.4),transparent);
                  margin:24px 0; }
    .footer     { background:#13131a; padding:18px 32px; display:flex; align-items:center;
                  justify-content:space-between; border-top:1px solid rgba(255,255,255,0.04); }
    .footer-txt { font-size:10px; color:#4a4a5a; font-weight:600; }
    .footer-tag { font-size:10px; color:#4caf72; font-weight:700; letter-spacing:0.12em; }
    .reply-btn  { display:inline-block; margin-top:8px; background:linear-gradient(135deg,#4caf72,#3d9660);
                  color:#fff!important; text-decoration:none; padding:10px 22px; border-radius:99px;
                  font-size:11px; font-weight:800; letter-spacing:0.12em; text-transform:uppercase; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <div class="badge"><span class="badge-dot"></span><span class="badge-txt">New Message</span></div>
      <p class="h1">Portfolio <span>Contact</span><br/>Form Submission</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="field-lbl">From</div>
        <div class="field-val">${name}</div>
      </div>
      <div class="field">
        <div class="field-lbl">Email</div>
        <div class="field-val">${email}</div>
      </div>
      <div class="field">
        <div class="field-lbl">Subject</div>
        <div class="field-val">${subject}</div>
      </div>
      <div class="field">
        <div class="field-lbl">Message</div>
        <div class="field-val msg">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      </div>
      <div class="divider"></div>
      <p style="color:#9898a4;font-size:13px;font-weight:500;margin:0 0 12px;">
        Hit reply to respond directly to ${name}:
      </p>
      <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="reply-btn">↩ Reply Now</a>
    </div>
    <div class="footer">
      <span class="footer-txt">Sent from lahirusampath.dev · ${new Date().toUTCString()}</span>
      <span class="footer-tag">✦ Portfolio</span>
    </div>
  </div>
</body>
</html>
`
}

/* ── Auto-reply template ── */
function buildAutoReplyHtml(name: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <style>
    body    { margin:0; padding:0; background:#0f0f14; font-family:'Segoe UI',system-ui,sans-serif; }
    .wrap   { max-width:560px; margin:40px auto; background:#1a1a22; border-radius:24px; overflow:hidden;
              border:1px solid rgba(76,175,114,0.2); }
    .top    { background:linear-gradient(135deg,#4caf72,#3d9660); padding:36px 32px; text-align:center; }
    .emoji  { font-size:48px; display:block; margin-bottom:12px; }
    .title  { color:#fff; font-size:22px; font-weight:900; margin:0; }
    .body   { padding:28px 32px; color:#c8c8d8; font-size:14px; line-height:1.7; font-weight:500; }
    .name   { color:#4caf72; font-weight:800; }
    .footer { background:#13131a; padding:16px 32px; text-align:center;
              border-top:1px solid rgba(255,255,255,0.04); }
    .foot-t { font-size:10px; color:#4a4a5a; font-weight:600; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="top">
      <span class="emoji">👋</span>
      <p class="title">Thanks for reaching out!</p>
    </div>
    <div class="body">
      <p>Hey <span class="name">${name}</span>,</p>
      <p>Got your message — appreciate you taking the time to write! I personally read every message and will get back to you <strong style="color:#4caf72">within 24 hours</strong>.</p>
      <p>In the meantime, feel free to check out my work on <a href="https://github.com/lahirusampath" style="color:#4caf72">GitHub</a> or connect on <a href="https://linkedin.com/in/lahirusampath" style="color:#4caf72">LinkedIn</a>.</p>
      <p>Talk soon,<br/><strong style="color:#e8e8f0">Lahiru Sampath</strong><br/><span style="color:#5a5a6a;font-size:12px;">Full Stack Developer</span></p>
    </div>
    <div class="footer">
      <p class="foot-t">lahirusampath.dev · This is an automated reply.</p>
    </div>
  </div>
</body>
</html>
`
}

/* ── Handler ── */
export async function POST(req: NextRequest) {
  try {
    /* ── 1. Rate limit ── */
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please wait an hour.' }, { status: 429 })
    }

    /* ── 2. Parse body ── */
    const { name, email, subject, message } = await req.json()

    /* ── 3. Server-side validation ── */
    if (!name || name.trim().length < 2)      return NextResponse.json({ error: 'Invalid name' },    { status: 400 })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    if (!subject || subject.trim().length < 3) return NextResponse.json({ error: 'Invalid subject' }, { status: 400 })
    if (!message || message.trim().length < 20) return NextResponse.json({ error: 'Message too short' }, { status: 400 })

    const TO_EMAIL   = process.env.TO_EMAIL   ?? 'your@email.com'  // where YOU receive messages
    const FROM_EMAIL = process.env.FROM_EMAIL ?? 'portfolio@yourdomain.com' // must be verified in Resend

    /* ── 4. Send notification to you ── */
    await resend.emails.send({
      from:    `Portfolio Contact <${FROM_EMAIL}>`,
      to:      TO_EMAIL,
      replyTo: email,
      subject: `📬 New Message: ${subject}`,
      html:    buildHtml(name, email, subject, message),
    })

    /* ── 5. Send auto-reply to sender ── */
    await resend.emails.send({
      from:    `Lahiru Sampath <${FROM_EMAIL}>`,
      to:      email,
      subject: 'Got your message! I\'ll be in touch soon 👋',
      html:    buildAutoReplyHtml(name),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Contact API Error]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}