import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-between px-10 py-3 bg-[#037EE8] items-center text-white sticky top-0 z-[9] shadow-md">
      <div className="logo select-none">
        <h1 className="text-2xl font-semibold">Job Board</h1>
        <p className="text-[0.7rem]">Find your dream job</p>
      </div>

      <div className="hidden md:flex list-none gap-10">
        <li className="hover:text-zinc-300">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-zinc-300">
          <Link href="/jobs">Browse Jobs</Link>
        </li>
        <li className="hover:text-zinc-300">
          <Link href="https://www.linkedin.com/in/mandeepyadav27/" target="_blank">
            Contact
          </Link>
        </li>
        {user && (
          <li className="hover:text-zinc-300">
            <Link href={user.userType === "Employer" ? `/emplrdash?id=${user.userId}` : `/empledash/?id=${user.userId}`}>
              Your Profile
            </Link>
          </li>
        )}
      </div>

      <div className="hidden md:flex list-none gap-3 items-center">
        {isAuthenticated ? (
          <>
            <li className="hover:text-zinc-300 cursor-pointer" onClick={logout}>
              Logout
            </li>
            {user && user.userType === "Employer" && (
              <li className="bg-[#01D365] px-2 py-2 rounded">
                <Link href="/postjob">Post Job</Link>
              </li>
            )}
          </>
        ) : (
          <>
            <li className="hover:text-zinc-300">
              <Link href="/login">Login</Link>
            </li>
            <li className="bg-[#01D365] px-2 py-2 rounded">
              <Link href="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </div>

      {/* Hamburger Menu */}
      <div className="md:hidden">
        <button
          className="text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6 fill-current"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                fillRule="evenodd"
                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:hidden absolute top-[4.5rem] left-0 w-full bg-[#037EE8] text-white z-10`}
      >
        <ul className="list-none p-4">
          <li className="py-2 hover:text-zinc-300">
            <Link href="/">Home</Link>
          </li>
          <li className="py-2 hover:text-zinc-300">
            <Link href="/jobs">Browse Jobs</Link>
          </li>
          <li className="py-2 hover:text-zinc-300">
            <Link href="https://www.linkedin.com/in/mandeepyadav27/" target="_blank">
              Contact
            </Link>
          </li>
          {user && (
            <li className="py-2 hover:text-zinc-300">
              <Link href={user.userType === "Employer" ? `/emplrdash?id=${user.userId}` : `/empledash/?id=${user.userId}`}>
                Your Profile
              </Link>
            </li>
          )}
          {isAuthenticated ? (
            <>
              <li className="py-2 hover:text-zinc-300 cursor-pointer" onClick={logout}>
                Logout
              </li>
              {user && user.userType === "Employer" && (
                <li className="py-2 bg-[#01D365] px-2 py-2 rounded">
                  <Link href="/postjob">Post Job</Link>
                </li>
              )}
            </>
          ) : (
            <>
              <li className="py-2 hover:text-zinc-300">
                <Link href="/login">Login</Link>
              </li>
              <li className="py-2 bg-[#01D365] px-2 py-2 rounded">
                <Link href="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;