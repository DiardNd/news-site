import { useDispatch, useSelector } from 'react-redux';

import { Auth } from '../Auth';
import { RootState } from '../../store';
import { toggleSetModal } from '../../store/modules/modal/modalSlice';

import styles from './ModalWindow.module.scss';

export const ModalWindow = () => {
	const dispatch = useDispatch();
	const isOpen = useSelector((state: RootState) => state.modal.isOpen);

	const handleCloseModal = () => {
		dispatch(toggleSetModal({ isOpen: false }));
	};

	return (
		isOpen && (
			<div
				className={styles.modalOverlay}
				onClick={handleCloseModal}>
				<div
					className={styles.modalContent}
					onClick={e => e.stopPropagation()}>
					<Auth />
				</div>
			</div>
		)
	);
};