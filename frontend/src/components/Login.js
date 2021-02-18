import { useState } from 'react';
import  { withRouter } from 'react-router-dom';

const Login = (props) => {
  const [ data, setData ] = useState('');

  function handleChange(e) {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleLogin(data)
  }

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1 className="auth__title">Вход</h1>
        <div className="auth__inputs">
          <input className="auth__input" type="email" name="email" placeholder="Email" onChange={handleChange}/>
          <input className="auth__input" type="password" name="password" placeholder="Пароль" onChange={handleChange}/>
        </div>
        <button className="auth__submit">Войти</button>
      </form>
    </div>
  );
}

export default withRouter(Login); 
