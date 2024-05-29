import React, { useState, useRef, useEffect, FormEvent, ChangeEvent, DragEvent } from 'react';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/router';

interface ApplyProps {
  setPopup: (state: boolean) => void;
}

const Apply: React.FC<ApplyProps> = ({ setPopup }) => {
  const router = useRouter();
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const { user, isAuthenticated } = useAuth();
  const [name, setName] = useState<string>(!isAuthenticated ? "default" : user.name || "");
  const [email, setEmail] = useState<string>(!isAuthenticated ? "default" : user.email || "");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [hasApplied, setHasApplied] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { q, jt, cn } = router.query;
  const jobId = q as string;

  useEffect(() => {
    const checkApplicationStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/applications/check/${jobId}/${user.userId}`);
        if (response.data.hasApplied) {
          setHasApplied(true);
        }
      } catch (error) {
        console.error("There was an error checking the application status!", error);
      }
    };
    if (user && jobId) {
      checkApplicationStatus();
    }
  }, [jobId, user]);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const fileType = e.dataTransfer.files[0].type;
      if (fileType === "application/pdf" || fileType === "application/msword" || fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setFileName(e.dataTransfer.files[0].name);
        setFile(e.dataTransfer.files[0]);
      } else {
        alert("Only PDF and Word files are allowed.");
      }
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileType = e.target.files[0].type;
      if (fileType === "application/pdf" || fileType === "application/msword" || fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setFileName(e.target.files[0].name);
        setFile(e.target.files[0]);
      } else {
        alert("Only PDF and Word files are allowed.");
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (hasApplied) {
      alert("You have already applied for this job.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("jobId", jobId);
      formData.append("userId", user.userId);
      formData.append("jobTitle", jt as string);  
      formData.append("companyName", cn as string);  
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phoneNo", phoneNo);
      formData.append("resume", file!);

      await axios.post('http://localhost:5000/api/applications/apply', formData);

      alert('Applied successfully');
      router.push('/jobs');
    } catch (error) {
      console.error("There was an error uploading the file!", error);
    }
  };

  return (
    <div className="w-[50vw] h-[80vh] translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg fixed top-20 z-10 p-6">
      <button
        className="bg-blue-500 rounded-full p-1 absolute right-2 top-2"
        onClick={() => setPopup(false)}
      >
        <RxCross2 size={25} color="white" />
      </button>
      <h1 className="text-2xl font-bold mb-6 text-center">Apply for the Job</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none"
          type="tel"
          placeholder="Enter your phone number"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          required
        />
        <div
          className={`w-full p-6 mb-4 border-2 rounded border-dashed flex flex-col items-center justify-center text-gray-500 transition ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          {dragActive ? (
            <p>Drop your file here...</p>
          ) : fileName ? (
            <p>{fileName}</p>
          ) : (
            <p>Drag & drop your resume here, or click to select a file</p>
          )}
          <button className="mt-4 text-blue-500 font-semibold">Select File</button>
          <input
            className="hidden"
            type="file"
            ref={inputRef}
            onChange={handleChange}
            accept=".pdf, .doc, .docx"
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded" type="submit" disabled={hasApplied}>
          {hasApplied ? "Already Applied" : "Apply"}
        </button>
      </form>
    </div>
  );
}

export default Apply;
