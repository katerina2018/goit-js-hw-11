import Notiflix from 'notiflix';
import axios from 'axios';

const API_KEY = '24782387-235d5961f89ca8adc0055c0c3';
const BASE_URL = 'https://pixabay.com/api';

export default class ImgApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImgs() {
        const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&language=en&per_page=40&page=${this.page}`;

        return axios.get(url).then(data => {
            const hits = data.data.hits;

            if (hits.length === 0) {
                Notiflix.Notify.warning(
                    '"Sorry, there are no images matching your search query. Please try again.',
                );
                return;
            }
            this.incrementPage();

            return hits;
        });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}