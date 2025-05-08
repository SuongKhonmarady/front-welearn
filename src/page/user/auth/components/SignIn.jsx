import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../assets/Logo.png";
import { signin } from "../../../../context/user/UserAction";
import Input from "../../../../ui/shared/Input";
import Button from "../../../../ui/shared/Button";
import PropTypes from 'prop-types';

export default function SignIn({ setAuthOption }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const signInStatus = await signin(formData.email, formData.password);
    if (signInStatus) {
      navigate("/");
    }
  };

  return (
    <>
      <div className="w-full md:w-1/2 p-5">
        <h1 className="text-xl md:text-3xl font-semibold">Sign In</h1>
        <p className="mt-5 uppercase">Please provide us</p>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 py-5">
          {/* Form Inputs */}
          <Input
            onChange={onChange}
            type="text"
            placeholder="Example@gmail.com"
            id="email"
            style="p-2 border rounded-xl"
            autoComplete="off"
            required
          />
          <Input
            onChange={onChange}
            type="password"
            placeholder="Password"
            id="password"
            style="p-2 border rounded-xl"
            autoComplete="off"
            required
          />
          <Button type="submit" customClass="bg-[#283d50] text-white">
            Sign In
          </Button>
        </form>
        <div className="mt-5 grid grid-cols-3 items-center text-gray-400">
          <hr className="border-gray-600" />
          <p className="text-center text-">Or</p>
          <hr className="border-gray-600" />
        </div>

        <div className="mt-6 text-black flex justify-between gap-2 items-center">
          <p>Create an account</p>
          <Button
            customClass="bg-[#283d50] text-white"
            type="button"
            onClick={() => setAuthOption("Sign Up")}
          >
            Sign up
          </Button>
        </div>
      </div>

      <div className="w-1/2 md:flex hidden justify-center items-center">
        <img src={Logo} alt="ScholarLink Logo" className="rounded-xl" />
      </div>
    </>
  );
}

SignIn.propTypes = {
  setAuthOption: PropTypes.func.isRequired
};
