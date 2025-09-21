import ImageSwiper from "../Slider/SwiperImage";

const HeroImage = async ({ subdomain, kecamatanId }) => {
  return (
    <div className="relative">
      <div
        className="hero relative overflow-hidden "
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
          {/* Swiper */}
          <div className="pb-16">
            <ImageSwiper kecamatanId={kecamatanId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
