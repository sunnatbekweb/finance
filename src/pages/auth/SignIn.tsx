import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login/`,
        formData
      );
      localStorage.setItem(
        "access_token",
        JSON.stringify(response.data.access)
      );
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(response.data.refresh)
      );

      toast.success("Successfully logined!");
      // После успешного логина — навигация
      setTimeout(() => {
        navigate("/"); // Перенаправление на главную страницу
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error in login!");
    } finally {
      // Очистка полей формы
      setFormData({
        username: "",
        password: "",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-[400px] mx-auto">
        <h2 className="fontPoppins font-extrabold text-[40px] leading-9 tracking-[0.08em] text-center text-[#f8c023] mb-16">
          Financial Management
        </h2>
        <ToastContainer />

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 mb-10">
          <label htmlFor="username" className="flex flex-col gap-y-2">
            <span>User name</span>
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              value={formData.username}
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
              onChange={handleChange}
              value={formData.password}
              className="px-4 py-3 rounded border focus:outline-[#f8c023]"
              required
            />
          </label>
          <button className="py-3 px-4 bg-[#f8c023] text-white rounded w-full">
            Login
          </button>
        </form>
        <Link
          to={"/signup"}
          className="block font-semibold text-center text-[#f8c023]"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
};
