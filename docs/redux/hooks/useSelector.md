# useSelector

## Descripción
Te permite extraer datos del estado del store de Redux, utilizando una función de selector.

```javascript
const result : any = useSelector(selector : Function, equalityFn? : Function)
```

##### Nota: La función del selector debe ser pura, ya que potencialmente se ejecuta varias veces y en puntos arbitrarios en el tiempo.

El selector es aproximadamente equivalente al argumento `mapStateToProps` para `connect` conceptualmente.

Se llamará al selector con todo el estado del store de Redux como único argumento.

El selector se ejecutará siempre que se represente el componente.

`useSelector()` también se suscribirá al store de Redux y ejecutará su selector cada vez que se ejecute una acción.

Sin embargo, existen algunas diferencias entre los selectores pasados ​​a `useSelector()` y una función `mapState`:

- El selector puede devolver cualquier valor como resultado, no solo un objeto.
- Cuando se despacha una acción, `useSelector()` hará una comparación de referencia del valor del resultado del selector anterior y el valor del resultado actual. Si son diferentes, el componente se verá obligado a volver a renderizar. Si son iguales, el componente no se volverá a representar.
- `useSelector()` usa estrictas verificaciones de igualdad de referencia por defecto, no una igualdad superficial.

Puede llamar a `useSelector()` varias veces dentro de un solo componente. Cada llamada a `useSelector()` crea una suscripción individual al store de Redux.

Debido al comportamiento de procesamiento por lotes de la actualización React utilizado en React Redux v7, una acción despachada que hace que múltiples `useSelector()s` en el mismo componente devuelvan nuevos valores solo debería dar como resultado una única representación.

## Igualdad comparaciones y actualizaciones

Cuando se representa el componente, se llamará a la función de selector proporcionada y su resultado se devolverá desde el `useSelector()`. (Se puede devolver un resultado en caché si el selector se ha ejecutado y no ha cambiado).

Sin embargo, cuando se envía una acción al store de Redux, `useSelector()` solo fuerza una nueva representación si el resultado del selector parece ser diferente al último resultado. A partir de v7.1.0-alpha.5, la comparación predeterminada es una comparación de referencia estricta `===` . Esto es diferente de `connect()`, que utiliza comprobaciones de igualdad poco profundas en los resultados de `mapState` y las llamadas de `mapState` para determinar si se necesita volver a representar. Esto tiene varias implicaciones sobre cómo debe usar `useSelector()`.

Con `mapState`, todos los campos individuales se devolvieron en un objeto combinado. No importaba si el objeto devuelto era una nueva referencia o no, `connect()` solo comparó los campos individuales. Con `useSelector()`, devolver un nuevo objeto cada vez siempre forzará una nueva representación por defecto. Si desea recuperar múltiples valores de la tienda, puede:

- Llame a `useSelector()` varias veces, con cada llamada devolviendo un solo valor de campo
- Use `Reselect` o una biblioteca similar para crear un selector memorizado que devuelva múltiples valores en un objeto, pero solo devuelve un nuevo objeto cuando uno de los valores ha cambiado.
- Utilice la función `shallowEqual` de `React-Redux` como argumento de `equalityFn` para `useSelector()`, como:

```javascript
import { shallowEqual, useSelector } from 'react-redux'

const selectedData = useSelector(selectorReturningObject, shallowEqual)
```

La función de comparación opcional también permite usar algo como las capacidades de `_.isEqual()` o `Immutable.js`.

## Ejemplos de useSelector

#### Uso básico:

```javascript
import React from 'react'
import { useSelector } from 'react-redux'

export const CounterComponent = () => {
  const counter = useSelector(state => state.counter)
  return <div>{counter}</div>
}
```

#### Usando props a través del closure para determinar qué extraer:
```javascript
import React from 'react'
import { useSelector } from 'react-redux'

export const TodoListItem = props => {
  const todo = useSelector(state => state.todos[props.id])
  return <div>{todo.text}</div>
}
```

## Usar selectores memorizado

Cuando se usa `useSelector` con un selector como se muestra arriba, se crea una nueva instancia del selector cada vez que se representa el componente. Esto funciona mientras el selector no mantenga ningún estado.
Sin embargo, los selectores de memorización (por ejemplo, creados mediante `createSelector` desde `reselect`) tienen un estado interno y, por lo tanto, se debe tener cuidado al usarlos.
A continuación puede encontrar escenarios de uso típicos para memorizar selectores.

Cuando el selector solo depende del estado, simplemente asegúrese de que se declare fuera del componente para que se use la misma instancia de selector para cada render:

```javascript
import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const selectNumOfDoneTodos = createSelector(
  state => state.todos,
  todos => todos.filter(todo => todo.isDone).length
)

export const DoneTodosCounter = () => {
  const NumOfDoneTodos = useSelector(selectNumOfDoneTodos)
  return <div>{NumOfDoneTodos}</div>
}

export const App = () => {
  return (
    <>
      <span>Number of done todos:</span>
      <DoneTodosCounter />
    </>
  )
}
```

Lo mismo es cierto si el selector depende de las props del componente, pero solo se usará en una sola instancia de un solo componente:

```javascript
import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const selectNumOfTodosWithIsDoneValue = createSelector(
  state => state.todos,
  (_, isDone) => isDone,
  (todos, isDone) => todos.filter(todo => todo.isDone === isDone).length
)

export const TodoCounterForIsDoneValue = ({ isDone }) => {
  const NumOfTodosWithIsDoneValue = useSelector(state =>
    selectNumOfTodosWithIsDoneValue(state, isDone)
  )

  return <div>{NumOfTodosWithIsDoneValue}</div>
}

export const App = () => {
  return (
    <>
      <span>Number of done todos:</span>
      <TodoCounterForIsDoneValue isDone={true} />
    </>
  )
}
```

Sin embargo, cuando el selector se usa en varias instancias de componentes y depende de las props del componente, debe asegurarse de que cada instancia de componente obtenga su propia instancia de selector:

```javascript
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const makeNumOfTodosWithIsDoneSelector = () =>
  createSelector(
    state => state.todos,
    (_, isDone) => isDone,
    (todos, isDone) => todos.filter(todo => todo.isDone === isDone).length
  )

export const TodoCounterForIsDoneValue = ({ isDone }) => {
  const selectNumOfTodosWithIsDone = useMemo(
    makeNumOfTodosWithIsDoneSelector,
    []
  )

  const numOfTodosWithIsDoneValue = useSelector(state =>
    selectNumOfTodosWithIsDone(state, isDone)
  )

  return <div>{numOfTodosWithIsDoneValue}</div>
}

export const App = () => {
  return (
    <>
      <span>Number of done todos:</span>
      <TodoCounterForIsDoneValue isDone={true} />
      <span>Number of unfinished todos:</span>
      <TodoCounterForIsDoneValue isDone={false} />
    </>
  )
}
```
