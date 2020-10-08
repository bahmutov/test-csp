/// <reference types="cypress" />

describe('App', () => {
  it('works', () => {
    const url = Cypress.config('baseUrl') + '/'
    cy.route2('/', (req) => {
      console.log(req)
      if (req.url === url) {
        console.log('document')
        return req.reply(res => {
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
