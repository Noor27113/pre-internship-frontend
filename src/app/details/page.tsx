"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PatientDetailsPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "Sudharkar Murti",
    age: "22",
    gender: "Male",
    mobile: "9999999900",
    weight: "50",
    problem: "",
    relationship: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Patient Data:", formData);

    // Save data to localStorage
    localStorage.setItem("patientData", JSON.stringify(formData));

    // Redirect to next page
    router.push("/details1");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Header */}
      <div className="flex items-center gap-4 px-8 py-5 border-b">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <h1 className="text-2xl font-semibold">Patient Details</h1>
      </div>

      {/* Form Section */}
      <div className="flex-1 px-8 py-10 space-y-8 pb-24">

        {/* Full Name */}
        <div>
          <label className="text-sm text-gray-600">Full name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full mt-2 p-4 rounded-xl bg-gray-100 outline-none"
          />
        </div>

        {/* Age + Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-sm text-gray-600">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full mt-2 p-4 rounded-xl bg-gray-100 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full mt-2 p-4 rounded-xl bg-gray-100 outline-none"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Mobile */}
        <div>
          <label className="text-sm text-gray-600">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full mt-2 p-4 rounded-xl bg-gray-100 outline-none"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="text-sm text-gray-600">Weight</label>
          <div className="relative mt-2">
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-gray-100 outline-none pr-16"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500">
              Kg
            </span>
          </div>
        </div>

        {/* Problem */}
        <div>
          <label className="text-sm text-gray-600">Problem</label>
          <textarea
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            rows={4}
            placeholder="write something about your problem"
            className="w-full mt-2 p-4 rounded-xl bg-gray-100 outline-none resize-none"
          />
        </div>

        {/* Relationship */}
        <div>
          <label className="text-sm text-gray-600">
            Relationship with Patient
          </label>
          <select
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            className="w-full mt-2 p-4 rounded-xl bg-gray-100 outline-none"
          >
            <option value="">Select relationship</option>
            <option>Son</option>
            <option>Brother</option>
            <option>Sister</option>
            <option>Father</option>
            <option>Mother</option>
            <option>Self</option>
          </select>
        </div>

        {/* Desktop Save Button */}
        <div className="hidden md:block pt-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-4 rounded-xl font-medium transition"
          >
            Save
          </button>
        </div>
      </div>

      {/* Mobile Fixed Save Button */}
      <div className="fixed md:hidden bottom-0 left-0 w-full bg-white border-t p-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-4 rounded-xl font-medium transition"
        >
          Save
        </button>
      </div>

    </div>
  );
}