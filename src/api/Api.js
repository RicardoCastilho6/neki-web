import axios from 'axios';

export const api =  axios.create({
    baseURL: 'http://localhost:8080/api',
});

export function login (login,senha){
    return api.post('/auth/login',{login, senha})
    
}

export function cadastrar(login,senha){
    return api.post('/auth/cadastrar',{login,senha})
}

export function listar(id){
    return api.get(`/usuarioskills/${id}`);
}

export function associar(usuarioId, skillId, level) {   
    const data = {
      usuarioId: usuarioId,
      skillId: skillId,
      level: level,
    };
 return api.post('/usuarioskills/associar', data);
  }

export function deletarAssocia(id){
    return api.delete(`/usuarioskills/excluir/${id}`)
}

export function atualiza(id, novoLevel){
    return api.put(`/usuarioskills/atualizar/${id}`, novoLevel)
};

export function listarTodasSkills(){
    return api.get('/skills/listar')
}