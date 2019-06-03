import {connect} from 'react-redux';

import Header from '../components/Header';
import {addTodoAsync} from '../actions';

const mapStateToProps = () => ({});
const mapDispatchToProps = {addTodo: addTodoAsync};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
