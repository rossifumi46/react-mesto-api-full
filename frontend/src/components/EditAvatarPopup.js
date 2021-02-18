import PopupWithForm from './PopupWithForm';
import { useRef } from 'react';

const EditAvatarPopup = (props) => {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='avatar'
      button='Создать'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input ref={avatarRef} id="link_input" type="url" required className="popup__input" placeholder="Ссылка на картинку" name="img-link"/>
      <span className='popup__error' id='link_input-error'></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;