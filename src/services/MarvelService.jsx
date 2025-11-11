import {useHttp} from "../hooks/http.hook.jsx";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = '/marvel/characters';
    const _apiKey = 'd4eecb0c66dedbfae4eab45d312fc1df';
    const _baseLimit = 9;

    const _apiComics = '/marvel/comics';
    const _baseComicsLimit = 10;

    const getAllCharacters = async (limit = _baseLimit) => {
        // Big object to API
        const result = await request(`${_apiBase}?limit=${limit}&apikey=${_apiKey}`);

        return result.data.results.map(_transformCharacter);
    }

    const getCharacters = async (id) => {
        if (!id) id = 1;

        const res = await request(`${_apiBase}/${id}?apikey=${_apiKey}`);

        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (limit = _baseComicsLimit, offset = 0) => {
        const result = await request(`${_apiComics}?limit=${limit}&offset=${offset}&apikey=${_apiKey}`);

        return result.data.results.map(_transformComics);
    }



    const _transformCharacter = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics,
        }
    }

    const _transformComics = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description,
            pageCount: comic.pageCount,
            thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
            textObjects: comic.textObjects.languages,
            prices: comic.prices[0].price
        }
    }

    return {
        loading, error, getAllCharacters, getCharacters, clearError, getAllComics
    }
}

export default useMarvelService;