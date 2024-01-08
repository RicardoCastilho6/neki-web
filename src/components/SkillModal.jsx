import React, { useState, useEffect } from 'react';
import { listarTodasSkills } from '../api/Api';
import { MdDataSaverOn } from "react-icons/md";

const Modal = ({ onClose, onAssociar }) => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    carregarSkills();
  }, []);

  const carregarSkills = async () => {
    try {
      const response = await listarTodasSkills();
      setSkills(response.data);
    } catch (error) {
      console.error('Erro ao carregar as skills', error);
    }
  };

  const handleAssociar = (skillId) => {
   
    onAssociar(skillId);
    onClose(); 
  };

  return (
    <div className="modal-skill">
      <h2>Selecione uma Skill</h2>
      <ul>
        {skills.map((skill) => (
          <div style={{flexDirection:'row', justifyContent:'space-between', display:'flex'}}>
            <p style={{fontSize: 20}}>{skill.nome}</p>
            <li key={skill.id} onClick={() => handleAssociar(skill.id)} className="skill-item-modal" >
            <MdDataSaverOn style={{fontSize:23}}/>
           </li>
          </div>
          
          
        ))}
      </ul>
      <button onClick={onClose}>Fechar</button>
    </div>
  );
};

export default Modal;