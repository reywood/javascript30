const inputs = document.querySelectorAll('.controls input');

function handleInputChange() {
    var suffix = this.dataset.suffix || '';
    document.documentElement.style.setProperty(`--${this.name}`, `${this.value}${suffix}`);
}

inputs.forEach(input => {
    input.addEventListener('change', handleInputChange);
    input.addEventListener('mousemove', handleInputChange);
    handleInputChange.call(input);
});