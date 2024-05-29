import Link from 'next/link';
import React from 'react';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  const handlePost = () => {
    if (!isAuthenticated) {
      alert("Signup as Employer to post jobs")
      router.push('/signup')
    }
    else {
      if (user && user.userType === "Employer") {
        router.push('/postjob');
      } else {
        alert('You are not authorized to post jobs. Kindly Signup as Employer to post jobs.');
      }
    }
  };

  return (
    <footer className="flex flex-col md:flex-row justify-between px-10 py-10 bg-blue-600 text-white border-t mt-[10rem]">
      <div className="mb-8 md:mb-0 flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-3xl font-semibold">Job Board</h1>
        <p className="text-[0.8rem]">Find your dream job</p>
      </div>

      <ul className="flex flex-col text-white md:flex-row list-none gap-4 mb-8 md:mb-0">
        <li className="hover:text-gray-800">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-gray-800">
          <Link href="/jobs">Browse Jobs</Link>
        </li>
        <li className="hover:text-gray-800 cursor-pointer" onClick={handlePost}>
          Post jobs
        </li>
        <li className="hover:text-gray-800">
          <Link href="https://www.linkedin.com/in/mandeepyadav27/" target="_blank">
            Contact
          </Link>
        </li>
      </ul>

      <div className="flex flex-col items-center md:items-end text-center md:text-right ">
        <h1 className="text-4xl text-white font-semibold tracking-[-1px]">
          Let's Keep in touch
        </h1>
        <p className="text-sm mt-3 text-gray-200">
          Subscribe to keep up with fresh news and exciting updates. We promise not
          to spam you!
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-end mt-5 w-full md:w-auto">
          <input
            type="text"
            className="px-2 text-black py-2 outline-none border-t border-b border-l w-full md:w-auto mb-3 md:mb-0"
            placeholder="Enter your email address"
          />
          <button className="bg-[#01D365] border px-4 py-2 text-black w-full md:w-auto">
            Send
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;