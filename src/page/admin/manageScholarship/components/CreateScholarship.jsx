import React, { useState } from "react";
import Modal from "../../../../ui/shared/Modal";
import Input from "../../../../ui/shared/Input";
import Button from "../../../../ui/shared/Button";
import {
  createScholarship,
  scrabData,
} from "../../../../context/scholarship/Scholarship";
import { toast } from "react-toastify";

export default function CreateScholarship({ onClose }) {
  const initialState = {
    link: "",
    description: "",
    accessToken: "",
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

    const { accessToken, link } = inputData;
    const data = await scrabData(accessToken, link);
    console.log(data)
    if (data !== null) {
      setSuccess(true);
      setData(data);
    }
  };

  const handleSaveToDb = async (e) => {
    e.preventDefault();
    const res = await createScholarship(data, inputData.link);
    if (res) {
      onClose();
    }
  };

  return (
    <Modal title="Create Scholarship" onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="p-4 md:p-5 space-y-2 md:space-y-5"
      >
        <div className="flex flex-col gap-2 md:gap-5">
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <label
              htmlFor="accessToken"
              className="text-sm font-medium text-white"
            >
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
                onClick={handleSaveToDb} // Pass the function reference here
              >
                Save to dataBase
              </Button>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
}
