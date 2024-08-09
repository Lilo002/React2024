'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon, removePokemon } from '../../../app/GlobalRedux/flyoutSlice/flyoutSlice';
import { RootState } from '../../../app/GlobalRedux/store';
import { Pokemon } from '../../../types/types';

type CheckboxProps = {
  data: Pokemon;
};

export const Checkbox: React.FC<CheckboxProps> = ({ data }) => {
  const state = useSelector((state: RootState) => state.flyout);
  const [isChecked, setIsChecked] = useState(checkedIsAdded());

  function checkedIsAdded() {
    return state.some((pokemon) => pokemon.name === data.name);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    checkedIsAdded() ? setIsChecked(true) : setIsChecked(false);
  }, [state]);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
    if (isChecked) {
      dispatch(removePokemon(data.name));
    } else {
      dispatch(addPokemon(data));
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
