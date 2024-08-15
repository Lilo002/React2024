import { User } from '../../types';

export const convertTo64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        const arrayBuffer = e.target.result as ArrayBuffer;
        const base64 = btoa(
          new Uint8Array(arrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        resolve(base64);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.readAsArrayBuffer(file);
  });
};

export const formDataToUser = async (
  elements: HTMLFormControlsCollection
): Promise<User> => {
  const user: User = {
    name: '',
    age: 0,
    email: '',
    password: '',
    passwordRepeat: '',
    gender: null,
    terms: false,
    photo: undefined,
    country: '',
  };

  for (const key in user) {
    const element = elements.namedItem(key) as
      | HTMLInputElement
      | HTMLSelectElement
      | RadioNodeList;
    if (element) {
      switch (key) {
        case 'name':
          user.name = element.value;
          break;
        case 'age':
          user.age = parseInt(element.value, 10) || 0;
          break;
        case 'email':
          user.email = element.value;
          break;
        case 'password':
          user.password = element.value;
          break;
        case 'passwordRepeat':
          user.passwordRepeat = element.value;
          break;
        case 'gender':
          user.gender = element.value as 'male' | 'female';
          break;
        case 'terms':
          user.terms = (element as HTMLInputElement).checked;
          break;
        case 'photo':
          if (element instanceof HTMLInputElement && element.type === 'file') {
            if (element.files && element.files.length > 0) {
              user.photo = element.files;
            }
          }
          break;
        case 'country':
          user.country = element.value;
          break;
      }
    }
  }
  return user;
};
