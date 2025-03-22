import { Link } from 'gatsby';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="grid grid-cols-2 my-10 mx-auto">
      <div className=" font-bold text-3xl">
        <h1>Buick Electra Limited</h1>
      </div>
      <div className="  inline-block text-right">
        <Link
          className=" ml-5 font-normal pb-2 border-b-2 hover:border-white  border-solid border-transparent inline-block"
          to="/"
        >
          Home
        </Link>
        <Link
          className=" ml-5 font-normal pb-2 border-b-2 hover:border-white  border-solid border-transparent inline-block"
          to="/geschichte"
        >
          Geschichte
        </Link>
        <Link
          className=" ml-5 font-normal pb-2 border-b-2 hover:border-white  border-solid border-transparent inline-block"
          to="/restauration"
        >
          Restauration
        </Link>
        <Link
          className=" ml-5 font-normal pb-2 border-b-2 hover:border-white  border-solid border-transparent inline-block"
          to="/unterlagen"
        >
          Unterlagen
        </Link>
        <Link
          className=" ml-5 font-normal pb-2 border-b-2 hover:border-white  border-solid border-transparent inline-block"
          to="/kontakt"
        >
          Kontakt
        </Link>
        <Link
          className=" ml-5 font-normal pb-2 border-b-2 hover:border-white  border-solid border-transparent inline-block"
          to="/links"
        >
          Links
        </Link>
      </div>
    </nav>
  );
}
