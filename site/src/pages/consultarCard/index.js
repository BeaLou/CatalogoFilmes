import Menu from '../../components/menu'
import Cabecalho from '../../components/cabecalho'
import { useState, useEffect } from "react";
import { listarTodosFilmes, buscarFilmesPorNome, removerFilme } from "../../api/filmeApi";
import "./index.scss";
import {confirmAlert } from 'react-confirm-alert';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './index.scss'


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
                        <div className='comp-card'>
                        <div className='card' key={item.id} onClick={() => abrirDetalhes(item.id)}>
                            <div className='acoes'>
                                <img src='/assets/images/icon-editar.svg' alt='editar' onClick={e =>{ 
                      e.stopPropagation();
                      editarFilme(item.id)
                    }} />                                
                                <img src='/assets/images/icon-remover.svg' alt='remover' onClick={e =>{ 
                      e.stopPropagation();removerFilmeClick(item.id, item.nome)
                      }}/>                                
                            </div>

                            <div>
                                <div className='sigla'>{item.nome.substr(0,1)}</div>
                                <div className='filme'>{item.nome}</div>
                                <div className='lancamento'>{item.lancamento}</div>
                            </div>
                            <div>
                                <div className='avaliacao'>Avaliação:{item.avaliacao}</div>
                                <div className='disponivel'>{item.disponivel ? 'disponivel': 'indisponivel'}</div>
                            </div>
                        </div>
                    </div>
                    )};                     
                    </div>
                </div>
            </div>
        </main>
    )
}

