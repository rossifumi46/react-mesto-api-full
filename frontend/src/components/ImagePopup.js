import closeIcon from '../images/close_icon.svg';

const ImagePopup = (props) => {

  return (
    <section className={`popup popup_type_image ${ props.card ? 'popup_is-opened' : ''}`}>
      <div className="popup__container popup__container_img">
        <button type="button" className="popup__close" onClick={props.onClose}>
          <img src={closeIcon} alt="кнопка закрыть" className="popup__close-img"/>
        </button>
        <img className="full-img" alt="картинка" style={{content: `url(${props.card ? props.card.link : ''})`}}/>
        <h3 className="img-title">{props.card && props.card.name}</h3>
      </div>
    </section>
  );
};

export default ImagePopup;


