# Flujo de datos

La arquitectura Redux gira en torno a un **flujo de datos estrictamente unidireccional**.

Esto significa que todos los datos de una aplicación siguen el mismo patrón de ciclo de duración, haciendo que la lógica de tu aplicación sea más predecible y más fácil de entender. También fomenta la normalización de los datos, de modo que no termines con múltiples copias independientes de la misma data sin que se entere una de la otra.

Si todavía no estás convencido, lee [Motivación](redux/motivation).

El ciclo de duración de la data en cualquier aplicación Redux sigue estos 4 pasos:

1. **Haces una llamada a** `store.dispatch(action)`

  Una acción es un simple objeto describiendo *que pasó*. Por ejemplo:

    ```js
    { type: 'LIKE_ARTICLE', articleId: 42 }
    { type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'María' } }
    { type: 'ADD_TODO', text: 'Leer la documentación de Redux.' }
    ```

  Piensa en una acción como un fragmento muy breve de noticias. "A María le gustó el artículo 42." o "'Leer la documentación de Redux.' fue añadido a la lista de asuntos pendientes."

  Puedes invocar `store.dispatch(action)` desde cualquier lugar en tu aplicación, incluyendo componentes y *XHR callbacks*, o incluso en intervalos programados.

2. **El *store* en Redux invoca a la función reductora que le indicaste.**

  El *store* pasará dos argumentos al reductor: el árbol de estado actual y la acción. Por ejemplo, en el caso de la aplicación de asuntos pendientes, el reductor raíz podría recibir algo como esto:

    ```js
    // El estado actual de aplicación (listado de asuntos pendientes y un filtro)
    let previousState = {
      visibleTodoFilter: 'SHOW_ALL',
      todos: [ 
        {
          text: 'Leer la documentación.',
          complete: false
        }
      ]
    }

    // La acción que se está realizando (agregando un asunto)
    let action = {
      type: 'ADD_TODO',
      text: 'Entendiendo el flujo.'
    }

    // Tu reductor devuelve el siguiente estado de aplicación
    let nextState = todoApp(previousState, action)
    ```

    Ten en cuenta que un reductor es una función pura. Sólo *evalúa* el siguiente estado. Debe ser completamente predecible: invocarla con las mismas entradas muchas veces debe producir las mismas salidas. No debe realizar ningún efecto alterno como las llamadas al API o las transiciones del *router*. Esto debe suceder antes de que se envíe la acción.

3. **El reductor raíz puede combinar la salida de múltiples reductores en un único árbol de estado.**

  Como se estructura el reductor raíz queda completamente a tu discreción. Redux provee una función `combineReducers()` que ayuda, a "dividir" el reductor raíz en funciones separadas donde cada una maneja una porción del árbol de estado.

  Así es como funciona[`combineReducers()`. Digamos que tienes dos reductores, uno para una lista de asuntos y otro para la configuración del filtro asunto actualmente seleccionado:

    ```js
    function todos(state = [], action) {
      // Calcularlo de alguna manera...
      return nextState
    }

    function visibleTodoFilter(state = 'SHOW_ALL', action) {
      // Calcularlo de alguna manera...
      return nextState
    }

    let todoApp = combineReducers({
      todos,
      visibleTodoFilter
    })
    ```

  Cuando emites una acción, `todoApp` devuelta por `combineReducers` llamará a ambos reductores:

    ```js
    let nextTodos = todos(state.todos, action)
    let nextVisibleTodoFilter = visibleTodoFilter(state.visibleTodoFilter, action)
    ```

  A continuación se combinará ambos conjuntos de resultados en un único árbol de estado:

    ```js
    return {
      todos: nextTodos,
      visibleTodoFilter: nextVisibleTodoFilter
    }
    ```

  Mientras `combineReducers()` es una utilidad de gran ayuda, no tienes que usarla; ten la libertad de escribir tu propio reductor raíz!

4. **El *store* en Redux guarda por completo el árbol de estado devuelto por el reductor raíz.**
  
  ¡Este nuevo árbol es ahora el siguiente estado de tu aplicación! Cada *listener* registrado usando `store.subscribe(listener)` será ahora invocado; los listeners podrán invocar `store.getState()` para obtener el estado acutal.

  Ahora, la interfaz de usuario puede actualizarse para reflejar el nuevo estado. Si utilizas herramientas como React Redux, este es el momento donde invocas `component.setState(newState)`.

## Próximos Pasos

Ahora que sabes cómo funciona Redux, vamos a [conectarlo a una aplicación React](redux/react)
