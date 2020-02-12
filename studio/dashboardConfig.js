export default {
  widgets: [
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        data: [
          {title: 'Frontend', value: 'https://floatingdots.com', category: 'apps'}
        ]
      }
    },
    {
      name: 'document-list',
      options: {title: 'Recent edited posts', order: '_createdAt desc', types: ['news']},
      layout: {width: 'medium'}
    },
    {
      name: 'google-analytics',
      layout: {
        width: 'large'
      },
      options: {
        title: 'Last 1 year PV',
        gaConfig: {
          reportType: 'ga',
          query: {
            dimensions: 'ga:date',
            metrics: 'ga:pageViews',
            'start-date': '365daysAgo',
            'end-date': 'yesterday'
          },
          chart: {
            type: 'BAR',
            options: {
              width: '100%'
            }
          }
        }
      }
    },
    {
      name: 'google-analytics',
      layout: {
        width: 'large'
      },
      options: {
        title: 'Last 30 days',
        gaConfig: {
          reportType: 'ga',
          query: {
            dimensions: 'ga:date',
            metrics: 'ga:users, ga:sessions, ga:newUsers',
            'start-date': '30daysAgo',
            'end-date': 'yesterday'
          },
          chart: {
            type: 'BAR',
            options: {
              width: '100%'
            }
          }
        }
      }
    },
    {
      name: 'google-analytics',
      layout: {
        width: 'medium'
      },
      options: {
        title: 'Top 10 bouncing blog posts',
        gaConfig: {
          reportType: 'ga',
          query: {
            dimensions: 'ga:pagePath',
            'max-results': 10,
            metrics: 'ga:bounceRate, ga:bounces, ga:pageViews',
            sort: '-ga:bounceRate',
            'start-date': '30daysAgo',
            'end-date': 'yesterday',
            filters: 'ga:pagePath=~^/;ga:bounces>50'
          },
          chart: {
            type: 'TABLE',
            labels: {
              0: 'Page path',
              1: 'Bounce rate',
              2: 'Bounces',
              3: 'Page views'
            },
            options: {
              width: '100%'
            }
          }
        }
      }
    },
    {
      name: 'google-analytics',
      layout: {
        width: 'medium'
      },
      options: {
        title: 'Top 10 popular posts',
        gaConfig: {
          reportType: 'ga',
          query: {
            dimensions: 'ga:pagePath',
            'max-results': 10,
            metrics: 'ga:pageViews, ga:bounceRate, ga:bounces',
            sort: '-ga:pageViews',
            'start-date': '30daysAgo',
            'end-date': 'yesterday'
          },
          chart: {
            type: 'TABLE',
            labels: {
              0: 'Page path',
              1: 'Page views',
              2: 'Bounce rate',
              3: 'Bounces'
            },
            options: {
              width: '100%'
            }
          }
        }
      }
    }

  ]
}
