import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const inputText = document.querySelector('input')
const formSearch = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more')
const lightbox = new SimpleLightbox('.gallery a', { });
let pageNumber = 1;

formSearch.addEventListener('submit', searchImgs)

const key = '31495001-d7fca89852a5b5217d905cd4a';

let searchImg = '';
let numberOfImgs = 0;
function searchImgs(event) {
    event.preventDefault();
    searchImg = inputText.value.split(' ').join('+');
    gallery.innerHTML=''
    pageNumber = 1
    getImages()
}

function getImages() {
    axios(`https://pixabay.com/api/?key=${key}&q=${searchImg}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`)    
    .then(response => {
        numberOfImgs = response.data.total;
        return response.data})
    .then(headers => headers.hits)
    .then(hits => {
        createGallery(hits)
        loadBtn(hits)
        imagesInfo()
        endOfImgsList()})
    .catch(error => console.log(error.message))
}

function endOfImgsList() {
    if (numberOfImgs > 0 && numberOfImgs === gallery.childNodes.length) {
        loadMoreBtn.style.display = 'none'
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
    }
}

function imagesInfo() {
    if (numberOfImgs && pageNumber === 1) {Notiflix.Notify.info(`Hooray! We found ${numberOfImgs} images.`)}
}

function createGallery(data) {
    if (data.length > 0) {
        markup = data.map(image => 
            `<div class="gallery__photo-card">
                <a class="gallery__item" href="${image.largeImageURL}">
                    <img class="gallery__image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /> 
                </a>
                <div class="gallery__info">
                    <p class="gallery__info-item">
                        <b>Likes</b>
                        <span>${image.likes}</span>
                    </p>
                    <p class="gallery__info-item">
                        <b>Views</b>         
                        <span>${image.views}</span>
                    </p>
                    <p class="gallery__info-item">
                        <b>Comments</b>
                        <span>${image.comments}</span>
                    </p>
                    <p class="gallery__info-item">
                        <b>Downloads</b>
                        <span>${image.downloads}</span>
                    </p>
                </div>
            </div>`
            ).join('')
        gallery.insertAdjacentHTML('beforeend', markup);      

        lightbox.refresh()
        return
    } 
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
}

function loadBtn(data) {
    if (data.length > 0) {
        loadMoreBtn.style.display = 'block'
        loadMoreBtn.addEventListener('click', pageCount)
    }
}

function pageCount() {
    pageNumber += 1;
    getImages()
}
