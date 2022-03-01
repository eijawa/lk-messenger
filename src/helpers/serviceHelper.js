export const useFetch = async (url, params = null) => {
  const token = localStorage.getItem('jwt');
  let paramsValue = null;

  if (token) {
    if (params === null) {
      paramsValue = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      paramsValue = params;
      paramsValue.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await fetch(url, paramsValue);
    return response.json();
  }
  // window.location.href = 'https://lk.volsu.ru';
  return {};
};
