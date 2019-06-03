import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import TodoTextInput from './TodoTextInput';

export default class TodoItem extends PureComponent {
  static propTypes = {
    todo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      complete: PropTypes.bool.isRequired,
    }).isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
  };

  state = {
    editing: false,
  };

  handleDoubleClick = () => {
    this.setState({editing: true});
  };

  handleSave = text => {
    const {deleteTodo, editTodo, todo} = this.props;
    if (text.length === 0) {
      deleteTodo(todo.id);
    } else {
      editTodo(todo.id, text);
    }
    this.setState({editing: false});
  };

  onDelete = () => {
    const {deleteTodo, todo} = this.props;
    if (deleteTodo) {
      deleteTodo(todo.id);
    }
  };

  render() {
    const {editing} = this.state;
    const {todo, completeTodo} = this.props;

    let element;
    if (editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={editing}
          onSave={this.handleSave}
        />
      );
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => completeTodo(todo.id)}
          />
          <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
          <button type="button" className="destroy" onClick={this.onDelete} />
        </div>
      );
    }
    const cssClasses = `${editing && 'editing'} ${todo.completed
      && 'completed'}`;
    return <li className={cssClasses}>{element}</li>;
  }
}
