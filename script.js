const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoDescansoCurto = document.querySelector('.app__card-button--curto');
const botaoDescansoLongo = document.querySelector('.app__card-button--longo');
const pegaSection = document.querySelector('.app__title');
const pegaImagem = document.querySelector('.app__image');
const listaDeElementos = document.querySelectorAll('.app__card-button');
const temporizadorBotao = document.querySelector('#start-pause');
const musicaInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const trocaImagemIniciarPausar = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');
const btnRemoveTarefa = document.querySelector('#btn-remover-concluidas');
const btnRemoveTodasTarefas = document.querySelector('#btn-remover-todas');



// console.log(iniciarOuPausarBt.textContent);

const musica = new Audio('./sons/luna-rise-part-one.mp3');
const musicaIniciarTemporizador = new Audio('./sons/play.wav');
const musicaPausarTemporizador = new Audio('./sons/pause.mp3');
const musicaTempoFinalizado =  new Audio('./sons/beep.mp3');
musica.loop = true  //como a música só tem 6 minutos o loop faz com que ela toque em um loop e só pare quando receber um comando! 
let temporizadorEmSegundos = 1500;
let nuloId =  null;
// console.log(temporizadorBotao.childNodes[3].nodeName)

botaoFoco.addEventListener('click',() => {
    temporizadorEmSegundos = 1500;
    alterarContexto('foco');
    alteraTitulo('Otimize sua produtividade,','mergulhe no que importa.');
    botaoFoco.classList.add('active');
})
botaoDescansoCurto.addEventListener('click', () => {
    temporizadorEmSegundos = 300;
    alterarContexto('descanso-curto');
    alteraTitulo('Que tal dar uma respirada?','Faça uma pausa curta!');
    botaoDescansoCurto.classList.add('active');
})
botaoDescansoLongo.addEventListener('click', () => {
    temporizadorEmSegundos = 900;
    alterarContexto('descanso-longo');
    alteraTitulo('Hora de voltar à superfície.','Faça uma pausa longa.')
    botaoDescansoLongo.classList.add('active');
})

musicaInput.addEventListener('change', () => {
    if(musica.paused) {

        musica.play();  
        // musica.volume = 0.1;
        // musica.currentTime = 10;
    }
    else {

        musica.pause();
    }
})

function alteraTitulo(texto1,texto2) {
    pegaSection.innerHTML = `${texto1}<br><strong class="app__title-strong">${texto2}</strong>`
}
function alterarContexto(contexto) {
    html.setAttribute('data-contexto',contexto);
    pegaImagem.setAttribute('src', `./imagens/${contexto}.png`);
    listaDeElementos.forEach((elemento) => elemento.classList.remove('active'));
    mostrarTempoNaTela();
}
const reduzTemporizador = () => {
    
    if(temporizadorEmSegundos > 0){    
        // console.log('O tempo agora é:' + temporizadorEmSegundos);
        temporizadorEmSegundos -= 1;
    } else{ 
        musicaTempoFinalizado.play();
        alert('Tempo finalizado!');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if( focoAtivo){
            const evento = new CustomEvent('focoFinalizado');
            document.dispatchEvent(evento);
        }
        zerarId();
        temporizadorEmSegundos = 5;
    }
    mostrarTempoNaTela();
}
function contagemRegressiva () {
    
    if(nuloId){
        // console.log(iniciarOuPausarBt.textContent);
        musicaPausarTemporizador.play();
        zerarId();
    }
    else{
        iniciarOuPausarBt.textContent = 'Pausar';
        trocaImagemIniciarPausar.setAttribute('src','./imagens/pause.png')
        musicaIniciarTemporizador.play()
        nuloId =  setInterval(() => {  //executa uma função a cada intervalo de tempo!           
            
            reduzTemporizador();
        },1000);
    }
}
function zerarId () {
    clearInterval(nuloId);  // essa função interrompe algum código que está sendo executado!
    nuloId = null;
    iniciarOuPausarBt.textContent = 'Começar';
    trocaImagemIniciarPausar.setAttribute('src','./imagens/play_arrow.png')
} 
function mostrarTempoNaTela () {
    // const tempo = temporizadorEmSegundos;
    const tempo = new Date(temporizadorEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`

}
mostrarTempoNaTela();
temporizadorBotao.addEventListener('click', contagemRegressiva);


    