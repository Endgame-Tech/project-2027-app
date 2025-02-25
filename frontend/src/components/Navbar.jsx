import React from 'react';
import logo from '../images/mandate-4-logo.svg';

const Navbar = () => {
  return (
    <div className='relative container mx-auto py-6 px-[5%]'>
      <div className="flex justify-between items-center">
        <div>
          <a href="/"><img src={logo} width="200px" alt="logo" /></a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
