import React from 'react';
import { Link } from "react-router-dom";
import { Container, Table, Form, Button } from 'react-bootstrap';

function postPergunta(pergunta, update) {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pergunta: pergunta })
  };
  fetch('http://localhost:5000/perguntas', request)
    .then(response => response.json())
    .then(data => update(data.id_pergunta, pergunta));
}

function NovaPergunta(props) {
  const [texto, setTexto] = React.useState('');
  
  function handleChange (event) {
    setTexto(event.target.value);
  }

  function handleClick(event) {
    postPergunta(texto, props.update);
    setTexto('');
  }

  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label> Faça a sua pergunta: </Form.Label>
          <Form.Control id="textarea-pergunta" as="textarea" value={texto} onChange={handleChange}/>
        </Form.Group>
        <Button id="btn-pergunta" onClick={handleClick}>Enviar</Button>
      </Form>
    </Container>
  );
}

function Pergunta() {
  const [listaPerguntas, setListaPerguntas] = React.useState([]);
  const [termoBusca, setTermoBusca] = React.useState('');

  function adicionarNovaPergunta(id_pergunta, pergunta) {
    setListaPerguntas((prev) => {
      const novaPergunta = {
        id_pergunta: id_pergunta,
        texto: pergunta,
        num_respostas: 0,
      };
      return [...prev, novaPergunta];
    });
  }

  function TabelaPerguntas() {   

    function LinhaTabela({ pergunta }) {
      return (
        <tr>
          <td className="text-center"> {pergunta.id_pergunta} </td>
          <td> {pergunta.texto} </td>
          <td className="text-center"> 
              <Link to = {`/resposta/${pergunta.id_pergunta}`}> 
                 {pergunta.num_respostas}
              </Link>
          </td>
        </tr>
      );
    }

    function TabelaPrincipal() {
      const linhas = listaPerguntas.map(p => ( <LinhaTabela pergunta={p} key={p.id_pergunta} /> ));  
      return (
        <div className="container">
          <center><h5>Peguntas Atuais</h5></center>
          <Table id="tabela-perguntas" striped bordered>
            <thead>
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center">Pergunta</th>
                <th className="text-center"># Respostas</th>
              </tr>
            </thead>
            <tbody>
              {linhas}
            </tbody>
          </Table>
        </div>
      );
    }

    return (
      <div>
        <TabelaPrincipal />
        <NovaPergunta update={adicionarNovaPergunta}/>
      </div> 
    );
  }
    
  React.useEffect(() => {
    let atual = true;
    fetch('http://localhost:5000/perguntas/busca?q=' + encodeURIComponent(termoBusca))
    .then((res) => res.json())
    .then((data) => { if (atual) setListaPerguntas(data); });
    return () => { atual = false; };
  }, [termoBusca]);

  const semResultados = termoBusca.trim() !== '' && listaPerguntas.length === 0;

  return (
    <div className="container">
      <Container className="mb-3">
        <Form.Control
          id="campo-busca"
          type="search"
          placeholder="Buscar perguntas por palavra-chave"
          value={termoBusca}
          onChange={(event) => setTermoBusca(event.target.value)}
        />
        { semResultados && <p id="sem-resultados" className="mt-2"> Nenhuma pergunta encontrada </p> }
      </Container>
      <TabelaPerguntas />
    </div>
  );
}

export default Pergunta;