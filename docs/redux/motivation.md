## Motivación

Como los requisitos en aplicaciones JavaScript de una sola página se están volviendo cada vez más complicados, nuestro código, mas que nunca, debe manejar el estado de la aplicación.

Este estado puede incluir respuestas del servidor y datos cacheados, así como datos creados localmente que todavía no fueron enviados en el servidor.
El estado de las UI también se volvió más complejo, al necesitar mantener la ruta activa, el tab seleccionado, si mostrar o no un spinner, si deben mostrarse los controles de paginación o no, etc.

Controlar ese cambiante estado es difícil. Si un modelo puede actualizar otro modelo, entonces una vista puede actualizar un modelo, el cual actualiza otro modelo, y esto causa que otra vista se actualice. En cierto punto, ya no se entiende que esta pasando en la aplicación ya que perdiste control sobre el cuándo, el por qué y el cómo de su estado.

Cuando un sistema es opaco y no es determinististico, es difícil reproducir errores o agregar nuevas características.

Esta complejidad es difícil de manejar debido a que estamos mezclando dos conceptos que son difícil de entender para la mente humana: mutación y asincronicidad. Ambos son geniales separados, pero juntos pueden causar un gran lío. Librerías como React tratan de resolver este problema en la capa de la vista removiendo tanto la asincronicidad como la manipulación directa del DOM. De todas formas, controlar el estado de tus datos es todavía tu responsabilidad y acá es donde entra Redux.

Siguiendo los pasos de Flux, CQRS y Event Sourcing, Redux intenta hacer predecibles las mutaciones del estado imponiendo ciertas restricciones en cómo y cuándo pueden realizarse las actualizaciones. Estas restricciones se reflejan en los tres principios de Redux.

## Links relacionados
- Documentación oficial de redux: [versión español](https://es.redux.js.org) [versión ingles](https://redux.js.org)