describe("login page ", () => {

  it("should open", () => {
      cy.visit("https://sudoku-login.herokuapp.com/")
  })

  it('clicks on create team', () =>{
    cy.get('#username').type('Rene')
     cy.get('#password').type('secret')
})
})
