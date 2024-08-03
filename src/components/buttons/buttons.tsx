import Link from 'next/link';
import { useNavigateMethods } from '../../hooks/useNavigateMethods';
import { useRouter } from 'next/router';

type ButtonsProps = {
  isPrevBtnDisabled: boolean;
  isNextBtnDisabled: boolean;
  toggleLoader: () => void;
};
export function Buttons({ isPrevBtnDisabled, isNextBtnDisabled, toggleLoader }: ButtonsProps) {
  const router = useRouter();

  const { createSearchParams } = useNavigateMethods();
  const currentPage = +router.query.page || 1;

  const prevPageUrl = `/?${createSearchParams(currentPage - 1)}`;
  const nextPageUrl = `/?${createSearchParams(currentPage + 1)}`;

  const createButtonClass = (isDisabled: boolean) => {
    return `button ${isDisabled ? 'disabled' : ''}`;
  };

  const goToNextPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isNextBtnDisabled) return;
    router.push(nextPageUrl);
    toggleLoader();
  };

  const goToPrevPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isPrevBtnDisabled) return;
    router.push(prevPageUrl);
    toggleLoader();
  };

  return (
    <div className="left-buttons">
      <Link href={prevPageUrl} className={createButtonClass(isPrevBtnDisabled)} onClick={(e) => goToPrevPage(e)}>
        prev
      </Link>

      <Link href={nextPageUrl} className={createButtonClass(isNextBtnDisabled)} onClick={(e) => goToNextPage(e)}>
        next
      </Link>
    </div>
  );
}
