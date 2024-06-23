import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import clear from "../assets/clear.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
import axios from "axios";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import toast, { ToastBar, Toaster } from "react-hot-toast";

const Weather = () => {
  const [inputCity, setInputCity] = useState("Lahore");
  const [city, setCity] = useState("Lahore");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const constraintsRef = useRef(null);
  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
    "09d": drizzle,
    "09n": drizzle,
  };
  const API_KEY = "0807337234b6023e8b93a63d20773de7";
  const notify = () => toast("City not found !", { icon: "❌" });
  

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError("");
    } catch (error) {
      setError("City not found!");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(inputCity);
  };

  const handleInputChange = (e) => {
    setInputCity(e.target.value);
  };

  return (
   
    <motion.div
      drag
      dragConstraints={constraintsRef}
      ref={constraintsRef}
      className="place-self-center bg-gradient-to-r from-blue-600 text-white to-cyan-600 shadow-zinc-800 lg:drop-shadow-2xl tracking-wide p-[25px] rounded-3xl shadow-2xl flex items-center flex-col "
    >
      <motion.form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search"
          onChange={handleInputChange}
          value={inputCity}
          className="h-[50px] placeholder:italic capitalize border-none outline-none rounded-3xl text-zinc-800 pl-[25px] font-[18px]"
        />
        <button
          type="submit"
          onClick={notify}
          className="cursor-pointer bg-white text-black flex items-center justify-center h-[51px] w-[51px] rounded-full p-3"
        >
          <FiSearch className="text-black scale-[1.5] hover:scale-[1.75] transition-all duration-300" />
        </button>
      </motion.form>
      {error && (
        <Toaster>
        {(t) => (
          <ToastBar style={{ padding: 8, height: 60 }} toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button onClick={() => toast.dismiss(t.id)}>X</button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
      )}
      {weatherData && (
        <>
          <motion.img
            src={cloud}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
            transition={{
              ease: "easeOutElastic",
              type: "spring",
              stiffness: 400,
              damping: 10,
              delay: 0.2,
            }}
            initial={{ scale: 0 }}
            animate={{
              x: 0,
              scale: 1,
              transition: { duration: 0.4 },
            }}
            className="w-[150px] select-none mb-[15px] mt-[30px] mx-0"
            alt=""
          />
          <motion.p
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1.1 }}
            transition={{
              ease: "easeOutElastic",
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-[60px] leading-tight text-white"
          >
            {Math.floor(weatherData.main.temp)}°C
          </motion.p>
          <motion.p
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-[35px]  text-white"
          >
            {weatherData.name}
          </motion.p>
          <motion.p
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-[20px] py-1 capitalize text-white"
          >
            {weatherData.weather[0].description}
          </motion.p>
          <motion.p
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-[22px] py-[2px] text-white "
          >
            Feels Like: {Math.floor(weatherData.main.feels_like)}°C
          </motion.p>
          <div className="text-white w-[100%] mt-[22px] flex justify-between">
            <div className="flex items-start gap-[12px] font-[22px]">
              <img src={humidity} alt="" className="w-[40px] h-9 mt-[7px]" />
              <div className="flex-col mb-1 flex">
                <p>{weatherData.main.humidity}%</p>
                <span className="block text-[16px]">Humidity</span>
              </div>
            </div>
            <div className="flex gap-3">
              <img
                src={wind}
                alt=""
                className="top-0 w-[45px] h-10 mt-[5.5px]"
              />
              <div className="flex-col grid ">
                <p>{weatherData.wind.speed} Km/h</p>
                <span className="block text-[16px]">Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Weather;
