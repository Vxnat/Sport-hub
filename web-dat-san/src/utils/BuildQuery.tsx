export const buildQuery = (filters: any) => {
  return Object.keys(filters)
    .map((k) => `${k}=${filters[k]}`)
    .join("&");
};
