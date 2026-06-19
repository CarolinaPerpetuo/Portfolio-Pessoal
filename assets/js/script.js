// Seleciona a Seção About
const about = document.querySelector('#about');

// Seletor da Seção Projects (Carrossel)
const swiperWrapper = document.querySelector('.swiper-wrapper');

// Seletor do Formulário
const formulario = document.querySelector('#formulario');

// Regex de validação do e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Função para buscar os dados do GitHub
async function getAboutGithub() {

    try {

        const resposta = await fetch(
            "https://api.github.com/users/CarolinaPerpetuo"
        );

        const perfil = await resposta.json();

        about.innerHTML = "";

        about.innerHTML = `
            <figure class="about-image">
                <img src="${perfil.avatar_url}" 
                     alt="Foto do perfil - ${perfil.name}">
            </figure>

            <article class="about-content">

                <h2>Sobre mim</h2>

                <p>
                    Sou formada em Engenharia de Software e atualmente estou me especializando em Desenvolvimento Full Stack Java pela Generation Brasil.
Tenho experiência com Java, Spring Boot, MySQL, HTML, CSS e JavaScript, desenvolvendo projetos práticos voltados para APIs REST, sistemas CRUD e aplicações web. Tenho especial interesse em desenvolvimento back-end, banco de dados e análise de dados.
                </p>

                <p>
                    Acredito no aprendizado contínuo e na construção de conhecimento por meio da prática. Por isso, busco constantemente aprimorar minhas habilidades através de projetos, estudos e desafios que me permitam evoluir tecnicamente e profissionalmente.
Atualmente procuro minha primeira oportunidade na área de tecnologia, onde eu possa contribuir, aprender com profissionais experientes e continuar construindo minha carreira como desenvolvedora.
                </p>

                <div class="about-buttons-data">

                    <div class="buttons-container">

                        <a href="${perfil.html_url}"
                           target="_blank"
                           class="botao">
                            Ver GitHub
                        </a>

                        <a href="https://docs.google.com/document/d/e/2PACX-1vSJTf8Ic_Tm65-xEOOvZXeC5bcnyCk6GOQiYsWAu1hQBzOpIirMVgeKDnfMWRw5-w/pub"
                           target="_blank"
                           class="botao-outline">
                            Currículo
                        </a>

                    </div>

                    <div class="data-container">

                        <div class="data-item">
                            <span class="data-number">
                                ${perfil.followers}
                            </span>

                            <span class="data-label">
                                Seguidores
                            </span>
                        </div>

                        <div class="data-item">
                            <span class="data-number">
                                ${perfil.public_repos}
                            </span>

                            <span class="data-label">
                                Repositórios
                            </span>
                        </div>

                    </div>

                </div>

            </article>
        `;

    } catch (error) {

        console.error(
            "Erro ao buscar dados do GitHub:",
            error
        );

    }

}

// Executa a função
getAboutGithub();

// Função de inicialização do Carrossel - Swiper
function iniciarSwiper() {
    new Swiper(".projects-swiper", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        watchOverflow: true,

        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
                centeredSlides: false,
            },
            769: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                centeredSlides: false,
            },
            1025: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 54,
                centeredSlides: false,
            },
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },

        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },

        grabCursor: true,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
    });
}

async function getProjectsGithub() {
    try {
        const resposta = await fetch("https://api.github.com/users/CarolinaPerpetuo/repos?sort=updated&per_page=100");
        const repositorios = await resposta.json();

        swiperWrapper.innerHTML = "";

        const linguagens = {
            "JavaScript": "javascript",
            "TypeScript": "typescript",
            "Python": "python",
            "Java": "java",
            "HTML": "html",
            "CSS": "css",
            "PHP": "php",
            "C#": "csharp",
            "Go": "go",
            "Kotlin": "kotlin",
            "Swift": "swift",
            "C": "c",
            "C++": "cplusplus",
            "GitHub": "github",
        };

        const projetosFavoritos = repositorios.filter((repositorio) =>
            repositorio.topics && repositorio.topics.includes("featured")
        );

        projetosFavoritos.forEach((repositorio) => {
            const linguagem = repositorio.language || "GitHub";
            const logo = linguagens[linguagem] || linguagens["GitHub"];
            const urlLogo = `./assets/icons/languages/${logo}.svg`;

            const nomeFormatado = repositorio.name
                .replaceAll("_", " ")
                .replaceAll("-", " ")
                .toUpperCase();

            const truncar = (texto, limite) =>
                texto.length > limite
                    ? texto.substring(0, limite) + "..."
                    : texto;

            const descricao = repositorio.description
                ? truncar(repositorio.description, 100)
                : "Projeto desenvolvido no GitHub";

            const tags = repositorio.topics.length > 0
                ? repositorio.topics
                    .filter(topic => topic !== "featured")
                    .slice(0, 3)
                    .map(topic => `<span class="tag">${topic}</span>`)
                    .join("")
                : `<span class="tag">${linguagem}</span>`;

            const botaoDeploy = repositorio.homepage
                ? `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>`
                : "";

            const botoesAcao = `
                <div class="project-buttons">
                    <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
                        GitHub
                    </a>
                    ${botaoDeploy}
                </div>
            `;

            swiperWrapper.innerHTML += `
                <div class="swiper-slide">
                    <article class="project-card">
                        <div class="project-image">
                            <img src="${urlLogo}"
                                 alt="Ícone ${linguagem}"
                                 onerror="this.onerror=null; this.src='./assets/icons/languages/github.svg';">
                        </div>

                        <div class="project-content">
                            <h3>${nomeFormatado}</h3>
                            <p>${descricao}</p>
                            <div class="project-tags">${tags}</div>
                            ${botoesAcao}
                        </div>
                    </article>
                </div>
            `;
        });

        iniciarSwiper();

    } catch (error) {
        console.error("Erro ao buscar repositórios:", error);
    }
}

getProjectsGithub();

// Função de Validação do Formulário
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    document.querySelectorAll("form span")
        .forEach(span => span.innerHTML = "");

    let isValid = true;

    const nome = document.querySelector("#nome");
    const erroNome = document.querySelector("#erro-nome");

    if (nome.value.trim().length < 3) {
        erroNome.innerHTML = "O Nome deve ter no mínimo 3 caracteres.";
        if (isValid) nome.focus();
        isValid = false;
    }

    const email = document.querySelector("#email");
    const erroEmail = document.querySelector("#erro-email");

    if (!email.value.trim().match(emailRegex)) {
        erroEmail.innerHTML = "Digite um e-mail válido.";
        if (isValid) email.focus();
        isValid = false;
    }

    const assunto = document.querySelector("#assunto");
    const erroAssunto = document.querySelector("#erro-assunto");

    if (assunto.value.trim().length < 5) {
        erroAssunto.innerHTML = "O Assunto deve ter no mínimo 5 caracteres.";
        if (isValid) assunto.focus();
        isValid = false;
    }

    const mensagem = document.querySelector("#mensagem");
    const erroMensagem = document.querySelector("#erro-mensagem");

    if (mensagem.value.trim().length === 0) {
        erroMensagem.innerHTML = "A mensagem não pode ser vazia.";
        if (isValid) mensagem.focus();
        isValid = false;
    }

    if (isValid) {
        const submitButton = formulario.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = "Enviando...";

        formulario.submit();
    }
});