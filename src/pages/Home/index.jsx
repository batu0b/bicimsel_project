import React from 'react';

import { Form } from './Form';

export const Home = () => {
  return (
    <div className="p-5 flex flex-col gap-5">
      <Form />
      <div className="flex flex-row flex-wrap ">
        <div className="md:basis-1/2 basis-full">
          <h1 className="font-bold">NFA: </h1>
          <div id="nfa" className="min-h-60"></div>
        </div>
        <div className="md:basis-1/2 basis-full">
          <h1 className="font-bold">DFA: </h1>
          <div id="dfa" className="min-h-60"></div>
        </div>
      </div>
    </div>
  );
};
