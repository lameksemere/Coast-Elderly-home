/* ===== Golden Years Care — Stories Rendering ===== */
document.addEventListener('DOMContentLoaded', function(){
  const KEYS = window.GYC_KEYS;
  const grid = document.getElementById('stories-grid');
  if(!grid) return;
  const stories = JSON.parse(localStorage.getItem(KEYS.stories));

  function card(s){
    return '<div class="story-card reveal in">' +
      '<img src="'+s.img+'" alt="'+s.name+'" loading="lazy">' +
      '<div class="story-body">' +
        '<span class="tag">Outcome Story</span>' +
        '<h3>'+s.title+'</h3>' +
        '<p style="font-weight:600;margin-bottom:6px;">'+s.name+'</p>' +
        '<p>'+s.excerpt+'</p>' +
        '<a class="read-more" href="#" data-id="'+s.id+'">Read full story →</a>' +
      '</div></div>';
  }
  grid.innerHTML = stories.map(card).join('');

  grid.querySelectorAll('.read-more').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const s = stories.find(x=>x.id===parseInt(a.getAttribute('data-id'),10));
      const overlay = document.getElementById('post-modal');
      document.getElementById('post-modal-title').textContent = s.title + ' — ' + s.name;
      document.getElementById('post-modal-meta').innerHTML = '<span class="tag">Outcome</span> &nbsp; ' + s.outcome;
      document.getElementById('post-modal-img').src = s.img;
      document.getElementById('post-modal-body').textContent = s.body;
      overlay.classList.add('show');
    });
  });
  document.getElementById('post-modal-close')?.addEventListener('click', ()=> document.getElementById('post-modal').classList.remove('show'));
  document.getElementById('post-modal')?.addEventListener('click', function(e){ if(e.target===this) this.classList.remove('show'); });
});
