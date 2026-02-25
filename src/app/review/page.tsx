"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, CalendarPlus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface Appointment {
  id: number;
  doctor: string;
  specialization: string;
  degree: string;
  date: string;
  slot: string;
  status: string;
}

export default function AppointmentScheduledPage() {
  const router = useRouter();
  const [appointment, setAppointment] =
    useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     Load Appointment Safely
  ========================== */
  useEffect(() => {
    const stored = localStorage.getItem("appointmentData");

    if (stored) {
      try {
        const parsed: Appointment = JSON.parse(stored);
        setAppointment(parsed);
      } catch (error) {
        console.error("Error parsing appointment:", error);
      }
    }

    setLoading(false);
  }, []);

  /* =========================
     Loading State
  ========================== */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">
          Loading appointment...
        </p>
      </div>
    );
  }

  /* =========================
     No Appointment Found
  ========================== */
  if (!appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">
          No Appointment Found
        </p>
      </div>
    );
  }

  const formattedDate = new Date(appointment.date);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-md md:max-w-4xl">

        {/* ================= HEADER ================= */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            Appointment Scheduled
          </h1>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Doctor Card */}
          <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden">
              <Image
                src="/Frame 124 (1).png"
                alt="Doctor"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="font-semibold text-gray-800 text-lg">
                {appointment.doctor}
              </h2>
              <p className="text-sm text-gray-500">
                {appointment.specialization}
              </p>
              <p className="text-sm text-teal-600">
                {appointment.degree}
              </p>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-sm text-gray-500">
              Appointment Number:
            </p>
            <p className="text-xl font-semibold text-gray-800 mb-6">
              #{appointment.id}
            </p>

            <div className="flex justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">
                  Status
                </p>
                <p className="text-green-600 font-medium">
                  {appointment.status}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Reporting Time
                </p>
                <p className="font-medium text-gray-800">
                  {formattedDate.toDateString()} <br />
                  {appointment.slot}
                </p>
              </div>
            </div>

            <button className="flex items-center gap-2 bg-[#cfeff5] text-[#46c2de] px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition">
              <CalendarPlus size={16} />
              Add to calendar
            </button>
          </div>
        </div>

        {/* ================= PATIENT DETAILS ================= */}
        <div className="mt-10">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Add Patient Details
          </p>

          <button className="flex items-center gap-2 border border-[#46c2de] text-[#46c2de] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#46c2de] hover:text-white transition">
            <Plus size={16} />
            Add Patient Details
          </button>
        </div>

        {/* ================= BOTTOM BUTTON ================= */}
        <div className="mt-12">
          <button className="w-full bg-[#46c2de] hover:bg-teal-600 text-white py-3 rounded-xl font-medium transition">
            View My Appointment
          </button>
        </div>

      </div>
    </div>
  );
}