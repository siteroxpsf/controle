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

    //Limpar campo



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

//Limpar Campo botao

document
.getElementById("btnLimpar")
.addEventListener("click",()=>{

    limparCampos();

});



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
console.log("APP CARREGADO");

//carregar dados do firebase

onSnapshot(

    collection(db,"lancamentos"),

    (snapshot)=>{

        tabela.innerHTML = "";
        tabelaCartao.innerHTML = "";

        let receitas = 0;
        let despesas = 0;
        let cartoes = 0;

        let categorias = {};

        snapshot.forEach((docItem)=>{

            const item = docItem.data();

            let classe = "despesa";

            if(item.categoria === "Receita"){

                receitas += item.valor;

                classe = "receita";

            }

            else if(
                item.categoria.includes("Cartão")
            ){

                cartoes += item.valor;

            }

            else{

                despesas += item.valor;

            }

            if(!categorias[item.categoria]){

                categorias[item.categoria] = 0;

            }

            categorias[item.categoria] += item.valor;

            tabela.innerHTML += `

                <tr>

                    <td>${item.descricao}</td>

                    <td>${item.categoria}</td>

                    <td>${item.data}</td>

                    <td class="${classe}">
                        R$ ${item.valor.toFixed(2)}
                    </td>

                    <td>

                        <button
                            class="btn-edit"
                            onclick='editar("${docItem.id}",${JSON.stringify(item)})'
                        >
                            Editar
                        </button>

                        <button
                            class="btn-delete"
                            onclick='excluir("${docItem.id}")'
                        >
                            Excluir
                        </button>

                    </td>

                </tr>

            `;

            if(item.categoria.includes("Cartão")){

                tabelaCartao.innerHTML += `

                    <tr>

                        <td>${item.descricao}</td>

                        <td>${item.categoria}</td>

                        <td>${item.parcelas || 1}x</td>

                        <td>${item.data}</td>

                        <td>
                            R$ ${item.valor.toFixed(2)}
                        </td>

                        <td>

                            <button
                                class="btn-delete"
                                onclick='excluir("${docItem.id}")'
                            >
                                Excluir
                            </button>

                        </td>

                    </tr>

                `;

            }

        });

        document
        .getElementById("totalReceitas")
        .innerText =
        receitas.toFixed(2);

        document
        .getElementById("totalDespesas")
        .innerText =
        despesas.toFixed(2);

        document
        .getElementById("totalCartoes")
        .innerText =
        cartoes.toFixed(2);

        document
        .getElementById("saldoFinal")
        .innerText =
        (
            receitas -
            despesas -
            cartoes
        ).toFixed(2);

        atualizarGrafico(categorias);

    }

);

    function limparCampos(){

    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("data").value = "";

    document.getElementById("categoria").selectedIndex = 0;

}