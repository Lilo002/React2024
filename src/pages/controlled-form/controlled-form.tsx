import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/validation/validation';
import { User } from '../../types';
import { addUser } from '../../utils/store/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/store/hooks';
import { convertTo64 } from '../../utils/convert/convert';
import { Password } from '../../components/password/password';

export const ControlledForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countries = useAppSelector(state => state.country);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const submitFrom = async (data: User) => {
    if (data.photo) {
      const file = data.photo[0];
      const base64 = await convertTo64(file);
      dispatch(addUser({ ...data, photo: base64 }));

      navigate('/');
    }
  };

  return (
    <>
      <h1>Controlled form</h1>
      <form className="form" onSubmit={handleSubmit(submitFrom)}>
        <div className="form-field">
          <div className="form-input">
            <label htmlFor="name">Name:</label>
            <input {...register('name')} id="name" />
          </div>
          {errors.name && <div className="error">{errors.name.message}</div>}
        </div>

        <div className="form-field">
          <div className="form-input">
            <label htmlFor="age">Age:</label>
            <input {...register('age')} type="number" id="age" />
          </div>
          {errors.age && <div className="error">{errors.age.message}</div>}
        </div>

        <div className="form-field">
          <div className="form-input">
            <label htmlFor="email">Email:</label>
            <input {...register('email')} id="email" />
          </div>
          {errors.email && <div className="error">{errors.email.message}</div>}
        </div>

        <div className="form-field">
          <div className="form-password">
            <div className="form-password-input">
              <label htmlFor="password">Password:</label>
              <input {...register('password')} type="password" id="password" />
            </div>
            <Password password={watch('password')} />
          </div>
          {errors.password && (
            <div className="error">{errors.password.message}</div>
          )}
        </div>

        <div className="form-field">
          <div className="form-input">
            <label htmlFor="passwordRepeat">Repeat password:</label>
            <input
              {...register('passwordRepeat')}
              type="password"
              id="passwordRepeat"
            />
          </div>
          {errors.passwordRepeat && (
            <div className="error">{errors.passwordRepeat.message}</div>
          )}
        </div>

        <div className="form-field">
          <div className="form-input">
            <legend>Gender:</legend>
            <div>
              <label htmlFor="male">male</label>
              <input
                {...register('gender')}
                value="male"
                id="male"
                type="radio"
              />
              <label htmlFor="female">female</label>
              <input
                {...register('gender')}
                value="female"
                id="female"
                type="radio"
              />
            </div>
          </div>
          {errors.gender && (
            <div className="error">{errors.gender.message}</div>
          )}
        </div>

        <div className="form-field">
          <div className="form-input">
            <label htmlFor="terms">
              Accept Terms and Conditions agreement:
            </label>
            <input {...register('terms')} type="checkbox" id="terms" />
          </div>
          {errors.terms && <div className="error">{errors.terms.message}</div>}
        </div>

        <div className="form-field">
          <div className="form-input">
            <label htmlFor="photo">Upload photo:</label>
            <input {...register('photo')} type="file" id="photo" />
          </div>
          {errors.photo && <div className="error">{errors.photo.message}</div>}
        </div>

        <div className="form-field">
          <div className="form-input">
            <label htmlFor="country">Country:</label>
            <input
              autoComplete="off"
              type="text"
              id="country"
              {...register('country')}
              list="countryData"
            />
          </div>
          <datalist id="countryData">
            {countries.map((country, i) => (
              <option className="dropdown-item" key={i}>
                {country}
              </option>
            ))}
          </datalist>
          {errors.country && (
            <div className="error">{errors.country.message}</div>
          )}
        </div>

        <input type="submit" value="Submit" disabled={!isValid}></input>
      </form>
    </>
  );
};
