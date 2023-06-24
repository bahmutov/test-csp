/// <reference types="cypress" />

describe('App', () => {
  it('serves Content-Security-Policy header', () => {
    cy.request('/')
      .its('headers')
      .should('have.property', 'content-security-policy')
      // confirm parts of the CSP directive
      .should('include', "default-src 'self'")
      .and('include', 'report-uri /security-attacks')
  })

  it('can strip CSP and allow injections', () => {
    cy.intercept('GET', '/', (req) =>
      req.continue((reply) => {
        delete reply.headers['content-security-policy']
      }),
    )
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'alert').as('alert')
      },
    })
    cy.get('@alert').should('have.been.calledOnce')
  })

  it('reports CSP violations', () => {
    cy.intercept('/security-attacks', {}).as('cspAttacks')
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'alert').as('alert')
      },
    })
    cy.wait('@cspAttacks').its('request.body').should('include', 'blocked')
    cy.get('@alert').should('not.be.called')
  })
})
