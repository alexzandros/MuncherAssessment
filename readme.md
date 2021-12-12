# Muncher Store backend

Prueba como desarrollador backend para Muncher

Está desarrollando haciendo uso del [framework Serverless](https://www.serverless.com/) con su plugin [offline](https://www.npmjs.com/package/serverless-offline) para poder agilizar el desarrollo en lugar de esperar a desplegar a ```AWS Lambda```

### Configuración 📋

Es necesario agregar las variables de entorno en un archivo (.env) en la raiz del proyecto.

```
DATABASE_URL=

```

### Instalación 🔧

Instalar las dependecias usando:

```
npm install
```

### Ejecución 🚀

Para iniciar la ejecución del server en modo desarrollo se debe ejecutar:

```
npm run dev
```

### Pruebas Unitarias 🚀

Para iniciar la ejecución de las pruebas se debe tener el proyecto corriendo previamente y despues ejecutar el siguiente comando:

```
npm  test
```

## TODO

 - Usar [Middy](https://middy.js.org/) para extraer toda la deserialización y validación de cada uno de lo handlers y delegarlo en el middleware.
 - Incluir el uso de transacciones de BD para garantizar la integridad de los datos