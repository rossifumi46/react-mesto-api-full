import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

const EditProfilePopup = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);
  
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit'
      button='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input id="name" value={name} onChange={handleNameChange} required type="text" className="popup__input popup__input_type_name" placeholder="Имя" name="name" minLength="2" maxLength="40"/>
      <span className='popup__error' id='name-error'></span>
      <input id="about" value={description} onChange={handleDescriptionChange} required type="text" className="popup__input popup__input_type_job" placeholder="Род деятельности" name="job" minLength="2" maxLength="200"/>
      <span className='popup__error' id='about-error'></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;