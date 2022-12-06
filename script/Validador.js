import ValidadorDigitos from './ValidadorDigitos.js';

export default class ValidadorCPF{
    constructor(input){
        this.input = input;
    }
    limpar(cpf){//métodos
        return cpf.replace(/\D/g,'') //seleciona tudo que não é dígito
    }
    construir(cpf){
        const cpfLimpo = this.limpar(cpf);
        return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,'$1.$2.$3-$4');
    }  
    isValido(cpf){
        try{
            const regexp = cpf.match(/(?:\d{3}[.\-_\s]?){3}\d{2}/g);
            return regexp && (regexp[0] === cpf);
        }
        catch(erro){
            console.log('erro tipo',erro);
        }
    }
    checkInput(){
        this.input.addEventListener('change',(event) => {
            let value = event.target.value;
            let evento = event.target;
            event.target.value = this.construir(value);
            if(this.isValido(value)){
                evento.classList.add('ativo');
                evento.classList.remove('inativo');
            }
            else if(value === ''){
                evento.classList.remove('inativo');
                evento.classList.remove('ativo');
            }
            else{
                this.criarErroSpan(event.target);
                evento.classList.remove('ativo');
                evento.classList.add('inativo');
            }
        });
    }
    criarErroSpan(target){
        //inserindo um nó dinamicamente antes de um elemento do DOM >> insertBefore
        //const elemento = document.querySelector('#cpf').parentElement.insertBefore(noinserir,antesdoseguintenó)
        const span = document.createElement('span');
        span.innerText = '- Por favor, insira um CPF com 11 dígitos';
        span.classList.add('span');
        target.parentElement.insertBefore(span,target.nextElementSibling);
    }
    validar(element){  //algoritmo pra ver se um cpf existe
        const cpfSujo = element.value;
        let retorno = false;
        if(this.isValido(cpfSujo)){
            const cpfLimpo = this.limpar(cpfSujo);
            const validadorDigitos = new ValidadorDigitos(cpfLimpo);
            retorno = validadorDigitos.cpfEhValido();
        }
        return retorno;
    }
    //iniciando a classe
    init(){
        this.checkInput();
    }
}