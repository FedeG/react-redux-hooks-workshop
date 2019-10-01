import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class TextInput extends PureComponent {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    text: this.props.text || '',
  };

  handleSubmit = e => {
    const {onSave, newTodo} = this.props;
    const text = e.target.value.trim();
    if (e.which === 13 && text.length > 0) {
      onSave(text);
      if (newTodo) {
        this.setState({text: ''});
      }
    }
  };

  handleChange = e => {
    this.setState({text: e.target.value});
  };

  handleBlur = e => {
    const {onSave, newTodo} = this.props;
    const text = e.target.value;
    if (!newTodo && text.length > 0) {
      onSave(text);
    }
  };

  render() {
    const {text} = this.state;
    const {editing, newTodo, placeholder} = this.props;
    const cssClasses = `${editing && 'edit'} ${newTodo && 'new-todo'}`;
    return (
      <input
        className={cssClasses}
        type="text"
        placeholder={placeholder}
        value={text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}

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
}

export default TextInput;
