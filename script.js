$(document).ready(function () {
    $('#cpf').inputmask('999.999.999-99');

});


function validaCPF() {
    const cpfFormatado = document.getElementById('cpf').value;

    const cpf = limpaFormatacao(cpfFormatado);

    console.log('Formatado', cpfFormatado);
    console.log('Sem Formatação', cpf);

    if (cpf.length !== 11) {

        mostraResultado('Cpf deve conter 11 dígitos', 'yellow');
        return;

    }

    if (verificaDigitosRepetidos(cpf)) {

        mostraResultado('Cpf não pode conter repetição do mesmo dígito', 'red')
        return;

    }

    const digito1 = calcularDigitoVerificador(cpf, 1);
    if (!digito1) {

        mostraResultado('CPF Inválido - ' + cpfFormatado, 'red');
        return;

    }


    const digito2 = calcularDigitoVerificador(cpf, 2);
    if (!digito2) {

        mostraResultado('CPF Inválido - ' + cpfFormatado, 'red');
        return;

    }

    mostraResultado('CPF Válido - ' + cpfFormatado, 'green')


}



function calcularDigitoVerificador(cpf, posicao) {

    const sequencia = cpf.slice(0, 8 + posicao).split('')

    let soma = 0;
    let multiplicador = 9 + posicao;

    for (const numero of sequencia) {

        soma += multiplicador * Number(numero);
        multiplicador--;

    }

    const restoDivisao = (soma * 10) % 11;
    const digito = cpf.slice(8 + posicao, 9 + posicao);

    return restoDivisao == digito;

}


function limpaFormatacao(cpf) {

    cpf = cpf.replace(/\D/g, '');

    return cpf;
}


function mostraResultado(texto, cor) {

    const span = document.getElementById('resultado');

    span.innerHTML = texto;
    span.style.color = cor;
    
}


function verificaDigitosRepetidos(cpf) {

    return cpf.split('').every((d) => d === cpf[0]);

}