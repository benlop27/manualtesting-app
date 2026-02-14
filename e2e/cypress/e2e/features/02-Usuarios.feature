# language: es
Característica: Gestión de Usuarios
  Como un usuario administrador
  Quiero gestionar usuarios en la aplicación

  Escenario: Poder visualizar la página principal sin ningun problema
    Dado el usuario abre la pagina principal
    Cuando la pagina ha cargado
    Entonces validar que no existen errores al cargar

  Escenario: Poder visualizar una tabla de información de usuarios
    Dado el usuario abre la pagina principal
    Cuando la pagina ha cargado
    Entonces se visualiza la tabla de informacion la cual contiene los siguientes valores: Id, Nombre de usuario e Email y
    Entonces existen valores en la tabla y
    Entonces no se visualizan errores visibles

  Escenario: Poder visualizar los datos ordenados alfabéticamente por nombre
    Dado el usuario abre la pagina principal
    Cuando la pagina ha cargado
    Entonces se visualiza la tabla de informacion la cual contiene los siguientes valores: Id, Nombre de usuario e Email y
    Entonces existen valores en la tabla y
    Entonces estan ordenados alfabeticamente por nombre