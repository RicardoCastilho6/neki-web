import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { listar, deletarAssocia, atualiza,associar } from '../api/Api';
import Modal from '../components/SkillModal';
import '../css/home.css'

const Home = () => {
  const [usuarioSkills, setUsuarioSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
   
    const isAutorizado = localStorage.getItem('Autorizado') === 'true';

    if (!isAutorizado) {
      navigate('/');
    } else {
      carregarUsuarioSkills();
    }
  }, [navigate]);

  const carregarUsuarioSkills = async () => {
    try {
      const response = await listar(localStorage.getItem("Id"));
      setUsuarioSkills(response.data);
    } catch (error) {
      console.error('Erro ao carregar as skills do usuário', error);
    }
  };

  const handleExcluirSkill = async (usuarioSkillId) => {
    try {
      await deletarAssocia(usuarioSkillId);
      carregarUsuarioSkills();
    } catch (error) {
      console.error('Erro ao excluir a skill do usuário', error);
    }
  };

  const handleAtualizarLevel = async (usuarioSkillId, novoLevel) => {
    try {
      const skillAtual = usuarioSkills.find((skill) => skill.id === usuarioSkillId);
      
      if (skillAtual) {
        const novaSkill = { ...skillAtual, level: novoLevel };
  
        await atualiza(usuarioSkillId, novaSkill);
        
        carregarUsuarioSkills(localStorage.getItem("Id"));
      } else {
        console.error('Skill não encontrada para atualização');
      }
    } catch (error) {
      console.error('Erro ao atualizar o level da skill do usuário', error);
    }
  };

  const handleInputChange = (event, usuarioSkillId) => {
    const novoLevel = event.target.value;
    setUsuarioSkills((prevSkills) =>
      prevSkills.map((usuarioSkill) =>
        usuarioSkill.id === usuarioSkillId ? { ...usuarioSkill, novoLevel } : usuarioSkill
      )
    );
  };

  const handleSalvarLevel = async (usuarioSkillId) => {
    const usuarioSkill = usuarioSkills.find((skill) => skill.id === usuarioSkillId);
    if (usuarioSkill) {
      await handleAtualizarLevel(usuarioSkillId, usuarioSkill.novoLevel);
    }
  };

  const handleAssociarSkill = async (skillId) => {
    try {
      
      await associar( localStorage.getItem('Id'), skillId, 1 );
      
      carregarUsuarioSkills();
    
    } catch (error) {
      console.error('Erro ao associar a skill ao usuário', error);
     
    }
  };

  const handleAbrirModal = () => {
    setIsModalOpen(true);
  };

  const handleFecharModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {

    localStorage.clear();

    navigate('/');
  };

  return (
    <div className="home-container">
       <h1>SKILLS</h1>
      
      <div>
      <ul >
        {usuarioSkills.map((usuarioSkill) => (
         <li key={usuarioSkill.id} className="skill-item">
         
         <img src={usuarioSkill.skill.imgUrl} style={{width:230, height:150,padding: 5}} />
         <div>
           <p>Nome: {usuarioSkill.skill.nome}</p>
           <p>
             Level:
             <input
               type="text"
               value={usuarioSkill.novoLevel || ''}
               onChange={(event) => handleInputChange(event, usuarioSkill.id)}
               placeholder={usuarioSkill.level}
             />
           </p>
           <p>Descrição: {usuarioSkill.skill.descricao}</p>
         </div>
         <div style={{flexDirection:'column'}}>
           <button onClick={() => handleSalvarLevel(usuarioSkill.id)}>Salvar Level</button>
           <button onClick={() => handleExcluirSkill(usuarioSkill.id)}>Excluir</button>
         </div>
       </li>
        ))}
      </ul>     
      </div>
      <div className='titulo'>
     
      <button  onClick={handleAbrirModal} className="button-add-skill">
        Adicionar Skill
      </button>
      <button  className="logout-button" onClick={handleLogout} >Logout</button>
      </div>
      {isModalOpen && (
        <Modal onClose={handleFecharModal} onAssociar={handleAssociarSkill} />
      )}
    </div>
  );
};

export default Home;