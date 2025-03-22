import React from 'react';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <section>
        <div className="text-xl font-bold underline hover:bg-blue-500">Hello world!</div>
        <div className=" inline-block bg-red-600 py-2.5 px-4 rounded-3xl  mt-5 font-medium hover:bg-red-700 active:bg-red-800">
          Hire Me!
        </div>
      </section>
    </Layout>
  );
}
