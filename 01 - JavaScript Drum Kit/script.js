(function() {
  function handleTransitionEnd(e) {
    if (e.propertyName === 'transform') {
      e.target.classList.remove('playing');
    }
  }

  function playKey(keyCode) {
    let key = document.querySelector(`.key[data-key="${keyCode}"]`);
    let audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    if (key && audio) {
      key.classList.add('playing');
      audio.currentTime = 0;
      audio.play();
    }
  }

  document.querySelectorAll('.key[data-key]').forEach(key => {
    key.addEventListener('transitionend', handleTransitionEnd);
    key.addEventListener('click', (e) => playKey(key.dataset.key));
  });

  document.addEventListener('keydown', (e) => playKey(e.keyCode));
})();
