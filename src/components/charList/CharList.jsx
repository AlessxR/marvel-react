import React from 'react';

import './charList.scss';
import MarvelService from '../../services/MarvelService';

class CharList extends React.Component {

    marvelService = new MarvelService();

    // 9 chars in state array, chars
    state = {
        chars: [],
        loading: false,
        newItemLoading: false,
        limit: 9,
    }

    componentDidMount() {
        this.onRequest(this.state.limit);
    }

    onRequest = (limit) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(limit).then(this.onCharListLoaded);
    }

    onCharListLoaded = (newCharList) => {
        this.setState(({ limit, chars }) => ({
            chars: [...chars, ...newCharList],
            loading: false,
            newItemLoading: false,
            limit: limit + 9,
        }));
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        });
    }

    render() {
        // generate a new component with array-data-state
        const items = this.state.chars.map(item => {
            return <RenderNewChar
                key={item.name}
                id={item.id}
                name={item.name}
                img={item.thumbnail}
                onCharSelected={this.props.onCharSelected}
            />
        });

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {items}
                </ul>
                <button
                    className="button button__main button__long"
                    disabled={this.state.newItemLoading}
                    onClick={() => this.onRequest(this.state.limit)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const RenderNewChar = ({ id, name, img, onCharSelected }) => {
    return (
        <li className="char__item" onClick={() => onCharSelected(id)}>
            <img src={img} alt={name} />
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;