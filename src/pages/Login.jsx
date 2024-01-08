import React, { useState, useEffect } from 'react';
import { login } from '../api/Api';
import { useNavigate } from 'react-router-dom';
import '../css/login.css'


const Login = () => {
  const [loginInput, setLoginInput] = useState('');
  const [senhaInput, setSenhaInput] = useState('');
  const [token, setToken] = useState('');
  const [autorizado,setAuorizado]= useState (true)
  const navi = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrarSenha, setLembrarSenha] = useState(false);
  const [erroLogin, setErroLogin] = useState('');

  useEffect(() => {
    const senhaSalva = localStorage.getItem('senhaSalva');
    if (senhaSalva) {
      setSenhaInput(senhaSalva);
      setLembrarSenha(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      console.log('Iniciando login...');
      const response = await login(loginInput, senhaInput);
      console.log('Token obtido:', response.data.token);
      
      const userToken = response.data.token;
  
      setToken(userToken);
      console.log('Token definido no estado:', token);
      
      if (lembrarSenha) {
        localStorage.setItem('senhaSalva', senhaInput);
      } else {
        localStorage.removeItem('senhaSalva');
      }
      localStorage.setItem('token', userToken);
      localStorage.setItem('Id', response.data.id)
      localStorage.setItem('Autorizado',autorizado)
      console.log('Token armazenado no localStorage');
      navi('/Home')
    } catch (error) {
      console.error('Erro no login:', error.response || error.message || error);
      setErroLogin('Login ou senha inválidos.');
    }
  };

  const handleMostrarSenhaChange = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const navigateCadastrado =() =>{
    navi('/Cadastro')
  };

  return (
    <div className='backgroundPage'>
      <div className='login-container'>
        <h1>Skills</h1>
        <label>LOGIN:</label>
        <input
          type="text"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
        />
        <label>SENHA:</label>
        <input
           type={mostrarSenha ? "text" : "password"}
          value={senhaInput}
          onChange={(e) => setSenhaInput(e.target.value)}
        />
        <div >
        {erroLogin && <p style={{ color: 'red' }}>{erroLogin}</p>}
        </div>
         
       <div className='mostraSenha'>
       <label htmlFor="mostrarSenhaCheckbox">Mostrar Senha</label>  
      <input
          style={{width: 15, height: 15, marginTop: '6px'}}
          type="checkbox"
          id="mostrarSenhaCheckbox"
          checked={mostrarSenha}
          onChange={handleMostrarSenhaChange}
          />
         
        </div>
        <div className='mostraSenha'>
        <label>Lembrar Senha</label>
        <input
          style={{width: 15, height: 15, marginTop: '6px'}}
          type="checkbox"
          checked={lembrarSenha}
          onChange={() => setLembrarSenha(!lembrarSenha)}
        />
        
      </div>
        <div className='button-container'>
          <button className='buttonLogin' onClick={handleLogin}>
            Logar
          </button>
          <button className='buttonLogin' onClick={navigateCadastrado}>
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;