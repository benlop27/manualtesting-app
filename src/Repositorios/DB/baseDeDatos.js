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
     * Obtiene un valor específico de una entidad buscando por id.
     * @param {*} entidad 
     * @param {*} id 
     * @returns 
     */
    obtenerPorId: (entidad, id) => {
        const valores = baseDeDatos.obtenerValores(entidad);
        return valores.find(v => v.id === id);
    },
    /**
     * Guarda los valores de una entidad específica escribiendo en el archivo JSON correspondiente.
     * Crea el archivo y directorio si no existen, y mezcla con datos existentes.
     * Soporta un objeto individual o un array de objetos.
     * @param {*} entidad 
     * @param {*} valores - Objeto o array de objetos
     */
    guardarValores: (entidad, valores) => {
        const fs = require('fs');
        const dirPath = './src/Repositorios/DB/datos';
        const filePath = `${dirPath}/${entidad}.json`;
        
        // Crear directorio si no existe
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        
        // Normalizar valores a array
        const valoresArray = Array.isArray(valores) ? valores : [valores];
        
        // Obtener datos existentes
        let datosExistentes = [];
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath);
            datosExistentes = JSON.parse(data);
        }
        
        // Unir datos existentes con nuevos valores (evita duplicados por id)
        const datosUnidos = datosExistentes.map(v => valoresArray.find(nv => nv.id === v.id) || v);
        const nuevosIds = valoresArray.filter(nv => !datosExistentes.find(v => v.id === nv.id));
        const resultado = [...datosUnidos, ...nuevosIds];
        
        // Escribir archivo
        fs.writeFileSync(filePath, JSON.stringify(resultado, null, 2));
    },
    /**
     * Edita un valor específico de una entidad buscando por id y actualizando sus propiedades.
     * @param {*} entidad 
     * @param {*} id 
     * @param {*} nuevoValor 
     * @returns el valor actualizado o null si no existe
     */
    editarValor: (entidad, id, nuevoValor) => {
        const fs = require('fs');
        const dirPath = './src/Repositorios/DB/datos';
        const filePath = `${dirPath}/${entidad}.json`;
        
        // Crear directorio si no existe
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        
        // Leer datos del archivo
        let valores = [];
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath);
            valores = JSON.parse(data);
        }
        
        // Buscar y actualizar
        const index = valores.findIndex(v => v.id === id);
        if (index !== -1) {
            valores[index] = { ...valores[index], ...nuevoValor };
            fs.writeFileSync(filePath, JSON.stringify(valores, null, 2));
            return valores[index];
        }
        return null;
    },
    /**
     * Elimina un valor específico de una entidad filtrando por id y guardando los cambios.
     * @param {*} entidad 
     * @param {*} id 
     * @returns el valor eliminado o null si no existe
     */
    eliminarValor: (entidad, id) => {
        const fs = require('fs');
        const dirPath = './src/Repositorios/DB/datos';
        const filePath = `${dirPath}/${entidad}.json`;
        
        // Crear directorio si no existe
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        
        // Leer datos del archivo
        let valores = [];
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath);
            valores = JSON.parse(data);
        }
        
        // Buscar y eliminar
        const index = valores.findIndex(v => v.id === id);
        if (index !== -1) {
            const eliminado = valores.splice(index, 1)[0];
            fs.writeFileSync(filePath, JSON.stringify(valores, null, 2));
            return eliminado;
        }
        return null;
    }
};

module.exports = baseDeDatos;