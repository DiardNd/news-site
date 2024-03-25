import { useDispatch, useSelector } from 'react-redux';

import { DeletePost } from '../../components/DeletePost';
import { EditPostForm } from '../../components/EditPostForm';
import { RootState } from '../../store';
import { ModalType, toggleSetModal } from '../../store/modules/modal/modalSlice';
import { Auth } from '../Auth';
import { UserForm } from '../UserForm';

import styles from './ModalWindow.module.scss';

export const ModalWindow = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const modalType = useSelector((state: RootState) => state.modal.modalType);

  const handleCloseModal = () => {
    dispatch(toggleSetModal({ isOpen: false, modalType: ModalType.SIGN_IN }));
  };

  const isModalSign = modalType.includes(ModalType.SIGN_IN);
  const isModalUserForm = modalType.includes(ModalType.EDIT_USER);
  const isModalConfirmDelete = modalType.includes(ModalType.DELETE_POST);
  const isModalPostForm = modalType.includes(ModalType.EDIT_POST);

  return (
    isOpen && (
      <div className={styles.modalOverlay} onClick={handleCloseModal}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          {isModalSign && <Auth />}
          {isModalUserForm && <UserForm />}
          {isModalConfirmDelete && <DeletePost />}
          {isModalPostForm && <EditPostForm />}
        </div>
      </div>
    )
  );
};
