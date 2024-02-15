import { useDispatch, useSelector } from 'react-redux';

import { Auth } from '../Auth';
import { UserForm } from '../UserForm';
import { RootState } from '../../store';
import { toggleSetModal } from '../../store/modules/modal/modalSlice';

import styles from './ModalWindow.module.scss';

export const ModalWindow = () => {
	const dispatch = useDispatch();
	const isOpen = useSelector((state: RootState) => state.modal.isOpen);
	const modalType = useSelector((state: RootState) => state.modal.modalType);

	const handleCloseModal = () => {
		dispatch(toggleSetModal({ isOpen: false, modalType: 'SIGN IN' }));
	};

	const isModalSign = modalType.includes('SIGN');
	const isModalUserForm = modalType.includes('EDIT');

	return (
		isOpen && (
			<div
				className={styles.modalOverlay}
				onClick={handleCloseModal}>
				<div
					className={styles.modalContent}
					onClick={e => e.stopPropagation()}>
					{isModalSign && <Auth />}
					{isModalUserForm && <UserForm />}
				</div>
			</div>
		)
	);
};
