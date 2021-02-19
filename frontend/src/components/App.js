import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import authApi from '../utils/authApi';
import { useLocation, useHistory, withRouter } from 'react-router-dom'

function App() {
  const location = useLocation();
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] =  useState(false);
  const [infoTip, setInfoTip] = useState({show: false});
  
  const signin = { route: '/signup', name: "Регистрация" };
  const signup = { route: '/signin', name: "Войти" };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.setToken(token);
      api.getInitialCards()
      .then(res => {
        setCards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }  
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authApi.checkToken(token)
      .then(res => {
        setCurrentUser(res.data);
        setLoggedIn(true);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }, [loggedIn]);

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.like(card._id, isLiked)
      .then(res => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => c._id === card._id ? res.data : c);
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });;
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(item => item._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleUpdateUser = (user) => {
    api.editProfile(user)
      .then(res => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleAddPlaceSubmit = (card) => {
    api.createCard(card)
      .then(res => {
        setCards([res.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleUpdateAvatar = (avatar) => {
    api.updateAvatar(avatar)
      .then(res => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleLogin = (data) => {
    authApi.login(data)
      .then(res => {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        history.push('/');
        return true;
      })
      .then(res => {
        return authApi.checkToken(localStorage.getItem('token'));
      })
      .then(res => setCurrentUser(res.data))
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSignup = (data) => {
    authApi.signup(data)
      .then(res => {
        setInfoTip({
          success: true,
          show: true
        });
      })
      .catch(err => {
        setInfoTip({
          success: false,
          show: true
        });
        console.log(err);
      });
  }

  const handleSignout = () => {
    localStorage.removeItem('token');
    setCurrentUser({});
    setLoggedIn(false);
    history.push('/signin');
  }

  const handleCloseInfoTip = () => {
    setInfoTip({
      ...infoTip,
      show: false
    });
    if (infoTip.success) {
      history.push('/signin');
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {currentUser && < Header link={ location.pathname === '/signin' ?  signin : signup} handleSignout={handleSignout}/>}
        <Switch>
          <Route path="/signup">
            {!loggedIn ? <Register handleSignup={handleSignup} /> : <Redirect to="/" />}
          </Route>
          <Route path="/signin">
            {!loggedIn ? <Login handleLogin={handleLogin} /> : <Redirect to="/" />}
          </Route>
          {<ProtectedRoute 
            component={Main}
            path="/"
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}  
          />}
        </Switch>
        {loggedIn && <Footer/>}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 
        <PopupWithForm
          title='Вы уверены ?'
          name='submit'
          button='Да'
        >
        </PopupWithForm>
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        {<InfoToolTip infoTip={infoTip} onClose={handleCloseInfoTip}/>}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
