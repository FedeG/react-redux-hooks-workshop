# Store

En las secciones anteriores, definimos las [acciones](redux/actions) que representan los hechos sobre "lo que pasó" y los [reductores](redux/reducers) son los que actualizan el estado de acuerdo a esas acciones.

El ***Store*** es el objeto que los reúne. El *store* tiene las siguientes responsabilidades:

* Contiene el estado de la aplicación;
* Permite el acceso al estado via `getState()`
* Permite que el estado sea actualizado via `dispatch(action)`
* Registra los *listeners* via `subscribe(listener)`
* Maneja la anulación del registro de los *listeners* vía el retorno de la función de `subscribe(listener)`

Es importante destacar que sólo tendrás un *store* en una aplicación Redux. Cuando desees dividir la lógica para el manejo de datos, usarás composición de reductores en lugar de muchos *stores*.

Es fácil crear una *store* si tienes un reductor. En la [sección anterior](redux/reducers), usamos [`combineReducers()`](../api/combine-Reducers.md) para combinar varios reductores en uno solo. Ahora lo vamos a importar y pasarlo a `createStore()`

```js
import { createStore } from 'redux'
import todoApp from './reducers'
const store = createStore(todoApp)
```

Opcionalmente puedes especificar el estado inicial a través del segundo argumento para `createStore()`. Esto es útil para hidratar el estado del cliente para que coincida con el estado de una aplicación Redux que se ejecuta en el servidor.

```js
const store = createStore(todoApp, window.STATE_FROM_SERVER)
```

## Enviar Acciones

Ahora que hemos creado un *store*, vamos a verificar que nuestro programa funciona! Incluso sin ninguna interfaz de usuario, ya podemos verificar la lógica de actualización.

```js
import { addTodo, toggleTodo } from './actions'

// Mostramos el estado inicial
console.log(store.getState())

// Cada vez que el estado cambie, lo mostramos
// Tenga en cuenta que subscribe() devuelve una función para anular el registro del listener
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

// Enviamos algunas acciones
store.dispatch(addTodo('Aprender sobre acciones'))
store.dispatch(addTodo('Aprender sobre reductores'))
store.dispatch(addTodo('Aprender sobre stores'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))

// Anulamos el monitoreo de las actualizaciones al estado
unsubscribe()
```

Puedes ver como esto hace que el estado del *store* cambie.

## Código final para el store

#### `index.js`

```js
import { createStore } from 'redux'
import todoApp from './reducers'

let store = createStore(todoApp)
```

## Próximos Pasos

Antes de crear la interfaz de usuario para nuestra aplicación TODO, tomaremos un desvío para ver [cómo fluyen los datos en una aplicación Redux](redux/dataflow).
