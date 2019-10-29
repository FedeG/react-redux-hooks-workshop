import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TextInput = props => {
  const {
    editing, onSave, newTodo, placeholder, text: textFromProps,
  } = props;
  const [text, setText] = useState(textFromProps);

  const handleSubmit = e => {
    const value = e.target.value.trim();
    if (e.which === 13 && value.length > 0) {
      onSave(value);
      if (newTodo) {
        setText('');
      }
    }
  };

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleBlur = e => {
    const {target: {value}} = e;
    if (!newTodo && value.length > 0) {
      onSave(value);
    }
  };

  return (
    <input
      className={classNames({edit: editing, 'new-todo': newTodo})}
      type="text"
      placeholder={placeholder}
      value={text}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleSubmit}
    />
  );
};

TextInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  newTodo: PropTypes.bool,
};

TextInput.defaultProps = {
  newTodo: false,
  editing: false,
  placeholder: '',
  text: '',
};

export default TextInput;
