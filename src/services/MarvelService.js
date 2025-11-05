

class MarvelService {

    _apiBase = 'https://marvel-server-zeta.vercel.app/characters';
    _apiKey = 'd4eecb0c66dedbfae4eab45d312fc1df';

    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) throw new Error(`Could not fetch ${url}, status: ${res.status}`);

        return await res.json();
    }

    getAllCharacters = async () => {
        // Big object to API
        const result = await this.getResource(`${this._apiBase}?limit=9&apikey=${this._apiKey}`);

        return result.data.results.map(this._transformCharacter());
    }

    getCharacters = async (id) => {

        if (!id) id = 1;

        const res = await this.getResource(`${this._apiBase}/${id}?apikey=${this._apiKey}`);

        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (character) => {
        return {
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extenstion,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url
        }
    }
}

export default MarvelService;