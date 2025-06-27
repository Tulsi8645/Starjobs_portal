import { MoreVertical } from 'lucide-react';

const candidates = [
  {
    id: 1,
    name: 'Bharat Rawal',
    email: 'bharat@gmail.com',
    jobTitle: 'Senior Frontend Developer',
    status: 'Pending',
    appliedDate: 'Mar 15, 2025',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1'
  },
  {
    id: 2,
    name: 'Bharat Rawal',
    email: 'bharat@gmail.com',
    jobTitle: 'Senior Frontend Developer',
    status: 'Approved',
    appliedDate: 'Mar 15, 2025',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1'
  },
  {
    id: 1,
    name: 'Bharat Rawal',
    email: 'bharat@gmail.com',
    jobTitle: 'Senior Frontend Developer',
    status: 'Pending',
    appliedDate: 'Mar 15, 2025',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1'
  },
  {
    id: 1,
    name: 'Bharat Rawal',
    email: 'bharat@gmail.com',
    jobTitle: 'Senior Frontend Developer',
    status: 'Approved',
    appliedDate: 'Mar 15, 2025',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1'
  },
  {
    id: 1,
    name: 'Bharat Rawal',
    email: 'bharat@gmail.com',
    jobTitle: 'Senior Frontend Developer',
    status: 'Pending',
    appliedDate: 'Mar 15, 2025',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1'
  },
  
];

const CandidateList = () => {
  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Candidate List</h1>
          <div className="flex items-center space-x-4">
            <select className="border rounded-md px-3 py-2 text-sm">
              <option>Sort by (Default)</option>
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg overflow-hidden">
          <div className="flex space-x-4 mb-4">
            <button className="text-primary border-b-2 border-primary px-4 py-2">All</button>
            <button className="text-gray-600 hover:text-primary px-4 py-2">Pending</button>
            <button className="text-gray-600 hover:text-primary px-4 py-2">Shortlisted</button>
            <button className="text-gray-600 hover:text-primary px-4 py-2">Rejected</button>
            <button className="text-gray-600 hover:text-primary px-4 py-2">Hired</button>
          </div>

          <table className="w-full">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-3 text-left">Job Title</th>
                <th className="px-6 py-3 text-left">Candidate Details</th>
                <th className="px-6 py-3 text-left">Applied Date</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium">{candidate.jobTitle}</span>
                      <span className="text-sm text-gray-500">Remote</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img src={candidate.avatar} alt={candidate.name} className="w-8 h-8 rounded-full mr-3" />
                      <div>
                        <div className="font-medium">{candidate.name}</div>
                        <div className="text-sm text-gray-500">{candidate.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{candidate.appliedDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      candidate.status === 'Pending' ? 'bg-green-100 text-green-800' :
                      candidate.status === 'Shortlisted' ? 'bg-blue-100 text-blue-800' :
                      candidate.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-600 hover:text-primary">View Profile</button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CandidateList;