import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Apply from './Apply';
import axios from 'axios';
import { useAuth } from '@/context/authContext';
import Loader from '@/components/Loader';

const JobDescription: React.FC = () => {
  const {isAuthenticated,user} = useAuth();
  const router = useRouter();
  const { q } = router.query;
  const [popup, setPopup] = useState(false);
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    if (q) {
      const fetchJob = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/jobs/${q}`);
          setJob(response.data);
        } catch (error) {
          console.error('Error fetching job:', error);
        }
      };
      fetchJob();
    }
  }, [q]);

  if (!job) {
    return <>
      <Navbar />
      <Loader/>
      <Footer />
    </>

  }

  return (
    <>
      <Head>
        <title>Job Description</title>
      </Head>
      <main>
  <Navbar />
  {popup ? <Apply setPopup={setPopup} /> : null}
  <div className="w-full px-4 mx-auto min-h-screen">
    <div className="bg-white shadow-md rounded p-6 mb-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">{job.jobTitle}</h1>
          <p className="text-gray-600">{job.companyName}</p>
          <div className="flex flex-wrap items-center text-gray-600 mt-2">
            <span className="mr-4 flex items-center">
              <i className="fas fa-briefcase mr-1"></i> {job.experience}
            </span>
            <span className="mr-4 flex items-center">
              <i className="fas fa-rupee-sign mr-1"></i> {job.salary}
            </span>
            <span className="flex items-center">
              <i className="fas fa-map-marker-alt mr-1"></i> {job.location}
            </span>
          </div>
          <p className="mt-2 text-gray-400">
            Job Status :{" "}
            <span
              className={
                job.status === "open"
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {job.status}
            </span>
          </p>
          <p className="text-gray-400 mt-2">
            Posted: {new Date(job.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col md:flex-row">
          <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2 mb-2 md:mb-0">
            Save
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => {
              if (!isAuthenticated) {
                alert("Please login to apply for this job");
                router.push("/login");
                return;
              } else if (user.userType == "Employer") {
                alert(
                  "Employer cannot apply for jobs, Kindly login as a Job Seeker or a Candidate"
                );
                return;
              } else {
                setPopup(true);
              }
            }}
            disabled={job.status === "closed"}
          >
            {job.status === "closed" ? "Job Closed" : "Quick Apply"}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Job description</h2>
        <p className="text-gray-700 mb-4">{job.description}</p>
        <ul className="list-disc pl-5 text-gray-700"></ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Role</h2>
        <p className="text-gray-700">{job.role}</p>
        <h2 className="text-xl font-semibold mt-4 mb-2">Industry Type</h2>
        <p className="text-gray-700">{job.industryType}</p>
        <h2 className="text-xl font-semibold mt-4 mb-2">Department</h2>
        <p className="text -gray-700">{job.department}</p>
        <h2 className="text-xl font-semibold mt-4 mb-2">Employment Type</h2>
        <p className="text-gray-700">{job.employmentType}</p>
        <h2 className="text-xl font-semibold mt-4 mb-2">Role Category</h2>
        <p className="text-gray-700">{job.roleCategory}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Education</h2>
        <p className="text-gray-700">{job.education}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Key Skills</h2>
        <div className="flex flex-wrap gap-2">
          {job.skills.split(",").map((skill: string, index: number) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">About company</h2>
        <p className="text-gray-700">{job.companyDescription}</p>
      </div>

      <div className="text-red-500">
        <p>
          Beware of imposters! jobBoard does not promise a job or an interview
          in exchange for money. Fraudsters may ask you to pay in the pretext
          of registration fee, refundable fee...
        </p>
      </div>
    </div>
  </div>
  <Footer />
</main>
    </>
  );
};

export default JobDescription;
