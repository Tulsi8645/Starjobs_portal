import React from 'react';
import { stats } from '../../../utils/mockData';

const Stats: React.FC = () => {
  return (
    <div className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-1">{stats.jobs}</h3>
            <p className="text-gray-600">Jobs</p>
          </div>

          <div className="p-4">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-1">{stats.applications}</h3>
            <p className="text-gray-600">Application Received</p>
          </div>

          <div className="p-4">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-1">{stats.resumes}</h3>
            <p className="text-gray-600">Resume Received</p>
          </div>

          <div className="p-4">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-1">{stats.companies}</h3>
            <p className="text-gray-600">Company</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;