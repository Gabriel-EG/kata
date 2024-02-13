function atribuirHTML(id, textInner) {
    let element = document.getElementById(id);
    element.innerHTML = textInner;
}

function logLista(list, extraInfo) {
    const text = JSON.stringify(list);
    console.log(extraInfo, text);
    return text;
}

function ordenar(list) {
    let qtdTrocas = 0;

    function comparar(item1, item2) {
        return item2 - item1;
    }

    function ordenarItem(list, i, j) {
        const diff = comparar(list[i], list[j]);
        if (diff < 0) {
            qtdTrocas++;
            // I é maior
            const temp = list[i];
            list[i] = list[j];
            list[j] = temp;
            logLista(list, `troca ${j} por ${i}:`);
        // } else if (diff > 0) {
            // J é maior, nada a fazer
        // } else {
            // itens iguais
        }
    }

    for (let i = 0; i < list.length - 1; i++) {
        // for (let j = i+1; j < list.length; j++) {
        for (let j = list.length; j > i; j--) {
            ordenarItem(list, i, j);
        }
    }
    return qtdTrocas;
}

let lista = [];

function init() {
    lista = [];
    for (let i = 0; i < 20; i++) {
        lista.push(Math.floor(Math.random() * 50) + 1);
    }

    // const txOriginal = JSON.stringify(lista);
    // console.log(txOriginal);
    const txOriginal = logLista(lista, 'inicial');

    // let inicial = document.getElementById("inicial");
    // inicial.innerHTML = txOriginal;
    atribuirHTML("inicial", txOriginal);
}

function execute() {
    // const txResultado = JSON.stringify(lista.sort());
    // console.log(txResultado);
    const qtdTrocas = ordenar(lista);
    const txResultado = logLista(lista, `resultado ${qtdTrocas}`);

    // let resultado = document.getElementById("resultado");
    // resultado.innerHTML = txResultado;
    atribuirHTML("resultado", txResultado);
}

const btnGerar = document.getElementById('btnGerar');
btnGerar.addEventListener('click', init);

const btnOrdenar = document.getElementById('btnOrdenar');
btnOrdenar.addEventListener('click', () => {
    execute();
});