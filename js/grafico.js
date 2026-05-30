let grafico;

export function atualizarGrafico(categorias){

    const ctx =
        document.getElementById("grafico");

    if(grafico){
        grafico.destroy();
    }

    grafico = new Chart(ctx,{

        type:"doughnut",

        data:{
            labels:Object.keys(categorias),

            datasets:[{
                data:Object.values(categorias),

                backgroundColor:[
                    "#16a34a",
                    "#dc2626",
                    "#7c3aed",
                    "#2563eb",
                    "#f59e0b",
                    "#14b8a6",
                    "#f97316"
                ]
            }]
        }

    });

}