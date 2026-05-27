/* ═══════════════════════════════════════════════════════════
   MDRACING — Checkout Modal
   Render inicial completo (los inputs NO se pierden al cambiar opciones).

   API global:
     openCheckout({ id, name, image, unitPrice, variant?, freeShipping? })
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const FREE_SHIPPING_THRESHOLD = 130000;
  const CASH_TRANSFER_DISCOUNT = 0.10; // 10% OFF

  const SHIPPING_ZONES = [
    { id: 'retiro-fabrica',   label: 'Retiro en fábrica',          cost: 0,    sub: 'Villa Ballester, San Martín',                  shortName: 'Fábrica Ballester' },
    { id: 'retiro-local',     label: 'Retiro en local',            cost: 0,    sub: 'Av. Bartolomé Mitre 3495, Munro',              shortName: 'Local Munro' },
    { id: 'caba',             label: 'Envío a CABA',                cost: 5000, sub: 'Ciudad Autónoma de Buenos Aires',              shortName: 'CABA' },
    { id: 'gba-norte-oeste',  label: 'Envío a GBA Norte y Oeste',   cost: 6500, sub: 'San Isidro, Tigre, Morón, etc.',               shortName: 'GBA N/O' },
    { id: 'gba-sur-resto-ba', label: 'Envío a GBA Sur y resto BA',  cost: 7500, sub: 'Quilmes, La Plata, resto de Bs As',            shortName: 'GBA S' },
    { id: 'interior',         label: 'Envío al interior del país',  cost: 9500, sub: 'Resto de Argentina',                           shortName: 'Interior' },
  ];

  function getZoneShortName(id) {
    const z = SHIPPING_ZONES.find(x => x.id === id);
    return z ? z.shortName : '';
  }

  // Datos bancarios reales MDRACING (transferencia o Mercado Pago)
  const BANK_INFO = {
    bank: 'Mercado Pago',
    alias: 'mdracing',
    cbu: '0000003100003718736706',
    holder: 'Miguel Angel Di Vito',
    cuit: '20-22862560-5',
  };

  const WA_NUMBER = '5491154907774';

  // Estado del modal
  // currentItems: array de productos en el checkout.
  // isSingleProduct: true si se abrió desde "Comprar ahora" en ficha de producto (con qty selector).
  //                  false si se abrió desde el carrito (qty fija, ítems múltiples).
  let currentItems = [];
  let isSingleProduct = true;
  let selectedZone = 'retiro-fabrica';
  let selectedPayment = 'card';
  let isSubmitting = false;
  let lastOrderId = null;

  // ─── Estado del cupón ───
  let couponCode = '';         // código ingresado
  let couponData = null;       // { couponId, code, type, value, discountAmount, description }
  let couponValidating = false;

  // ─── Utils ───
  function priceToNumber(p) {
    if (typeof p === 'number') return p;
    if (!p) return 0;
    return parseInt(String(p).replace(/[^\d]/g, ''), 10) || 0;
  }
  function money(n) { return '$' + (Number(n) || 0).toLocaleString('es-AR'); }
  function escapeHtml(s) {
    if (s === null || s === undefined) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function computeSubtotal() {
    return currentItems.reduce((s, it) => s + priceToNumber(it.unitPrice) * (it.qty || 1), 0);
  }

  function qualifiesForFreeShipping() {
    if (!currentItems.length) return false;
    const subtotal = computeSubtotal();
    if (subtotal >= FREE_SHIPPING_THRESHOLD) return true;
    return currentItems.some(it => {
      if (it.freeShipping === true) return true;
      if (priceToNumber(it.unitPrice) >= FREE_SHIPPING_THRESHOLD) return true;
      return false;
    });
  }

  function getShippingCost() {
    const zone = SHIPPING_ZONES.find(z => z.id === selectedZone);
    if (!zone) return 0;
    if (zone.id.startsWith('retiro-')) return 0;
    if (qualifiesForFreeShipping()) return 0;
    return zone.cost;
  }

  function calcTotals() {
    const subtotal = computeSubtotal();
    const shippingCost = getShippingCost();
    const discount = selectedPayment === 'transfer' ? Math.round(subtotal * CASH_TRANSFER_DISCOUNT) : 0;
    const couponDiscount = couponData ? (couponData.discountAmount || 0) : 0;
    const total = subtotal - discount - couponDiscount + shippingCost;
    return { subtotal, discount, couponDiscount, shippingCost, total };
  }

  // ─── DOM (build una sola vez) ───
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
        <h3 id="mdco-title">Finalizar compra</h3>
        <button class="mdco-close" aria-label="Cerrar" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="mdco-body" id="mdco-body"></div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);

    modal.querySelector('.mdco-close').addEventListener('click', closeCheckout);
  }

  // ─── Vista de Checkout (formulario) ───
  function renderCheckoutView() {
    document.getElementById('mdco-title').textContent = 'Finalizar compra';
    const body = document.getElementById('mdco-body');
    body.innerHTML = `
      <div class="mdco-msg" id="mdco-msg"></div>

      <!-- Resumen del producto / productos -->
      ${isSingleProduct ? renderSingleProductSummary() : renderMultiProductSummary()}

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
        <div id="mdco-zones">
          ${SHIPPING_ZONES.map(z => renderZoneCardHTML(z)).join('')}
        </div>

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
          <label>Notas para el envío <span class="opt">(opcional)</span></label>
          <textarea id="mdco-notes" placeholder="Ej: Timbre Depto B, entre 14 y 18hs"></textarea>
        </div>
      </div>

      <!-- Método de pago -->
      <div class="mdco-section">
        <div class="mdco-section-title">3 · Método de pago</div>
        <div id="mdco-payments">
          <label class="mdco-radio-card ${selectedPayment === 'card' ? 'selected' : ''}" data-payment="card">
            <input type="radio" name="mdco-payment" value="card" ${selectedPayment === 'card' ? 'checked' : ''} />
            <div class="mdco-radio-card-content">
              <div class="mdco-radio-card-label">
                <span>Tarjeta de crédito o débito</span>
                <span style="font-size:11px;color:#666;font-weight:500">Mercado Pago</span>
              </div>
              <div class="mdco-radio-card-sub">Pagás online ahora. Cuotas sin interés disponibles según tarjeta.</div>
            </div>
          </label>

          <label class="mdco-radio-card ${selectedPayment === 'transfer' ? 'selected' : ''}" data-payment="transfer">
            <input type="radio" name="mdco-payment" value="transfer" ${selectedPayment === 'transfer' ? 'checked' : ''} />
            <div class="mdco-radio-card-content">
              <div class="mdco-radio-card-label">
                <span>Transferencia o efectivo</span>
                <span style="font-size:11px;color:#22a35e;font-weight:700">10% OFF</span>
              </div>
              <div class="mdco-radio-card-sub">Te mostramos los datos y mandás el comprobante por WhatsApp. Si retirás, podés abonar en efectivo.</div>
            </div>
          </label>
        </div>
      </div>

      <!-- Cupón de descuento -->
      <div class="mdco-section">
        <div class="mdco-section-title">4 · Cupón de descuento <span class="opt">(opcional)</span></div>
        <div class="mdco-coupon-row">
          <input
            type="text"
            id="mdco-coupon-input"
            placeholder="Ej: MDRACING10"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="characters"
            spellcheck="false"
            maxlength="32"
          />
          <button class="mdco-coupon-btn" id="mdco-coupon-btn" type="button">Aplicar</button>
        </div>
        <div class="mdco-coupon-status" id="mdco-coupon-status"></div>
      </div>

      <!-- Totales -->
      <div class="mdco-totals" id="mdco-totals"></div>

      <!-- Submit -->
      <button class="mdco-submit" id="mdco-submit" type="button"></button>

      <p class="mdco-footer-note">
        Datos protegidos · Pago seguro · Garantía 30 días<br>
        ¿Dudas? <a href="https://wa.me/${WA_NUMBER}" target="_blank" style="color:#d10000">Escribinos por WhatsApp</a>
      </p>
    `;

    // ─── Wire up listeners (event delegation amigable) ───

    // Qty +/-
    body.querySelectorAll('[data-qty-delta]').forEach(btn => {
      btn.addEventListener('click', () => updateQty(parseInt(btn.dataset.qtyDelta, 10)));
    });

    // Zones (click en cualquier parte de la card)
    body.querySelectorAll('[data-zone]').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        selectZone(card.dataset.zone);
      });
    });

    // Payments
    body.querySelectorAll('[data-payment]').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        selectPayment(card.dataset.payment);
      });
    });

    // Submit
    document.getElementById('mdco-submit').addEventListener('click', submit);

    // Cupón
    const couponInput = document.getElementById('mdco-coupon-input');
    const couponBtn = document.getElementById('mdco-coupon-btn');

    // Restaurar estado del cupón si ya estaba aplicado
    if (couponCode) couponInput.value = couponCode;
    updateCouponStatusUI();

    couponBtn.addEventListener('click', applyCoupon);
    couponInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); applyCoupon(); }
    });
    // Limpiar cupón si el usuario borra el input
    couponInput.addEventListener('input', () => {
      if (!couponInput.value.trim() && couponData) {
        clearCoupon();
      }
    });

    // Pintar totales y botón inicial
    updateTotalsUI();
    updateSubmitButtonUI();
  }

  function renderSingleProductSummary() {
    const it = currentItems[0];
    return `
      <div class="mdco-product-summary">
        <img src="${escapeHtml(it.image || '/logo.png')}" alt="${escapeHtml(it.name)}" />
        <div class="mdco-product-summary-info">
          <div class="mdco-product-summary-name">${escapeHtml(it.name)}</div>
          ${it.variant ? `<div class="mdco-product-summary-variant">${escapeHtml(it.variant)}</div>` : ''}
          <div class="mdco-product-summary-price">${money(priceToNumber(it.unitPrice))}</div>
        </div>
        <div class="mdco-product-summary-qty">
          <button class="mdco-qty-btn" type="button" data-qty-delta="-1">−</button>
          <span class="mdco-qty-val" id="mdco-qty-val">${it.qty}</span>
          <button class="mdco-qty-btn" type="button" data-qty-delta="1">+</button>
        </div>
      </div>
    `;
  }

  function renderMultiProductSummary() {
    // Lista compacta de productos sin qty selector (qty fija desde carrito)
    return `
      <div class="mdco-multi-summary">
        <div class="mdco-multi-summary-header">${currentItems.length} producto${currentItems.length === 1 ? '' : 's'} en tu pedido</div>
        ${currentItems.map(it => `
          <div class="mdco-multi-item">
            <img src="${escapeHtml(it.image || '/logo.png')}" alt="${escapeHtml(it.name)}" />
            <div class="mdco-multi-item-info">
              <div class="mdco-multi-item-name">${escapeHtml(it.name)}</div>
              ${it.variant ? `<div class="mdco-multi-item-variant">${escapeHtml(it.variant)}</div>` : ''}
            </div>
            <div class="mdco-multi-item-qty-price">
              <div class="mdco-multi-item-qty">×${it.qty}</div>
              <div class="mdco-multi-item-price">${money(priceToNumber(it.unitPrice) * it.qty)}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderZoneCardHTML(zone) {
    const isSelected = selectedZone === zone.id;
    const isPickup = zone.id.startsWith('retiro-');
    const wouldBeFree = !isPickup && qualifiesForFreeShipping();
    const displayPrice = isPickup
      ? 'Sin costo'
      : (wouldBeFree ? 'GRATIS' : money(zone.cost));
    const priceClass = (isPickup || wouldBeFree) ? 'free' : '';

    return `
      <label class="mdco-radio-card ${isSelected ? 'selected' : ''}" data-zone="${zone.id}">
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

  // ─── Updates parciales (NO destructivos: mantienen los inputs) ───

  function updateQty(delta) {
    if (!isSingleProduct) return; // qty selector solo cuando es 1 producto
    const it = currentItems[0];
    it.qty = Math.max(1, Math.min(20, (it.qty || 1) + delta));
    const qtyEl = document.getElementById('mdco-qty-val');
    if (qtyEl) qtyEl.textContent = it.qty;
    repaintZonesPrices();
    updateTotalsUI();
    updateSubmitButtonUI();
  }

  function selectZone(zoneId) {
    selectedZone = zoneId;
    // Cambiar la clase .selected
    document.querySelectorAll('#mdco-zones [data-zone]').forEach(c => {
      const isSel = c.dataset.zone === zoneId;
      c.classList.toggle('selected', isSel);
      const radio = c.querySelector('input[type="radio"]');
      if (radio) radio.checked = isSel;
    });
    // Mostrar/ocultar bloque de dirección
    const addr = document.getElementById('mdco-address-block');
    if (addr) addr.classList.toggle('show', !zoneId.startsWith('retiro-'));
    updateTotalsUI();
    updateSubmitButtonUI();
  }

  function selectPayment(method) {
    selectedPayment = method;
    // Si el botón quedó bloqueado por un submit previo, desbloquear
    if (isSubmitting) resetSubmitState();
    document.querySelectorAll('#mdco-payments [data-payment]').forEach(c => {
      const isSel = c.dataset.payment === method;
      c.classList.toggle('selected', isSel);
      const radio = c.querySelector('input[type="radio"]');
      if (radio) radio.checked = isSel;
    });
    updateTotalsUI();
    updateSubmitButtonUI();
  }

  // ─── Cupón ───

  async function applyCoupon() {
    const input = document.getElementById('mdco-coupon-input');
    if (!input) return;
    const code = input.value.trim().toUpperCase();
    if (!code) {
      clearCoupon();
      return;
    }
    if (couponValidating) return;

    const subtotal = computeSubtotal();
    couponValidating = true;
    const btn = document.getElementById('mdco-coupon-btn');
    if (btn) { btn.disabled = true; btn.textContent = '…'; }

    try {
      const res = await fetch('/api/coupon/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal }),
      });
      const data = await res.json();

      if (data.valid) {
        couponCode = code;
        couponData = data;
      } else {
        couponCode = '';
        couponData = null;
        // Mantener el código en el input para que el usuario lo vea
      }
      updateCouponStatusUI();
      updateTotalsUI();
      updateSubmitButtonUI();
    } catch (e) {
      console.error('[mdco] Error validando cupón:', e);
      updateCouponStatusUI('Error de conexión. Intentá de nuevo.');
    } finally {
      couponValidating = false;
      if (btn) { btn.disabled = false; btn.textContent = couponData ? 'Quitar' : 'Aplicar'; }
    }
  }

  function clearCoupon() {
    couponCode = '';
    couponData = null;
    const input = document.getElementById('mdco-coupon-input');
    if (input) input.value = '';
    const btn = document.getElementById('mdco-coupon-btn');
    if (btn) { btn.textContent = 'Aplicar'; }
    updateCouponStatusUI();
    updateTotalsUI();
    updateSubmitButtonUI();
  }

  function updateCouponStatusUI(errorMsg) {
    const statusEl = document.getElementById('mdco-coupon-status');
    const btn = document.getElementById('mdco-coupon-btn');
    if (!statusEl) return;

    if (errorMsg) {
      statusEl.className = 'mdco-coupon-status error';
      statusEl.textContent = '✕ ' + errorMsg;
      return;
    }

    if (couponData) {
      const { code, type, value, discountAmount, description } = couponData;
      const discLabel = type === 'percent'
        ? `${value}% OFF`
        : `$${(discountAmount || 0).toLocaleString('es-AR')} OFF`;
      statusEl.className = 'mdco-coupon-status success';
      statusEl.innerHTML = `✔ Cupón <strong>${code}</strong> aplicado · ${discLabel}${description ? ` — ${escapeHtml(description)}` : ''}`;
      if (btn) btn.textContent = 'Quitar';
    } else if (couponCode === '' && document.getElementById('mdco-coupon-input')?.value === '') {
      statusEl.className = 'mdco-coupon-status';
      statusEl.textContent = '';
    } else {
      // Hubo intento pero falló
      const lastTried = document.getElementById('mdco-coupon-input')?.value.trim();
      if (lastTried) {
        statusEl.className = 'mdco-coupon-status error';
        statusEl.textContent = '✕ Cupón inválido o no disponible';
      } else {
        statusEl.className = 'mdco-coupon-status';
        statusEl.textContent = '';
      }
    }
  }

  function repaintZonesPrices() {
    // Solo actualiza los precios sin reemplazar el HTML completo (preserva inputs)
    const cards = document.querySelectorAll('#mdco-zones [data-zone]');
    cards.forEach(card => {
      const zone = SHIPPING_ZONES.find(z => z.id === card.dataset.zone);
      const isPickup = zone.id.startsWith('retiro-');
      const wouldBeFree = !isPickup && qualifiesForFreeShipping();
      const priceEl = card.querySelector('.mdco-radio-card-price');
      if (!priceEl) return;
      priceEl.textContent = isPickup
        ? 'Sin costo'
        : (wouldBeFree ? 'GRATIS' : money(zone.cost));
      priceEl.classList.toggle('free', isPickup || wouldBeFree);
    });
  }

  function updateTotalsUI() {
    const t = calcTotals();
    const totalsEl = document.getElementById('mdco-totals');
    if (!totalsEl) return;

    const isPickup = selectedZone.startsWith('retiro-');
    const freeShip = t.shippingCost === 0 && !isPickup;
    const shippingDisplay = isPickup
      ? getZoneShortName(selectedZone)
      : (freeShip ? 'GRATIS' : money(t.shippingCost));

    const discountRow = t.discount > 0
      ? `<div class="mdco-totals-row mdco-totals-discount">
           <span>Descuento 10% OFF (transferencia / efectivo)</span>
           <span>− ${money(t.discount)}</span>
         </div>`
      : '';

    const couponRow = t.couponDiscount > 0 && couponData
      ? `<div class="mdco-totals-row mdco-totals-coupon">
           <span>Cupón <strong>${escapeHtml(couponData.code)}</strong></span>
           <span>− ${money(t.couponDiscount)}</span>
         </div>`
      : '';

    totalsEl.innerHTML = `
      <div class="mdco-totals-row">
        <span>Subtotal</span>
        <span>${money(t.subtotal)}</span>
      </div>
      ${couponRow}
      ${discountRow}
      <div class="mdco-totals-row">
        <span>Envío</span>
        <span class="${(freeShip || isPickup) ? 'mdco-totals-free' : ''}">
          ${shippingDisplay}
        </span>
      </div>
      <div class="mdco-totals-row total">
        <span>Total</span>
        <span>${money(t.total)}</span>
      </div>
    `;
  }

  function updateSubmitButtonUI() {
    const t = calcTotals();
    const btn = document.getElementById('mdco-submit');
    if (!btn) return;
    btn.classList.toggle('cash', selectedPayment === 'transfer');
    if (selectedPayment === 'card') {
      btn.innerHTML = `Pagar ${money(t.total)} con tarjeta`;
    } else {
      btn.innerHTML = `Reservar pedido por ${money(t.total)}`;
    }
  }

  // ─── Submit ───
  async function submit() {
    if (isSubmitting) return;

    // Validar
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
    const t = calcTotals();

    const payload = {
      items: currentItems.map(it => ({
        id: it.id,
        name: it.name,
        variant: it.variant || '',
        qty: it.qty,
        unitPrice: priceToNumber(it.unitPrice),
        freeShipping: it.freeShipping || false,
      })),
      customer: { name, email, phone, dni, cuit },
      shipping: { zone: selectedZone, address, notes },
      paymentMethod: selectedPayment === 'card' ? 'mp' : 'transfer',
      discount: t.discount,
      couponCode: couponCode || null,
    };

    const endpoint = selectedPayment === 'card' ? '/api/checkout' : '/api/order-cash';
    setSubmitting(true);

    // ── Meta: InitiateCheckout (antes del POST y del redirect a MP) ──
    try {
      if (typeof window.mdTrackEvent === 'function') {
        const totalItems = currentItems.reduce((s, it) => s + (it.qty || 1), 0);
        window.mdTrackEvent('InitiateCheckout', {
          content_ids: currentItems.map(it => it.id),
          content_type: 'product',
          num_items: totalItems,
          value: t.total,
          currency: 'ARS',
        }, {
          email: email || undefined,
          phone: phone || undefined,
          firstName: name ? name.split(' ')[0] : undefined,
          lastName: name && name.includes(' ') ? name.split(' ').slice(1).join(' ') : undefined,
        });
      }
    } catch (e) { /* fail-soft */ }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error procesando el pedido');

      if (selectedPayment === 'card') {
        const redirectUrl = data.mode === 'production' ? data.initPoint : data.sandboxInitPoint;
        if (!redirectUrl) throw new Error('No se obtuvo URL de pago');
        showMsg('success', '✅ Redirigiendo a Mercado Pago...');
        setTimeout(() => { window.location.href = redirectUrl; }, 600);
      } else {
        // Pasar a la vista de éxito con datos bancarios + WhatsApp
        lastOrderId = data.orderId;
        renderTransferSuccessView({
          orderId: data.orderId,
          customerName: name,
          total: t.total,
        });
        setSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      showMsg('error', err.message || 'Error procesando el pedido. Probá de nuevo.');
      setSubmitting(false);
    }
  }

  let submitTimeoutId = null;
  function setSubmitting(state) {
    isSubmitting = state;
    if (submitTimeoutId) { clearTimeout(submitTimeoutId); submitTimeoutId = null; }
    const btn = document.getElementById('mdco-submit');
    if (!btn) return;
    if (state) {
      btn.disabled = true;
      btn.innerHTML = '<span class="mdco-spinner"></span> Procesando...';
      // Auto-reset por seguridad si pasaron 30s sin respuesta ni redirect
      // (cubre el caso de timeout de red, error MP, o usuario que vuelve atrás)
      submitTimeoutId = setTimeout(() => {
        if (isSubmitting) {
          console.warn('[mdco] Auto-reset por timeout');
          resetSubmitState();
        }
      }, 30000);
    } else {
      updateSubmitButtonUI();
      btn.disabled = false;
    }
  }

  function resetSubmitState() {
    isSubmitting = false;
    if (submitTimeoutId) { clearTimeout(submitTimeoutId); submitTimeoutId = null; }
    const btn = document.getElementById('mdco-submit');
    if (btn) { btn.disabled = false; }
    updateSubmitButtonUI();
    const msg = document.getElementById('mdco-msg');
    if (msg) msg.className = 'mdco-msg';
  }

  // Detectar cuando el usuario vuelve a la página con el botón "atrás" del
  // browser (después de haber sido redirigido a Mercado Pago). pageshow se
  // dispara con event.persisted=true cuando se restaura desde bfcache.
  window.addEventListener('pageshow', (event) => {
    if (isSubmitting) {
      // El modal quedó en estado "Procesando" pero el usuario está acá de nuevo
      resetSubmitState();
    }
  });

  function showMsg(type, text) {
    const msg = document.getElementById('mdco-msg');
    if (!msg) return alert(text);
    msg.className = 'mdco-msg show ' + type;
    msg.textContent = text;
    const body = document.getElementById('mdco-body');
    if (body) body.scrollTop = 0;
  }

  // ─── Vista de Éxito (transferencia/efectivo) ───
  function renderTransferSuccessView({ orderId, customerName, total }) {
    document.getElementById('mdco-title').textContent = '¡Pedido reservado!';

    const isPickup = selectedZone.startsWith('retiro-');
    const zoneLabel = (SHIPPING_ZONES.find(z => z.id === selectedZone) || {}).label || '';

    const productLines = currentItems.map(it =>
      `- ${it.name}${it.variant ? ' (' + it.variant + ')' : ''} × ${it.qty}`
    ).join('\n');

    const waMsg = encodeURIComponent(
      `Hola! Te paso el comprobante de mi pedido en MDRACING.\n\n` +
      `Pedido: #${orderId}\n` +
      `Productos:\n${productLines}\n` +
      `Total: $${total.toLocaleString('es-AR')}\n` +
      `Entrega: ${zoneLabel}\n` +
      `Cliente: ${customerName}\n\n` +
      `Adjunto el comprobante de transferencia.`
    );

    const body = document.getElementById('mdco-body');
    body.innerHTML = `
      <div style="text-align:center;padding:24px 8px 12px">
        <div style="display:inline-flex;align-items:center;justify-content:center;width:72px;height:72px;border-radius:50%;background:#e6f7ec;margin-bottom:14px">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#22a35e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h2 style="margin:0;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:26px;letter-spacing:.5px">¡Pedido reservado!</h2>
        <p style="margin:8px 0 0;color:#666;font-size:14px">#${escapeHtml(orderId)} · Total ${money(total)}</p>
        <p style="margin:6px 0 0;color:#666;font-size:14px">Te enviamos los detalles por email.</p>
      </div>

      <div style="background:#fff7d9;border:1px solid #ffe178;border-left:4px solid #d4a020;padding:14px 16px;border-radius:8px;margin:16px 0;">
        <p style="margin:0;font-weight:700;color:#5a4400;font-size:14.5px">📌 Para confirmar tu pedido</p>
        <p style="margin:8px 0 0;color:#5a4400;font-size:14px;line-height:1.55">
          ${isPickup ? `
            <strong>Si pagás en efectivo al retirar</strong>, escribinos por WhatsApp para coordinar el retiro.<br>
            <strong>Si elegiste transferencia</strong>, usá los datos de abajo y mandanos el comprobante. Sin el comprobante el pedido no queda confirmado.
          ` : `
            Hacé la transferencia con los datos de abajo y mandanos el comprobante por WhatsApp.<br>
            <strong>Sin el comprobante el pedido no queda confirmado y no podemos despachar el envío.</strong>
          `}
        </p>
      </div>

      <div style="background:#f6f6f8;padding:18px;border-radius:10px;margin-bottom:16px">
        <div style="font-family:'Inter',sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#d10000;margin-bottom:12px">
          🏦 Datos para transferir
        </div>
        ${renderBankRow('Banco', BANK_INFO.bank)}
        ${renderBankRow('Alias', BANK_INFO.alias)}
        ${renderBankRow('CBU/CVU', BANK_INFO.cbu)}
        ${renderBankRow('Titular', BANK_INFO.holder)}
        ${renderBankRow('CUIT', BANK_INFO.cuit)}
        <div style="margin-top:14px;padding:12px;background:#fff;border-radius:6px;display:flex;justify-content:space-between;align-items:center;font-weight:700;font-size:15px">
          <span>Monto a transferir</span>
          <span style="color:#d10000;font-family:'Barlow Condensed',sans-serif;font-size:20px">${money(total)}</span>
        </div>
      </div>

      <a href="https://wa.me/${WA_NUMBER}?text=${waMsg}"
         target="_blank" rel="noopener"
         style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;background:#25d366;color:#fff;padding:18px 24px;border-radius:10px;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:17px;letter-spacing:1.5px;text-transform:uppercase;text-decoration:none;box-shadow:0 8px 24px rgba(37,211,102,.35);transition:all .25s">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059M12 0C5.373 0 0 5.373 0 12c0 2.115.547 4.097 1.508 5.83L0 24l6.336-1.488A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
        Enviar comprobante por WhatsApp
      </a>

      <p style="text-align:center;color:#666;font-size:12px;margin:14px 0 0;line-height:1.6">
        Si pagás en efectivo al retirar, solo escribinos para coordinar.<br>
        ¿Consultas? WhatsApp <a href="https://wa.me/${WA_NUMBER}" style="color:#d10000">+54 9 11 5490-7774</a>
      </p>

      <button type="button" id="mdco-close-success"
        style="display:block;margin:18px auto 0;background:transparent;border:1.5px solid #ddd;color:#666;padding:10px 24px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:500">
        Cerrar
      </button>
    `;

    document.getElementById('mdco-close-success').addEventListener('click', closeCheckout);

    // Scroll arriba del modal
    body.scrollTop = 0;
  }

  function renderBankRow(label, value) {
    return `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px dashed rgba(0,0,0,.08);gap:12px">
        <span style="font-size:13px;color:#666">${escapeHtml(label)}</span>
        <button type="button" onclick="navigator.clipboard.writeText('${escapeHtml(value).replace(/'/g, "\\'")}').then(()=>this.querySelector('span').textContent='✓ Copiado')"
          style="background:transparent;border:none;cursor:pointer;font-family:monospace;font-size:14px;font-weight:700;color:#0a0a0a;display:flex;align-items:center;gap:8px;padding:0;text-align:right">
          <span>${escapeHtml(value)}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        </button>
      </div>
    `;
  }

  // ─── API Pública ───
  // Acepta:
  //   openCheckout({ id, name, image, unitPrice, ... })  → single product con qty selector
  //   openCheckout([{...},{...}])                         → multi product (sin qty selector)
  //   openCheckout({ items: [...] })                      → multi product (sin qty selector)
  window.openCheckout = function (input) {
    let items = [];
    let single = false;

    if (Array.isArray(input)) {
      items = input;
      single = false;
    } else if (input && Array.isArray(input.items)) {
      items = input.items;
      single = false;
    } else if (input && input.id && input.name && input.unitPrice) {
      items = [{ ...input, qty: input.qty || 1 }];
      single = true;
    } else {
      console.error('openCheckout: input inválido', input);
      return;
    }

    // Normalizar items
    currentItems = items
      .filter(it => it && it.id && it.name && it.unitPrice)
      .map(it => ({
        id: it.id,
        name: it.name,
        image: it.image || '/logo.png',
        variant: it.variant || '',
        unitPrice: priceToNumber(it.unitPrice),
        qty: parseInt(it.qty, 10) || 1,
        freeShipping: it.freeShipping || false,
      }));

    if (!currentItems.length) {
      console.error('openCheckout: no hay items válidos');
      return;
    }

    isSingleProduct = single;
    selectedZone = 'retiro-fabrica';
    selectedPayment = 'card';
    isSubmitting = false;
    lastOrderId = null;
    // Reset cupón al abrir un nuevo checkout
    couponCode = '';
    couponData = null;
    couponValidating = false;

    buildModal();
    renderCheckoutView();

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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('mdco-modal');
      if (modal && modal.classList.contains('open')) closeCheckout();
    }
  });
})();
