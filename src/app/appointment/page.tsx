"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Users,
  Activity,
  Star,
  MessageCircle,
  Search,
  Calendar,
  ClipboardList,
  User,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

/* =========================
   Reusable Doctor Card
========================= */
function DoctorCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex-1 text-center md:text-left">
        <h2 className="font-semibold text-gray-800 text-lg md:text-xl">
          Dr. Kumar Das
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Cardiologist - Dombivali
        </p>
        <p className="text-sm text-teal-600 font-medium mt-1">
          MBBS, MD (Internal Medicine)
        </p>
      </div>

      <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden">
        <Image
          src="/Frame 124 (1).png"
          alt="Doctor"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default function AppointmentPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const morningSlots = [
    "09:30 AM - 9:45AM",
    "10:00 AM - 10:15AM",
    "10:30 AM - 10:45AM",
    "11:00 AM - 11:15AM",
    "11:30 AM - 11:45AM",
    "12:00 PM - 12:15PM",
    "12:30 PM - 12:45PM",
    "01:00 PM - 01:15PM",
  ];

  const eveningSlots = [
    "04:00 PM - 04:15PM",
    "04:30 PM - 04:45PM",
    "05:00 PM - 05:15PM",
    "05:30 PM - 05:45PM",
  ];

  const [availableMorningSlots, setAvailableMorningSlots] =
    useState<string[]>(morningSlots);
  const [availableEveningSlots, setAvailableEveningSlots] =
    useState<string[]>(eveningSlots);

  useEffect(() => {
    const day = selectedDate.getDay();
    setSelectedSlot(null);

    if (day === 6) {
      setAvailableMorningSlots(morningSlots);
      setAvailableEveningSlots([]);
    } else {
      setAvailableMorningSlots(morningSlots);
      setAvailableEveningSlots(eveningSlots);
    }
  }, [selectedDate]);

  const handleBooking = () => {
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }

    const appointmentData = {
      id: Math.floor(Math.random() * 10000),
      doctor: "Dr. Kumar Das",
      specialization: "Cardiologist - Dombivali",
      degree: "MBBS, MD (Internal Medicine)",
      date: selectedDate.toISOString(),
      slot: selectedSlot,
      status: "Active",
    };

    localStorage.setItem("appointmentData", JSON.stringify(appointmentData));
    router.push("/review");
  };

  const stats = [
    { icon: <Users size={18} />, value: "5,000+", label: "Patients" },
    { icon: <Activity size={18} />, value: "10+", label: "Years Exp." },
    { icon: <Star size={18} />, value: "4.8", label: "Rating" },
    { icon: <MessageCircle size={18} />, value: "4,942", label: "Reviews" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ========================= MAIN CONTENT ========================= */}
      <div className="flex-1 pb-24">

        {/* ========================= BOOKING 5 ========================= */}
        {step === 1 && (
          <>
            <div className="bg-[#46c2de] text-white px-6 pt-8 pb-16 rounded-b-3xl">
              <div className="flex items-center gap-3">
                <ArrowLeft
                  size={20}
                  className="cursor-pointer"
                  onClick={() => router.back()}
                />
                <h1 className="text-lg md:text-xl font-semibold">
                  Book Appointment
                </h1>
              </div>
            </div>

            <div className="-mt-12 px-6">
              <DoctorCard />
            </div>

            <div className="px-6 mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-white rounded-xl shadow p-4"
                >
                  <div className="bg-teal-50 text-[#46c2de] p-3 rounded-full mb-2">
                    {item.icon}
                  </div>
                  <p className="text-sm font-semibold text-teal-600">
                    {item.value}
                  </p>
                  <p className="text-xs text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="px-6 mt-6 text-sm text-gray-600 md:flex md:gap-10">
              <div className="flex-1 mb-6 md:mb-0 bg-white p-4 rounded-xl">
                <h2 className="font-semibold text-gray-800 mb-2">
                  About Doctor
                </h2>
                <p>
                  15+ years of experience in cardiology including
                  non-invasive and interventional procedures.
                </p>
              </div>

              <div className="flex-1 mb-6 md:mb-0 bg-white p-4 rounded-xl">
                <h2 className="font-semibold text-gray-800 mb-3">
                  Service & Specialization
                </h2>
                <div className="flex justify-between mb-2">
                  <span>Service</span>
                  <span className="font-medium text-gray-800">Medicare</span>
                </div>
                <div className="flex justify-between">
                  <span>Specialization</span>
                  <span className="font-medium text-gray-800">Cardiology</span>
                </div>
              </div>

              <div className="flex-1 bg-white p-4 rounded-xl">
                <h2 className="font-semibold text-gray-800 mb-3">
                  Availability
                </h2>
                <div className="flex justify-between">
                  <span>Mon - Fri</span>
                  <span className="font-medium text-gray-800">
                    10 AM - 5 PM
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6 mt-8">
              <button
                onClick={() => setStep(2)}
                className="w-full bg-[#46c2de] text-white py-3 rounded-xl font-medium"
              >
                Book Appointment
              </button>
            </div>
          </>
        )}

        {/* ========================= BOOKING 6 (FULLY KEPT) ========================= */}
        {step === 2 && (
          <>
            <div className="bg-[#46c2de] text-white px-6 pt-8 pb-16 rounded-b-3xl">
              <div className="flex items-center gap-3">
                <ArrowLeft
                  size={20}
                  className="cursor-pointer"
                  onClick={() => setStep(1)}
                />
                <h1 className="text-lg md:text-xl font-semibold">
                  Book Appointment
                </h1>
              </div>
            </div>

            <div className="-mt-12 px-6">
              <DoctorCard />
            </div>

            <div className="px-6 mt-6 pb-12">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <span>
                  {selectedDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>

                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => date && setSelectedDate(date)}
                  minDate={new Date()}
                  filterDate={(date) => date.getDay() !== 0}
                  customInput={
                    <button type="button">
                      <Calendar size={14} />
                    </button>
                  }
                />
              </div>

              <h3 className="mt-5 text-sm font-medium text-gray-800">
                Select slot
              </h3>

              <div className="grid grid-cols-2 gap-3 mt-3">
                {availableMorningSlots.map((slot, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedSlot(slot)}
                    className={`bg-white border rounded-md py-2 text-center text-xs cursor-pointer ${
                      selectedSlot === slot
                        ? "bg-[#46c2de] text-white border-[#46c2de]"
                        : "border-gray-200 text-gray-400"
                    }`}
                  >
                    {slot}
                  </div>
                ))}
              </div>

              {availableEveningSlots.length > 0 && (
                <>
                  <h3 className="mt-5 text-sm font-medium text-gray-800">
                    Evening Slot
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {availableEveningSlots.map((slot, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedSlot(slot)}
                        className={`bg-white border rounded-md py-2 text-center text-xs cursor-pointer ${
                          selectedSlot === slot
                            ? "bg-[#46c2de] text-white border-[#46c2de]"
                            : "border-gray-200 text-gray-400"
                        }`}
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="mt-7">
                <button
                  onClick={handleBooking}
                  className="w-full bg-[#46c2de] text-white py-3 rounded-lg font-medium"
                >
                  Book appointment
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ========================= MOBILE BOTTOM NAV ========================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t flex justify-around py-3">
        <Search size={24} />
        <Calendar size={24} />
        <ClipboardList size={24} />
        <User size={24} />
      </div>
    </div>
  );
}