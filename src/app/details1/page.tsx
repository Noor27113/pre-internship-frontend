"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PatientSummaryPage() {
  const router = useRouter();
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("patientData");
    if (data) {
      setPatient(JSON.parse(data));
    }
  }, []);

  const handleStartConsulting = () => {
    router.push("/chat");
  };

  if (!patient) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-5 bg-white shadow-sm">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <h1 className="text-xl font-semibold">Patient Details</h1>
      </div>

      {/* Card */}
      <div className="p-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">

          <div>
            <p className="text-gray-500 text-sm">Full name</p>
            <p className="font-medium">{patient.fullName}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Age</p>
              <p className="font-medium">{patient.age}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Weight</p>
              <p className="font-medium">{patient.weight}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Relation</p>
              <p className="font-medium">{patient.relationship}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Problem</p>
            <p className="font-medium">{patient.problem}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Mobile</p>
            <p className="font-medium">{patient.mobile}</p>
          </div>
        </div>

        {/* Visit Type */}
        <div className="bg-white rounded-xl p-4 mt-6 shadow-sm flex justify-between items-center">
          <span>Visit Type</span>
          <span>▼</span>
        </div>

        {/* Payment Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold">Payment</h2>
          <p className="text-sm text-gray-500 mt-1">
            Reduce your waiting time by Paying the consulting fee upfront
          </p>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 space-y-3">
        <button
          onClick={handleStartConsulting}
          className="w-full bg-teal-500 text-white py-4 rounded-xl font-medium"
        >
          Start Consulting
        </button>
        <button className="w-full border border-teal-500 text-teal-500 py-4 rounded-xl font-medium">
          Quick query
        </button>
      </div>
    </div>
  );
}