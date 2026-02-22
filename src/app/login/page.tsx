"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [mobileOrEmail, setMobileOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setError("No user found. Please register.");
      return;
    }

    const user = JSON.parse(storedUser);
    const input = mobileOrEmail.trim();
    const pwd = password.trim();

    if ((user.email === input || user.mobile === input) && user.password === pwd) {
      // Generate random 4-digit OTP
      const otp = Math.floor(1000 + Math.random() * 9000).toString();

      // Save OTP in localStorage (per assignment requirement)
      localStorage.setItem("otp", otp);
      localStorage.setItem("otpVerified", "false");

      router.push("/otp");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="flex w-full max-w-6xl">
        {/* LEFT IMAGE (Desktop Only) */}
        <div className="hidden lg:flex flex-1 items-center justify-center px-8">
          <img
            src="/login 1.png"
            alt="Login Illustration"
            className="h-full max-h-[600px] object-contain"
          />
        </div>

        {/* RIGHT LOGIN CARD */}
        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-semibold mb-6 text-left">Login</h2>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* MOBILE / EMAIL */}
            <label className="text-sm text-gray-600">Mobile / Email</label>
            <input
              type="text"
              value={mobileOrEmail}
              onChange={(e) => setMobileOrEmail(e.target.value)}
              placeholder="Login with Mobile or Email"
              className="w-full mt-2 mb-5 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-cyan-400"
            />

            {/* PASSWORD */}
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative mt-2 mb-5">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* REMEMBER ME + FORGOT PASSWORD */}
            <div className="flex items-center justify-between text-sm mb-6">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                Remember Me
              </label>
              <button className="text-red-500 hover:underline">Forgot Password</button>
            </div>

            {/* LOGIN BUTTON */}
            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-cyan-400 to-cyan-500 hover:opacity-90 transition"
            >
              Login
            </button>

            {/* DIVIDER */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-3 text-sm text-gray-500">Or login With</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* GOOGLE LOGIN */}
            <button className="w-full border py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            {/* SIGNUP LINK */}
            <p className="text-sm text-gray-500 text-center mt-8">
              Don’t have an account?{" "}
              <Link href="/register" className="text-cyan-500 font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
