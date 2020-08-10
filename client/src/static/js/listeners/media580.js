import {media580} from '../jsMediaQueries.js';

media580.addEventListener('change',
    () => {
        if (media580.matches) {
            console.log('media580');
            document.querySelector('#first-page').innerHTML = 'First';
            document.querySelector('#last-page').innerHTML = 'Last';
        } else {
            document.querySelector('#first-page').innerHTML =
                '&#171; First';
            document.querySelector('#last-page').innerHTML =
                'Last &#187;';
        }
    });
