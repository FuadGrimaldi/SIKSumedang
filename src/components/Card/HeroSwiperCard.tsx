// components/DestinationCard.js
import Image from "next/image";
import Link from "next/link";

const DestinationCard = ({ destination }) => {
  return (
    <div className="relative group rounded-2xl shadow-xl overflow-hidden">
      {/* Image */}
      <div className="relative h-64 md:h-96 w-full">
        <Image
          src={destination.image}
          alt={destination.title}
          fill
          unoptimized={true}
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

          {/* Description */}
          <p className="lg:text-sm text-[10px] opacity-90 leading-relaxed mb-4 line-clamp-2">
            {destination.description}
          </p>

          {/* Button */}
          <Link
            href={`/destinasi/${destination.slug}`}
            className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-4 py-2 rounded-lg lg:text-sm text-[11px] font-semibold transition-all duration-300 group-hover:scale-105"
          >
            Lihat Detail
            <svg
              className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
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
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
