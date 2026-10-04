/* ===== Golden Years Care — Contact Page Logic ===== */
document.addEventListener('DOMContentLoaded', function(){
  const KEYS = window.GYC_KEYS;
  const form = document.getElementById('contact-form');
  if(!form) return;
  const alertBox = document.getElementById('contact-alert');
  const btn = document.getElementById('contact-submit');

  function setError(id, show){
    document.getElementById(id).closest('.form-group').classList.toggle('field-error', show);
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('c-name').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const subject = document.getElementById('c-subject').value;
    const message = document.getElementById('c-message').value.trim();
    let ok = true;
    if(!name){ setError('c-name', true); ok = false; } else setError('c-name', false);
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ setError('c-email', true); ok=false; } else setError('c-email', false);
    if(message.length < 10){ setError('c-message', true); ok=false; } else setError('c-message', false);

    alertBox.className = 'alert-box';
    if(!ok){
      alertBox.classList.add('show','alert-error');
      alertBox.innerHTML = '⚠️ Please fill in all fields correctly (message needs at least 10 characters).';
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Sending…';

    setTimeout(function(){
      const messages = JSON.parse(localStorage.getItem(KEYS.messages));
      messages.unshift({id:Date.now(), name, email, subject, message, date:new Date().toISOString(), status:'unread'});
      localStorage.setItem(KEYS.messages, JSON.stringify(messages));

      btn.disabled = false;
      btn.innerHTML = 'Send Message';
      alertBox.classList.add('show','alert-success');
      alertBox.innerHTML = '✅ Thanks ' + name.split(' ')[0] + '! Your message has been received — our team replies within 1-2 business days.';
      gycToast('Message sent successfully', 'success');
      form.reset();
    }, 1100);
  });
});
