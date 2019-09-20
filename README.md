# IronAccess

IronAccess es una aplicación dedicada a administrar el acceso de invitados en alguna institución. Por el momento se encuentra orientada a las invitaciones en Ironhack

## Instalación

Para instalar IronAccess en tu servidor local, clona este repositorio la ruta que tu deses en tu computadora. Después, accede a la carpeta de IronAccess e instalar las dependencias, corriendo el siguiente comando en la consola:

```bash
npm install
```

Crear un archivo .env en la carpeta de IronAccess, configurar PORT, configurar ENV=development. Introducir una variable llamada EMAIL e igualarla a una dirección de correo electrónico existente. Introducir una variable llamada PASSWORD e igualarla a la contraseña de la dirección de correo electrónico antes declarada. Todo debe encontrarse en .env para generarlas como variables de entorno y que estas no puedan ser vistas en el servidor.

Para configurar la base de datos de MongoDB Compass, configurar en mongoose.connect, colocar lo siguiente 'mongodb://localhost/IronAccess', en vez de proccess.env.DB justo como se muestra aquí, con comillas. De igual manera para configurar el administrador, en la carpeta de bin/seeds.js colocar la misma ruta de 'mongodb://localhost/IronAccess' y ejecutar en la terminal node bin/seeds.js. Puedes reconfigurar el objeto boss como desees y configurar la contraseña dentro del .then en bos.password, igualarlo a la contraseña que se desea, de esta manera obtendrá el boss en la base de datos de MongoDB Compass y con su contraseña hasheada.

## Ejecución

Ejecutar en la terminal lo siguiente:
```bash
npm run dev
```
Abrirá la aplicación el localhost con el puerto que haya sido asignado en el .env
Ingresar en index al boss predefinido o al que configuró en bin/seeds.js, ya dentro del perfil de boss, podrás crear staff y checker y borrarlos, configurando emails sin necesidad de verificarlos para poder acceder a los perfiles de staff y checker. 
Staff podrá crear estudiantes, invitados y modificar el nombre y el apellido de su perfil. 

En invitados será necesario rellenar cada uno de los campos y el correo deberá ser real para poder recibir el código de invitación.
Los estudiantes también podrán crear invitados en su perfil, accediendo con las credeenciales otorgadas por el staff, el cual también le configura su contraseña (el cambio de contraseña será algo que se implementará en el futuro).

Al entrar en el perfil de checkers, podrán buscar con el código recibido en el correo de los invitados, validar la invitación y hacer checkout del invitado al salir de las instalaciones.


## Contribución

Si deseas contribuir al proyecto, puedes hacerlo con toda libertad, realizando comentarios e incluso podrás hacer fork del proyecto para tenerlo en tu repositorio si deseas implementar algo parecido.

## Ejecución desde deploy

Entrar a la siguiente liga:
https://dashboard.heroku.com/apps/young-crag-19228

El boss tiene las siguientes credenciales:
email: rahm9410@gmail.com
password: 1234

Hay un staff, un checker y un estudiante creados para probar directamente la funcionalidad, con las siguientes credenciales
Staff- email: staff@ironhack.com
Student- email: student@ironhack.com
Checker - email: checker@ironhack.com

Todos los anteriores tienen como contraseña 1234
