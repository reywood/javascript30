const panels = document.querySelectorAll('.panel');

panels.forEach(panel => {
    panel.addEventListener('click', e => {
        panels.forEach(panel => {
            panel.classList.remove('open');
        })
        panel.classList.add('open');
    });

    panel.addEventListener('transitionend', e => {
        if (e.propertyName.startsWith('flex')) {
            if (panel.classList.contains('open')) {
                panel.classList.add('open-active');
            } else {
                panel.classList.remove('open-active');
            }
        }
    });
});