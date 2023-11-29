const URL = "https://pixabay.com/api/";
const APIKEY = "27652237-fecf1e648e251b2f1d2bb2568";

async function fetchImage(name, page) {
  const res = await fetch(
    `${URL}?key=${APIKEY}&q=${name}&image_type=photo&pretty=true&page=${page}&per_page=12`
  );
  if (res.ok) return res.json();

  return await Promise.reject(new Error(`Нет изображений по запросу ${name}`));
}

const api = {
  fetchImage,
};

export default api;
