# Que es viejito experto en dominó?

Este es un jugador de dominó para usar en [cooperAltive](https://github.com/2kodevs/cooperAItive/tree/master/src/games/domino).

# Instrucciones para iniciar el viejito experto en dominó callejero

1. Asegúrese de tener Docker instalado en su sistema. Puede descargarlo desde [el sitio web oficial de Docker](https://docs.docker.com/get-docker/).

2. Clone el repositorio del "viejito-de-la-calle" desde GitHub:
   git clone https://github.com/freddysae0/viejito-de-la-calle.git

3. Navegue al directorio clonado:

   cd viejito-de-la-calle

4. Construya la imagen Docker utilizando el Dockerfile proporcionado:

   docker build -t viejito-domino .

5. Una vez que la imagen se haya construido correctamente, puede ejecutar un contenedor a partir de ella:

   docker run -p 8000:8000 viejito-domino

¡Ahora tiene al viejito experto en dominó callejero listo para jugar en su contenedor Docker! Diviértase y disfrute del juego.
