import closeIcon from '../images/close_icon.svg';

const PopupWithForm = (props) => {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={props.onClose}>
          <img src={closeIcon} alt="кнопка закрыть" className="popup__close-img"/>
        </button>
        <h2 className="popup__form-title">{props.title}</h2>
        <form onSubmit={props.onSubmit} className="popup__form" name={`${props.name}Form`} noValidate>
          {props.children}
          <button type="submit" className="popup__button">{props.button}</button>  
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;