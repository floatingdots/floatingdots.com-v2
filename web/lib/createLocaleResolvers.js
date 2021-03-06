module.exports = function createResolvers (createResolvers) {
  createResolvers({
    SanityLocaleString: {
      locale: {
        type: 'String!',
        args: {language: {type: 'String'}},
        resolve: (source, args) => {
          return source[args.language] || ''
        }
      }
    },
    SanityLocaleText: {
      locale: {
        type: 'String!',
        args: {language: {type: 'String'}},
        resolve: (source, args) => {
          return source[args.language] || ''
        }
      }
    },
    SanityLocaleShortText: {
      locale: {
        type: 'String!',
        args: {language: {type: 'String'}},
        resolve: (source, args) => {
          return source[args.language] || ''
        }
      }
    },
    SanityLocaleExcerptPortableText: {
      locale: {
        type: 'JSON!',
        args: {language: {type: 'String'}},
        resolve: (source, args) => {
          return source[args.language] || {}
        }
      }
    },
    SanityLocaleBodyPortableText: {
      locale: {
        type: 'JSON!',
        args: {language: {type: 'String'}},
        resolve: (source, args) => {
          return source[args.language] || {}
        }
      }
    }
  })
}
