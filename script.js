const profile = {
  name: 'Wesley Ribeiro',
  bio: 'Estudante de Engenharia de Software | Em busca de estágio na área de Tecnologia',
  location: 'Florianópolis, SC',
  github: 'https://github.com/WesleyRibeiiro051',
  linkedin: 'https://www.linkedin.com/in/wesley-ribeiro2026/'
};

const projectDefinitions = {
  'Linguem-python-basico': {
    summary: 'Repositório dedicado aos primeiros passos em programação com Python, com foco em lógica, sintaxe básica e entendimento inicial dos conceitos fundamentais da linguagem.',
    tech: ['Python', 'Lógica de programação', 'Algoritmos']
  },
  'projetos-iniciais': {
    summary: 'Coleção de projetos iniciais com foco em prática e aprendizado gradual, demonstrando evolução nos primeiros exercícios e conceitos de desenvolvimento.',
    tech: ['Python', 'Exercícios', 'Desenvolvimento inicial']
  },
  'projeto-social-garapuvu': {
    summary: 'Projeto social do Garapuvu, com foco em aprendizado de desenvolvimento de software, aulas, desafios, mini-projetos e práticas aplicadas, incluindo a visão de QA com IA generativa e experiências reais de desenvolvimento.',
    tech: ['JavaScript', 'HTML', 'CSS', 'QA com IA', 'Desafios']
  },
  'copa-2026': {
    summary: 'Aplicativo de resultados dos jogos da Copa do Mundo 2026, com foco em interface web e apresentação de informações esportivas de maneira acessível e prática.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Dados esportivos']
  },
  'ia-na-pratica': {
    summary: 'Projeto relacionado à inteligência artificial aplicada na prática, evidenciando experimentação e aprendizado em conceitos de IA com foco em demonstração visual e didática.',
    tech: ['JavaScript', 'HTML', 'CSS', 'IA']
  },
  'garapuvu-catch-request': {
    summary: 'Repositório focado em requisições e interação web, refletindo o uso de dados e comunicação com recursos externos em uma aplicação front-end.',
    tech: ['HTML', 'JavaScript', 'Requisições', 'Web']
  }
};

const techList = [
  { name: 'Python', icon: 'fa-brands fa-python' },
  { name: 'JavaScript', icon: 'fa-brands fa-js' },
  { name: 'HTML5', icon: 'fa-brands fa-html5' },
  { name: 'CSS3', icon: 'fa-brands fa-css3-alt' },
  { name: 'GitHub', icon: 'fa-brands fa-github' },
  { name: 'Git', icon: 'fa-brands fa-git-alt' },
  { name: 'IA Generativa', icon: 'fa-solid fa-robot' },
  { name: 'Copilot VS Code', icon: 'fa-solid fa-wand-sparkles' }
];

const formatName = (name) => name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

const renderTechCards = () => {
  document.getElementById('techGrid').innerHTML = techList
    .map((tech) => `
      <div class="tech-card">
        <i class="icon ${tech.icon}"></i>
        <span>${tech.name}</span>
      </div>
    `)
    .join('');
};

const renderProjects = (repos) => {
  const container = document.getElementById('projectsContainer');
  const list = repos.filter(repo => !repo.fork || repo.name !== 'portfolio').sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at));

  container.innerHTML = list.map(repo => {
    const project = projectDefinitions[repo.name] || {
      summary: 'Projeto público do GitHub demonstrando estudo prático de desenvolvimento e criação de soluções digitais.',
      tech: [repo.language || 'Web', 'GitHub', 'Desenvolvimento']
    };

    const tags = project.tech.slice(0, 4).map(tag => `<span class="tag">${tag}</span>`).join('');

    return `
      <article class="project-card">
        <div class="project-top">
          <h3 class="project-title">${formatName(repo.name)}</h3>
          <span class="repo-badge">${repo.language || 'Web'}</span>
        </div>
        <p class="project-details">${project.summary}</p>
        <div class="project-meta">${tags}</div>
      </article>
    `;
  }).join('');
};

const populateProfileStats = (repos) => {
  const repoCount = document.getElementById('repoCount');
  const mainLanguage = document.getElementById('mainLanguage');
  const profileBio = document.getElementById('profileBio');

  if (repoCount) repoCount.textContent = String(repos.length);

  const counts = {};
  repos.forEach(repo => {
    if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
  });

  const topLanguage = Object.entries(counts).sort((a,b) => b[1]-a[1])[0];
  if (mainLanguage) mainLanguage.textContent = topLanguage ? topLanguage[0] : 'Diversas';
  if (profileBio) profileBio.textContent = profile.bio;
};

const fallbackRepos = [
  { name: 'Linguem-python-basico', language: 'Python', updated_at: '2026-08-05T00:00:00Z', fork: false },
  { name: 'projetos-iniciais', language: 'Python', updated_at: '2026-08-05T00:00:00Z', fork: false },
  { name: 'projeto-social-garapuvu', language: 'JavaScript', updated_at: '2026-08-18T00:00:00Z', fork: true },
  { name: 'copa-2026', language: 'HTML', updated_at: '2026-08-18T00:00:00Z', fork: true },
  { name: 'ia-na-pratica', language: 'JavaScript', updated_at: '2026-08-18T00:00:00Z', fork: true },
  { name: 'garapuvu-catch-request', language: 'HTML', updated_at: '2026-08-18T00:00:00Z', fork: true }
];

async function loadRepositories() {
  renderTechCards();

  try {
    const res = await fetch('https://api.github.com/users/WesleyRibeiiro051/repos?per_page=100');
    if (!res.ok) throw new Error('GitHub API indisponível');
    const data = await res.json();
    const repos = Array.isArray(data) && data.length ? data : fallbackRepos;
    populateProfileStats(repos);
    renderProjects(repos);
  } catch (error) {
    populateProfileStats(fallbackRepos);
    renderProjects(fallbackRepos);
  }
}

document.addEventListener('DOMContentLoaded', loadRepositories);
