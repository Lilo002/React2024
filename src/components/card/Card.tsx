import { useState } from 'react';
import { SearchItem } from '../../types';

type CardProps = {
  data: SearchItem;
};

export function Card({ data }: CardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
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
  } = data;

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="card">
      <div className="card-img-container">
        {!isImageLoaded && (
          <div className="loader-container">
            <div className="card-loader"></div>
          </div>
        )}
        <img
          className={`card-img ${isImageLoaded ? 'loaded' : ''}`}
          src={front_default}
          alt={name}
          onLoad={handleImageLoad}
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
