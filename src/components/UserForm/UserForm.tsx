import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  useState
} from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { editUserById } from '../../store/modules/user/thunk';
import { checkIsPasswordValid, checkIsEmailValid, checkIsNameValid } from '../../utils';

import styles from './UserForm.module.scss';

export function UserForm() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.auth.authUser);

  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [lastName, setLastName] = useState(currentUser?.lastName || '');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState(currentUser!.email);
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('You must fill in your password');

  const isFormValid = !firstNameError && !lastNameError&& !emailError && !passwordError;

  const blurHandler = ({ target: { name } }: FocusEvent<HTMLInputElement>) => {
    if (name === 'email') setEmailDirty(true);
    if (name === 'password') setPasswordDirty(true);
  };

  const handleEmailChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setEmail(value);
    setEmailError(checkIsEmailValid(value) || '');
  };

  const handlePasswordChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setPassword(value);
    setPasswordError(checkIsPasswordValid(value) || '');
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'firstName') {
      setFirstName(value);
      setFirstNameError(checkIsNameValid(value) || '');
    } else if (name === 'lastName') {
      setLastName(value);
      setLastNameError(checkIsNameValid(value) || '');
    }
  }; 


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (currentUser !== null) {
      const formData = new FormData();

      formData.append('email', email);
      formData.append('password', password);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);

      if (file) formData.append('file', file);

      dispatch(
        editUserById({
          id: currentUser.id,
          payload: formData
        })
      );
    }
  };

  if (currentUser) {
    return (
      <form
        className={styles.form}
        onSubmit={handleSubmit}>
        <div className={styles.nameBlock}>
          <input
            className={styles.input}
            name="firstName"
            value={firstName}
            onChange={handleNameChange}
            placeholder="First Name"
          />
          <input
            className={styles.input}
            name="lastName"
            value={lastName}
            onChange={handleNameChange}
            placeholder="Last Name"
          />
        </div>
        <div className={styles.warningBlock}>
          {firstNameError && <div className={styles.warning}>{firstNameError}</div>}
          {lastNameError && !firstNameError && <div className={styles.warning}>{lastNameError}</div>}
        </div>
        <input
          className={styles.input}
          name="email"
          placeholder="Email"
          value={email}
          type="email"
          onBlur={blurHandler}
          onChange={handleEmailChange}
        />
        <div className={styles.warningBlock}>
          {emailDirty && emailError && <div className={styles.warning}>{emailError}</div>}
        </div>
        <input
          className={styles.input}
          name="password"
          value={password}
          type="password"
          onBlur={blurHandler}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        <div className={styles.warningBlock}>
          {passwordDirty && passwordError && <div className={styles.warning}>{passwordError}</div>}
        </div>
        <input
          className={styles.Input}
          type="file"
          name="file"
          accept="image/jpeg,image/png,image/gif"
          onChange={handleFileChange}
          required
        />
        <button
          className={styles.button}
          type="submit"
          disabled = {!isFormValid}>
          Submit
        </button>
      </form>
    );
  }
}
