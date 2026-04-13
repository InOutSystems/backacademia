const input = document.getElementById('input');
const lista = document.getElementById('lista');

function registrar(tipo) {
  if (input.value === '') {
    alert('Digite algo!');
    return;
  }

  fetch('/registro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
    },
    body: JSON.stringify({
      nome: input.value,
      tipo: tipo
    })
  })
  .then(response => response.json())
  .then(() => {
    carregarRegistros();
    input.value = '';
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}

function carregarRegistros() {
  fetch('/registros')
    .then(response => response.json())
    .then(data => {
      lista.innerHTML = '';

      data.forEach(registro => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerText = `${registro.nome} - ${registro.tipo} - ${registro.hora}`;
        lista.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Erro:', error);
    });
}

carregarRegistros();