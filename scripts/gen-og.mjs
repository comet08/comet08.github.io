import sharp from 'sharp'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0f172a"/>
  <rect x="80" y="80" width="8" height="470" fill="#38bdf8"/>
  <text x="120" y="250" font-family="Apple SD Gothic Neo, Noto Sans CJK KR, sans-serif" font-size="84" font-weight="800" fill="#f8fafc">박성혜</text>
  <text x="120" y="340" font-family="Apple SD Gothic Neo, Noto Sans CJK KR, sans-serif" font-size="44" fill="#94a3b8">AI Agent Developer</text>
  <text x="120" y="500" font-family="Apple SD Gothic Neo, Noto Sans CJK KR, sans-serif" font-size="36" fill="#38bdf8">comet.dev · 개발 기록</text>
</svg>`

await sharp(Buffer.from(svg)).png().toFile('public/og-default.png')
