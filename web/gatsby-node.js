const schedulePosts = require('./lib/schedulePosts')
const addCurrentDatetime = require('./lib/addCurrentDatetime')
const handle404Page = require('./lib/handle404Page')

const createPagePages = require('./lib/createPage')
const {createProjectsPages, createProjectsArchives} = require('./lib/createProjects')
const {createBlogArchives, createBlogPages} = require('./lib/createBlog')
const {createCareersPages} = require('./lib/createCareers')

const createLocaleResolvers = require('./lib/createLocaleResolvers')

exports.onPreBuild = async ({graphql, reporter}) => {
  await schedulePosts(graphql, reporter)
}

exports.onCreatePage = async ({page, actions, reporter}) => {
  await Promise.all([addCurrentDatetime(page, actions, reporter), handle404Page(page, actions, reporter)])
}

exports.createPages = async ({graphql, actions, reporter}) => {
  await createPagePages(graphql, actions, reporter)
  await createProjectsArchives(graphql, actions, reporter)
  await createProjectsPages(graphql, actions, reporter)
  await createBlogArchives(graphql, actions, reporter)
  await createBlogPages(graphql, actions, reporter)
  await createCareersPages(graphql, actions, reporter)
}

exports.createResolvers = ({createResolvers}) => {
  createLocaleResolvers(createResolvers)
}
