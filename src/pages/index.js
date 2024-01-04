import React from 'react';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <section>
      <Navbar />
      <div className="text-3xl font-bold underline hover:bg-slate-500">Hello world!</div>
    </section>
  );
}
