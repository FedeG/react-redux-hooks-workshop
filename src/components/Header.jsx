import React from 'react';
import PropTypes from 'prop-types';

import TextInput from './TodoTextInput';

const Header = ({onAdd}) => (
  <header className="header">
    <h1>Tareas</h1>
    <TextInput
      newTodo
      onSave={onAdd}
      placeholder="¿Qué tarea tenes pendiente?"
    />
  </header>
);

Header.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default Header;
