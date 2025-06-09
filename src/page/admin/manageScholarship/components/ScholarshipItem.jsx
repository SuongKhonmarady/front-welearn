import PropTypes from 'prop-types';
import { useState } from 'react';
import { removeScholarship, updateScholarship } from "../../../../context/scholarship/Scholarship";
import Button from "../../../../ui/shared/Button";
import Input from "../../../../ui/shared/Input";

export default function ScholarshipItem({ data, onRefresh }) {
  const { title, description, provider, post_at, link, id, deadline } = data;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ 
    title: title || '',
    description: description || '', 
    provider: provider || '',
    deadline: deadline || '', 
    post_at: post_at || '', 
    link: link || '' 
  });

  // Calculate deadline status
  const deadlineDate = new Date(deadline);
  const currentDate = new Date();
  const daysUntilDeadline = Math.ceil((deadlineDate - currentDate) / (1000 * 60 * 60 * 24));
  const isExpired = daysUntilDeadline < 0;
  const isUrgent = daysUntilDeadline <= 7 && daysUntilDeadline >= 0;

  const handleRemove = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this scholarship?')) {
      const res = await removeScholarship(id);
      if (res) {
        onRefresh();
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ 
      title: title || '',
      description: description || '', 
      provider: provider || '',
      deadline: deadline || '', 
      post_at: post_at || '', 
      link: link || '' 
    });
  };

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const updatedData = {
      ...editedData,
    };

    const res = await updateScholarship(id, updatedData);
    if (res) {
      setIsEditing(false);
      onRefresh();
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-md border-l-4 hover:shadow-lg transition-all duration-300 ${
      isExpired ? 'border-l-red-500' : isUrgent ? 'border-l-yellow-500' : 'border-l-blue-500'
    }`}>
      {isEditing ? (
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Edit Scholarship</h3>
            <span className="text-sm text-gray-500">ID: {id}</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <Input
                type="text"
                name="title"
                value={editedData.title}
                onChange={handleChange}
                placeholder="Scholarship title"
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
              <Input
                type="text"
                name="provider"
                value={editedData.provider}
                onChange={handleChange}
                placeholder="Scholarship provider"
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={editedData.description}
                onChange={handleChange}
                placeholder="Scholarship description"
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <Input
                  type="date"
                  name="deadline"
                  value={editedData.deadline}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Posted Date</label>
                <Input
                  type="date"
                  name="post_at"
                  value={editedData.post_at}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
              <Input
                type="url"
                name="link"
                value={editedData.link}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full"
              />
            </div>
          </div>
          
          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
            <Button 
              customClass="bg-green-600 text-white hover:bg-green-700 px-4 py-2" 
              onClick={handleSave}
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Save Changes
              </span>
            </Button>
            <Button 
              customClass="bg-gray-600 text-white hover:bg-gray-700 px-4 py-2" 
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            {/* Main Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-700 mb-2 line-clamp-2">
                    {title || 'Untitled Scholarship'}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    {provider || 'Unknown Provider'}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ml-4 ${
                  isExpired 
                    ? 'bg-red-100 text-red-800' 
                    : isUrgent 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {isExpired ? 'Expired' : isUrgent ? 'Urgent' : 'Active'}
                </span>
              </div>
              
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {description || 'No description available.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-gray-600">
                    <span className="font-medium">Posted:</span> {post_at ? new Date(post_at).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className={`font-medium ${isExpired ? 'text-red-600' : isUrgent ? 'text-yellow-600' : 'text-green-600'}`}>
                    Deadline: {deadline ? new Date(deadline).toLocaleDateString() : 'No deadline'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                  </svg>
                  {link ? (
                    <a 
                      href={link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                    >
                      View Application
                    </a>
                  ) : (
                    <span className="text-gray-500">No link available</span>
                  )}
                </div>
              </div>
              
              {deadline && (
                <div className="mt-3 text-sm">
                  <span className={`font-medium ${isExpired ? 'text-red-600' : isUrgent ? 'text-yellow-600' : 'text-green-600'}`}>
                    {isExpired 
                      ? `Expired ${Math.abs(daysUntilDeadline)} days ago` 
                      : `${daysUntilDeadline} days remaining`
                    }
                  </span>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-row lg:flex-col gap-2 lg:ml-4">
              <Button 
                customClass="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm" 
                onClick={handleEdit}
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  Edit
                </span>
              </Button>
              <Button 
                customClass="bg-red-600 text-white hover:bg-red-700 px-4 py-2 text-sm" 
                onClick={handleRemove}
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Delete
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ScholarshipItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    provider: PropTypes.string,
    post_at: PropTypes.string,
    link: PropTypes.string,
    deadline: PropTypes.string,
  }).isRequired,
  onRefresh: PropTypes.func.isRequired,
};
