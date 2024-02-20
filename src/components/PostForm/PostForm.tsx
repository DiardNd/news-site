import { ChangeEvent, FormEvent, useState } from 'react';

import { useAppDispatch } from '../../hooks';
import { createPost } from '../../store/modules/post/thunk';
import defaultImage from '../../shared/assets/Default-image.png';

import styles from './PostForm.module.scss';

export const PostForm = () => {
  const [postPicture, setPostPicture] = useState(defaultImage);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tag, setTag] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const reduxDispatch = useAppDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name === 'title') setTitle(value);
    if (name === 'text') setText(value);
    if (name === 'tags') setTag(value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPostPicture(imageUrl);
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('title', title);
    formData.append('text', text);
    formData.append('tags[]', tag);

    if (file) formData.append('file', file);

    await reduxDispatch(createPost(formData));

    setTitle('');
    setText('');
    setTag('');
    setFile(null);
    setPostPicture(defaultImage);
  };

  return (
    <>
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
        <input
          value={tag}
          onChange={handleInputChange}
          type='text'
          name='tags'
          placeholder='Tags separated by commas..'
        />
        <button
          type='submit'
          className={styles.button}>
				Post
        </button>
      </form>
    </>
  );
};
