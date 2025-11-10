import PropTypes from 'prop-types';

import React, {useEffect, useState} from 'react';

import './charInfo.scss';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import MarvelService from '../../services/MarvelService';

const CharInfo = (props) => {

    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [skeleton, setSkeleton] = useState(true);

    const skeletonMessage = skeleton ? <Skeleton /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = (!loading && !error && !skeleton) ? <View char={char} /> : null;


    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const { charId } = props;

        if (!charId) return;

        onCharLoading();

        marvelService
            .getCharacters(charId)
            .then(onChatLoaded)
            .catch(onError);
    }

    const onChatLoaded = (char) => {
        setChar(char);
        setLoading(false);
        setSkeleton(false);
    }

    const onCharLoading = () => {
        setLoading(true);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    return (
        <div className="char__info">
            {skeletonMessage}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
};

const View = ({ char }) => {

    const { name, homepage, wiki, description, thumbnail, comics = {items: []} } = char;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" />
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
                {comics.items.length === 0 ? 'This character doesnt have comics' : comics.items.map((item, i) => (
                    <li className="char__comics-item" key={i}>
                        {item}
                    </li>
                ))}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number,
}

export default CharInfo;