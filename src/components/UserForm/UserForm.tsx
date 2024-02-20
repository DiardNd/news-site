import {
  ChangeEvent,
  FormEvent,
  useReducer,
  FocusEvent
} from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { editUserById } from '../../store/modules/user/thunk';
import { checkIsPasswordValid, checkIsEmailValid, checkIsNameValid } from '../../utils';
import { postReducer } from '../../utils/useReducer';

import styles from './UserForm.module.scss';

export function UserForm() {
  const reduxDispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.auth.authUser);

   interface PostFormState {
    firstName: string;
    lastName: string;
    email: string;
    file: File | null;
    password: string;
    emailError: string;
    passwordError: string;
    firstNameError: string;
    lastNameError: string;
  }

   const initialState: PostFormState = {
     firstName: currentUser?.firstName || '',
     emailError: '',
     firstNameError: '',
     lastName: currentUser?.lastName || '',
     lastNameError: '',
     password: '',
     email: currentUser!.email,
     passwordError: '',
     file: null
   };

   const [state, dispatch] = useReducer(postReducer, initialState);

   const isFormValid = !state.firstNameError && !state.lastNameError&& !state.emailError && !state.passwordError;

   const handleChange = (field: string, value: string | boolean | File) => {
     dispatch({
       type: 'CHANGE',
       payload: {
         field,
         value
       }
     });
   };

   const blurHandler = ({ target: { name } }: FocusEvent<HTMLInputElement>) => {
     if (name === 'email' && !state.emailError && !state.email)
       handleChange('emailError', 'You must fill in your email');
     if (name === 'password' && !state.passwordError && !state.password)
       handleChange('passwordError', 'You must fill in your password');
     if ((name === 'firstName' || name === 'lastName') && !state[`${name}Error`] && !state[name])
       handleChange(`${name}Error`, 'You must fill in your name');
   };

   const handleEmailChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
     const emailError = checkIsEmailValid(value);
     handleChange('email', value);
     handleChange('emailError', emailError || '');
   };

   const handlePasswordChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
     const passwordError = checkIsPasswordValid(value);
     handleChange('password', value);
     handleChange('passwordError', passwordError || '');
   };

   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
     const selectedFile = event.target.files?.[0];

     if (selectedFile) {
       handleChange('file', selectedFile);
     }
   };

   const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
     const { name, value } = event.target;
     const nameError = checkIsNameValid(value);

     handleChange(name, value);
     handleChange(name + 'Error', nameError || '');
   };

   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
     event.preventDefault();

     if (currentUser !== null) {
       const formData = new FormData();

       formData.append('email', state.email);
       formData.append('password', state.password);
       formData.append('firstName', state.firstName);
       formData.append('lastName', state.lastName);

       if (state.file) formData.append('file', state.file);

       reduxDispatch(
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
             value={state.firstName}
             onBlur={blurHandler}
             onChange={handleNameChange}
             placeholder="First Name"
           />
           <input
             className={styles.input}
             name="lastName"
             value={state.lastName}
             onBlur={blurHandler}
             onChange={handleNameChange}
             placeholder="Last Name"
           />
         </div>
         <div className={styles.warningBlock}>
           {state.firstNameError && <div className={styles.warning}>{state.firstNameError}</div>}
           {state.lastNameError && !state.firstNameError && <div className={styles.warning}>{state.lastNameError}</div>}
         </div>
         <input
           className={styles.input}
           name="email"
           placeholder="Email"
           value={state.email}
           type="email"
           onBlur={blurHandler}
           onChange={handleEmailChange}
         />
         <div className={styles.warningBlock}>
           {state.emailError && <div className={styles.warning}>{state.emailError}</div>}
         </div>
         <input
           className={styles.input}
           name="password"
           value={state.password}
           type="password"
           onBlur={blurHandler}
           onChange={handlePasswordChange}
           placeholder="Password"
         />
         <div className={styles.warningBlock}>
           {state.passwordError && <div className={styles.warning}>{state.passwordError}</div>}
         </div>
         <input
           className={styles.fileInput}
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
