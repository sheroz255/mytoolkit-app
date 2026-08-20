(function () {
  'use strict';

  /* =========================================================
     MOBILE MENU
     ========================================================= */

  var menuButton = document.getElementById('mtMenuButton');
  var nav = document.getElementById('mtNav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', function () {
      var open = nav.classList.toggle('mt-open');
      menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('mt-lock', open);
    });

    var navLinks = nav.querySelectorAll('a');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function () {
        nav.classList.remove('mt-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open menu');
        document.body.classList.remove('mt-lock');
      });
    }
  }

  /* =========================================================
     TOOL SEARCH (only active on pages that have the search box,
     e.g. the homepage hero section)
     ========================================================= */

  var searchInput = document.getElementById('mtToolSearch');
  var searchResults = document.getElementById('mtSearchResults');

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getTools() {
    var cards = document.querySelectorAll('.mt-tool-listing-card');
    var tools = [];

    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var titleElement = card.querySelector('h3');
      var descriptionElement = card.querySelector('p');
      var iconElement = card.querySelector('.mt-tool-icon');

      tools.push({
        name: card.getAttribute('data-tool-name') || (titleElement ? titleElement.textContent : 'Tool'),
        category: card.getAttribute('data-tool-category') || '',
        description: descriptionElement ? descriptionElement.textContent : '',
        icon: iconElement ? iconElement.textContent : '\u2726',
        url: card.getAttribute('href') || '#'
      });
    }

    return tools;
  }

  function searchTools(query) {
    if (!searchResults) return;

    var cleanQuery = query.toLowerCase().trim();

    if (!cleanQuery) {
      searchResults.classList.remove('active');
      searchResults.innerHTML = '';
      return;
    }

    var tools = getTools();
    var matches = [];

    for (var i = 0; i < tools.length; i++) {
      var searchable = (tools[i].name + ' ' + tools[i].category + ' ' + tools[i].description).toLowerCase();
      if (searchable.indexOf(cleanQuery) !== -1) {
        matches.push(tools[i]);
      }
    }

    if (matches.length === 0) {
      searchResults.innerHTML = '<div class="mt-no-results">No matching tool found.</div>';
      searchResults.classList.add('active');
      return;
    }

    var output = '';
    for (var j = 0; j < matches.length && j < 10; j++) {
      var tool = matches[j];
      output +=
        '<a class="mt-search-result" href="' + escapeHtml(tool.url) + '">' +
          '<div class="mt-search-result-icon">' + escapeHtml(tool.icon.trim()) + '</div>' +
          '<div>' +
            '<strong>' + escapeHtml(tool.name.trim()) + '</strong>' +
            '<small>' + escapeHtml(tool.category.trim() || tool.description.trim()) + '</small>' +
          '</div>' +
        '</a>';
    }

    searchResults.innerHTML = output;
    searchResults.classList.add('active');
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      searchTools(this.value);
    });

    searchInput.addEventListener('focus', function () {
      if (this.value.trim()) {
        searchTools(this.value);
      }
    });
  }

  document.addEventListener('click', function (event) {
    if (!searchInput || !searchResults) return;
    var inside = event.target === searchInput || searchResults.contains(event.target);
    if (!inside) {
      searchResults.classList.remove('active');
    }
  });

  document.addEventListener('keydown', function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (searchInput) searchInput.focus();
    }

    if (event.key === 'Escape') {
      if (searchInput) searchInput.blur();
      if (searchResults) searchResults.classList.remove('active');
      if (nav) nav.classList.remove('mt-open');
      if (menuButton) {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open menu');
      }
      document.body.classList.remove('mt-lock');
    }
  });

  /* =========================================================
     BACK TO TOP
     ========================================================= */

  var topButton = document.getElementById('mtTopButton');
  if (topButton) {
    topButton.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =========================================================
     CURRENT YEAR
     ========================================================= */

  var yearElement = document.getElementById('mtYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* =========================================================
     TOOL LISTING EMPTY STATE (homepage only)
     ========================================================= */

  var emptyState = document.getElementById('mtToolsEmpty');
  function updateEmptyState() {
    if (!emptyState) return;
    var cards = document.querySelectorAll('.mt-tool-listing-card');
    emptyState.style.display = cards.length > 0 ? 'none' : 'block';
  }
  updateEmptyState();

  /* =========================================================
     SMOOTH INTERNAL ANCHOR LINKS (same-page only)
     ========================================================= */

  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  for (var a = 0; a < anchorLinks.length; a++) {
    anchorLinks[a].addEventListener('click', function (event) {
      var id = this.getAttribute('href');
      if (!id || id === '#') return;

      var target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      var headerOffset = 78;
      var position = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: position, behavior: 'smooth' });
    });
  }
})();
