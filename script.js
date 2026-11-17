/* ============================================
   THE WORLD THROUGH MY EYES - SCRIPT
   ============================================ */

let audioCtx = null;
let soundEnabled = false;
let bgMusic = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playClick() {
    if (!soundEnabled || !audioCtx) return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.frequency.value = 800;
    osc.type = 'sine';
    
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
    
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.15);
}

function playChime() {
    if (!soundEnabled || !audioCtx) return;
    
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.frequency.value = freq;
        osc.type = 'sine';
        
        const startTime = audioCtx.currentTime + i * 0.08;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.1, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);
        
        osc.start(startTime);
        osc.stop(startTime + 0.5);
    });
}

/* -------------------------------------------
   INTRO - EMOJIS NYC / IT GIRL
   ------------------------------------------- */
function createEmojis() {
    const container = document.getElementById('emojisContainer');
    if (!container) return;
    
    const emojis = ['💋', '🗽', '🌃', '✨', '📱', '👠', '💎', '🖤', '🎀', '📸', '🌹', '💌', '🤍', '🥂', '🌙', '💅', '👜', '🍸'];
    const total = 30;

    for (let i = 0; i < total; i++) {
        const emoji = document.createElement('span');
        emoji.className = 'emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.animationDuration = (6 + Math.random() * 6) + 's';
        emoji.style.animationDelay = (Math.random() * 4) + 's';
        emoji.style.fontSize = (1.5 + Math.random() * 2) + 'rem';
        container.appendChild(emoji);
    }
}

/* -------------------------------------------
   MARIPOSAS VOLANDO
   ------------------------------------------- */
function createButterflies() {
    const container = document.getElementById('butterfliesContainer');
    if (!container) return;
    
    const total = 12;

    for (let i = 0; i < total; i++) {
        const butterfly = document.createElement('span');
        butterfly.className = 'butterfly';
        butterfly.textContent = '🦋';
        
        butterfly.style.left = Math.random() * 80 + '%';
        butterfly.style.top = (20 + Math.random() * 70) + '%';
        butterfly.style.animationDuration = (10 + Math.random() * 10) + 's';
        butterfly.style.animationDelay = (Math.random() * 8) + 's';
        butterfly.style.fontSize = (1.2 + Math.random() * 1.5) + 'rem';
        
        container.appendChild(butterfly);
    }
}

/* -------------------------------------------
   MODAL DE DEDICATORIAS
   ------------------------------------------- */
function setupDedicationModal() {
    const modal = document.getElementById('dedicationModal');
    const modalName = document.getElementById('modalName');
    const modalText = document.getElementById('modalText');
    const modalClose = document.getElementById('modalClose');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    // Verificar que el modal existe
    if (!modal) {
        console.error('❌ No se encontró el modal. Verifica que el HTML del modal esté después de </main>');
        return;
    }

    // Buscar TODAS las tarjetas con data-text
    const cards = document.querySelectorAll('[data-text]');
    console.log('✅ Tarjetas encontradas con data-text:', cards.length);

    // Agregar evento click a cada tarjeta
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const name = card.getAttribute('data-name');
            const text = card.getAttribute('data-text');
            
            console.log('📖 Abriendo dedicatoria de:', name);
            
            modalName.textContent = name + ' ♡';
            modalText.textContent = text;
            modal.classList.add('active');
            
            if (soundEnabled) playChime();
        });
    });

    // Función para cerrar el modal
    function closeModal() {
        modal.classList.remove('active');
    }

    // Cerrar con botón X
    if (modalClose) {
        modalClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    }

    // Cerrar al hacer click fuera
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* -------------------------------------------
   INTRO - BOTÓN ENTER MY WORLD
   ------------------------------------------- */
function setupIntro() {
    const enterBtn = document.getElementById('enterBtn');
    const intro = document.getElementById('intro');
    const main = document.getElementById('mainContent');

    if (!enterBtn) return;

    enterBtn.addEventListener('click', () => {
        playChime();
        intro.classList.add('exit');
        
        setTimeout(() => {
            intro.style.display = 'none';
if (main) {
    main.classList.remove('hidden');
}            setTimeout(() => main.classList.add('visible'), 50);
            
            if (soundEnabled && bgMusic) {
                bgMusic.volume = 0.3;
                bgMusic.play().catch(() => {});
            }
        }, 1200);
    });
}

/* -------------------------------------------
   BOTÓN DE SONIDO
   ------------------------------------------- */
function setupSoundToggle() {
    const toggle = document.getElementById('soundToggle');
    bgMusic = document.getElementById('bgMusic');

    if (!toggle) return;

    toggle.addEventListener('click', () => {
        initAudio();
        soundEnabled = !soundEnabled;
        toggle.textContent = soundEnabled ? '🔊' : '🔇';
        
        if (soundEnabled && bgMusic && !document.getElementById('intro').classList.contains('exit')) {
            bgMusic.volume = 0.3;
            bgMusic.play().catch(() => {});
        } else if (!soundEnabled && bgMusic) {
            bgMusic.pause();
        }
        
        if (soundEnabled) playClick();
    });
}

/* -------------------------------------------
   SONIDOS EN ELEMENTOS INTERACTIVOS
   ------------------------------------------- */
function setupInteractiveSounds() {
    document.querySelectorAll('[data-sound="click"]').forEach(el => {
        el.addEventListener('click', playClick);
    });
}

/* -------------------------------------------
   REVEAL AL HACER SCROLL
   ------------------------------------------- */
function setupScrollReveal() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(s => s.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(s => observer.observe(s));
}

/* -------------------------------------------
   PARALLAX SUAVE
   ------------------------------------------- */
function setupParallax() {
    const cloud = document.getElementById('traitsCloud');
    if (!cloud) return;

    window.addEventListener('scroll', () => {
        const rect = cloud.getBoundingClientRect();
        const visible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (visible) {
            const scrolled = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            const traits = cloud.querySelectorAll('.trait');
            traits.forEach((trait, i) => {
                const speed = (i % 3 + 1) * 0.5;
                const offset = (scrolled - 0.5) * speed * 30;
                trait.style.transform = `translateY(${offset}px)`;
            });
        }
    });
}

/* -------------------------------------------
   HOVER SONORO
   ------------------------------------------- */
function setupHoverSounds() {
    document.querySelectorAll('.love-card, .dream-card, .family-card, .friend-card, .talent-item').forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (soundEnabled) playClick();
        });
    });
}

/* -------------------------------------------
   BRILLITOS QUE CAEN AL HACER CLICK
   ------------------------------------------- */
function setupClickParticles() {
    const container = document.createElement('div');
    container.id = 'clickParticles';
    document.body.appendChild(container);

    // SOLO BRILLITOS ✨
    const emojis = ['✨', '✨', '💫', '⭐', '✦', '🌟'];

    document.addEventListener('click', (e) => {
        const cantidad = 12; // más brillitos por click

        for (let i = 0; i < cantidad; i++) {
            const emoji = document.createElement('span');
            emoji.className = 'click-emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

            // Posición exacta del cursor
            emoji.style.left = e.clientX + 'px';
            emoji.style.top = e.clientY + 'px';

            // Movimiento aleatorio
            const dx = (Math.random() - 0.5) * 220;
            const dy = 140 + Math.random() * 180;
            const rot = (Math.random() - 0.5) * 900;

            emoji.style.setProperty('--dx', dx + 'px');
            emoji.style.setProperty('--dy', dy + 'px');
            emoji.style.setProperty('--rot', rot + 'deg');

            // Tamaño variable y más grande
            emoji.style.fontSize = (1.3 + Math.random() * 1.5) + 'rem';
            emoji.style.animationDuration = (1.3 + Math.random() * 0.9) + 's';

            container.appendChild(emoji);

            // Limpiar después de la animación
            emoji.addEventListener('animationend', () => emoji.remove());
        }
    });
}
/* -------------------------------------------
   GALERÍA NUBE DE BEBÉ
   ------------------------------------------- */
