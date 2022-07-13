import Menu from '../../components/menu'
import Cabecalho from '../../components/cabecalho'
import { useState, useEffect } from "react";
import { listarTodosFilmes, buscarFilmesPorNome, removerFilme } from "../../api/filmeApi";
import "./index.scss";
import {confirmAlert } from 'react-confirm-alert';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './index.scss'
import FilmeCard from '../../components/filmeCard'

export default function Index() {
    const [filmes, setFilmes] = useState([]);
    const [filtro, setFiltro] = useState("");
  
    const navigate = useNavigate();
  
    function abrirDetalhes(id){
      navigate(`/admin/detalhe/${id}`);
    }
  
    function editarFilme(id){
      navigate(`/admin/alterar/${id}`);
    }
  
    async function filtrar() {
      const resp = await buscarFilmesPorNome(filtro);
      setFilmes(resp);
    }
    async function carregarTodosFilmes() {
      const resp = await listarTodosFilmes();
      setFilmes(resp);
    }
  
  
    async function removerFilmeClick(id, nome){
  
      confirmAlert({
          title: 'Remover filme',
          message: `Deseja remover o filme ${nome}`,
          buttons: [
            {
              label: 'Sim',
              onClick: async () => {
                  const resposta = await removerFilme(id, nome);
                  if(filtro === '')
                      carregarTodosFilmes();
                  else 
                      filtrar();  
                  
                      toast('filme removido');
              }
            },
            {
              label: 'Não',
            }
          ]
        });
      
    }
  
    useEffect(() => {
      carregarTodosFilmes();
    }, []);
  

    return (
        <main className='page page-consultar'>
            <Menu />
            <div className='container'>
                <Cabecalho />
                
                <div className='conteudo'>

                    <div className='caixa-busca'>
                        <input type="text" placeholder='Buscar filmes por nome' />
                        <img src='/assets/images/icon-buscar.svg' alt='buscar' />
                    </div>
                    


                    <div className='card-container'>

                    {filmes.map(item =>
                        <FilmeCard 
                        item={item} 
                        abrirDetalhes={abrirDetalhes} 
                        editarFilme= {editarFilme} 
                        removerFilmeClick={removerFilmeClick}
                        />
                    )};                     
                    </div>
                </div>
            </div>
        </main>
    )
}

