export const getEllipsisTxt = (str, n = 6) => {
    if (str) {
      return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
  };

export const SecondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : "";
    var mDisplay = (m < 10 ? `0${m}:` : `${m}:`);
    var sDisplay = s > 0 ? (s < 10 ? `0${s}:` : `${s}`) : "";
    return hDisplay + mDisplay + sDisplay;
  };