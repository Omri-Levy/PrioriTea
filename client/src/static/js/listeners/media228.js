import {media228} from '../jsMediaQueries.js';

media228.addEventListener('change',
    () => {
        if (media228.matches) {
            console.log(media228);
        }
    });
