import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import Header from '../components/Header';
import {addTodo} from '../actions';

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const onAdd = useCallback(
    text => dispatch(addTodo(text)),
    [dispatch],
  );
  return <Header onAdd={onAdd} />;
};

export default HeaderContainer;
