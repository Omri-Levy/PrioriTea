const fetchFn = async (url, options) => {
    try {
        const res = await fetch(url, options);
        const data = await res.json();

        return {res, data};
    } catch (err) {
        console.error(err);
    }
}

export default fetchFn;
