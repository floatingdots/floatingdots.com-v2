module.exports = function createResolvers (createResolvers) {
  createResolvers({
    SanityLocaleString: {
      locale: {
        type: `String!`,
        args: {language: {type: 'String'}},
        resolve: (source, args) => {
          return source[args.language] || source['en']
        }
      }
    },
    SanityLocaleText: {
      locale: {
        type: `String!`,
        args: {language: {type: 'String'}},
        resolve: (source, args) => {
          return source[args.language] || source['en']
        }
      }
    },
    SanityLocaleExcerptPortableText: {
      locale: {
        type: `String!`,
        args: {language: {type: 'String'}},
        resolve: (source, args) => {
          return source[args.language] || source['en']
        }
      }
    },
    SanityLocaleBodyPortableText: {
      locale: {
        type: `String!`,
        args: {language: {type: 'String'}},
        resolve: (source, args) => {
          return source[args.language] || source['en']
        }
      }
    }
  })
}
