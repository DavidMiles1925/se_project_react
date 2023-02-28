import "./ToggleSwitch.css";
import { useContext, useState, useEffect } from "react";
import { TemperatureContext } from "../../contexts/TemperatureContext";

function ToggleSwtich() {
  const { currentTemperatureUnit, handleToggleSwitchChange } =
    useContext(TemperatureContext);
  const [fahrColor, setFahrColor] = useState("");
  const [celColor, setCelColor] = useState("");

  useEffect(() => {
    if (currentTemperatureUnit === "F") {
      setFahrColor("white");
    } else {
      setFahrColor("rgba(126, 126, 126, 1)");
    }
  }, [currentTemperatureUnit]);

  useEffect(() => {
    if (currentTemperatureUnit === "C") {
      setCelColor("white");
    } else {
      setCelColor("rgba(126, 126, 126, 1)");
    }
  }, [currentTemperatureUnit]);

  return (
    <>
      <input
        className='toggle-switch__checkbox'
        id={`toggle-switch-new`}
        type='checkbox'
        onChange={handleToggleSwitchChange}
      />
      <label className='toggle-switch__label' htmlFor={`toggle-switch-new`}>
        <span className={`toggle-switch__button`} />
        <p
          className='toggle-switch__element toggle-switch__element_back toggle-switch__element_f'
          style={{ color: fahrColor }}
        >
          F
        </p>
        <p
          className='toggle-switch__element toggle-switch__element_back toggle-switch__element_c'
          style={{ color: celColor }}
        >
          C
        </p>
        <p className='toggle-switch__element toggle-switch__element_front toggle-switch__element_f'>
          F
        </p>
        <p className='toggle-switch__element toggle-switch__element_front toggle-switch__element_c'>
          C
        </p>
      </label>
    </>
  );
}

export default ToggleSwtich;
