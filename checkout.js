/* ═══════════════════════════════════════════════════════════
   MDRACING — Checkout Modal
   Modal de compra directa con Mercado Pago o reserva con efectivo.

   API global:
     openCheckout({
       id, name, image, unitPrice, variant?, freeShipping?
     })
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const FREE_SHIPPING_THRESHOLD = 130000;

  const SHIPPING_ZONES = [
    { id: 'retiro-fabrica',   label: 'Retiro en fábrica',          cost: 0,    sub: 'Villa Ballester, San Martín' },
    { id: 'retiro-local',     label: 'Retiro en local',            cost: 0,    sub: 'Av. Bartolomé Mitre 3495, Munro' },
    { id: 'caba',             label: 'Envío a CABA',                cost: 5000, sub: 'Ciudad Autónoma de Buenos Aires' },
    { id: 'gba-norte-oeste',  label: 'Envío a GBA Norte y Oeste',   cost: 6500, sub: 'San Isidro, Tigre, Morón, etc.' },
    { id: 'gba-sur-resto-ba', label: 'Envío a GBA Sur y resto BA',  cost: 7500, sub: 'Quilmes, La Plata, resto de Bs As' },
    { id: 'interior',         label: 'Envío al interior del país',  cost: 9500, sub: 'Resto de Argentina' },
  ];

  // Estado del modal actual
  let currentItem = null;
  let currentQty = 1;
  let selectedZone = 'retiro-fabrica';
  let selectedPayment = 'mp';
  let isSubmitting = false;

  function priceToNumber(p) {
    if (typeof p === 'number') return p;
    if (!p) return 0;
    return parseInt(String(p).replace(/[^\d]/g, ''), 10) || 0;
  }

  function money(n) {
    return '$' + (Number(n) || 0).toLocaleString('es-AR');
  }

  function qualifiesForFreeShipping() {
    if (!currentItem) return false;
    const unit = priceToNumber(currentItem.unitPrice);
    const total = unit * currentQty;
    if (total >= FREE_SHIPPING_THRESHOLD) return true;
    if (unit >= FREE_SHIPPING_THRESHOLD) return true;
    if (currentItem.freeShipping === true) return true;
    return false;
  }

  function getShippingCost() {
    const zone = SHIPPING_ZONES.find(z => z.id === selectedZone);
    if (!zone) return 0;
    if (zone.id.startsWith('retiro-')) return 0;
    if (qualifiesForFreeShipping()) return 0;
    return zone.cost;
  }

  function calcTotals() {
    const unit = priceToNumber(currentItem.unitPrice);
    const subtotal = unit * currentQty;
    const shippingCost = getShippingCost();
    const total = subtotal + shippingCost;
    return { subtotal, shippingCost, total };
  }

  // ─── Construir DOM ───
  function buildModal() {
    if (document.getElementById('mdco-modal')) return;

    const backdrop = document.createElement('div');
    backdrop.id = 'mdco-backdrop';
    backdrop.addEventListener('click', closeCheckout);

    const modal = document.createElement('div');
    modal.id = 'mdco-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Finalizar compra');
    modal.innerHTML = `
      <div class="mdco-header">
        <h3>Finalizar compra</h3>
        <button class="mdco-close" aria-label="Cerrar" onclick="closeCheckout()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="mdco-body" id="mdco-body"></div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);
  }

  function renderBody() {
    const t = calcTotals();
    const free = getShippingCost() === 0 && !selectedZone.startsWith('retiro-');

    const body = document.getElementById('mdco-body');
    body.innerHTML = `
      <!-- Mensajes -->
      <div class="mdco-msg" id="mdco-msg"></div>

      <!-- Resumen del producto -->
      <div class="mdco-product-summary">
        <img src="${currentItem.image || '/logo.png'}" alt="${escapeHtml(currentItem.name)}" />
        <div class="mdco-product-summary-info">
          <div class="mdco-product-summary-name">${escapeHtml(currentItem.name)}</div>
          ${currentItem.variant ? `<div class="mdco-product-summary-variant">${escapeHtml(currentItem.variant)}</div>` : ''}
          <div class="mdco-product-summary-price">${money(priceToNumber(currentItem.unitPrice))}</div>
        </div>
        <div class="mdco-product-summary-qty">
          <button class="mdco-qty-btn" onclick="mdcoChangeQty(-1)" ${currentQty <= 1 ? 'disabled' : ''}>−</button>
          <span class="mdco-qty-val">${currentQty}</span>
          <button class="mdco-qty-btn" onclick="mdcoChangeQty(1)" ${currentQty >= 20 ? 'disabled' : ''}>+</button>
        </div>
      </div>

      <!-- Datos del cliente -->
      <div class="mdco-section">
        <div class="mdco-section-title">1 · Tus datos</div>
        <div class="mdco-field">
          <label>Nombre y apellido</label>
          <input type="text" id="mdco-name" placeholder="Juan Pérez" autocomplete="name" required />
        </div>
        <div class="mdco-grid-2">
          <div class="mdco-field">
            <label>Email</label>
            <input type="email" id="mdco-email" placeholder="tu@email.com" autocomplete="email" required />
          </div>
          <div class="mdco-field">
            <label>Teléfono / WhatsApp</label>
            <input type="tel" id="mdco-phone" placeholder="11 1234-5678" autocomplete="tel" required />
          </div>
        </div>
        <div class="mdco-grid-2">
          <div class="mdco-field">
            <label>DNI <span class="opt">(opcional)</span></label>
            <input type="text" id="mdco-dni" placeholder="20.123.456" inputmode="numeric" />
          </div>
          <div class="mdco-field">
            <label>CUIT <span class="opt">(opcional, para factura A)</span></label>
            <input type="text" id="mdco-cuit" placeholder="20-12345678-9" />
          </div>
        </div>
      </div>

      <!-- Envío -->
      <div class="mdco-section">
        <div class="mdco-section-title">2 · Envío</div>
        ${SHIPPING_ZONES.map(z => renderZoneCard(z)).join('')}

        <div id="mdco-address-block" class="${selectedZone.startsWith('retiro-') ? '' : 'show'}">
          <div class="mdco-field">
            <label>Calle y número</label>
            <input type="text" id="mdco-street" placeholder="Av. Siempreviva 742" autocomplete="street-address" />
          </div>
          <div class="mdco-grid-2">
            <div class="mdco-field">
              <label>Ciudad / Localidad</label>
              <input type="text" id="mdco-city" placeholder="Munro" autocomplete="address-level2" />
            </div>
            <div class="mdco-field">
              <label>Provincia</label>
              <input type="text" id="mdco-province" placeholder="Buenos Aires" autocomplete="address-level1" />
            </div>
          </div>
          <div class="mdco-field">
            <label>Código postal <span class="opt">(opcional)</span></label>
            <input type="text" id="mdco-postal" placeholder="1605" inputmode="numeric" />
          </div>
        </div>

        <div class="mdco-field" style="margin-top:12px">
          <label>Notas para el envío <span class="opt">(opcional — timbre, piso, indicaciones)</span></label>
          <textarea id="mdco-notes" placeholder="Ej: Timbre Depto B, entre 14 y 18hs"></textarea>
        </div>
      </div>

      <!-- Totales -->
      <div class="mdco-totals">
        <div class="mdco-totals-row">
          <span>Subtotal</span>
          <span>${money(t.subtotal)}</span>
        </div>
        <div class="mdco-totals-row">
          <span>Envío</span>
          <span class="${free || selectedZone.startsWith('retiro-') ? 'mdco-totals-free' : ''}">
            ${t.shippingCost === 0 ? 'GRATIS' : money(t.shippingCost)}
          </span>
        </div>
        <div class="mdco-totals-row total">
          <span>Total</span>
          <span>${money(t.total)}</span>
        </div>
      </div>

      <!-- Método de pago -->
      <div class="mdco-section">
        <div class="mdco-section-title">3 · Método de pago</div>

        <label class="mdco-radio-card ${selectedPayment === 'mp' ? 'selected' : ''}" onclick="mdcoSelectPayment('mp')">
          <input type="radio" name="mdco-payment" value="mp" ${selectedPayment === 'mp' ? 'checked' : ''} />
          <div class="mdco-radio-card-content">
            <div class="mdco-radio-card-label">
              <span>Mercado Pago</span>
              <span style="font-size:11px;color:#666;font-weight:500">+ tarjetas, efectivo, transferencia</span>
            </div>
            <div class="mdco-radio-card-sub">Pagás online ahora. Cuotas sin interés disponibles según tarjeta.</div>
          </div>
        </label>

        <label class="mdco-radio-card ${selectedPayment === 'cash' ? 'selected' : ''}" onclick="mdcoSelectPayment('cash')">
          <input type="radio" name="mdco-payment" value="cash" ${selectedPayment === 'cash' ? 'checked' : ''} />
          <div class="mdco-radio-card-content">
            <div class="mdco-radio-card-label">
              <span>Efectivo / Transferencia</span>
              <span style="font-size:11px;color:#22a35e;font-weight:700">10% OFF</span>
            </div>
            <div class="mdco-radio-card-sub">Reservás el pedido. Te contactamos por WhatsApp para coordinar pago y entrega.</div>
          </div>
        </label>
      </div>

      <!-- Botón submit -->
      <button class="mdco-submit ${selectedPayment === 'cash' ? 'cash' : ''}" id="mdco-submit" onclick="mdcoSubmit()">
        ${selectedPayment === 'mp'
          ? `Pagar ${money(t.total)} con Mercado Pago`
          : `Reservar pedido por ${money(t.total)}`}
      </button>

      <p class="mdco-footer-note">
        Datos protegidos · Pago seguro · Garantía 30 días<br>
        ¿Dudas? <a href="https://wa.me/5491154907774" target="_blank" style="color:#d10000">Escribinos por WhatsApp</a>
      </p>
    `;
  }

  function renderZoneCard(zone) {
    const isSelected = selectedZone === zone.id;
    const isPickup = zone.id.startsWith('retiro-');
    const wouldBeFree = !isPickup && qualifiesForFreeShipping();
    const displayPrice = isPickup
      ? 'GRATIS'
      : wouldBeFree
      ? 'GRATIS'
      : money(zone.cost);
    const priceClass = isPickup || wouldBeFree ? 'free' : '';

    return `
      <label class="mdco-radio-card ${isSelected ? 'selected' : ''}" onclick="mdcoSelectZone('${zone.id}')">
        <input type="radio" name="mdco-zone" value="${zone.id}" ${isSelected ? 'checked' : ''} />
        <div class="mdco-radio-card-content">
          <div class="mdco-radio-card-label">
            <span>${zone.label}</span>
            <span class="mdco-radio-card-price ${priceClass}">${displayPrice}</span>
          </div>
          <div class="mdco-radio-card-sub">${zone.sub}</div>
        </div>
      </label>
    `;
  }

  function escapeHtml(s) {
    if (s === null || s === undefined) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ─── Handlers globales ───
  window.mdcoChangeQty = function (delta) {
    currentQty = Math.max(1, Math.min(20, currentQty + delta));
    renderBody();
  };

  window.mdcoSelectZone = function (zoneId) {
    selectedZone = zoneId;
    renderBody();
  };

  window.mdcoSelectPayment = function (method) {
    selectedPayment = method;
    renderBody();
  };

  window.mdcoSubmit = async function () {
    if (isSubmitting) return;

    // Validar formulario
    const name = document.getElementById('mdco-name').value.trim();
    const email = document.getElementById('mdco-email').value.trim();
    const phone = document.getElementById('mdco-phone').value.trim();
    const dni = document.getElementById('mdco-dni').value.trim();
    const cuit = document.getElementById('mdco-cuit').value.trim();

    if (!name) return showMsg('error', 'Ingresá tu nombre y apellido');
    if (!email || !/^.+@.+\..+$/.test(email)) return showMsg('error', 'Ingresá un email válido');
    if (!phone || phone.replace(/\D/g, '').length < 8) return showMsg('error', 'Ingresá un teléfono válido');

    const isPickup = selectedZone.startsWith('retiro-');
    const address = isPickup ? null : {
      street: document.getElementById('mdco-street').value.trim(),
      city: document.getElementById('mdco-city').value.trim(),
      province: document.getElementById('mdco-province').value.trim(),
      postal: document.getElementById('mdco-postal').value.trim(),
    };
    if (!isPickup) {
      if (!address.street || !address.city || !address.province) {
        return showMsg('error', 'Completá la dirección de envío');
      }
    }

    const notes = document.getElementById('mdco-notes').value.trim();

    const payload = {
      items: [{
        id: currentItem.id,
        name: currentItem.name,
        variant: currentItem.variant || '',
        qty: currentQty,
        unitPrice: priceToNumber(currentItem.unitPrice),
        freeShipping: currentItem.freeShipping || false,
      }],
      customer: { name, email, phone, dni, cuit },
      shipping: { zone: selectedZone, address, notes },
    };

    const endpoint = selectedPayment === 'mp' ? '/api/checkout' : '/api/order-cash';

    setSubmitting(true);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error procesando el pedido');
      }

      if (selectedPayment === 'mp') {
        // Redirigir a MP — usar sandbox si estamos en modo test
        const redirectUrl = data.mode === 'production' ? data.initPoint : data.sandboxInitPoint;
        if (!redirectUrl) throw new Error('No se obtuvo URL de pago');
        showMsg('success', '✅ Redirigiendo a Mercado Pago...');
        setTimeout(() => { window.location.href = redirectUrl; }, 600);
      } else {
        // Reserva con efectivo
        showMsg('success', `✅ ¡Pedido reservado! Te enviamos un email a ${email} con los detalles. Te contactamos por WhatsApp.`);
        setSubmitting(false);
        // Cerrar modal después de 4 segundos
        setTimeout(() => { closeCheckout(); }, 4000);
      }
    } catch (err) {
      console.error(err);
      showMsg('error', err.message || 'Error procesando el pedido. Probá de nuevo.');
      setSubmitting(false);
    }
  };

  function setSubmitting(state) {
    isSubmitting = state;
    const btn = document.getElementById('mdco-submit');
    if (!btn) return;
    if (state) {
      btn.disabled = true;
      btn.innerHTML = '<span class="mdco-spinner"></span> Procesando...';
    } else {
      renderBody(); // re-render normal
    }
  }

  function showMsg(type, text) {
    const msg = document.getElementById('mdco-msg');
    if (!msg) return alert(text);
    msg.className = 'mdco-msg show ' + type;
    msg.textContent = text;
    // Scroll al mensaje
    const body = document.getElementById('mdco-body');
    if (body) body.scrollTop = 0;
  }

  // ─── API Pública ───
  window.openCheckout = function (item) {
    if (!item || !item.id || !item.name || !item.unitPrice) {
      console.error('openCheckout: item incompleto', item);
      return;
    }
    currentItem = item;
    currentQty = 1;
    selectedZone = 'retiro-fabrica';
    selectedPayment = 'mp';
    isSubmitting = false;

    buildModal();
    renderBody();

    const backdrop = document.getElementById('mdco-backdrop');
    const modal = document.getElementById('mdco-modal');
    backdrop.classList.add('open');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeCheckout = function () {
    const backdrop = document.getElementById('mdco-backdrop');
    const modal = document.getElementById('mdco-modal');
    if (backdrop) backdrop.classList.remove('open');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('mdco-modal');
      if (modal && modal.classList.contains('open')) closeCheckout();
    }
  });
})();
