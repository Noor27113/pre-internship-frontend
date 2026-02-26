"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UnableToBookPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-5 bg-white shadow-sm">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <h1 className="text-xl font-semibold">Unable to Book</h1>
      </div>

      {/* Doctor Card */}
      <div className="p-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm flex gap-4 items-center">
          <Image
            src="/Mask Group.png"
            alt="doctor"
            width={80}
            height={80}
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

        {/* Message */}
        <div className="mt-6 bg-red-50 text-gray-700 p-4 rounded-xl">
          Sorry slot/consulting time is over.
          Would you like to make appointment with the next available slot?
        </div>

        {/* Yes Button */}
        <button
          onClick={() => router.back()}
          className="mt-6 w-full bg-teal-500 text-white py-4 rounded-xl font-medium"
        >
          Yes
        </button>
      </div>
    </div>
  );
}