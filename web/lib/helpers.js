const allLanguages = ['en', 'ja']

const {format, parseISO} = require('date-fns')
const fs = require('fs')
const path = require('path')
const i18next = require('i18next')
const nodeFsBackend = require('i18next-node-fs-backend')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
const srcPath = resolveApp('src')

module.exports = function getNewsUrl (publishedAt, slug) {
  return `https://floatingdots.com/news/${format(parseISO(publishedAt), 'yyyy/MM')}/${slug.current || slug}/`
}

module.exports = function toPlainText (blocks) {
  if (!blocks) {
    return ''
  }
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}

async function createI18nextInstance (language, namespaces) {
  const i18n = i18next.createInstance()
  i18n.use(nodeFsBackend)
  await new Promise(resolve =>
    i18n.init(
      {
        lng: language,
        ns: namespaces,
        fallbackLng: language,
        interpolation: {escapeValue: false},
        backend: {loadPath: `${srcPath}/locales/{{lng}}/{{ns}}.json`}
      },
      resolve
    )
  )
  return i18n
}

module.exports = async function buildI18nPages (
  inputData,
  pageDefinitionCallback,
  namespaces,
  createPage
) {
  if (!Array.isArray(inputData)) inputData = [inputData]
  await Promise.all(
    inputData.map(async ipt => {
      const definitions = await Promise.all(
        allLanguages.map(async language => {
          const i18n = await createI18nextInstance(language, namespaces)
          const res = pageDefinitionCallback(ipt, language, i18n)
          res.context.language = language
          res.context.i18nResources = i18n.services.resourceStore.data
          return res
        })
      )

      const alternateLinks = definitions.map(d => ({
        language: d.context.language,
        path: d.path
      }))

      definitions.forEach(d => {
        d.context.alternateLinks = alternateLinks
        createPage(d)
      })
    })
  )
}
