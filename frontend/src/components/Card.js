import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

const Card = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${ isLiked ? 'element_liked' : ''}`; 

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }


  return (
    <div className="element">
      {isOwn && <button type="button" className="element__trash-button" onClick={handleDeleteClick}></button>}
      <img src={props.card.link} alt='карточка' className="element__image" onClick={handleClick}/>
      <div className="element__wrapper">
      <h2 className="element__title">{props.card.name}</h2>
        <div>
          <button type="button" className={cardLikeButtonClassName}onClick={handleLikeClick}></button>
          <p className="element__likes">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;