import {media198} from '../jsMediaQueries.js';

media198.addEventListener('change',
    () => {
        if (media198.matches) {
            console.log('media198')
        }
    });
