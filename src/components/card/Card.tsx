import { Component } from 'react';
import { SearchItem } from '../../types';

type CardProps = {
  data: SearchItem;
};
export class Card extends Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  render() {
    const {
      name,
      sprites: {
        other: {
          ['official-artwork']: { front_default },
        },
      },
    } = this.props.data;
    return (
      <div>
        <h2>{name}</h2>
        <img src={front_default} alt={name} />
      </div>
    );
  }
}
