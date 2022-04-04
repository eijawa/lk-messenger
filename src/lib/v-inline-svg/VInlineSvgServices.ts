export const downloadSvg = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
  });
  const data = await response.text();
  const parser = new DOMParser();
  const domElement = parser.parseFromString(data, 'text/html');
  const svg = domElement.querySelector('svg');
  console.log(domElement);
};
