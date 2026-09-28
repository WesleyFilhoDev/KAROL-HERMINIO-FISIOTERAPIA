document.addEventListener("DOMContentLoaded", () => {
  /* ---------- MENU HAMBÚRGUER ---------- */
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("menuToggle");
  const links = document.querySelectorAll("#menuLista a");

  function setMenu(aberto) {
    navbar.classList.toggle("open", aberto);
    toggle.setAttribute("aria-expanded", aberto);
    toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  }

  toggle.addEventListener("click", () => {
    setMenu(!navbar.classList.contains("open"));
  });

  // fecha ao clicar em um link
  links.forEach((link) => link.addEventListener("click", () => setMenu(false)));

  // fecha ao clicar fora do menu
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) setMenu(false);
  });

  // fecha ao voltar para o layout de desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) setMenu(false);
  });

  /* ---------- ANIMAÇÃO NO SCROLL ---------- */
  // [seletor, direção, intervalo (s) entre elementos]
  const grupos = [
    // Hero
    [".left > *", "up", 0.15],
    [".rigth", "right", 0],
    // Essência
    [".left2", "left", 0],
    [".rigth2 > *", "up", 0.12],
    // Pilares
    [".pilares .textos > *", "up", 0.15],
    [".pilares .cards > div", "up", 0.15],
    // Atendimentos
    [".atendimentos .titulo > *", "up", 0.15],
    [".card-atendimento", "up", 0.2],
    // Contato
    [".contato .foto", "left", 0],
    [".contato .textos > *", "up", 0.12],
  ];

  const elementos = [];

  grupos.forEach(([seletor, direcao, passo]) => {
    document.querySelectorAll(seletor).forEach((el, i) => {
      el.classList.add("reveal");
      if (direcao === "left") el.classList.add("reveal-left");
      if (direcao === "right") el.classList.add("reveal-right");
      el.style.setProperty("--delay", `${i * passo}s`);
      elementos.push(el);
    });
  });

  // ao terminar, remove as classes para não interferir nos efeitos de hover
  elementos.forEach((el) => {
    el.addEventListener("animationend", (e) => {
      if (e.target !== el) return;
      el.classList.remove("reveal", "reveal-left", "reveal-right", "visible");
      el.style.removeProperty("--delay");
    });
  });

  // navegadores muito antigos: mostra tudo sem animar
  if (!("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.remove("reveal"));
    return;
  }

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observer.unobserve(entrada.target); // anima só uma vez
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  elementos.forEach((el) => observer.observe(el));
});