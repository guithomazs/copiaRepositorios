describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.get('header span#titulo').contains('SGCM')
  })
})
