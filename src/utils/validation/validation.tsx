import * as Yup from 'yup';
import { Countries, MAX_FILE_SIZE } from '../../constant/constant';

export const schema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter')
    .required('Field is required'),
  age: Yup.number()
    .typeError('Age must be a number')
    .positive('Must be a positive number')
    .required('Field is required')
    .integer('Age must be an integer'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Field is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
    )
    .required('Field is required'),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  gender: Yup.string()
    .oneOf(['male', 'female'], 'Field is required')
    .required('Field is required'),
  terms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required(),
  photo: Yup.mixed<FileList>()
    .required('Photo is required')
    .test('fileSize', 'File is too large', value => {
      if (!value) return false;
      return value[0]?.size <= MAX_FILE_SIZE;
    })
    .test('fileType', 'Unsupported file format', value => {
      if (!value) return false;
      return ['image/jpeg', 'image/png'].includes(value[0]?.type);
    })
    .required('Field is required'),
  country: Yup.string()
    .required('Country is required')
    .oneOf(Countries, 'Please select a valid country'),
});
