import React from 'react';
import { ArrowDownTrayIcon, PrinterIcon } from '@heroicons/react/24/outline';
import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  PieLabelRenderProps,
} from 'recharts';

const Insight: React.FC = () => {
  const jobPostComparison = [
    { title: 'UI/UX Designer', views: 3270, applications: 420, conversionRate: '13.1%' },
    { title: 'Backend Developer', views: 2780, applications: 520, conversionRate: '18.7%' },
    { title: 'Marketing Lead', views: 1970, applications: 180, conversionRate: '9.1%' },
  ];

  const demographics = [
    { location: 'Kathmandu', experience: '2-4 years', industry: 'IT', applicants: 210 },
    { location: 'Pokhara', experience: '0-2 years', industry: 'Marketing', applicants: 120 },
    { location: 'Lalitpur', experience: '5+ years', industry: 'Design', applicants: 88 },
  ];

  const jobViewsTrendData = [
    { name: 'Mon', views: 500 },
    { name: 'Tue', views: 750 },
    { name: 'Wed', views: 1200 },
    { name: 'Thu', views: 900 },
    { name: 'Fri', views: 1050 },
  ];

  const applicationsReceivedData = [
    { name: 'Mon', applications: 150 },
    { name: 'Tue', applications: 200 },
    { name: 'Wed', applications: 300 },
    { name: 'Thu', applications: 220 },
    { name: 'Fri', applications: 250 },
  ];

  const conversionRateData = [
    { name: 'UI/UX', value: 45, color: '#2563eb' },
    { name: 'Backend', value: 30, color: '#f97316' },
    { name: 'Marketing', value: 25, color: '#4ade80' },
  ];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle = 0,
  innerRadius,
  outerRadius,
  percent = 0,
}: PieLabelRenderProps) => {
  // Coerce string | number to number
  const _cx = Number(cx ?? 0);
  const _cy = Number(cy ?? 0);
  const _innerRadius = Number(innerRadius ?? 0);
  const _outerRadius = Number(outerRadius ?? 0);

  const radius = _innerRadius + (_outerRadius - _innerRadius) * 0.5;
  const x = _cx + radius * Math.cos(-midAngle * RADIAN);
  const y = _cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > _cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};



  return (
    <div className="min-h-screen bg-gray-50 p-6 overflow-auto" style={{ maxHeight: 'calc(100vh - 50px)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mb-6">
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700">
            <PrinterIcon className="w-5 h-5 mr-2" />
            Print
          </button>
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700">
            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
            Download CSV
          </button>
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700">
            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
            Download PDF
          </button>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Job Views Trend */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Job Views Trend</h3>
            <ResponsiveContainer height={200}>
              <LineChart data={jobViewsTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Applications Received */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Applications Received</h3>
            <ResponsiveContainer height={200}>
              <BarChart data={applicationsReceivedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#4ade80" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>          

          {/* Conversion Rates */}
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-4">Conversion Rates</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={conversionRateData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  dataKey="value"
                >
                  {conversionRateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="left" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Job Post Comparison */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Job Post Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-left">
                    <th className="pb-4 font-semibold text-gray-700">Job Title</th>
                    <th className="pb-4 font-semibold text-gray-700">Views</th>
                    <th className="pb-4 font-semibold text-gray-700">Applications</th>
                    <th className="pb-4 font-semibold text-gray-700">Conversion Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {jobPostComparison.map((job) => (
                    <tr key={job.title} className="border-t border-gray-200">
                      <td className="py-3 text-gray-600">{job.title}</td>
                      <td className="py-3 text-gray-600">{job.views}</td>
                      <td className="py-3 text-gray-600">{job.applications}</td>
                      <td className="py-3 text-gray-600">{job.conversionRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Applicant Demographics */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Applicant Demographics</h3>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-left">
                    <th className="pb-4 font-semibold text-gray-700">Location</th>
                    <th className="pb-4 font-semibold text-gray-700">Experience</th>
                    <th className="pb-4 font-semibold text-gray-700">Industry</th>
                    <th className="pb-4 font-semibold text-gray-700">Applicants</th>
                  </tr>
                </thead>
                <tbody>
                  {demographics.map((demo) => (
                    <tr key={demo.location} className="border-t border-gray-200">
                      <td className="py-3 text-gray-600">{demo.location}</td>
                      <td className="py-3 text-gray-600">{demo.experience}</td>
                      <td className="py-3 text-gray-600">{demo.industry}</td>
                      <td className="py-3 text-gray-600">{demo.applicants}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Job Performance Alerts */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Job Performance Alerts</h3>
          <p className="text-sm text-red-500">Backend Developer - Low engagement (Conversion: 9%)</p>
          <p className="text-sm text-green-500">UI/UX Designer - High engagement (Conversion: 22%)</p>
        </div>
      </div>
    </div>
  );
};

export default Insight;
