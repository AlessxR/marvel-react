

class MarvelService {

    _apiBase = 'https://marvel-server-zeta.vercel.app/characters';
    _apiKey = 'd4eecb0c66dedbfae4eab45d312fc1df';

    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) throw new Error(`Could not fetch ${url}, status: ${res.status}`);

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}?limit=9&apikey=${this._apiKey}`);
    }

    getCharacters = (id) => {
        return this.getResource(`${this._apiBase}/${id}?apikey=${this._apiKey}`);
    }
}

export default MarvelService;