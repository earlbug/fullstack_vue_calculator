describe('Feedback form e2e', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('has submit disabled then enables after filling fields', () => {
    cy.visit('http://localhost:5173/feedback')
    // find submit button

    cy.intercept('post', 'https://my-json-server.typicode.com/earlbug/fullstack_vue_calculator/feedbackEntry')
    .as('postFeedback')

    cy.contains('button', 'Submit').should('be.disabled')

    // fill name and email and feedback
    cy.get('input[placeholder="Name"]').type('Test User')
    cy.get('input[placeholder="E-mail"]').type('test@example.com')
    cy.get('textarea[placeholder="Feedback"]').type('Nice app')

    // submit should be enabled
    cy.contains('button', 'Submit').should('not.be.disabled')

    cy.contains('button', 'Submit').click()

    cy.wait('@postFeedback').then(({ request, response }) => {
      // assert request payload
      expect(request.body).to.include({
        name: 'Test User',
        email: 'test@example.com',
        feedback: 'Nice app'
      })

      // assert response contains the sent values (if the server echoes them)
      expect(response && response.body).to.include(request.body)

  })
})
})
