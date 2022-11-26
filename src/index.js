import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const inputText = document.querySelector('input')
const formSearch = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')

formSearch.addEventListener('submit', searchImgs)

const key = '31495001-d7fca89852a5b5217d905cd4a';

let pageNumber = 0;

function searchImgs(event) {
    pageNumber += 1;
    event.preventDefault()
    const searchImg = inputText.value.split(' ').join('+')
    console.log(searchImg)
    axios.get(`https://pixabay.com/api/?key=${key}q=${searchImg}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`)
    .then(response => {
        console.log(response.data)
        console.log(response.statusText)
        return response.data})
    .then(headers => headers.hits)
    .then(hits => onlyOneFound(hits))
    .catch(error => console.log(error.message))

}


function onlyOneFound(data) {
    gallery.innerHTML=''
    if (data.length > 0) {
        markup = data.map(image => 
            `<a href="${image.largeImageURL}" style="text-decoration: none" >
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /> 
                <div class="info" style="display: flex" style="gap: 20px" style="padding: 5px">
                    <p class="info-item" style="margin: 10px">
                        <b>Likes</b>
                        </br>
                        ${image.likes}
                    </p>
                    <p class="info-item" style="margin: 10px">
                        <b>Views</b>
                        </br>               
                        ${image.views}
                    </p>
                    <p class="info-item" style="margin: 10px">
                        <b>Comments</b>
                        </br>
                        ${image.comments}
                    </p>
                    <p class="info-item" style="margin: 10px">
                        <b>Downloads</b>
                        </br>
                        ${image.downloads}
                    </p>
                </div>
              </a>`
            ).join('')
            gallery.insertAdjacentHTML('afterbegin', markup);

            
    } 
    

}

let lightbox = new SimpleLightbox('.gallery a', { });

// <div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>