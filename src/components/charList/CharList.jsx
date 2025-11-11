import React, {useEffect, useState} from 'react';

import './charList.scss';

import useMarvelService from '../../services/MarvelService.jsx';

const CharList = (props) => {

    const {loading, error, getAllCharacters} = useMarvelService();

    const [chars, setChars] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [limit, setLimit] = useState(9);
    const [selectedId, setSelectedId] = useState(null);


    // To API
    useEffect(() => {
        onRequest(limit, true);
    }, []);

    // To API
    const onRequest = (limit, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(limit).then(onCharListLoaded);
    }

    const onCharListLoaded = (newCharList) => {
        setChars(chars => [...chars, ...newCharList]);
        setNewItemLoading(false);
        setLimit(limit + 9);
    }

    const onSelect = (id) => {
        setSelectedId(id);
        props.onCharSelected(id);
    }

    const items = chars.map(item => {
        return <RenderNewChar
            key={item.name}
            id={item.id}
            name={item.name}
            img={item.thumbnail}
            onCharSelected={props.onCharSelected}
            onSelect={onSelect}
            selected={selectedId === item.id}
        />
    });

    return (
        <div className="char__list">
            <ul className="char__grid">
                {items}
            </ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(limit)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const RenderNewChar = ({ id, name, img, onSelect, selected }) => {
    return (
        <li className={`char__item ${selected ? 'char__item_selected' : ''}`} onClick={() => onSelect(id)}>
            <img src={img} alt={name} />
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;