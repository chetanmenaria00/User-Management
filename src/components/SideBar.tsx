'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import home from '../../public/Icons/home-sharp.svg';
import user from '../../public/Icons/people-sharp.svg';
import analytics from '../../public/Icons/analytics-sharp.svg';

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`lg:w-64 lg:static fixed top-0 left-0 h-full bg-white border-r text-gray-700 transition-transform duration-300 ease-in-out transform z-20 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4">
          <span className="text-lg font-bold">Navigation</span>
          <button
            className="lg:hidden p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="mt-6 space-y-4 px-4">
          {/* <Link className="" href="/dashboard/home"> */}
          <li className="pl-6 py-4 pr-2 hover:bg-gray-100 rounded-lg flex justify-start gap-6 active:bg-gray-200 active:scale-95 transition-all ease-in-out">
            Home
            <Image src={home} alt={'Home'} width={20} height={20} />
          </li>
          {/* </Link> */}
          <hr />
          <Link className="" href="/dashboard/users">
            <li className="pl-6 py-4 pr-2 hover:bg-gray-100 rounded-lg flex justify-start gap-6 active:bg-gray-200 active:scale-95 transition-all ease-in-out">
              Users
              <Image src={user} alt={'Users'} width={20} height={20} />
            </li>
          </Link>
          <hr />
          {/* <Link className="" href="/dashboard/profile"> */}
          <li className="pl-6 py-4 pr-2 hover:bg-gray-100 rounded-lg flex justify-start gap-6 active:bg-gray-200 active:scale-95 transition-all ease-in-out">
            Analytics
            <Image src={analytics} alt={'Profile'} width={20} height={20} />
          </li>
          {/* </Link> */}
          <hr />
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
