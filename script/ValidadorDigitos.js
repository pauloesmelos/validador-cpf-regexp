export default class ValidadorDigitos{
    constructor(cpf){
        this.cpf = cpf;
    }
    validarPrimeiroDigito(cpf){
        let [multiplicador,resultado] = [10,0];//destructuring
        for(let i = 0; i < 9; ++i){
            resultado += (+cpf.charAt(i) * multiplicador);
            --multiplicador;
        }
        return Math.floor((resultado * 10) % 11) === 10 ? 0 : Math.floor((resultado * 10) % 11);
    }
    validarSegundoDigito(cpf){
        let [multiplicador,resultado] = [11,0];//destructuring
        for(let i = 0; i < 10; ++i){
            resultado += (+cpf.charAt(i) * multiplicador);
            --multiplicador;
        }
        return Math.floor((resultado * 10) % 11) === 10 ? 0 : Math.floor((resultado * 10) % 11);
    }
    contemApenasUmNumero(cpf){
        const equal = [...cpf].every((e,i,array) => e === array[0]);//checa se TODOS numeros do array são igual ao primeiro
        return equal;
    }
    cpfEhValido(){
        const array = [...this.cpf].map(e => +e);//transformando um array com caracter em number com map()
        const equal = (+array[9] === this.validarPrimeiroDigito(this.cpf)) && (+array[10] === this.validarSegundoDigito(this.cpf)) && (!this.contemApenasUmNumero(this.cpf));
        return equal;
    }
}