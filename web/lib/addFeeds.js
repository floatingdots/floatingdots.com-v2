const {isFuture, parseISO} = require('date-fns')
const {toPlainText, getNewsUrl} = require('./helpers')

module.exports = {
  feeds: [
    {
      serialize: ({query: {site, allSanityNews}}) => {
        return allSanityNews.edges
          .filter(edge => !isFuture(parseISO(edge.node.publishedAt)))
          .filter(edge => (edge.node.slug || {}).current)
          .map(edge => {
            return Object.assign({}, edge.node, {
              description: toPlainText(edge.node._rawExcerpt),
              date: edge.node.publishedAt,
              url: getNewsUrl(edge.node.publishedAt, edge.node.slug.current),
              guid: getNewsUrl(edge.node.publishedAt, edge.node.slug.current),
              custom_elements: [{'content:encoded': edge.node._rawBody}]
            })
          })
      },
      query: `
        {
          allSanityNews(
            sort: { fields: [publishedAt], order: DESC }
            filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
          ) {
            edges {
              node {
                publishedAt
                title
                slug{
                  current
                }
                _rawExcerpt(resolveReferences: {maxDepth: 5})
                _rawBody(resolveReferences: {maxDepth: 5})
              }
            }
          }
        }
      `,
      output: '/rss.xml',
      match: '^/news/',
      title: 'Floating Dots',
      description: 'Floating Dots - News Feed',
      language: 'en-US',
      site_url: 'https://floatongdots.com',
      feed_url: 'https://floatongdots.com/rss.xml',
      image_url: 'https://floatongdots.com/icons/icon-512x512.png',
      custom_namespaces: {
        webfeeds: 'http://webfeeds.org/rss/1.0'
      },
      custom_elements: [
        {'webfeeds:icon': 'https://floatingdots.com/icons/icon-512x512.png'}
      ]
    }
  ]
}
