import ValidadorCPF from './script/Validador.js';

const formulario = document.forms.formulario;
let icon_copy;
const input_cpf = document.getElementById('cpf');
const button_validar = document.querySelector('[data-validar]');
const button_limpar = document.querySelector('[data-limpar]');
const divPaiCpfsValidos = document.querySelector('.pai-div-cpfs');
const validador = new ValidadorCPF(input_cpf);
validador.init();

const removerMessageErro = (element) => {
    element.classList.remove('ativo');
}

const createDivCpfValid = (father) => {
    let div = document.createElement('div');
    div.classList.add('div-cpfs');
    div.classList.add('anima');

    let span = document.createElement('span');
    span.classList.add('validado');
    span.innerText = input_cpf.value;

    let img = document.createElement('img');
    img.src = './imagens/copiar-alt.svg';
    img.classList.add('copiar-alt');

    div.appendChild(span);
    div.appendChild(img);

    father.appendChild(div);

    //copiar um cpf válido ao clicar no ícone de copy para a area de transferencia
    icon_copy = document.querySelector('.copiar-alt');
    const handleEvent = (event) => {
        //console.log(event.target.parentNode.children[0]);//parentNode pega o pai,children retorna um array com os filhos desse pai
        let validade = document.querySelector('.validado');
        navigator.clipboard.writeText(validade.innerText);
    };
    icon_copy.addEventListener('click',handleEvent);
};


const aux = '111.111.111-11';
button_validar.addEventListener('click',(event) => {
    event.preventDefault();
    if(validador.validar(input_cpf)){
        createDivCpfValid(divPaiCpfsValidos);
       /*  node.firstChild.nextElementSibling.innerText = input_cpf.value;
        divPaiCpfsValidos.appendChild(node);
        console.log(divCpfsValidos.children);
        console.log(node.children); */
    }
    else
        formulario.nextElementSibling.classList.add('ativo');
});
button_limpar.addEventListener('click',(event) => {
    event.preventDefault();
    input_cpf.value = '';
    input_cpf.classList.remove('ativo');
    input_cpf.classList.remove('inativo');
    removerMessageErro(formulario.nextElementSibling);
});

//checar se o input está vazio p/ rememover a mensagem de cpf inexistente
const inputIsEmpty = (event) => {
    event.target.value === '' ? removerMessageErro(formulario.nextElementSibling) : undefined;
};
input_cpf.addEventListener('input',inputIsEmpty);

//função auxiliar que exclui um caracter do input ao pressionar tab(a função que cria os dígitos impede excluir a partir de . e -)
const handleKeyPress = (event) => {
    let valor = event.target.value;
    if(event.key === 'Backspace' && valor)
    //se contem . ou -, pegamos de 0 até tamanho - 1, se não pegamos de 0 até o tamanho de elementos no input
    valor.includes('.') || valor.includes('-') ? event.target.value = valor.slice(0,valor.length - 1) : event.target.value = valor.slice(0,valor.length);
}

input_cpf.addEventListener('keyup',handleKeyPress);