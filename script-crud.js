const pegaBotao  = document.querySelector('.app__button--add-task');
const pegaFormulario = document.querySelector('.app__form-add-task');
const pegaTextaria = document.querySelector('.app__form-textarea');
const pegaEAdicionaNoUl = document.querySelector('.app__section-task-list');
const pegaTarefaEmAndamento = document.querySelector('.app__section-active-task-description');
const pegaBotaoLimparTarefasConcluidas = document.querySelector('#btn-remover-concluidas');
const pegaBotaoLimparTodasAsTarefas = document.querySelector("#btn-remover-todas");

let listaDeTarefas = JSON.parse(localStorage.getItem('lista de tarefas')) || [];
let selecionaTarefaDescrição = null;
let liSelecionaTarefaDescrição = null;


function atualizaLocalStorage () {
    localStorage.setItem('lista de tarefas', JSON.stringify(listaDeTarefas));
}

function criaElementoLi (tarefa) {

    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    `
    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descrição;
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button');
    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', '/imagens/edit.png');
    botao.classList.add('app_button-edit')
    botao.onclick = ()=> {
        // debugger
        let mudaTarefa = prompt('qual é o novo nome da tarefa');
        if(mudaTarefa != '' && mudaTarefa  != null){
            paragrafo.textContent =  `${mudaTarefa}`;
            tarefa.descrição = mudaTarefa;
            atualizaLocalStorage();
        }
        else {

            console.log('Deu algum problema');
        }
    }
    botao.append(imagemBotao);

    li.append(svg);
    li.append(paragrafo);
    li.append(botao);
    
    if( tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled','disabled');

    }
    else {
        li.onclick = () => {
        
        document.querySelectorAll('.app__section-task-list-item-active')
        .forEach(elemento =>{

            elemento.classList.remove('app__section-task-list-item-active')
        })
        pegaTarefaEmAndamento.textContent = tarefa.descrição;
        li.classList.add('app__section-task-list-item-active');

        if(selecionaTarefaDescrição == tarefa) {

            pegaTarefaEmAndamento.textContent = '';
            selecionaTarefaDescrição = null;
            liSelecionaTarefaDescrição = null
            return
        }
        selecionaTarefaDescrição = tarefa;
        liSelecionaTarefaDescrição = li;
    }}

    

    return li
}

pegaBotao.addEventListener('click', () => {

    pegaFormulario.classList.toggle('hidden');
})

pegaFormulario.addEventListener('submit', async (evento)=> {

    evento.preventDefault();
    const tarefa = {

        descrição: pegaTextaria.value
    }

    listaDeTarefas.push(tarefa); 
    const elementoTarefa = criaElementoLi(tarefa);
    pegaEAdicionaNoUl.append(elementoTarefa);
    pegaTextaria.value = '';
    pegaFormulario.classList.toggle('hidden');
    atualizaLocalStorage();
    
    //localStorage -> guarda a lista neste local! JSON.stringify() essa API transforma os objetos em strings!
})

listaDeTarefas.forEach(tarefa => {
    const elementoTarefa =  criaElementoLi(tarefa);
    pegaEAdicionaNoUl.append(elementoTarefa);  
})

document.addEventListener('focoFinalizado', ()=> {

    if( liSelecionaTarefaDescrição && selecionaTarefaDescrição) {

        liSelecionaTarefaDescrição.classList.remove('app__section-task-list-item-active');
        liSelecionaTarefaDescrição.classList.add('app__section-task-list-item-complete');
        liSelecionaTarefaDescrição.querySelector('button').setAttribute('disabled','disabled');
        selecionaTarefaDescrição.completa = true;
        atualizaLocalStorage();
    }
})

pegaBotaoLimparTarefasConcluidas.addEventListener('click', () => {
    const seletor = '.app__section-task-list-item-complete';
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();
    });
    listaDeTarefas = listaDeTarefas.filter(tarefa => !tarefa.completa); //esse ponto de exclamação nega o que vem depois ou seja  os  elementos não completos.
    atualizaLocalStorage();
})

pegaBotaoLimparTodasAsTarefas.addEventListener('click', () => {

    pegaEAdicionaNoUl.innerHTML = '';
    listaDeTarefas = [];
    atualizaLocalStorage();
    pegaTarefaEmAndamento.textContent = '';

})
