/* ═══════════════════════════════════════════
   MDRACING — Chat Widget (Madi IA)
   ═══════════════════════════════════════════ */

(function () {
  // ── Config ──────────────────────────────────
  const API_URL = '/api/chat';
  const WELCOME  = '¡Hola! Soy **Madi**, la asistente virtual de MDRACING. ¿En qué te puedo ayudar? Podés preguntarme sobre nuestros productos, talles, compatibilidad con tu auto, precios, envíos o cómo comprar.';

  // ── State ────────────────────────────────────
  let messages  = [];   // { role: 'user'|'assistant', content: string }[]
  let isOpen    = false;
  let isLoading = false;

  // ── DOM ──────────────────────────────────────
  function buildWidget() {
    // Button
    const btn = document.createElement('button');
    btn.id = 'md-chat-btn';
    btn.setAttribute('aria-label', 'Abrir chat con Madi IA');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <rect x="4" y="8" width="16" height="12" rx="3"/>
        <path d="M12 4v4"/>
        <circle cx="12" cy="3" r="1.2" fill="currentColor" stroke="none"/>
        <circle cx="9" cy="14" r="1.3" fill="currentColor" stroke="none"/>
        <circle cx="15" cy="14" r="1.3" fill="currentColor" stroke="none"/>
        <path d="M9 17.5h6"/>
        <line x1="2" y1="13" x2="4" y2="13"/>
        <line x1="20" y1="13" x2="22" y2="13"/>
      </svg>`;
    btn.addEventListener('click', toggleChat);

    // Window
    const win = document.createElement('div');
    win.id = 'md-chat-window';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'Chat con Madi IA — MDRACING');
    win.innerHTML = `
      <div id="md-chat-header">
        <div id="md-chat-header-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="8" width="16" height="12" rx="3"/>
            <path d="M12 4v4"/>
            <circle cx="12" cy="3" r="1.2" fill="white" stroke="none"/>
            <circle cx="9" cy="14" r="1.3" fill="white" stroke="none"/>
            <circle cx="15" cy="14" r="1.3" fill="white" stroke="none"/>
            <path d="M9 17.5h6"/>
            <line x1="2" y1="13" x2="4" y2="13"/>
            <line x1="20" y1="13" x2="22" y2="13"/>
          </svg>
        </div>
        <div id="md-chat-header-info">
          <div id="md-chat-header-name">Madi — MDRACING</div>
          <div id="md-chat-header-status">En línea</div>
        </div>
        <button id="md-chat-close" aria-label="Cerrar chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div id="md-chat-messages"></div>
      <div id="md-chat-input-area">
        <textarea
          id="md-chat-input"
          placeholder="Escribí tu consulta..."
          rows="1"
          aria-label="Mensaje"
        ></textarea>
        <button id="md-chat-send" aria-label="Enviar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
      <div id="md-chat-footer">Madi puede cometer errores. Para casos especiales, consultá por WhatsApp.</div>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(win);

    // Events
    document.getElementById('md-chat-close').addEventListener('click', closeChat);
    document.getElementById('md-chat-send').addEventListener('click', sendMessage);

    const input = document.getElementById('md-chat-input');
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    });

    // Show welcome message
    addBotMessage(WELCOME);
  }

  // ── Toggle ───────────────────────────────────
  function toggleChat() { isOpen ? closeChat() : openChat(); }

  function openChat() {
    isOpen = true;
    document.getElementById('md-chat-window').classList.add('open');
    setTimeout(() => document.getElementById('md-chat-input').focus(), 300);
  }

  function closeChat() {
    isOpen = false;
    document.getElementById('md-chat-window').classList.remove('open');
  }

  // ── Messages ─────────────────────────────────
  function addBotMessage(text) {
    const msgs = document.getElementById('md-chat-messages');
    const bubble = document.createElement('div');
    bubble.className = 'md-bubble md-bubble-bot';
    bubble.innerHTML = formatMarkdown(text);
    msgs.appendChild(bubble);
    scrollToBottom();
  }

  function addUserMessage(text) {
    const msgs = document.getElementById('md-chat-messages');
    const bubble = document.createElement('div');
    bubble.className = 'md-bubble md-bubble-user';
    bubble.textContent = text;
    msgs.appendChild(bubble);
    scrollToBottom();
  }

  function showTyping() {
    const msgs = document.getElementById('md-chat-messages');
    const typing = document.createElement('div');
    typing.className = 'md-bubble md-bubble-bot md-typing';
    typing.id = 'md-typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(typing);
    scrollToBottom();
    return typing;
  }

  function removeTyping() {
    const t = document.getElementById('md-typing-indicator');
    if (t) t.remove();
  }

  function scrollToBottom() {
    const msgs = document.getElementById('md-chat-messages');
    msgs.scrollTop = msgs.scrollHeight;
  }

  // ── Send ─────────────────────────────────────
  async function sendMessage() {
    if (isLoading) return;
    const input = document.getElementById('md-chat-input');
    const text  = input.value.trim();
    if (!text) return;

    // Clear input
    input.value = '';
    input.style.height = 'auto';

    // Add user bubble
    addUserMessage(text);
    messages.push({ role: 'user', content: text });

    // Loading state
    isLoading = true;
    document.getElementById('md-chat-send').disabled = true;
    const typing = showTyping();

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });

      const data = await res.json();
      removeTyping();

      if (res.ok && data.message) {
        messages.push({ role: 'assistant', content: data.message });
        addBotMessage(data.message);
      } else {
        addBotMessage('Hubo un problema al conectarme. Por favor intentá de nuevo o contactanos por WhatsApp.');
      }
    } catch {
      removeTyping();
      addBotMessage('No pude conectarme. Verificá tu conexión o escribinos por WhatsApp al +54 9 11 5490-7774.');
    }

    isLoading = false;
    document.getElementById('md-chat-send').disabled = false;
    document.getElementById('md-chat-input').focus();
  }

  // ── Markdown básico ──────────────────────────
  function formatMarkdown(text) {
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  // ── API global para abrir el chat desde otros botones ──
  window.openMadiChat = function () {
    if (!document.getElementById('md-chat-window')) buildWidget();
    openChat();
  };

  // ── Init ─────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }
})();
