/// <reference types="cypress" />

describe('App', () => {
  it.only('loads', () => {
    // we are only interested in the root document
    const url = Cypress.config('baseUrl') + '/'
    cy.route2('/', (req) => {
      if (req.url === url) {
        return req.reply((res) => {
          const csp = res.headers['content-security-policy']
          // really simply <HEAD> rewriting
          // to only insert the CSP meta tag
          res.body = res.body.replace(
            '<head> </head>',
            `
            <head>
              <meta http-equiv="Content-Security-Policy" content="${csp} ">
            </head>
          `,
          )
        })
      }
    })
    cy.visit('/')
  })

  it('works', () => {
    const url = Cypress.config('baseUrl') + '/'
    cy.route2('/', (req) => {
      console.log(req)
      if (req.url === url) {
        console.log('document')
        return req.reply((res) => {
          console.log('server response')
          console.log(res)
          // this will be stripped
          res.headers['content-security-policy'] = 'foo'
        })
      }
    })
    cy.visit('/')
    cy.contains('p', 'Hi').should('be.visible')
  })
})
