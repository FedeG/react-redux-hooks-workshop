import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {deleteTodo, editTodo, completeTodo} from '../actions';
import MainSection from '../components/MainSection';

const mapStateToProps = state => ({
  todosCount: state.todos.length,
  todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
  onEdit: bindActionCreators(editTodo, dispatch),
  onComplete: bindActionCreators(completeTodo, dispatch),
  onDelete: bindActionCreators(deleteTodo, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainSection);
