/**
 * ALOE PEDIA — Interactive Botanical Educational Logic
 * Handles: Scrollspy, Reading Progress, Theme Toggle, Search Modal,
 * Interactive Cross-section, Quiz System, FAQ Accordion, Lightbox & Filters
 */

document.addEventListener('DOMContentLoaded', () => {
  initReadingProgress();
  initNavbar();
  initThemeToggle();
  initSearch();
  initCrossSection();
  initStatsCounter();
  initFaqAccordion();
  initGalleryLightbox();
  initQuiz();
  initScrollReveal();
  initBackToTop();
});

/* ==========================================================================
   1. READING PROGRESS BAR
   ========================================================================== */
function initReadingProgress() {
  const progressBar = document.getElementById('reading-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

/* ==========================================================================
   2. NAVBAR & MOBILE NAVIGATION
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Menu Toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // Scrollspy: active link highlighting
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   3. DARK / LIGHT THEME TOGGLE
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('aloepedia_theme') || 'light';
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('aloepedia_theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('aloepedia_theme', 'dark');
    }
  });
}

/* ==========================================================================
   4. SEARCH MODAL WITH REAL-TIME INDEX
   ========================================================================== */
function initSearch() {
  const searchBtn = document.getElementById('search-btn');
  const searchModal = document.getElementById('search-modal');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (!searchBtn || !searchModal) return;

  // Search Data Index
  const searchIndex = [
    { title: 'Pengertian & Habitat Lidah Buaya', category: 'Tentang', link: '#tentang', snippet: 'Tanaman sukulen dari famili Asphodelaceae yang berasal dari wilayah beriklim kering dan tropis.' },
    { title: 'Sejarah Peradaban Kuno (Mesir & Yunani)', category: 'Sejarah', link: '#sejarah', snippet: 'Papirus Ebers 1550 SM, Cleopatra, Aristoteles, dan Dioscorides mencatat penggunaannya.' },
    { title: 'Klasifikasi Ilmiah Aloe vera', category: 'Taksonomi', link: '#klasifikasi', snippet: 'Kingdom Plantae, Ordo Asparagales, Famili Asphodelaceae, Genus Aloe, Spesies Aloe vera.' },
    { title: 'Morfologi Daun, Akar, Batang, dan Bunga', category: 'Morfologi', link: '#morfologi', snippet: 'Akar serabut dangkal, batang pendek acaulescent, daun berdaging dengan gel berlendir.' },
    { title: 'Struktur Irisan Daun & Perbedaan Lateks vs Gel', category: 'Anatomi', link: '#struktur-daun', snippet: 'Kutikula luar, lapisan sel perisikel penghasil aloin (kuning), dan parenkim gel bening.' },
    { title: 'Kandungan Senyawa Aktif & Acemannan', category: 'Kandungan', link: '#kandungan', snippet: 'Polisakarida glukomanan, acemannan, vitamin, mineral, asam amino, dan enzim pencernaan.' },
    { title: 'Manfaat Perawatan Kulit, Rambut & Pangan', category: 'Manfaat', link: '#manfaat', snippet: 'Menenangkan iritasi ringan, menghidrasi kulit, serta bukti ilmiah vs klaim penelitian.' },
    { title: 'Cara Menanam Lidah Buaya di Rumah / Pot', category: 'Budidaya', link: '#budidaya', snippet: 'Panduan langkah demi langkah memilih anakan, media poros pasir/kompos, hingga panen.' },
    { title: 'Kondisi Tumbuh: Cahaya, Air, dan Tanah', category: 'Budidaya', link: '#kondisi-tumbuh', snippet: 'Kebutuhan sinar matahari terang, drainase cepat, dan penyiraman berkala tidak becek.' },
    { title: 'Masalah Tanaman: Daun Menguning & Busuk Akar', category: 'Solusi Hama', link: '#masalah-tanaman', snippet: 'Penyebab overwatering, sunburn, defisiensi hara, serta cara pencegahannya.' },
    { title: 'Panduan Pengolahan Daun & Membuang Lateks', category: 'Pengolahan', link: '#pengolahan', snippet: 'Mencuci, memotong pangkal untuk mengalirkan getah kuning aloin, dan mengeruk gel.' },
    { title: 'Keamanan, Uji Alergi (Patch Test) & Peringatan', category: 'Keamanan', link: '#keamanan', snippet: 'Perhatian bagi ibu hamil, interaksi obat pencahar, dan disclaimer medis resmi.' },
    { title: 'Fakta Menarik & Keunikan Sukulen', category: 'Fakta', link: '#fakta', snippet: 'Kemampuan bertahan di musim kering ekstrim dan fotosintesis adaptif CAM.' },
    { title: 'Mitos vs Fakta Ilmiah Aloe Vera', category: 'Edukasi', link: '#mitos-fakta', snippet: 'Bongkar mitos lidah buaya obat segala penyakit vs fakta ilmiah teruji.' },
    { title: 'Tabel Komparasi Gel Bening vs Lateks Kuning', category: 'Perbandingan', link: '#perbandingan', snippet: 'Perbandingan tekstur, rasa pahit, kandungan aloin, fungsi topikal vs oral.' },
    { title: 'Kuis Interaktif Uji Pengetahuan', category: 'Kuis', link: '#quiz', snippet: 'Uji wawasan biologi dan botani lidah buaya dengan evaluasi instan.' }
  ];

  function openSearch() {
    searchModal.classList.add('open');
    searchInput.value = '';
    searchInput.focus();
    renderResults(searchIndex);
  }

  function closeSearch() {
    searchModal.classList.remove('open');
  }

  searchBtn.addEventListener('click', openSearch);
  searchClose.addEventListener('click', closeSearch);

  // Close on outside click
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });

  // Keyboard shortcut Ctrl+K / Escape
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') {
      closeSearch();
    }
  });

  // Filter Search
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      renderResults(searchIndex);
      return;
    }
    const filtered = searchIndex.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.snippet.toLowerCase().includes(query)
    );
    renderResults(filtered);
  });

  function renderResults(list) {
    if (list.length === 0) {
      searchResults.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted);">Tidak ditemukan materi dengan kata kunci tersebut.</div>`;
      return;
    }
    searchResults.innerHTML = list.map(item => `
      <a href="${item.link}" class="search-result-item" onclick="document.getElementById('search-modal').classList.remove('open');">
        <span class="search-result-category">${item.category}</span>
        <h5 class="search-result-title">${item.title}</h5>
        <p class="search-result-snippet">${item.snippet}</p>
      </a>
    `).join('');
  }
}

