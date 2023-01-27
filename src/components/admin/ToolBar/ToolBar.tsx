import { IconButton } from '@material-tailwind/react';
import React, { useRef } from 'react';
import { IoSearch } from 'react-icons/io5';
import { actions } from 'react-table';
import { useAppDispatch } from '../../../hook/useRedux';
import CustomButton from '../Button';

export default function SearchBar(props: any) {
  const inputRef = useRef(null);
  return (
    <div className="flex items-center ">
      <label className="sr-only">Search</label>
      <div className="relative w-full ">
        {props.prefix && (
          <div className="flex absolute inset-y-0 left-0 items-center pr-3 ">
            <IconButton
              variant="text"
              color="blue"
              onClick={() => props.onSearch(inputRef.current.value)}
            >
              <IoSearch className="text-xl" />
            </IconButton>
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          id="simple-search"
          className={` sm:min-w-[10rem] md:min-w-[20rem] lg:min-w-[20rem] bg-white border border-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ${
            props.prefix ? 'pl-10 pr-2.5 p-2.5' : 'pr-10 pl-2.5 p-2.5 '
          } dark:bg-gray-700 dark:border-gray-600 outline-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            props.className ? props.className : ' shadow-xl '
          }`}
          placeholder="Tìm kiếm"
          onChange={(e) =>
            props.prefix ? null : props.onSearch(e.target.value)
          }
          onKeyDown={(e) =>
            props.prefix && e.key === 'Enter'
              ? props.onSearch(inputRef.current.value)
              : null
          }
        />
        {!props.prefix && (
          <div className="flex absolute inset-y-0 right-0 items-center pl-3 ">
            <IconButton variant="text" color="gray">
              <IoSearch className="text-xl" />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}
