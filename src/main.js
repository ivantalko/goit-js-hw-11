import './css/style.css';
import { BASE_URL, getPhoto } from './api/fetch';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const formEl = document.querySelector('#search-form');
const moreBtn = document.querySelector('.load-more');
let page = 1;

const totalPages = Math.ceil(500 / 40);

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
  doLightbox();
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
      moreBtn.classList.add('visually-hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    data.hits.forEach(photo => {
      createCardMarkup(photo);
    });
    doLightbox();
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
    <a class='link-img' href=${largeImageURL}><img src=${webformatURL} alt=${tags} loading="lazy" class="card-img" height="80%"/></a>
  <div class="info">
    <p class="info-item">
      <b class="info-label">Likes </b><span class="info-span">${likes}</span>
    </p>
    <p class="info-item">
      <b class="info-label">Views </b><span class="info-span">${views}</span>
    </p>
    <p class="info-item">
      <b class="info-label">Comments </b><span class="info-span">${comments}</span>
    </p>
    <p class="info-item">
      <b class="info-label">Downloads </b><span class="info-span">${downloads}</span>
    </p>
  </div>
</div>`
  );
}

function doLightbox() {
  const linkImg = document.querySelector('.link-img');
  linkImg.addEventListener('click', openModal);

  function openModal(event) {
    event.preventDefault();
  }

  let lightbox = new SimpleLightbox('.photo-card a', {
    captionDelay: 250,
  });
}

function clearMarkup(element) {
  element.innerHTML = '';
}
