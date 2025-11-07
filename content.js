// ============================================
// CONFIGURAÇÃO DAS REGRAS DE MONITORAMENTO
// ============================================
// Aqui você define quais textos quer monitorar e quais mensagens exibir
const regras = [
  {
    // seletor: Define QUAIS elementos da página serão monitorados (inputs, selects, textareas)
    seletor: "select, input, textarea",

    // valorEsperado: O texto que você quer detectar
    valorEsperado: "IFP - COLONOSCOPIA",

    // mensagem: A mensagem que aparecerá na tela quando o texto for detectado
    mensagem:
      "Lembre-se que o paciente precisa levar o parecer cardiológico caso tenha entre 60 e 65 anos.\n\nFaixa etária: 18 a 65 anos.\n\nPrecisa-se de APAC.",

    // correspondenciaExata:
    // - false = detecta se o texto CONTÉM a frase (ex: "CONSULTA EM OFTALMOLOGIA GERAL URGENTE" também funciona)
    // - true = detecta apenas se o texto for EXATAMENTE igual
    correspondenciaExata: false,
  },
  {
    seletor: "select, input, textarea",
    valorEsperado: "GENETICA",
    // Use \n para criar parágrafos/quebras de linha
    mensagem:
      "Encaminhamentos para geneticista devem ser regulados pelo link da GRAMB.",
    correspondenciaExata: false,
  },
  {
    seletor: "select, input, textarea",
    valorEsperado: "CONSULTA PRÉ NATAL DE ALTO RISCO",
    // Use \n para criar parágrafos/quebras de linha
    mensagem:
      "Médicos que atendem PNAR: \n\nDr Dirce Luiza Pereira dos Santos\nDr Thiago Cesar Parente Saraiva.",
    correspondenciaExata: false,
  },
  {
    seletor: "select, input, textarea",
    valorEsperado: "RESSONANCIA MAGNETICA",
    // Use \n para criar parágrafos/quebras de linha
    mensagem: "Precisa-se de APAC.",
    correspondenciaExata: false,
  },
    {
    seletor: "select, input, textarea",
    valorEsperado: "TOMOGRAFIA COMPUTADORIZADA",
    // Use \n para criar parágrafos/quebras de linha
    mensagem: "Precisa-se de APAC.",
    correspondenciaExata: false,
  },
    {
    seletor: "select, input, textarea",
    valorEsperado: "DENSITOMETRIA OSSEA",
    // Use \n para criar parágrafos/quebras de linha
    mensagem: "Precisa-se de APAC.",
    correspondenciaExata: false,
  },
    {
    seletor: "select, input, textarea",
    valorEsperado: "ELETRONEUROMIOGRAFIA",
    // Use \n para criar parágrafos/quebras de linha
    mensagem: "Precisa-se de APAC.",
    correspondenciaExata: false,
  },
    {
    seletor: "select, input, textarea",
    valorEsperado: "ELETROENCEFALOGRAMA",
    // Use \n para criar parágrafos/quebras de linha
    mensagem: "Precisa-se de APAC.",
    correspondenciaExata: false,
  },

  // Você pode adicionar mais regras aqui, basta copiar o bloco acima e modificar os valores
  // Exemplo:
  // {
  //   seletor: 'input.campo-especifico',
  //   valorEsperado: 'URGENTE',
  //   mensagem: 'Atenção: Caso urgente!',
  //   cor: '#FF5722',
  //   correspondenciaExata: false
  // }
];

// ============================================
// VARIÁVEIS GLOBAIS
// ============================================
// notificacaoAtual: Guarda a referência da notificação que está sendo exibida na tela
// Isso permite remover a notificação antiga antes de criar uma nova
let notificacaoAtual = null;

// timeoutVerificacao: Guarda a referência do timer de verificação
// Isso permite cancelar uma verificação agendada se o usuário continuar digitando
let timeoutVerificacao = null;

// fechadaManualmente: Indica se a notificação foi fechada manualmente pelo usuário
// Quando true, impede que a notificação reapareça automaticamente
let fechadaManualmente = false;

// mensagemAtual: Guarda a mensagem que está sendo exibida atualmente
// Usado para detectar quando o conteúdo muda e permitir reabrir a notificação
let mensagemAtual = null;

