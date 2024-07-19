import { Link } from 'react-router-dom';
import { useNavigateMethods } from '../../hooks/useNavigateMethods';
import './buttons.scss';

type ButtonsProps = {
  isPrevBtnDisabled: boolean;
  isNextBtnDisabled: boolean;
};
export function Buttons({ isPrevBtnDisabled, isNextBtnDisabled }: ButtonsProps) {
  const { getPageValue, createSearchParams, navigateToMainPage } = useNavigateMethods();
  const currentPage = getPageValue();

  const prevPageUrl = `/?${createSearchParams(currentPage - 1)}`;
  const nextPageUrl = `/?${createSearchParams(currentPage + 1)}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, isDisabled: boolean) => {
    if (isDisabled) {
      e.preventDefault();
      navigateToMainPage();
    }
  };

  const createButtonClass = (isDisabled: boolean) => {
    return `button ${isDisabled ? 'disabled' : ''}`;
  };

  return (
    <div className="left-buttons">
      <Link
        to={prevPageUrl}
        className={createButtonClass(isPrevBtnDisabled)}
        onClick={(e) => handleClick(e, isPrevBtnDisabled)}
      >
        prev
      </Link>

      <Link
        to={nextPageUrl}
        className={createButtonClass(isNextBtnDisabled)}
        onClick={(e) => handleClick(e, isNextBtnDisabled)}
      >
        next
      </Link>
    </div>
  );
}
