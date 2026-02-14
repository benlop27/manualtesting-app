# cypress/e2e/features/01-PaginaInicio.feature
# language: es

Característica: Página de Inicio
  Como un usuario nuevo
  Quiero cargar la aplicación
  Para asegurarme de que el sistema está disponible

  Escenario: Verificar que la página principal carga correctamente
    Dado que abro la página principal de la aplicación
    Entonces debería ver el encabezado principal con el texto "¡Bienvenido a la suite de usuarios!"
    Y la página debería tener el título correcto en la pestaña del navegador