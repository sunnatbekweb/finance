import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios
        .post(`${import.meta.env.VITE_BASE_URL}/register/`, formData)
        .then(() => alert("Successfully created account!"));

      toast.success("Successfully created account!");
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (error: any) {
      console.error(error);
      toast.error(
        `Error creating account! ${
          error?.response?.statusText || "Unknown error"
        }`
      );
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
      <div className="w-full px-5 md:max-w-[400px] md:px-0 mx-auto">
        <h2 className="fontPoppins font-extrabold text-3xl md:text-[40px] leading-9 tracking-[0.08em] text-center text-[#f8c023] mb-4 md:mb-8">
          Financial Management
        </h2>

        <h3 className="text-2xl font-semibold text-center mb-4 md:mb-8">
          Create an account
        </h3>
        <ToastContainer />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-3 md:gap-y-6 mb-6 md:mb-10"
        >
          <label htmlFor="username" className="flex flex-col gap-y-2">
            <span className="text-sm md:text-base">User name</span>
            <input
              type="text"
              name="username"
              id="username"
              placeholder=""
              onChange={handleChange}
              value={formData.username}
              className="px-4 rounded border focus:outline-[#f8c023]"
              required
            />
          </label>
          <label htmlFor="first_name" className="flex flex-col gap-y-2">
            <span className="text-sm md:text-base">First name</span>
            <input
              type="first_name"
              name="first_name"
              id="first_name"
              placeholder=""
              onChange={handleChange}
              value={formData.first_name}
              className="px-4 rounded border focus:outline-[#f8c023]"
              required
            />
          </label>
          <label htmlFor="last_name" className="flex flex-col gap-y-2">
            <span className="text-sm md:text-base">Last name</span>
            <input
              type="last_name"
              name="last_name"
              id="last_name"
              placeholder=""
              onChange={handleChange}
              value={formData.last_name}
              className="px-4 rounded border focus:outline-[#f8c023]"
              required
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-y-2">
            <span className="text-sm md:text-base">Password</span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
              onChange={handleChange}
              value={formData.password}
              className="px-4 rounded border focus:outline-[#f8c023]"
              required
            />
          </label>
          <label htmlFor="password2" className="flex flex-col gap-y-2">
            <span className="text-sm md:text-base">Confirm password</span>
            <input
              type="password2"
              name="password2"
              id="password2"
              placeholder=""
              onChange={handleChange}
              value={formData.password2}
              className="px-4 rounded border focus:outline-[#f8c023]"
              required
            />
          </label>
          <button className="px-4 py-2 bg-[#f8c023] text-white rounded w-full">
            Sign up
          </button>
        </form>
        <p className="text-center text-gray-400">
          Already have an account{" "}
          <Link to={"/login"} className="font-semibold text-[#f8c023]">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};
