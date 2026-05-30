export function gerarPDF(){

    const { jsPDF } =
    window.jspdf;

    const doc =
    new jsPDF();

    doc.setFontSize(20);

    doc.text(
        "Relatório Financeiro",
        20,
        20
    );

    doc.save("financeiro.pdf");

}