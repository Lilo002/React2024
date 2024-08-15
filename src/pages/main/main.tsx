import { Link } from 'react-router-dom';
import { useAppSelector } from '../../utils/store/hooks';
import { UserItem } from '../../components/user/user';

export const Main: React.FC = () => {
  const users = useAppSelector(state => state.users);

  return (
    <>
      <nav className="navigation">
        <Link to="/first">Controlled From</Link>

        <Link to="/second">Uncontrolled From</Link>
      </nav>
      <div className="user-list">
        {users.map((user, i) => {
          return <UserItem data={user} key={i} />;
        })}
      </div>
    </>
  );
};
