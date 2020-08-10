import {media258} from '../jsMediaQueries.js';

media258.addEventListener('on-change',
    () => {
        if (media258.matches) {
            console.log('media258');
        }
    });
