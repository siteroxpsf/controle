import { db } from "./firebase-config.js";

import {
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    onSnapshot,
    getDocs
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

import { atualizarGrafico }
from "./grafico.js";

import { gerarPDF }
from "./pdf.js";

import {
    abrirCartao,
    fecharCartao
}
from "./cartao.js";

//Variaveis Globais

const tabela =
document.getElementById("tabelaLancamentos");

const tabelaCartao =
document.getElementById("tabelaCartao");

let editandoId = null;

//Dark Mode

document
.getElementById("btnDark")
.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

});

//Modal Cartão

document
.getElementById("btnAbrirCartao")
.addEventListener("click",abrirCartao);

document
.getElementById("btnFecharCartao")
.addEventListener("click",fecharCartao);

// Adicionar Lançamento

document
.getElementById("btnAdicionar")
.addEventListener("click",salvarLancamento);

async function salvarLancamento(){

    const descricao =
    document.getElementById("descricao").value;

    const valor =
    parseFloat(
        document.getElementById("valor").value
    );

    const categoria =
    document.getElementById("categoria").value;

    const data =
    document.getElementById("data").value;

    if(
        !descricao ||
        !valor ||
        !data
    ){
        alert("Preencha todos os campos.");
        return;
    }

    if(editandoId){

        await updateDoc(

            doc(
                db,
                "lancamentos",
                editandoId
            ),

            {
                descricao,
                valor,
                categoria,
                data
            }

        );

        editandoId = null;

        document
        .getElementById("btnAdicionar")
        .innerText = "Adicionar";

    }else{

        await addDoc(

            collection(
                db,
                "lancamentos"
            ),

            {
                descricao,
                valor,
                categoria,
                data,
                parcelas:1
            }

        );

    }

    limparCampos();
}

//Editar

window.editar =
function(id,item){

    editandoId = id;

    document
    .getElementById("descricao")
    .value = item.descricao;

    document
    .getElementById("valor")
    .value = item.valor;

    document
    .getElementById("categoria")
    .value = item.categoria;

    document
    .getElementById("data")
    .value = item.data;

    document
    .getElementById("btnAdicionar")
    .innerText = "Salvar Alteração";

};

//Excluir

window.excluir =
async function(id){

    if(
        confirm(
            "Excluir lançamento?"
        )
    ){

        await deleteDoc(
            doc(
                db,
                "lancamentos",
                id
            )
        );

    }

};

//Salvar Commpra Cartão

document
.getElementById("btnSalvarCartao")
.addEventListener(
    "click",
    async ()=>{

        const descricao =
        document.getElementById(
            "cartaoDescricao"
        ).value;

        const valor =
        parseFloat(
            document.getElementById(
                "cartaoValor"
            ).value
        );

        const categoria =
        document.getElementById(
            "cartaoNome"
        ).value;

        const parcelas =
        parseInt(
            document.getElementById(
                "parcelas"
            ).value
        );

        const data =
        document.getElementById(
            "cartaoData"
        ).value;

        if(
            !descricao ||
            !valor ||
            !data
        ){
            alert(
                "Preencha todos os campos."
            );
            return;
        }

        await addDoc(

            collection(
                db,
                "lancamentos"
            ),

            {
                descricao,
                valor,
                categoria,
                parcelas,
                data
            }

        );

        fecharCartao();

    }
);