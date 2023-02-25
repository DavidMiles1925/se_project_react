function convertTemp(kelvinTemp, desiredUnit) {
  if (desiredUnit === "F") {
    return (1.8 * (Number(kelvinTemp) - 273) + 32).toFixed(1);
  } else if (desiredUnit === "C") {
    return (Number(kelvinTemp) - 273.15).toFixed(1);
  } else if (desiredUnit === "K") {
    return Number(kelvinTemp).toFixed(1);
  } else {
    return "Error: Invalid conversion code";
  }
}

function weatherTemp(kelvin) {
  if (kelvin >= 303) {
    return "hot";
  } else if (kelvin >= 289 && kelvin < 303) {
    return "warm";
  } else {
    return "cold";
  }
}

export { convertTemp, weatherTemp };
