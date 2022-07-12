import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000'
})

export async function cadastrarFilme(nome, avaliacao, lancamento, disponivel, sinopse, usuario) {
    const resposta = await api.post('/filme', {
        nome: nome,
        sinopse: sinopse,
        avaliacao: avaliacao,
        disponivel: disponivel,
        lancamento: lancamento,
        usuario: usuario
    })
    return resposta.data;
}

export async function enviarImagemFilme(id, imagem) {
    const formData = new FormData();
    formData.append('capa', imagem);

    const resposta = await api.put(`/filme/${id}/capa`, formData, {
        headers: {
            "Content-Type": "multipart/form/data"
        },
    });
    return resposta.status;
}