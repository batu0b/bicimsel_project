import React from 'react';

export const Header = () => {
  return (
    <div className="h-16  shadow-xl flex justify-between items-center py-2 px-5">
      <h1 className="md:text-xl font-bold font-mono">NFA-&gt;DFA</h1>
      <div className="flex-row flex gap-1">
        <h1 className="md:text-xl font-bold font-mono">Batuhan Bahayetmez</h1>
        <div className="border-t sm:border-t-0 sm:border-s border-gray-200 dark:border-neutral-700"></div>

        <h1 className="md:text-xl font-bold font-mono">G211210043</h1>
      </div>
    </div>
  );
};
