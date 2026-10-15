export const SITE_URL = 'https://comet08.dev'
export const SITE_NAME = 'comet.dev'
export const AUTHOR = '박성혜'

export const postUrl = (slug: string) => `${SITE_URL}/blog/${slug}/`
export const postDate = (date: string) => `${date}T00:00:00+09:00`
export const OG_IMAGE = { url: '/og-default.png', width: 1200, height: 630, alt: `${AUTHOR} — AI Agent Developer` }
