import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios
        .post(`https://fin12.onesystem.uz/api/v1/register/`, formData)
        .then((response) => console.log(response.data));

      alert("Successfully created account!");
    } catch (error) {
      console.error(error);
    } finally {
      setFormData({
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        password2: "",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-[400px] mx-auto">
        <h2 className="fontPoppins font-extrabold text-[40px] leading-9 tracking-[0.08em] text-center text-[#f8c023] mb-8">
          Financial Management
        </h2>

        <h3 className="text-2xl font-semibold text-center mb-8">
          Create an account
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 mb-10">
          <label htmlFor="username" className="flex flex-col gap-y-2">
            <span>User name</span>
            <input
              type="text"
              name="username"
              id="username"
              placeholder=""
              onChange={handleChange}
              className="px-4 py-3 rounded border focus:outline-[#f8c023]"
              required
            />
          </label>
          <label htmlFor="first_name" className="flex flex-col gap-y-2">
            <span>First name</span>
            <input
              type="first_name"
              name="first_name"
              id="first_name"
              placeholder=""
              onChange={handleChange}
              className="px-4 py-3 rounded border focus:outline-[#f8c023]"
              required
            />
          </label>
          <label htmlFor="last_name" className="flex flex-col gap-y-2">
            <span>Last name</span>
            <input
              type="last_name"
              name="last_name"
              id="last_name"
              placeholder=""
              onChange={handleChange}
              className="px-4 py-3 rounded border focus:outline-[#f8c023]"
              required
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-y-2">
            <span>Password</span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
              onChange={handleChange}
              className="px-4 py-3 rounded border focus:outline-[#f8c023]"
              required
            />
          </label>
          <label htmlFor="password2" className="flex flex-col gap-y-2">
            <span>Confirm password</span>
            <input
              type="password2"
              name="password2"
              id="password2"
              placeholder=""
              onChange={handleChange}
              className="px-4 py-3 rounded border focus:outline-[#f8c023]"
              required
            />
          </label>
          <button className="py-3 px-4 bg-[#f8c023] text-white rounded w-full">
            Login
          </button>
        </form>
        <p className="text-center text-gray-400">
          Already have an account{" "}
          <Link to={"/signin"} className="font-semibold text-[#f8c023]">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};