// ============================================
// FUNÇÃO: EXIBIR NOTIFICAÇÃO
// ============================================
// Esta função cria e exibe a caixa de mensagem no canto superior direito da tela
function exibirNotificacao(mensagem) {
  // Se a notificação foi fechada manualmente e a mensagem é a mesma, não reabre
  if (fechadaManualmente && mensagemAtual === mensagem) {
    return;
  }

  // Se a mensagem mudou, reseta a flag de fechamento manual
  if (mensagemAtual !== mensagem) {
    fechadaManualmente = false;
    mensagemAtual = mensagem;
  }

  // Se já existe uma notificação na tela, remove ela primeiro
  if (notificacaoAtual) {
    notificacaoAtual.remove();
  }

  // Cria um novo elemento <div> que será a caixa de notificação
  const notificacao = document.createElement("div");

  // Adiciona a classe CSS que define o estilo da notificação (posição, tamanho, etc)
  // A cor é definida no CSS (background-color: #4CAF50)
  notificacao.className = "monitor-notificacao";

  // Cria o ícone da notificação
  const icone = document.createElement("span");
  icone.className = "monitor-icone";
  icone.textContent = "⚠️";

  // Cria o texto da mensagem
  // Usa 'div' ao invés de 'span' para permitir quebras de linha
  const textoMensagem = document.createElement("div");
  textoMensagem.className = "monitor-texto";

  // Divide a mensagem por quebras de linha (\n) e cria parágrafos
  const paragrafos = mensagem.split("\n");
  paragrafos.forEach((paragrafo) => {
    // Cria um elemento <p> para cada parágrafo
    const p = document.createElement("p");
    p.textContent = paragrafo;
    textoMensagem.appendChild(p);
  });

  // Cria o botão de fechar (X)
  const botaoFechar = document.createElement("button");
  botaoFechar.className = "monitor-botao-fechar";
  botaoFechar.textContent = "×"; // Símbolo de X
  botaoFechar.title = "Fechar";

  // Adiciona evento de clique no botão de fechar
  botaoFechar.addEventListener("click", (e) => {
    e.stopPropagation(); // Impede que o clique se propague
    // Marca que foi fechada manualmente
    fechadaManualmente = true;
    // Remove o elemento imediatamente sem animação
    if (notificacaoAtual) {
      notificacaoAtual.remove();
      notificacaoAtual = null;
    }
  });

  // Monta a estrutura: notificacao > icone + texto + botao fechar
  notificacao.appendChild(icone);
  notificacao.appendChild(textoMensagem);
  notificacao.appendChild(botaoFechar);

  // Adiciona a notificação no final da página (dentro do <body>)
  document.body.appendChild(notificacao);

  // Guarda a referência da notificação para poder removê-la depois
  notificacaoAtual = notificacao;

  // Aguarda 10 milissegundos e então adiciona a classe 'mostrar'
  // Isso ativa a animação de entrada (a caixa desliza da direita para a esquerda)
  setTimeout(() => {
    notificacao.classList.add("mostrar");
  }, 10);
}

// ============================================
// FUNÇÃO: REMOVER NOTIFICAÇÃO
// ============================================
// Esta função remove a notificação da tela com uma animação suave
function removerNotificacao() {
  // Verifica se existe uma notificação na tela
  if (notificacaoAtual) {
    // Remove a classe 'mostrar', o que ativa a animação de saída
    notificacaoAtual.classList.remove("mostrar");

    // Aguarda 300ms (tempo da animação) e então remove o elemento do DOM
    setTimeout(() => {
      if (notificacaoAtual) {
        notificacaoAtual.remove(); // Remove o elemento da página
        notificacaoAtual = null; // Limpa a referência
      }
    }, 300);
  }

  // Reseta as flags quando a notificação é removida automaticamente (não manualmente)
  fechadaManualmente = false;
  mensagemAtual = null;
}

// ============================================
// FUNÇÃO: OBTER VALOR DO ELEMENTO
// ============================================
// Esta função pega o texto/valor de um elemento (input, select ou textarea)
function obterValor(elemento) {
  // Se for um <select> (dropdown), precisa pegar o TEXTO da opção selecionada
  if (elemento.tagName === "SELECT") {
    // Pega a opção que está selecionada no momento
    const opcao = elemento.options[elemento.selectedIndex];
    // Retorna o texto da opção (não o valor, mas o texto visível)
    return opcao ? opcao.text : "";
  }

  // Se for input ou textarea, retorna o valor digitado
  return elemento.value || "";
}

