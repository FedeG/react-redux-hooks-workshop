/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import PropTypes from 'prop-types';

import Footer from './Footer';
import TodoList from './TodoList';

const MainSection = ({
  todos, onEdit, onComplete, onDelete,
}) => (
  <section className="main">
    <span>
      <input className="toggle-all" type="checkbox" checked={false} readOnly />
      <label />
    </span>
    <TodoList
      todos={todos}
      onEdit={onEdit}
      onComplete={onComplete}
      onDelete={onDelete}
    />
    {todos.length > 0 && <Footer quantity={todos.length} />}
  </section>
);

MainSection.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MainSection;
