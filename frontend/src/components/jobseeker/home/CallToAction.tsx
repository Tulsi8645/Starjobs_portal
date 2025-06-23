import React from 'react';
import Keyboard from '../../../assets/jobseekerassests/Rectangle 89.png';
const CallToAction: React.FC = () => {
  return (
    <div className="relative bg-white mt-10 py-12">
      <div className="container mx-auto px-12 py-2">
        <div className="flex flex-col md:flex-row items-center pl-6 pb-1 rounded-xl bg-secondary justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="max-w-lg">
              <h2 className="text-2xl font-semibold text-gray-600 leading-tight mb-4">
                Skill is more than a trait<br/>
                it's a foundation for excellence<br/>
                and a catalyst for meaningful impact."
              </h2>
              
              <button className="mt-6 inline-block bg-primary text-white px-4 py-3 rounded-md hover:bg-primary/90 transition-colors duration-200 text-sm font-medium">
                Join Now
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <img src={Keyboard} alt="Logo" className="h-auto w-auto" /> {/* Example using <img> tag */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;