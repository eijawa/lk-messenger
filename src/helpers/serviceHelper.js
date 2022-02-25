export const useFetch = async (url, params = null) => {
  const token = localStorage.getItem('jwt');
  let paramsValue = null;

  if (token) {
    if (params === null) {
      paramsValue = {
        method: 'GET',
        Authorization: `Bearer ${token}`,
      };
    } else {
      paramsValue = params;
    }

    const response = await fetch(url, paramsValue);
    return response.json();
  }
  window.location.href = 'https://lk.volsu.ru';
  return {};
};
