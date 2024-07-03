import { Component } from 'react';
import { SearchItem } from '../../types';

import './_style.scss';

type CardState = {
  data: SearchItem;
};

type CardProps = {
  data: SearchItem;
};

export class Card extends Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);
    this.state = {
      data: props.data,
    };
    console.log(props);
  }

  render() {
    const {
      name,
      sprites: {
        other: {
          ['official-artwork']: { front_default },
        },
      },
      types,
      weight,
      height,
    } = this.props.data;
    return (
      <div className="card">
        <img className="card-img" loading="lazy" src={front_default} alt={name} />
        <h2 className="card-name">{name}</h2>
        <div className="card-bottom">
          <div className="card-left">
            {types.map(({ type: { name } }) => (
              <span className={`card-description ${name}`}>{name}</span>
            ))}
          </div>
          <div className="card-right">
            <span>Weight: {weight / 10} kg</span>
            <span>Height: {height / 10} m</span>
          </div>
        </div>
      </div>
    );
  }
}
