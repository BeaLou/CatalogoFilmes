import Menu from "../../components/menu";
import Cabecalho from "../../components/cabecalho";
import { useState } from "react";
import "./index.scss";
import storage from "local-storage";
import {
  cadastrarFilme,
  enviarImagemFilme,
  alterarFilme,
} from "../../api/filmeApi";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Index() {
  const [nome, setNome] = useState("");
  const [avaliacao, setAvaliacao] = useState("");
  const [lancamento, setLancamento] = useState(0);
  const [disponivel, setDisponivel] = useState(false);
  const [sinopse, setSinopse] = useState("");
  const [imagem, setImagem] = useState();
  const [id, setId] = useState(0);

  async function salvarClick() {
    try {
      if (!imagem) throw new Error("Escolha a capa do filme");

      const usuario = storage("usuario-logado").id;

      let idFilme = 0;

      if (id === 0) {
        const novoFilme = await cadastrarFilme(
          nome,
          avaliacao,
          lancamento,
          disponivel,
          sinopse,
          usuario
        );
        await enviarImagemFilme(novoFilme.id, imagem);
        setId(novoFilme.id);
        toast("Filme cadastrado com sucesso");
      } else {
        await alterarFilme(
          id,
          nome,
          avaliacao,
          lancamento,
          disponivel,
          sinopse,
          usuario
        );
        await enviarImagemFilme(id, imagem);
        toast("Filme alterado com sucesso");
      }
    } catch (err) {
      if (err.response) toast.error(err.response.data.erro);
      else toast.error(err.message);
    }
  }

  function escolherImagem() {
    document.getElementById("imagemcapa").click();
  }

  function mostrarImagem() {
    return URL.createObjectURL(imagem);
  }

  function novoClick() {
    setId(0);
    setNome("");
    setAvaliacao("");
    setSinopse("");
    setLancamento();
    setDisponivel(false);
    setImagem();
  }

  return (
    <main className="page page-cadastrar">
      <Menu selecionado="cadastrar" />
      <div className="container">
        <Cabecalho />
        <div className="conteudo">
          <section>
            <h1 className="titulo">
              <span> & nbsp; </span>Cadastrar Novo Filme
            </h1>
            <div className="form-colums">
              <div>
                <div className="upload-capa" onClick={escolherImagem}>
                  
                  {!imagem && (
                    <img src="/assets/images/icon-upload.svg" alt="" />
                  )}
                  {imagem && (
                    <img className="imagemCapa" src={mostrarImagem()} alt="" />
                  )}
                  <input
                    type="file"
                    id="imagemcapa"
                    onChange={(e) => setImagem(e.target.files[0])}
                  />
                </div>
              </div>
              <div>
                <div className="form-row">
                  <label> Nome: </label>
                  <input
                    type="text"
                    placeholder="Nome do filme"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label> Avaliação: </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={avaliacao}
                    onChange={(e) => setAvaliacao(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <label> Lançamento: </label>
                  <input
                    type="date"
                    value={lancamento}
                    onChange={(e) => setLancamento(e.target.value)}
                  />
                </div>
                <br />
                <div className="form-row">
                  <label> </label>
                  <input
                    type="checkbox"
                    checked={disponivel}
                    onChange={(e) => setDisponivel(e.target.checked)}
                  />
                  &nbsp; Disponível
                </div>
              </div>
              <div>
                <div className="form-row" style={{ alignItems: "flex-start" }}>
                  <label style={{ marginTop: "13px" }}> Sinopse: </label>
                  <textarea
                    placeholder="Sinopse do filme"
                    value={sinopse}
                    onChange={(e) => setSinopse(e.target.value)}
                  />
                </div>
                <br />
                <br />
                <div className="form-row">
                  <label> </label>
                  <div className="btnSalvar">
                    <button onClick={salvarClick}>
                      
                      {id === 0 ? "SALVAR" : "ALTERAR"}
                    </button>
                    &nbsp; &nbsp; <button onClick={novoClick}> NOVO </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
