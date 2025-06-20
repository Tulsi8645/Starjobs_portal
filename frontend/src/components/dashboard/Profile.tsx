import React from 'react';
import { Linkedin, Facebook, Twitter, Download } from 'lucide-react';

const Profile = () => {
  const profile = {
    name: 'John Doe',
    title: 'UI/UX Designer',
    email: 'demologin@gmail.com',
    phone: '987463210',
    address: 'Thimi, Bhaktapur',
    dob: '1999-05-16',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    bio: 'Lorem ipsum dolor sit amet consectetur. Aliquam amet sed eu amet enim. At morbi integer diam vestibulum sociis. Cras nec et tortor tristique velit diam nunc suspendisse tempus.',
    education: [
      {
        level: 'University',
        institution: 'Demo University',
        degree: 'Bachelor Degree',
        year: '2018-2023'
      },
      {
        level: 'High School',
        institution: 'Demo High School',
        degree: 'Plus 2',
        year: '2018-2023'
      },
      {
        level: 'School',
        institution: 'School',
        degree: 'Schooling',
        year: '2018-2023'
      }
    ],
    skills: ['HTML', 'CSS', 'UI/UX'],
    experience: [
      {
        title: 'UI/UX Designer',
        company: 'Infotech Developer',
        period: '2023-present'
      },
      {
        title: 'UI/UX Designer',
        company: 'Info Developer',
        period: '2020-2023'
      },
      {
        title: 'UI/UX Designer',
        company: 'Tech Developer',
        period: '2018-2020'
      }
    ]
  };

  return (
    <div className="bg-gray-50 p-6 overflow-auto"  style={{ maxHeight: 'calc(100vh - 50px)' }}>
      <div className="max-w-4xl mx-auto ">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
              </div>
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-gray-600">{profile.title}</p>
              <p className="text-sm text-gray-500 mt-4">{profile.bio}</p>
              <div className="flex justify-center space-x-4 mt-6">
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <h3 className=" font-semibold text-gray-500">Email</h3>
                  <p className="text-primary">{profile.email}</p>
                </div>
                <div>
                  <h3 className=" font-semibold text-gray-500">Phone no.</h3>
                  <p className="text-primary">{profile.phone}</p>
                </div>
                <div>
                  <h3 className=" font-semibold text-gray-500">Address</h3>
                  <p className="text-primary">{profile.address}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className=" font-semibold text-gray-500">Date of Birth</h3>
                  <button className="flex items-center text-white bg-primary px-4 py-2 rounded-md hover:bg-primary/90">
                    <Download size={16} className="mr-2" />
                    Download CV
                  </button>
                </div>
                <p>{profile.dob}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-4">Qualification</h3>
                <div className="space-y-4">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-24 text-gray-500">{edu.level}</div>
                      <div className="flex-1 flex items-center">
                        <span className="mx-2">→</span>
                        <div className="flex-1">{edu.institution}</div>
                        <span className="mx-2">→</span>
                        <div className="w-32">{edu.degree}</div>
                        <div className="w-24 text-right">{edu.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <React.Fragment key={index}>
                      <span className="px-3 py-1 bg-gray-100 rounded-md">
                        {skill}
                        <button className="ml-2 text-gray-400 hover:text-gray-600">×</button>
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-md">
                        {skill}
                        <button className="ml-2 text-gray-400 hover:text-gray-600">×</button>
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Experiences</h3>
                <div className="space-y-4">
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-gray-500">{exp.title}</span>
                        <span className="mx-2">→</span>
                        <span>{exp.company}</span>
                      </div>
                      <span className="text-gray-500">{exp.period}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;