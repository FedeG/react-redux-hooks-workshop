import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TodoTextInput from './TodoTextInput';

const TodoItem = ({
  todo, onEdit, onComplete, onDelete,
}) => {
  const [editing, setEditing] = useState(false);

  const handleSave = text => {
    if (text.length === 0) {
      onDelete(todo.id);
    } else {
      onEdit(todo.id, text);
    }
    setEditing(false);
  };

  let element;
  if (editing) {
    element = (
      <TodoTextInput
        text={todo.text}
        editing={editing}
        onSave={handleSave}
      />
    );
  } else {
    element = (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onComplete(todo.id)}
        />
        <label onDoubleClick={() => setEditing(true)}>{todo.text}</label>
        <button label="delete" type="button" className="destroy" onClick={() => onDelete(todo.id)} />
      </div>
    );
  }
  return <li className={classNames({editing, completed: todo.completed})}>{element}</li>;
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoItem;