/* ==========================================================================
   5. STRUKTUR DAUN (INTERACTIVE CROSS-SECTION TABS)
   ========================================================================== */
function initCrossSection() {
  const tabs = document.querySelectorAll('.cross-tab-item');
  const details = {
    'kulit': {
      title: '1. Kulit Luar (Kutikula & Epidermis)',
      desc: 'Lapisan pelindung keras dan tebal dengan ketebalan sekitar 15–18 lapis sel. Dilapisi kutikula berlilin tebal yang meminimalkan penguapan air saat cuaca panas terik. Berfungsi mensintesis karbohidrat melalui kloroplas dan memberikan struktur mekanik kaku pada daun.',
      sub: 'Mengandung klorofil untuk fotosintesis dan mikropori stomata tipe khusus sukulen.'
    },
    'lateks': {
      title: '2. Lapisan Lateks (Sel Perisikel)',
      desc: 'Terletak tepat di bawah epidermis hijau dan membungkus silinder pusat gel. Merupakan getah cairan kental berwarna kuning kehijauan dengan rasa sangat pahit. Kaya akan turunan antrakuinon seperti Aloin (barbaloin) yang bersifat laksatif (pencahar kuat) dan berfungsi sebagai pelindung alami dari herbivora.',
      sub: 'PENTING: Tidak sama dengan gel transparan. Harus ditiriskan dan dibersihkan jika ingin mengolah gel untuk makanan atau kulit sensitif.'
    },
    'gel': {
      title: '3. Gel Bagian Dalam (Parenkim Air)',
      desc: 'Jaringan lunak dan jernih seperti agar-agar di pusat daun. Terdiri dari sel-sel parenkim berdinding tipis yang menampung cadangan air melimpah. Sekitar 98.5–99% massanya adalah air murni yang diikat oleh rantai polisakarida kompleks terutama acemannan dan glukomanan.',
      sub: 'Bagian utama yang bernilai tinggi untuk formulasi hidrasi kulit, kosmetik, serta olahan minuman segar setelah lateks dibersihkan.'
    }
  };

  const dynamicTitle = document.getElementById('cross-dynamic-title');
  const dynamicDesc = document.getElementById('cross-dynamic-desc');
  const dynamicSub = document.getElementById('cross-dynamic-sub');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-part');
      if (details[target] && dynamicTitle) {
        dynamicTitle.textContent = details[target].title;
        dynamicDesc.textContent = details[target].desc;
        dynamicSub.textContent = details[target].sub;
      }
    });
  });
}