function setupBabyGallery() {
    const gallery = document.getElementById('babyGallery');
    const openBtn = document.getElementById('openBabyGallery');
    const closeBtn = document.getElementById('closeBabyGallery');
    const backdrop = document.querySelector('.baby-gallery-backdrop');

    // Esto nos ayudará a saber si el código encontró los elementos
    console.log("🔍 Buscando elementos de la galería:", { gallery, openBtn });

    if (!gallery || !openBtn) {
        console.error("❌ ERROR: No se encontró la galería o el botón. Revisa los IDs en el HTML.");
        return;
    }

    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("✅ ¡Click detectado en la polaroid!");
        gallery.classList.add('active');
        if (typeof soundEnabled !== 'undefined' && soundEnabled) playChime();
    });

    function closeGallery() {
        gallery.classList.remove('active');
    }

    if (closeBtn) closeBtn.addEventListener('click', closeGallery);
    if (backdrop) backdrop.addEventListener('click', closeGallery);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && gallery.classList.contains('active')) {
            closeGallery();
        }
    });
}

/* -------------------------------------------
   LLUVIA DE BRILLITOS EN WELCOME
   ------------------------------------------- */
function setupWelcomeSparkles() {
    const container = document.getElementById('welcomeSparkles');
    if (!container) return;

    const sparkles = ['✨', '✨', '💫', '⭐', '✦', '🌟'];
    const totalSparkles = 15; // Cuántos brillitos hay al mismo tiempo

    // Función para crear un brillito
    function createSparkle() {
        const sparkle = document.createElement('span');
        sparkle.className = 'welcome-sparkle';
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        
        // Posición horizontal aleatoria
        sparkle.style.left = Math.random() * 100 + '%';
        
        // Duración y delay aleatorios
        sparkle.style.animationDuration = (4 + Math.random() * 4) + 's';
        sparkle.style.animationDelay = (Math.random() * 3) + 's';
        
        // Tamaño variable
        sparkle.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
        
        container.appendChild(sparkle);
        
        // Eliminar después de la animación para no saturar
        setTimeout(() => {
            sparkle.remove();
        }, 10000);
    }

    // Crear brillitos iniciales
    for (let i = 0; i < totalSparkles; i++) {
        setTimeout(() => {
            createSparkle();
        }, i * 300);
    }

    // Crear nuevos brillitos continuamente
    setInterval(() => {
        createSparkle();
    }, 800); // Cada 800ms aparece un nuevo brillito
}

/* -------------------------------------------
   FLECHA "NEXT CHAPTER" CON EXPLOSIÓN DE ESTRELLAS
   ------------------------------------------- */
function setupNextChapterArrow() {
    const btn = document.getElementById('nextChapterBtn');
    if (!btn) return;

    // Crear contenedor para las estrellas
    const starContainer = document.createElement('div');
    starContainer.className = 'star-explosion-container';
    document.body.appendChild(starContainer);

    const stars = ['✦', '✧', '⭐', '✨', '★', '✶', '✴'];

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Obtener posición de la flecha
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Crear explosión de estrellas
        const totalStars = 25;
        
        for (let i = 0; i < totalStars; i++) {
            const star = document.createElement('span');
            star.className = 'star-explosion';
            
            // Agregar efecto glow a algunas estrellas
            if (Math.random() > 0.5) {
                star.classList.add('star-glow');
            }
            
            star.textContent = stars[Math.floor(Math.random() * stars.length)];
            star.style.left = centerX + 'px';
            star.style.top = centerY + 'px';
            
            // Dirección aleatoria en 360 grados
            const angle = (Math.PI * 2 * i) / totalStars + (Math.random() - 0.5) * 0.5;
            const distance = 200 + Math.random() * 300;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const rot = (Math.random() - 0.5) * 1080;
            
            star.style.setProperty('--tx', tx + 'px');
            star.style.setProperty('--ty', ty + 'px');
            star.style.setProperty('--rot', rot + 'deg');
            
            // Tamaño variable
            star.style.fontSize = (1.5 + Math.random() * 2) + 'rem';
            star.style.animationDuration = (1.5 + Math.random() * 0.8) + 's';
            star.style.animationDelay = (Math.random() * 0.2) + 's';
            
            starContainer.appendChild(star);
            
            // Limpiar después de la animación
            setTimeout(() => star.remove(), 2500);
        }

        // Sonido si está activado
        if (soundEnabled) playChime();

        // Scroll suave al siguiente capítulo después de un pequeño delay
        setTimeout(() => {
            const nextSection = document.getElementById('whoami');
            if (nextSection) {
                nextSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, 400);
    });
}
/* -------------------------------------------
   EFECTO MÁQUINA DE ESCRIBIR PARA "WHO AM I"
   ------------------------------------------- */
function setupTypewriter() {
    const element = document.getElementById('typewriterText');
    if (!element) return;

    const text = "Who is she?";
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 120);
        }
    }

    // Iniciar cuando la sección sea visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                element.textContent = '';
                index = 0;
                type();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(element.closest('.section-whoami'));
}

/* -------------------------------------------
   MODAL CINEMATOGRÁFICO DEL MOOD BOARD
   ------------------------------------------- */
function setupAestheticModal() {
    const modal = document.getElementById('aestheticModal');
    const image = document.getElementById('aestheticImage');
    const tag = document.getElementById('aestheticTag');
    const counter = document.getElementById('aestheticCounter');
    const closeBtn = document.getElementById('aestheticClose');
    const prevBtn = document.getElementById('aestheticPrev');
    const nextBtn = document.getElementById('aestheticNext');
    const flash = document.querySelector('.paparazzi-flash');
    const backdrop = document.querySelector('.aesthetic-backdrop');
    
    if (!modal) return;
    
    // Obtener todas las imágenes del corazón
    const heartImages = document.querySelectorAll('.heart-img img');
    const totalImages = heartImages.length;
    let currentIndex = 0;
    
    // Función para abrir el modal
    function openModal(index) {
        currentIndex = index;
        updateImage();
        
        // Activar flash de paparazzi
        flash.classList.add('flash');
        setTimeout(() => flash.classList.remove('flash'), 600);
        
        // Abrir modal
        modal.classList.add('active');
        
        if (soundEnabled) playChime();
    }
    
    // Actualizar la imagen mostrada
    function updateImage() {
        const img = heartImages[currentIndex];
        if (!img) return;
        
        // Resetear animación
        image.style.animation = 'none';
        image.offsetHeight; // Forzar reflow
        image.style.animation = '';
        
        image.src = img.src;
        tag.textContent = `AESTHETIC · Nº ${String(currentIndex + 1).padStart(2, '0')}`;
        counter.textContent = `${currentIndex + 1} / ${totalImages}`;
    }
    
    // Cerrar modal
    function closeModal() {
        modal.classList.remove('active');
    }
    
    // Navegación
    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateImage();
        if (soundEnabled) playClick();
    }
    
    function prevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateImage();
        if (soundEnabled) playClick();
    }
    
    // Event listeners para cada imagen del corazón
    heartImages.forEach((img, index) => {
        img.parentElement.addEventListener('click', () => openModal(index));
    });
    
    // Botones
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);
    
    // Teclado
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
}
/* -------------------------------------------
   BOTÓN "TURN THE PAGE" CON EXPLOSIÓN DE LETRAS
   ------------------------------------------- */
