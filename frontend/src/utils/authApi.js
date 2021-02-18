class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _makeRequest(endPoint, method='GET', headers=this._headers, body) {
    return fetch(this._baseUrl + endPoint, {
      method,
      headers: headers,
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

  signup({email, password}) {
    return this._makeRequest('/signup', 'POST', this._headers, JSON.stringify({email, password}));
  }

  login({email, password}) {
    return this._makeRequest('/signin', 'POST', this._headers, JSON.stringify({email, password}));
  }

  checkToken(token) {
    const headers = {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    };
    return this._makeRequest('/users/me', 'GET', headers);
  }
}

const authApi = new Api({
  baseUrl: 'https://auth.nomoreparties.co',//'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default authApi;