"use client";
import React from "react";
import Breadcrumb from "../Breadchumb/Breadchumb";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, SyntheticEvent } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface LoginProps {
  kecamatanId?: number;
}

const LoginComp = ({ kecamatanId }: LoginProps) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const respone = await signIn("credentials", {
        email: data.email,
        password: data.password,
        subdomainkecamatanId: kecamatanId,
        redirect: false,
      });
      const response = await axios.post("/api/login", {
        email: data.email,
        password: data.password,
        subdomainkecamatanId: kecamatanId,
      });
      if (response.status === 200 && response.data) {
        const kecamatan_id = response.data.user.kecamatan_id;
        console.log("kecamatan_id:", kecamatan_id);
        console.log("kecamatanId:", kecamatanId);
        // Cek apakah kecamatan_id sesuai dengan subdomainkecamatanId
        if (kecamatan_id === kecamatanId) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Login Success Admin Kecamatan",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/adminkec");
        } else if (kecamatan_id === null) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Login Success",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/adminkab");
        } else {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Not Authorized for this Kecamatan",
            showConfirmButton: false,
            timer: 1500,
          });
          setIsLoading(false);
          return;
          // arahkan ke dashboard setelah login berhasil
        }
        // arahkan ke dashboard setelah login berhasil
      } else {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Login Failed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Login Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative bg-white">
      {/* Hero Section */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: 'url("/assets/background/bg-hero-3.jpg")',
          backgroundRepeat: "repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          height: "450px",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>

      {/* Floating Content */}
      <div className="relative -mt-[350px] px-6 lg:px-[100px] py-2">
        <div className="bg-white rounded-3xl border shadow-xl">
          <div className="w-full mx-auto">
            <div className="flex items-center justify-center rounded-3xl bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden min-h-screen relative">
              {/* Container */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="flex flex-col lg:flex-row justify-center lg:gap-12 gap-0 z-10 relative -mt-28"
              >
                {/* Left Illustration */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex justify-center max-w-md"
                >
                  <Image
                    src="/assets/background/undraw_group-project_kow1.svg"
                    alt="Login Illustration"
                    width={500}
                    height={500}
                    className="w-full h-auto"
                  />
                </motion.div>

                {/* Right Form */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex justify-center self-center z-10"
                >
                  <div className="p-10 w-[380px] bg-white/90 backdrop-blur-md mx-auto rounded-3xl shadow-2xl border border-gray-100">
                    <div className="mb-7 text-center">
                      <h3 className="font-bold text-3xl text-gray-800 tracking-wide">
                        Portal Login
                      </h3>
                      <p className="text-gray-500 text-sm mt-2">
                        Sign in to your account
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <input
                          value={data.email}
                          onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                          }
                          type="email"
                          placeholder="Email"
                          className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          required
                        />
                      </div>

                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={data.password}
                          onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                          }
                          placeholder="Password"
                          className="w-full text-sm text-gray-800 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          required
                        />
                        <div
                          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-primary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <a
                          href="#"
                          className="text-sm text-primary hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>

                      {/* Divider */}
                      <div className="flex items-center justify-center space-x-2 my-5">
                        <span className="h-px w-full bg-gray-200"></span>
                      </div>

                      <motion.button
                        type="submit"
                        whileTap={{ scale: 0.97 }}
                        className="w-full flex justify-center items-center bg-primary hover:bg-blue-500 text-white p-3 rounded-lg tracking-wide font-semibold transition-colors duration-300"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Signing In...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </motion.button>
                    </form>
                  </div>
                </motion.div>
              </motion.div>

              {/* Animated Wave Background */}
              <div className="absolute bottom-0 left-0 w-full h-72 overflow-hidden">
                <svg
                  className="absolute bottom-0 w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="waveGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#f0f9ff" stopOpacity="0.9" />
                      <stop
                        offset="50%"
                        stopColor="#e0f2fe"
                        stopOpacity="0.95"
                      />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    fill="url(#waveGradient)"
                    d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L0,320Z"
                  />
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
                    fill="#ffffff"
                    fillOpacity="0.7"
                    d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,208C672,213,768,171,864,160C960,149,1056,171,1152,186.7C1248,203,1344,213,1392,218.7L1440,224L1440,320L0,320Z"
                  />
                </svg>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center space-x-2 text-gray-400">
                <div className="w-8 h-px bg-gray-400"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <div className="w-8 h-px bg-gray-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComp;
