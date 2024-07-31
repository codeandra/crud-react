import React from 'react';

const Input = ({ label, type, name, id, placeholder, value, oc }) => {
  return (
    <div className="max-w-sm space-y-1">
      <label htmlFor={id} className="font-semibold text-slate-600">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={oc}
        className="py-2 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        placeholder={placeholder}
        autoComplete='off'
        required
      />
    </div>
  );
};

export default Input;
