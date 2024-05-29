import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';
import { IoIosSearch } from "react-icons/io";
import Link from 'next/link';
import axios from 'axios';

interface Job {
    _id: string;
    jobTitle: string;
    companyName: string;
    experience: string;
    salary: string;
    location: string;
    description: string;
    skills: string;
    industry: string;
    jobType: string;
    degree: string;
    createdAt: string;
    jobId: string;
}

const sortOptions = [{ name: 'Relevance' }, { name: 'Date' }, { name: 'Salary' }];
const salaryOptions = [
    { name: '0-50K' },
    { name: '50K-100K' },
    { name: '100K-150K' },
    { name: '150K-250K' },
    { name: '250K-500K' },
    { name: '500K+' }
];

const extractSalaryNumbers = (salary: string): number[] => {
    const regex = /[\d,]+/g;
    const matches = salary.match(regex);
    if (!matches) return [];
    return matches.map(match => parseInt(match.replace(/,/g, ''), 10));
};

const convertToDollars = (salary: string): string => {
    const numbers = extractSalaryNumbers(salary);
    if (numbers.length === 0) return 'N/A';
    return `$${numbers.map(num => num.toLocaleString()).join(' - ')}`;
};

const Jobs: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('Relevance');
    const [selectedSalaryRanges, setSelectedSalaryRanges] = useState<string[]>([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get<Job[]>('http://localhost:5000/api/jobs');
                setJobs(response.data);
                setFilteredJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    useEffect(() => {
        filterJobs();
    }, [searchTerm, sortOption, selectedSalaryRanges]);

    const handleSearch = () => {
        filterJobs();
    };

    const filterJobs = () => {
        let filtered = [...jobs];

        if (searchTerm) {
            const searchTerms = searchTerm.toLowerCase().split(' ').filter(term => term);
            filtered = filtered.filter(job => {
                const jobText = `${job.jobTitle} ${job.companyName} ${job.description} ${job.skills} ${job.industry} ${job.jobType} ${job.degree}`.toLowerCase();
                return searchTerms.every(term => jobText.includes(term));
            });
        }

        if (selectedSalaryRanges.length > 0) {
            filtered = filtered.filter(job => {
                const jobSalaries = extractSalaryNumbers(job.salary);
                if (jobSalaries.length === 0) return false;

                for (const range of selectedSalaryRanges) {
                    const [min, max] = range.split('-').map(val => parseInt(val.replace(/\D/g, ''), 10));
                    const jobMin = jobSalaries[0];
                    const jobMax = jobSalaries[1] || jobSalaries[0];
                    if (jobMin >= min && jobMax <= max) return true;
                }
                return false;
            });
        }

        if (sortOption === 'Date') {
            filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else if (sortOption === 'Salary') {
            filtered = filtered.sort((a, b) => {
                const aSalary = extractSalaryNumbers(a.salary);
                const bSalary = extractSalaryNumbers(b.salary);
                return (bSalary[0] || 0) - (aSalary[0] || 0);
            });
        }

        setFilteredJobs(filtered);
    };

    const handleSortChange = (sortName: string) => {
        setSortOption(sortName);
    };

    const handleSalaryFilterChange = (salaryRange: string) => {
        const selected = selectedSalaryRanges.includes(salaryRange)
            ? selectedSalaryRanges.filter(range => range !== salaryRange)
            : [...selectedSalaryRanges, salaryRange];
        setSelectedSalaryRanges(selected);
    };

    const escapeRegExp = (string: string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    const highlightText = (text: string, highlight: string) => {
        const escapedHighlight = escapeRegExp(highlight);
        const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));
        return parts.map((part, index) => (
            <span
                key={index}
                style={part.toLowerCase() === highlight.toLowerCase() ? { backgroundColor: 'yellow' } : {}}
            >
                {part}
            </span>
        ));
    };

    return (
        <>
            <Head>
                <title>Browse Jobs</title>
            </Head>
            <Navbar />
            <main className="flex flex-col md:flex-row h-auto md:h-[100vh] w-[90%] mx-auto">
                <div className="w-full md:w-[25%] my-5 shadow-lg rounded p-5 md:block">
                    <h1 className="text-xl">All Filters</h1>
                    <div className="my-3 pt-2 mx-2 border-t border-gray">
                        <h1 className="text-l">Sort by:</h1>
                        <ul className="mt-1 text-gray-700">
                            {sortOptions.map((sort, index) => (
                                <li key={index} className="flex gap-1 items-center">
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={sortOption === sort.name}
                                        onChange={() => handleSortChange(sort.name)}
                                    />
                                    {sort.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="my-3 py-2 mx-2 border-t border-b border-gray">
                        <h1 className="text-l">Salary (in dollars)</h1>
                        <ul className="mt-1 text-gray-700">
                            {salaryOptions.map((salary, index) => (
                                <li key={index} className="flex gap-1 items-center">
                                    <input
                                        type="checkbox"
                                        name="salary"
                                        checked={selectedSalaryRanges.includes(salary.name)}
                                        onChange={() => handleSalaryFilterChange(salary.name)}
                                    />
                                    {salary.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="w-full md:w-[75%] my-5">
                    <div className="flex justify-end items-center px-1 py-1 rounded-full">
                        <input
                            type="text"
                            placeholder="Search Jobs"
                            className="text-sm px-2 outline-none w-full md:w-auto border border-gray py-2 rounded-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            className="bg-[#01D365] rounded-full p-2 text-white ml-2 md:ml-0 -translate-x-[2.2rem]"
                            onClick={handleSearch}
                        >
                            <IoIosSearch />
                        </button>
                    </div>
                    <div className="h-auto md:h-[100vh] overflow-y-auto mt-5">
                        {filteredJobs.map((job) => (
                            <div
                                key={job._id}
                                className="w-full md:w-[80%] m-5 bg-white shadow-lg rounded-lg p-6 mb-4"
                            >
                                <Link
                                    href={`/jobdes/?q=${job.jobId}&jt=${job.jobTitle}&cn=${job.companyName}`}
                                    className="text-xl font-semibold"
                                >
                                    {highlightText(job.jobTitle, searchTerm)}
                                </Link>
                                <p className="text-gray-600">{job.companyName}</p>
                                <div className="flex items-center text-gray-600">
                                    <span className="mr-2">{job.experience}</span>
                                    <span className="mr-2">|</span>
                                    <span className="mr-2">{convertToDollars(job.salary)}</span>
                                    <span className="mr-2">|</span>
                                    <span>{job.location}</span>
                                </div>
                                <p className="text-gray-800 my-2">{job.description.substring(0, 100)}...</p>
                                <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                                    {job.skills.split(',').map((skill, i) => (
                                        <span key={i} className="bg-gray-200 p-1 rounded">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-400 text-sm mt-2">
                                    {new Date(job.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Jobs;
