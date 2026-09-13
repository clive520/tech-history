// 科技歷史網站首頁互動邏輯
document.addEventListener('DOMContentLoaded', () => {
  // 1. 初始化 Lucide 圖標
  lucide.createIcons();

  // 2. 主題切換 (Dark / Light)
  const themeToggle = document.getElementById('themeToggle');
  if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }

  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  });

  // 3. 狀態與變數
  let currentCategory = 'all';
  let searchQuery = '';

  const categoryTabs = document.getElementById('categoryTabs');
  const topicsGrid = document.getElementById('topicsGrid');
  const searchInput = document.getElementById('searchInput');
  const clearSearch = document.getElementById('clearSearch');
  const resultsCount = document.getElementById('resultsCount');
  const emptyState = document.getElementById('emptyState');

  // 4. 渲染分類按鈕
  function renderCategories() {
    categoryTabs.innerHTML = '';
    CATEGORIES_DATA.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
        currentCategory === cat.id
          ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
      }`;
      btn.innerHTML = `<i data-lucide="${cat.icon}" class="w-4 h-4"></i> <span>${cat.name}</span>`;
      btn.addEventListener('click', () => {
        currentCategory = cat.id;
        renderCategories();
        filterAndRenderTopics();
      });
      categoryTabs.appendChild(btn);
    });
    lucide.createIcons();
  }

  // 5. 渲染主題卡片
  function filterAndRenderTopics() {
    const filtered = TOPICS_DATA.filter(topic => {
      const matchCategory = currentCategory === 'all' || topic.category === currentCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || (
        topic.title.toLowerCase().includes(q) ||
        topic.subtitle.toLowerCase().includes(q) ||
        topic.breakthrough.toLowerCase().includes(q) ||
        topic.era.toLowerCase().includes(q) ||
        topic.figures.some(f => f.toLowerCase().includes(q))
      );
      return matchCategory && matchQuery;
    });

    resultsCount.textContent = `共收錄 42 個科技主題（目前顯示：${filtered.length} 個）`;

    if (filtered.length === 0) {
      topicsGrid.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');
    topicsGrid.innerHTML = '';

    filtered.forEach(topic => {
      const card = document.createElement('div');
      card.className = 'topic-card flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm relative group overflow-hidden';
      
      // 狀態 Badge 顏色
      let statusBadge = '';
      let isClickable = false;
      let targetLink = '#';

      if (topic.status === 'published') {
        statusBadge = '<span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">已發布</span>';
        isClickable = true;
        targetLink = `article.html?id=${topic.id}`;
      } else if (topic.status === 'in_progress') {
        statusBadge = '<span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">撰寫中</span>';
        targetLink = `article.html?id=${topic.id}`;
        isClickable = true;
      } else {
        statusBadge = '<span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">選題庫</span>';
        targetLink = `article.html?id=${topic.id}`;
        isClickable = true;
      }

      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              ${topic.era}
            </span>
            ${statusBadge}
          </div>

          <h3 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
            <a href="${targetLink}" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true"></span>
              ${topic.title}
            </a>
          </h3>

          <p class="text-xs font-medium text-blue-600 dark:text-blue-400 mb-3">
            ${topic.subtitle}
          </p>

          <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
            ${topic.breakthrough}
          </p>
        </div>

        <div class="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
          <div class="flex items-center gap-1 truncate max-w-[180px]">
            <i data-lucide="users" class="w-3.5 h-3.5 shrink-0"></i>
            <span class="truncate">${topic.figures.join('、')}</span>
          </div>
          <span class="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            閱讀專題 <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </span>
        </div>
      `;

      topicsGrid.appendChild(card);
    });

    lucide.createIcons();
  }

  // 6. 搜尋事件綁定
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    clearSearch.classList.toggle('hidden', !searchQuery);
    filterAndRenderTopics();
  });

  clearSearch.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearch.classList.add('hidden');
    filterAndRenderTopics();
    searchInput.focus();
  });

  // 初始啟動
  renderCategories();
  filterAndRenderTopics();
});
