'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import axios from 'axios';
import Image from 'next/image';
import personIcon from '../../public/Icons/boy.png';
import userIcon from '../../public/Icons/person-circle-sharp.svg';
import cityIcon from '../../public/Icons/location-sharp.svg';
import companyIcon from '../../public/Icons/business-sharp.svg';
import phoneIcon from '../../public/Icons/call-sharp.svg';
import moreIcon from '../../public/Icons/more.png';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

const fetchUsers = async (page: number): Promise<User[]> => {
  const { data } = await axios.get<User[]>(
    `https://jsonplaceholder.typicode.com/users?page=${page}`
  );
  return data;
};

const UserTable: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState([{ id: 'name', desc: false }]);
  const [users, setUsers] = useState<User[]>([]);
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);
  const [showMenu, setShowMenu] = useState<number | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['users', page],
    queryFn: () => fetchUsers(page),
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setUsers(data);
      setSortedUsers(data);
    }
  }, [data]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let sortColumn: string;
    let sortDirection: 'asc' | 'desc';
    switch (value) {
      case 'name-asc':
        sortColumn = 'name';
        sortDirection = 'asc';
        break;
      case 'name-desc':
        sortColumn = 'name';
        sortDirection = 'desc';
        break;
      default:
        return;
    }
    setSorting([{ id: sortColumn, desc: sortDirection === 'desc' }]);
  };

  useEffect(() => {
    const sortedData = [...users];
    sortedData.sort((a, b) => {
      const aValue = a[sorting[0].id as keyof User];
      const bValue = b[sorting[0].id as keyof User];
      if (aValue < bValue) return sorting[0].desc ? 1 : -1;
      if (aValue > bValue) return sorting[0].desc ? -1 : 1;
      return 0;
    });
    setSortedUsers(sortedData);
  }, [sorting, users]);

  const handleDelete = (userId: number) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    const updatedSortedUsers = sortedUsers.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setSortedUsers(updatedSortedUsers);
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // Close the dropdown if the user clicks outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: () => (
        <div className="flex items-center space-x-1">
          <Image src={userIcon} alt="Name" width={15} height={15} />
          <span>Name</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            {' '}
            <Image src={personIcon} alt="Person Icon" width={15} height={15} />
            <span>{row.original.name}</span>{' '}
          </div>
          <p className="ml-9 text-xs text-gray-600">{row.original.email}</p>
        </div>
      ),
    },
    {
      accessorKey: 'address.city',
      header: () => (
        <div className="flex items-center space-x-1">
          <Image src={cityIcon} alt="City" width={15} height={15} />
          <span>City</span>
        </div>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'company.name',
      header: () => (
        <div className="flex items-center space-x-1">
          <Image src={companyIcon} alt="Company" width={15} height={15} />
          <span>Company</span>
        </div>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'phone',
      header: () => (
        <div className="flex items-center space-x-1">
          <Image src={phoneIcon} alt="Phone" width={15} height={15} />
          <span>Phone</span>
        </div>
      ),
    },
    {
      accessorKey: 'date',
      header: () => (
        <div className="flex items-center space-x-1">
          <span>Date added</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <p className="ml-9 text-xs text-gray-600">Dec 27, 2024</p>
        </div>
      ),
    },
    {
      accessorKey: 'delete',
      header: () => <span></span>,
      cell: ({ row }) => (
        <div className="relative">
          <button
            onClick={() =>
              setShowMenu((prev) =>
                prev === row.original.id ? null : row.original.id
              )
            }
            className="flex justify-start"
          >
            <Image src={moreIcon} alt={'user'} width={15} height={15} />
          </button>

          {/* Dropdown Menu */}
          {showMenu === row.original.id && (
            <div
              ref={dropdownRef}
              className="absolute right-4 mt-1 w-28 bg-white shadow-lg rounded-md border border-gray-300 z-10"
            >
              <ul className="text-gray-700">
                <li
                  className="px-4 py-2 hover:bg-gray-100 active:bg-gray-200 transition-all ease-in-out cursor-pointer"
                  onClick={() => {
                    console.log('Edit user:', row.original.id);
                  }}
                >
                  Edit
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 active:bg-gray-200 transition-all ease-in-out cursor-pointer text-red-600"
                  onClick={() => handleDelete(row.original.id)}
                >
                  Delete
                </li>
              </ul>
            </div>
          )}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: sortedUsers,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading)
    return <div className="text-center mt-4 text-2xl">Loading...</div>;
  if (isError)
    return (
      <div className="text-center mt-4 text-red-500">Error fetching data.</div>
    );

  return (
    <div className="container mx-auto text-black">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold mb-4 text-slate-700">
          All Users <span className="text-slate-500">1000</span>
        </h1>
        <div className="flex items-start gap-4">
          <div className="mb-4 flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Search"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="border p-2 rounded-md h-10 w-full text-black"
            />
            <div className="text-sm text-gray-600">
              <span>
                Use this search to filter the data across all columns.
              </span>
            </div>
          </div>

          <div className="mb-4 flex gap-2 items-center">
            <p>Sort</p>
            <select
              onChange={handleSortChange}
              className="border p-2 rounded-md h-10 w-full text-gray-500"
              value={
                sorting.length === 0
                  ? 'default'
                  : `${sorting[0].id}-${sorting[0].desc ? 'desc' : 'asc'}`
              }
            >
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md">
        <table className="min-w-full border-collapse">
          <thead className="bg-slate-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-2 text-center">
                    <div className="flex items-center space-x-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted()
                        ? header.column.getIsSorted() === 'desc'
                          ? '↓'
                          : '↑'
                        : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b hover:bg-gray-100 transition-all ease-in-out h-14"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50 ${
            page !== 1 &&
            'hover:scale-105 hover:bg-gray-200 active:bg-gray-200 active:scale-95 transition-all ease-in-out'
          }`}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-sm">Page {page} of 100</span>
        <button
          className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50 ${
            page !== 100 &&
            'hover:scale-105 hover:bg-gray-200 active:bg-gray-200 active:scale-95 transition-all ease-in-out'
          }`}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === 100}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
