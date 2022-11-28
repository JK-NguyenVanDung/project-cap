import { IconButton } from '@material-tailwind/react';
import React from 'react';
import { IoSearch } from 'react-icons/io5';
import { actions } from 'react-table';
import { useAppDispatch } from '../../../hook/useRedux';
import CustomButton from '../Button';

export default function SearchBar(props: any) {
  return (
    <form className="flex items-center ">
      <label className="sr-only">Search</label>
      <div className="relative w-full ">
        <input
          type="text"
          id="simple-search"
          className=" outline-none shadow-xl min-w-[20rem] pr-10 bg-white border border-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Tìm kiếm"
          onChange={(e) => props.onSearch(e.target.value)}
        />
        <div className="flex absolute inset-y-0 right-0 items-center pl-3 ">
          <IconButton variant="text" color="gray">
            <IoSearch className="text-xl" />
          </IconButton>
        </div>
      </div>
    </form>
  );
}
