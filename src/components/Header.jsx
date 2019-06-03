import React from 'react';
import PropTypes from 'prop-types';

import TextInput from './TodoTextInput';

const Header = ({ addTodo }) => (
  <header className="header">
    <h1>Tareas</h1>
    <TextInput
      newTodo
      onSave={addTodo}
      placeholder="¿Qué tarea tenes pendiente?"
    />
  </header>
);

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default Header;
