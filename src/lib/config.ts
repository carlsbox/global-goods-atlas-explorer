
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

export default config;
