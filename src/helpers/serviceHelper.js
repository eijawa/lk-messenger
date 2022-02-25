export const useFetch = async (url, params = { method: 'GET', body: null }) => {
    const token = localStorage.getItem('jwt');

    if (token) {
        const response = await fetch(url, {
            method: params?.method,
            body: params?.body,
            ContentType: 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`,
        });
        const data = await response.json();
        return data;
    }
    window.location.href = 'https://lk.volsu.ru';
    return {};
};
