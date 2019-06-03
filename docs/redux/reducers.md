# Reducers

Las [acciones](redux/actions) describen que *algo pasó*, pero no especifican cómo cambió el estado de la aplicación en respuesta. Esto es trabajo de los *reducers*.

## Diseñando la forma del estado

En Redux, todo el estado de la aplicación es almacenado en un único objeto. Es una buena idea pensar en su forma antes de escribir código. ¿Cuál es la mínima representación del estado de la aplicación como un objeto?

Para nuestra aplicación de tareas, vamos a querer guardar dos cosas diferentes:

* El filtro de visibilidad actualmente seleccionado;
* La lista actual de tareas.

Algunas veces verás que necesitas almacenar algunos datos, así como el estado de la UI, en el árbol de estado. Esto está bien, pero trata de mantener los datos separados del estado de la UI.

```js
{
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
```

## Manejando Acciones

Ahora que decidimos cómo se verá nuestro objeto de estado, estamos listos para escribir nuestro reducer. El reducer es una función pura que toma el estado anterior y una acción, y devuelve en nuevo estado.

```js
(previousState, action) => newState
```

Se llama reducer porque es el tipo de función que pasarías a [`Array.prototype.reduce(reducer, ?initialValue)`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/reduce). Es muy importante que los reducer se mantengan puros. Cosas que **nunca** deberías hacer dentro de un reducer:

* Modificar sus argumentos;
* Realizar tareas con efectos secundarios como llamadas a un API o transiciones de rutas.
* Llamar una función no pura, por ejemplo `Date.now()` o `Math.random()`.

Sólo recuerda que los reducers deben ser puros. **Dados los mismos argumentos, debería calcular y devolver el siguiente estado. Sin sorpresas. Sin efectos secundarios. Sin llamadas a APIs. Sin mutaciones. Solo cálculos.**

Con esto dicho, vamos a empezar a escribir nuestro reducer gradualmente enseñándole como entender las [acciones](redux/actions) que definimos antes.

Vamos a empezar por especificar el estado inicial. Redux va a llamar a nuestros reducers con `undefined` como valor del estado la primera vez. Esta es nuestra oportunidad de devolver el estado inicial de nuestra aplicación.

```js
const initialState = {
  todos: []
}

function todoApp(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  // Por ahora, no maneja ninguna acción
  // y solo devuelve el estado que recibimos.
  return state
}
```

Un estupendo truco es usar la [sintaxis de parámetros por defecto de ES6](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Funciones/Parametros_por_defecto) para hacer lo anterior de forma más compacta:

```js
function todoApp(state = initialState, action) {
  // Por ahora, no maneja ninguna acción
  // y solo devuelve el estado que recibimos.
  return state
}
```

Ahora vamos a manejar `ADD_TODO`. Todo lo que necesitamos hacer es cambiar la propiedad `todos` en el estado. Fácil:

```js
const todoApp = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo]
      }
    default:
      return state
  }
}
```

Nota que:

1. **No modificamos el `state`.** Creamos una copia con `...`;

2. **Devolvemos el anterior `state` en el caso `default`**. Es importante devolver el anterior `state` por cualquier acción desconocida.


## Separando Reducers
En la mayoria de proyectos vamos a tener un store grande que controle varias partes de la aplicación.
Para que los cambios de estado sean mas organizados vamos a crear distintos reducers que se van a encargar de partes especificas del arbol del estado principal.
El codigo de los reducers no va a variar, pero si vamos a tener que unirlos para poder configurar el *store*.

Para unir varios reducers lo que se hace es generar un archivo con el siguiente codigo:

```js
import { combineReducers } from 'redux'

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
```

La función [`combineReducers`](https://es.redux.js.org/docs/api/combine-reducers.html) nos permite unir un conjunto de reducers para generar un arbol con mas información y mejor control.

## Siguientes pasos

A continuación, vamos a ver como [crear un store de Redux](redux/store) que contenga todo el estado y se encargue de llamar a nuestro reducer cuando se despache una acción.
