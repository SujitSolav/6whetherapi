import React, { useState } from "react";
import "./Apifetch.css";
function Apifetch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [country, setCountry] = useState("india");
  const [loading, setLoading] = useState(false); 

  const fetchdata = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=af2e203d08f045f19fc40924242903&q=${country}&aqi=no`);
      const whetherdata = await response.json();
      setData(whetherdata);
      setError("");
    } catch (error) {
      setError("Something happened");
    } finally{
        console.log(error)
        setLoading(false);
    }
  };
   function handlechange(e){
        setCountry(e.target.value);
   };

   function handleSubmit(e){
   ; e.preventDefault()
    fetchdata();
   }
  return (
    <>  <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor=""> Enter Country / City : <input value={country} onChange={handlechange} type="text"/ > </label>
        <button type="submit" >Fetch Data</button>
        </form>
        {loading && <div className="load">Loading...</div>}
        {error && <div >Error: {error}</div>}
        { data && (
        <div className="disp">
        <div>Temperature: {data.current.temp_c} °C</div>
        <div> Humidity : {data.current.humidity}</div>
        <div> Wind Speed : {data.current.wind_kph}</div>
        </div>
      )}
    </>
  );
}

export default Apifetch;
