export const getBaseUrl = () => import.meta.env.BASE_URL || "/";

export const withBase = (path: string) => {
  const normalizedBase = getBaseUrl().replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedBase ? `${normalizedBase}${normalizedPath}` : normalizedPath;
};
