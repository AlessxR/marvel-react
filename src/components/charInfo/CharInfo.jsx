import PropTypes from 'prop-types';

import React, {useEffect, useState} from 'react';

import './charInfo.scss';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import useMarvelService from '../../services/MarvelService.jsx';
import {Link} from "react-router-dom";

const CharInfo = (props) => {

    const [char, setChar] = useState({});
    const [comic, setComic] = useState([]);

    const [skeleton, setSkeleton] = useState(true);

    const {error, loading, getCharacters, clearError, getAllComics} = useMarvelService();

    const skeletonMessage = skeleton ? <Skeleton/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;

        if (!charId) return;

        clearError();

        getCharacters(charId).then(onCharLoaded);
        getAllComics().then(onComicLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setSkeleton(false);
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const content = (!loading && !error && !skeleton) ? <View char={char} comic={comic}/> : null;

    return (
        <div className="char__info">
            {skeletonMessage}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
};

const View = ({char, comic}) => {

    const { name, homepage, wiki, description, thumbnail, comics = {items: []}} = char;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss"/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.items.length === 0 ? 'This character doesn’t have comics' : comics.items.map((item, i) => {
                        const foundComic = comic.find(c => c.title === item);
                        if (!foundComic) {
                            return <li key={i} className="char__comics-item">{item}</li>;
                        }
                        return (
                            <Link
                                to={`/comics/${foundComic.id}`}
                                className="char__comics-item"
                                key={i}
                            >
                                {item}
                            </Link>
                        );
                    })}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number,
}

export default CharInfo;