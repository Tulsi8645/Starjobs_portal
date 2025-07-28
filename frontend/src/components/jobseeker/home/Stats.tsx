import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStats } from '../jobseekerApi/api';

const Stats: React.FC = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['adminStats'],
    queryFn: getStats,
  });

  if (isLoading) return <p className="text-center py-10">Loading stats...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Failed to load stats.</p>;

  return (
    <div className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        

          <div className="p-4">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-1">{stats?.totalJobseekers}</h3>
            <p className="text-gray-600">Jobseekers</p>
          </div>

          
          <div className="p-4">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-1">{stats?.totalJobs}</h3>
            <p className="text-gray-600"> Active Jobs</p>
          </div>
            
          <div className="p-4">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-1">{stats?.totalApplications}</h3>
            <p className="text-gray-600">Applications Received</p>
          </div>

          <div className="p-4">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-1">{stats?.totalEmployers}</h3>
            <p className="text-gray-600">Companies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
