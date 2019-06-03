import React, {PureComponent} from 'react';

import Header from './components/Header';
import MainSection from './components/MainSection';

export default class App extends PureComponent {
  state = {
    todos: [],
  };

  onAddTodo = text => {
    this.setState(({todos}) => ({
      todos: [...todos, {id: todos.length + 1, completed: false, text}],
    }));
  };

  onEditTodo = (id, text) => {
    this.setState(({todos}) => ({
      todos: [
        ...todos.map(todo => (todo.id === id ? {...todo, text} : todo)),
      ],
    }));
  };

  onCompleteTodo = id => {
    this.setState(({todos}) => ({
      todos: [
        ...todos.map(todo => (todo.id === id ? {...todo, completed: !todo.completed} : todo)),
      ],
    }));
  };

  onDeleteTodo = id => {
    this.setState(({todos}) => ({
      todos: [...todos.filter(todo => todo.id !== id)],
    }));
  };

  render() {
    const {todos} = this.state;
    const actions = {
      completeTodo: this.onCompleteTodo,
      editTodo: this.onEditTodo,
      deleteTodo: this.onDeleteTodo,
    };
    return (
      <>
        <Header addTodo={this.onAddTodo} />
        <MainSection
          todos={todos}
          todosCount={todos.length}
          actions={actions}
        />
      </>
    );
  }
}
