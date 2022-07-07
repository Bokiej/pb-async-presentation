const body = fetch('./slides/slides.html');

Promise.all([body]).then(([body]) => {
    return Promise.all([body.text()]);
}).then(([text]) => {
	const html = new DOMParser().parseFromString(text, 'text/html');
    const bodyEl = document.querySelector('body');

    bodyEl.innerHTML = html.body.innerHTML + bodyEl.innerHTML;
}).then(() => {
    // Reveal imported in index.html
    Reveal.initialize({
        hash: true,
        // Learn about plugins: https://revealjs.com/plugins/
        plugins: [ RevealMarkdown, RevealHighlight, RevealNotes ]
    });
})