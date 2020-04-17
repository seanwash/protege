import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { storage } from '../firebase/firebase'

const JobCard = ({ job }) => {
  const [logoUrl, setLogoUrl] = useState()

  useEffect(() =>  {
    storage
      .ref('images')
      .child(job.companyLogo)
      .getDownloadURL()
      .then(url => {
        setLogoUrl(url)
      })
    }, [job.companyLogo]
  )
  
  return (
    <Link
      to="/"
      className="flex mb-6 md:mb-12 px-3 md:px-6 py-4 bg-white shadow-md border-l-4 border-teal-500"
    >
      <div
        className="hidden md:block shadow-md rounded-full p-2 md:w-1/6 overflow-hidden"
        style={{ width: 75, height: 75 }}
      >
        <img src={logoUrl} alt={`${job.companyName} Logo`} className='h-full w-full'/>
      </div>

      <div className="w-full md:w-11/12 flex justify-between md:pl-6">
        <div className="flex flex-col justify-between">
          <p className="text-sm text-blue-300">{job.companyName}</p>

          <h3 className="md:-mt-1 text-blue-500 leading-tight text-lg md:text-xl font-bold">
            {job.jobTitle}
          </h3>

          <p className="text-teal-700">{job.roleFocus}</p>
        </div>

        <div className="text-right flex flex-col justify-between">
          <p className="text-blue-100">
            {job.postedAt.toDate().toLocaleDateString()}
          </p>

          <p className="text-blue-100 text-sm">{job.companyHQ}</p>
        </div>
      </div>
    </Link>
  )
};

export default JobCard;
