import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';


const inputText = document.querySelector('input')
const formSearch = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')

formSearch.addEventListener('submit', searchImgs)
const key = '31495001-d7fca89852a5b5217d905cd4a';
function searchImgs(event) {
    event.preventDefault()
    const searchImg = inputText.value
    axios.get(`https://pixabay.com/api/?key=${key}=${searchImg}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error.message))

}

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