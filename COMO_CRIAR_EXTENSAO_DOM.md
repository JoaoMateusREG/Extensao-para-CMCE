# Como Criar uma Extensão de Navegador que Manipula o DOM

Este guia explica os passos básicos para criar uma extensão de navegador (Chrome/Edge) que adiciona elementos na página usando JavaScript e DOM.

## 📁 Estrutura de Arquivos Necessária

```
minha-extensao/
├── manifest.json       (Configuração da extensão)
├── content.js         (Script que manipula a página)
├── styles.css         (Estilos dos elementos)
└── icon.png          (Ícone da extensão - 128x128px)
```

---

## 1️⃣ MANIFEST.JSON - Configuração da Extensão

O `manifest.json` é o arquivo de configuração que diz ao navegador como sua extensão funciona.

```json
{
  "manifest_version": 3,
  "name": "Minha Extensão",
  "version": "1.0",
  "description": "Adiciona elementos na página",
  "permissions": [
    "activeTab"
  ],
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "css": ["styles.css"],
      "run_at": "document_idle"
    }
  ],
  "icons": {
    "128": "icon.png"
  }
}
```

**Explicação:**
- `manifest_version: 3` - Versão do formato (sempre use 3)
- `content_scripts` - Define quais scripts rodam nas páginas
- `matches: ["<all_urls>"]` - Roda em todos os sites (você pode limitar)
- `run_at: "document_idle"` - Roda depois que a página carregou

---

## 2️⃣ CONTENT.JS - Manipulação do DOM

Este é o arquivo JavaScript que cria e adiciona elementos na página.

### Exemplo Básico: Adicionar uma Caixa na Página

```javascript
// Espera a página carregar completamente
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciar);
} else {
  iniciar();
}

function iniciar() {
  // Cria um elemento <div>
  const caixa = document.createElement('div');
  
  // Adiciona uma classe CSS
  caixa.className = 'minha-caixa';
  
  // Adiciona texto dentro da caixa
  caixa.textContent = 'Olá! Sou uma extensão!';
  
  // Adiciona a caixa no final da página (dentro do <body>)
  document.body.appendChild(caixa);
}
```

### Exemplo: Criar Estrutura com Múltiplos Elementos

```javascript
function criarNotificacao() {
  // Cria o container principal
  const notificacao = document.createElement('div');
  notificacao.className = 'notificacao';
  
  // Cria um ícone
  const icone = document.createElement('span');
  icone.className = 'icone';
  icone.textContent = '⚠️';
  
  // Cria o texto
  const texto = document.createElement('span');
  texto.className = 'texto';
  texto.textContent = 'Mensagem importante!';
  
  // Cria um botão
  const botao = document.createElement('button');
  botao.className = 'botao-fechar';
  botao.textContent = '×';
  
  // Adiciona evento de clique no botão
  botao.addEventListener('click', () => {
    notificacao.remove(); // Remove a notificação
  });
  
  // Monta a estrutura: notificacao > icone + texto + botao
  notificacao.appendChild(icone);
  notificacao.appendChild(texto);
  notificacao.appendChild(botao);
  
  // Adiciona na página
  document.body.appendChild(notificacao);
}

// Chama a função para criar
criarNotificacao();
```

### Exemplo: Adicionar com Animação

```javascript
function criarComAnimacao() {
  const elemento = document.createElement('div');
  elemento.className = 'elemento-animado';
  elemento.textContent = 'Aparecendo com animação!';
  
  // Adiciona na página
  document.body.appendChild(elemento);
  
  // Aguarda 10ms e adiciona classe que ativa a animação
  setTimeout(() => {
    elemento.classList.add('mostrar');
  }, 10);
}
```

---

## 3️⃣ STYLES.CSS - Estilização dos Elementos

O CSS define como seus elementos aparecem na tela.

### Exemplo: Caixa Fixa no Canto da Tela

```css
/* Estilo da caixa */
.minha-caixa {
  position: fixed;           /* Fica fixo na tela */
  top: 20px;                /* 20px do topo */
  right: 20px;              /* 20px da direita */
  background-color: #4CAF50; /* Cor de fundo verde */
  color: white;             /* Texto branco */
  padding: 16px 24px;       /* Espaçamento interno */
  border-radius: 8px;       /* Cantos arredondados */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Sombra */
  z-index: 999999;          /* Fica por cima de tudo */
  font-family: Arial, sans-serif;
  font-size: 16px;
}
```

### Exemplo: Animação de Entrada

```css
.elemento-animado {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #2196F3;
  color: white;
  padding: 16px;
  border-radius: 8px;
  
  /* Estado inicial (invisível, fora da tela) */
  opacity: 0;
  transform: translateX(400px);
  transition: all 0.3s ease-in-out;
}

/* Estado visível */
.elemento-animado.mostrar {
  opacity: 1;
  transform: translateX(0);
}
```

