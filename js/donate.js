/* ===== Golden Years Care — Donate Page Logic ===== */
document.addEventListener('DOMContentLoaded', function(){
  const KEYS = window.GYC_KEYS;
  const form = document.getElementById('donate-form');
  if(!form) return;

  const amountInput = document.getElementById('donate-amount');
  const opts = document.querySelectorAll('.amount-opt');
  const submitBtn = document.getElementById('donate-submit');
  const alertBox = document.getElementById('donate-alert');
  const goalNumEl = document.getElementById('goal-progress-text');
  const progressFill = document.getElementById('goal-progress-fill');

  function refreshGoal(){
    const stats = JSON.parse(localStorage.getItem(KEYS.stats));
    const pct = Math.min(100, Math.round((stats.totalRaised / stats.goal) * 100));
    if(progressFill) progressFill.style.width = pct + '%';
    if(goalNumEl) goalNumEl.textContent = gycFormatMoney(stats.totalRaised) + ' raised of ' + gycFormatMoney(stats.goal) + ' goal (' + pct + '%)';
  }
  refreshGoal();

  opts.forEach(opt=>{
    opt.addEventListener('click', function(){
      opts.forEach(o=>o.classList.remove('selected'));
      opt.classList.add('selected');
      amountInput.value = opt.getAttribute('data-amount');
    });
  });
  amountInput.addEventListener('input', ()=> opts.forEach(o=>o.classList.remove('selected')));

  function setError(fieldId, show){
    const group = document.getElementById(fieldId).closest('.form-group');
    group.classList.toggle('field-error', show);
  }

  function validate(data){
    let ok = true;
    if(!data.name.trim()){ setError('donor-name', true); ok=false; } else setError('donor-name', false);
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    if(!emailOk){ setError('donor-email', true); ok=false; } else setError('donor-email', false);
    const amt = parseFloat(data.amount);
    if(!amt || amt <= 0){ setError('donate-amount', true); ok=false; } else setError('donate-amount', false);
    const cardOk = data.card.replace(/\s/g,'').length >= 12 && /^[0-9\s]+$/.test(data.card);
    if(!cardOk){ setError('donor-card', true); ok=false; } else setError('donor-card', false);
    return ok;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = {
      name: document.getElementById('donor-name').value,
      email: document.getElementById('donor-email').value,
      amount: amountInput.value,
      frequency: document.getElementById('donate-frequency').value,
      card: document.getElementById('donor-card').value,
      note: document.getElementById('donor-note').value
    };
    alertBox.className = 'alert-box';

    if(!validate(data)){
      alertBox.classList.add('show','alert-error');
      alertBox.innerHTML = '⚠️ Please fix the highlighted fields before continuing.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Processing payment…';

    setTimeout(function(){
      // Simulate a payment gateway: ~88% success rate; a card ending in 0000 always fails (demo)
      const failsForced = data.card.replace(/\s/g,'').endsWith('0000');
      const success = !failsForced && Math.random() < 0.88;

      const donations = JSON.parse(localStorage.getItem(KEYS.donations));
      const record = {
        id: Date.now(),
        name: data.name, email: data.email,
        amount: parseFloat(data.amount), frequency: data.frequency,
        note: data.note, date: new Date().toISOString(),
        status: success ? 'success' : 'failed'
      };
      donations.unshift(record);
      localStorage.setItem(KEYS.donations, JSON.stringify(donations));

      if(success){
        const stats = JSON.parse(localStorage.getItem(KEYS.stats));
        stats.totalRaised += record.amount;
        localStorage.setItem(KEYS.stats, JSON.stringify(stats));
        refreshGoal();

        alertBox.classList.add('show','alert-success');
        alertBox.innerHTML = '✅ Thank you, ' + data.name.split(' ')[0] + '! Your ' + (data.frequency==='monthly' ? 'monthly ' : '') + gycFormatMoney(data.amount) + ' donation was successful. A receipt has been recorded.';
        gycToast('Donation successful — thank you!', 'success');
        form.reset();
        opts.forEach(o=>o.classList.remove('selected'));
      } else {
        alertBox.classList.add('show','alert-error');
        alertBox.innerHTML = '⚠️ We couldn\'t process that card. Please double-check the details or try a different card.';
        gycToast('Payment failed — please try again', 'error');
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Donate Now';
      alertBox.scrollIntoView({behavior:'smooth', block:'center'});
    }, 1400);
  });
});
