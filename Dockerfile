# Usa la imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración y dependencias
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación
RUN npm run build

# Verifica el contenido del directorio dist
RUN ls -la /app/dist

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]
