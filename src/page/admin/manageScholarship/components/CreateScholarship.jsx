import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Modal from "../../../../ui/shared/Modal";
import Input from "../../../../ui/shared/Input";
import Button from "../../../../ui/shared/Button";
import {
  createScholarship,
  scrabData,
} from "../../../../context/scholarship/Scholarship";

const CreateScholarship = ({ onClose }) => {
  const initialState = {
    link: "",
    description: "",
    accessToken: "",
    deadline: "",
  };
  const [inputData, setInputData] = useState(initialState);
  const [isSuccess, setSuccess] = useState(false);
  const [data, setData] = useState({});

  const onChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { accessToken, link, deadline } = inputData;
    const data = await scrabData(accessToken, link);

    if (data !== null) {
      data.deadline = deadline;
      setSuccess(true);
      setData(data);
    }
  };

  const handleSaveToDb = async (e) => {
    e.preventDefault();
  
    if (!inputData.deadline) {
      console.error('Deadline is required');
      return;
    }
  
    console.log('Formatted Deadline:', inputData.deadline);

    // Convert old scraped data format to new API format
    const scholarshipData = {
      title: data.title || 'Untitled Scholarship',
      description: data.message || data.description || inputData.description,
      link: inputData.link,
      official_link: inputData.link, // Use same link for both
      post_at: new Date().toISOString().split('T')[0],
      deadline: inputData.deadline,
      eligibility: data.eligibility || '',
      host_country: data.country || '',
      host_university: data.university || '',
      program_duration: data.duration || '',
      degree_offered: data.degree || ''
    };
  
    const res = await createScholarship(scholarshipData);
  
    if (res) {
      onClose();
    }
  };

  return (
    <Modal title="Create Scholarship" onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-4 md:p-5 space-y-2 md:space-y-5">
        <div className="flex flex-col gap-2 md:gap-5">
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <label htmlFor="accessToken" className="text-sm font-medium text-white">
              Access Token:
            </label>
            <Input
              style="px-5 py-2 rounded-lg border-2"
              type="text"
              id="accessToken"
              value={inputData.accessToken}
              onChange={onChange}
              required
            />
            <label htmlFor="link" className="text-sm font-medium text-white">
              Link:
            </label>
            <Input
              style="px-5 py-2 rounded-lg border-2"
              type="text"
              id="link"
              value={inputData.link}
              onChange={onChange}
              required
            />
            <label htmlFor="deadline" className="text-sm font-medium text-white">
              Deadline:
            </label>
            <Input
              style="px-5 py-2 rounded-lg border-2"
              type="date"
              id="deadline"
              value={inputData.deadline}
              onChange={onChange}
              required
            />
          </div>
        </div>

        {!isSuccess && (
          <Button type="submit" customClass="bg-white text-[#283d50]">
            Get data
          </Button>
        )}

        {isSuccess && (
          <div className="flex flex-col mx-auto gap-2 text-white">
            <span>{data.message}</span>
            <span>{data.created_time}</span>
            <div>
              <Button
                customClass="bg-white text-[#283d50]"
                onClick={handleSaveToDb}
              >
                Save to dataBase
              </Button>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};

// Add prop types validation
CreateScholarship.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CreateScholarship;