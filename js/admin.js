/* ===== Golden Years Care — Admin Panel Logic ===== */
document.addEventListener('DOMContentLoaded', function(){
  const KEYS = window.GYC_KEYS;
  const ADMIN_PASS = 'admin123';

  const loginBox = document.getElementById('admin-login');
  const shell = document.getElementById('admin-shell');
  const loginForm = document.getElementById('admin-login-form');
  const loginError = document.getElementById('admin-login-error');
  const logoutBtn = document.getElementById('admin-logout');

  function isAuthed(){ return sessionStorage.getItem(KEYS.admin) === 'true'; }
  function showApp(){ loginBox.style.display='none'; shell.style.display='grid'; renderAll(); }
  function showLogin(){ loginBox.style.display='block'; shell.style.display='none'; }

  if(isAuthed()) showApp(); else showLogin();

  loginForm?.addEventListener('submit', function(e){
    e.preventDefault();
    const pass = document.getElementById('admin-pass').value;
    if(pass === ADMIN_PASS){
      sessionStorage.setItem(KEYS.admin,'true');
      loginError.classList.remove('show');
      showApp();
    } else {
      loginError.classList.add('show');
      loginError.textContent = '⚠️ Incorrect password. Hint: admin123 (demo).';
    }
  });
  logoutBtn?.addEventListener('click', function(){ sessionStorage.removeItem(KEYS.admin); showLogin(); });

  /* Sidebar tab switching */
  document.querySelectorAll('.admin-side button[data-panel]').forEach(btn=>{
    btn.addEventListener('click', function(){
      document.querySelectorAll('.admin-side button').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.admin-panel').forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('panel-'+btn.getAttribute('data-panel')).classList.add('active');
    });
  });

  function fmtDate(d){ return new Date(d).toLocaleString('en-US',{year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}); }

  function renderAll(){
    renderOverview();
    renderPosts();
    renderStories();
    renderMessages();
    renderDonations();
  }

  /* ===== Overview ===== */
  function renderOverview(){
    const stats = JSON.parse(localStorage.getItem(KEYS.stats));
    const donations = JSON.parse(localStorage.getItem(KEYS.donations));
    const messages = JSON.parse(localStorage.getItem(KEYS.messages));
    const posts = JSON.parse(localStorage.getItem(KEYS.posts));
    const successCount = donations.filter(d=>d.status==='success').length;
    const failCount = donations.filter(d=>d.status==='failed').length;
    document.getElementById('ov-raised').textContent = gycFormatMoney(stats.totalRaised);
    document.getElementById('ov-goal').textContent = gycFormatMoney(stats.goal);
    document.getElementById('ov-donations').textContent = donations.length;
    document.getElementById('ov-success').textContent = successCount;
    document.getElementById('ov-fail').textContent = failCount;
    document.getElementById('ov-messages').textContent = messages.length;
    document.getElementById('ov-posts').textContent = posts.length;
    document.getElementById('ov-seniors').textContent = stats.seniorsSupported.toLocaleString();
    document.getElementById('ov-volunteers').textContent = stats.volunteers.toLocaleString();
  }

  /* ===== Posts CRUD ===== */
  function renderPosts(){
    const posts = JSON.parse(localStorage.getItem(KEYS.posts));
    const tbody = document.querySelector('#posts-table tbody');
    tbody.innerHTML = posts.map(p=>
      '<tr><td>'+p.title+'</td><td>'+p.category+'</td><td>'+p.author+'</td><td>'+p.date+'</td>' +
      '<td><button class="icon-btn" data-del-post="'+p.id+'">🗑️ Delete</button></td></tr>'
    ).join('') || '<tr><td colspan="5">No posts yet.</td></tr>';
    tbody.querySelectorAll('[data-del-post]').forEach(b=>{
      b.addEventListener('click', function(){
        if(!confirm('Delete this post?')) return;
        let arr = JSON.parse(localStorage.getItem(KEYS.posts));
        arr = arr.filter(p=>p.id !== parseInt(b.getAttribute('data-del-post'),10));
        localStorage.setItem(KEYS.posts, JSON.stringify(arr));
        renderPosts(); renderOverview();
        gycToast('Post deleted','success');
      });
    });
  }
  document.getElementById('post-add-form')?.addEventListener('submit', function(e){
    e.preventDefault();
    const posts = JSON.parse(localStorage.getItem(KEYS.posts));
    posts.unshift({
      id: Date.now(),
      title: document.getElementById('p-title').value,
      category: document.getElementById('p-category').value,
      author: document.getElementById('p-author').value || 'Admin',
      date: new Date().toISOString().slice(0,10),
      excerpt: document.getElementById('p-excerpt').value,
      body: document.getElementById('p-body').value,
      img: document.getElementById('p-img').value || 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?q=80&w=800&auto=format&fit=crop'
    });
    localStorage.setItem(KEYS.posts, JSON.stringify(posts));
    this.reset();
    renderPosts(); renderOverview();
    gycToast('Post published','success');
  });

  /* ===== Stories CRUD ===== */
  function renderStories(){
    const stories = JSON.parse(localStorage.getItem(KEYS.stories));
    const tbody = document.querySelector('#stories-table tbody');
    tbody.innerHTML = stories.map(s=>
      '<tr><td>'+s.name+'</td><td>'+s.title+'</td>' +
      '<td><button class="icon-btn" data-del-story="'+s.id+'">🗑️ Delete</button></td></tr>'
    ).join('') || '<tr><td colspan="3">No stories yet.</td></tr>';
    tbody.querySelectorAll('[data-del-story]').forEach(b=>{
      b.addEventListener('click', function(){
        if(!confirm('Delete this story?')) return;
        let arr = JSON.parse(localStorage.getItem(KEYS.stories));
        arr = arr.filter(s=>s.id !== parseInt(b.getAttribute('data-del-story'),10));
        localStorage.setItem(KEYS.stories, JSON.stringify(arr));
        renderStories(); renderOverview();
        gycToast('Story deleted','success');
      });
    });
  }
  document.getElementById('story-add-form')?.addEventListener('submit', function(e){
    e.preventDefault();
    const stories = JSON.parse(localStorage.getItem(KEYS.stories));
    stories.unshift({
      id: Date.now(),
      name: document.getElementById('s-name').value,
      title: document.getElementById('s-title').value,
      excerpt: document.getElementById('s-excerpt').value,
      body: document.getElementById('s-body').value,
      outcome: document.getElementById('s-outcome').value,
      img: document.getElementById('s-img').value || 'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?q=80&w=800&auto=format&fit=crop'
    });
    localStorage.setItem(KEYS.stories, JSON.stringify(stories));
    this.reset();
    renderStories(); renderOverview();
    gycToast('Story published','success');
  });

  /* ===== Messages ===== */
  function renderMessages(){
    const messages = JSON.parse(localStorage.getItem(KEYS.messages));
    const tbody = document.querySelector('#messages-table tbody');
    tbody.innerHTML = messages.map(m=>
      '<tr><td>'+m.name+'<br><small style="color:var(--text-muted)">'+m.email+'</small></td><td>'+(m.subject||'—')+'</td>' +
      '<td>'+m.message.slice(0,60)+(m.message.length>60?'…':'')+'</td><td>'+fmtDate(m.date)+'</td>' +
      '<td><button class="icon-btn" data-del-msg="'+m.id+'">🗑️</button></td></tr>'
    ).join('') || '<tr><td colspan="5">No messages yet.</td></tr>';
    tbody.querySelectorAll('[data-del-msg]').forEach(b=>{
      b.addEventListener('click', function(){
        let arr = JSON.parse(localStorage.getItem(KEYS.messages));
        arr = arr.filter(m=>m.id !== parseInt(b.getAttribute('data-del-msg'),10));
        localStorage.setItem(KEYS.messages, JSON.stringify(arr));
        renderMessages(); renderOverview();
      });
    });
  }

  /* ===== Donations ===== */
  function renderDonations(){
    const donations = JSON.parse(localStorage.getItem(KEYS.donations));
    const tbody = document.querySelector('#donations-table tbody');
    tbody.innerHTML = donations.map(d=>
      '<tr><td>'+d.name+'<br><small style="color:var(--text-muted)">'+d.email+'</small></td>' +
      '<td>'+gycFormatMoney(d.amount)+'</td><td>'+d.frequency+'</td><td>'+fmtDate(d.date)+'</td>' +
      '<td><span class="badge '+(d.status==='success'?'badge-success':'badge-fail')+'">'+(d.status==='success'?'Success':'Failed')+'</span></td></tr>'
    ).join('') || '<tr><td colspan="5">No donations yet.</td></tr>';
  }

  /* Reset demo data */
  document.getElementById('admin-reset')?.addEventListener('click', function(){
    if(!confirm('Reset ALL demo data back to defaults? This clears posts, stories, messages and donations you added.')) return;
    Object.values(KEYS).forEach(k=>{ if(k !== KEYS.theme && k !== KEYS.admin) localStorage.removeItem(k); });
    location.reload();
  });
});
