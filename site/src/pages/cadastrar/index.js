import Menu from '../../components/menu'
import Cabecalho from '../../components/cabecalho'
import { useState } from 'react'
import './index.scss'
import storage from 'local-storage'
import { cadastrarFilme, enviarImagemFilme } from '../../api/filmeApi'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index() {
    const [nome, setNome] = useState('')
    const [avaliacao, setAvaliacao] = useState('')
    const [lancamento, setLancamento] = useState(0)
    const [disponivel, setDisponivel] = useState(false)
    const [sinopse, setSinopse] = useState('')

    async function salvarClick() {
        try {
            const usuario = storage('usuario-logado').id;
            const r = await cadastrarFilme(nome, avaliacao, lancamento, disponivel, sinopse, usuario);

            toast('Filme cadastrado com sucesso');
        } catch (err) {
            toast.error(err.response.data.erro);
        }

    }

    return ( <
        main className = 'page page-cadastrar' >
        <
        Menu selecionado = 'cadastrar' / >
        <
        div className = 'container' >
        <
        Cabecalho / >

        <
        div className = 'conteudo' >
        <
        section >
        <
        h1 className = 'titulo' >
        <
        span > < /span>Cadastrar Novo Filme  <
        /h1> <
        div className = 'form-colums' >
        <
        div >
        <
        div className = 'upload-capa' >
        <
        img src = "/assets/images/icon-upload.svg"
        alt = "" / >
        <
        /div> <
        /div> <
        div >
        <
        div className = 'form-row' >
        <
        label > Nome: < /label> <
        input type = 'text'
        placeholder = 'Nome do filme'
        value = { nome }
        onChange = { e => setNome(e.target.value) }
        /> <
        /div> <
        div className = 'form-row' >
        <
        label > Avaliação: < /label> <
        input type = 'number'
        placeholder = '0'
        value = { avaliacao }
        onChange = { e => setAvaliacao(e.target.value) }
        /> <
        /div> <
        div className = 'form-row' >
        <
        label > Lançamento: < /label> <
        input type = 'date'
        value = { lancamento }
        onChange = { e => setLancamento(e.target.value) }
        /> <
        /div> <
        br / >
        <
        div className = 'form-row' >
        <
        label > < /label> <
        input type = 'checkbox'
        checked = { disponivel }
        onChange = { e => setDisponivel(e.target.checked) }
        /> &nbsp; Disponível <
        /div> <
        /div> <
        div >
        <
        div className = 'form-row'
        style = {
            { alignItems: 'flex-start' } } >
        <
        label style = {
            { marginTop: '13px' } } > Sinopse: < /label> <
        textarea placeholder = 'Sinopse do filme'
        value = { sinopse }
        onChange = { e => setSinopse(e.target.value) }
        /> <
        /div> <
        br / >
        <
        br / >
        <
        div className = 'form-row' >
        <
        label > < /label> <
        div className = 'btnSalvar' >
        <
        button onClick = { salvarClick } > SALVAR < /button>     <
        /div> <
        /div> <
        /div> <
        /div> <
        /section> <
        /div> <
        /div> <
        /main>
    )
}