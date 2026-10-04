/* ===== Golden Years Care — Blog Rendering ===== */
document.addEventListener('DOMContentLoaded', function(){
  const KEYS = window.GYC_KEYS;
  const grid = document.getElementById('blog-grid');
  if(!grid) return;

  const posts = JSON.parse(localStorage.getItem(KEYS.posts)).sort((a,b)=> new Date(b.date)-new Date(a.date));
  const search = document.getElementById('blog-search');
  const filterBtns = document.querySelectorAll('.tag-filter');
  let activeCat = 'All';

  function card(p){
    return '<div class="post-card reveal in">' +
      '<img src="'+p.img+'" alt="'+p.title+'" loading="lazy">' +
      '<div class="post-body">' +
        '<span class="tag">'+p.category+'</span>' +
        '<h3>'+p.title+'</h3>' +
        '<div class="post-meta"><span>👤 '+p.author+'</span><span>📅 '+new Date(p.date).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})+'</span></div>' +
        '<p>'+p.excerpt+'</p>' +
        '<a class="read-more" href="#" data-id="'+p.id+'">Read full story →</a>' +
      '</div></div>';
  }

  function render(){
    const q = (search.value||'').toLowerCase();
    const filtered = posts.filter(p =>
      (activeCat==='All' || p.category===activeCat) &&
      (p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q))
    );
    grid.innerHTML = filtered.length ? filtered.map(card).join('') :
      '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:40px 0;">No articles match your search.</p>';
    grid.querySelectorAll('.read-more').forEach(a=>{
      a.addEventListener('click', function(e){
        e.preventDefault();
        openPost(parseInt(a.getAttribute('data-id'),10));
      });
    });
  }

  function openPost(id){
    const p = posts.find(x=>x.id===id);
    if(!p) return;
    const overlay = document.getElementById('post-modal');
    document.getElementById('post-modal-title').textContent = p.title;
    document.getElementById('post-modal-meta').innerHTML = '<span class="tag">'+p.category+'</span> &nbsp; 👤 '+p.author+' &nbsp; 📅 '+new Date(p.date).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
    document.getElementById('post-modal-img').src = p.img;
    document.getElementById('post-modal-body').textContent = p.body;
    overlay.classList.add('show');
  }
  document.getElementById('post-modal-close')?.addEventListener('click', ()=> document.getElementById('post-modal').classList.remove('show'));
  document.getElementById('post-modal')?.addEventListener('click', function(e){ if(e.target===this) this.classList.remove('show'); });

  filterBtns.forEach(btn=>{
    btn.addEventListener('click', function(){
      filterBtns.forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected');
      activeCat = btn.getAttribute('data-cat');
      render();
    });
  });
  search.addEventListener('input', render);

  render();
});
