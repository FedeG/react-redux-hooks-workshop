import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({todosCount}) => {
  const itemWord = todosCount === 1 ? 'item' : 'items';
  return (
    <footer className="footer">
      <span className="todo-count">
        {`${todosCount} ${itemWord} left`}
      </span>
    </footer>
  );
};

Footer.propTypes = {
  todosCount: PropTypes.number.isRequired,
};

export default Footer;
