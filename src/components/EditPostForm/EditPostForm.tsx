import { ChangeEvent, FormEvent, useState } from 'react';

import { getCurrentImage } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import defaultImage from '../../shared/assets/Default-image.png';
import { editPostById } from '../../store/modules/post/thunk';

import styles from './EditPostForm.module.scss';

export const EditPostForm = () => {
  const reduxDispatch = useAppDispatch();
  const selectedPost = useAppSelector(state => state.post.selectedPost);
  const [postPicture, setPostPicture] = useState(getCurrentImage(selectedPost!.coverPath, defaultImage));
  const [title, setTitle] = useState(selectedPost?.title || '');
  const [text, setText] = useState(selectedPost?.title || '');
  const [file, setFile] = useState<File | null>(null);

  if (!selectedPost) return;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('title', title);
    formData.append('text', text);

    if (file) formData.append('file', file);

    await reduxDispatch(editPostById({ id:selectedPost.id, payload: formData }));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name === 'title') setTitle(value);
    if (name === 'text') setText(value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPostPicture(imageUrl);
      setFile(selectedFile);
    }
  };

  if (!selectedPost) return null;

  return (
    <form className={styles.postForm} onSubmit={handleSubmit}>
      <input
        className={styles.postTitle}
        type='text'
        value={title}
        name='title'
        onChange={handleInputChange}
        placeholder='Place for header...'
      />
      <div className={styles.postPicture}>
        <img
          src={postPicture}
          alt='img'
        />
      </div>
      <input
        type='file'
        name='file'
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleFileChange}
      />
      <textarea
        className={styles.text}
        value={text}
        onChange={handleInputChange}
        name='text'
        placeholder='Place for text...'
      />
      <button
        type='submit'
        className={styles.button}>
            Post
      </button>
    </form>
  );
};
