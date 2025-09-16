import DestinationSwiper from "../Slider/SwiperHero";

const Hero = async ({ subdomain }) => {
  return (
    <div className="relative">
      <div
        className="hero relative overflow-hidden min-h-screen"
        style={{
          backgroundImage: 'url("/assets/background/bg-hero-3.jpg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-2"></div>
        {/* Content Container */}
        <div className="flex flex-col justify-center items-center w-full h-full rounded-2xl relative z-3 pt-[100px]">
          <div className="text-white text-center max-w-2xl mx-auto px-4">
            <h1 className="mb-4 text-2xl md:text-[45px] font-bold drop-shadow-lg lg:leading-[2.75rem] leading-1">
              Website Resmi Kecamatan {subdomain} Kab. Sumedang
            </h1>
            <p className="mb-6 text-sm md:text-base drop-shadow-md leading-relaxed">
              Dapatkan informasi terkini tentang pelayanan, berita, dan kegiatan
              kecamatan.
            </p>
          </div>
          {/* Swiper */}
          <div className="pb-20">
            <DestinationSwiper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
