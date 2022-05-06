
let messageList = []

describe("the event broker" , () => {
    it("is up and running", () => {
        cy.request('GET', "http://localhost:3333")
        .then((res) => {
            messageList.push(res.body)
        })
    })

    it('gets a response', () => {
        cy.log(messageList)
        messageList = []
    })

    it("accepts events via http.post", () => {
        const event = {
            topic: 'publish',
            time: 'Wednesday 09:15',
            targetTopic: 'user-created',
            payload: {
                userName: 'Bob',
                token: '21345621'
            }
        }
        const text = JSON.stringify(event, null, 3)
        cy.request('POST', 'http://localhost:3333/publish', event).then((response) => {
            // response.body is automatically serialized into JSON
            expect(JSON.stringify(response.body)).equal(JSON.stringify({ msg: 'Thank you'}))
        })

        const event2 = {
            topic: 'publish',
            targetTopic: 'user-created',
            payload: {
                userName: 'Carli',
                token: '12345722'
            }
        }

        cy.request('POST', 'http://localhost:3333/publish', event2).then((response) => {
            // response.body is automatically serialized into JSON
            expect(JSON.stringify(response.body)).equal(JSON.stringify({ msg: 'Thank you'}))
        })
    })

    it('delivers lists of events if asked via http.get', () => {
        cy.request('GET', 'http://localhost:3333/topic?id=user-created')
        .then((response) => {
            const list : any[] = JSON.parse(response.body)
            messageList.push(list)
            messageList.push('this size of the list is ' + list.length)
            console.log('get response.body is ' + response.body)
        })
    })

    it('logs the response', () => {
        cy.log(messageList)
        messageList = []
    })
})