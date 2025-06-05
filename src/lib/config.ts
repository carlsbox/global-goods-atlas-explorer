
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

export default config;
