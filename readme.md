# Muncher Store backend

Prueba como desarrollador backend para Muncher

Est谩 desarrollando haciendo uso del [framework Serverless](https://www.serverless.com/) con su plugin [offline](https://www.npmjs.com/package/serverless-offline) para poder agilizar el desarrollo en lugar de esperar a desplegar a ```AWS Lambda```

### Configuraci贸n 馃搵

Es necesario agregar las variables de entorno en un archivo (.env) en la raiz del proyecto.

```
DATABASE_URL=

```

### Instalaci贸n 馃敡

Instalar las dependecias usando:

```
npm install
```

### Ejecuci贸n 馃殌

Para iniciar la ejecuci贸n del server en modo desarrollo se debe ejecutar:

```
npm run dev
```

### Pruebas Unitarias 馃殌

Para iniciar la ejecuci贸n de las pruebas se debe tener el proyecto corriendo previamente y despues ejecutar el siguiente comando:

```
npm  test
```

## TODO

 - Usar [Middy](https://middy.js.org/) para extraer toda la deserializaci贸n y validaci贸n de cada uno de lo handlers y delegarlo en el middleware.
 - Incluir el uso de transacciones de BD para garantizar la integridad de los datos