// ============================================
// FUNÇÃO: VERIFICAR ELEMENTO ESPECÍFICO
// ============================================
// Esta função verifica se um elemento específico contém o texto que estamos procurando
function verificarElemento(elemento) {
  // Pega o valor do elemento, remove espaços extras e converte para maiúsculas
  const valor = obterValor(elemento).trim().toUpperCase();

  // Percorre todas as regras configuradas
  for (const regra of regras) {
    // Converte o valor esperado para maiúsculas (para comparação case-insensitive)
    const valorEsperado = regra.valorEsperado.toUpperCase();

    // Verifica se há correspondência
    const corresponde = regra.correspondenciaExata
      ? valor === valorEsperado // Comparação exata
      : valor.includes(valorEsperado); // Verifica se contém o texto

    // Se encontrou correspondência
    if (corresponde) {
      // Exibe a notificação com a mensagem definida na regra
      exibirNotificacao(regra.mensagem);
      return true; // Retorna true indicando que encontrou
    }
  }

  // Se não encontrou nenhuma correspondência, retorna false
  return false;
}

// ============================================
// FUNÇÃO: AO PARAR DE DIGITAR
// ============================================
// Esta função é chamada toda vez que o usuário digita algo em um input/textarea
// Ela espera o usuário PARAR de digitar antes de verificar o conteúdo
function aoPararDeDigitar(evento) {
  // Cancela qualquer verificação que estava agendada anteriormente
  // Isso garante que só verificamos quando o usuário realmente parar de digitar
  if (timeoutVerificacao) {
    clearTimeout(timeoutVerificacao);
  }

  // Agenda uma nova verificação para daqui a 2 segundos
  // Se o usuário continuar digitando, essa verificação será cancelada e reagendada
  timeoutVerificacao = setTimeout(() => {
    // Verifica o elemento que foi modificado
    const encontrou = verificarElemento(evento.target);

    // Se NÃO encontrou correspondência, remove a notificação da tela
    // ISSO RESOLVE O PROBLEMA: quando você apaga o texto, a notificação some
    if (!encontrou) {
      removerNotificacao();
    }
  }, 2000);
}

// ============================================
// FUNÇÃO: VERIFICAR TODOS OS ELEMENTOS
// ============================================
// Esta função varre TODOS os elementos da página procurando por correspondências
// É usada apenas quando a página carrega, para detectar textos que já estavam lá
function verificarTodos() {
  let encontrou = false;

  // Percorre cada regra configurada
  regras.forEach((regra) => {
    // Busca todos os elementos que correspondem ao seletor da regra
    const elementos = document.querySelectorAll(regra.seletor);

    // Verifica cada elemento encontrado
    for (const elemento of elementos) {
      // Se encontrar correspondência em algum elemento
      if (verificarElemento(elemento)) {
        encontrou = true;
        break; // Para de procurar (já encontrou)
      }
    }
  });

  // Se não encontrou nada, garante que não há notificação na tela
  if (!encontrou) {
    removerNotificacao();
  }
}

// ============================================
// FUNÇÃO: INICIAR MONITORAMENTO
// ============================================
// Esta função configura todos os "ouvintes" (listeners) que detectam mudanças na página
function iniciar() {
  // Verifica todos os elementos da página após 3 segundos do carregamento
  // O delay garante que a página já carregou completamente
  setTimeout(verificarTodos, 3000);

  // ===== LISTENER PARA DIGITAÇÃO =====
  // Detecta quando o usuário digita em qualquer input ou textarea
  // O parâmetro 'true' faz com que o evento seja capturado na fase de captura
  // (isso garante que funcione mesmo em elementos criados dinamicamente)
  document.addEventListener("input", aoPararDeDigitar, true);

  // ===== LISTENER PARA MUDANÇAS EM SELECTS =====
  // Detecta quando o usuário muda a opção de um select (dropdown)
  document.addEventListener(
    "change",
    (e) => {
      // Verifica se o elemento que mudou é um select, input ou textarea
      if (e.target.matches("select, input, textarea")) {
        // Cancela verificação anterior
        if (timeoutVerificacao) {
          clearTimeout(timeoutVerificacao);
        }

        // Agenda verificação após 1 segundo
        timeoutVerificacao = setTimeout(() => {
          const encontrou = verificarElemento(e.target);

          // Se NÃO encontrou correspondência, remove a notificação
          // ISSO TAMBÉM RESOLVE O PROBLEMA: quando você muda o select, a notificação some se não houver correspondência
          if (!encontrou) {
            removerNotificacao();
          }
        }, 1000);
      }
    },
    true
  );
}

// ============================================
// INICIALIZAÇÃO AUTOMÁTICA
// ============================================
// Este código roda automaticamente quando o script é carregado
// Ele verifica se a página já terminou de carregar ou se ainda está carregando

if (document.readyState === "loading") {
  // Se a página ainda está carregando, espera o evento 'DOMContentLoaded'
  // (esse evento dispara quando o HTML foi completamente carregado e parseado)
  document.addEventListener("DOMContentLoaded", iniciar);
} else {
  // Se a página já carregou, inicia imediatamente
  iniciar();
}
