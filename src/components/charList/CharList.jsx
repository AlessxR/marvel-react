import React from 'react';

import './charList.scss';
import MarvelService from '../../services/MarvelService';

class CharList extends React.Component {

    marvelService = new MarvelService();

    state = {
        chars: []
    }

    componentDidMount() {
        const data = this.marvelService.getAllCharacters().then(res => this.setState({ chars: res }));

        return data;
    }


    render() {
        const items = this.state.chars.map(item => {
            return <RenderNewChar key={item.name} name={item.name} img={item.thumbnail} />
        });

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {items}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const RenderNewChar = ({ name, img }) => {
    return (
        <li className="char__item">
            <img src={img} alt={name} />
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;