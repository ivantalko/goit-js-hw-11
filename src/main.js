import './css/style.css';
import { BASE_URL, getPhoto, itemPerPage } from './fetch';
import Notiflix from 'notiflix';

const galleryEl = document.querySelector('.gallery');
const formEl = document.querySelector('#search-form');
const moreBtn = document.querySelector('.load-more');
let page = 1;

const totalPages = Math.ceil(500 / itemPerPage);

formEl.addEventListener('submit', onSubmit);

async function loadMoreCards(searchValue) {
  page += 1;
  const data = await getPhoto(searchValue, page);
  data.hits.forEach(photo => {
    createCardMarkup(photo);
  });
  if (page === totalPages) {
    moreBtn.classList.add('visually-hidden');
  }
}

function onSubmit(event) {
  event.preventDefault();

  clearMarkup(galleryEl);

  const searchValue = event.currentTarget[0].value;
  mountData(searchValue);
}

async function mountData(searchValue) {
  try {
    const data = await getPhoto(searchValue, page);

    moreBtn.classList.remove('visually-hidden');
    moreBtn.addEventListener('click', () => {
      loadMoreCards(searchValue);
    });
    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    data.hits.forEach(photo => {
      createCardMarkup(photo);
    });
  } catch (error) {
    console.log('error', error);
  }
}

function createCardMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  galleryEl.insertAdjacentHTML(
    'beforeend',
    `<div class="photo-card">
  <img src=${webformatURL} alt=${tags} loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:</b><span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`
  );
}

function clearMarkup(element) {
  element.innerHTML = '';
}

// const refs = {
//   serchForm: document.querySelector('#search-form'),
//   input: document.querySelector('[name="searchQuery"]'),
//   btnSerch: document.querySelector('[type="submit"]'),
//   btnLoadMore: document.querySelector('[type="button"]'),
//   gallery: document.querySelector('.gallery'),
// };

// refs.serchForm.addEventListener('submit', onSerch);

// function onSerch(e) {
//   e.preventDefault();
//   const searchQuery = e.currentTarget.elements.searchQuery.value;
//   const options = {
//     key: '30084767-7a1e2118a8f7c64e4377bd167',
//     q: '',
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: 'true',
//   };
//   const url = `https://pixabay.com/api/?key=30084767-7a1e2118a8f7c64e4377bd167&q=${searchQuery}&image_type=photo&per_page=40&page=1`;
//   fetch(url, options)
//     .then(r => r.json())
//     .then(console.log);
// }
