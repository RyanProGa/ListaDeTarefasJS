const inputNovaTarefa = document.querySelector(".input-nova-tarefa");
const botaoNovaTarefa = document.querySelector(".btn-add-tarefa");
const listaTarefas = document.querySelector(".tarefas");

function criaLi() {
  const li = document.createElement("li");
  return li;
}

function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerHTML = textoInput;
  listaTarefas.appendChild(li);
  limpaInput();
  criaBotaoapagar(li);
  salvarTarefas();
}

function salvarTarefas(texto) {
  const liTarefas = listaTarefas.querySelectorAll("li");
  const arrayTarefas = [];

  for (let tarefa of liTarefas) {
    let textoTarefa = tarefa.innerText;
    textoTarefa = textoTarefa.replace("Apagar", "").trim();
    arrayTarefas.push(textoTarefa);
    
  }
  
  const tarefasJSON = JSON.stringify(arrayTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
  
}

function limpaInput() {
  inputNovaTarefa.value = "";
  inputNovaTarefa.focus(); // evento de piscar cursor no input
}

function criaBotaoapagar(li) {
  li.innerHTML += " ";
  const botaoApagar = document.createElement("button");
  botaoApagar.innerHTML = "Apagar";
  botaoApagar.setAttribute("class", "apagar");
  li.appendChild(botaoApagar);
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)

    for (let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }

};

inputNovaTarefa.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    if (!inputNovaTarefa.value) return;
    criaTarefa(inputNovaTarefa.value);
  }
});

botaoNovaTarefa.addEventListener("click", function () {
  if (!inputNovaTarefa.value) return;
  criaTarefa(inputNovaTarefa.value);
});

document.addEventListener("click", function (e) {
  const el = e.target;

  if (el.classList.contains("apagar")) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

adicionaTarefasSalvas()
