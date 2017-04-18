const bands = [
    'The Plot in You',
    'The Devil Wears Prada',
    'Pierce the Veil',
    'Norma Jean',
    'The Bled',
    'Say Anything',
    'The Midway State',
    'We Came as Romans',
    'Counterparts',
    'Oh, Sleeper',
    'A Skylit Drive',
    'Anywhere But Here',
    'An Old Dog',
];

function removeLeadingArticle(text) {
    return text.replace(/^(a|an|the)\b/i, '').trim();
}

const bandsHtml = bands
    .sort((a, b) => (removeLeadingArticle(a) < removeLeadingArticle(b) ? -1 : 1))
    .map(band => `<li>${band}</li>`)
    .join('');

document.querySelector('ul#bands').innerHTML = bandsHtml;
