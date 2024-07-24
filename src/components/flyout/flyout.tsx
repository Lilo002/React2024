import { useDispatch, useSelector } from 'react-redux';
import { removeAll } from '../../store/flyout/flyoutSlice';
import { RootState } from '../../store/store';

import './flyout.scss';
import { convertToCSV } from './ui/convertToCsv';

export const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.flyout);

  return (
    data.length > 0 && (
      <div className="flyout">
        <button className="flyout-btn button" onClick={() => dispatch(removeAll())}>
          Unselect all
        </button>
        <span className="flyout-text">{`${data.length} items are selected`}</span>
        <a className="flyout-btn button" href={convertToCSV(data)} download={`${data.length}-pokemon.csv`}>
          Download
        </a>
      </div>
    )
  );
};
