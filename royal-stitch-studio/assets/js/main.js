/* ==========================================================================
   Royal Stitch Studio — interactions & motion (no dependencies)
   ========================================================================== */
(() => {
    const doc = document.documentElement;
    doc.classList.remove('no-js');

    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const lerp = (a, b, t) => a + (b - a) * t;
    const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

    /* ---------- Broken images: let the fabric-toned background show ---------- */
    $$('img').forEach(img => {
        const hide = () => {
            const name = img.closest('figcaption') && img.closest('figcaption').querySelector('b');
            if (name) {
                // Avatar: swap in the client's initials
                const initials = document.createElement('span');
                initials.className = 'avatar-initials';
                initials.textContent = name.textContent.split(' ').map(w => w[0]).join('').slice(0, 2);
                img.replaceWith(initials);
            } else {
                img.style.visibility = 'hidden';
            }
        };
        if (img.complete && img.naturalWidth === 0 && img.src) hide();
        img.addEventListener('error', hide);
    });

    /* ---------- Split text into words (keeps <em> etc.) ---------- */
    function splitWords(root, className) {
        const words = [];
        const walk = node => {
            Array.from(node.childNodes).forEach(child => {
                if (child.nodeType === Node.TEXT_NODE) {
                    const parts = child.textContent.split(/(\s+)/);
                    const frag = document.createDocumentFragment();
                    parts.forEach(part => {
                        if (!part) return;
                        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
                        const span = document.createElement('span');
                        span.className = className;
                        span.textContent = part;
                        frag.appendChild(span);
                        words.push(span);
                    });
                    child.replaceWith(frag);
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    walk(child);
                }
            });
        };
        walk(root);
        return words;
    }

    $$('[data-split]').forEach(el => {
        let i = 0;
        $$('.line', el).forEach(line => {
            splitWords(line, 'word').forEach(w => { w.style.setProperty('--wd', (i++ * 0.06) + 's'); });
        });
    });

    const statement = $('#statement');
    const statementWords = statement ? splitWords(statement, 'sw') : [];

    $$('.quote blockquote').forEach(q => {
        splitWords(q, 'qw').forEach((w, i) => w.style.setProperty('--wd', (i * 0.025) + 's'));
    });

    /* ---------- Measuring tape ---------- */
    const tapeTrack = $('#tapeTrack');
    if (tapeTrack) {
        const frag = document.createDocumentFragment();
        for (let cm = 0; cm <= 150; cm++) {
            const d = document.createElement('div');
            d.className = 'tape-cm' + (cm % 10 === 0 ? ' is-red' : '');
            d.innerHTML = '<span>' + cm + '</span>';
            frag.appendChild(d);
        }
        tapeTrack.appendChild(frag);
    }

    /* ---------- Reveal on scroll ---------- */
    let revealObserver;
    function startReveals() {
        const targets = $$('[data-reveal], [data-split], [data-clip]');
        if (reduceMotion || !('IntersectionObserver' in window)) {
            targets.forEach(t => t.classList.add('is-in'));
            return;
        }
        // A fully clipped element never reports as intersecting, so clipped
        // figures are watched through their parent instead.
        const watched = new Map();
        revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                (watched.get(entry.target) || []).forEach(el => el.classList.add('is-in'));
                revealObserver.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
        targets.forEach(t => {
            const watch = t.hasAttribute('data-clip') ? t.parentElement : t;
            if (!watched.has(watch)) watched.set(watch, []);
            watched.get(watch).push(t);
            revealObserver.observe(watch);
        });
    }

    /* ---------- Counters ---------- */
    function animateCount(el) {
        const target = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const format = el.hasAttribute('data-format');
        const out = v => {
            const fixed = v.toFixed(decimals);
            return format ? Number(fixed).toLocaleString('en-IN') : fixed;
        };
        if (reduceMotion) { el.textContent = out(target); return; }
        const duration = 1800;
        const start = performance.now();
        const tick = now => {
            const t = clamp((now - start) / duration, 0, 1);
            const eased = 1 - Math.pow(1 - t, 4);
            el.textContent = out(target * eased);
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }
    if ('IntersectionObserver' in window) {
        const countObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { animateCount(entry.target); countObserver.unobserve(entry.target); }
            });
        }, { threshold: 0.6 });
        $$('[data-count]').forEach(el => countObserver.observe(el));
    } else {
        $$('[data-count]').forEach(animateCount);
    }

    /* ---------- Loader ---------- */
    const loader = $('#loader');
    const loaderCount = $('#loaderCount');
    function finishLoading() {
        document.body.classList.remove('is-loading');
        if (loader) {
            loader.classList.add('is-done');
            setTimeout(() => loader.remove(), 1100);
        }
        setTimeout(startReveals, reduceMotion ? 0 : 350);
    }
    if (!loader || reduceMotion) {
        if (loader) loader.remove();
        document.body.classList.remove('is-loading');
        startReveals();
    } else {
        const duration = 1300;
        const start = performance.now();
        const tick = now => {
            const t = clamp((now - start) / duration, 0, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            loaderCount.textContent = String(Math.round(eased * 100)).padStart(2, '0');
            if (t < 1) requestAnimationFrame(tick);
            else setTimeout(finishLoading, 200);
        };
        requestAnimationFrame(tick);
    }

    /* ---------- Header, mobile menu ---------- */
    const header = $('#siteHeader');
    const menuToggle = $('#menuToggle');
    const mobileMenu = $('#mobileMenu');
    function setMenu(open) {
        document.body.classList.toggle('menu-open', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        mobileMenu.setAttribute('aria-hidden', String(!open));
        document.body.style.overflow = open ? 'hidden' : '';
    }
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
        $$('a', mobileMenu).forEach(a => a.addEventListener('click', () => setMenu(false)));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
    }

    const navLinks = $$('.nav-link');
    const navSections = navLinks.map(l => $(l.getAttribute('href'))).filter(Boolean);

    /* ---------- Scroll-driven effects ---------- */
    const progressBar = $('#scrollProgress');
    const parallaxEls = $$('[data-speed]');
    const steps = $$('.step');
    const stepsList = $('#steps');
    const threadFill = $('#threadFill');
    let lastY = window.scrollY;
    let scrollVelocity = 0;
    let ticking = false;

    function onScroll() {
        const y = window.scrollY;
        const vh = window.innerHeight;
        const delta = y - lastY;
        scrollVelocity = delta;

        // Header state
        if (header) {
            header.classList.toggle('is-scrolled', y > 20);
            const menuOpen = document.body.classList.contains('menu-open');
            if (!menuOpen) header.classList.toggle('is-hidden', delta > 4 && y > 500);
            if (delta < -4) header.classList.remove('is-hidden');
        }

        // Progress
        const max = document.documentElement.scrollHeight - vh;
        if (progressBar) progressBar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';

        // Active nav link
        let current = null;
        navSections.forEach(sec => { if (sec.getBoundingClientRect().top < vh * 0.4) current = sec.id; });
        navLinks.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + current));

        if (!reduceMotion) {
            // Measuring tape slides with scroll
            if (tapeTrack) tapeTrack.style.transform = 'translate3d(' + (-y * 0.6 - 40) + 'px,0,0)';

            // Parallax images
            parallaxEls.forEach(el => {
                const r = el.parentElement.getBoundingClientRect();
                if (r.bottom < -200 || r.top > vh + 200) return;
                const offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.speed);
                el.style.translate = '0 ' + offset.toFixed(1) + 'px';
            });

            // Statement words light up as you read
            if (statement && statementWords.length) {
                const r = statement.getBoundingClientRect();
                const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0, 1);
                const lit = Math.round(p * statementWords.length);
                statementWords.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
            }
        }

        // Process thread
        if (stepsList && threadFill) {
            const r = stepsList.getBoundingClientRect();
            const p = clamp((vh * 0.55 - r.top) / r.height, 0, 1);
            threadFill.style.transform = 'scaleY(' + p + ')';
            steps.forEach(s => s.classList.toggle('is-passed', s.getBoundingClientRect().top < vh * 0.55));
        }

        lastY = y;
        ticking = false;
    }
    window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    /* ---------- Marquee (speeds up & flips with scroll) ---------- */
    const marquee = $('#marqueeTrack');
    if (marquee && !reduceMotion) {
        let x = 0;
        let dir = -1;
        let boost = 0;
        const loop = () => {
            if (scrollVelocity !== 0) {
                dir = scrollVelocity > 0 ? -1 : 1;
                boost = clamp(Math.abs(scrollVelocity) * 0.25, 0, 14);
                scrollVelocity = 0;
            }
            boost = lerp(boost, 0, 0.06);
            x += dir * (0.6 + boost);
            const half = marquee.scrollWidth / 2;
            if (x <= -half) x += half;
            if (x > 0) x -= half;
            marquee.style.transform = 'translate3d(' + x + 'px,0,0)';
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }

    /* ---------- Custom cursor ---------- */
    const cursor = $('.cursor');
    if (cursor && finePointer && !reduceMotion) {
        const dot = $('.cursor-dot', cursor);
        const ring = $('.cursor-ring', cursor);
        const label = $('#cursorLabel');
        let mx = -100, my = -100, rx = -100, ry = -100;
        window.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
            const t = e.target instanceof Element ? e.target : null;
            const labelled = t && t.closest('[data-cursor]');
            const interactive = t && t.closest('a, button, summary, label, input, textarea');
            cursor.classList.toggle('is-label', !!labelled);
            if (labelled) label.textContent = labelled.dataset.cursor;
            cursor.classList.toggle('is-hover', !labelled && !!interactive);
            cursor.classList.toggle('is-dark', !!(t && t.closest('.process, .services, .footer, .cta, .auth-side')));
        }, { passive: true });
        document.addEventListener('mouseleave', () => { mx = my = -100; });
        const follow = () => {
            rx = lerp(rx, mx, 0.18); ry = lerp(ry, my, 0.18);
            ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
            requestAnimationFrame(follow);
        };
        requestAnimationFrame(follow);
    }

    /* ---------- Magnetic buttons ---------- */
    if (finePointer && !reduceMotion) {
        $$('[data-magnetic]').forEach(el => {
            const strength = parseFloat(el.dataset.strength || '0.25');
            el.addEventListener('mousemove', e => {
                const r = el.getBoundingClientRect();
                const dx = e.clientX - (r.left + r.width / 2);
                const dy = e.clientY - (r.top + r.height / 2);
                el.style.transform = 'translate(' + dx * strength + 'px,' + dy * strength + 'px)';
            });
            el.addEventListener('mouseleave', () => { el.style.transform = ''; });
        });
    }

    /* ---------- Services: swatch follows the cursor ---------- */
    const follower = $('#swatchFollower');
    if (follower && finePointer && !reduceMotion) {
        let fx = 0, fy = 0, tx = 0, ty = 0, active = false, running = false;
        const move = () => {
            fx = lerp(fx, tx, 0.14); fy = lerp(fy, ty, 0.14);
            const tilt = clamp((tx - fx) * 0.08, -12, 12);
            follower.style.transform = 'translate3d(' + fx + 'px,' + fy + 'px,0) translate(-50%,-50%) rotate(' + tilt + 'deg) scale(' + (active ? 1 : 0.6) + ')';
            if (active || Math.abs(tx - fx) > 0.5) requestAnimationFrame(move); else running = false;
        };
        $$('.service').forEach(s => {
            const summary = $('summary', s);
            summary.addEventListener('mouseenter', e => {
                follower.className = 'swatch-follower is-visible cloth-' + s.dataset.swatch;
                if (!active) { fx = e.clientX; fy = e.clientY; }
                active = true;
                if (!running) { running = true; requestAnimationFrame(move); }
            });
            summary.addEventListener('mousemove', e => { tx = e.clientX + 140; ty = e.clientY; });
            summary.addEventListener('mouseleave', () => {
                active = false;
                follower.classList.remove('is-visible');
            });
        });
    }

    /* ---------- Swatch book filter ---------- */
    const filters = $$('.filter');
    const pill = $('#filterPill');
    const swatches = $$('.swatch');
    function placePill(btn) {
        if (!pill || !btn) return;
        pill.style.width = btn.offsetWidth + 'px';
        pill.style.transform = 'translateX(' + btn.offsetLeft + 'px)';
    }
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(b => { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-selected', String(b === btn)); });
            placePill(btn);
            const f = btn.dataset.filter;
            swatches.forEach(s => {
                const show = f === 'all' || s.dataset.category === f;
                if (show) {
                    s.classList.remove('is-hidden');
                    requestAnimationFrame(() => requestAnimationFrame(() => s.classList.remove('is-hiding')));
                } else {
                    s.classList.add('is-hiding');
                    setTimeout(() => { if (s.classList.contains('is-hiding')) s.classList.add('is-hidden'); }, 380);
                }
            });
        });
    });
    const placeActivePill = () => placePill($('.filter.is-active'));
    placeActivePill();
    window.addEventListener('resize', placeActivePill);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeActivePill);

    /* ---------- Testimonials ---------- */
    const quotes = $$('.quote');
    const quoteIndex = $('#quoteIndex');
    const quoteBar = $('#quoteBar');
    if (quotes.length) {
        let current = 0;
        let elapsed = 0;
        let last = performance.now();
        let paused = false;
        const DURATION = 7000;
        const show = i => {
            current = (i + quotes.length) % quotes.length;
            quotes.forEach((q, n) => q.classList.toggle('is-active', n === current));
            quoteIndex.textContent = String(current + 1).padStart(2, '0');
            elapsed = 0;
        };
        $('#quotePrev').addEventListener('click', () => show(current - 1));
        $('#quoteNext').addEventListener('click', () => show(current + 1));
        const wordsSection = $('#words');
        wordsSection.addEventListener('mouseenter', () => { paused = true; });
        wordsSection.addEventListener('mouseleave', () => { paused = false; });
        const tick = now => {
            const dt = now - last; last = now;
            if (!paused && !reduceMotion) {
                elapsed += dt;
                if (elapsed >= DURATION) show(current + 1);
            }
            quoteBar.style.transform = 'scaleX(' + clamp(elapsed / DURATION, 0, 1) + ')';
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    /* ---------- Contact form ---------- */
    const form = $('#contactForm');
    if (form) {
        // Service CTAs pre-select the chip
        $$('[data-service]').forEach(a => a.addEventListener('click', () => {
            const radio = $('input[name="service"][value="' + a.dataset.service + '"]', form);
            if (radio) radio.checked = true;
        }));

        const validate = () => {
            let ok = true;
            $$('[required]', form).forEach(input => {
                const valid = input.type === 'email'
                    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())
                    : input.value.trim().length > 0;
                input.closest('.field').classList.toggle('is-invalid', !valid);
                if (!valid && ok) { input.focus(); ok = false; }
            });
            return ok;
        };
        $$('[required]', form).forEach(input => input.addEventListener('input', () => input.closest('.field').classList.remove('is-invalid')));

        form.addEventListener('submit', e => {
            e.preventDefault();
            if (!validate()) return;
            // Demo only: connect to your backend / Formspree / WhatsApp API here.
            form.classList.add('is-sent');
        });
        $('#formReset').addEventListener('click', () => {
            form.reset();
            form.classList.remove('is-sent');
        });
    }

    /* ---------- Newsletter ---------- */
    const news = $('#newsForm');
    if (news) {
        news.addEventListener('submit', e => {
            e.preventDefault();
            const input = $('input', news);
            const msg = $('#newsMsg');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) { msg.textContent = 'Please enter a valid email.'; return; }
            msg.textContent = 'Subscribed. See you next month.';
            news.reset();
        });
    }

    /* ---------- Clock & year ---------- */
    const clock = $('#clock');
    if (clock) {
        const fmt = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' });
        const update = () => { clock.textContent = fmt.format(new Date()); };
        update();
        setInterval(update, 15000);
    }
    const year = $('#year');
    if (year) year.textContent = new Date().getFullYear();
})();
