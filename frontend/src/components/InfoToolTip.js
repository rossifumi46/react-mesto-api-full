import closeIcon from '../images/close_icon.svg';
import successImg from '../images/success.svg';
import errorImg from '../images/error.svg';

const InfoToolTip = ({infoTip, onClose}) => {

  return (
    <section className={`popup ${ infoTip.show ? 'popup_is-opened' : ''}`}>
      <div className="popup__container tip">
        <button type="button" className="popup__close" onClick={onClose}>
          <img src={closeIcon} alt="кнопка закрыть" className="popup__close-img" onClick={onClose}/>
        </button>
        <img className="tip__img" src={infoTip.success ? successImg : errorImg} alt=""/>
        <h3 className="tip__title">{infoTip.success ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
      </div>
    </section>
  );
};

export default InfoToolTip;
