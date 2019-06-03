import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as TodoActions from '../actions';
import MainSection from '../components/MainSection';

const mapStateToProps = state => ({
  todosCount: state.todos.length,
  todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainSection);
