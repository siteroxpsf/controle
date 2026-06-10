<?php

$arquivo = "tarefas.json";

if (!file_exists($arquivo)) {
    file_put_contents($arquivo, json_encode([]));
}

$tarefas = json_decode(file_get_contents($arquivo), true);

// ADICIONAR TAREFA
if (isset($_POST['nova_tarefa']) && !empty(trim($_POST['nova_tarefa']))) {

    $tarefas[] = [
        'id' => time() . rand(100,999),
        'descricao' => trim($_POST['nova_tarefa']),
        'concluida' => false,
        'data_conclusao' => null,
        'ultimo_desfazer' => null
    ];

    file_put_contents($arquivo, json_encode($tarefas, JSON_PRETTY_PRINT));
    header("Location: index.php");
    exit;
}

// CONCLUIR TAREFA
if (isset($_GET['concluir'])) {

    foreach ($tarefas as &$tarefa) {

        if ($tarefa['id'] == $_GET['concluir']) {

            $tarefa['concluida'] = true;
            $tarefa['data_conclusao'] = date('d/m/Y H:i:s');
        }
    }

    file_put_contents($arquivo, json_encode($tarefas, JSON_PRETTY_PRINT));
    header("Location: index.php");
    exit;
}

// DESFAZER CONCLUSÃO COM JUSTIFICATIVA
if (
    isset($_POST['desfazer_id']) &&
    isset($_POST['motivo_desfazer'])
) {

    foreach ($tarefas as &$tarefa) {

        if ($tarefa['id'] == $_POST['desfazer_id']) {

            $tarefa['concluida'] = false;

            $tarefa['ultimo_desfazer'] = [
                'data' => date('d/m/Y H:i:s'),
                'motivo' => trim($_POST['motivo_desfazer'])
            ];
        }
    }

    file_put_contents($arquivo, json_encode($tarefas, JSON_PRETTY_PRINT));
    header("Location: index.php");
    exit;
}

// EXCLUIR TAREFA
if (isset($_GET['excluir'])) {

    $tarefas = array_filter($tarefas, function ($tarefa) {

        return $tarefa['id'] != $_GET['excluir'];

    });

    $tarefas = array_values($tarefas);

    file_put_contents($arquivo, json_encode($tarefas, JSON_PRETTY_PRINT));

    header("Location: index.php");
    exit;
}

?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Agenda ACS</title>

<style>

body{
    font-family: Arial, sans-serif;
    background:#f4f6f9;
    max-width:1000px;
    margin:auto;
    padding:20px;
}

h1{
    text-align:center;
    color:#00695c;
}

form.adicionar{
    display:flex;
    gap:10px;
    margin-bottom:20px;
}

input[type=text]{
    flex:1;
    padding:12px;
    border:1px solid #ccc;
    border-radius:5px;
}

button{
    cursor:pointer;
}

.btn-adicionar{
    background:#00695c;
    color:white;
    border:none;
    padding:12px 20px;
    border-radius:5px;
}

.tarefa{

    background:white;
    padding:15px;
    border-radius:8px;
    margin-bottom:10px;

    display:flex;
    justify-content:space-between;
    align-items:center;

    box-shadow:0 2px 5px rgba(0,0,0,0.08);
}

.descricao{
    flex:1;
}

.concluida{
    text-decoration:line-through;
    color:#777;
}

.info{
    margin-top:5px;
    font-size:12px;
    color:#666;
}

.justificativa{
    margin-top:5px;
    color:#b00020;
    font-size:12px;
}

.acoes{
    display:flex;
    gap:8px;
}

.btn-ok{

    background:#2e7d32;
    color:white;
    border:none;
    padding:8px 12px;
    border-radius:5px;
}

.btn-excluir{

    background:#c62828;
    color:white;
    text-decoration:none;
    padding:8px 12px;
    border-radius:5px;
}

.modal{

    display:none;
    position:fixed;
    left:0;
    top:0;

    width:100%;
    height:100%;

    background:rgba(0,0,0,.5);
}

.modal-conteudo{

    background:white;

    width:90%;
    max-width:450px;

    margin:100px auto;

    padding:20px;

    border-radius:10px;
}

textarea{

    width:100%;
    height:120px;

    padding:10px;
    resize:vertical;
}

.btn-cancelar{

    background:#757575;
    color:white;

    border:none;
    padding:10px 15px;

    border-radius:5px;
}

.sem-tarefas{
    text-align:center;
    color:#666;
}

</style>

</head>
<body>

<h1>📋 Controle de Atividades ACS</h1>

<form method="post" class="adicionar">

    <input
        type="text"
        name="nova_tarefa"
        placeholder="Digite uma atividade..."
        required>

    <button class="btn-adicionar" type="submit">
        Adicionar
    </button>

</form>

<?php if(empty($tarefas)): ?>

    <p class="sem-tarefas">
        Nenhuma atividade cadastrada.
    </p>

<?php endif; ?>

<?php foreach($tarefas as $tarefa): ?>

<div class="tarefa">

    <div class="descricao">

        <div class="<?= $tarefa['concluida'] ? 'concluida' : '' ?>">

            <?= htmlspecialchars($tarefa['descricao']) ?>

        </div>

        <?php if(!empty($tarefa['data_conclusao'])): ?>

            <div class="info">
                Concluída em:
                <?= $tarefa['data_conclusao'] ?>
            </div>

        <?php endif; ?>

        <?php if(!empty($tarefa['ultimo_desfazer'])): ?>

            <div class="justificativa">

                <strong>Último desfazer:</strong><br>

                Data:
                <?= $tarefa['ultimo_desfazer']['data'] ?>

                <br>

                Motivo:
                <?= htmlspecialchars($tarefa['ultimo_desfazer']['motivo']) ?>

            </div>

        <?php endif; ?>

    </div>

    <div class="acoes">

        <?php if(!$tarefa['concluida']): ?>

            <a
                href="?concluir=<?= $tarefa['id'] ?>"
                style="text-decoration:none;">

                <button class="btn-ok" type="button">
                    Concluir
                </button>

            </a>

        <?php else: ?>

            <button
                class="btn-ok"
                onclick="abrirDesfazer('<?= $tarefa['id'] ?>')">

                Desfazer

            </button>

        <?php endif; ?>

        <a
            class="btn-excluir"
            href="?excluir=<?= $tarefa['id'] ?>"
            onclick="return confirm('Deseja excluir esta atividade?')">

            Excluir

        </a>

    </div>

</div>

<?php endforeach; ?>


<!-- MODAL -->

<div class="modal" id="modalDesfazer">

    <div class="modal-conteudo">

        <h3>Motivo do desfazer</h3>

        <form method="post">

            <input
                type="hidden"
                name="desfazer_id"
                id="desfazer_id">

            <textarea
                name="motivo_desfazer"
                placeholder="Informe o motivo do desfazer..."
                required></textarea>

            <br><br>

            <button class="btn-ok" type="submit">
                Confirmar
            </button>

            <button
                class="btn-cancelar"
                type="button"
                onclick="fecharDesfazer()">

                Cancelar

            </button>

        </form>

    </div>

</div>

<script>

function abrirDesfazer(id){

    document.getElementById('desfazer_id').value = id;

    document.getElementById('modalDesfazer').style.display = 'block';
}

function fecharDesfazer(){

    document.getElementById('modalDesfazer').style.display = 'none';
}

window.onclick = function(event){

    let modal = document.getElementById('modalDesfazer');

    if(event.target == modal){

        modal.style.display = 'none';
    }
}

</script>

</body>
</html>