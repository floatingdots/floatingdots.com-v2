const {isFuture, parseISO} = require('date-fns')
const {buildI18nPages} = require('./helpers')

exports.createProjectsArchives = async function (graphql, actions, reporter) {
  reporter.info('--------------------Projects Archives----------------------')
  const currentDateTime = new Date().toISOString()
  const {createPage} = actions
  const locales = []

  await graphql(`
  query projectsArchives ($currentDateTime: Date!) {
    projects: allSanityProjects (
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
  `, {currentDateTime: currentDateTime}).then(async result => {
    if (result.errors) {
      throw result.errors
    }
    const postsPerPage = 8
    const projectsLength = result.data.projects.edges.length
    const numPages = Math.ceil(projectsLength / postsPerPage)

    reporter.info(`Total Projects: ${projectsLength}, Toal archive pages: ${numPages}`)

    const archiveTopPages = buildI18nPages(
      null,
      (_, lang) => ({
        path: lang === 'en' ? '/projects/' : `/${lang}/projects/`,
        component: require.resolve(`../src/templates/projects-archive.js`),
        context: {
          limit: postsPerPage,
          skip: 0,
          numPages,
          currentPage: 1,
          currentDatetime: currentDateTime
        }
      }),
      ['common', ...locales], // Must incled common to show language switcher
      createPage,
      reporter
    ).then(() => {
      return 'test'
    })

    const archivePages = Promise.all(Array.from({length: numPages}).map(async (_, i) => {
      await buildI18nPages(
        null,
        (_, lang) => ({
          path: i === 0 ? lang === 'en' ? '/projects/archive' : `/${lang}/projects/archive` : lang === 'en' ? `/projects/archive/${i + 1}/` : `/${lang}/projects/archive/${i + 1}/`,
          component: require.resolve(`../src/templates/projects-archive.js`),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
            currentDatetime: currentDateTime
          }
        }),
        ['common', ...locales], // Must incled common to show language switcher
        createPage,
        reporter
      )
    }))
    await Promise.all([archiveTopPages, archivePages])
  })
}

exports.createProjectsPages = async function (graphql, actions, reporter) {
  const currentDateTime = new Date().toISOString()
  const {createPage} = actions
  reporter.info('--------------------Projects Pages----------------------')
  await graphql(`
  query projects ($currentDateTime: Date!) {
    projects: allSanityProjects (
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
  `, {currentDateTime: currentDateTime}).then(async (result) => {
    if (result.errors) {
      throw result.errors
    }
    const postEdges = (result.data.projects || {}).edges || []
    const filteredEdges = postEdges.filter(edge => !isFuture(parseISO(edge.node.publishedAt)))
    const locales = []

    const i18nPages = filteredEdges.map(p => buildI18nPages(
      null,
      (_, lang) => ({
        path: lang === 'en' ? `/projects/${p.node.slug.current}` : `/${lang}/projects/${p.node.slug.current}`,
        component: require.resolve('../src/templates/projects.js'),
        context: {
          id: p.node.id,
          currentDatetime: currentDateTime
        }
      }),
      ['common', ...locales], // Must incled common to show language switcher
      createPage,
      reporter
    ))

    await Promise.all(i18nPages)
  })
}
