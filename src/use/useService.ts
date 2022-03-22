export const useFetch = async <T>(url: RequestInfo, params: RequestInit = {}): Promise<T> => {
  const token = localStorage.getItem('jwt');
  let paramsValue: RequestInit = {};

  if (token) {
    if (params === {}) {
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
    const result = await response.json() as Promise<T>;
    return result;
  }
  // window.location.href = 'https://lk.volsu.ru';
  return {} as Promise<T>;
};
