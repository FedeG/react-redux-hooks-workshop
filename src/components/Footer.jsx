import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({quantity}) => {
  const itemWord = quantity === 1 ? 'item' : 'items';
  return (
    <footer className="footer">
      <span className="todo-count">
        {`${quantity} ${itemWord} left`}
      </span>
    </footer>
  );
};

Footer.propTypes = {
  quantity: PropTypes.number.isRequired,
};

export default Footer;
