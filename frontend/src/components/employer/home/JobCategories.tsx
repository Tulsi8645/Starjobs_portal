import React from 'react';
import Backend from '../../../assets/jobcategories/backend.svg';
import Content from '../../../assets/jobcategories/content.svg';
import Ui from '../../../assets/jobcategories/uiux.svg';
import Digital from '../../../assets/jobcategories/digital.svg';
import Frontend from '../../../assets/jobcategories/frontend.svg';
import Graphic from '../../../assets/jobcategories/graphic.svg';

// Define the type if you're using TypeScript
type CategoryType = {
  id: string;
  name: string;
  icon: string;
};

// Mapping icon names to actual imported icons
const iconMap: { [key: string]: string } = {
  Backend,
  Content,
  Ui,
  Digital,
  Frontend,
  Graphic,
};

// Helper to render the correct image/icon
const getIconComponent = (iconName: string) => {
  const iconSrc = iconMap[iconName];
  return <img src={iconSrc} alt={iconName} className="w-12 h-12" />;
};

const JobCategories: React.FC = () => {
  const categories: CategoryType[] = [
    { id: '1', name: 'Backend Developer', icon: 'Backend' },
    { id: '2', name: 'Content Writing', icon: 'Content' },
    { id: '3', name: 'UI/UX Designer', icon: 'Ui' },
    { id: '4', name: 'Digital Marketing', icon: 'Digital' },
    { id: '5', name: 'Frontend Developer', icon: 'Frontend' },
    { id: '6', name: 'Graphic Designing', icon: 'Graphic' },
  ];

  return (
    <div className="bg-secondary py-12">
      <div className="container mx-auto px-8 md:px-60 my-20">
        <h2 className="text-2xl font-bold text-center mb-8">Popular Job Category</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 justify-items-center">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-card p-4 text-center hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1 aspect-square flex flex-col justify-center items-center w-full max-w-[150px]"
            >
              <div className="flex justify-center mb-4">
                {getIconComponent(category.icon)}
              </div>
              <h3 className="font-semibold text-base">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobCategories;
