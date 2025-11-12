import React, {useEffect, useState} from "react";

import './comicsList.scss';

import useMarvelService from "../../services/MarvelService.jsx";

const ComicsList = () => {

    const {getAllComics} = useMarvelService();

    const [comics, setComics] = useState([]);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setNewItemLoading] = useState(false);


    const onComicsLoaded = (newComicsList) => {
        setComics(comics => [...comics, ...newComicsList]);
        setNewItemLoading(false);
    }

    const onRequest = (offset) => {
        setNewItemLoading(true);
        getAllComics(limit, offset).then(onComicsLoaded);
    }

    const onLoadMore = () => {
        setOffset(prev => prev + limit);
    }

    useEffect(() => {
        onRequest(offset);
    }, [offset]);

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {comics.map(comic => (
                    <li className="comics__item" key={comic.id}>
                        <a href="#">
                            <ComicComponent name={comic.title} price={comic.prices} img={comic.thumbnail} />
                        </a>
                    </li>
                ))}
            </ul>
            <button
                className="button button__main button__long"
                onClick={() => onLoadMore()}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const ComicComponent = ({ name, price, img }) => {
    return (
        <>
            <img src={img} alt={name} className="comics__item-img"/>
            <div className="comics__item-name">{name}</div>
            <div className="comics__item-price">{price}</div>
        </>
    )
}

export default ComicsList;