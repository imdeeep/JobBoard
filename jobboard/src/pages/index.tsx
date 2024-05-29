import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Link from 'next/link';
import board from "@/assets/board.png";
import Image from 'next/image';
import { MdArrowForwardIos } from "react-icons/md";
import { useRouter } from 'next/router';
import Footer from './Footer';

const cards = [
  { name: 'Remote' },
  { name: 'MNC' },
  { name: 'Marketing' },
  { name: 'Project Management' },
  { name: 'Software & IT' },
  { name: 'Banking & Finance' },
  { name: 'HR' },
  { name: 'Internship' },
  { name: 'Fresher' },
  { name: 'Engineering' },
  { name: 'Data Science' }
];

const companies = [
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', rating: '4.5', reviews: '120 reviews', description: 'Global leader in technology and innovation' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg', rating: '4.2', reviews: '95 reviews', description: 'Leading multinational technology company' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', rating: '4.3', reviews: '110 reviews', description: 'E-commerce giant with global presence' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg', rating: '4.0', reviews: '89 reviews', description: 'Leading social media company' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', rating: '4.6', reviews: '150 reviews', description: 'Innovative technology company known for iPhones and Macs' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png', rating: '4.1', reviews: '80 reviews', description: 'Innovative electric vehicle and clean energy company' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg', rating: '4.3', reviews: '85 reviews', description: 'Leading streaming service and production company' },
  { logo: 'https://cdn.vox-cdn.com/thumbor/5fTM5k46cYTaGMKlA35PJMgqpPU=/0x0:1920x1080/1400x1050/filters:focal(960x540:961x541)/cdn.vox-cdn.com/uploads/chorus_asset/file/24760594/Adobe_wordmark.jpg', rating: '4.2', reviews: '75 reviews', description: 'Software company known for creative and multimedia products' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Intel_logo_2023.svg/2560px-Intel_logo_2023.svg.png', rating: '4.0', reviews: '88 reviews', description: 'Global leader in semiconductor technology' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg', rating: '4.1', reviews: '82 reviews', description: 'Multinational technology and consulting company' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/2560px-Cisco_logo_blue_2016.svg.png', rating: '4.3', reviews: '70 reviews', description: 'Leader in networking and cybersecurity solutions' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png', rating: '3.9', reviews: '73 reviews', description: 'Leading ride-sharing and transportation network company' },
];

const Index = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();

  const handleSearch = () => {
    router.push({
      pathname: '/jobs',
    });
  };

  useEffect(() => {
    const newSuggestions = [];
    if (keyword) newSuggestions.push('Keyword');
    if (location) newSuggestions.push('Location');
    if (category) newSuggestions.push('Category');
    setSuggestions(newSuggestions);
  }, [keyword, location, category]);

  return (
    <>
      <Head>
        <title>JobBoard</title>
      </Head>
      <main>
        {/* NAVBAR */}
        <Navbar />

        {/* HERO */}
        <div className='w-full px-10 h-[70vh] bg-[#037EE8] flex flex-col md:flex-row'>
          <div className='text-white pt-[5rem] md:pl-[5rem]'>
            <h2 className='text-2xl'>4300+ Jobs listed</h2>
            <h1 className='text-5xl leading-[4.2rem]'>Find Your Dream Job</h1>
            <p className='text-sm mb-10'>We Provide online cash with quick approval that suits your term length</p>
            <Link className='bg-[#01D365] px-5 py-3 rounded' href="jobs">Find jobs now</Link>
          </div>
          <div className='hidden md:block'>
            <Image src={board} alt="" className='absolute translate-x-[6rem] translate-y-[2rem]' />
          </div>
        </div>

        {/* Page-1 */}
        <div className="page1 w-full px-10 md:h-[70vh] mt-[3rem]">

          <div className='relative w-full md:w-[75vw] mx-auto flex flex-col md:flex-row justify-center gap-5 items-center rounded-full shadow-lg py-5 md:rounded'>
            <input
              type="text"
              placeholder='Search keyword'
              className='outline-none px-1 py-1 w-full md:w-auto'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <span className='text-gray-400 hidden md:block'>|</span>
            <input
              type="text"
              placeholder='Location'
              className='outline-none px-1 py-1 w-full md:w-auto'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <span className='text-gray-400 hidden md:block'>|</span>
            <input
              type="text"
              placeholder='Category'
              className='outline-none px-1 py-1 w-full md:w-auto'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button
              className='bg-[#01D365] px-3 py-1 text-black rounded-full text-white'
              onClick={handleSearch}
            >
              Find Job
            </button>
            {suggestions.length > 0 && (
              <div className='absolute top-[3.5rem] bg-white border border-gray-300 rounded shadow-lg p-2 w-full md:w-[75vw]'>
                {suggestions.map((suggestion, index) => (
                  <div key={index} className='px-2 py-1 text-gray-700'>
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='flex gap-5 mt-20 w-full md:w-[70vw] mx-auto flex-wrap justify-center'>
            {cards.map((card, index) => (
              <button key={index} className='flex items-center gap-1 px-3 py-4 rounded border border-gray hover:shadow-lg'>
                {card.name} <MdArrowForwardIos size={12} />
              </button>
            ))}
          </div>
        </div>

        {/* Page-2 */}
        <div className="page2 w-full px-10 h-auto">
          <h1 className='text-2xl font-semibold tracking-[-1px] text-center'>Featured companies actively hiring</h1>

          <div className="companycards flex gap-10 mt-10 justify-center flex-wrap">
            {companies.map((company, index) => (
              <div key={index} className="border-dashed border-2 border-gray-300 w-full md:w-[15%] flex flex-col gap-2 h-[40vh] items-center justify-center">
                <img src={company.logo} className='w-[30%] mx-auto' alt="" />
                <div className="text-gray-500 text-sm mx-auto text-center">{company.rating} | {company.reviews}</div>
                <p className='text-sm text-gray-500 text-center px-2'>{company.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <Footer/>
      </main>
    </>
  );
};

export default Index;
