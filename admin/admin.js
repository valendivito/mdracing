/* ═══════════════════════════════════════════════════════════
   MDRACING — Admin Panel JS
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Estado ──
  let currentView = 'login';
  let ordersCache = [];
  let pageOffset = 0;
  const PAGE_SIZE = 30;
  let totalOrders = 0;
  let currentOrderId = null;

  // ── Utils ──
  function money(n) { return '$' + (Number(n) || 0).toLocaleString('es-AR'); }

  function fmtDate(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
  }
  function fmtDateShort(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' });
  }

  function escHtml(s) {
    if (s == null) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function statusBadge(status) {
    const map = {
      pending:    { c: 'pending',    t: 'Pendiente' },
      preparing:  { c: 'preparing',  t: 'Preparando' },
      shipped:    { c: 'shipped',    t: 'Enviado' },
      delivered:  { c: 'delivered',  t: 'Entregado' },
      cancelled:  { c: 'cancelled',  t: 'Cancelado' },
    };
    const e = map[status] || { c: 'pending', t: status || '?' };
    return `<span class="ad-badge ad-badge-${e.c}">${e.t}</span>`;
  }

  function paymentBadge(status, method) {
    const labels = {
      approved: 'Pagado',
      pending: 'Pendiente',
      reserved: 'Reservado',
      rejected: 'Rechazado',
      cancelled: 'Cancelado',
      in_process: 'En proceso',
    };
    const t = labels[status] || status || '?';
    let cls = 'pending';
    if (status === 'approved') cls = 'approved';
    else if (status === 'reserved') cls = 'reserved';
    else if (status === 'rejected' || status === 'cancelled') cls = 'rejected';
    const m = method === 'mp' ? 'MP' : method === 'transfer' ? 'Transf' : method === 'cash' ? 'Efectivo' : (method || '');
    return `<span class="ad-badge ad-badge-pay-${cls}">${t}</span> <span class="ad-method">${m}</span>`;
  }

  function methodLabel(m) {
    if (m === 'mp') return 'Mercado Pago';
    if (m === 'transfer') return 'Transferencia / Efectivo (10% OFF)';
    if (m === 'cash') return 'Efectivo';
    return m || '—';
  }

  function fulfillmentLabel(s) {
    return ({
      pending: 'Pendiente',
      preparing: 'Preparando',
      shipped: 'Enviado',
      delivered: 'Entregado',
      cancelled: 'Cancelado',
    })[s] || s;
  }

  function paymentStatusLabel(s) {
    return ({
      approved: 'Pagado',
      pending: 'Pendiente',
      reserved: 'Reservado (efectivo/transferencia)',
      rejected: 'Rechazado',
      cancelled: 'Cancelado',
      in_process: 'En proceso',
    })[s] || s;
  }

  function toast(msg, type) {
    const el = document.getElementById('ad-toast');
    el.className = 'ad-toast' + (type ? ' ' + type : '');
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(window.__adToastTo);
    window.__adToastTo = setTimeout(() => { el.hidden = true; }, 3000);
  }

  // ── API helper ──
  async function api(path, opts = {}) {
    const res = await fetch(path, {
      ...opts,
      headers: {
        'Content-Type': 'application/json',
        ...(opts.headers || {}),
      },
      credentials: 'same-origin',
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      // 401 → kick a login
      if (res.status === 401) {
        switchView('login');
        toast('Sesión expirada. Ingresá de nuevo.', 'error');
      }
      throw new Error(data.error || 'Error');
    }
    return data;
  }

  // ── View switching ──
  function switchView(v) {
    currentView = v;
    document.querySelectorAll('.ad-view').forEach(x => x.hidden = true);
    if (v === 'login') {
      document.getElementById('app-shell').hidden = true;
      document.getElementById('view-login').hidden = false;
      return;
    }
    document.getElementById('app-shell').hidden = false;
    document.getElementById('view-' + v).hidden = false;
    // Highlight nav
    document.querySelectorAll('.ad-nav-link').forEach(a => {
      a.classList.toggle('active', a.dataset.view === v);
    });
    // Update hash
    if (location.hash.slice(1) !== v) {
      history.replaceState(null, '', '#' + v);
    }
  }

  // ── LOGIN ──
  async function handleLogin(e) {
    e.preventDefault();
    const password = document.getElementById('login-password').value;
    const msgEl = document.getElementById('login-msg');
    const btn = document.getElementById('login-submit');
    msgEl.className = 'ad-msg';
    btn.disabled = true;
    btn.textContent = 'Ingresando…';
    try {
      await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ password }) });
      bootstrap();
    } catch (err) {
      msgEl.className = 'ad-msg show error';
      msgEl.textContent = err.message || 'Error al ingresar';
      btn.disabled = false;
      btn.textContent = 'Ingresar';
    }
  }

  async function handleLogout() {
    try { await api('/api/admin/logout', { method: 'POST' }); } catch (e) {}
    switchView('login');
  }

  // ── DASHBOARD ──
  async function loadDashboard() {
    try {
      const [stats, recent] = await Promise.all([
        api('/api/admin/stats'),
        api('/api/admin/orders?limit=5'),
      ]);
      // KPIs
      document.getElementById('kpi-day-count').textContent = stats.day.count;
      document.getElementById('kpi-day-revenue').textContent = money(stats.day.revenue);
      document.getElementById('kpi-week-count').textContent = stats.week.count;
      document.getElementById('kpi-week-revenue').textContent = money(stats.week.revenue);
      document.getElementById('kpi-month-count').textContent = stats.month.count;
      document.getElementById('kpi-month-revenue').textContent = money(stats.month.revenue);

      // Pending grid
      const pendingTypes = [
        { key: 'pending',    label: 'Pendientes',  desc: 'esperando preparación' },
        { key: 'preparing',  label: 'Preparando',  desc: 'en proceso' },
        { key: 'shipped',    label: 'Enviados',    desc: 'en camino' },
      ];
      const pg = document.getElementById('pending-grid');
      pg.innerHTML = pendingTypes.map(p => `
        <div class="ad-pending-card" onclick="filterByStatus('${p.key}')">
          <div class="ad-pending-card-label">${p.label}</div>
          <div class="ad-pending-card-num">${stats.pendingByStatus[p.key] || 0}</div>
        </div>
      `).join('');

      // Recent orders mini table
      renderOrdersTable(recent.orders, document.getElementById('dashboard-recent'));

      // Sidebar badge: total pendientes
      const totalPending = Object.values(stats.pendingByStatus || {}).reduce((s, n) => s + n, 0);
      const navBadge = document.getElementById('nav-orders-count');
      if (totalPending > 0) {
        navBadge.textContent = totalPending;
        navBadge.hidden = false;
      } else {
        navBadge.hidden = true;
      }
    } catch (err) {
      toast(err.message, 'error');
    }
  }

  window.filterByStatus = function (status) {
    document.getElementById('filter-fulfillment').value = status;
    document.getElementById('filter-search').value = '';
    document.getElementById('filter-payment').value = '';
    switchView('orders');
    pageOffset = 0;
    loadOrders();
  };

  // ── ORDERS LIST ──
  async function loadOrders() {
    const wrap = document.getElementById('orders-table-wrap');
    wrap.innerHTML = '<div class="ad-loading">Cargando pedidos…</div>';
    try {
      const params = new URLSearchParams({
        limit: PAGE_SIZE,
        offset: pageOffset,
      });
      const q = document.getElementById('filter-search').value.trim();
      const f = document.getElementById('filter-fulfillment').value;
      const p = document.getElementById('filter-payment').value;
      if (q) params.set('q', q);
      if (f) params.set('fulfillment', f);
      if (p) params.set('payment', p);

      const data = await api('/api/admin/orders?' + params.toString());
      ordersCache = data.orders || [];
      totalOrders = data.total || 0;
      renderOrdersTable(ordersCache, wrap);
      renderPagination();
    } catch (err) {
      wrap.innerHTML = `<div class="ad-empty"><strong>Error</strong>${escHtml(err.message)}</div>`;
    }
  }

  function renderOrdersTable(orders, container) {
    if (!orders.length) {
      container.innerHTML = '<div class="ad-empty"><strong>No hay pedidos</strong>Cuando llegue uno, va a aparecer acá.</div>';
      return;
    }
    container.innerHTML = `
      <table class="ad-table">
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Pago</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          ${orders.map(o => `
            <tr onclick="openOrderDetail('${escHtml(o.id)}')">
              <td>
                <div class="ad-table-id">#${escHtml(o.id)}</div>
              </td>
              <td>
                <div class="ad-table-name">${escHtml(o.customer_name)}</div>
                <div class="ad-table-email">${escHtml(o.customer_email)}</div>
              </td>
              <td><span class="ad-table-amount">${money(o.total)}</span></td>
              <td>${statusBadge(o.fulfillment_status)}</td>
              <td>${paymentBadge(o.payment_status, o.payment_method)}</td>
              <td><span class="ad-table-date">${fmtDate(o.created_at)}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function renderPagination() {
    const pag = document.getElementById('orders-pagination');
    if (totalOrders <= PAGE_SIZE) { pag.hidden = true; return; }
    pag.hidden = false;
    const from = pageOffset + 1;
    const to = Math.min(pageOffset + PAGE_SIZE, totalOrders);
    document.getElementById('page-info').textContent = `${from}-${to} de ${totalOrders}`;
    document.getElementById('page-prev').disabled = pageOffset === 0;
    document.getElementById('page-next').disabled = pageOffset + PAGE_SIZE >= totalOrders;
  }

  // ── ORDER DETAIL ──
  window.openOrderDetail = async function (orderId) {
    currentOrderId = orderId;
    switchView('order-detail');
    location.hash = 'order/' + orderId;
    const cont = document.getElementById('order-detail-content');
    cont.innerHTML = '<div class="ad-loading">Cargando…</div>';
    try {
      const data = await api('/api/admin/orders?id=' + encodeURIComponent(orderId));
      renderOrderDetail(data.order);
    } catch (err) {
      cont.innerHTML = `<div class="ad-empty"><strong>Error</strong>${escHtml(err.message)}</div>`;
    }
  };

  function renderOrderDetail(o) {
    document.getElementById('detail-title').textContent = 'Pedido #' + o.id;
    const items = o.items || [];
    const isPickup = (o.shipping_zone || '').startsWith('retiro-');
    const phoneClean = (o.customer_phone || '').replace(/\D/g, '');
    const waLink = phoneClean
      ? `https://wa.me/549${phoneClean}?text=${encodeURIComponent('Hola ' + o.customer_name + '! Te escribo por tu pedido #' + o.id + ' en MDRACING.')}`
      : `https://wa.me/5491154907774`;
    const mailLink = `mailto:${o.customer_email}?subject=${encodeURIComponent('Tu pedido #' + o.id + ' en MDRACING')}`;

    const addr = (o.shipping_street || o.shipping_city) ? `
      <div class="ad-detail-row"><span>Dirección</span><span>${escHtml(o.shipping_street || '')}</span></div>
      <div class="ad-detail-row"><span>Ciudad / Provincia</span><span>${escHtml(o.shipping_city || '')}${o.shipping_province ? ', ' + escHtml(o.shipping_province) : ''}${o.shipping_postal ? ' (CP ' + escHtml(o.shipping_postal) + ')' : ''}</span></div>
    ` : '';

    const html = `
      <div class="ad-detail-grid">

        <div class="ad-detail-col">

          <!-- Cliente -->
          <div class="ad-detail-card">
            <div class="ad-detail-card-title">Cliente</div>
            <h4>${escHtml(o.customer_name)}</h4>
            <div class="ad-detail-row"><span>Email</span><span>${escHtml(o.customer_email)}</span></div>
            <div class="ad-detail-row"><span>Teléfono</span><span>${escHtml(o.customer_phone || '—')}</span></div>
            ${o.customer_dni ? `<div class="ad-detail-row"><span>DNI</span><span>${escHtml(o.customer_dni)}</span></div>` : ''}
            ${o.customer_cuit ? `<div class="ad-detail-row"><span>CUIT (Factura A)</span><span><strong>${escHtml(o.customer_cuit)}</strong></span></div>` : ''}
            <div class="ad-quick-actions">
              <a href="${waLink}" target="_blank" class="ad-wa-link">📱 WhatsApp</a>
              <a href="${mailLink}" class="ad-mail-link">✉️ Email</a>
            </div>
          </div>

          <!-- Envío -->
          <div class="ad-detail-card">
            <div class="ad-detail-card-title">${isPickup ? 'Retiro' : 'Envío'}</div>
            <h4>${escHtml(o.shipping_label || o.shipping_zone)}</h4>
            ${addr}
            ${o.shipping_notes ? `<div style="margin-top:10px;padding:10px 12px;background:#fff7d9;border-left:3px solid #d4a020;border-radius:4px;font-size:13px;font-style:italic;color:#5a4400">📝 ${escHtml(o.shipping_notes)}</div>` : ''}
          </div>

          <!-- Productos -->
          <div class="ad-detail-card">
            <div class="ad-detail-card-title">Productos (${items.length})</div>
            <div class="ad-detail-items">
              ${items.map(it => `
                <div class="ad-detail-item">
                  <div>
                    <div class="ad-detail-item-name">${escHtml(it.product_name)}</div>
                    ${it.variant ? `<div class="ad-detail-item-variant">${escHtml(it.variant)}</div>` : ''}
                    <div class="ad-detail-item-variant">ID: ${escHtml(it.product_id)}</div>
                  </div>
                  <div class="ad-detail-item-meta">
                    <span class="ad-detail-item-qty">×${it.qty}</span>
                    ${money(it.unit_price * it.qty)}
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="ad-totals">
              <div class="ad-detail-row"><span>Subtotal</span><span>${money(o.subtotal)}</span></div>
              ${o.discount > 0 ? `<div class="ad-detail-row"><span style="color:#22a35e">Descuento 10% OFF</span><span style="color:#22a35e">− ${money(o.discount)}</span></div>` : ''}
              <div class="ad-detail-row"><span>Envío</span><span>${o.shipping_cost === 0 || o.shipping_cost === '0' || o.shipping_cost === '0.00' ? (isPickup ? escHtml(o.shipping_label || 'Retiro') : 'GRATIS') : money(o.shipping_cost)}</span></div>
              <div class="ad-detail-row total"><span>TOTAL</span><span>${money(o.total)}</span></div>
            </div>
          </div>

        </div>

        <div class="ad-detail-col">

          <!-- Estado del pedido -->
          <div class="ad-detail-card">
            <div class="ad-detail-card-title">Estado del pedido</div>
            <div class="ad-status-form">
              <p style="font-size:13px;color:#666;margin-bottom:6px">Cambiá el estado a medida que avanza:</p>
              <div class="ad-status-actions">
                ${['pending','preparing','shipped','delivered','cancelled'].map(s => `
                  <button class="ad-status-btn ${s} ${o.fulfillment_status === s ? 'active' : ''}"
                    onclick="updateOrderStatus('${o.id}', '${s}')">${fulfillmentLabel(s)}</button>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Tracking -->
          <div class="ad-detail-card">
            <div class="ad-detail-card-title">Tracking (envío)</div>
            <div class="ad-field">
              <label>Código de seguimiento</label>
              <input type="text" id="detail-tracking" value="${escHtml(o.tracking_code || '')}" placeholder="Ej: 30001234567890" />
            </div>
            <button class="ad-btn ad-btn-dark" onclick="saveTracking('${o.id}')" style="width:100%">Guardar tracking</button>
          </div>

          <!-- Pago -->
          <div class="ad-detail-card">
            <div class="ad-detail-card-title">Pago</div>
            <div class="ad-detail-row"><span>Método</span><span>${methodLabel(o.payment_method)}</span></div>
            <div class="ad-detail-row"><span>Estado</span><span><strong>${paymentStatusLabel(o.payment_status)}</strong></span></div>
            ${o.mp_payment_id ? `<div class="ad-detail-row"><span>ID MP</span><span style="font-family:monospace;font-size:12px">${escHtml(o.mp_payment_id)}</span></div>` : ''}
            <div class="ad-detail-row"><span>Recibido el</span><span>${fmtDate(o.created_at)}</span></div>
            <div class="ad-detail-row"><span>Actualizado</span><span>${fmtDate(o.updated_at)}</span></div>
          </div>

          <!-- Notas internas -->
          <div class="ad-detail-card">
            <div class="ad-detail-card-title">Notas internas</div>
            <p style="font-size:12.5px;color:#888;margin-bottom:10px">Solo visibles para vos. El cliente no las ve.</p>
            <div class="ad-field">
              <textarea id="detail-notes" placeholder="Ej: Cliente VIP, despachar primero. Pidió que le confirme por WA antes del envío.">${escHtml(o.internal_notes || '')}</textarea>
            </div>
            <button class="ad-btn ad-btn-dark" onclick="saveNotes('${o.id}')" style="width:100%">Guardar notas</button>
          </div>

        </div>

      </div>
    `;
    document.getElementById('order-detail-content').innerHTML = html;
  }

  window.updateOrderStatus = async function (orderId, status) {
    try {
      await api('/api/admin/orders', {
        method: 'PATCH',
        body: JSON.stringify({ orderId, fulfillmentStatus: status }),
      });
      toast('Estado actualizado: ' + fulfillmentLabel(status), 'success');
      openOrderDetail(orderId); // recargar
    } catch (err) { toast(err.message, 'error'); }
  };

  window.saveTracking = async function (orderId) {
    const code = document.getElementById('detail-tracking').value.trim();
    try {
      await api('/api/admin/orders', {
        method: 'PATCH',
        body: JSON.stringify({ orderId, trackingCode: code }),
      });
      toast(code ? 'Tracking guardado' : 'Tracking borrado', 'success');
    } catch (err) { toast(err.message, 'error'); }
  };

  window.saveNotes = async function (orderId) {
    const notes = document.getElementById('detail-notes').value;
    try {
      await api('/api/admin/orders', {
        method: 'PATCH',
        body: JSON.stringify({ orderId, internalNotes: notes }),
      });
      toast('Notas guardadas', 'success');
    } catch (err) { toast(err.message, 'error'); }
  };

  window.goToOrders = function () {
    switchView('orders');
    location.hash = 'orders';
  };

  // ── INIT ──
  async function bootstrap() {
    // Verificar si está logueado
    try {
      const me = await api('/api/admin/me');
      if (!me.authed) {
        switchView('login');
        return;
      }
    } catch (err) {
      switchView('login');
      return;
    }

    // Route por hash
    const h = (location.hash || '#dashboard').slice(1);
    if (h.startsWith('order/')) {
      const oid = h.slice(6);
      switchView('order-detail');
      openOrderDetail(oid);
    } else if (h === 'orders') {
      switchView('orders');
      loadOrders();
    } else {
      switchView('dashboard');
      loadDashboard();
    }
  }

  // ── Event bindings ──
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);

    document.querySelectorAll('.ad-nav-link[data-view]').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const v = a.dataset.view;
        if (v === 'dashboard') { switchView('dashboard'); loadDashboard(); }
        else if (v === 'orders') { switchView('orders'); loadOrders(); }
      });
    });

    // Filters
    document.getElementById('filter-search').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { pageOffset = 0; loadOrders(); }
    });
    document.getElementById('filter-fulfillment').addEventListener('change', () => { pageOffset = 0; loadOrders(); });
    document.getElementById('filter-payment').addEventListener('change', () => { pageOffset = 0; loadOrders(); });

    // Pagination
    document.getElementById('page-prev').addEventListener('click', () => {
      pageOffset = Math.max(0, pageOffset - PAGE_SIZE);
      loadOrders();
    });
    document.getElementById('page-next').addEventListener('click', () => {
      pageOffset += PAGE_SIZE;
      loadOrders();
    });

    bootstrap();
  });
})();
