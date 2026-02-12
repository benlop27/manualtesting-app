describe('Suite de pruebas: Página Principal', () => {
  before(() => {
    // Cargar la página una sola vez antes de todos los tests
    cy.visit('https://manualtesting-dev-138959494334.us-central1.run.app/')
  })

  it('Página carga con mensaje de bienvenida', () => {
    cy.contains('¡Bienvenido a la suite de usuarios!')
  })

  it('Página no muestra errores', () => {
    cy.get('body').should('not.contain', 'Error')
  })

  it('Página muestra tabla', () => {
    cy.get('table').should('exist')
  })

  it('Tabla tiene datos', () => {
    cy.get('table tbody tr').its('length').should('be.gte', 1)
  })
})  