"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = (name: keyof FormData, value: string) => {
    let message = "";

    if (!value) message = "This field is required";

    if (name === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) message = "Invalid email format";
    }

    if (name === "mobile" && value) {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(value)) message = "Mobile must be exactly 10 digits";
    }

    if (name === "password" && value.length < 6) {
      message = "Password must be at least 6 characters";
    }

    if (name === "confirmPassword" && value !== formData.password) {
      message = "Passwords do not match";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: message,
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validate(name as keyof FormData, value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Partial<FormData> = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) newErrors[key as keyof FormData] = "This field is required";
    });

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Store user in localStorage (per assignment requirement)
      const userToStore = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      };
      localStorage.setItem("user", JSON.stringify(userToStore));

      router.push("/login");
    }
  };

  const inputBaseStyle =
    "peer w-full h-11 bg-white/10 border border-gray-400 text-white px-3 pt-5 pb-1 text-sm outline-none focus:border-blue-500 transition rounded";

  const labelBaseStyle =
    "absolute left-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-400 top-1 text-xs";

  return (
    <div className="min-h-screen bg-[#001b34] flex flex-col lg:flex-row px-6 sm:px-10 lg:px-20 py-12">
      {/* LEFT SIDE */}
      <div className="flex-1 flex items-center justify-center mb-12 lg:mb-0">
        <img
          src="/Figure.png"
          alt="Illustration"
          className="h-[260px] sm:h-[330px] lg:h-[500px] w-auto object-contain"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Registration Form
          </h1>

          {/* NAME */}
          <div className="relative">
            <input
              name="name"
              placeholder=" "
              value={formData.name}
              onChange={handleChange}
              className={inputBaseStyle}
            />
            <label className={labelBaseStyle}>Full Name</label>
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              className={inputBaseStyle}
            />
            <label className={labelBaseStyle}>Email Address</label>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* MOBILE */}
          <div className="relative">
            <input
              type="tel"
              name="mobile"
              placeholder=" "
              value={formData.mobile}
              onChange={handleChange}
              className={inputBaseStyle}
            />
            <label className={labelBaseStyle}>Mobile Number</label>
            {errors.mobile && (
              <p className="text-red-400 text-xs mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder=" "
              value={formData.password}
              onChange={handleChange}
              className={inputBaseStyle}
            />
            <label className={labelBaseStyle}>Password</label>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder=" "
              value={formData.confirmPassword}
              onChange={handleChange}
              className={inputBaseStyle}
            />
            <label className={labelBaseStyle}>Confirm Password</label>

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-300"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold rounded shadow-lg active:scale-95"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
