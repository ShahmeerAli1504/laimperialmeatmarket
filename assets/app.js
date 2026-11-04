/* ==========================================================================
   La Imperial — site behaviour: language toggle, menu rendering, UI
   ========================================================================== */
(function () {
  var D = window.IMPERIAL;

  /* ---------- Spanish dictionary (English lives in the HTML) ---------- */
  var ES = {
    "nav.market": "Carnicería", "nav.taqueria": "Taquería", "nav.bakery": "Panadería", "nav.groceries": "Abarrotes",
    "nav.catering": "Catering", "nav.locations": "Ubicaciones", "nav.menu": "Menú", "nav.fullmenu": "Menú Completo",
    "cta.order": "Ordena en DoorDash", "cta.orderNow": "Ordena Ya en DoorDash", "cta.orderShort": "Ordenar",
    "cta.menu": "Ver el Menú", "cta.find": "Encuentra una Tienda", "cta.explore": "Ver más →", "cta.fullmenu": "Ver Menú Completo",
    "cta.call": "Llamar / Visitar",
    "hero.script": "Del Rancho a Tu Mesa",
    "hero.h1a": "Carne Fresca.", "hero.h1b": "Sabor Auténtico.", "hero.h1c": "Tradición Mexicana.",
    "hero.lede": "Carnicería, taquería, panadería y abarrotes mexicanos de una familia trabajadora — todo bajo un mismo techo, en nuestras dos tiendas de Winnemucca. Cortado fresco todos los días, preparado al momento, nunca precocinado.",
    "badge.open": "Abierto los 7 días", "badge.two": "2 tiendas en Winnemucca", "badge.fresh": "Carnes cortadas a diario",
    "depts.script": "Todo en un solo lugar", "depts.h2": "Una Parada. Cuatro Tradiciones.",
    "depts.lede": "Lleva la carne para la carne asada del domingo, almuerza en la taquería, llévate unas conchas calientitas y surte tus tortillas, quesos y salsas — sin hacer otra parada.",
    "dept1.h": "Carnicería", "dept1.p": "Certified Angus Beef, marinados de la casa y todo para tu carne asada.",
    "dept2.h": "Taquería", "dept2.p": "Tacos de la calle, quesabirria, burritos y desayunos — hechos al momento.",
    "dept3.h": "Panadería", "dept3.p": "Conchas, cuernos, galletas, pasteles y pan dulce de temporada todos los días.",
    "dept4.h": "Abarrotes Mexicanos", "dept4.p": "Tortillas, quesos, cremería, verduras, salsas y bebidas de casa.",
    "depts.both": "<strong>Las cuatro, en ambas tiendas</strong> — Winnemucca Blvd y South Bridge St.",
    "story.script": "Nuestra Historia", "story.h2": "Una Familia con un Sueño",
    "story.p1": "No somos una gran empresa ni un nombre famoso. Detrás de Imperial hay una familia y un equipo trabajador con un sueño, mucha fe y un gran corazón. Lo que empezó como una carnicería y taquería en Winnemucca Blvd hoy son dos tiendas completas al servicio de toda la comunidad.",
    "story.p2": "Nuestra misión es sencilla: productos frescos y de calidad, buenos precios y el mejor servicio posible. Sabemos que siempre hay espacio para mejorar — y prometemos nunca dejar de trabajar para ganarnos tu confianza.",
    "story.quote": "“Primero, le damos gracias a Dios por hacer posible este sueño — y a cada cliente que nos ha apoyado.”",
    "story.cite": "— Tu familia Imperial ❤️",
    "story.t1h": "La Original", "story.t1": "5184 E Winnemucca Blvd — carnicería, taquería, panadería y abarrotes.",
    "story.t2h": "Recién Abierta · 2026", "story.t2": "1200 S Bridge St — nuestra segunda tienda, publicada en The Humboldt Sun.",
    "meat.h2": "La Carnicería",
    "meat.lede": "Fuerza, calidad y tradición en cada corte. Nuestros carniceros cortan fresco todos los días — desde cortes Certified Angus Beef hasta carnes marinadas en casa listas para el asador.",
    "gal.1": "Certified Angus Beef", "gal.2": "Cortado fresco a diario", "gal.3": "Costilla y fajitas", "gal.4": "Carne asada sazonada en casa",
    "gal.5": "Marinados y chorizo", "gal.6": "Pollo para tacos",
    "meat.cardh": "Todo para la Carne Asada",
    "meat.note": "Marinada o natural. Precios de DoorDash — pregunta en tienda por precios por libra.",
    "meat.c1": "Res, cerdo, pollo, mariscos y chorizo",
    "meat.c2": "Cortes especiales, carnitas, barbacoa, lengua, tripas y menudo",
    "meat.c3": "Cortes a tu gusto y pedidos grandes para fiestas — pregunta en el mostrador",
    "taq.h2": "Hecho al Momento. Nunca Precocinado.",
    "taq.lede": "Tacos con el verdadero sabor de la calle, quesabirria cocinada lentamente y remojada en consomé, burritos, tortas y desayunos mexicanos — con la misma carne fresca de nuestro mostrador.",
    "dd.note": "Precios según DoorDash; pueden variar en tienda.",
    "aguas.h2": "Hechas Frescas, Bien Frías",
    "aguas.lede": "Acompaña tu comida con un vasote de agua fresca de la casa — horchata cremosita, jamaica y más — o una Coca-Cola mexicana y Jarritos bien helados.",
    "aguas.c3": "Pepino con Limón",
    "bak.h2": "La Panadería",
    "bak.lede": "Siempre fresco, siempre para ti. Recetas tradicionales hechas con amor — toma tu charola, escoge tus favoritos y llévate un sabor de México a casa.",
    "bak.i1": "La favorita — vainilla, rosa y chocolate", "bak.i2": "Suaves y mantequillosos", "bak.i3": "De temporada · Día de Muertos",
    "bak.i4": "Galletas de todo tipo", "bak.i5": "Pasteles enteros y rebanadas", "bak.i6": "Donas y hojaldres",
    "gro.h2": "Abarrotes Mexicanos",
    "gro.lede": "Las marcas y productos con los que creciste — y todo lo que tu cocina necesita — a buenos precios.",
    "gro.1": "De maíz y harina", "gro.2": "Quesos frescos", "gro.3": "Lácteos y crema", "gro.4": "Frutas y verduras", "gro.5": "Salsas y chiles", "gro.6": "Refrescos y más",
    "cat.h2": "¿Planeando una Celebración?",
    "cat.lede": "Graduación, reunión familiar o evento especial — te ayudamos con carne fresca, comida mexicana y opciones de catering con sabor y calidad. Haz tu pedido con tiempo y deja que hagamos tu celebración más fácil.",
    "cat.1": "Cortes frescos", "cat.2": "Opciones de carne asada", "cat.3": "Graduaciones y eventos", "cat.4": "Servicio familiar",
    "cat.packs": "Paquetes para Fiesta", "cat.packsnote": "Listos para ordenar en DoorDash — o llámanos para eventos grandes.",
    "cat.orderpack": "Ordena un Paquete",
    "loc.script": "Visítanos", "loc.h2": "Dos Tiendas en Winnemucca",
    "loc.lede": "Carnicería, taquería, panadería y abarrotes en ambas tiendas. ¡Pásate hoy!",
    "ig.script": "Síguenos", "ig.follow": "Síguenos en Instagram",
    "foot.about": "Carne fresca. Sabor auténtico. Tradición mexicana. Carnicería, taquería, panadería y abarrotes familiar en Winnemucca, Nevada.",
    "foot.h1": "Diario · 8 AM – 8 PM", "foot.h2": "Diario · 6:30 AM – 8 PM", "foot.explore": "Explora",
    /* menu page */
    "menu.h1": "Nuestro Menú", "menu.lede": "Todo hecho al momento con carne fresca de nuestra carnicería. Explora el menú aquí y ordena para entrega o recoger en DoorDash.",
    /* generated UI */
    "ui.order": "Ordenar", "ui.directions": "Cómo Llegar", "ui.call": "Llamar",
    "ui.services": ["Carnicería", "Taquería", "Panadería", "Abarrotes"]
  };
  var UI_EN = { "ui.order": "Order", "ui.directions": "Directions", "ui.call": "Call", "ui.services": ["Meat Market", "Taqueria", "Bakery", "Groceries"] };

  var lang = "en";
  try { lang = localStorage.getItem("imperial-lang") || (navigator.language || "").slice(0, 2) === "es" && "es" || "en"; } catch (e) {}
  if (lang !== "es") lang = "en";

  function t(key) { return lang === "es" && ES[key] != null ? ES[key] : UI_EN[key]; }
  function money(n) { return "$" + n.toFixed(2); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* cache English originals */
  var nodes = document.querySelectorAll("[data-i18n]");
  nodes.forEach(function (el) { el.dataset.en = el.innerHTML; });

  function applyLang() {
    document.documentElement.lang = lang;
    nodes.forEach(function (el) {
      var k = el.dataset.i18n;
      el.innerHTML = lang === "es" && ES[k] ? ES[k] : el.dataset.en;
    });
    document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
    render();
  }

  /* ---------- renderers ---------- */
  function card(item) {
    return '<article class="mcard"><div class="row"><span class="name">' + esc(item.name) + '</span><span class="price">' + money(item.price) +
      "</span></div><p>" + esc(item[lang]) + '</p><a class="order" href="' + esc(D.doordash) + '" target="_blank" rel="noopener">' + t("ui.order") + " →</a></article>";
  }
  function priceRow(item) {
    return '<li><span class="n">' + esc(item.name) + '</span><span class="d"></span><span class="p">' + money(item.price) + "</span></li>";
  }
  function cat(id) { return D.menu.filter(function (c) { return c.id === id; })[0]; }

  function render() {
    var best = document.getElementById("best-sellers");
    if (best) best.innerHTML = cat("best").items.slice(0, 8).map(card).join("");
    var raw = document.getElementById("raw-list");
    if (raw) raw.innerHTML = cat("raw").items.map(priceRow).join("");
    var packs = document.getElementById("packs-list");
    if (packs) packs.innerHTML = cat("packs").items.slice(0, 6).map(priceRow).join("");

    var loc = document.getElementById("loc-grid");
    if (loc) {
      loc.innerHTML = D.locations.map(function (l) {
        return '<article class="loc"><div class="map"><iframe title="Map: ' + esc(l.street) + '" src="' + l.embed + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>' +
          '<div class="body"><span class="tag">' + esc(l.tag[lang]) + "</span><h3>" + esc(l.name[lang]) + "</h3>" +
          '<div class="line"><svg><use href="#i-pin"/></svg><a href="' + esc(l.maps) + '" target="_blank" rel="noopener">' + esc(l.street) + "<br>" + esc(l.city) + "</a></div>" +
          '<div class="line"><svg><use href="#i-phone"/></svg><a href="tel:' + l.tel + '">' + esc(l.phone) + "</a></div>" +
          '<div class="line"><svg><use href="#i-clock"/></svg><span>' + esc(l.hours[lang]) + "</span></div>" +
          '<div class="services">' + t("ui.services").map(function (s) { return "<span>" + s + "</span>"; }).join("") + "</div>" +
          '<div class="actions"><a class="btn btn-gold btn-sm" href="' + esc(l.maps) + '" target="_blank" rel="noopener"><svg><use href="#i-dir"/></svg>' + t("ui.directions") +
          '</a><a class="btn btn-ghost btn-sm" href="tel:' + l.tel + '"><svg><use href="#i-phone"/></svg>' + t("ui.call") + "</a></div></div></article>";
      }).join("");
    }

    var full = document.getElementById("full-menu");
    if (full) {
      full.innerHTML = D.menu.map(function (c) {
        return '<section class="menu-cat" id="' + c.id + '"><h2>' + esc(c.title[lang]) + '</h2><div class="menu-cards">' + c.items.map(card).join("") + "</div></section>";
      }).join("");
      var tabs = document.getElementById("cat-tabs");
      if (tabs) tabs.innerHTML = D.menu.map(function (c) { return '<a href="#' + c.id + '">' + esc(c.title[lang]) + "</a>"; }).join("");
      watchTabs();
    }
  }

  /* active category tab on menu page */
  var tabObserver;
  function watchTabs() {
    if (!("IntersectionObserver" in window)) return;
    if (tabObserver) tabObserver.disconnect();
    tabObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        document.querySelectorAll("#cat-tabs a").forEach(function (a) {
          var on = a.getAttribute("href") === "#" + e.target.id;
          a.classList.toggle("active", on);
          if (on && a.scrollIntoView) a.parentNode.scrollTo({ left: a.offsetLeft - 16, behavior: "smooth" });
        });
      });
    }, { rootMargin: "-160px 0px -60% 0px" });
    document.querySelectorAll(".menu-cat").forEach(function (s) { tabObserver.observe(s); });
  }

  /* ---------- links ---------- */
  document.querySelectorAll("[data-dd]").forEach(function (a) { a.href = D.doordash; });
  document.querySelectorAll("[data-ig]").forEach(function (a) { a.href = D.instagram; });
  var yr = document.getElementById("yr"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- language buttons ---------- */
  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () {
      lang = b.dataset.lang;
      try { localStorage.setItem("imperial-lang", lang); } catch (e) {}
      applyLang();
    });
  });

  /* ---------- header + mobile nav ---------- */
  var header = document.querySelector(".header");
  var bar = document.getElementById("order-bar");
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 30);
    if (bar) bar.classList.toggle("show", y > window.innerHeight * 0.7);
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  var toggle = document.querySelector(".menu-toggle");
  var mnav = document.getElementById("mobile-nav");
  function setNav(open) {
    if (!mnav) return;
    mnav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.innerHTML = '<svg><use href="#i-' + (open ? "x" : "menu") + '"/></svg>';
    document.body.style.overflow = open ? "hidden" : "";
    if (header) header.classList.toggle("solid", open);
  }
  if (toggle) toggle.addEventListener("click", function () { setNav(!mnav.classList.contains("open")); });
  if (mnav) mnav.addEventListener("click", function (e) { if (e.target.closest("a")) setNav(false); });

  /* ---------- reveal on scroll ---------- */
  applyLang();
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
})();
