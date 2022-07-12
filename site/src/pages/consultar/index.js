import Menu from '../../components/menu'
import Cabecalho from '../../components/cabecalho'
import { listarTodosFilmes, buscarFilmesPorNome } from '../../api/filmeApi'
import './index.scss'
import { useState, useEffect } from 'react'

export default function Index() {
    const [filmes, setFilmes] = useState([]);
    const [filtro, setFiltro] = useState('');

    async function filtrar() {
        const resp = await buscarFilmesPorNome(filtro);
        setFilmes(resp);
    }
    async function carregarTodosFilmes() {
        const resp = await listarTodosFilmes();
        setFilmes(resp);
    }

    useEffect(() => {
        carregarTodosFilmes();
    }, [])

    return ( <
        main className = 'page page-consultar' >
        <
        Menu selecionado = 'consultar' / >
        <
        div className = 'container' >
        <
        Cabecalho / >

        <
        div className = 'conteudo' >

        <
        div className = 'caixa-busca' >
        <
        input type = "text"
        placeholder = 'Buscar filmes por nome'
        value = { filtro }
        onChange = { e => setFiltro(e.target.value) }
        /> <
        img src = '/assets/images/icon-buscar.svg'
        alt = 'buscar'
        onClick = { filtrar }
        /> < /
        div >

        <
        table >
        <
        thead >
        <
        tr >
        <
        th > IDENTIFICAÇÃO < /th> <
        th > FILME < /th> <
        th > AVALIAÇÃO < /th> <
        th > LANÇAMENTO < /th> <
        th > DISPONÍVEL < /th> <
        th > < /th> < /
        tr > <
        /thead> <
        tbody > {
            filmes.map(item =>
                <
                tr >
                <
                td > #{ item.id } < /td> <
                td > { item.nome } < /td> <
                td > { item.avaliacao } < /td> <
                td > { item.lancamento.substr(0, 10) } < /td> <
                td > { item.disponivel ? 'sim' : 'não' } < /td> <
                td >
                <
                img src = '/assets/images/icon-editar.svg'
                alt = 'editar' / > & nbsp; & nbsp; & nbsp; & nbsp; & nbsp; <
                img src = '/assets/images/icon-remover.svg'
                alt = 'remover' / >
                <
                /td> < /
                tr >
            )
        } <
        /tbody> < /
        table >

        <
        /div> < /
        div > <
        /main>
    )
}