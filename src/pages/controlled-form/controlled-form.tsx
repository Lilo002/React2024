export const ControlledForm: React.FC = () => {
  return (
    <form>
      <div>
        <label htmlFor="name">Name:</label>
        <input name="name" id="name" />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input name="age" id="age" />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input name="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input name="password" id="password" />
      </div>
      <div>
        <label htmlFor="passwordRepeat">Repeat password:</label>
        <input name="passwordRepeat" id="passwordRepeat" />
      </div>
      <div>
        <fieldset>
          <legend>Gender:</legend>
          <label htmlFor="male">male</label>
          <input name="gender" id="male" type="radio" />
          <label htmlFor="female">female</label>
          <input name="gender" id="female" type="radio" />
        </fieldset>
      </div>
      <div>
        <label htmlFor="terms">Accept Terms and Conditions agreement:</label>
        <input name="terms" type="checkbox" id="terms" />
      </div>
      <div>
        <label htmlFor="photo">Upload photo:</label>
        <input name="photo" type="file" id="photo" />
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <select id="country" name="country">
          <option value="BY">BY</option>
          <option value="RU">RU</option>
          <option value="PL">PL</option>
        </select>
      </div>
      <input type="submit" value="Submit"></input>
    </form>
  );
};
