export const getCurrentImage = (path: string | null, defaultImage: string): string => {
  return path !== null ? `${import.meta.env.VITE_APP_API_URL}${path}` : defaultImage;
};
