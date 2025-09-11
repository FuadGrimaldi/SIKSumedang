import DestinationSwiper from "../Slider/SwiperHero";

const Hero = async () => {
  return (
    <div className="relative">
      <div
        className="hero relative overflow-hidden"
        style={{
          backgroundImage: 'url("/assets/background/al-kamil.jpg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10"></div>
        {/* Content Container */}
        <div className="flex flex-col justify-center items-center w-full h-full rounded-2xl relative z-20 mt-[100px]">
          <div className="text-white text-center max-w-2xl mx-auto px-4">
            <h1 className="mb-4 text-2xl md:text-[45px] font-bold drop-shadow-lg lg:leading-[2.75rem] leading-1">
              Selamat Datang di Website Resmi Kecamatan Kab. Sumedang
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
