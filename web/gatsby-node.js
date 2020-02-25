const schedulePosts = require('./lib/schedulePosts')
const addCurrentDatetime = require('./lib/addCurrentDatetime')

const createPagePages = require('./lib/createPage')
const {createProjectsPages, createProjectsArchives} = require('./lib/createProjects')
const {createBlogArchives, createBlogPages} = require('./lib/createBlog')

const createLocaleResolvers = require('./lib/createLocaleResolvers')

exports.onPreBuild = async ({graphql, reporter}) => {
  // await schedulePosts(graphql, reporter)
}

exports.onCreatePage = async ({page, actions, reporter}) => {
  await addCurrentDatetime(page, actions, reporter)
}

exports.createPages = async ({graphql, actions, reporter}) => {
  await createPagePages(graphql, actions, reporter)
  await createProjectsArchives(graphql, actions, reporter)
  await createProjectsPages(graphql, actions, reporter)
  await createBlogArchives(graphql, actions, reporter)
  await createBlogPages(graphql, actions, reporter)
}

exports.createResolvers = ({createResolvers}) => {
  createLocaleResolvers(createResolvers)
}
