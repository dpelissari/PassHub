const senhaGerada = document.getElementById("senhaGerada");
const rangeInput = document.getElementById("rangeCarateresSenha");
const caracteresSenha = document.getElementById("totalCarateresSenha");

// funcao para sincronizar os valores do input range e input number
function atualizarValores() {
    const selectedValue = parseInt(rangeInput.value);
    caracteresSenha.value = selectedValue;
    gerarSenha();
}

// evento para atualizar os valores do input range e input number
caracteresSenha.addEventListener("input", function () {
    const selectedValue = parseInt(caracteresSenha.value);
    rangeInput.value = selectedValue;
    gerarSenha();
});

rangeInput.addEventListener("input", function () {
    const selectedValue = parseInt(rangeInput.value);
    caracteresSenha.value = selectedValue;
    gerarSenha();
});

// evento para garantir que pelo menos um checkbox esteja selecionado
const checkboxes = document.querySelectorAll("input[type='checkbox']");
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function () {
        if (!this.checked && !Array.from(checkboxes).some(c => c.checked)) {
             this.checked = true; }
        gerarSenha();
    });
});

// função para gerar a senha
function gerarSenha() {
    // Obter o comprimento da senha
    const length = parseInt(document.getElementById("totalCarateresSenha").value);

    // verifica qual dos criterios foram selecionados
    let useLetrasMaiusculas = document.getElementById("letrasMaiusculas").checked;
    let useCaracteresEspeciais = document.getElementById("caracteresEspeciais").checked;
    let useSimbolos = document.getElementById("simbolos").checked;
    let useNumeros = document.getElementById("numeros").checked;

    // monta o conjunto total de caracteres com base nos itens selecionados
    let todosCaracteres = "";
    if (useLetrasMaiusculas) todosCaracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useCaracteresEspeciais) todosCaracteres += "!@#$%^&*()_+[]{}|;:,.<>?";
    if (useSimbolos) todosCaracteres += "~`";
    if (useNumeros) todosCaracteres += "0123456789";

    // gera a senha
    let senha = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * todosCaracteres.length);
        senha += todosCaracteres.charAt(randomIndex);
    }

    // atualiza com a senha gerada
    senhaGerada.value = senha;
}

// chama a funcao de gerar senha quando a página é carregada
window.onload = function () {
    gerarSenha();
}

// funcao de copiar senha
function copiarSenha() {
    const senhaInput = document.getElementById("senhaGerada");
    senhaInput.select();
    document.execCommand("copy");
    alert('Senha copiada para área de transfêrencia')
}