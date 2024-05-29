import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import PrivateRoute from '@/components/PrivateRoute';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';
import Loader from '@/components/Loader';

interface JobDetails {
  jobId: string;
  jobTitle: string;
  companyName: string;
  applicationStatus: string;
  name: string;
  email: string;
  phoneNo: string;
  userId: string;
}

const EmployeeDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [userDetails, setUserDetails] = useState<JobDetails[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<JobDetails[]>(`http://localhost:5000/api/applications/user/${id}`);
        const userData = response.data;
        console.log(userData);
        setUserDetails(userData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  if (!userDetails || userDetails.length === 0) {
    return (
      <>
        <PrivateRoute>
          <Navbar />
          <div className="w-full max-w-6xl mx-auto min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="bg-white shadow-md rounded p-6 mb-4">
                  <h2 className="text-2xl font-semibold mb-4">Candidate Details</h2>
                  <p><strong>Name:</strong> {!isAuthenticated ? "default" : user?.name}</p>
                  <p><strong>Email:</strong> {!isAuthenticated ? "default" : user?.email}</p>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="bg-white shadow-md rounded p-6">
                  <h2 className="text-2xl font-bold mb-4">Jobs Applied For</h2>
                  <ul className="space-y-4 h-[120vh] overflow-y-auto px-2">
                    <h1>Didn't apply for any job yet!</h1>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </PrivateRoute>
      </>
    );
  }

  return (
    <PrivateRoute>
      <Navbar />
      <div className="w-full max-w-6xl mx-auto min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white shadow-md rounded p-6 mb-4">
              <h2 className="text-2xl font-semibold mb-4">Candidate Details</h2>
              <p><strong>Name:</strong> {userDetails[0]?.name}</p>
              <p><strong>Email:</strong> {userDetails[0]?.email}</p>
              <p><strong>Phone:</strong> {userDetails[0]?.phoneNo}</p>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="bg-white shadow-md rounded p-6">
              <h2 className="text-2xl font-bold mb-4">Jobs Applied For</h2>
              <ul className="space-y-4 h-[120vh] overflow-y-auto px-2">
                {userDetails.map((job) => (
                  <li key={job.userId} className="p-4 border border-gray-300 rounded shadow">
                    <Link href={`/jobdes/?q=${job.jobId}&jt=${job.jobTitle}&cn=${job.companyName}`} className="text-2xl font-bold">{job.jobTitle}</Link>
                    <h3 className="text-xl font-semibold">{job.companyName}</h3>
                    <h2>Status: {job.applicationStatus}</h2>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </PrivateRoute>
  );
};

export default EmployeeDashboard;
      