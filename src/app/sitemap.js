export default function sitemap() {
  const url = 'http://localhost:3000';
  return [
    {
      url: url + '/dashboard',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: url + '/call',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: url + '/target',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: url + '/talk',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: url + '/user',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: url + '/login',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5
    },
    {
      url: url + '/record',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5
    }
  ]
}