function setupTurnPageButton() {
    const btn = document.getElementById('turnPageBtn');
    if (!btn) return;

    // Crear contenedores
    const letterContainer = document.createElement('div');
    letterContainer.className = 'letter-explosion-container';
    document.body.appendChild(letterContainer);

    const pageOverlay = document.createElement('div');
    pageOverlay.className = 'page-turn-overlay';
    document.body.appendChild(pageOverlay);

    // Las letras XOXO + decorativas
    const letters = ['X', 'O', 'X', 'O', '✦', '✧', '♡', '·'];

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Obtener posición del botón
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 1. Activar animación de "despliegue" de la esquina
        const corner = btn.querySelector('.turn-page-corner');
        corner.classList.add('unfolding');
        
        // 2. Activar overlay de página volteándose
        pageOverlay.classList.add('turning');

        // 3. Crear explosión de letras XOXO
        const totalLetters = 20;
        
        for (let i = 0; i < totalLetters; i++) {
            const letter = document.createElement('span');
            letter.className = 'flying-letter';
            
            // Alternar entre dorado y rosa
            if (Math.random() > 0.5) {
                letter.classList.add('pink');
            }
            
            letter.textContent = letters[Math.floor(Math.random() * letters.length)];
            letter.style.left = centerX + 'px';
            letter.style.top = centerY + 'px';
            
            // Dirección en 360 grados
            const angle = (Math.PI * 2 * i) / totalLetters + (Math.random() - 0.5) * 0.4;
            const distance = 250 + Math.random() * 350;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const rot = (Math.random() - 0.5) * 1440;
            
            letter.style.setProperty('--tx', tx + 'px');
            letter.style.setProperty('--ty', ty + 'px');
            letter.style.setProperty('--rot', rot + 'deg');
            
            // Tamaño variable (las X y O más grandes)
            const isLetter = ['X', 'O'].includes(letter.textContent);
            letter.style.fontSize = isLetter 
                ? (3 + Math.random() * 2) + 'rem'
                : (1.5 + Math.random() * 1.5) + 'rem';
            
            letter.style.animationDuration = (1.5 + Math.random() * 0.8) + 's';
            letter.style.animationDelay = (Math.random() * 0.15) + 's';
            
            letterContainer.appendChild(letter);
            
            setTimeout(() => letter.remove(), 2500);
        }

        // 4. Sonido
        if (soundEnabled) playChime();

        // 5. Scroll suave al siguiente capítulo
        setTimeout(() => {
            const nextSection = document.getElementById('love');
            if (nextSection) {
                nextSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, 500);

        // 6. Resetear la esquina después de la animación
        setTimeout(() => {
            corner.classList.remove('unfolding');
            pageOverlay.classList.remove('turning');
        }, 1500);
    });
}
/* -------------------------------------------
   ✨ 1. CURSOR PERSONALIZADO CON RASTRO MÁGICO
   ------------------------------------------- */
function setupMagicCursor() {
    // No activar en móviles
    if (window.innerWidth < 768) return;

    // Crear cursor principal
    const cursor = document.createElement('div');
    cursor.className = 'magic-cursor';
    cursor.textContent = '✦';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let lastTrailTime = 0;

    // Seguir el mouse con suavidad
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Crear rastro cada ciertos milisegundos
        const now = Date.now();
        if (now - lastTrailTime > 60) {
            createTrail(mouseX, mouseY);
            lastTrailTime = now;
        }
    });

    // Animación suave del cursor
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Crear rastro
    function createTrail(x, y) {
        const trail = document.createElement('span');
        trail.className = 'cursor-trail';
        
        // Detectar si estamos en la sección de amigas
        const friendsSection = document.getElementById('friends');
        if (friendsSection) {
            const rect = friendsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                trail.classList.add('butterfly');
                trail.textContent = '🦋';
            } else if (Math.random() > 0.5) {
                trail.classList.add('pink');
                trail.textContent = '♡';
            } else {
                trail.textContent = '✦';
            }
        } else {
            trail.textContent = Math.random() > 0.5 ? '✦' : '✨';
        }

        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        document.body.appendChild(trail);

        setTimeout(() => trail.remove(), 1000);
    }

    // Cambiar cursor cuando está sobre algo interactivo
    const interactiveElements = document.querySelectorAll('a, button, .heart-img, .friend-card, .family-card, .love-card, .talent-item, .dream-card, .polaroid-clickable, .trait-reveal, .mood-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

/* -------------------------------------------
   📖 2. MANIFIESTO CON ANIMACIÓN DE SCROLL
   ------------------------------------------- */
function setupManifesto() {
    const section = document.getElementById('manifesto');
    if (!section) return;

    const tag = section.querySelector('.manifesto-tag');
    const lines = section.querySelectorAll('.manifesto-line');
    const signature = section.querySelector('.manifesto-signature');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Activar tag
                setTimeout(() => tag.classList.add('visible'), 200);
                
                // Activar cada línea con delay escalonado
                lines.forEach((line, i) => {
                    setTimeout(() => {
                        line.classList.add('visible');
                    }, 600 + i * 400);
                });
                
                // Activar firma al final
                setTimeout(() => {
                    signature.classList.add('visible');
                }, 600 + lines.length * 400 + 500);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(section);
}

/* -------------------------------------------
   🕵️‍♀️ 3. EASTER EGG GOSSIP GIRL MODE
   ------------------------------------------- */
function setupGossipEasterEgg() {
    const overlay = document.getElementById('gossipOverlay');
    if (!overlay) return;

    const secretCode = 'gossip';
    let currentInput = '';
    let timeout;

    document.addEventListener('keydown', (e) => {
        // Ignorar si está escribiendo en un input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        // Solo letras
        if (e.key.length === 1) {
            currentInput += e.key.toLowerCase();
            
            // Mantener solo los últimos caracteres necesarios
            if (currentInput.length > secretCode.length) {
                currentInput = currentInput.slice(-secretCode.length);
            }
            
            // Resetear después de 2 segundos sin teclas
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                currentInput = '';
            }, 2000);

            // Si coincide el código secreto
            if (currentInput === secretCode) {
                activateGossipMode();
                currentInput = '';
            }
        }
    });

    function activateGossipMode() {
        // Crear coronas flotantes
        for (let i = 0; i < 15; i++) {
            const crown = document.createElement('span');
            crown.className = 'gossip-crown';
            crown.textContent = '👑';
            crown.style.left = Math.random() * 100 + '%';
            crown.style.top = Math.random() * 100 + '%';
            crown.style.animationDelay = Math.random() * 2 + 's';
            crown.style.fontSize = (1.5 + Math.random() * 2) + 'rem';
            overlay.appendChild(crown);
        }

        // Activar overlay
        overlay.classList.add('active');
        
        if (soundEnabled) playChime();

        // Desactivar después de 8 segundos
        setTimeout(() => {
            overlay.classList.remove('active');
            // Limpiar coronas
            overlay.querySelectorAll('.gossip-crown').forEach(c => c.remove());
        }, 8000);

        // Cerrar con click
        overlay.addEventListener('click', function closeOnce() {
            overlay.classList.remove('active');
            overlay.querySelectorAll('.gossip-crown').forEach(c => c.remove());
            overlay.removeEventListener('click', closeOnce);
        });
    }
}
/* -------------------------------------------
   MODAL DE DETALLES DEL DIARIO
   ------------------------------------------- */
