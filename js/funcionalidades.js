const contas = [];

document
  .getElementById('inserir-button')
  .addEventListener('click', inserirConta);

function inserirConta() {
  const agencia = document.getElementById('agencia').value;
  const numero = document.getElementById('numero').value;
  const tipo = document.getElementById('tipo').value;
  const saldo = parseFloat(document.getElementById('saldo').value);

  let conta;

  switch (tipo) {
    case 'Conta Corrente':
      conta = new ContaCorrente(agencia, numero, saldo);
      break;
    case 'Conta Poupança':
      conta = new ContaPoupanca(agencia, numero, saldo);
      break;
    case 'Conta Universitária':
      conta = new ContaUniversitaria(agencia, numero, saldo);
      break;
    default:
      return;
  }

  contas.push(conta);
  limparCampos();
  atualizarListaContas();
}

function deletarConta(numeroConta) {
  const indexContaParaExcluir = contas.findIndex(
    conta => conta.numero === numeroConta
  );

  if (indexContaParaExcluir !== -1) {
    contas.splice(indexContaParaExcluir, 1);
    atualizarListaContas();
  }
}

function atualizarListaContas() {
  const listaContas = document.getElementById('lista-contas');
  listaContas.innerHTML = '';

  contas.forEach((conta, index) => {
    const div = document.createElement('div');
    div.classList.add('conta-item');
    div.innerHTML = `
            Conta ${index + 1} <br/>Agência: ${conta.agencia}<br/> Número: ${
      conta.numero
    } <br/> Tipo: ${conta.tipo}<br/> Saldo: R$ ${conta.getSaldo().toFixed(2)}
            <button class="delete-button" onclick="deletarConta('${
              conta.numero
            }')">Excluir</button>
        `;
    listaContas.appendChild(div);
  });
}

function limparCampos() {
  document.getElementById('agencia').value = '';
  document.getElementById('numero').value = '';
  document.getElementById('tipo').value = 'Conta Corrente';
  document.getElementById('saldo').value = '';
}

atualizarListaContas();