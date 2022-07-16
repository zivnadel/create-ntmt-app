context('App', () => {
  it('should load our app and show content', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Hello world!')
  })
})