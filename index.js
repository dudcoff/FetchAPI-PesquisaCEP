let botaoPesquisa = null;
let inputCEP = null;
let Exibicao = {
    exibeTudo: null,
    exibeCidadeUF: null,
    exibeLogradouro: null,
    exibeBairro: null,
    exibeComplemento: null
};

document.addEventListener("DOMContentLoaded", setup);

function setup() {
    Exibicao.exibeTudo = document.getElementById("exibeTudo");
    Exibicao.exibeCidadeUF = document.getElementById("exibeCidadeUF");
    Exibicao.exibeLogradouro = document.getElementById("exibeLogradouro");
    Exibicao.exibeBairro = document.getElementById("exibeBairro");
    Exibicao.exibeComplemento = document.getElementById("exibeComplemento");
    botaoPesquisa = document.getElementById("botaoPesquisa");
    inputCEP = document.getElementById("inputCEP");

    inputCEP.addEventListener("keydown", (key) => {
        if (key.keyCode == 13) {
            event.preventDefault();
            let CEP = inputCEP.value;
            fazFetch(Exibicao, CEP);
        }
    });

    botaoPesquisa.addEventListener("click", () => {
        let CEP = inputCEP.value;
        if (CEP.length == 8)
        {
            fazFetch(Exibicao, CEP);
        }
    });
}

async function fazFetch(Exibicao, CEP) {
    let url = `https://api.postmon.com.br/v1/cep/${CEP}`
    let response = await fetch(url);
    let result = await response.json();

    // console.log(result);
    let cidade = result.cidade;
    let estado = result.estado;
    let bairro = result.bairro;
    let logradouro = result.logradouro;
    let complemento = result.complemento;

    if (bairro == "") {
        bairro = "Bairro não incluído"
        Exibicao.exibeBairro.style.color="black";
    }
    else {
        Exibicao.exibeBairro.style.color="#ba1096";
    }

    if (logradouro == "") {
        logradouro = "Logradouro não incluído"
        Exibicao.exibeLogradouro.style.color="black";
    }
    else {
        Exibicao.exibeLogradouro.style.color="#ba1096";
    }

    if (complemento == "" || complemento == undefined) {
        complemento = "Complemento não incluído"
        Exibicao.exibeComplemento.style.color="black"; 
    }
    else {
        Exibicao.exibeComplemento.style.color="#ba1096";
    }

    Exibicao.exibeCidadeUF.innerText = `${cidade}/${estado}`;
    Exibicao.exibeBairro.innerText = `${bairro}`;
    Exibicao.exibeLogradouro.innerText = `${logradouro}`;
    Exibicao.exibeComplemento.innerText = `${complemento}`;
    Exibicao.exibeTudo.removeAttribute("hidden");
}