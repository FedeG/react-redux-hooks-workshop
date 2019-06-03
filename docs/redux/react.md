# Uso con React

Comencemos enfatizando que Redux no tiene relación alguna con React. Puedes escribir aplicaciones Redux con React, Angular, Ember, jQuery o vanilla JavaScript.

Dicho esto, Redux funciona especialmente bien con librerías como [React](http://facebook.github.io/react/) y [Deku](https://github.com/dekujs/deku) porque te permiten describir la interfaz de usuario como una función de estado, y Redux emite actualizaciones de estado en respuesta a acciones.

Usaremos React para crear nuestra aplicación sencilla de asuntos pendientes (To-do).


## Componentes de Presentación y Contenedores

Para asociar React con Redux se recurre a la idea de **separación de presentación y componentes contenedores**. Si no estás familiarizado con estos términos, [lee sobre ellos primero](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0), y luego vuelve. ¡Son importantes, así que vamos a esperarte!

¿Has terminado de leer el artículo? Repasemos sus diferencias:

<table>
    <thead>
        <tr>
            <th></th>
            <th scope="col" style="text-align:left">Componentes de Presentación</th>
            <th scope="col" style="text-align:left">Componentes Contenedores</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <th scope="row" style="text-align:right">Propósito
</th>
          <td>Como se ven las cosas (<em>markup</em>, estilos)</td>
          <td>Como funcionan las cosas (búsqueda de datos, actualizaciones de estado)</td>
        </tr>
        <tr>
          <th scope="row" style="text-align:right">Pertinente a Redux</th>
          <td>No</th>
          <td>Yes</th>
        </tr>
        <tr>
          <th scope="row" style="text-align:right">Para leer datos</th>
          <td>Lee datos de los <em>props</em></td>
          <td>Se suscribe al estado en Redux</td>
        </tr>
        <tr>
          <th scope="row" style="text-align:right">Para manipular datos</th>
          <td>Invoca llamada de retorno (callback) desde los <em>props</em></td>
          <td>Envía acciones a Redux</td>
        </tr>
        <tr>
          <th scope="row" style="text-align:right">Son escritas</th>
          <td>Manualmente</td>
          <td>Usualmente generados por React Redux</td>
        </tr>
    </tbody>
</table>

La mayoría de los componentes que escribiremos serán de presentación, pero necesitaremos generar algunos componentes contenedores para conectarlos al *store* que maneja Redux. Con esto y el resumen de diseño que mencionaremos a continuación no implica que los componentes contenedores deban estar cerca o en la parte superior del árbol de componentes. Si un componente contenedor se vuelve demasiado complejo (es decir, tiene componentes de presentación fuertemente anidados con innumerables devoluciones de llamadas que se pasan hacia abajo), introduzca otro contenedor dentro del árbol de componentes como se indica en las FAQ.

Técnicamente podrías escribir los componentes contenedores manualmente usando `store.subscribe()`. No le aconsejamos que haga esto porque React Redux hace muchas optimizaciones de rendimiento que son difíciles de hacer a mano. Por esta razón, en lugar de escribir los componentes contenedores, los generaremos utilizando el comando `connect()`, función proporcionada por React Redux, como verá a continuación.

## Transferir al *store*

Todos los componentes contenedores necesitan acceso al *store Redux* para que puedan suscribirse a ella. Una opción sería pasarlo como un *prop* a cada componente contenedor. Sin embargo, se vuelve tedioso, ya que hay que enlazar `store` incluso a través del componente de presentación ya que puede suceder que tenga que renderizar un contenedor allá en lo profundo del árbol de componentes.

La opción que recomendamos es usar un componente *React Redux* especial llamado [`<Proveedor>`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store) para [mágicamente](https://facebook.github.io/react/docs/context.html) hacer que el *store* esté disponible para todos los componentes del contenedor en la aplicación sin pasarlo explícitamente. Sólo es necesario utilizarlo una vez al renderizar el componente raíz:

#### `index.js`

```js
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import todoApp from './reducers'
import App from './App'

const store = createStore(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```
