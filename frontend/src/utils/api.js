class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _makeRequest(endPoint, method='GET', body) {
    return fetch(this._baseUrl + endPoint, {
      method,
      headers: this._headers,
      body
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        
        // если ошибка, отклоняем промис
        console.log(res.err);
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getProfile() {
    return this._makeRequest('/users/me');
  }

  getInitialCards() {
    return this._makeRequest('/cards');
  }

  // PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me
  editProfile({name, about}) {
    return this._makeRequest(
      '/users/me',
      'PATCH',
      JSON.stringify({
        name,
        about
      })
    )
  }
 
  // POST https://mesto.nomoreparties.co/v1/cohortId/cards
  createCard(card) {
    return this._makeRequest(
      '/cards',
      'POST',
      JSON.stringify(card))
  }

  // DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId
  deleteCard(cardId) {
    return this._makeRequest('/cards/' + cardId, 'DELETE')
  }

  // DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/likes/cardId 
  // PUT https://mesto.nomoreparties.co/v1/cohortId/cards/likes/cardId 
  like(cardId, isLiked) {
    return this._makeRequest('/cards/likes/' + cardId, isLiked ? 'DELETE' : 'PUT');
  }

  // PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar 
  updateAvatar(avatar) {
    return this._makeRequest('/users/me/avatar', 'PATCH', JSON.stringify(avatar));
  }

  sigup({email, password}) {
    return this._makeRequest('/signup', 'POST', JSON.stringify({email, password}));
  }

  login({email, password}) {
    return this._makeRequest('/signin', 'POST', JSON.stringify({email, password}));
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: 'd0e1e3a1-2328-401d-87db-610b930721e8',
    'Content-Type': 'application/json'
  }
});

export default api;