function setupDiaryModal() {
    const modal = document.getElementById('diaryModal');
    const modalImage = document.getElementById('diaryModalImage');
    const modalNumber = document.getElementById('diaryModalNumber');
    const modalCategory = document.getElementById('diaryModalCategory');
    const modalTitle = document.getElementById('diaryModalTitle');
    const modalDescription = document.getElementById('diaryModalDescription');
    const modalExtra = document.getElementById('diaryModalExtra');
    const closeBtn = document.getElementById('diaryModalClose');
    const backdrop = document.querySelector('.diary-modal-backdrop');
    
    if (!modal) return;

    // Datos expandidos para cada gusto
    const diaryData = {
        series: {
            number: 'Nº 01',
            category: 'SERIES',
            image: 'assets/images/series.jpg',
            fallbackImage: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800',
            title: 'Full House & Gossip Girl',
            description: 'Me encariño tanto con los personajes que cuando terminan, siento que me despido de un mundo. Con Gossip Girl me quedé triste toda una semana.',
            extra: '"Las series no son solo entretenimiento, son mundos donde vivo temporalmente."'
        },
        dance: {
            number: 'Nº 02',
            category: 'DANCE',
            image: 'assets/images/dance.jpg',
            fallbackImage: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600',
            title: 'Bachata, salsa & reguetón',
            description: 'Me encanta dejarme llevar por el ritmo, conectar con cada canción. Generalmente bailo sola, es mi forma de expresarme.',
            extra: '"Bailar es mi meditación, mi terapia, mi libertad."'
        },
        childhood: {
            number: 'Nº 03',
            category: 'NOSTALGIA',
            image: 'assets/images/childhood.jpg',
            fallbackImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500',
            title: 'Videos de mi infancia',
            description: 'YouTube es mi máquina del tiempo. Ver videos antiguos me transporta a momentos que guardo con tanto cariño.',
            extra: '"La nostalgia es el precio que pagamos por los momentos más hermosos."'
        },
        fashion: {
            number: 'Nº 04',
            category: 'FASHION',
            image: 'assets/images/fashion.jpg',
            fallbackImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900',
            title: 'Elegante, chic & 2000s vibes',
            description: 'Mi estilo es elegante y chic, pero me encantan las tendencias de los 2000. Amo la moda, los detalles, los accesorios y experimentar con diferentes looks.',
            extra: '"La moda es mi lenguaje silencioso, mi forma de decir quién soy sin palabras."'
        },
        cooking: {
            number: 'Nº 05',
            category: 'COOKING',
            image: 'assets/images/cooking.jpg',
            fallbackImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
            title: 'Queques, pastelitos & cheesecake',
            description: 'Disfruto todo el proceso de cocinar y darle un toque especial. Una vez intenté hacer un cheesecake de maracuyá y me encantó experimentar.',
            extra: '"Cocinar es crear con las manos y alimentar el alma."'
        },
        makeup: {
            number: 'Nº 06',
            category: 'BEAUTY',
            image: 'assets/images/makeup.jpg',
            fallbackImage: 'https://images.unsplash.com/photo-1522335789203-aaa2f6a9c8c3?w=500',
            title: 'Makeup mood',
            description: 'Un labial nuevo cambia el día entero. El maquillaje es mi forma de arte, mi terapia, mi expresión.',
            extra: '"El maquillaje no es para esconder, es para resaltar quién eres."'
        }
    };

    // Abrir modal
    function openModal(detailKey) {
        const data = diaryData[detailKey];
        if (!data) return;

        modalImage.src = data.image;
        modalImage.onerror = function() { this.src = data.fallbackImage; };
        modalNumber.textContent = data.number;
        modalCategory.textContent = data.category;
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        modalExtra.textContent = data.extra;

        modal.classList.add('active');
        if (soundEnabled) playChime();
    }

    // Cerrar modal
    function closeModal() {
        modal.classList.remove('active');
    }

    // Event listeners para cada página del diario
    document.querySelectorAll('.diary-page').forEach(page => {
        page.addEventListener('click', () => {
            const detailKey = page.getAttribute('data-detail');
            openModal(detailKey);
        });
    });

    // Botones de cerrar
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
/* -------------------------------------------
   BOTÓN "SECRET LETTER" - SOBRE CON LACRE
   ------------------------------------------- */
function setupSecretLetter() {
    const btn = document.getElementById('secretLetterBtn');
    const envelope = document.getElementById('secretEnvelope');
    if (!btn || !envelope) {
        console.log('⚠️ Botón secret letter no encontrado');
        return;
    }

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('✅ Click en el sobre detectado');
        
        // Obtener posición del lacre para las partículas
        const seal = envelope.querySelector('.secret-seal');
        const rect = seal.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 1. Crear partículas doradas
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('span');
            particle.className = 'seal-particle';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            
            const angle = (Math.PI * 2 * i) / 15;
            const distance = 60 + Math.random() * 80;
            const px = Math.cos(angle) * distance;
            const py = Math.sin(angle) * distance;
            
            particle.style.setProperty('--px', px + 'px');
            particle.style.setProperty('--py', py + 'px');
            particle.style.animationDelay = (Math.random() * 0.2) + 's';
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1500);
        }

        // 2. Activar animación de apertura
        envelope.classList.add('opening');

        // 3. Sonido
        if (typeof soundEnabled !== 'undefined' && soundEnabled && typeof playChime === 'function') {
            playChime();
        }

        // 4. Scroll al siguiente capítulo - MÚLTIPLES INTENTOS
        setTimeout(() => {
            // Intentar con diferentes selectores
            let nextSection = document.getElementById('talents');
            
            if (!nextSection) {
                nextSection = document.querySelector('#talents');
            }
            
            if (!nextSection) {
                // Buscar por el número de sección
                nextSection = document.querySelector('.section-number');
                if (nextSection && nextSection.textContent.trim() === '04') {
                    nextSection = nextSection.closest('.section');
                } else {
                    nextSection = null;
                }
            }
            
            if (!nextSection) {
                // Último intento: buscar la sección después de "love"
                const loveSection = document.getElementById('love');
                if (loveSection) {
                    nextSection = loveSection.nextElementSibling;
                    // Saltar el modal si aparece
                    while (nextSection && nextSection.classList.contains('diary-modal')) {
                        nextSection = nextSection.nextElementSibling;
                    }
                }
            }
            
            if (nextSection) {
                console.log('✅ Sección encontrada:', nextSection.id || nextSection.className);
                
                // Método 1: scrollIntoView
                try {
                    nextSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start'
                    });
                } catch (err) {
                    // Método 2: scrollTo como fallback
                    const targetPosition = nextSection.offsetTop;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            } else {
                console.error('❌ No se encontró ninguna sección siguiente');
                // Fallback: scroll manual
                window.scrollBy({
                    top: 800,
                    behavior: 'smooth'
                });
            }
        }, 1000);

        // 5. Resetear animación
        setTimeout(() => {
            envelope.classList.remove('opening');
        }, 2500);
    });
}
/* -------------------------------------------
   MODAL DE DETALLES DEL TALENTO
   ------------------------------------------- */
