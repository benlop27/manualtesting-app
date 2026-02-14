describe('Suite de pruebas: Página Principal', () => {
  before(() => {
    // Cargar la página una sola vez antes de todos los tests
    
  })

  it('Página carga con mensaje de bienvenida', () => {
    cy.visit('https://manualtesting-dev-138959494334.us-central1.run.app/')
    cy.contains('¡Bienvenido a la suite de usuarios!')
  })



  it('Página no muestra errores', () => {
    cy.visit('https://manualtesting-dev-138959494334.us-central1.run.app/')
    cy.get('body').should('not.contain', 'Error')
  })

  // it('Página contiene un tabla tabla', () => {
  //   cy.visit('https://manualtesting-dev-138959494334.us-central1.run.app/')
  //   cy.get('table').should('exist')
  // })
  // it('Tabla tiene datos', () => {
  //   cy.visit('https://manualtesting-dev-138959494334.us-central1.run.app/')
  //   cy.get('table tbody tr').its('length').should('be.gte', 1)
  // })
})  