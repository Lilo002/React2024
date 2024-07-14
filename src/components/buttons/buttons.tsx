import { Link } from 'react-router-dom';
import { useNavigateMethods } from '../../hooks/useNavigateMethods';
import './buttons.scss';
type ButtonsProps = {
  isPrevBtnDisabled: boolean;
  isNextBtnDisabled: boolean;
};
export function Buttons({ isPrevBtnDisabled, isNextBtnDisabled }: ButtonsProps) {
  const { getPageValue, createSearchParams } = useNavigateMethods();
  const currentPage = getPageValue();

  const prevPageUrl = `/?${createSearchParams(currentPage - 1)}`;
  const nextPageUrl = `/?${createSearchParams(currentPage + 1)}`;

  return (
    <div className="left-buttons">
      <Link to={prevPageUrl} className="button" aria-disabled={isPrevBtnDisabled}>
        prev
      </Link>

      <Link to={nextPageUrl} className="button" aria-disabled={isNextBtnDisabled}>
        next
      </Link>
    </div>
  );
}
