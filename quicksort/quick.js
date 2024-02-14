const PARAMS = {
    valorMaximo: 300,
    quantidadeRegistros: 81
};

function atribuirHTML(id, textInner) {
    let element = document.getElementById(id);
    element.innerHTML = textInner;
}

function logLista(list, extraInfo) {
    const text = JSON.stringify(list).replace(/,/g, ', ');
    console.log(extraInfo, text);
    return text;
}

function ordenar(list) {

    function compararItem(item1, item2) {
        return item2 - item1;
    }

    function compararReferencia(list, idx, refLimite, atualizarLimite) {
        let diff = compararItem(list[idx], refLimite.valor);
        if (atualizarLimite(diff)) {
            refLimite.valor = list[idx];
            refLimite.indice = idx;
        }
    }

    function trocar(list, idxOrigem, refLimite) {
        if (idxOrigem != refLimite.indice) {
            list[refLimite.indice] = list[idxOrigem];
            list[idxOrigem] = refLimite.valor;
            console.log(`troca ${refLimite.indice} por ${idxOrigem}:`);
        }
    }

    let inicio = 0;
    let fim = list.length - 1;
    let passo = 1;
    const limite = Math.floor(list.length / 2);
    for (; inicio < fim; inicio++, fim--, passo++) {
        const minimo = {valor: PARAMS.valorMaximo+1, indice: null};
        const maximo = {valor: 0, indice: null};
    
        for (let idx = inicio; idx <= fim && inicio < fim; idx++) {
            compararReferencia(list, idx, minimo, (diff) => diff > 0);
            compararReferencia(list, idx, maximo, (diff) => diff < 0);
        }
        trocar(list, inicio, minimo);
        if (maximo.indice == inicio) {
            maximo.indice = minimo.indice;
        }
        trocar(list, fim, maximo);
        if (passo < limite) {
            logLista(list, `passo ${passo}:`);
        }
    }

    return passo-1;
}

let lista = [];

function init() {
    lista = [];
    for (let i = 0; i < PARAMS.quantidadeRegistros; i++) {
        lista.push(Math.floor(Math.random() * PARAMS.valorMaximo) + 1);
    }

    const txOriginal = logLista(lista, 'inicial');
    atribuirHTML("inicial", txOriginal);
}

function execute() {
    const qtdTrocas = ordenar(lista);
    const txResultado = logLista(lista, `resultado ${qtdTrocas}`);

    atribuirHTML("resultado", txResultado);
}

const btnGerar = document.getElementById('btnGerar');
btnGerar.addEventListener('click', init);

const btnOrdenar = document.getElementById('btnOrdenar');
btnOrdenar.addEventListener('click', () => {
    execute();
});
