import './index.scss'


export default function Index(props){

  function formatarLancamento(lancamento){
    const ano = lancamento.substr(0,4);
    const mes = lancamento.substr(5,2);
    const nome = nomeMes(mes);
    return `${nome}/${ano}`;
  }

  function nomeMes(mes){
         if(mes === '01') return 'Janeiro';
    else if(mes === '02') return 'Fevereiro';
    else if(mes === '03') return 'Março';
    else if(mes === '04') return 'Abril';
    else if(mes === '05') return 'Maio';
    else if(mes === '06') return 'Junho';
    else if(mes === '07') return 'Julho';
    else if(mes === '08') return 'Agosto';
    else if(mes === '09') return 'Setembro';
    else if(mes === '10') return 'Outubro';
    else if(mes === '11') return 'Novembro';
    else if(mes === '12') return 'Dezembro';
    return '';

  }
  return(
    <div className='comp-card'>
      <div className='card' key={props.item.id} onClick={() => props.abrirDetalhes(props.item.id)}>
                            <div className='acoes'>
                                <img src='/assets/images/icon-editar.svg' alt='editar' onClick={e =>{ 
                      e.stopPropagation();
                      props.editarFilme(props.item.id)
                    }} />                                
                                <img src='/assets/images/icon-remover.svg' alt='remover' onClick={e =>{ 
                      e.stopPropagation();
                      props.removerFilmeClick(props.item.id, props.item.nome)
                      }}/>                                
                            </div>

                            <div>
                                <div className='sigla'>{props.item.nome.substr(0,1)}</div>
                                <div className='filme'>{props.item.nome}</div>
                                <div className='lancamento'>{formatarLancamento(props.item.lancamento)}</div>
                            </div>
                            <div>
                                <div className='avaliacao'>Avaliação:{props.item.avaliacao}</div>
                                <div className='disponivel'>{props.item.disponivel ? 'disponivel': 'indisponivel'}</div>
                            </div>
                        </div>
    </div>
  )}
