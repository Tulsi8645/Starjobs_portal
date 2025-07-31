import React from 'react';
import Keyboard from '../../../assets/jobseekerassests/Rectangle 89.png';
import { useNavigate } from 'react-router-dom';

const CallToAction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white mt-10 py-12">
      <div className="container mx-auto px-6 md:px-12 py-2">
        <div className="flex flex-col md:flex-row items-center pl-6 rounded-xl bg-secondary justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="max-w-lg pt-4">
              <h2 className="text-lg sm:text-xl  md:text-2xl font-semibold text-gray-700 leading-relaxed sm:leading-snug mb-2">
                Skill is more than a trait,<br />
                it's a foundation for excellence,<br />
                and a catalyst for meaningful impact.
              </h2>

              <button
                onClick={() => navigate('/signup')}
                className="mt-3 inline-block bg-primary text-white px-5 py-3 rounded-md hover:bg-primary/90 transition-colors duration-200 text-sm font-medium"
              >
                Join Now
              </button>
            </div>
          </div>

          <div className="md:w-1/2">
            <img src={Keyboard} alt="Keyboard" className="h-auto w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
