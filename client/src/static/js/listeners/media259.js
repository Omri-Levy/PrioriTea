import {media259} from '../jsMediaQueries.js';

media259.addEventListener('change',
    () => {
        if (media259.matches) {
            console.log('media259');
        }
    });
