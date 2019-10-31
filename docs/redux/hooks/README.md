# Redux con hooks

La nueva API de ["hooks"](https://fran-costa.github.io/capacitaciones/#/topics/Hooks?id=hooks) de React le da a los componentes funcionales la capacidad de usar el estado del componente de forma local, ejecutar efectos secundarios y más.

React Redux ahora ofrece un conjunto de hooks como alternativa al componente de orden superior connect() existente.
Estas API le permiten suscribirse al store de Redux y enviar acciones, sin tener que ajustar en sus componentes un `connect()`.

Estos hooks se agregaron por primera vez en la version v7.1.0.

## Uso de hooks en una aplicación React Redux

Al igual que con `connect()`, se debe comenzar envolviendo la aplicación en un componente `<Provider>` para que el store este disponible en todo el árbol de componentes:

```javascript
const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

Desde allí, puede importar cualquiera de las API de hooks de React Redux y usarlas dentro de los componentes funcionales.
