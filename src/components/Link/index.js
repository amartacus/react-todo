import React from 'react';

const Link = ({active, children, onClick}) => {
  if(active){
      return <span>{children}</span>;
  }
  return(
      <span className="link"
          onClick={e => {
              e.preventDefault();
              onClick();
          }}
      >
      {children}
      </span>
  );
};

export default Link;