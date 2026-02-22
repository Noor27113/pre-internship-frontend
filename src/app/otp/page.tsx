"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function OTPPage() {
  const router = useRouter();
  const OTP_LENGTH = 4;

  // OTP state
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(15);
  const [error, setError] = useState(false);

  // Refs for input elements
  const inputs = useRef<HTMLInputElement[]>([]);

  // Dynamic user info
  const [maskedUser, setMaskedUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.mobile) {
        setMaskedUser(user.mobile.slice(0, 3) + "******" + user.mobile.slice(-2));
      } else if (user.email) {
        const [name, domain] = user.email.split("@");
        setMaskedUser(name.slice(0, 2) + "*****@" + domain);
      }
    }
  }, []);

  // Auto-fill OTP from localStorage
  useEffect(() => {
    const storedOtp = localStorage.getItem("otp");
    if (storedOtp) {
      const otpArray = storedOtp.split("").slice(0, OTP_LENGTH);
      setOtp(otpArray);
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle OTP input change
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }

    setError(false);
  };

  // Handle backspace navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // Handle numeric keypad
  const handleKeypadClick = (num: string) => {
    const nextIndex = otp.findIndex((d) => d === "");
    if (nextIndex === -1) return;
    handleChange(num, nextIndex);
    inputs.current[nextIndex]?.focus();
  };

  const handleDelete = () => {
    const lastIndex = otp.map((d, i) => (d ? i : -1)).filter(i => i !== -1).pop();
    if (lastIndex === undefined) return;
    handleChange("", lastIndex);
    inputs.current[lastIndex]?.focus();
  };

  // Verify OTP
  const handleVerify = () => {
    const enteredOtp = otp.join("");
    const storedOtp = localStorage.getItem("otp");

    if (!storedOtp) {
      setError(true);
      return;
    }

    if (enteredOtp === storedOtp) {
      localStorage.setItem("otpVerified", "true");
      router.push("/dashboard");
    } else {
      setError(true);
    }
  };

  const keypad = [
    ["1","2","3"],
    ["4","5","6"],
    ["7","8","9"],
    ["*","0","<"]
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-md p-6">
        
        {/* Back arrow */}
        <button className="mb-4 text-gray-600" onClick={() => router.back()}>
          <ArrowLeft size={24} />
        </button>

        {/* Header */}
        <h2 className="text-lg font-semibold mb-2">OTP Code Verification</h2>
        <p className="text-sm text-gray-600 mb-6">
          Code has been sent to <span className="font-medium">{maskedUser}</span>
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-between mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => { if (el) inputs.current[index] = el; }}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-14 h-14 text-center text-xl border rounded-xl outline-none focus:ring-2 focus:ring-cyan-400 transition ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Timer */}
        <p className="text-center text-sm text-gray-600 mb-6">
          Resend code in{" "}
          <span className="text-blue-500 font-medium">{timer}s</span>
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-500 mb-4">
            Invalid OTP. Please try again.
          </p>
        )}

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-cyan-400 to-cyan-500 hover:opacity-90 transition mb-4"
        >
          Verify
        </button>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-4">
          {keypad.flat().map((key) => (
            <button
              key={key}
              onClick={() => key === "<" ? handleDelete() : handleKeypadClick(key)}
              className="py-4 bg-gray-100 rounded-lg text-lg font-medium hover:bg-gray-200 transition"
            >
              {key === "<" ? "⌫" : key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
