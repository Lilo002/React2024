import { Link } from 'react-router-dom';
import image from '../../assets/error.png';

export function ErrorPage() {
  return (
    <div className="error">
      <h1>Oops, we've lost...</h1>
      <Link to="/">return to the main page</Link>
      <img className="error-img" src={image} alt="error" />
    </div>
  );
}