### Exemplo: Botão com Hover

```css
.botao-fechar {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  transition: background 0.2s;
}

.botao-fechar:hover {
  background: rgba(255, 255, 255, 0.4);
}
```

---

## 4️⃣ CONCEITOS IMPORTANTES DO DOM

### Criar Elementos

```javascript
// Cria um elemento HTML
const div = document.createElement('div');
const span = document.createElement('span');
const button = document.createElement('button');
```

### Adicionar Classes CSS

```javascript
// Adiciona uma classe
elemento.className = 'minha-classe';

// Adiciona múltiplas classes
elemento.className = 'classe1 classe2';

// Adiciona/remove classes dinamicamente
elemento.classList.add('nova-classe');
elemento.classList.remove('classe-antiga');
elemento.classList.toggle('ativa'); // Alterna (liga/desliga)
```

### Adicionar Conteúdo

```javascript
// Texto simples
elemento.textContent = 'Meu texto';

// HTML (cuidado com segurança!)
elemento.innerHTML = '<strong>Texto em negrito</strong>';

// Adicionar outros elementos dentro
elemento.appendChild(outroElemento);
```

### Adicionar na Página

```javascript
// Adiciona no final do <body>
document.body.appendChild(elemento);

// Adiciona no início do <body>
document.body.insertBefore(elemento, document.body.firstChild);

// Remove da página
elemento.remove();
```

### Adicionar Eventos

```javascript
// Clique
botao.addEventListener('click', () => {
  console.log('Clicou!');
});

// Clique com parâmetro do evento
botao.addEventListener('click', (e) => {
  e.stopPropagation(); // Impede propagação
  console.log('Clicou!');
});

// Mouse sobre o elemento
elemento.addEventListener('mouseenter', () => {
  console.log('Mouse entrou');
});
```

### Estilizar via JavaScript

```javascript
// Estilo inline
elemento.style.backgroundColor = '#FF5722';
elemento.style.color = 'white';
elemento.style.fontSize = '16px';
```

---

## 5️⃣ INSTALANDO A EXTENSÃO

### Chrome/Edge/Brave

1. Abra o navegador e vá para:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`

2. Ative o **"Modo do desenvolvedor"** (canto superior direito)

3. Clique em **"Carregar sem compactação"** ou **"Load unpacked"**

4. Selecione a pasta da sua extensão

5. Pronto! A extensão está ativa

### Recarregar Após Mudanças

Sempre que modificar o código:
1. Vá em `chrome://extensions/`
2. Clique no botão de **recarregar** (🔄) na sua extensão
3. Recarregue a página onde está testando

---

## 6️⃣ EXEMPLO COMPLETO MÍNIMO

### manifest.json
```json
{
  "manifest_version": 3,
  "name": "Exemplo Simples",
  "version": "1.0",
  "description": "Adiciona uma caixa na página",
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "css": ["styles.css"]
    }
  ]
}
```

### content.js
```javascript
// Cria uma caixa
const caixa = document.createElement('div');
caixa.className = 'minha-caixa';
caixa.textContent = 'Olá do DOM!';

// Adiciona na página
document.body.appendChild(caixa);
```

### styles.css
```css
.minha-caixa {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 999999;
}
```

---

## 7️⃣ DICAS IMPORTANTES

### Z-Index Alto
Use `z-index: 999999` para garantir que seu elemento fique por cima de tudo na página.

### Position Fixed
Use `position: fixed` para o elemento ficar fixo na tela mesmo quando rolar a página.

### Pointer Events
Use `pointer-events: auto` para permitir cliques no seu elemento.

### Esperar a Página Carregar
Sempre verifique se a página carregou antes de manipular o DOM:

```javascript
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciar);
} else {
  iniciar();
}
```

### Limitar Sites
Para rodar apenas em sites específicos, mude o `matches`:

```json
"matches": ["https://www.google.com/*", "https://www.youtube.com/*"]
```

---

## 🎯 RESUMO DOS PASSOS

1. **Crie a pasta** com os arquivos necessários
2. **Configure o manifest.json** com as permissões
3. **Escreva o content.js** para criar e adicionar elementos
4. **Estilize no styles.css** com position fixed e z-index alto
5. **Instale a extensão** no navegador em modo desenvolvedor
6. **Teste e ajuste** recarregando a extensão após mudanças

---

## 📚 RECURSOS ADICIONAIS

- **MDN Web Docs - DOM**: https://developer.mozilla.org/pt-BR/docs/Web/API/Document_Object_Model
- **Chrome Extensions Docs**: https://developer.chrome.com/docs/extensions/
- **CSS Position**: https://developer.mozilla.org/pt-BR/docs/Web/CSS/position

---

**Pronto!** Agora você tem tudo que precisa para criar extensões que manipulam o DOM e adicionam elementos nas páginas. 🚀
