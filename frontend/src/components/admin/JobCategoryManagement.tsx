import { useState, useEffect } from 'react';
import { 
  getJobCategories, 
  createJobCategory, 
  updateJobCategory, 
  deleteJobCategory, 
  toggleJobCategoryTrending,
  JobCategory
} from './adminApi/api';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus, FaStar } from 'react-icons/fa';
const MEDIA_URL = import.meta.env.VITE_MEDIA_URL || "";

const JobCategories = () => {
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<JobCategory | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: null as File | null
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getJobCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        icon: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    if (formData.icon) {
      formDataToSend.append('icon', formData.icon);
    }

    try {
      if (currentCategory) {
        await updateJobCategory(currentCategory._id, formDataToSend);
        toast.success('Category updated successfully');
      } else {
        await createJobCategory(formDataToSend);
        toast.success('Category created successfully');
      }
      setIsModalOpen(false);
      setFormData({ name: '', icon: null });
      setCurrentCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Failed to save category');
    }
  };

  const handleEdit = (category: JobCategory) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      icon: null
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteJobCategory(id);
        toast.success('Category deleted successfully');
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        toast.error('Failed to delete category');
      }
    }
  };

  const handleToggleTrending = async (id: string, isCurrentlyTrending: boolean) => {
    try {
      await toggleJobCategoryTrending(id, !isCurrentlyTrending);
      toast.success(`Category ${!isCurrentlyTrending ? 'added to' : 'removed from'} trending`);
      fetchCategories();
    } catch (error) {
      console.error('Error toggling trending status:', error);
      toast.error('Failed to update trending status');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Categories</h1>
        <button
          onClick={() => {
            setCurrentCategory(null);
            setFormData({ name: '', icon: null });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
        >
          <FaPlus /> Add Category
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Icon
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trending
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {category.icon && (
                     
                      <img
                        src={`${MEDIA_URL.replace(/\/$/, '')}/uploads/icons/${category.icon.replace(/^\//, '')}`}
                        alt={category.name}
                        className="h-10 w-10 object-cover"
                        onError={(e) => {
                          console.error('Failed to load image:', e);
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleTrending(category._id, category.isTrending)}
                      className={`p-2 rounded-full ${category.isTrending ? 'text-yellow-500' : 'text-gray-400'} hover:bg-gray-100`}
                      title={category.isTrending ? 'Remove from trending' : 'Add to trending'}
                    >
                      <FaStar className="w-5 h-5" />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                      title="Edit"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {currentCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="icon">
                    {currentCategory ? 'Change Icon (Leave empty to keep current)' : 'Icon'}
                  </label>
                  <input
                    type="file"
                    id="icon"
                    name="icon"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    {currentCategory ? 'Update' : 'Create'} Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCategories;
