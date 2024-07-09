import { Component } from 'react';
import { SearchItem } from '../../types';

import './_style.scss';

type CardState = {
  data: SearchItem;
  isLoaded: boolean;
};

type CardProps = {
  data: SearchItem;
};

export class Card extends Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);
    this.state = {
      data: props.data,
      isLoaded: false,
    };
  }

  handleImageLoad = () => {
    this.setState({ isLoaded: true });
  };

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
        <div className="card-img-container">
          {!this.state.isLoaded && (
            <div className="loader-container">
              <div className="card-loader"></div>
            </div>
          )}
          <img
            className={`card-img ${this.state.isLoaded ? 'loaded' : ''}`}
            src={front_default}
            alt={name}
            onLoad={this.handleImageLoad}
          />
        </div>
        <h2 className="card-name">{name}</h2>
        <div className="card-bottom">
          <div className="card-left">
            {types.map(({ type: { name } }, i) => (
              <span className={`card-description ${name}`} key={i}>
                {name}
              </span>
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
