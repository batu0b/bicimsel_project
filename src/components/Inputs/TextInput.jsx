import React from 'react';

export const TextInput = ({ placeholder, onChange, value, label, helperText }) => {
  return (
    <div className="w-full">
      <span className="font-bold text-lg">{label}</span>
      <input
        type="text"
        id="first_name"
        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-700/90 border-gray-600 placeholder-gray-400 text-white "
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span>{helperText}</span>
    </div>
  );
};
