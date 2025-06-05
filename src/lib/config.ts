
import config from '../globalgoodsconfig.json';

export const getConfig = () => {
  return config;
};

export const getSiteName = () => {
  return config.siteName;
};

export const getAnalyticsId = () => {
  return config.analytics.googleAnalyticsId;
};

export const getMapGeoUrl = () => {
  return config.map.geoJsonUrl;
};

export const getBaseUrl = () => {
  return config.baseUrl || `https://${config.domain}`;
};

export const getDomain = () => {
  return config.domain;
};

export const getStandardsBadgeColors = () => {
  return config.ui?.standardsBadges || {
    health: {
      background: "bg-red-100",
      text: "text-red-800",
      hover: "hover:bg-red-200",
      border: "border-red-200"
    },
    interoperability: {
      background: "bg-indigo-100",
      text: "text-indigo-800",
      hover: "hover:bg-indigo-200",
      border: "border-indigo-200"
    },
    climate: {
      background: "bg-green-100",
      text: "text-green-800",
      hover: "hover:bg-green-200",
      border: "border-green-200"
    }
  };
};

export default config;
