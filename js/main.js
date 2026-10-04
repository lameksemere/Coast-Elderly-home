/* ===== Golden Years Care — Shared Site Behaviour ===== */
(function(){
  const KEYS = window.GYC_KEYS;

  /* Theme */
  function applyTheme(t){
    document.documentElement.setAttribute('data-theme', t);
    const btn = document.querySelector('.theme-toggle');
    if(btn) btn.textContent = t === 'dark' ? '☀️' : '🌙';
  }
  const savedTheme = localStorage.getItem(KEYS.theme) || 'light';
  applyTheme(savedTheme);

  document.addEventListener('DOMContentLoaded', function(){
    const toggle = document.querySelector('.theme-toggle');
    if(toggle){
      toggle.addEventListener('click', function(){
        const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = cur === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem(KEYS.theme, next);
      });
    }

    /* Mobile nav */
    const burger = document.querySelector('.hamburger');
    const links = document.querySelector('.nav-links');
    if(burger && links){
      burger.addEventListener('click', function(){ links.classList.toggle('open'); });
      links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
    }

    /* Active nav link */
    const page = document.body.getAttribute('data-page');
    document.querySelectorAll('.nav-links a[data-nav]').forEach(a=>{
      if(a.getAttribute('data-nav') === page) a.classList.add('active');
    });

    /* Reveal on scroll */
    const revealEls = document.querySelectorAll('.reveal');
    if('IntersectionObserver' in window){
      const obs = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); } });
      },{threshold:0.12});
      revealEls.forEach(el=>obs.observe(el));
    } else {
      revealEls.forEach(el=>el.classList.add('in'));
    }

    /* Animated stat counters */
    document.querySelectorAll('[data-count]').forEach(el=>{
      const target = parseInt(el.getAttribute('data-count'),10);
      let started = false;
      const run = ()=>{
        if(started) return; started = true;
        const dur = 1400, start = performance.now();
        function step(now){
          const p = Math.min((now-start)/dur,1);
          el.textContent = Math.floor(p*target).toLocaleString();
          if(p<1) requestAnimationFrame(step); else el.textContent = target.toLocaleString();
        }
        requestAnimationFrame(step);
      };
      if('IntersectionObserver' in window){
        const io = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ run(); io.unobserve(el);} }); },{threshold:0.4});
        io.observe(el);
      } else run();
    });

    /* Footer year */
    document.querySelectorAll('[data-year]').forEach(el=> el.textContent = new Date().getFullYear());

    /* Progress bars */
    document.querySelectorAll('.progress-fill[data-pct]').forEach(el=>{
      setTimeout(()=>{ el.style.width = el.getAttribute('data-pct')+'%'; }, 200);
    });
  });

  /* Toast helper, global */
  window.gycToast = function(message, type){
    type = type || 'success';
    let el = document.getElementById('gyc-toast');
    if(!el){
      el = document.createElement('div');
      el.id = 'gyc-toast';
      document.body.appendChild(el);
    }
    el.className = 'toast ' + type;
    el.innerHTML = (type==='success' ? '✅ ' : '⚠️ ') + message;
    requestAnimationFrame(()=> el.classList.add('show'));
    clearTimeout(window._gycToastTimer);
    window._gycToastTimer = setTimeout(()=> el.classList.remove('show'), 4200);
  };

  window.gycFormatMoney = function(n){ return '$' + Number(n).toLocaleString(); };
})();