/* ==========================================================================
   6. ANIMATED STATISTICS COUNTER
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseFloat(stat.getAttribute('data-target'));
          const suffix = stat.getAttribute('data-suffix') || '';
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const duration = 2000;
          const increment = target / (duration / 25);

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            stat.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
          }, 25);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsBanner = document.querySelector('.stats-banner');
  if (statsBanner) observer.observe(statsBanner);
}

/* ==========================================================================
   7. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close other accordions
      faqItems.forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   8. GALLERY LIGHTBOX & CATEGORY FILTERS
   ========================================================================== */
function initGalleryLightbox() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (!lightbox) return;

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Open Lightbox
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title')?.textContent || '';
      const tag = item.querySelector('.gallery-tag')?.textContent || '';

      lightboxImg.src = img.src;
      lightboxCaption.textContent = `${tag}: ${title}`;
      lightbox.classList.add('open');
    });
  });

  // Close Lightbox
  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('open');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('open');
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      lightbox.classList.remove('open');
    }
  });
}

/* ==========================================================================
   9. INTERACTIVE BOTANICAL QUIZ
   ========================================================================== */
function initQuiz() {
  const quizData = [
    {
      q: '1. Tanaman lidah buaya secara botani diklasifikasikan ke dalam kelompok apa?',
      options: ['Tanaman air', 'Tanaman sukulen', 'Tumbuhan lumut', 'Tumbuhan paku'],
      correct: 1,
      explanation: 'Benar! Lidah buaya (Aloe vera) adalah tanaman sukulen dari ordo Asparagales dan famili Asphodelaceae yang memiliki organ khusus penyimpan air di daunnya.'
    },
    {
      q: '2. Apakah lidah buaya termasuk famili yang sama dengan kaktus?',
      options: [
        'Ya, lidah buaya adalah salah satu jenis kaktus gurun',
        'Tidak, kaktus tergolong famili Cactaceae sedangkan lidah buaya adalah Asphodelaceae',
        'Ya, karena keduanya memiliki duri di bagian luar',
        'Tidak, lidah buaya tergolong tanaman jamur'
      ],
      correct: 1,
      explanation: 'Tepat! Meskipun sama-sama sukulen adaptif kekeringan, lidah buaya bukan kaktus. Kaktus berfamili Cactaceae, sedangkan lidah buaya berfamili Asphodelaceae.'
    },
    {
      q: '3. Apa nama cairan berwarna kuning kehijauan yang mengalir saat pangkal daun lidah buaya dipotong?',
      options: ['Lateks (mengandung Aloin)', 'Gel kristal murni', 'Klorofil cair', 'Minyak atsiri'],
      correct: 0,
      explanation: 'Tepat! Cairan kuning tersebut adalah lateks dari sel perisikel yang kaya aloin. Rasanya sangat pahit dan memiliki sifat laksatif (pencahar kuat).'
    },
    {
      q: '4. Komponen apa yang menyusun sebagian terbesar (sekitar 98-99%) dari bobot gel Aloe vera segar?',
      options: ['Lemak jenuh', 'Protein kasar', 'Air murni', 'Alkohol etil'],
      correct: 2,
      explanation: 'Benar! Gel bagian dalam lidah buaya sekitar 98.5–99% terdiri dari air, diikat dalam matriks rantai polisakarida seperti acemannan.'
    },
    {
      q: '5. Manakah media tanam yang paling ideal untuk budidaya Aloe vera di pot?',
      options: [
        'Tanah liat padat yang menahan air sebanyak mungkin',
        'Media tanam berporositas tinggi dengan campuran pasir malang/perlite dan drainase lancar',
        'Lumpur sawah basah',
        'Kapas basah tanpa pupuk'
      ],
      correct: 1,
      explanation: 'Benar! Sukulen seperti lidah buaya sangat rentan terhadap pembusukan akar bila tergenang. Media berporositas baik dan pot berlubang adalah kunci utama.'
    },
    {
      q: '6. Sebelum mengoleskan gel lidah buaya segar ke seluruh wajah untuk pertama kali, langkah apa yang paling bijak dilakukan?',
      options: [
        'Langsung mengoleskan dalam jumlah sangat tebal',
        'Melakukan uji tempel (patch test) pada area kecil kulit selama 24 jam',
        'Mencampurnya dengan air mendidih',
        'Meminumnya terlebih dahulu'
      ],
      correct: 1,
      explanation: 'Tepat sekali! Meskipun alami, beberapa orang memiliki kulit hipersensitif terhadap senyawa tanaman. Uji tempel (patch test) dianjurkan untuk mencegah reaksi alergi.'
    },
    {
      q: '7. Mengapa lidah buaya tidak perlu disiram setiap hari?',
      options: [
        'Karena daunnya dapat menyimpan air dan menyerap udara lembap secara mandiri',
        'Karena tanaman ini membenci air dan akan mati jika terkena tetesan air',
        'Karena lidah buaya tidak memiliki akar aktif',
        'Karena lidah buaya hanya minum setahun sekali'
      ],
      correct: 0,
      explanation: 'Benar! Sebagai sukulen, jaringan parenkim daunnya menyimpan cadangan air melimpah. Menyiram setiap hari justru menyebabkan media terlalu becek dan memicu busuk akar.'
    }
  ];

  let currentIdx = 0;
  let score = 0;

  const quizCard = document.getElementById('quiz-question-card');
  const quizResult = document.getElementById('quiz-result-view');
  const progressFill = document.getElementById('quiz-progress-fill');
  const metaQuestionNum = document.getElementById('quiz-meta-num');
  const questionText = document.getElementById('quiz-question-text');
  const optionsContainer = document.getElementById('quiz-options-container');
  const feedbackBox = document.getElementById('quiz-feedback-box');
  const nextBtn = document.getElementById('quiz-next-btn');
  const restartBtn = document.getElementById('quiz-restart-btn');
  const finalScoreNum = document.getElementById('quiz-final-score');
  const finalScoreMsg = document.getElementById('quiz-final-msg');

  if (!quizCard) return;

  function loadQuestion(index) {
    const q = quizData[index];
    metaQuestionNum.textContent = `Pertanyaan ${index + 1} dari ${quizData.length}`;
    questionText.textContent = q.q;
    progressFill.style.width = `${((index + 1) / quizData.length) * 100}%`;

    feedbackBox.className = 'quiz-feedback-box';
    feedbackBox.textContent = '';
    nextBtn.style.display = 'none';

    optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.innerHTML = `<span class="quiz-opt-letter">${letters[i]}</span> <span>${opt}</span>`;
      btn.addEventListener('click', () => selectAnswer(i, btn));
      optionsContainer.appendChild(btn);
    });
  }

  function selectAnswer(chosenIdx, btnElem) {
    const q = quizData[currentIdx];
    const buttons = optionsContainer.querySelectorAll('.quiz-opt-btn');

    // Disable all buttons after choice
    buttons.forEach(b => b.disabled = true);

    if (chosenIdx === q.correct) {
      score++;
      btnElem.classList.add('correct');
      feedbackBox.className = 'quiz-feedback-box correct show';
      feedbackBox.innerHTML = `<strong>Jawaban Benar!</strong> ${q.explanation}`;
    } else {
      btnElem.classList.add('incorrect');
      buttons[q.correct].classList.add('correct');
      feedbackBox.className = 'quiz-feedback-box incorrect show';
      feedbackBox.innerHTML = `<strong>Jawaban Kurang Tepat.</strong> ${q.explanation}`;
    }

    if (currentIdx < quizData.length - 1) {
      nextBtn.textContent = 'Pertanyaan Selanjutnya →';
    } else {
      nextBtn.textContent = 'Lihat Hasil Akhir →';
    }
    nextBtn.style.display = 'inline-flex';
  }

  nextBtn.addEventListener('click', () => {
    currentIdx++;
    if (currentIdx < quizData.length) {
      loadQuestion(currentIdx);
    } else {
      showResults();
    }
  });

  function showResults() {
    quizCard.style.display = 'none';
    quizResult.classList.add('show');
    finalScoreNum.textContent = `${score}/${quizData.length}`;

    const percentage = (score / quizData.length) * 100;
    if (percentage === 100) {
      finalScoreMsg.textContent = 'Luar Biasa! Pemahaman botani dan karakteristik lidah buaya kamu sempurna seperti ahli botani!';
    } else if (percentage >= 70) {
      finalScoreMsg.textContent = 'Hebat! Kamu memiliki wawasan yang sangat baik tentang karakteristik, anatomi, dan perawatan Aloe vera.';
    } else {
      finalScoreMsg.textContent = 'Bagus! Kamu sudah mulai memahami dasar-dasar lidah buaya. Baca materi kembali untuk memperdalam wawasanmu!';
    }
  }

  restartBtn.addEventListener('click', () => {
    currentIdx = 0;
    score = 0;
    quizResult.classList.remove('show');
    quizCard.style.display = 'block';
    loadQuestion(currentIdx);
  });

  // Initial load
  loadQuestion(0);
}

/* ==========================================================================
   10. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   11. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
