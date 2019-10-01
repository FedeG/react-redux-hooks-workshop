import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

const TodoList = ({
  todos, onEdit, onComplete, onDelete,
}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onEdit={onEdit}
        onComplete={onComplete}
        onDelete={onDelete}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoList;
