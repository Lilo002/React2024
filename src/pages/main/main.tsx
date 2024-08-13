import { Link } from 'react-router-dom';

export const Main: React.FC = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/first">First From</Link>
          </li>
          <li>
            <Link to="/second">Second From</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
