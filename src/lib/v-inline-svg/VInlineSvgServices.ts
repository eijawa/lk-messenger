export const downloadSvg = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
  });
  if (response.status >= 200 && response.status < 400) {
    const data = await response.text();
    const parser = new DOMParser();
    const domElement = parser.parseFromString(data, 'text/html');
    const svg = domElement.querySelector('svg');
    console.log(domElement);
  }
};
