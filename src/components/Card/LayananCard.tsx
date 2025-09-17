import React from "react";
import { CardSim, MessageCircleCode, LineChart, Earth } from "lucide-react";
import Image from "next/image";
interface ServiceCardProps {
  icon?: string; // Bisa berupa nama icon dari lucide-react atau path gambar
  title?: string;
  description?: string;
  link?: string;
}

const ServiceCard = ({ icon, title, description, link }: ServiceCardProps) => {
  return (
    <div
      className={`bg-white hover:bg-blue-500 border border-gray-200 rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group cursor-pointer`}
    >
      <a href={link}>
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
              alt={title || "Icon"}
              width={228}
              height={228}
              unoptimized
              // className="w-7 h-7 object-contain"
            />
          ) : (
            <Earth className="w-7 h-7 bg-gray-300 rounded-full" />
          )}
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
      </a>
    </div>
  );
};

export default ServiceCard;
