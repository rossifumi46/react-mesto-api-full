import PopupWithForm from './PopupWithForm';
import { useRef } from 'react';

const AddPlacePopup = (props) => {
  const nameRef = useRef();
  const linkRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value
    });
  }

  return (
    <PopupWithForm
      title='Новое место'
      name='create'
      button='Создать'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input ref={nameRef} id="title-input" type="text" required className="popup__input" placeholder="Название" name="name" minLength="2" maxLength="40"/>
      <span className='popup__error' id='title-input-error'></span>
      <input ref={linkRef} id="link-input" type="url" required className="popup__input" placeholder="Ссылка на картинку" name="img-link"/>
      <span className='popup__error' id='link-input-error'></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;