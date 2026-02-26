"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PatientData {
  fullName: string;
  age: string;
  weight: string;
  relationship: string;
  problem: string;
  mobile: string;
}

interface Message {
  sender: "doctor" | "patient";
  text: string;
  time: string;
}

export default function PatientChatPage() {
  const router = useRouter();
  const chatRef = useRef<HTMLDivElement>(null);

  const [patient, setPatient] = useState<PatientData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [seconds, setSeconds] = useState(0);

  /* ------------------ Load Patient Data ------------------ */
  useEffect(() => {
    const stored = localStorage.getItem("patientData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setPatient(parsed);

      // Initial doctor message based on problem
      setMessages([
        {
          sender: "doctor",
          text: `Hi ${parsed.fullName}, I understand you're facing "${parsed.problem}". Let me help you.`,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }
  }, []);

  /* ------------------ Session Timer ------------------ */
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* ------------------ Auto Scroll ------------------ */
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ------------------ Send Message ------------------ */
  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      sender: "patient",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Auto doctor reply after 1.5 sec
    setTimeout(() => {
      const reply: Message = {
        sender: "doctor",
        text: "Thank you for the update. Please follow the advice and let me know if symptoms persist.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1500);
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
        <h1 className="text-lg font-semibold">Patient Chat</h1>
      </div>

      {/* Doctor Card */}
      <div className="p-6 pb-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm flex gap-4 items-center">
          <Image
            src="/Mask Group.png"
            alt="doctor"
            width={70}
            height={70}
            className="rounded-xl object-cover"
          />
          <div>
            <h2 className="font-semibold text-lg">Dr. Kumar Das</h2>
            <p className="text-sm text-gray-500">
              Cardiologist - Dombivli
            </p>
            <p className="text-sm text-gray-500">
              MBBS ,MD (Internal Medicine)
            </p>
          </div>
        </div>
      </div>

      {/* Patient Info */}
      <div className="px-6 pb-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm text-sm space-y-2">
          <p><span className="text-gray-500">Full name:</span> {patient.fullName}</p>
          <p><span className="text-gray-500">Age:</span> {patient.age}</p>
          <p><span className="text-gray-500">Problem:</span> {patient.problem}</p>
        </div>
      </div>

      {/* Session Badge */}
      <div className="flex justify-center">
        <span className="text-xs bg-gray-200 px-4 py-1 rounded-full text-gray-600">
          Session Time: {Math.floor(seconds / 60)}:
          {(seconds % 60).toString().padStart(2, "0")}
        </span>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "patient" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-2xl text-sm shadow ${
                msg.sender === "patient"
                  ? "bg-teal-500 text-white"
                  : "bg-white"
              }`}
            >
              {msg.text}
              <div className="text-xs mt-1 text-right opacity-60">
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatRef}></div>
      </div>

      {/* Input Section */}
      <div className="bg-white border-t p-4 flex gap-3">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 border rounded-xl outline-none text-sm"
        />
        <button
          onClick={sendMessage}
          className="bg-teal-500 text-white p-3 rounded-xl"
        >
          <Send size={18} />
        </button>
      </div>

      {/* End Consultation Button */}
      <div className="p-4 bg-gray-100">
        <button
          onClick={() => router.push("/")}
          className="w-full bg-red-500 text-white py-3 rounded-xl text-sm font-medium"
        >
          End Consultation
        </button>
      </div>
    </div>
  );
}