import { InputProps } from '@material-tailwind/react';
import React, { useRef } from 'react';

export default function Input({
  label,
  error,
  type,
  name,
  onChange,
  accept,
}: {
  type?: any;
  label?: string;
  error?: string;
  name?: string;
  onChange?: any;
  accept?: string;
}) {
  const ref = useRef(null);
  return (
    <div className="px-3">
      <p className="text-gray-700">{label}</p>
      <input
        accept={accept}
        onChange={onChange}
        ref={ref}
        type={type}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      />
      <p className="">{error ? error : ''}</p>
    </div>
  );
}
