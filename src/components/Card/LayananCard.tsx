import React from "react";
import { CardSim, MessageCircleCode, LineChart } from "lucide-react";
import Image from "next/image";

const ServiceCard = ({ icon, title, description, link }) => {
  return (
    <div
      className={`bg-white hover:bg-blue-500 border border-gray-200 rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group cursor-pointer`}
    >
      {/* Icon with animated background */}
      <div
        className={`w-12 h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110`}
      >
        {typeof icon === "string" && icon === "CardSim" ? (
          <CardSim className="w-7 h-7 text-blue-500 group-hover:text-blue-700 transition-colors duration-300" />
        ) : typeof icon === "string" && icon === "MessageCircleCode" ? (
          <MessageCircleCode className="w-7 h-7 text-blue-500 group-hover:text-blue-700 transition-colors duration-300" />
        ) : typeof icon === "string" && icon === "LineChart" ? (
          <LineChart className="w-7 h-7 text-blue-500 group-hover:text-blue-700 transition-colors duration-300" />
        ) : typeof icon === "string" && icon.startsWith("/") ? (
          <Image
            src={icon}
            alt={title}
            width={228}
            height={228}
            unoptimized
            // className="w-7 h-7 object-contain"
          />
        ) : (
          <div className="w-7 h-7 bg-gray-300 rounded-full" />
        )}
        :
      </div>

      {/* Content */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 group-hover:text-white text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Link */}
      <a
        href={link}
        className="inline-flex items-center text-blue-500 font-medium text-sm group-hover:text-white transition-colors duration-300"
      >
        Selengkapnya
        <svg
          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    </div>
  );
};

export default ServiceCard;
