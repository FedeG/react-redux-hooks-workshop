import React from 'react';
import PropTypes from 'prop-types';

import Footer from './Footer';
import TodoList from './TodoList';

const MainSection = ({ todos, todosCount, actions }) => (
  <section className="main">
    <span>
      <input className="toggle-all" type="checkbox" checked={false} readOnly />
      <label />
    </span>
    <TodoList todos={todos} actions={actions} />
    {todosCount > 0 && <Footer todosCount={todosCount} />}
  </section>
);

MainSection.propTypes = {
  todosCount: PropTypes.number.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  actions: PropTypes.object.isRequired,
};

export default MainSection;
