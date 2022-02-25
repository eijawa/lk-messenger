const getAuthToken = () => {
  const _params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  return _params.token;
};

export default getAuthToken;