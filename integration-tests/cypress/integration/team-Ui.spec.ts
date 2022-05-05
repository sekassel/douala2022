describe('team Test', () =>{
    it('Visite the teams-UI', () => {
        cy.visit('http://localhost:4200/manageTeams')
    })

    it('clicks on create team', () =>{
        cy.get('#createMore').click()
         cy.contains('Create the new Team')
    })

    it('creating of team', () =>{
        cy.get('#use').type('Grace')
        cy.get('#teamName').type('Team B')
        cy.get('#newTeam').click()
    })

    it('clicks on manage my team', () =>{
        cy.get('#handle-invitations').click()
        cy.contains('Teams Overview')
    })
})