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

const nextBranch = () => {
    fetch('/next-branch', { method: 'GET' }).then(res => {
        if (res.ok) {
            window.location.href = window.location.origin
        }
        throw res;
    }).catch(error => {
        console.error(error);
    });
}