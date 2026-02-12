#Crea la imagen docker a partir de la imagen oficial de node con alpine
FROM node:alpine
#Crea un directorio de trabajo dentro del contenedor
WORKDIR /app
#Copia el package.json y el package-lock.json al directorio de trabajo
COPY package*.json ./
#Instala las dependencias del proyecto
RUN npm install
#Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .
#Expone el puerto 3000 para que la aplicación sea accesible desde fuera del contenedor
EXPOSE 3000
#Define el comando para ejecutar la aplicación cuando el contenedor se inicie
CMD ["npm", "start"]