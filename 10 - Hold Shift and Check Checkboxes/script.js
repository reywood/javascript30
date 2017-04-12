const allCheckboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
let previousCheckbox;

function selectCheckboxesBetween(checkboxA, checkboxB) {
    // const indexA = allCheckboxes.findIndex(cb => cb === checkboxA);
    // const indexB = allCheckboxes.findIndex(cb => cb === checkboxB);
    // const minIndex = Math.min(indexA, indexB);
    // const maxIndex = Math.max(indexA, indexB);
    // for (let i = minIndex; i <= maxIndex; i++) {
    //     allCheckboxes[i].checked = true;
    // }
    let inbetween = false;
    allCheckboxes.forEach((checkbox) => {
        if (checkbox === checkboxA || checkbox === checkboxB) {
            inbetween = !inbetween;
        }
        if (inbetween) {
            checkbox.checked = true;
        }
    });
}

allCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
        // console.log(e);
        if (e.shiftKey && previousCheckbox) {
            selectCheckboxesBetween(checkbox, previousCheckbox);
        }

        previousCheckbox = checkbox;
    });
});
