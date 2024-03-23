import { FormEvent } from 'react';

import { ModalType, toggleSetModal } from '../../store/modules/modal/modalSlice';
import { deletePostById } from '../../store/modules/post';
import { useAppDispatch, useAppSelector } from '../../hooks';

export const DeletePost = () => {
  const reduxDispatch = useAppDispatch();

  const selectedPost = useAppSelector((state) => state.post.selectedPost);

  const handleDelete = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await reduxDispatch(deletePostById(selectedPost.id));
  };

  const handleCancel = () => {
    reduxDispatch(toggleSetModal({ isOpen: false, modalType: ModalType.SIGN_IN }));
  };

  if (!selectedPost) return null;

  return (
    <form>
      <h3>Do u really want delete this post?</h3>
      <button onClick={handleDelete}>Yes</button>
      <button onClick={handleCancel}>NO!</button>
    </form>
  );
};
