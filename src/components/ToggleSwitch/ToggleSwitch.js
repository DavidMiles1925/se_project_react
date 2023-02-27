import "./ToggleSwitch.css";
import { useContext, useState, useEffect } from "react";
import { TemperatureContext } from "../../contexts/TemperatureContext";

function ToggleSwtich() {
  const { currentTemperatureUnit, handleToggleSwitchChange } =
    useContext(TemperatureContext);
  const [fahrColor, setFahrColor] = useState("");
  const [fahrBackColor, setFahrBackColor] = useState("");
  const [celColor, setCelColor] = useState("");
  const [celBackColor, setCelBackColor] = useState("");

  useEffect(() => {
    if (currentTemperatureUnit === "F") {
      setFahrColor("white");
      setFahrBackColor("black");
    } else {
      setFahrColor("rgba(126, 126, 126, 1)");
      setFahrBackColor("white");
    }
  }, [currentTemperatureUnit]);

  useEffect(() => {
    if (currentTemperatureUnit === "C") {
      setCelColor("white");
      setCelBackColor("black");
    } else {
      setCelColor("rgba(126, 126, 126, 1)");
      setCelBackColor("white");
    }
  }, [currentTemperatureUnit]);

  console.log(currentTemperatureUnit);

  return (
    <div className='toggle-switch'>
      <div className='toggle-switch__background-container'>
        <p
          className='toggle-switch__background toggle-switch__background_f'
          style={{ color: fahrColor, background: fahrBackColor }}
        >
          F
        </p>
        <p
          className='toggle-switch__background toggle-switch__background_c'
          style={{ color: celColor, background: celBackColor }}
        >
          C
        </p>
      </div>
      <input
        type='range'
        className='toggle-switch__range'
        min={1}
        max={2}
        defaultValue={1}
        onChange={handleToggleSwitchChange}
      />
    </div>
  );
}

export default ToggleSwtich;
