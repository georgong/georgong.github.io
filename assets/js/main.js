document.addEventListener('DOMContentLoaded', function () {
  loadProjects();
  const filterButtons = document.querySelectorAll('#filter-tags .filter-btn');
  const projectsContainer = document.getElementById('projects-container');
  let cards = Array.from(document.querySelectorAll('.project-card'));

  // 初始加载时设置动画延迟
  setCardDelays(cards);

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 更新按钮激活状态
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      filterProjects(btn.dataset.tag);
    });
  });

  function filterProjects(selectedTag) {
    // 移除所有卡片
    projectsContainer.innerHTML = '';
    
    // 筛选并重新添加匹配的卡片
    const matchedCards = cards.filter(card => {
      const tags = card.dataset.tags.split(',').map(t => t.trim());
      return selectedTag === 'all' || tags.includes(selectedTag);
    });

    // 为匹配的卡片添加延迟动画
    matchedCards.forEach((card, index) => {
      card.style.setProperty('--delay', index);
      projectsContainer.appendChild(card);
    });

    // 重新设置卡片动画
    resetCardAnimations(matchedCards);
  }

  function setCardDelays(cardElements) {
    cardElements.forEach((card, index) => {
      card.style.setProperty('--delay', index);
    });
  }

  function resetCardAnimations(cardElements) {
    // 强制重绘以触发动画
    cardElements.forEach(card => {
      card.style.animation = 'none';
      void card.offsetWidth; // 触发重绘
      card.style.animation = '';
    });
  }
});

function generateFilterButtons(projects) {
    const tagSet = new Set();
    projects.forEach(project => {
      project.labels.forEach(label => tagSet.add(label));
    });
  
    const tagList = Array.from(tagSet).sort();
    const container = document.getElementById('filter-tags');
    container.innerHTML = ''; // 清空现有标签
  
    // 添加“全部”按钮
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.dataset.tag = 'all';
    allBtn.textContent = 'All';
    container.appendChild(allBtn);
  
    tagList.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.dataset.tag = tag;
      btn.textContent = tag;
      container.appendChild(btn);
    });
  
    // 绑定点击事件
    const buttons = container.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProjects(btn.dataset.tag);
      });
    });
  }


fetch('assets/data/profile.json')
  .then(res => res.json())
  .then(data => {
    document.querySelector('.profile-info h2').textContent = data.name;
    document.querySelector('.profile-info p').textContent = data.title;
    document.querySelector('.stat-item:nth-child(1) span:nth-child(2)').textContent = data.location;
    document.querySelector('.stat-item:nth-child(2) span:nth-child(2)').textContent = data.company;
    document.querySelector('.stat-item:nth-child(3) span:nth-child(2)').textContent = data.email;
  });

  function loadProjects() {
    fetch('assets/data/projects.json')
      .then(res => res.json())
      .then(projects => {
        generateFilterButtons(projects); // 动态生成标签
  
        const container = document.getElementById('projects-container');
        container.innerHTML = '';
  
        projects.forEach((project, index) => {
          const card = document.createElement('div');
          card.className = 'project-card';
          card.setAttribute('data-tags', project.labels.join(','));
          card.style.setProperty('--delay', index);
  
          card.innerHTML = `
            <h3>${project.name}</h3>
            <div class="preview-container">
              <img src="${project.gif}" alt="${project.name} 预览" />
            </div>
            <div class="project-details">
              <p>${project.description}</p>
              <div class="tech-tags">${project.tags.map(getTagHTML).join('')}</div>
              <a href="${project.href}" class="project-link" target="_blank">Visit Repo</a>
            </div>
          `;
  
          container.appendChild(card);
        });
  
        window.allCards = Array.from(document.querySelectorAll('.project-card'));
      });
}
  
function filterProjects(selectedTag) {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
  
    const matchedCards = window.allCards.filter(card => {
      const tags = card.dataset.tags.split(',').map(t => t.trim());
      return selectedTag === 'all' || tags.includes(selectedTag);
    });
  
    matchedCards.forEach((card, index) => {
      card.style.setProperty('--delay', index);
      container.appendChild(card);
    });
  
    resetCardAnimations(matchedCards);
  }

  function getTagHTM1(tag) {
    const styles = {
      "flask": { bg: "#f1f8ff", color: "#0366d6", icon: "circle"},
      "LLM": { bg: "#f3f4f6", color: "#4b5563", icon: "circle"},
      "MongoDB": { bg: "#f0fdf4", color: "#16a34a", icon: "circle" },
      "TypeScript": { bg: "#fffbeb", color: "#d97706", icon: "circle" }
    };
  
    const { bg, color, icon } = styles[tag] || { bg: "#eee", color: "#444", icon: "circle" };
    const svgMap = {
      stack: `<svg style="width:14px;height:14px;margin-right:4px" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7L12 12L22 7L12 2Z" fill="${color}" stroke="${color}" stroke-width="2"/></svg>`,
      plus: `<svg style="width:14px;height:14px;margin-right:4px" viewBox="0 0 24 24" fill="none"><path d="M12 8V16M8 12H16" stroke="black" stroke-width="2"/></svg>`,
      smile: `<svg style="width:14px;height:14px;margin-right:4px" viewBox="0 0 24 24" fill="none"><path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14M9 9H9.01M15 9H15.01" stroke="${color}" stroke-width="2"/></svg>`,
      circle: `<svg style="width:14px;height:14px;margin-right:4px" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="${color}" stroke-width="2"/></svg>`
    };
  
    return `<span style="
      background:${bg}; color:${color}; padding:4px 8px;
      border-radius:16px; font-size:12px; font-weight:500;
      display:inline-flex; align-items:center;
    ">${svgMap[icon] || ''}${tag}</span>`;
  }

  function getTagHTML(tag) {
    const bgColor = getColorFromText(tag);
    const textColor = '#333'; // 你也可以自动反转颜色
    const color = "#444"
    const svgMap = {
      stack: `<svg style="width:14px;height:14px;margin-right:4px" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7L12 12L22 7L12 2Z" fill="${color}" stroke="${color}" stroke-width="2"/></svg>`,
      plus: `<svg style="width:14px;height:14px;margin-right:4px" viewBox="0 0 24 24" fill="none"><path d="M12 8V16M8 12H16" stroke="black" stroke-width="2"/></svg>`,
      smile: `<svg style="width:14px;height:14px;margin-right:4px" viewBox="0 0 24 24" fill="none"><path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14M9 9H9.01M15 9H15.01" stroke="${color}" stroke-width="2"/></svg>`,
      circle: `<svg style="width:14px;height:14px;margin-right:4px" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="${color}" stroke-width="2"/></svg>`
    };
  
    return `
      <span style="
        background-color: ${bgColor};
        color: ${textColor};
        padding: 4px 8px;
        border-radius: 16px;
        font-size: 12px;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
      ">${svgMap['circle'] || ''}${tag}</span>`;
  }
  

  function getColorFromText(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    const hue = hash % 360; // 0 - 359
    return `hsl(${hue}, 50%, 85%)`; // pastel-style color
  }