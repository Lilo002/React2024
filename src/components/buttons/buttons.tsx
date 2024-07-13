import { useNavigateMethods } from '../../hooks/useNavigateMethods';
import './buttons.scss';
type ButtonsProps = {
  isPrevBtnDisabled: boolean;
  isNextBtnDisabled: boolean;
};
export function Buttons({ isPrevBtnDisabled, isNextBtnDisabled }: ButtonsProps) {
  const { decreaseOffset, increaseOffset } = useNavigateMethods();
  return (
    <div className="left-buttons">
      <button className="button" disabled={isPrevBtnDisabled} onClick={decreaseOffset}>
        prev
      </button>

      <button className="button" disabled={isNextBtnDisabled} onClick={increaseOffset}>
        next
      </button>
    </div>
  );
}
