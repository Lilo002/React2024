import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { convertTo64, formDataToUser } from '../../utils/convert/convert';
import { useAppSelector } from '../../utils/store/hooks';
import { Password } from '../../components/password/password';
import { addUser } from '../../utils/store/users/usersSlice';
import { schema } from '../../utils/validation/validation';
import * as Yup from 'yup';
import { Errors, User, UserOnStore } from '../../types';

export const UncontrolledForm: React.FC = () => {
  const ref = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useAppSelector(state => state.country);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errors, setErrors] = useState<Errors>({});
  const [dropdown, setDropdown] = useState<string[]>([]);
  const [password, setPassword] = useState('');

  const submitFrom = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (ref.current) {
      const data: User = await formDataToUser(ref.current.elements);
      try {
        await schema.validate(data, { abortEarly: false });
        const convertPhoto = data.photo ? await convertTo64(data.photo[0]) : '';
        const convertData: UserOnStore = { ...data, photo: convertPhoto };
        setErrors({});
        dispatch(addUser(convertData));
        navigate('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validationErrors: { [key: string]: string } = {};
          err.inner.forEach(error => {
            if (error.path) {
              validationErrors[error.path] = error.message;
            }
          });
          setErrors(validationErrors);
        }
      }
    }
  };

  const handleCountryClick = (country: string) => {
    if (ref.current && ref.current.elements) {
      const countryElement = ref.current.elements.namedItem(
        'country'
      ) as HTMLInputElement;
      if (countryElement) {
        countryElement.value = country;
      }
    }
    setDropdown([]);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setDropdown([]);
      return;
    }
    setDropdown(
      countries.filter(
        country =>
          country.toLowerCase().startsWith(e.target.value.toLowerCase()) &&
          country.toLowerCase() !== e.target.value.toLowerCase()
      )
    );
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <h1>Uncontrolled form</h1>
      <form
        className="form"
        ref={ref}
        onSubmit={submitFrom}
        onChange={() => setIsValid(true)}
      >
        <div className="form-field">
          <div className="form-input">
            <label htmlFor="name">Name:</label>
            <input name="name" id="name" />
          </div>
          {errors?.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="form-field">
          <div className="form-input">
            <label htmlFor="age">Age:</label>
            <input name="age" type="number" id="age" />
          </div>
          {errors?.age && <div className="error">{errors.age}</div>}
        </div>

        <div className="form-field">
          <div className="form-input">
            <label htmlFor="email">Email:</label>
            <input name="email" id="email" />
          </div>
          {errors?.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="form-field">
          <div className="form-password">
            <div className="form-password-input">
              <label htmlFor="password">Password:</label>
              <input
                name="password"
                type="password"
                id="password"
                onChange={handlePasswordChange}
              />
            </div>
            <Password password={password} />
          </div>
          {errors?.password && <div className="error">{errors.password}</div>}
        </div>

        <div className="form-field">
          <div className="form-input">
            <label htmlFor="passwordRepeat">Repeat password:</label>
            <input name="passwordRepeat" type="password" id="passwordRepeat" />
          </div>
          {errors?.passwordRepeat && (
            <div className="error">{errors.passwordRepeat}</div>
          )}
        </div>

        <div className="form-field">
          <div className="form-input">
            <legend>Gender:</legend>
            <div>
              <label htmlFor="male">male</label>
              <input name="gender" value="male" id="male" type="radio" />
              <label htmlFor="female">female</label>
              <input name="gender" value="female" id="female" type="radio" />
            </div>
          </div>
          {errors?.gender && <div className="error">{errors.gender}</div>}
        </div>

        <div className="form-field">
          <div className="form-input">
            <label htmlFor="terms">
              Accept Terms and Conditions agreement:
            </label>
            <input name="terms" type="checkbox" id="terms" />
          </div>
          {errors?.terms && <div className="error">{errors.terms}</div>}
        </div>

        <div className="form-field">
          <div className="form-input">
            <label htmlFor="photo">Upload photo:</label>
            <input name="photo" type="file" id="photo" />
          </div>
          {errors?.photo && <div className="error">{errors.photo}</div>}
        </div>

        <div className="form-field">
          <div className="form-input">
            <label htmlFor="country">Country:</label>
            <input
              autoComplete="off"
              type="text"
              id="country"
              name="country"
              onChange={handleCountryChange}
            />
          </div>
          <div className="form-dropdown">
            {dropdown &&
              dropdown.map((country, i) => (
                <div
                  className="dropdown-item"
                  key={i}
                  onClick={() => handleCountryClick(country)}
                >
                  {country}
                </div>
              ))}
          </div>
          {errors?.country && <div className="error">{errors.country}</div>}
        </div>

        <input type="submit" value="Submit" disabled={!isValid}></input>
      </form>
    </>
  );
};
