import editBtn from '../images/edit_button.svg';
import addBtn from '../images/add_button.svg';
import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = (props) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      { currentUser && <section className="profile">
        <div className="profile__info">
          <div style={{ backgroundImage: `url(${currentUser.avatar})`}} className="profile__avatar" onClick={props.onEditAvatar}>
            <img alt="аватар" className="profile__avatar-edit"/>
          </div>
          <div className="profile__text">
            <div className="profile__row">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button type="button" className="profile__edit-button" onClick={props.onEditProfile}><img className="profile__edit-button-img" src={editBtn} alt="кнопка редактировать"/></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}>
          <img className="profile__add-button-img" src={addBtn} alt="кнопка добавить"/>
        </button>
      </section>}
      <section className="elements">
        {props.cards.map((item) => {
          return (
            <Card
              card={item}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              key={item._id}
            />
          )
        })}
      </section>
    </main>
  );
}

export default Main;