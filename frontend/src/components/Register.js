import { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

const Register = (props) => {
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
    props.handleSignup(data)
  }

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1 className="auth__title">Регистрация</h1>
        <div className="auth__inputs">
          <input className="auth__input" type="email" name="email" placeholder="Email" onChange={handleChange}/>
          <input className="auth__input" type="password" name="password" placeholder="Пароль" onChange={handleChange}/>
        </div>
        <button className="auth__submit">Зарегистрироваться</button>
      </form>
      <p className="auth__tip">Уже зарегестрированы ? <Link className="auth__link" to="/signin">Войти</Link></p>
    </div>
  );
}

export default withRouter(Register); 
