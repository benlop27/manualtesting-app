describe('01-PaginaPrincipal-PaginaCargaConMensaje', () => {
  it('passes', () => {
    cy.visit('https://manualtesting-dev-138959494334.us-central1.run.app/')

    cy.contains('¡Bienvenido a la suite de usuarios!')
    
  })
})