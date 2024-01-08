import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/login.css';

const Cadastro = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erroCadastro, setErroCadastro] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [cadastroSucesso, setCadastroSucesso] = useState(false);

  const handleCadastro = async () => {
    try {
      if (senha !== confirmarSenha) {
        setErroCadastro('As senhas não coincidem.');
        return;
      }
      const response = await axios.post('http://localhost:8080/api/auth/cadastrar', { login, senha }, { withCredentials: true });
      console.log('Cadastro bem-sucedido:', response.data);
      setCadastroSucesso(true);
      setLogin('');
      setSenha('');
      setConfirmarSenha('');
      setErroCadastro('')
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setErroCadastro('Erro ao cadastrar.');
    }
  };
  const handleMostrarSenhaChange = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <div className='backgroundPage'>
      <div className='login-container'>
        <h1>Cadastro</h1>
        <label>Login:</label>
        <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
        <br />
        <label>Senha:</label>
        <input type={mostrarSenha ? "text" : "password"} value={senha} onChange={(e) => setSenha(e.target.value)} />
        <br />
        <label>Confirmar Senha:</label>
        <input type={mostrarSenha ? "text" : "password"} value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
        <br />
        {erroCadastro && <p style={{ color: 'red' }}>{erroCadastro}</p>}
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
        <br />
        <button className='buttonCadastro' onClick={handleCadastro}>Cadastrar</button>
        <br />
        <Link to="/">Fazer Login</Link>
        
         {cadastroSucesso && (
          <div className='modal'>
            <p>Cadastro bem-sucedido!</p>
            <button className='buttonCadastro' onClick={() => setCadastroSucesso(false) }>Fechar</button>
          </div>
         )}
      </div>
    </div>
  );
};

export default Cadastro;