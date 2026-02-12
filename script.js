document.addEventListener('DOMContentLoaded', function() {
  function defaultNavItems() {
    return [
      { id: 'home', label: 'Home', url: 'index.html', parentId: '' },
      { id: 'about', label: 'About', url: '', parentId: '' },
      { id: 'about-overview', label: 'About Overview', url: 'about.html', parentId: 'about' },
      { id: 'about-benefits', label: 'How You Benefit', url: 'about.html#benefits', parentId: 'about' },
      { id: 'accounting', label: 'Accounting & Bookkeeping', url: '', parentId: '' },
      { id: 'bookkeeping', label: 'Bookkeeping', url: 'bookkeeping.html', parentId: 'accounting' },
      { id: 'vat', label: 'VAT Services', url: '', parentId: '' },
      { id: 'vat-proc', label: 'VAT Accounting Procedures', url: 'vat-accounting.html', parentId: 'vat' },
      { id: 'vat-return', label: 'VAT Return Filing', url: 'vat-return.html', parentId: 'vat' },
      { id: 'audit', label: 'Audit & Controls', url: '', parentId: '' },
      { id: 'audit-int', label: 'Internal Audit & Controls', url: 'services.html#audit', parentId: 'audit' },
      { id: 'statements', label: 'Financial Statements', url: '', parentId: '' },
      { id: 'reporting', label: 'Financial Reporting', url: 'services.html#reporting', parentId: 'statements' },
      { id: 'management', label: 'Financial Management', url: 'services.html#management', parentId: '' },
      { id: 'tax', label: 'Tax', url: '', parentId: '' },
      { id: 'excise', label: 'Excise Tax', url: 'services.html#excise', parentId: 'tax' },
      { id: 'other-tax', label: 'Other Taxation Matters', url: 'services.html#other-tax', parentId: 'tax' }
    ];
  }
  function getNavItems() {
    try {
      var saved = JSON.parse(localStorage.getItem('axonNavItems') || '[]');
      if (!saved.length) return defaultNavItems();
      return saved;
    } catch (e) {
      return defaultNavItems();
    }
  }
  function setNavItems(items) {
    localStorage.setItem('axonNavItems', JSON.stringify(items));
  }
  function buildNavMenu() {
    var nav = document.querySelector('.nav-links');
    if (!nav) return;
    var items = getNavItems();
    var parents = items.filter(function(item) { return !item.parentId; });
    var children = items.filter(function(item) { return item.parentId; });
    nav.innerHTML = '';
    parents.forEach(function(parent) {
      var childItems = children.filter(function(child) { return child.parentId === parent.id; });
      if (childItems.length) {
        var dd = document.createElement('div');
        dd.className = 'dropdown';
        var btn = document.createElement('button');
        btn.className = 'trigger focus-ring';
        btn.setAttribute('aria-haspopup', 'true');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = parent.label;
        var menu = document.createElement('div');
        menu.className = 'menu';
        childItems.forEach(function(child) {
          var a = document.createElement('a');
          a.href = child.url || '#';
          a.textContent = child.label;
          menu.appendChild(a);
        });
        dd.appendChild(btn);
        dd.appendChild(menu);
        nav.appendChild(dd);
      } else {
        var link = document.createElement('a');
        link.href = parent.url || '#';
        link.textContent = parent.label;
        nav.appendChild(link);
      }
    });
  }
  buildNavMenu();
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function() {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
  document.querySelectorAll('.dropdown .trigger').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var dd = this.closest('.dropdown');
      var isOpen = dd.classList.toggle('open');
      this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function(e) {
    var dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(function(dd) {
      if (!dd.contains(e.target)) {
        dd.classList.remove('open');
        var trig = dd.querySelector('.trigger');
        if (trig) trig.setAttribute('aria-expanded', 'false');
      }
    });
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.dropdown').forEach(function(dd) {
        dd.classList.remove('open');
        var trig = dd.querySelector('.trigger');
        if (trig) trig.setAttribute('aria-expanded', 'false');
      });
    }
  });
  var cbTab = document.querySelector('.callback-tab');
  var cbPanel = document.querySelector('.callback-panel');
  var cbOverlay = document.querySelector('.callback-overlay');
  var cbClose = document.querySelector('.callback-close');
  function closeCallback() {
    if (cbPanel) cbPanel.classList.remove('open');
    if (cbOverlay) cbOverlay.classList.remove('open');
  }
  function openCallback() {
    if (cbPanel) cbPanel.classList.add('open');
    if (cbOverlay) cbOverlay.classList.add('open');
  }
  if (cbTab) cbTab.addEventListener('click', openCallback);
  if (cbOverlay) cbOverlay.addEventListener('click', closeCallback);
  if (cbClose) cbClose.addEventListener('click', closeCallback);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeCallback();
  });
  document.querySelectorAll('.accordion .header').forEach(function(h) {
    h.addEventListener('click', function() {
      var item = this.parentElement;
      item.classList.toggle('active');
    });
  });
  var rotator = document.querySelector('.hero-rotator');
  if (rotator) {
    var phrases = (rotator.getAttribute('data-rotate') || '')
      .split('|')
      .map(function(text) { return text.trim(); })
      .filter(Boolean);
    if (phrases.length) {
      var index = 0;
      rotator.textContent = phrases[0];
      setInterval(function() {
        rotator.classList.add('is-changing');
        setTimeout(function() {
          index = (index + 1) % phrases.length;
          rotator.textContent = phrases[index];
          rotator.classList.remove('is-changing');
        }, 250);
      }, 3200);
    }
  }
  var hero = document.querySelector('.hero-ref');
  if (hero) {
    var bgImages = ['WEB 1.jpeg', 'WEB 2.avif'];
    var bgIndex = 0;
    setInterval(function() {
      hero.classList.add('bg-fade');
      setTimeout(function() {
        bgIndex = (bgIndex + 1) % bgImages.length;
        document.documentElement.style.setProperty('--hero-bg', 'url("' + bgImages[bgIndex] + '")');
        hero.classList.remove('bg-fade');
      }, 350);
    }, 5000);
  }
  function buildInquiryModal() {
    if (document.querySelector('.inquiry-modal')) return null;
    var overlay = document.createElement('div');
    overlay.className = 'inquiry-overlay';
    var modal = document.createElement('div');
    modal.className = 'inquiry-modal';
    modal.innerHTML = '<div class="inquiry-card compact">' +
      '<button class="inquiry-close" type="button">×</button>' +
      '<div class="inquiry-header">' +
        '<img src="logo-axon.png" alt="Axon Accounting">' +
        '<h2>Looking to Setup a Business in the UAE?</h2>' +
        '<p>Get a Call Back within 1 Minute</p>' +
      '</div>' +
      '<form class="lead-form" data-lead-type="inquiry">' +
        '<div class="full"><label>Full name</label><input type="text" name="name" placeholder="Full name" required></div>' +
        '<div class="full"><label>Email</label><input type="email" name="email" placeholder="Email" required></div>' +
        '<div class="full">' +
          '<label>Enter your number</label>' +
          '<div class="phone-row">' +
            '<span class="flag">🇦🇪</span>' +
            '<input type="tel" name="phone" placeholder="+971" required>' +
            '<button class="cta small" type="submit">Call me!</button>' +
          '</div>' +
        '</div>' +
        '<div class="form-success" role="status"></div>' +
      '</form>' +
    '</div>';
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    function closeModal() {
      overlay.classList.remove('open');
      modal.classList.remove('open');
      document.body.classList.remove('modal-open');
    }
    function openModal() {
      overlay.classList.add('open');
      modal.classList.add('open');
      document.body.classList.add('modal-open');
    }
    overlay.addEventListener('click', closeModal);
    var closeBtn = modal.querySelector('.inquiry-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    return { open: openModal, close: closeModal };
  }
  if (!document.getElementById('admin-panel')) {
    var alreadyShown = localStorage.getItem('axonInquiryShown');
    if (!alreadyShown) {
      var inquiryModal = buildInquiryModal();
      if (inquiryModal) {
        setTimeout(function() {
          localStorage.setItem('axonInquiryShown', 'true');
          inquiryModal.open();
        }, 1500);
      }
    }
  }
  var cookieAccepted = localStorage.getItem('axonCookieConsent');
  if (!cookieAccepted) {
    var cookieBanner = document.createElement('div');
    cookieBanner.className = 'cookie-banner';
    cookieBanner.innerHTML = '<div>' +
      '<strong>We use cookies</strong>' +
      '<p>We use cookies to improve your experience and analyze traffic.</p>' +
    '</div>' +
    '<button class="cookie-accept" type="button">Allow Cookies</button>';
    document.body.appendChild(cookieBanner);
    var acceptBtn = cookieBanner.querySelector('.cookie-accept');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', function() {
        localStorage.setItem('axonCookieConsent', 'true');
        cookieBanner.remove();
      });
    }
  }
  function getLeads() {
    try {
      return JSON.parse(localStorage.getItem('axonLeads') || '[]');
    } catch (e) {
      return [];
    }
  }
  function setLeads(leads) {
    localStorage.setItem('axonLeads', JSON.stringify(leads));
  }
  function addLead(lead) {
    var leads = getLeads();
    leads.unshift(lead);
    setLeads(leads);
  }
  function setFormStatus(form, message, isError) {
    var status = form.querySelector('.form-success');
    if (status) {
      status.textContent = message || '';
      if (isError) {
        status.classList.add('error');
      } else {
        status.classList.remove('error');
      }
    }
  }
  document.querySelectorAll('form.lead-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(form);
      var name = (formData.get('name') || '').toString().trim();
      var email = (formData.get('email') || '').toString().trim();
      var phone = (formData.get('phone') || '').toString().trim();
      var company = (formData.get('company') || '').toString().trim();
      var message = (formData.get('message') || '').toString().trim();
      var service = (formData.get('service') || '').toString().trim();
      var turnover = (formData.get('turnover') || '').toString().trim();
      var extras = [];
      if (service) extras.push('Service: ' + service);
      if (turnover) extras.push('Turnover: ' + turnover);
      if (extras.length) {
        message = message ? message + ' | ' + extras.join(' | ') : extras.join(' | ');
      }
      if (!name && !email && !phone) {
        setFormStatus(form, 'Please add your name, email, or phone.', true);
        return;
      }
      addLead({
        type: form.getAttribute('data-lead-type') || 'contact',
        name: name,
        email: email,
        phone: phone,
        company: company,
        message: message,
        createdAt: new Date().toISOString()
      });
      syncLeadToCrm({
        type: form.getAttribute('data-lead-type') || 'contact',
        name: name,
        email: email,
        phone: phone,
        company: company,
        message: message,
        createdAt: new Date().toISOString()
      });
      form.reset();
      setFormStatus(form, 'Thank you. We will contact you soon.', false);
    });
  });
  var adminLogin = document.getElementById('admin-login');
  var adminPanel = document.getElementById('admin-panel');
  var navAdminPanel = document.getElementById('nav-admin-panel');
  var crmPanel = document.getElementById('crm-panel');
  var adminTableBody = document.getElementById('admin-table-body');
  var adminEmpty = document.getElementById('admin-empty');
  var adminLoginForm = document.getElementById('admin-login-form');
  var adminLoginMsg = document.getElementById('admin-login-msg');
  var adminExport = document.getElementById('admin-export');
  var adminClear = document.getElementById('admin-clear');
  var adminLogout = document.getElementById('admin-logout');
  var kpiTotal = document.getElementById('kpi-total');
  var kpiLatest = document.getElementById('kpi-latest');
  var kpiInquiry = document.getElementById('kpi-inquiry');
  var crmForm = document.getElementById('crm-form');
  var crmUrl = document.getElementById('crm-url');
  var crmEnabled = document.getElementById('crm-enabled');
  var crmMsg = document.getElementById('crm-msg');
  var ADMIN_USER = 'admin';
  var ADMIN_PASS = 'axon123';
  function isAuthed() {
    return localStorage.getItem('axonAdmin') === 'true';
  }
  function setAuthed(value) {
    localStorage.setItem('axonAdmin', value ? 'true' : 'false');
  }
  function renderLeads() {
    if (!adminTableBody) return;
    var leads = getLeads();
    adminTableBody.innerHTML = '';
    if (adminEmpty) {
      adminEmpty.style.display = leads.length ? 'none' : 'block';
    }
    if (kpiTotal) kpiTotal.textContent = String(leads.length);
    if (kpiInquiry) {
      var inquiries = leads.filter(function(lead) { return lead.type === 'inquiry'; }).length;
      kpiInquiry.textContent = String(inquiries);
    }
    if (kpiLatest) {
      kpiLatest.textContent = leads.length && leads[0].createdAt ? new Date(leads[0].createdAt).toLocaleString() : '-';
    }
    leads.forEach(function(lead) {
      var row = document.createElement('tr');
      var date = lead.createdAt ? new Date(lead.createdAt).toLocaleString() : '';
      [date, lead.type, lead.name, lead.email, lead.phone, lead.company, lead.message].forEach(function(value) {
        var cell = document.createElement('td');
        cell.textContent = value || '-';
        row.appendChild(cell);
      });
      adminTableBody.appendChild(row);
    });
  }
  function showAdminPanel() {
    if (adminLogin) adminLogin.hidden = true;
    if (adminPanel) adminPanel.hidden = false;
    if (navAdminPanel) navAdminPanel.hidden = false;
    if (crmPanel) crmPanel.hidden = false;
    renderLeads();
  }
  function showAdminLogin() {
    if (adminLogin) adminLogin.hidden = false;
    if (adminPanel) adminPanel.hidden = true;
    if (navAdminPanel) navAdminPanel.hidden = true;
    if (crmPanel) crmPanel.hidden = true;
  }
  if (adminPanel || adminLogin) {
    if (isAuthed()) {
      showAdminPanel();
    } else {
      showAdminLogin();
    }
  }
  function getCrmSettings() {
    try {
      return JSON.parse(localStorage.getItem('axonCrmSettings') || '{}');
    } catch (e) {
      return {};
    }
  }
  function setCrmSettings(settings) {
    localStorage.setItem('axonCrmSettings', JSON.stringify(settings));
  }
  function syncLeadToCrm(lead) {
    var settings = getCrmSettings();
    if (!settings.enabled || !settings.url) return;
    try {
      fetch(settings.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });
    } catch (e) {}
  }
  if (crmForm && crmUrl && crmEnabled) {
    var savedCrm = getCrmSettings();
    crmUrl.value = savedCrm.url || '';
    crmEnabled.checked = !!savedCrm.enabled;
    crmForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var settings = {
        url: crmUrl.value.trim(),
        enabled: crmEnabled.checked
      };
      setCrmSettings(settings);
      if (crmMsg) {
        crmMsg.textContent = 'CRM settings saved.';
        crmMsg.classList.remove('error');
      }
    });
  }
  var navForm = document.getElementById('nav-form');
  var navLabel = document.getElementById('nav-label');
  var navUrl = document.getElementById('nav-url');
  var navParent = document.getElementById('nav-parent');
  var navList = document.getElementById('nav-list');
  var navMsg = document.getElementById('nav-msg');
  var navReset = document.getElementById('nav-reset');
  function renderNavAdmin() {
    if (!navAdminPanel || !navList || !navParent) return;
    var items = getNavItems();
    var parents = items.filter(function(item) { return !item.parentId; });
    navParent.innerHTML = '<option value="">Top Level Category</option>';
    parents.forEach(function(parent) {
      var opt = document.createElement('option');
      opt.value = parent.id;
      opt.textContent = parent.label;
      navParent.appendChild(opt);
    });
    navList.innerHTML = '';
    items.forEach(function(item) {
      var row = document.createElement('tr');
      var parentLabel = '';
      if (item.parentId) {
        var parentItem = items.find(function(p) { return p.id === item.parentId; });
        parentLabel = parentItem ? parentItem.label : '-';
      }
      [item.label, item.url || '-', parentLabel || '-'].forEach(function(value) {
        var cell = document.createElement('td');
        cell.textContent = value || '-';
        row.appendChild(cell);
      });
      var action = document.createElement('td');
      var del = document.createElement('button');
      del.className = 'cta small';
      del.type = 'button';
      del.textContent = 'Delete';
      del.addEventListener('click', function() {
        var next = getNavItems().filter(function(i) { return i.id !== item.id && i.parentId !== item.id; });
        setNavItems(next);
        renderNavAdmin();
        buildNavMenu();
      });
      action.appendChild(del);
      row.appendChild(action);
      navList.appendChild(row);
    });
  }
  if (navForm) {
    navForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!navLabel) return;
      var label = navLabel.value.trim();
      var url = navUrl ? navUrl.value.trim() : '';
      var parentId = navParent ? navParent.value : '';
      if (!label) {
        if (navMsg) {
          navMsg.textContent = 'Please enter a name.';
          navMsg.classList.add('error');
        }
        return;
      }
      var items = getNavItems();
      var id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36);
      items.push({ id: id, label: label, url: url, parentId: parentId });
      setNavItems(items);
      if (navMsg) {
        navMsg.textContent = 'Menu item added.';
        navMsg.classList.remove('error');
      }
      if (navLabel) navLabel.value = '';
      if (navUrl) navUrl.value = '';
      if (navParent) navParent.value = '';
      renderNavAdmin();
      buildNavMenu();
    });
  }
  if (navReset) {
    navReset.addEventListener('click', function() {
      setNavItems(defaultNavItems());
      renderNavAdmin();
      buildNavMenu();
    });
  }
  if (navAdminPanel) {
    renderNavAdmin();
  }
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var user = document.getElementById('admin-user');
      var pass = document.getElementById('admin-pass');
      var username = user ? user.value.trim() : '';
      var password = pass ? pass.value.trim() : '';
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        setAuthed(true);
        if (adminLoginMsg) {
          adminLoginMsg.textContent = '';
          adminLoginMsg.classList.remove('error');
        }
        showAdminPanel();
      } else if (adminLoginMsg) {
        adminLoginMsg.textContent = 'Invalid login. Try again.';
        adminLoginMsg.classList.add('error');
      }
    });
  }
  if (adminLogout) {
    adminLogout.addEventListener('click', function() {
      setAuthed(false);
      showAdminLogin();
    });
  }
  function csvEscape(value) {
    var text = (value || '').toString();
    if (text.includes(',') || text.includes('"') || text.includes('\n')) {
      return '"' + text.replace(/"/g, '""') + '"';
    }
    return text;
  }
  if (adminExport) {
    adminExport.addEventListener('click', function() {
      var leads = getLeads();
      var rows = [['Date','Type','Name','Email','Phone','Company','Message']];
      leads.forEach(function(lead) {
        rows.push([
          lead.createdAt ? new Date(lead.createdAt).toLocaleString() : '',
          lead.type || '',
          lead.name || '',
          lead.email || '',
          lead.phone || '',
          lead.company || '',
          lead.message || ''
        ]);
      });
      var csv = rows.map(function(row) {
        return row.map(csvEscape).join(',');
      }).join('\n');
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      var link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'axon-leads.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
  if (adminClear) {
    adminClear.addEventListener('click', function() {
      var ok = window.confirm('Clear all leads?');
      if (ok) {
        setLeads([]);
        renderLeads();
      }
    });
  }
});
