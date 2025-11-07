# Monitor de Página - Extensão de Navegador

Extensão que monitora elementos da página e exibe mensagens personalizadas.

## Como Instalar

### Chrome/Edge/Brave

1. Abra o navegador e vá para:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`

2. Ative o "Modo do desenvolvedor" (canto superior direito)

3. Clique em "Carregar sem compactação" ou "Load unpacked"

4. Selecione a pasta desta extensão

5. A extensão estará ativa!

## Como Usar

A extensão monitora automaticamente todos os sites que você visita.

### Adicionar Novas Regras

Edite o arquivo `content.js` e adicione novas regras no array `regras`:

```javascript
{
  seletor: 'input.meu-campo',           // Seletor CSS do elemento
  valorEsperado: 'TEXTO PARA DETECTAR', // Texto que ativa a notificação
  mensagem: 'Sua mensagem aqui',        // Mensagem a exibir
}
```

### Exemplos de Seletores

- `'input'` - Todos os inputs
- `'input[name="campo"]'` - Input com nome específico
- `'.classe'` - Elementos com uma classe
- `'#id'` - Elemento com ID específico
- `'div.produto span.preco'` - Seletores combinados

## Personalização

- **Posição**: Edite `styles.css` (propriedades `top`, `right`, `bottom`, `left`)
- **Ícone**: Substitua `icon.png` por sua própria imagem (128x128px)

## Observações

- A extensão funciona em todas as páginas por padrão
- Para limitar a sites específicos, edite `matches` no `manifest.json`
