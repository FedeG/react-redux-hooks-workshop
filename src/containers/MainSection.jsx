import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {deleteTodo, editTodo, completeTodo} from '../actions';
import MainSection from '../components/MainSection';

const MainSectionContainer = () => {
  const dispatch = useDispatch();
  const onEdit = useCallback(
    (id, text) => dispatch(editTodo(id, text)),
    [dispatch],
  );
  const onComplete = useCallback(
    id => dispatch(completeTodo(id)),
    [dispatch],
  );
  const onDelete = useCallback(
    id => dispatch(deleteTodo(id)),
    [dispatch],
  );
  const todosCount = useSelector(state => state.todos.length);
  const todos = useSelector(state => state.todos);
  return (
    <MainSection
      todosCount={todosCount}
      todos={todos}
      onEdit={onEdit}
      onComplete={onComplete}
      onDelete={onDelete}
    />
  );
};

export default MainSectionContainer;
