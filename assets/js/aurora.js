/**
 * Created by carla on 31/10/17.
 */

function getDados() {
    var dado1 = parseInt(document.getElementById('dado1').getAttribute('val'));
    var dado2 = parseInt(document.getElementById('dado2').getAttribute('val'));
    var dado3 = parseInt(document.getElementById('dado3').getAttribute('val'));
    var dado4 = parseInt(document.getElementById('dado4').getAttribute('val'));
    var dado5 = parseInt(document.getElementById('dado5').getAttribute('val'));
    var dados = [];

    dados.push(dado1,dado2,dado3,dado4,dado5);
    dados.sort();
    return dados;
}

function iniciarJogo() {
    // Gera imagens aleatorias do dados
    for (i = 1; i < 6; i++) {
        var x = Math.floor((Math.random() * 6) + 1);
        var dado = document.getElementById('dado'+i);
        dado.setAttribute('src', 'assets/img/dados-'+x+'.PNG');
        dado.setAttribute("val", ''+x+'');
    }
    calcularPontuacao();
}

function calcularPontuacao() {
    document.getElementById("resultado").style.display = "block";

    /**
     * calcularTotal (@frequencia, @elemento, @tipoPar)
     */

    var pontosUns = calcularSimples(1);
    $("#uns").html(pontosUns);

    var pontosDois = calcularSimples(2);
    $("#dois").html(pontosDois);

    var pontosTres = calcularSimples(3);
    $("#tres").html(pontosTres);

    var pontosQuatros = calcularSimples(4);
    $("#quatros").html(pontosQuatros);

    var pontosCincos = calcularSimples(5);
    $("#cincos").html(pontosCincos);

    var pontosSeis = calcularSimples(6);
    $("#seis").html(pontosSeis);

    // Pontua a soma dos dois dados de mesmo valor
    var pontosPar = calcularRepeticao(2, 1);
    $("#par").html(pontosPar);

    // Pontua a soma dos quatro dados que integram os pares
    var pontosPares = calcularRepeticao(2, 2);
    $("#pares").html(pontosPares);

    // Pontua a soma dos três dados de mesmo valor
    var pontosTrio = calcularRepeticao(3);
    $("#trio").html(pontosTrio);

    // Pontua a soma dos quatro dados de mesmo valor
    var pontosQuadra = calcularRepeticao(4);
    $("#quadra").html(pontosQuadra);

    // Pelo menos 4 dados em ordem numérica = 15 pontos
    var pontosMenor = calcularMenor();
    $("#menor").html(pontosMenor);

    // 5 dados em ordem numérica = 20 pontos
    var pontosMaior = calcularMaior();
    $("#maior").html(pontosMaior);

    // 1 par e 1 trio = soma os 5 dados
    var pontosFull = calcularFull();
    $("#full").html(pontosFull);

    var pontosAurora = calcularAurora();
    $("#aurora").html(pontosAurora);

    res = [];
    res.push(pontosUns, pontosDois, pontosTres, pontosQuatros, pontosCincos, pontosSeis, pontosPar, pontosPares, pontosTrio, pontosQuadra, pontosMenor, pontosMaior, pontosFull, pontosAurora);

    $("#pontuacao").val(Math.max.apply(Math,res));
}

function calcularSimples(elemento){
    var dados = getDados();
    var somaTotal = 0;

    for (i = 0; i < 5; i++) {
        if(dados[i] == elemento){
            somaTotal = somaTotal + dados[i];
        }
    }
    return somaTotal;
}

function calcularRepeticao(tipo, quantidade) {
    var somaTotal = 0;
    var somaPares = 0;
    var data = getDados();
    var  obj = {};

    data.forEach(function(i) {
        obj[i] = (obj[i]||0) + 1;
    });

    resObj = {};

    $.each(obj, function(i, repeticao) {

        resObj[i] = (repeticao * i);

        // Soma Pares, Trios e Quadras
        if(tipo == repeticao) {
            somaTotal = somaTotal + resObj[i];
            somaPares++;
        }
    });

    switch (quantidade){
        case 1:
            if(somaPares == 1)
                return somaTotal;
            else
                return 0;
            break;
        case 2:
            if(somaPares == 2)
                return somaTotal;
            else
                return 0;
            break;
    }

    return somaTotal;
}

function calcularMenor() {
    return 0;
}

function calcularMaior() {
    return 0;
}

function calcularFull() {
    return 0;
}

function  calcularAurora() {
    var dados = getDados();

    if(dados[0] == dados[1] == dados[2] == dados[3] == dados[4]){
        return 50;
    } else{
        return 0;
    }
}