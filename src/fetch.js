export const BASE_URL = 'https://pixabay.com/api/';

const options = {
  key: '30084769-91cedc9ad879b4e4c8b5187f4',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
};
export const getPhoto = () => {
  return fetch(BASE_URL, options).then(responce => {
    if (!responce.ok) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    return responce.json();
  });
};
