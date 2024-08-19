export const fetchCampingList = async () => {
  const response = await fetch(`http://localhost:3001/camping-list`);
  return response.json();
};
