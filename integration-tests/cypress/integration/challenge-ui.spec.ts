

describe("the challenge ui ", () => {

    it("should open", () => {
        cy.visit("http://localhost:4200")
    })

    it("choose challenge 1", () => {
        cy.get('#name2').click()
        cy.get('#name1').click()
        cy.get('#name3').click()
    })

    it("going to the details", () => {
        cy.contains('name2').click()
    })
})