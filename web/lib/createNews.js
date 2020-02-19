const {format, isFuture, parseISO} = require('date-fns')

exports.createNewsArchives = async function createNewsArchives (graphql, actions, reporter) {
  const currentDateTime = new Date().toISOString()
  const {createPage} = actions

  return graphql(`
  query newsArchives ($currentDateTime: Date!) {
    news: allSanityNews (
      filter: { slug: { current: { ne: null } }, publishedAt: { lte: $currentDateTime } }
    ){
      edges{
        node {
          slug {
            current
          }
          id
        }
      }
    }
  }
`, {currentDateTime: currentDateTime}).then(result => {
    if (result.errors) {
      throw result.errors
    }
    const postsPerPage = 10
    const newsLength = result.data.news.edges.length
    reporter.info(`Total News: ${newsLength}`)
    const numPages = Math.ceil(newsLength / postsPerPage)
    const path = '/news/'

    reporter.info(`Creating News Archives: ${path}`)

    createPage({
      path,
      component: require.resolve('../src/templates/news-archive.js'),
      context: {
        limit: postsPerPage,
        skip: 0,
        numPages,
        currentPage: 1,
        currentDatetime: currentDateTime
      }
    })

    Array.from({length: numPages}).forEach((_, i) => {
      const path = i === 0 ? `/news/archive/` : `/news/archive/${i + 1}/`
      reporter.info(`Creating News Archives: ${path}`)
      createPage({
        path,
        component: require.resolve('../src/templates/news-archive.js'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          currentDatetime: currentDateTime
        }
      })
    })
  })
}

exports.createNewsPages = async function createNewsPages (graphql, actions, reporter) {
  const currentDateTime = new Date().toISOString()
  const {createPage} = actions
  return graphql(`
  query newsArchives ($currentDateTime: Date!) {
    news: allSanityNews (
      filter: { slug: { current: { ne: null } }, publishedAt: { lte: $currentDateTime } }
    ){
      edges {
        node {
          id
          publishedAt
          slug {
            current
          }
        }
      }
    }
  }
  `, {currentDateTime: currentDateTime}).then(result => {
    if (result.errors) {
      throw result.errors
    }
    const postEdges = (result.data.news || {}).edges || []

    postEdges
      .filter(edge => !isFuture(parseISO(edge.node.publishedAt)))
      .forEach((edge, index) => {
        const {id, slug = {}, publishedAt} = edge.node
        const dateSegment = format(parseISO(publishedAt), 'yyyy/MM')
        const path = `/news/${dateSegment}/${slug.current}/`

        reporter.info(`Creating news page: ${path}`)

        createPage({
          path,
          component: require.resolve('../src/templates/news.js'),
          context: {id},
          currentDatetime: currentDateTime
        })
      })
  })
}
