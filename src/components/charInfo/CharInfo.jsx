import PropTypes from 'prop-types';

import React from 'react';

import './charInfo.scss';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import MarvelService from '../../services/MarvelService';

class CharInfo extends React.Component {

    state = {
        char: {},
        loading: false,
        error: false,
        skeleton: true,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    updateChar = () => {
        const { charId } = this.props;

        if (!charId) return;

        this.onCharLoading();

        this.marvelService
            .getCharacters(charId)
            .then(this.onChatLoaded)
            .catch(this.onError);
    }

    onChatLoaded = (char) => {
        // If data gets, loading is false
        this.setState({ char, loading: false, skeleton: false });
    }

    onCharLoading = () => {
        this.setState({ loading: true });
    }

    onError = () => {
        this.setState({ loading: false, error: true });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    componentDidCatch(error, info) {
        console.log(error, info);
        this.setState({
            error: true,
        });
    }

    render() {

        const { char, loading, error, skeleton } = this.state;

        const skeletonMessage = skeleton ? <Skeleton /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = (!loading && !error && !skeleton) ? <View char={char} /> : null;

        return (
            <div className="char__info">
                {skeletonMessage}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
};

const View = ({ char }) => {

    const { name, homepage, wiki, description, thumbnail, comics } = char;

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
                {comics.length === 0 ? 'This character doesnt have comics' : comics.items.map((item, i) => (
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