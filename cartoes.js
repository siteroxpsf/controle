import { db } from "./firebase-config.js";

import {
    collection,
    addDoc
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

window.salvarCompra = async function(){

    const descricao =
    document.getElementById("descricao").value;

    const valor =
    parseFloat(
        document.getElementById("valor").value
    );

    const cartao =
    document.getElementById("cartao").value;

    const parcelas =
    parseInt(
        document.getElementById("parcelas").value
    );

    const dataCompra =
    document.getElementById("dataCompra").value;

    if(
        !descricao ||
        !valor ||
        !dataCompra
    ){
        alert("Preencha todos os campos.");
        return;
    }

    const valorParcela =
    valor / parcelas;

    for(let i=0;i<parcelas;i++){

        const data =
        new Date(dataCompra);

        data.setMonth(
            data.getMonth() + i
        );

        const dataFormatada =
        data.toISOString().split("T")[0];

        await addDoc(

            collection(
                db,
                "lancamentos"
            ),

            {
                descricao:
                `${descricao} (${i+1}/${parcelas})`,

                valor:
                Number(
                    valorParcela.toFixed(2)
                ),

                categoria:
                `Cartão ${cartao}`,

                parcelas,

                parcelaAtual:
                i + 1,

                data:
                dataFormatada
            }

        );

    }

    alert(
        `${parcelas} parcelas lançadas com sucesso!`
    );

    document.getElementById("descricao").value="";
    document.getElementById("valor").value="";
    document.getElementById("parcelas").value="1";

};