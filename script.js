function alternarTema() {
  document.body.classList.toggle('dark');
}
// 1. Função para atualizar o estilo dos botões
function atualizarBotaoTema() {
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');

  if (document.body.classList.contains('dark')) {
    btnPrev.classList.add('claro');
    btnNext.classList.add('claro');
  } else {
    btnPrev.classList.remove('claro');
    btnNext.classList.remove('claro');
  }
}

// 2. Modifique a função alternarTema para chamar atualizarBotaoTema
// Função que alterna o tema dark/light e atualiza os botões
function alternarTema() {
  document.body.classList.toggle('dark');
  atualizarBotaoTema();
}

// Atualiza a classe dos botões do carrossel conforme o tema
function atualizarBotaoTema() {
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');

  if (document.body.classList.contains('dark')) {
    btnPrev.classList.add('claro');
    btnNext.classList.add('claro');
  } else {
    btnPrev.classList.remove('claro');
    btnNext.classList.remove('claro');
  }
}

// No carregamento da página, atualize os botões para o tema atual
window.onload = () => {
  atualizarBotaoTema();

  // seu código existente continua aqui, por exemplo:
  filtrarCards();
  // ...
};


function abrirModal(profissao) {
  const info = {
    ecologista: "Ecologistas estudam a interação entre os seres vivos e o meio ambiente.",
    ambiental: "Engenheiros ambientais criam soluções sustentáveis para preservar a natureza.",
    robotica: "Engenheiros de robôs projetam e constroem máquinas inteligentes.",
    software: "Desenvolvedores de software criam aplicativos, jogos e sistemas.",
    nutricionista: "Nutricionistas orientam sobre alimentação saudável e bem-estar.",
    instrucional: "Designers instrucionais criam conteúdos digitais para educação.",
    biotec: "Biotecnologistas pesquisam e aplicam conhecimentos biológicos para resolver problemas.",
    energia: "Engenheiros de energia desenvolvem fontes renováveis e sustentáveis.",
    dados: "Cientistas de dados analisam grandes volumes de informações para tomar decisões inteligentes."
  };

  const modal = document.getElementById('modal');
  const texto = document.getElementById('modalTexto');

  texto.textContent = info[profissao] || "Mais informações em breve!";
  modal.style.display = "flex";
}

// Fechar modal ao clicar no X
document.getElementById('fecharModal').onclick = () => {
  document.getElementById('modal').style.display = "none";
}

// Fechar modal ao clicar fora da área do conteúdo
window.onclick = (event) => {
  if (event.target.id === "modal") {
    document.getElementById('modal').style.display = "none";
  }
}


function filtrarCards() {
  const area = document.getElementById("filtroArea").value;
  const serie = document.getElementById("filtroSerie").value;
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const pertenceArea = area === "todos" || card.classList.contains(area);
    const pertenceSerie = serie === "todas" || card.classList.contains(serie);

    card.style.display = (pertenceArea && pertenceSerie) ? "" : "none";
  });
}

function animarContador() {
  const el = document.getElementById('contador');
  const max = +el.getAttribute('data-max');
  let atual = 0;
  const intervalo = setInterval(() => {
    atual++;
    el.textContent = atual;
    if (atual === max) clearInterval(intervalo);
  }, 200);
}

function destacarCardCentral() {
  const container = document.querySelector('.card-container-horizontal');
  const cards = container.querySelectorAll('.card');
  const containerCenter = container.scrollLeft + container.offsetWidth / 2;

  let maisProximo = null;
  let menorDistancia = Infinity;

  cards.forEach(card => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distancia = Math.abs(containerCenter - cardCenter);
    if (distancia < menorDistancia) {
      menorDistancia = distancia;
      maisProximo = card;
    }
    card.style.opacity = 0.5;
    card.style.transform = 'scale(0.95)';
    card.classList.remove('mostrar');
  });

  if (maisProximo) {
    maisProximo.style.opacity = 1;
    maisProximo.style.transform = 'scale(1.05)';
    maisProximo.classList.add('mostrar');
  }
}

function centralizarCardMaisProximo() {
  const container = document.querySelector('.card-container-horizontal');
  const cards = container.querySelectorAll('.card');
  const containerCenter = container.scrollLeft + container.offsetWidth / 2;

  let maisProximo = null;
  let menorDistancia = Infinity;

  cards.forEach(card => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distancia = Math.abs(containerCenter - cardCenter);
    if (distancia < menorDistancia) {
      menorDistancia = distancia;
      maisProximo = card;
    }
  });

  if (maisProximo) {
    const scrollPara = maisProximo.offsetLeft - container.offsetWidth / 2 + maisProximo.offsetWidth / 2;
    container.scrollTo({
      left: scrollPara,
      behavior: 'smooth'
    });
  }
}

window.onload = () => {
  filtrarCards();
document.getElementById('modal').style.display = 'none';

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('mostrar');
      }
    });
  });

  document.querySelectorAll('.card').forEach(card => observer.observe(card));

  window.addEventListener('scroll', () => {
    const contador = document.getElementById('contador');
    const pos = contador.getBoundingClientRect().top;
    if (pos < window.innerHeight) {
      animarContador();
    }
  }, { once: true });

  const container = document.querySelector('.card-container-horizontal');

  // Destacar no scroll
  container.addEventListener('scroll', () => {
    destacarCardCentral();

    clearTimeout(container.scrollTimeout);
    container.scrollTimeout = setTimeout(() => {
      centralizarCardMaisProximo();
    }, 150); // espera parar de rolar para centralizar
  });

  // Dispara no carregamento inicial para já destacar um card
  destacarCardCentral();
};
// Pega o container do carrossel
const container = document.querySelector('.card-container-horizontal');

// Pega os botões pelos ids que você colocou no HTML
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');

// Quando clicar no botão "Anterior"
btnPrev.addEventListener('click', () => {
  container.scrollBy({
    left: -300,  // volta 300px para esquerda (pode ajustar o valor)
    behavior: 'smooth'  // anima a rolagem
  });
});

// Quando clicar no botão "Próximo"
btnNext.addEventListener('click', () => {
  container.scrollBy({
    left: 300,  // avança 300px para direita
    behavior: 'smooth'
  });
});
