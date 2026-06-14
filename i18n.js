document.addEventListener('DOMContentLoaded', () => {
  const defaultLang = 'en';
  let currentLang = localStorage.getItem('portfolio_lang') || defaultLang;

  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  }

  function setLanguage(lang) {
    if (!translations[lang]) lang = defaultLang;
    currentLang = lang;
    localStorage.setItem('portfolio_lang', lang);

    document.documentElement.lang = lang;
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Handle form placeholders specifically
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });
  }

  // Initial load
  setLanguage(currentLang);
});
