import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CategoryType = {
  _id: string;
  name: string;
  icon: string;
  isTrending: boolean;
};

const getIconComponent = (iconPath: string, name: string) => {
  const MEDIA_URL = import.meta.env.VITE_MEDIA_URL || '';
  
  return (
    <img
      src={`${MEDIA_URL.replace(/\/$/, '')}/uploads/icons/${iconPath.replace(/^\//, '')}`}
      alt={name}
      className="h-10 w-10 object-cover"
      onError={(e) => {
        console.error('Failed to load image:', e);
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
};

const JobCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/jobcategories/trending/all`);
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching trending categories:', err);
        setError('Failed to load trending categories');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/jobs?q=${encodeURIComponent(categoryName)}`);
  };

  if (loading) {
    return (
      <div className="bg-secondary py-8">
        <div className="container mx-auto px-8 md:px-60 my-5 text-center">
          <h2 className="text-2xl font-bold text-center mb-8">Trending Job Categories</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-secondary py-8">
        <div className="container mx-auto px-8 md:px-60 my-5 text-center">
          <h2 className="text-2xl font-bold text-center mb-8">Trending Job Categories</h2>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="bg-secondary py-8">
        <div className="container mx-auto px-8 md:px-60 my-5 text-center">
          <h2 className="text-2xl font-bold text-center mb-8">Trending Job Categories</h2>
          <p>No trending categories found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary py-8">
      <div className="container mx-auto px-8 md:px-60 my-5">
        <h2 className="text-2xl font-bold text-center mb-8">Trending Job Categories</h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 justify-items-center">
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm w-full max-w-[200px] cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="mb-2">{getIconComponent(category.icon, category.name)}</div>
              <h3 className="text-center font-medium">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobCategories;
