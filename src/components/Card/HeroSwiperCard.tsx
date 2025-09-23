// components/DestinationCard.js
import Image from "next/image";

const DestinationCard = ({ destination }) => {
  return (
    <div className="relative group rounded-2xl shadow-xl overflow-hidden">
      {/* Image */}
      <div className="relative lg:h-[550px] h-64 w-full">
        <Image
          src={destination.image}
          alt={destination.title}
          fill
          unoptimized
          className="object-cover transform transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Content inside image */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          {/* Location */}
          <div className="flex items-center lg:text-sm text-[10px] lg:mb-2 mb-1 opacity-90">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{destination.location}</span>
          </div>

          {/* Title */}
          <h3 className="lg:text-lg text-sm font-bold lg:mb-2 mb-0 group-hover:text-yellow-400 transition-colors">
            {destination.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
