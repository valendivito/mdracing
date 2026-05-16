/* ═══════════════════════════════════════════
   MDRACING — Chat Widget (Madi IA)
   ═══════════════════════════════════════════ */

(function () {
  // ── Config ──────────────────────────────────
  const API_URL = '/api/chat';
  const WELCOME  = '¡Hola! Soy **Madi**, la asistente virtual de MDRACING. ¿En qué te puedo ayudar? Podés preguntarme sobre nuestros productos, talles, compatibilidad con tu auto, precios, envíos o cómo comprar.';
  const MOBILE_BP = 600; // px — debe coincidir con el breakpoint del CSS

  // ── State ────────────────────────────────────
  let messages   = [];   // { role: 'user'|'assistant', content: string }[]
  let isOpen     = false;
  let isLoading  = false;
  let _scrollY   = 0;    // para restaurar scroll al cerrar en mobile

  // ── Helpers ──────────────────────────────────
  const isMobile = () => window.innerWidth <= MOBILE_BP;

  // ── Body scroll lock ─────────────────────────
  // Técnica confiable en iOS: fijar el body con position:fixed
  function lockBodyScroll() {
    if (!isMobile()) return;
    _scrollY = window.scrollY;
    document.body.style.position   = 'fixed';
    document.body.style.top        = `-${_scrollY}px`;
    document.body.style.width      = '100%';
    document.body.style.overflowY  = 'scroll'; // evita salto de scroll bar
  }

  function unlockBodyScroll() {
    if (!document.body.style.position) return;
    document.body.style.position  = '';
    document.body.style.top       = '';
    document.body.style.width     = '';
    document.body.style.overflowY = '';
    window.scrollTo(0, _scrollY);
  }

  // ── DOM ──────────────────────────────────────
  function buildWidget() {
    // Backdrop (mobile)
    const backdrop = document.createElement('div');
    backdrop.id = 'md-chat-backdrop';
    backdrop.addEventListener('click', closeChat);

    // Botón flotante
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

    // Ventana
    const win = document.createElement('div');
    win.id = 'md-chat-window';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'Chat con Madi IA — MDRACING');
    win.setAttribute('aria-modal', 'true');
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
      <div id="md-chat-messages" role="log" aria-live="polite" aria-label="Mensajes"></div>
      <div id="md-chat-input-area">
        <textarea
          id="md-chat-input"
          placeholder="Escribí tu consulta..."
          rows="1"
          aria-label="Mensaje"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
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

    document.body.appendChild(backdrop);
    document.body.appendChild(btn);
    document.body.appendChild(win);

    // Eventos
    document.getElementById('md-chat-close').addEventListener('click', closeChat);
    document.getElementById('md-chat-send').addEventListener('click', sendMessage);

    const input = document.getElementById('md-chat-input');

    // Enter envía (Shift+Enter = nueva línea)
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });

    // Auto-resize textarea
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    });

    // En mobile: cuando el teclado virtual aparece, scrollear al fondo y reposicionar
    if ('visualViewport' in window) {
      window.visualViewport.addEventListener('resize', onViewportResize);
      window.visualViewport.addEventListener('scroll', onViewportResize);
    }

    // Mostrar mensaje de bienvenida
    addBotMessage(WELCOME);
  }

  // ── Manejo del teclado virtual (iOS / Android) ──
  // Cuando se abre el teclado en mobile, el visual viewport se achica pero
  // el chat (fixed al bottom del layout viewport) queda tapado por el teclado.
  // Reposicionamos el chat para que se "apoye" sobre el teclado.
  function onViewportResize() {
    if (!isOpen) return;
    if (!isMobile()) return;
    const win = document.getElementById('md-chat-window');
    if (!win) return;
    const vv = window.visualViewport;
    if (!vv) return;
    // Espacio que ocupa el teclado (px que quedan abajo del visual viewport)
    const keyboardSpace = Math.max(0, window.innerHeight - (vv.offsetTop + vv.height));
    // Subimos el chat por encima del teclado
    win.style.bottom = keyboardSpace + 'px';
    // Limitamos la altura al área visible (con un pequeño margen)
    win.style.maxHeight = Math.max(280, vv.height - 8) + 'px';
    requestAnimationFrame(scrollToBottom);
  }

  // Resetea estilos inline aplicados por onViewportResize
  function resetChatWindowPosition() {
    const win = document.getElementById('md-chat-window');
    if (!win) return;
    win.style.bottom = '';
    win.style.maxHeight = '';
  }

  // ── Toggle ───────────────────────────────────
  function toggleChat() { isOpen ? closeChat() : openChat(); }

  function openChat() {
    isOpen = true;
    const win      = document.getElementById('md-chat-window');
    const backdrop = document.getElementById('md-chat-backdrop');

    lockBodyScroll();

    win.classList.add('open');
    if (backdrop) {
      backdrop.style.display = 'block';
      // Trigger reflow para que la transición funcione
      void backdrop.offsetWidth;
      backdrop.classList.add('open');
    }

    // Dar tiempo a la animación antes de hacer focus (evita saltos en mobile)
    setTimeout(() => {
      const input = document.getElementById('md-chat-input');
      if (input) {
        // Listener para reposicionar APENAS el input recibe foco
        // (en algunos casos visualViewport.resize no dispara inmediatamente)
        input.addEventListener('focus', () => {
          // Esperar a que el teclado termine de aparecer
          setTimeout(onViewportResize, 250);
        });
        input.addEventListener('blur', () => {
          // Al perder foco, el teclado se cierra: reseteamos posición
          setTimeout(resetChatWindowPosition, 100);
        });

        if (!isMobile()) input.focus({ preventScroll: true });
      }
      scrollToBottom();
    }, 350);
  }

  function closeChat() {
    isOpen = false;
    const win      = document.getElementById('md-chat-window');
    const backdrop = document.getElementById('md-chat-backdrop');

    // Cerrar el teclado virtual si está abierto
    const input = document.getElementById('md-chat-input');
    if (input) input.blur();

    win.classList.remove('open');
    if (backdrop) {
      backdrop.classList.remove('open');
      // Ocultar backdrop luego de la transición
      setTimeout(() => { backdrop.style.display = ''; }, 300);
    }

    // Reset de posicionamiento por teclado
    resetChatWindowPosition();

    unlockBodyScroll();
  }

  // ── Mensajes ─────────────────────────────────
  function addBotMessage(text) {
    const msgs   = document.getElementById('md-chat-messages');
    const bubble = document.createElement('div');
    bubble.className = 'md-bubble md-bubble-bot';
    bubble.innerHTML = formatMarkdown(text);
    msgs.appendChild(bubble);
    scrollToBottom();
  }

  function addUserMessage(text) {
    const msgs   = document.getElementById('md-chat-messages');
    const bubble = document.createElement('div');
    bubble.className = 'md-bubble md-bubble-user';
    bubble.textContent = text;
    msgs.appendChild(bubble);
    scrollToBottom();
  }

  function showTyping() {
    const msgs   = document.getElementById('md-chat-messages');
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
    if (!msgs) return;
    // requestAnimationFrame asegura que el DOM ya se actualizó
    requestAnimationFrame(() => {
      msgs.scrollTop = msgs.scrollHeight;
    });
  }

  // ── Enviar ───────────────────────────────────
  async function sendMessage() {
    if (isLoading) return;
    const input = document.getElementById('md-chat-input');
    const text  = input.value.trim();
    if (!text) return;

    input.value = '';
    input.style.height = 'auto';

    addUserMessage(text);
    messages.push({ role: 'user', content: text });

    isLoading = true;
    document.getElementById('md-chat-send').disabled = true;
    showTyping();

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

    // Solo hacer focus en desktop para no re-abrir teclado en mobile
    if (!isMobile()) {
      document.getElementById('md-chat-input').focus();
    }
  }

  // ── Markdown básico ──────────────────────────
  function formatMarkdown(text) {
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  // ── API global ───────────────────────────────
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
