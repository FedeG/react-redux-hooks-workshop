# useStore

## Descripción

Este hook devuelve una referencia al mismo store de Redux que se pasó al componente `<Provider>`.

Este hooks probablemente no debería usarse con frecuencia, por lo general `useSelector()` es la elección principal.
Sin embargo, `useStore()` puede ser útil para escenarios menos comunes que requieren acceso al store, como reemplazar los reductores.

```javascript
const store = useStore()
```

## Ejemplos

```javascript
import React from 'react'
import { useStore } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const store = useStore()

  // EXAMPLE ONLY! Do not do this in a real app.
  // The component will not automatically update if the store state changes
  return <div>{store.getState()}</div>
}
```