function setupTalentModal() {
    const modal = document.getElementById('talentModal');
    const modalIcon = document.getElementById('talentModalIcon');
    const modalRarity = document.getElementById('talentModalRarity');
    const modalEdition = document.getElementById('talentModalEdition');
    const modalTitle = document.getElementById('talentModalTitle');
    const modalDescription = document.getElementById('talentModalDescription');
    const modalQuote = document.getElementById('talentModalQuote');
    const closeBtn = document.getElementById('talentModalClose');
    const backdrop = document.querySelector('.talent-modal-backdrop');
    
    if (!modal) return;

   const talentData = {
    art: {
        rarity: 'LEGENDARY',
        edition: 'Nº 01/05',
        icon: '🎨',
        title: 'The Art Reader',
        description: 'Tengo una habilidad natural para interpretar el arte en todas sus formas. Puedo leer entre líneas, sentir lo que otros callan, y encontrar significado donde otros solo ven superficie. El arte me habla, y yo le respondo.',
        quote: '"El arte no se ve con los ojos, se siente con el alma."'
    },
    soul: {
        rarity: 'EPIC',
        edition: 'Nº 02/05',
        icon: '🌙',
        title: 'The Soul Seeker',
        description: 'Reflexionar y conocerme a mí misma es uno de mis mayores talentos. Mi mente es mi lugar favorito para perderme y encontrarme. Tengo una conexión profunda con mis emociones y con las de los demás.',
        quote: '"Conocerse a uno mismo es el comienzo de toda sabiduría."'
    },
    sweet: {
        rarity: 'RARE',
        edition: 'Nº 03/05',
        icon: '🧁',
        title: 'The Sweet Maker',
        description: 'Cocinar y hacer manualidades son mis formas favoritas de arte. El arte también se saborea, y yo lo sé bien. Cada postre que hago lleva un pedacito de mi corazón.',
        quote: '"La cocina es donde el amor se vuelve comestible."'
    },
    aesthetic: {
        rarity: 'LEGENDARY',
        edition: 'Nº 04/05',
        icon: '👁️',
        title: 'The Aesthetic Eye',
        description: 'Tengo visión estética y espacial. Veo belleza donde otros ven lo cotidiano. Puedo transformar lo ordinario en extraordinario con solo mirar, y esa es mi forma de crear magia en el mundo.',
        quote: '"La belleza está en los ojos de quien mira, y yo miro con el corazón."'
    },
    creator: {
        rarity: 'EPIC',
        edition: 'Nº 05/05',
        icon: '✋',
        title: 'The Creator',
        description: 'Tengo facilidad para las actividades manuales. Mis manos crean cosas que mi corazón imagina. Desde manualidades hasta proyectos creativos, puedo transformar ideas en realidad tangible.',
        quote: '"Crear es la forma más pura de existir."'
    }
};

    function openModal(talentKey) {
        const data = talentData[talentKey];
        if (!data) return;

        modalIcon.textContent = data.icon;
        modalRarity.textContent = data.rarity;
        modalEdition.textContent = data.edition;
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        modalQuote.textContent = data.quote;

        modal.classList.add('active');
        if (soundEnabled) playChime();
    }

    function closeModal() {
        modal.classList.remove('active');
    }

    // ⚠️ IMPORTANTE: Excluir la wild-card del modal
document.querySelectorAll('.talent-card').forEach(card => {
    if (card.classList.contains('wild-card')) {
        return; // NO agregar listener a la wild card
    }
    
    card.addEventListener('click', () => {
        const talentKey = card.getAttribute('data-talent');
        openModal(talentKey);
    });
});

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
/* -------------------------------------------
   WILD CARD - FUNCIÓN GLOBAL SIMPLE
   ------------------------------------------- */
function wildCardClick(e) {
    e.preventDefault();
    
    // Crear partículas
    const wildCard = document.getElementById('wildCardBtn');
    const rect = wildCard.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('span');
        particle.className = 'wild-particle ' + (i % 2 === 0 ? 'gold' : 'pink');
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        
        const angle = (Math.PI * 2 * i) / 25;
        const distance = 100 + Math.random() * 150;
        particle.style.setProperty('--px', (Math.cos(angle) * distance) + 'px');
        particle.style.setProperty('--py', (Math.sin(angle) * distance) + 'px');
        particle.style.animationDelay = (Math.random() * 0.2) + 's';
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
    }

    // Sonido
    if (typeof soundEnabled !== 'undefined' && soundEnabled && typeof playChime === 'function') {
        playChime();
    }

    // Scroll suave a My Family
    setTimeout(function() {
        const familySection = document.getElementById('family');
        if (familySection) {
            familySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 300);
}
/* -------------------------------------------
   APARICIÓN DE POLAROIDS DEL CHAPTER 3
   ------------------------------------------- */
function setupDiaryReveal() {
    const pages = document.querySelectorAll('.diary-page');
    
    if (!pages.length) {
        console.log('⚠️ No se encontraron diary-pages');
        return;
    }

    console.log('✅ Diary pages encontradas:', pages.length);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    pages.forEach(page => observer.observe(page));
}
/* -------------------------------------------
   MODAL DE DETALLES DEL DIARIO (CHAPTER 3)
   ------------------------------------------- */
function setupDiaryModal() {
    const modal = document.getElementById('diaryModal');
    if (!modal) {
        console.log('⚠️ No se encontró el modal del diario');
        return;
    }

    const modalImage = document.getElementById('diaryModalImage');
    const modalNumber = document.getElementById('diaryModalNumber');
    const modalCategory = document.getElementById('diaryModalCategory');
    const modalTitle = document.getElementById('diaryModalTitle');
    const modalDescription = document.getElementById('diaryModalDescription');
    const modalExtra = document.getElementById('diaryModalExtra');
    const closeBtn = document.getElementById('diaryModalClose');
    const backdrop = document.querySelector('.diary-modal-backdrop');

    // Datos de cada polaroid
    const diaryData = {
        series: {
            number: 'Nº 01',
            category: 'SERIES',
            image: 'assets/images/series.jpg',
            fallbackImage: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800',
            title: 'comfort shows',
            description: 'Full House, Gossip Girl, y todas esas series que se convierten en mi refugio. Me encariño tanto con los personajes que cuando terminan, siento que me despido de un mundo.',
            extra: '"Las series no son solo entretenimiento, son mundos donde vivo temporalmente."'
        },
        dance: {
            number: 'Nº 02',
            category: 'DANCE',
            image: 'assets/images/dance.jpg',
            fallbackImage: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600',
            title: 'dancing alone',
            description: 'Bachata, salsa, reguetón. Bailo sola, en mi cuarto, con la música a todo volumen. Me encanta dejarme llevar por el ritmo, conectar con cada canción.',
            extra: '"Bailar es mi meditación, mi terapia, mi libertad."'
        },
        childhood: {
            number: 'Nº 03',
            category: 'NOSTALGIA',
            image: 'assets/images/childhood.jpg',
            fallbackImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500',
            title: 'my time machine',
            description: 'Videos antiguos de mi infancia en YouTube. Soy nostálgica y volver a ver esos momentos me transporta a una época más simple, más inocente, más yo.',
            extra: '"La nostalgia es el precio que pagamos por los momentos más hermosos."'
        },
        fashion: {
            number: 'Nº 04',
            category: 'FASHION',
            image: 'assets/images/fashion.jpg',
            fallbackImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900',
            title: 'outfits & little details',
            description: 'Mi estilo es elegante y chic, pero me encantan las tendencias de los 2000. Amo la moda, los detalles, los accesorios y experimentar con diferentes looks.',
            extra: '"La moda es mi lenguaje silencioso, mi forma de decir quién soy sin palabras."'
        },
        cooking: {
            number: 'Nº 05',
            category: 'COOKING',
            image: 'assets/images/cooking.jpg',
            fallbackImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
            title: 'sugar, love & homemade cakes',
            description: 'Disfruto todo el proceso de cocinar y darle un toque especial. Hago queques, decoro pastelitos y experimento con postres. Una vez intenté hacer un cheesecake de maracuyá.',
            extra: '"Cocinar es crear con las manos y alimentar el alma."'
        },
        makeup: {
            number: 'Nº 06',
            category: 'BEAUTY',
            image: 'assets/images/makeup.jpg',
            fallbackImage: 'https://images.unsplash.com/photo-1522335789203-aaa2f6a9c8c3?w=500',
            title: 'makeup as a mood',
            description: 'Un labial nuevo cambia el día entero. El maquillaje es mi forma de arte, mi terapia, mi expresión. No es para esconder, es para resaltar quién soy.',
            extra: '"El maquillaje no es para esconder, es para resaltar quién eres."'
        }
    };

    // Abrir modal
    function openModal(detailKey) {
        const data = diaryData[detailKey];
        if (!data) return;

        modalImage.src = data.image;
        modalImage.onerror = function() { this.src = data.fallbackImage; };
        modalNumber.textContent = data.number;
        modalCategory.textContent = data.category;
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        modalExtra.textContent = data.extra;

        modal.classList.add('active');
        if (typeof soundEnabled !== 'undefined' && soundEnabled && typeof playChime === 'function') {
            playChime();
        }
    }

    // Cerrar modal
    function closeModal() {
        modal.classList.remove('active');
    }

    // Click en cada polaroid
    document.querySelectorAll('.diary-page').forEach(page => {
        page.addEventListener('click', () => {
            const detailKey = page.getAttribute('data-detail');
            openModal(detailKey);
        });
    });

    // Cerrar con botón
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    
    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
// También mantener la función setupWildCard por si acaso
function setupWildCard() {

    // Ya no necesitamos hacer nada porque el HTML hace todo
    console.log('✅ Wild Card lista (modo enlace directo)');
}
/* -------------------------------------------
   APARICIÓN DE TARJETAS DEL DIARY CHAPTER 3
   ------------------------------------------- */
function setupDiaryReveal() {
    const pages = document.querySelectorAll('.diary-page');
    if (!pages.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    pages.forEach(page => observer.observe(page));
}
/* -------------------------------------------
   MODAL CARTA MANUSCRITA FAMILIAR
   ------------------------------------------- */
function setupFamilyLetterModal() {
    const modal = document.getElementById('familyLetterModal');
    const modalMemory = document.getElementById('familyLetterMemory');
    const modalName = document.getElementById('familyLetterName');
    const modalRole = document.getElementById('familyLetterRole');
    const modalText = document.getElementById('familyLetterText');
    const closeBtn = document.getElementById('familyLetterClose');
    const backdrop = document.querySelector('.family-letter-backdrop');
    
    if (!modal) return;

    // Datos de cada familiar
    const familyData = {
        dad: {
            memory: 'MEMORY Nº 01',
            name: 'Mi papá',
            role: 'El héroe de mi historia',
            text: 'Mi papá es una de las personas que más admiro. Es alguien muy perseverante y trabajador, y siento que he aprendido muchísimas cosas de él a lo largo de mi vida. Admiro su manera de seguir adelante y de esforzarse por conseguir lo que quiere. Siempre voy a valorar todo lo que hace por nuestra familia y espero que sepa lo importante que es para mí. Lo quiero muchísimo.'
        },
        mom: {
            memory: 'MEMORY Nº 02',
            name: 'Mi mamá',
            role: 'Mi refugio y mi todo',
            text: 'Mi mamá es una de las personas con las que más puedo ser yo misma. Siempre está para mí, especialmente cuando estoy triste o necesito un consejo. Siento que puedo contarle mis cosas con toda la confianza del mundo y que siempre encontrará la manera de ayudarme. Con ella me río muchísimo, puedo ser espontánea y simplemente disfrutar de ser yo. La amo demasiado y me siento muy afortunada de tenerla como mamá.'
        },
        andrea: {
            memory: 'MEMORY Nº 03',
            name: 'Andrea',
            role: 'Mi hermana menor',
            text: 'Aunque a veces tengamos nuestras diferencias y no siempre compartamos los mismos juegos o intereses por nuestra diferencia de edad, siempre vas a ser mi chiquita. Te veo como una mezcla entre mi hermanita y mi hijita, porque tengo ese instinto de cuidarte y querer protegerte de todo. Quiero que sepas que, aunque a veces pueda ser renegona contigo, te amo muchísimo y siempre voy a estar para ti. Espero verte crecer, cumplir tus sueños y saber que puedes contar conmigo para lo que necesites.'
        },
        charo: {
            memory: 'MEMORY Nº 04',
            name: 'Mamá Charo',
            role: 'Mi abuelita, mi segunda mamá',
            text: 'Eres una persona demasiado especial para mí. Siempre voy a guardar con muchísimo cariño tus consejos y todas las cosas que me has enseñado. Para mí eres como una segunda mamá y agradezco muchísimo tenerte en mi vida. Gracias por recordarme que nunca debo rendirme, que debo seguir adelante y, sobre todo, que debo ser feliz. Te adoro muchísimo.'
        },
        valentina: {
            memory: 'MEMORY Nº 05',
            name: 'Vale',
            role: 'Mi prima, mi hermana del alma',
            text: 'Tengo muchísimos recuerdos contigo, desde cuando éramos pequeñas hasta todos los momentos que hemos compartido ahora que somos más grandes. Hemos pasado por tantas cosas: hemos llorado juntas, nos hemos reído hasta no poder más y hemos estado la una para la otra en diferentes momentos. Me encanta recordar todas nuestras ocurrencias y las experiencias que hemos vivido. Siempre voy a guardar un cariño enorme por ti y por nuestra historia. Gracias por ser parte de tantos recuerdos bonitos de mi vida. Te quiero muchísimo.'
        },
        lluvia: {
            memory: 'MEMORY Nº 06',
            name: 'Lluvia',
            role: 'Mi prima, mi cómplice',
            text: 'Estos últimos años he creado muchísimos recuerdos bonitos contigo. Me encanta recordar todas las veces que hemos salido, nos hemos divertido, hemos ido de compras y hasta cuando hemos manejado moto. Son experiencias que quizás parecen simples, pero que para mí hacen que nuestra relación sea tan especial. Me gusta poder compartir esos momentos contigo, reírnos y disfrutar juntas. Espero que sigamos viviendo muchísimas aventuras y creando recuerdos que algún día podamos recordar con la misma emoción. Te quiero mucho.'
        }
    };

    // Abrir modal
    function openModal(familyKey) {
        const data = familyData[familyKey];
        if (!data) return;

        modalMemory.textContent = data.memory;
        modalName.textContent = data.name;
        modalRole.textContent = data.role;
        modalText.textContent = data.text;

        modal.classList.add('active');
        if (typeof soundEnabled !== 'undefined' && soundEnabled && typeof playChime === 'function') {
            playChime();
        }
    }

    // Cerrar modal
    function closeModal() {
        modal.classList.remove('active');
    }

    // Click en cada retrato
    document.querySelectorAll('.family-portrait').forEach(portrait => {
        portrait.addEventListener('click', () => {
            const familyKey = portrait.getAttribute('data-family');
            openModal(familyKey);
        });
    });

    // Botones de cerrar
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    
    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* -------------------------------------------
   APARICIÓN DE RETRATOS FAMILIARES
   ------------------------------------------- */
function setupFamilyReveal() {
    const portraits = document.querySelectorAll('.family-portrait');
    if (!portraits.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    portraits.forEach(portrait => observer.observe(portrait));
}
function setupFamilyLetterModal() {
    const modal = document.getElementById('familyLetterModal');
    if (!modal) {
        console.error("No se encontró el modal #familyLetterModal en el HTML");
        return;
    }

    // Aquí están los textos. ¡Puedes editarlos a tu gusto!
    const familyData = {
        dad: { name: "Mi papá", role: "El héroe de mi historia", text: "Mi papá es una de las personas que más admiro. Es alguien muy perseverante y trabajador, y siento que he aprendido muchísimas cosas de él a lo largo de mi vida." },
        mom: { name: "Mi mamá", role: "Mi refugio y mi todo", text: "Mi mamá es una de las personas con las que más puedo ser yo misma. Siempre está para mí, especialmente cuando estoy triste o necesito un consejo." },
        andrea: { name: "Andrea", role: "Mi hermana menor", text: "Aunque a veces tengamos nuestras diferencias, siempre vas a ser mi chiquita. Tengo ese instinto de cuidarte y querer protegerte de todo." },
        charo: { name: "Mamá Charo", role: "Mi abuelita, mi segunda mamá", text: "Eres una persona demasiado especial para mí. Siempre voy a guardar con muchísimo cariño tus consejos y todas las cosas que me has enseñado." },
        valentina: { name: "Vale", role: "Mi prima, mi hermana del alma", text: "Tengo muchísimos recuerdos contigo. Hemos llorado juntas, nos hemos reído hasta no poder más y hemos estado la una para la otra." },
        lluvia: { name: "Lluvia", role: "Mi prima, mi cómplice", text: "Estos últimos años he creado muchísimos recuerdos bonitos contigo. Me encanta recordar todas las veces que hemos salido y nos hemos divertido." }
    };

    // 1. Escuchar el clic en cualquier tarjeta de familia
    document.querySelectorAll('.family-card, .family-portrait').forEach(card => {
        card.style.cursor = 'pointer'; // Fuerza el cursor de mano
        card.addEventListener('click', function() {
            const key = this.getAttribute('data-family');
            const data = familyData[key];
            
            if (data) {
                document.getElementById('familyLetterName').textContent = data.name;
                document.getElementById('familyLetterRole').textContent = data.role;
                document.getElementById('familyLetterText').textContent = data.text;
                modal.classList.add('active');
            }
        });
    });

    // 2. Función para cerrar
    const closeModal = () => modal.classList.remove('active');

    const closeBtn = document.getElementById('familyLetterClose');
    const backdrop = modal.querySelector('.family-letter-backdrop');

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    // 3. Cerrar también con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
/* ==========================================
   MODAL DE CARTA FAMILIAR (CORREGIDO)
   ========================================== */
function setupFamilyLetterModal() {
    const modal = document.getElementById('familyLetterModal');
    
    if (!modal) {
        console.error("❌ ERROR: No se encontró el modal #familyLetterModal en el HTML.");
        return;
    }

    const modalMemory = document.getElementById('familyLetterMemory');
    const modalName = document.getElementById('familyLetterName');
    const modalRole = document.getElementById('familyLetterRole');
    const modalText = document.getElementById('familyLetterText');
    const closeBtn = document.getElementById('familyLetterClose');
    const backdrop = document.querySelector('.family-letter-backdrop');

    const familyData = {
        dad: { memory: 'MEMORY Nº 01', name: 'Mi papá', role: 'El héroe de mi historia', text: 'Mi papá es una de las personas que más admiro. Es alguien muy perseverante y trabajador, y siento que he aprendido muchísimas cosas de él a lo largo de mi vida. Admiro su manera de seguir adelante y de esforzarse por conseguir lo que quiere. Siempre voy a valorar todo lo que hace por nuestra familia y espero que sepa lo importante que es para mí. Lo quiero muchísimo.' },
        mom: { memory: 'MEMORY Nº 02', name: 'Mi mamá', role: 'Mi refugio y mi todo', text: 'Mi mamá es una de las personas con las que más puedo ser yo misma. Siempre está para mí, especialmente cuando estoy triste o necesito un consejo. Siento que puedo contarle mis cosas con toda la confianza del mundo y que siempre encontrará la manera de ayudarme. Con ella me río muchísimo, puedo ser espontánea y simplemente disfrutar de ser yo. La amo demasiado y me siento muy afortunada de tenerla como mamá.' },
        andrea: { memory: 'MEMORY Nº 03', name: 'Andrea', role: 'Mi hermana menor', text: 'Aunque a veces tengamos nuestras diferencias y no siempre compartamos los mismos juegos o intereses por nuestra diferencia de edad, siempre vas a ser mi chiquita. Te veo como una mezcla entre mi hermanita y mi hijita, porque tengo ese instinto de cuidarte y querer protegerte de todo. Quiero que sepas que, aunque a veces pueda ser renegona contigo, te amo muchísimo y siempre voy a estar para ti. Espero verte crecer, cumplir tus sueños y saber que puedes contar conmigo para lo que necesites.' },
        charo: { memory: 'MEMORY Nº 04', name: 'Mamá Charo', role: 'Mi abuelita, mi segunda mamá', text: 'Eres una persona demasiado especial para mí. Siempre voy a guardar con muchísimo cariño tus consejos y todas las cosas que me has enseñado. Para mí eres como una segunda mamá y agradezco muchísimo tenerte en mi vida. Gracias por recordarme que nunca debo rendirme, que debo seguir adelante y, sobre todo, que debo ser feliz. Te adoro muchísimo.' },
        valentina: { memory: 'MEMORY Nº 05', name: 'Vale', role: 'Mi prima, mi hermana del alma', text: 'Tengo muchísimos recuerdos contigo, desde cuando éramos pequeñas hasta todos los momentos que hemos compartido ahora que somos más grandes. Hemos pasado por tantas cosas: hemos llorado juntas, nos hemos reído hasta no poder más y hemos estado la una para la otra en diferentes momentos. Me encanta recordar todas nuestras ocurrencias y las experiencias que hemos vivido. Siempre voy a guardar un cariño enorme por ti y por nuestra historia. Gracias por ser parte de tantos recuerdos bonitos de mi vida. Te quiero muchísimo.' },
        lluvia: { memory: 'MEMORY Nº 06', name: 'Lluvia', role: 'Mi prima, mi cómplice', text: 'Estos últimos años he creado muchísimos recuerdos bonitos contigo. Me encanta recordar todas las veces que hemos salido, nos hemos divertido, hemos ido de compras y hasta cuando hemos manejado moto. Son experiencias que quizás parecen simples, pero que para mí hacen que nuestra relación sea tan especial. Me gusta poder compartir esos momentos contigo, reírnos y disfrutar juntas. Espero que sigamos viviendo muchísimas aventuras y creando recuerdos que algún día podamos recordar con la misma emoción. Te quiero mucho.' }
    };

    function openModal(familyKey) {
        const data = familyData[familyKey];
        if (!data) return;

        modalMemory.textContent = data.memory;
        modalName.textContent = data.name;
        modalRole.textContent = data.role;
        modalText.textContent = data.text;
        modal.classList.add('active');
        
        if (typeof soundEnabled !== 'undefined' && soundEnabled && typeof playChime === 'function') {
            playChime();
        }
    }

    function closeModal() {
        modal.classList.remove('active');
    }

    const portraits = document.querySelectorAll('.family-portrait');
    portraits.forEach(portrait => {
        portrait.style.cursor = 'pointer';
        portrait.addEventListener('click', () => {
            const familyKey = portrait.getAttribute('data-family');
            openModal(familyKey);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeModal(); });
    if (backdrop) backdrop.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ==========================================
   INICIALIZACIÓN AL CARGAR LA PÁGINA
   ========================================== */
   function setupGoldenKey() {
    const btn = document.getElementById('goldenKeyBtn');
    if (!btn) return;
    
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const talentsSection = document.getElementById('talents');
        if (talentsSection) {
            talentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    // ... aquí van tus otras funciones de inicialización ...
    
    // Asegúrate de que esta línea esté presente:
    setupFamilyLetterModal();
});
/*// ==========================================
// TRANSICIÓN DE FLOR GIGANTE (CHAPTER 5 -> 6)
// ==========================================
function setupFlowerTransition() {
    const btn = document.getElementById('flowerTransitionBtn');
    if (!btn) {
        console.log('⚠️ Botón flowerTransitionBtn no encontrado (agrégalo al HTML si lo necesitas)');
        return;
    }
    console.log('✅ Botón de transición de flor encontrado');

    btn.addEventListener('click', () => {
        const overlay = document.getElementById('flowerOverlay');
        if (overlay) {
            overlay.classList.add('active');
            setTimeout(() => overlay.classList.add('blooming'), 50);
            
            setTimeout(() => {
                // Busca la siguiente sección (ajusta 'friends' o 'chapter6' según tu HTML real)
                const nextSection = document.getElementById('friends') || document.getElementById('chapter6');
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'auto', block: 'start' });
                }
                setTimeout(() => {
                    overlay.classList.remove('blooming');
                    setTimeout(() => overlay.classList.remove('active'), 800);
                }, 600);
            }, 1200);
        }
    });
}

}
/* ============================================
   SECCIÓN MY FRIENDS (INTERACTIVIDAD)
   ============================================ */
function setupFriendsSection() {
    const modal = document.getElementById('friendsModal');
    if (!modal) {
        console.log("⚠️ No se encontró el modal de My Friends en el HTML");
        return;
    }

    const modalName = document.getElementById('friendsModalName');
    const modalText = document.getElementById('friendsModalText');
    const modalImage = document.getElementById('friendsModalImage');
    const closeBtn = document.getElementById('friendsModalClose');
    const backdrop = document.querySelector('.friends-modal-backdrop');

    // ⚠️ DATOS DE TUS AMIGAS: Cambia las claves (ej: 'sofia') y los textos por los reales.
    // Las claves deben coincidir con el atributo data-friend="..." en tu HTML.
    const friendsData = {
        sofia: { 
            name: "Sofía", 
            text: "Mi compañera de aventuras y risas infinitas. Desde el primer día supe que seríamos amigas para siempre.", 
            image: "assets/images/sofia.jpg" 
        },
        valeria: { 
            name: "Valeria", 
            text: "La persona que siempre me escucha y me da los mejores consejos. Gracias por estar en las buenas y en las malas.", 
            image: "assets/images/valeria.jpg" 
        },
        camila: { 
            name: "Camila", 
            text: "Con ella cualquier momento se vuelve especial. Gracias por tantas memorias increíbles juntas.", 
            image: "assets/images/camila.jpg" 
        }
    };

    function openModal(friendKey) {
        const data = friendsData[friendKey];
        if (!data) return;

        if (modalName) modalName.textContent = data.name;
        if (modalText) modalText.textContent = data.text;
        if (modalImage) {
            modalImage.src = data.image;
            // Imagen de respaldo por si la foto no carga
            modalImage.onerror = () => { 
                modalImage.src = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500'; 
            };
        }

        modal.classList.add('active');
        if (typeof soundEnabled !== 'undefined' && soundEnabled && typeof playChime === 'function') {
            playChime();
        }
    }

    function closeModal() {
        modal.classList.remove('active');
    }

    // Asignar clicks a las tarjetas de amigas
    document.querySelectorAll('.friend-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-friend');
            openModal(key);
        });
    });

    // Cerrar modal
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('nextChapterBtn');
    const overlay = document.getElementById('transitionOverlay');

    if (btn && overlay) {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita comportamientos por defecto

            // 1. Obtener la posición del botón para que la animación nazca desde ahí
            const rect = btn.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            // Establecer el punto de origen del círculo
            overlay.style.clipPath = `circle(0% at ${x}px ${y}px)`;
            
            // Forzar al navegador a registrar el cambio antes de animar
            void overlay.offsetWidth;

            // 2. ¡Iniciar la animación de expansión!
            overlay.style.clipPath = `circle(150% at ${x}px ${y}px)`;
            overlay.classList.add('active');

            // 3. Esperar a que la pantalla se cubra (800ms = 0.8s del CSS)
            setTimeout(() => {
                // ⚠️ CAMBIA '#MyFriends' POR EL ID DE TU SIGUIENTE SECCIÓN
                const nextSection = document.querySelector('#MyFriends') || document.querySelector('#next-chapter');

                if (nextSection) {
                    // Hacer scroll instantáneo mientras la pantalla está cubierta
                    nextSection.scrollIntoView({ behavior: 'auto', block: 'start' });
                }

                // 4. Esperar un momento y revelar la nueva sección
                setTimeout(() => {
                    overlay.classList.remove('active');
                    
                    // Resetear la animación para que funcione si se vuelve atrás
                    setTimeout(() => {
                        overlay.style.clipPath = `circle(0% at 50% 50%)`;
                    }, 800);
                }, 500);

            }, 800); 
        });
    } else {
        console.error("No se encontró el botón o el overlay. Revisa los IDs en el HTML.");
    }
});
/* ============================================
   TRANSICIÓN WOW: MY FRIENDS → MY DREAMS
   ============================================ */
function setupDreamsTransition() {
    const btn = document.getElementById('dreamsTransitionBtn');
    
    // ⚠️ EL ID CORRECTO DE TU SECCIÓN MY DREAMS
    const targetSectionId = '#DreamBig';

    if (!btn) {
        console.log('⚠️ No se encontró el botón dreamsTransitionBtn');
        return;
    }

    console.log('✅ Botón de transición a My Dreams listo');

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('📖 Click en el botón de My Dreams');

        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 1. Crear partículas volando
        createDreamsParticles(centerX, centerY);

        // 2. Crear overlay con página que se voltea
        const overlay = document.createElement('div');
        overlay.className = 'dreams-overlay';
        overlay.innerHTML = `
            <div class="dreams-page">
                <div class="dreams-page-content">
                    <div class="chapter-number">Chapter Seven</div>
                    <div class="chapter-title">My Dreams</div>
                    <div class="chapter-subtitle">turning the page...</div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        // 3. Activar animación
        requestAnimationFrame(() => {
            overlay.querySelector('.dreams-page').classList.add('flipping');
        });

        // 4. Scroll a My Dreams en el momento justo
        setTimeout(() => {
            const target = document.querySelector(targetSectionId);
            if (target) {
                console.log('✅ Navegando a My Dreams');
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                console.error('❌ No se encontró la sección:', targetSectionId);
            }
        }, 600);

        // 5. Limpiar overlay
        setTimeout(() => {
            overlay.remove();
        }, 1400);
    });

    function createDreamsParticles(x, y) {
        const particles = ['✨', '🌙', '⭐', '💫', '🌸', '✦', '🦋'];
        const count = 30;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('span');
            particle.className = 'dreams-particle';
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            
            const angle = (Math.PI * 2 * i) / count;
            const distance = 150 + Math.random() * 250;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const rot = (Math.random() - 0.5) * 720;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            particle.style.setProperty('--rot', rot + 'deg');
            particle.style.animationDelay = (Math.random() * 0.3) + 's';
            particle.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1800);
        }
    }
}
/* -------------------------------------------
   INICIALIZACIÓN (TODO SE ACTIVA AQUÍ)
   ------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    createEmojis();
    createButterflies();
    setupIntro();
    setupSoundToggle();
    setupInteractiveSounds();
    setupScrollReveal();
    setupParallax();
    setupHoverSounds();
    setupDedicationModal();
    setupClickParticles();
    setupBabyGallery();
    setupWelcomeSparkles();
    setupNextChapterArrow();
    setupTypewriter();
    setupAestheticModal();
    setupTurnPageButton();
    setupMagicCursor();
    setupManifesto();
    setupGossipEasterEgg();
    setupDiaryModal();
    setupGoldenKey();
    setupTalentModal();
    setupWildCard();   // ← NUEVA LÍNEA
    setupDiaryReveal(); 
    setupWildCard(); 
    setupDiaryReveal();
    setupFamilyLetterModal();   // ← NUEVA LÍNEA
    setupFamilyReveal();
    setupFlowerTransition(); //
    setupFriendsSection();
    setupFlowerButton();  
    setupFlowerButton(); 
    setupDreamsTransition();
     setupDreamsTransition();  
});