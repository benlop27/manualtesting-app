/**
 * 
 * Simula una base de datos utilizando archivos JSON para almacenar los datos de las entidades.
 * Proporciona métodos para obtener, guardar, editar y eliminar valores de las entidades.
 * Cada entidad se representa como un archivo JSON en la carpeta 'datos', y los métodos interactúan con estos archivos para realizar las operaciones necesarias.
 * - obtenerValores(entidad): Lee el archivo JSON correspondiente a la entidad y devuelve los datos como un array de objetos. Si el archivo no existe, devuelve un array vacío.
 * - guardarValores(entidad, valores): Escribe el array de objetos proporcionado en el archivo JSON correspondiente a la entidad, formateando el JSON para una mejor legibilidad.
 * - editarValor(entidad, id, nuevoValor): Busca un objeto dentro del array de la entidad que tenga el mismo id que el proporcionado, y actualiza sus propiedades con las del nuevoValor. Luego guarda los cambios en el archivo JSON.
 * - eliminarValor(entidad, id): Filtra el array de la entidad para eliminar el objeto que tenga el mismo id que el proporcionado, y luego guarda los cambios en el archivo JSON.
 *  
 */
const baseDeDatos = {
    /**
     * Obtiene los valores de una entidad específica leyendo el archivo JSON correspondiente.
     * @param {*} entidad 
     * @returns 
     */
    obtenerValores: (entidad) => {
        const fs = require('fs');
        const path = `./src/Repositorios/DB/datos/${entidad}.json`;
        if (fs.existsSync(path)) {
            const data = fs.readFileSync(path);
            return JSON.parse(data);
        } else {
            return []
        }
    },
    /**
     * Guarda los valores de una entidad específica escribiendo en el archivo JSON correspondiente.
     * @param {*} entidad 
     * @param {*} valores 
     */
    guardarValores: (entidad, valores) => {
        const fs = require('fs');
        const path = `./src/Repositorios/DB/datos/${entidad}.json`;
        fs.writeFileSync(path, JSON.stringify(valores, null, 2));
    },
    /**
     * Edita un valor específico de una entidad buscando por id y actualizando sus propiedades.
     * @param {*} entidad 
     * @param {*} id 
     * @param {*} nuevoValor 
     */
    editarValor: (entidad, id, nuevoValor) => {
        const valores = baseDeDatos.obtenerValores(entidad);
        const index = valores.findIndex(v => v.id === id);
        if (index !== -1) {
            valores[index] = { ...valores[index], ...nuevoValor };
            baseDeDatos.guardarValores(entidad, valores);
        }
    },
    /**
     * Elimina un valor específico de una entidad filtrando por id y guardando los cambios.
     * @param {*} entidad 
     * @param {*} id 
     */
    eliminarValor: (entidad, id) => {
        const valores = baseDeDatos.obtenerValores(entidad);
        const nuevosValores = valores.filter(v => v.id !== id);
        baseDeDatos.guardarValores(entidad, nuevosValores);
    }
};

module.exports = baseDeDatos;