import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/router';

const PostJob: React.FC = () => {
  const {user} = useAuth();
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [experience, setExperience] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [role, setRole] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [department, setDepartment] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [roleCategory, setRoleCategory] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const jobData = {
      jobTitle,
      companyName,
      experience,
      salary,
      location,
      description,
      role,
      industryType,
      department,
      employmentType,
      roleCategory,
      education,
      skills,
      userId : user.userId,
      email : user.email
    };
    
    try {
      const response = await axios.post('http://localhost:5000/api/jobs/create', jobData);
      setError('');
      alert('Job posted successfully')
      router.push("/")
    } catch (error) {
      setError('Error posting job. Please try again.');
      console.log(error)
      setSuccess('');
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full max-w-4xl mx-auto min-h-screen p-6">
        <div className="bg-white shadow-md rounded p-6 mb-4">
          <h1 className="text-2xl font-bold mb-6 text-center">Post a Job</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Job Title</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Job Title"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Company Name</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Experience</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Experience"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Salary</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="Salary"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Location</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Role</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Role"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Industry Type</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={industryType}
                  onChange={(e) => setIndustryType(e.target.value)}
                  placeholder="Industry Type"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Department</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Department"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Employment Type</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  placeholder="Employment Type"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Role Category</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={roleCategory}
                  onChange={(e) => setRoleCategory(e.target.value)}
                  placeholder="Role Category"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Education</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="Education"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-gray-700 mb-2">Key Skills</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="Key Skills (comma-separated)"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-gray-700 mb-2">Job Description</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Job Description"
                  rows={4}
                ></textarea>
              </div>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded" type="submit">
              Post Job
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostJob;
