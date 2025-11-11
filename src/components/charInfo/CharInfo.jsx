import PropTypes from 'prop-types';

import React, {useEffect, useState} from 'react';

import './charInfo.scss';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import useMarvelService from '../../services/MarvelService.jsx';

const CharInfo = (props) => {

    const [char, setChar] = useState({});
    const [skeleton, setSkeleton] = useState(true);

    const {error, loading, getCharacters, clearError} = useMarvelService();

    const skeletonMessage = skeleton ? <Skeleton/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = (!loading && !error && !skeleton) ? <View char={char}/> : null;

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;

        if (!charId) return;

        clearError();
        getCharacters(charId).then(onChatLoaded);
    }

    const onChatLoaded = (char) => {
        setChar(char);
        setSkeleton(false);
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

const View = ({char}) => {

    const {name, homepage, wiki, description, thumbnail, comics = {items: []}} = char;

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