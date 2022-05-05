
let messageList = []

describe("the event broker" , () => {
    it("is up and running", () => {
        cy.visit("http://localhost:3333")
    })

    it("accepts events via http.post", () => {
        const event = {
            topic: 'publish',
            targetTopic: 'user-created',
            payload: {
                userName: 'Bob',
                token: '21345621'
            }
        }
        const text = JSON.stringify(event, null, 3)
        cy.request('POST', 'http://localhost:3333/publish', event).then((response) => {
            // response.body is automatically serialized into JSON
            expect(response.body).equal('Thank you') // true
        })

        // one more user
        event.payload.userName = 'Carli'
        event.payload.token = '12345722'

        cy.request('POST', 'http://localhost:3333/publish', event).then((response) => {
            // response.body is automatically serialized into JSON
            expect(response.body).equal('Thank you') // true
        })
    })

    it('delivers lists of events if asked via http.get', () => {
        cy.request('GET', 'http://localhost:3333/topic?id=user-created')
        .then((response) => {
            messageList.push(response.body)
            console.log('get response.body is ' + response.body)
        })
    })

})