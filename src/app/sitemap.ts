import type { MetadataRoute } from 'next'
import posts from '@/data/posts.json'
import projects from '@/data/projects.json'
import { SITE_URL, postUrl, postDate } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const published = posts.filter((post) => !post.draft).sort((a, b) => b.date.localeCompare(a.date))
  const latest = published[0] ? postDate(published[0].date) : undefined

  return [
    { url: `${SITE_URL}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/about/`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/projects/`, changeFrequency: 'monthly', priority: 0.7 },
    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}/`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    { url: `${SITE_URL}/blog/`, lastModified: latest, changeFrequency: 'weekly', priority: 0.9 },
    ...published.map((post) => ({
      url: postUrl(post.slug),
      lastModified: postDate(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
