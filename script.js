import ValidadorCPF from './script/Validador.js';

const formulario = document.forms.formulario;
const input_cpf = document.getElementById('cpf');
const button_validar = document.querySelector('[data-validar]');
const button_limpar = document.querySelector('[data-limpar]');
const validador = new ValidadorCPF(input_cpf);
validador.init();

const aux = '111.111.111-11';
button_validar.addEventListener('click',(event) => {
    event.preventDefault();
    validador.validar(input_cpf);
});
button_limpar.addEventListener('click',(event) => {
    event.preventDefault();
    input_cpf.value = '';
    input_cpf.classList.remove('ativo');
    input_cpf.classList.remove('inativo');
});