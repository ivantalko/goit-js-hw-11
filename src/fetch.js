import axios from 'axios';
import Notiflix from 'notiflix';
import { itemPerPage } from './main';

export const itemPerPage = 40;

const API_KEY = '30084769-91cedc9ad879b4e4c8b5187f4';
const searchParams = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: itemPerPage,
});

export const BASE_URL = `https://pixabay.com/api/?${searchParams}`;

export async function getPhoto(search, page) {
  try {
    if (!search.trim()) {
      console.log('no arg!');
      return;
    }
    const response = await axios.get(`${BASE_URL}&page=${page}&q=${search}`);
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

// const options = {
//   key: '30084769-91cedc9ad879b4e4c8b5187f4',
//   q: '',
// image_type: 'photo',
// orientation: 'horizontal',
// safesearch: 'true',
// };
// export const getPhoto = () => {
//   return fetch(BASE_URL, options).then(responce => {
//     if (!responce.ok) {
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     }
//     return responce.json();
//   });
// };
