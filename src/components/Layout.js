import React from 'react';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="m-auto max-w-screen-xl">
      <Navbar />
      <div>{children}</div>
      <footer className=" text-center text-gray-400 my-10 mx-auto">
        <p>Copyright 2024 BrokenIceLight</p>
      </footer>
    </div>
  );
}
