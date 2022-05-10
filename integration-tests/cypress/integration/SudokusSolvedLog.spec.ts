// describe("Sudokus Solved Logs ", () => {


//     it('publish challenge to the broker', () => {
//         const challengePayload = {
//             "challengeId": "9a152c01-5805-4489-a8fb-a5ee45ba01af",
//             "challengeName": "Koogle",
//             "teams": [
//               {
//                 "id": 0,
//                 "startDate": "2022-05-12T01:27",
//                 "teamName": "Delia",
//                 "members": 5,
//                 "solvedSudokus": 2,
//                 "sudokus": 8
//               },
//               {
//                 "id": 1,
//                 "startDate": "2022-05-09T08:11",
//                 "teamName": "Gillespie",
//                 "members": 4,
//                 "solvedSudokus": 6,
//                 "sudokus": 8
//               },
//               {
//                 "id": 2,
//                 "startDate": "2022-05-13T12:10",
//                 "teamName": "Bessie",
//                 "members": 4,
//                 "solvedSudokus": 0,
//                 "sudokus": 8
//               },
//               {
//                 "id": 3,
//                 "startDate": "2022-05-30T02:19",
//                 "teamName": "Isabelle",
//                 "members": 5,
//                 "solvedSudokus": 3,
//                 "sudokus": 8
//               },
//               {
//                 "id": 4,
//                 "startDate": "2022-05-24T01:32",
//                 "teamName": "Kris",
//                 "members": 2,
//                 "solvedSudokus": 0,
//                 "sudokus": 8
//               },
//               {
//                 "id": 5,
//                 "startDate": "2022-05-17T09:05",
//                 "teamName": "Walters",
//                 "members": 3,
//                 "solvedSudokus": 5,
//                 "sudokus": 8
//               },
//               {
//                 "id": 6,
//                 "startDate": "2022-05-25T08:29",
//                 "teamName": "Berry",
//                 "members": 4,
//                 "solvedSudokus": 5,
//                 "sudokus": 8
//               },
//               {
//                 "id": 7,
//                 "startDate": "2022-05-19T03:10",
//                 "teamName": "Leigh",
//                 "members": 3,
//                 "solvedSudokus": 7,
//                 "sudokus": 8
//               },
//               {
//                 "id": 8,
//                 "startDate": "2022-05-14T01:03",
//                 "teamName": "Potts",
//                 "members": 5,
//                 "solvedSudokus": 1,
//                 "sudokus": 8
//               },
//               {
//                 "id": 9,
//                 "startDate": "2022-05-15T07:42",
//                 "teamName": "Nikki",
//                 "members": 5,
//                 "solvedSudokus": 1,
//                 "sudokus": 8
//               }
//             ]
//         };

//         const event = {
//             topic: 'publish',
//             targetTopic: 'challenge-started',
//             time: new Date(),
//             payload: challengePayload
//         };
//     })

//     it("should open", () => {
//         cy.visit("http://localhost:4200")
//     })
// })

describe('My First Test', () => {
    it('clicking "type" navigates to a new url', () => {
      cy.visit('https://example.cypress.io')
  
      cy.contains('type').click()
  
      // Should be on a new URL which includes '/commands/actions'
      cy.url().should('include', '/commands/actions')
    })
  })