import { Link } from 'gatsby';
import React from 'react';

export default function Navbar() {
  return (
    <nav>
      <h1>Buick Electra Limited</h1>
      <div className="bg-teal-100">
        <Link to="/">Home</Link>
        <Link to="/geschichte">Geschichte</Link>
        <Link to="/restauration">Restauration</Link>
        <Link to="/unterlagen">Unterlagen</Link>
        <Link to="/kontakt">Kontakt</Link>
        <Link to="/links">Links</Link>
      </div>
    </nav>
  );
}
