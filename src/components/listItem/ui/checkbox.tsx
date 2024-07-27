import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon, removePokemon } from '../../../store/flyout/flyoutSlice';
import { useGetPokemonByNameQuery } from '../../../store/api/api';
import { RootState } from '../../../store/store';

type CheckboxProps = {
  name: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({ name }) => {
  const state = useSelector((state: RootState) => state.flyout);
  const [isChecked, setIsChecked] = useState(checkedIsAdded());
  const { data, isFetching } = useGetPokemonByNameQuery(name);

  function checkedIsAdded() {
    return state.some((pokemon) => pokemon.name === name);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFetching && data && isChecked && !checkedIsAdded()) {
      dispatch(addPokemon(data));
    }
  }, [isFetching, data, isChecked, dispatch]);

  useEffect(() => {
    checkedIsAdded() ? setIsChecked(true) : setIsChecked(false);
  }, [state]);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
    if (isChecked) {
      dispatch(removePokemon(name));
    }
  };

  return (
    <label className="pokemon-checkbox">
      <input
        className="pokemon-checkbox-input"
        data-testid="checkbox"
        onChange={handleChange}
        checked={isChecked}
        type="checkbox"
      />
      <span className="pokemon-checkbox-icon" />
    </label>
  );
};
