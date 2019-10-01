import uuid from 'uuid/v1';
import React, {useState} from 'react';

import Header from './components/Header';
import MainSection from './components/MainSection';

const App = () => {
  const [todos, setTodos] = useState([]);

  const onAdd = text => {
    setTodos(prevTodos => [...prevTodos, {id: uuid(), completed: false, text}]);
  };

  const onEdit = (id, text) => {
    setTodos(prevTodos => [...prevTodos.map(todo => (todo.id === id ? {...todo, text} : todo))]);
  };

  const onComplete = id => {
    setTodos(prevTodos => [
      ...prevTodos.map(todo => (todo.id === id ? {...todo, completed: !todo.completed} : todo)),
    ]);
  };

  const onDelete = id => {
    setTodos(prevTodos => [...prevTodos.filter(todo => todo.id !== id)]);
  };

  return (
    <>
      <Header onAdd={onAdd} />
      <MainSection
        todos={todos}
        onEdit={onEdit}
        onComplete={onComplete}
        onDelete={onDelete}
      />
    </>
  );
};

export default App;
