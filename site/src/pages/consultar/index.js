import Menu from "../../components/menu";
import Cabecalho from "../../components/cabecalho";
import { listarTodosFilmes, buscarFilmesPorNome, removerFilme } from "../../api/filmeApi";
import "./index.scss";
import { useState, useEffect } from "react";
import {confirmAlert } from 'react-confirm-alert';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    <main className="page page-consultar">
      <Menu selecionado="consultar" />
      <div className="container">
        <Cabecalho />
        <div className="conteudo">
          <div className="caixa-busca">
            <input
              type="text"
              placeholder="Buscar filmes por nome"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
            <img
              src="/assets/images/icon-buscar.svg"
              alt="buscar"
              onClick={filtrar}
            />
          </div>

          <table>
            <thead>
              <tr>
                <th> IDENTIFICAÇÃO </th> <th> FILME </th> <th> AVALIAÇÃO </th>
                <th> LANÇAMENTO </th> <th> DISPONÍVEL </th> <th> </th>
              </tr>
            </thead>
            <tbody>
              
              {filmes.map((item) => (
                <tr key={item.id} onClick={() => abrirDetalhes(item.id)}>
                  <td> #{item.id} </td> 
                  <td> {item.nome} </td>
                  <td> {item.avaliacao} </td>
                  <td> {item.lancamento.substr(0, 10)} </td>
                  <td> {item.disponivel ? "sim" : "não"} </td>
                  <td>
                    <img src="/assets/images/icon-editar.svg" alt="editar" onClick={e =>{ 
                      e.stopPropagation();
                      editarFilme(item.id)
                    }} /> 
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <img src="/assets/images/icon-remover.svg" alt="remover" onClick={e =>{ 
                      e.stopPropagation();removerFilmeClick(item.id, item.nome)
                      }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
