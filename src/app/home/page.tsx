"use client";

import React, { useEffect, useState } from "react";
import {
  Heart,
  Phone,
  MessageCircle,
  Users,
  Activity,
  Star,
  MessageCircle as Msg,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const doctors = [
  {
    name: "Dr. Prakash Das",
    specialty: "Sr. Psychologist",
    available: "Available today",
    description: "As Psychologist Dr Das practices about 7+ years...",
    time: "09:30 AM - 07:00 PM",
    image: "/Frame 1000001333.png",
    stats: { patients: 1200, experience: 7, rating: 4.7, reviews: 1030 },
  },
  {
    name: "Dr. Ayesha Khan",
    specialty: "Cardiologist",
    available: "Available tomorrow",
    description: "Expert in non-invasive and interventional cardiology.",
    time: "10:00 AM - 06:00 PM",
    image: "/Frame 1000001333.png",
    stats: { patients: 5000, experience: 10, rating: 4.8, reviews: 4942 },
  },
  {
    name: "Dr. Ravi Sharma",
    specialty: "Dermatologist",
    available: "Available today",
    description: "10+ years of experience in skin treatments.",
    time: "11:00 AM - 05:00 PM",
    image: "/Frame 1000001333.png",
    stats: { patients: 2500, experience: 10, rating: 4.6, reviews: 1200 },
  },
  {
    name: "Dr. Sneha Patel",
    specialty: "Pediatrician",
    available: "Available today",
    description: "Specialist in child healthcare and vaccinations.",
    time: "09:00 AM - 04:00 PM",
    image: "/Frame 1000001333.png",
    stats: { patients: 3200, experience: 8, rating: 4.9, reviews: 1580 },
  },
];

const sidebarItems = [
  { icon: "/carbon_search.png", label: "Find Doctor", path: "/" },
  { icon: "/Frame 10.png", label: "Appointment", path: "/appointment" },
  { icon: "/Frame 11.png", label: "Records", path: "/records" },
  { icon: "/Frame 12.png", label: "Profile", path: "/profile" },
];

export default function HomePage() {
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [notificationCount, setNotificationCount] = useState(5);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [counters, setCounters] = useState({
    patients: 0,
    experience: 0,
    rating: 0,
    reviews: 0,
  });

  useEffect(() => {
    setMounted(true);

    const storedCount = localStorage.getItem("notifications");
    if (storedCount) setNotificationCount(parseInt(storedCount, 10));

    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));

    let startTime: number | null = null;
    const end = doctors[0].stats;
    const duration = 1000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCounters({
        patients: Math.floor(end.patients * progress),
        experience: Math.floor(end.experience * progress),
        rating: parseFloat((end.rating * progress).toFixed(1)),
        reviews: Math.floor(end.reviews * progress),
      });

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (mounted)
      localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites, mounted]);

  const toggleFavorite = (index: number) => {
    setFavorites((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleNavigation = (path: string) => {
    if (pathname !== path) router.push(path);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="p-4 bg-[#262444] shadow flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <img
              src="/Ellipse 10 (2).png"
              alt="User"
              className="w-12 h-12 object-cover rounded-lg"
            />
            <h2 className="text-sm font-medium">
              Hello, Priya @ Dombivli Mumbai
            </h2>
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => handleNavigation("/notifications")}
          >
            <img
              src="/Frame 1000001064 (1).png"
              alt="Notifications"
              className="w-6 h-6"
            />
            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                {notificationCount}
              </span>
            )}
          </div>
        </header>

        {/* Doctor Stats */}
        <div className="p-4 grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <Users size={20} className="text-[#46c2de]" />
            <p className="font-semibold text-sm mt-2">{counters.patients.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Patients</p>
          </div>

          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <Activity size={20} className="text-[#46c2de]" />
            <p className="font-semibold text-sm mt-2">{counters.experience}</p>
            <p className="text-xs text-gray-500">Years Exp.</p>
          </div>

          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <Star size={20} className="text-[#46c2de]" />
            <p className="font-semibold text-sm mt-2">{counters.rating}</p>
            <p className="text-xs text-gray-500">Rating</p>
          </div>

          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <Msg size={20} className="text-[#46c2de]" />
            <p className="font-semibold text-sm mt-2">{counters.reviews.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Reviews</p>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Search Doctors"
            className="w-full border border-[#8C8EBE] rounded-full p-3 text-sm shadow-sm focus:ring-2 focus:ring-[#3C3CA4] focus:outline-none"
          />
        </div>

        {/* Doctor List */}
        <main className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="group bg-white shadow rounded-xl p-4 flex flex-col md:flex-row border border-[#8C8EBE]/30 transition transform hover:shadow-lg hover:-translate-y-1"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-32 h-36 object-cover rounded-xl mr-0 md:mr-5 mb-3 md:mb-0 transform transition group-hover:scale-105"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-[#262444]">{doctor.name}</h3>
                  <p className="text-xs text-[#8C8EBE]">{doctor.specialty}</p>
                  <p className="text-xs text-[#3C3CA4] font-medium">{doctor.available}</p>
                  <p className="text-xs text-gray-500 line-clamp-2">{doctor.description}</p>
                  <p className="text-xs text-gray-500">{doctor.time}</p>
                </div>

                <div className="mt-3 flex items-center gap-3 flex-wrap">
                  <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-green-500 text-white text-xs hover:bg-green-600 transition">
                    <Phone size={14} /> Call
                  </button>

                  <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-500 text-white text-xs hover:bg-blue-600 transition">
                    <MessageCircle size={14} /> Chat
                  </button>

                  {/* ✅ Redirect Added Here */}
                  <button
                    onClick={() => router.push("/appointment")}
                    className="flex-1 text-center px-3 py-1 rounded-lg bg-[#3C3CA4] text-white text-xs hover:bg-[#2A2A91] transition"
                  >
                    Book Appointment
                  </button>

                  <button onClick={() => toggleFavorite(index)}>
                    <Heart
                      size={22}
                      className={
                        favorites.includes(index)
                          ? "text-red-500 fill-red-500"
                          : "text-gray-400"
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="bg-white shadow p-4 flex justify-around sticky bottom-0 md:hidden">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center text-xs transition ${
                pathname === item.path
                  ? "text-[#3C3CA4]"
                  : "text-[#262444] hover:text-[#F9D76D]"
              }`}
            >
              <img src={item.icon} alt={item.label} className="w-6 h-6" />
              {item.label}
            </button>
          ))}
        </nav>

      </div>
    </div>
  );
}