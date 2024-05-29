import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { useRouter } from 'next/router';
import PrivateRoute from '@/components/PrivateRoute';
import Link from 'next/link';

interface Job {
  jobId: string;
  jobTitle: string;
  status: string;
}


interface Candidate {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
  resume: string;
  status: string;
  jobId: string;
  applicationStatus: string; 
  userId: string; 
}

const EmplrDash: React.FC = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchJobs = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/jobs/user/${id}`);
          setJobs(response.data);
        } catch (error) {
          console.error('Error fetching jobs:', error);
          setJobs([]);
        }
      };
      fetchJobs();
    }
  }, [id]);

  const handleJobClick = async (jobId: string, jobTitle: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/applications/${jobId}`);
      setSelectedJob(jobTitle);
      setCandidates(response.data.length === 0 ? [] : response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      setCandidates([]);
    }
  };

  const handleCloseJob = async (jobId: string) => {
    const job = jobs.find(job => job.jobId === jobId);
    if (job && job.status === 'closed') {
      alert("Job is already closed");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/jobs/${jobId}/close`);
      setJobs(jobs.map(job => job.jobId === jobId ? { ...job, status: 'closed' } : job));
      alert("Job closed successfully");
    } catch (error) {
      console.error('Error closing job:', error);
    }
  };

  const handleAccept = async (jobId: string,candidateId:String) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/applications/accept/${jobId}/${candidateId}`);
      setCandidates(candidates.map(candidate => 
        candidate.jobId === jobId ? { ...candidate, status: 'accepted' } : candidate
      ));
      alert(response.data.message);
    } catch (error) {
      const errorMsg = axios.isAxiosError(error) && error.response ? error.response.data.message : 'Error accepting application';
      setError(errorMsg);
      console.error('Error accepting application:', error);
    }
  };

  const handleReject = async (jobId: string,candidateId: string) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/applications/reject/${jobId}/${candidateId}`);
      setCandidates(candidates.map(candidate => 
        candidate.jobId === jobId ? { ...candidate, status: 'rejected' } : candidate
      ));
      alert(response.data.message);
    } catch (error) {
      const errorMsg = axios.isAxiosError(error) && error.response ? error.response.data.message : 'Error rejecting application';
      setError(errorMsg);
      console.error('Error rejecting application:', error);
    }
  };

  const handleViewResume = (url: string) => {
    const resumeUrl = `http://localhost:5000/resume/${url}`;
    window.open(resumeUrl, '_blank');
  };

  return (
    <>
      <PrivateRoute>
        <Navbar />
        <div className="w-full max-w-6xl mx-auto min-h-screen p-6">
          <h1 className="text-3xl font-bold mb-6">Employer Dashboard</h1>
          {error && <div className="bg-red-200 text-red-700 p-4 rounded mb-4">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Jobs */}
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold mb-4">Jobs Posted</h2>
              {jobs.length === 0 ? (
                <p>No jobs posted yet</p>
              ) : (
                <ul className="space-y-4">
                  {jobs.map((job) => (
                    <li key={job.jobId} className="p-4 border border-gray-300 rounded shadow">
                      <div className="flex justify-between items-center">
                        <Link href={`/jobdes/?q=${job.jobId}`} className="text-xl font-bold">{job.jobTitle}</Link>
                        <button
                          className={`px-4 py-2 rounded ${job.status === 'closed' ? 'bg-gray-500 cursor-not-allowed text-white' : 'bg-red-500 text-white'}`}
                          onClick={() => handleCloseJob(job.jobId)}
                          disabled={job.status === 'closed'}
                        >
                          {job.status === 'closed' ? 'Closed' : 'Close'}
                        </button>
                      </div>
                      <button
                        className="mt-2 text-blue-500"
                        onClick={() => handleJobClick(job.jobId, job.jobTitle)}
                      >
                        View Candidates
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Applications */}
            <div className="md:col-span-2">
              {selectedJob && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Candidates for {selectedJob}</h2>
                  {candidates.length === 0 ? (
                    <p>No candidates for this job</p>
                  ) : (
                    <ul className="space-y-4">
                      {candidates.map((candidate) => (
                        <li key={candidate.id} className="p-4 border border-gray-300 rounded shadow">
                          <h3 className="text-xl font-bold">{candidate.name}</h3>
                          <p>Email: {candidate.email}</p>
                          <p>Phone: {candidate.phoneNo}</p>
                          <h2>Application Status : <span className={candidate.applicationStatus === "rejected" ? "text-red-500" : "text-green-500"}>{candidate.applicationStatus}</span></h2>

                          <div className="flex space-x-4 mt-4">
                            {candidate.applicationStatus !== 'accepted' && candidate.applicationStatus !== 'rejected' && (
                              <>
                                <button
                                  className="bg-green-500 text-white px-4 py-2 rounded"
                                  onClick={() => handleAccept(candidate.jobId,candidate.userId)}
                                >
                                  Accept
                                </button>
                                <button
                                  className="bg-red-500 text-white px-4 py-2 rounded"
                                  onClick={() => handleReject(candidate.jobId,candidate.userId)}
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {candidate.applicationStatus === 'accepted' && (
                              <button
                                className="bg-green-500 text-white px-4 py-2 rounded cursor-not-allowed"
                                disabled
                              >
                                Accepted
                              </button>
                            )}
                            {candidate.applicationStatus === 'rejected' && (
                              <button
                                className="bg-red-500 text-white px-4 py-2 rounded cursor-not-allowed"
                                disabled
                              >
                                Rejected
                              </button>
                            )}
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded"
                              onClick={() => handleViewResume(candidate.resume)}
                            >
                              View Resume
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {!selectedJob && <p>Select a job to view candidates</p>}
            </div>

          </div>
        </div>
        <Footer />
      </PrivateRoute>
    </>
  );
};

export default EmplrDash;
