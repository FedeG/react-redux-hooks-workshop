# useDispatch

## Descripción
Este hook devuelve una referencia a la función de `dispatch` del store de Redux y se puede usar para enviar acciones.

```javascript
const dispatch = useDispatch()
```

## Ejemplos

```javascript
import React from 'react'
import { useDispatch } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()

  return (
    <div>
      <span>{value}</span>
      <button onClick={() => dispatch({ type: 'increment-counter' })}>
        Increment counter
      </button>
    </div>
  )
}
```

Si se requiere pasar una función que pueda hacer `dispatch` de otro componente, se recomienda memorizarlo con `useCallback`, ya que de lo contrario los componentes secundarios pueden procesarse innecesariamente debido a la referencia cambiada.

```javascript
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()
  const incrementCounter = useCallback(
    () => dispatch({ type: 'increment-counter' }),
    [dispatch]
  )

  return (
    <div>
      <span>{value}</span>
      <MyIncrementButton onIncrement={incrementCounter} />
    </div>
  )
}

export const MyIncrementButton = React.memo(({ onIncrement }) => (
  <button onClick={onIncrement}>Increment counter</button>
))
```
