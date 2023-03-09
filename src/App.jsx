import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [isDark, setIsDark] = useState(false);
  const [countries, setCountries] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());


  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString(
        "de-DE",
        {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
        }
      ));
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (localStorage.getItem("countries")) {
      return;
    }

    const getData = async () => {
      let allCountry = await fetch("https://restcountries.com/v3.1/all");
      let response = await allCountry.json();
      if (response) {
        localStorage.setItem("countries", JSON.stringify(response));
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      let allCountry = await JSON.parse(localStorage.getItem("countries") || "[]");
      if (allCountry) {
        setCountries(allCountry);
      }
    };
    getData();
  }, []);

  return (
    <div className={`App ${isDark ? "bg-gray-900" : "bg-white"}`}>
      <div className={`container mx-auto mx-7xl p-4`}>
        <div className='grid grid-cols-1 sm:grid-cols-2 my-8'>
          <div className='grid-span-1'>
            <button
              onClick={toggleDarkMode}
              className={`${isDark ? "bg-white text-gray-900" : "bg-gray-900 text-white"} w-48 px-4 py-2 rounded-lg`}>
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <div className='grid-span-1 text-right'>
            <p className={
              `text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`
            }>{currentTime}</p>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {countries.map((country, index) => (
            <div
              key={index}
              className={`rounded-lg p-4 ${isDark ? "bg-white text-gray-900" : "bg-gray-900 text-white"}`}>
              <img src={country.flags.svg} width={150} height={100} alt={country.name.common} />
              <p className='text-xl font-bold'>{country.name.common}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App
