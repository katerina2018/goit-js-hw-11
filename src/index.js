import './sass/main.scss';

import Notiflix from 'notiflix';

import cardTpl from './templates/card.hbs';

import ImgApiService from './js/img-service';
import LoadMoreBtn from './js/components/load-more-btn';

const refs = {
    form: document.querySelector('.search-form'),
    searchValue: document.querySelector('[name="searchQuery"]'),
    searchBtn: document.querySelector('#search-form button '),
    galleryContainer: document.querySelector('.gallery'),
};
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const imgApiService = new ImgApiService();

refs.form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImgs);

function onSearch(e) {
    e.preventDefault();

    imgApiService.query = e.currentTarget.elements[0].value;

    if (imgApiService.query === '') {
        Notiflix.Notify.warning('Ведите запрос');
        return;
    }

    imgApiService.resetPage();
    clearItemsContainer();
    fetchImgs();

    loadMoreBtn.show();
}

function fetchImgs() {
    loadMoreBtn.disable();
    imgApiService.fetchImgs().then(items => {
        appendImgsMarkup(items);
        loadMoreBtn.enable();
    });
}

function appendImgsMarkup(items) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', cardTpl(items));
}

function clearItemsContainer() {
    refs.galleryContainer.innerHTML = '';
}