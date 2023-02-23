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

function weatherTemp(deg, unit) {
  if (unit === "F") {
    if (deg >= 86) {
      return "hot";
    } else if (deg >= 60 && deg < 86) {
      return "warm";
    } else {
      return "cold";
    }
  } else {
    return "Error: Invalid weather type";
  }
}

export { convertTemp, weatherTemp };
