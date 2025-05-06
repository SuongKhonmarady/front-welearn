import PropTypes from 'prop-types';
import { useState } from 'react';
import { removeScholarship, updateScholarship } from "../../../../context/scholarship/Scholarship";
import Button from "../../../../ui/shared/Button";
import Input from "../../../../ui/shared/Input";

export default function ScholarshipItem({ data, onRefresh }) {
  const { description, post_at, link, id, deadline } = data;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ description, deadline, post_at, link });

  const handleRemove = async (e) => {
    e.preventDefault();
    const res = await removeScholarship(id);
    if (res) {
      onRefresh();
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
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
    <li className="flex flex-col gap-2 p-5 border-2">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            name="description"
            value={editedData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <Input
            type="date"
            name="deadline"
            value={editedData.deadline || ''}
            onChange={handleChange}
          />
          <Button customClass="bg-green-500 text-white" onClick={handleSave}>
            Save
          </Button>
        </div>
      ) : (
        <div className="flex flex-row gap-5 items-center">
          <div className="flex flex-col gap-2">
            <p>{description}</p>
            <p className="text-blue-500">Post at: {post_at}</p>
            <p className="text-red-500">Deadline: {deadline ? deadline : "No deadline set"}</p>
            <a href={link} className="text-blue-500">
              Link: {link}
            </a>
          </div>
          <div className="flex gap-2">
            <Button customClass="bg-yellow-500 text-white" onClick={handleEdit}>
              Edit
            </Button>
            <Button customClass="bg-red-500 text-white" onClick={handleRemove}>
              Remove
            </Button>
          </div>
        </div>
      )}
    </li>
  );
}

ScholarshipItem.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string.isRequired,
    post_at: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    deadline: PropTypes.string,
  }).isRequired,
  onRefresh: PropTypes.func.isRequired,
};
