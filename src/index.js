import './styles.css';
import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/js/dist/modal.js';
// import app from './app.js';
// app();


// import _ from 'lodash';
import * as yup from 'yup';
import onChange from 'on-change';

const form = document.querySelector('.rss-form');
const input = document.querySelector('#url-input');
const error = document.querySelector('#error-input');
const feeds = document.querySelector('.feeds');

const schema = yup.object().shape({
    url: yup
        .string()
        .url('Введите корректную ссылку')
        .notOneOf(
            [...feeds.querySelectorAll('a')].map((feed) => feed.href),
            'Такая ссылка уже добавлена',
        )
        .required('Введите ссылку'),
});

const validate = (value) => {
    schema
        .validate({ url: value })
        .then(() => {
            input.classList.remove('is-invalid');
            error.textContent = '';
            form.reportValidity();
        })
        .catch((err) => {
            input.classList.add('is-invalid');
            error.textContent = err.message;
            form.reportValidity();
        });
};

onChange(input, (value) => {
    validate(value);
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    schema
        .validate({ url: input.value })
        .then(() => {
            const feed = document.createElement('a');
            feed.href = input.value;
            feed.target = '_blank';
            feed.rel = 'noopener noreferrer';
            feed.classList.add('list-group-item', 'list-group-item-action');
            feed.textContent = 'Загрузка...';
            feeds.prepend(feed);
            input.value = '';
            input.focus();
            validate('');
            form.classList.remove('was-validated');
        })
        .catch((err) => {
            input.classList.add('is-invalid');
            error.textContent = err.message;
            form.reportValidity();
        });
});