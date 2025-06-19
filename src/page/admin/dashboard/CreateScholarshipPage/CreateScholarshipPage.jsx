import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../../ui/shared/Input";
import Button from "../../../../ui/shared/Button";
import Spinner from "../../../../ui/shared/Spinner";
import {
  createScholarship,
} from "../../../../context/scholarship/Scholarship";

const CreateScholarshipPage = () => {
  const navigate = useNavigate();  const initialState = {
    title: "",
    description: "",
    link: "",
    official_link: "",
    deadline: "",
    eligibility: "",
    host_country: "",
    host_university: "",
    program_duration: "",
    degree_offered: "",
  };const [inputData, setInputData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Input form, 2: Preview, 3: Success

  const onChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleBack = () => {
    navigate("/admin/scholarships-management");
  };  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['title', 'description'];
    const missingFields = requiredFields.filter(field => !inputData[field]);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return;
    }

    setStep(2); // Move to preview step
  };

  const handleSaveToDb = async (e) => {
    e.preventDefault();
    setIsLoading(true);    try {
      // Prepare data with post_at field and handle null deadline
      const scholarshipData = {
        ...inputData,
        post_at: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        deadline: inputData.deadline || null // Allow null deadline
      };

      const result = await createScholarship(scholarshipData);
      if (result) {
        setStep(3); // Move to success step
        setTimeout(() => {
          navigate("/admin/scholarships-management");
        }, 2000);
      }
    } catch (error) {
      console.error("Error creating scholarship:", error);
    } finally {
      setIsLoading(false);
    }
  };  const handleReset = () => {
    setInputData(initialState);
    setStep(1);
  };

  if (isLoading) {
    return <Spinner isFull />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Create New Scholarship</h1>
              <p className="text-gray-600 mt-2">Add a new scholarship opportunity to the platform</p>
            </div>
            <Button
              customClass="bg-gray-600 text-white hover:bg-gray-700 px-4 py-2"
              onClick={handleBack}
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to List
              </span>
            </Button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Input Details</span>
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'} rounded`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Preview</span>
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'} rounded`}></div>
            <div className={`flex items-center ${step >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Complete</span>
            </div>
          </div>
        </div>

        {/* Step 1: Input Form */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Scholarship Information</h2>            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    label="Scholarship Title"
                    id="title"
                    type="text"
                    value={inputData.title}
                    onChange={onChange}
                    placeholder="Enter scholarship title"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">The name of the scholarship</p>
                </div>
                <div>
                  <Input
                    label="Host University"
                    id="host_university"
                    type="text"
                    value={inputData.host_university}
                    onChange={onChange}
                    placeholder="Enter university name"
                  />
                  <p className="text-sm text-gray-500 mt-1">University offering the scholarship</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">                <div>
                  <Input
                    label="Application Deadline"
                    id="deadline"
                    type="date"
                    value={inputData.deadline}
                    onChange={onChange}
                  />
                  <p className="text-sm text-gray-500 mt-1">Last date to apply (optional)</p>
                </div>
                <div>
                  <Input
                    label="Host Country"
                    id="host_country"
                    type="text"
                    value={inputData.host_country}
                    onChange={onChange}
                    placeholder="Enter country"
                  />
                  <p className="text-sm text-gray-500 mt-1">Country where the scholarship is offered</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    label="Degree Offered"
                    id="degree_offered"
                    type="text"
                    value={inputData.degree_offered}
                    onChange={onChange}
                    placeholder="e.g., Bachelor's, Master's, PhD"
                  />
                  <p className="text-sm text-gray-500 mt-1">Type of degree program</p>
                </div>
                <div>
                  <Input
                    label="Program Duration"
                    id="program_duration"
                    type="text"
                    value={inputData.program_duration}
                    onChange={onChange}
                    placeholder="e.g., 4 years, 2 years"
                  />
                  <p className="text-sm text-gray-500 mt-1">Length of the program</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    label="Scholarship Link"
                    id="link"
                    type="url"
                    value={inputData.link}
                    onChange={onChange}
                    placeholder="https://example.com/scholarship"
                  />
                  <p className="text-sm text-gray-500 mt-1">General scholarship information link</p>
                </div>
                <div>
                  <Input
                    label="Official Application Link"
                    id="official_link"
                    type="url"
                    value={inputData.official_link}
                    onChange={onChange}
                    placeholder="https://example.com/apply"
                  />
                  <p className="text-sm text-gray-500 mt-1">Official application portal</p>
                </div>
              </div>

              <div>
                <Input
                  label="Description"
                  id="description"
                  type="textarea"
                  value={inputData.description}
                  onChange={onChange}
                  placeholder="Describe the scholarship, its purpose, and what it covers..."
                  rows={4}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Detailed information about the scholarship</p>
              </div>

              <div>
                <Input
                  label="Eligibility Requirements"
                  id="eligibility"
                  type="textarea"
                  value={inputData.eligibility}
                  onChange={onChange}
                  placeholder="List the eligibility criteria and requirements..."
                  rows={3}
                />
                <p className="text-sm text-gray-500 mt-1">Who can apply and what are the requirements</p>
              </div><div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  customClass="bg-gray-500 text-white hover:bg-gray-600 px-6 py-3"
                  onClick={handleBack}
                >
                  Cancel
                </Button>                <Button
                  type="submit"
                  customClass="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3"
                  disabled={!inputData.title || !inputData.description}
                >
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Preview Scholarship
                  </span>
                </Button>
              </div>
            </form>
          </div>
        )}        {/* Step 2: Preview */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Preview Scholarship</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-800">{inputData.title}</h3>
                {inputData.host_university && (
                  <p className="text-gray-600 mt-2">{inputData.host_university}</p>
                )}
              </div>              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Application Deadline</h4>
                  <p className="text-gray-600">{inputData.deadline || 'No deadline specified'}</p>
                </div>
                {inputData.host_country && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Host Country</h4>
                    <p className="text-gray-600">{inputData.host_country}</p>
                  </div>
                )}
                {inputData.degree_offered && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Degree Offered</h4>
                    <p className="text-gray-600">{inputData.degree_offered}</p>
                  </div>
                )}
              </div>

              {inputData.program_duration && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Program Duration</h4>
                  <p className="text-gray-600">{inputData.program_duration}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inputData.link && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Scholarship Link</h4>
                    <a href={inputData.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                      {inputData.link}
                    </a>
                  </div>
                )}
                {inputData.official_link && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Official Application Link</h4>
                    <a href={inputData.official_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                      {inputData.official_link}
                    </a>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600 whitespace-pre-wrap">{inputData.description}</p>
              </div>

              {inputData.eligibility && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Eligibility Requirements</h4>
                  <p className="text-gray-600 whitespace-pre-wrap">{inputData.eligibility}</p>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">System Information</h4>
                <p className="text-sm text-gray-600">
                  <strong>Post Date:</strong> {new Date().toLocaleDateString()}
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  customClass="bg-gray-500 text-white hover:bg-gray-600 px-6 py-3"
                  onClick={handleReset}
                >
                  Edit Details
                </Button>
                <Button
                  type="button"
                  customClass="bg-green-600 text-white hover:bg-green-700 px-6 py-3"
                  onClick={handleSaveToDb}
                >
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Save Scholarship
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
            <div className="text-green-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Scholarship Created Successfully!</h2>
            <p className="text-gray-600 mb-6">The scholarship has been added to the platform and is now available for students to view.</p>
            <p className="text-sm text-gray-500">Redirecting to scholarship list...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateScholarshipPage;
