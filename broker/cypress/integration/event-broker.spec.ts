
describe('the event broker client', () => {

    it('opens a websocket',  () => {
        console.log('trying to open a websocket');
        cy.log('this test requires the event broker to run on localhost:3000')
        cy.visit('http://localhost:3000')
    })

})