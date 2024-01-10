FROM node:16.13.2@sha256:2033f4cc18f9d8b5d0baa7f276aaeffd202e1a2c6fe9af408af05a34fe68cbfb

RUN apt-get update && apt-get install -y \
    # Instalar editor de texto, para revisar archivos dentro del contenedor
    nano

# Se establece el directorio de trabajo actual
WORKDIR /usr/src/api_tu_restaurant

# Se copia package.json y package-lock.json al directorio de trabajo actual
COPY package*.json ./

# Se instalan las dependencias
RUN npm ci

# Se copia el resto de los archivos a la carpeta de trabajo actual
COPY . ./

# Se expone el puerto
EXPOSE 3000

# Entrypoint
ENTRYPOINT [ "./docker-entrypoint.sh" ]

# Se ejecuta la API
CMD [ "npm", "run", "start" ]
