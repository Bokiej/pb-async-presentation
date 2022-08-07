const body = fetch('./slides/slides.html');

/*
 * Init method
 */
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
        height: '100%',
        maxScale: 1.0,
        // Learn about plugins: https://revealjs.com/plugins/
        plugins: [ RevealMarkdown, RevealHighlight, RevealNotes ]
    });
})

/*
 * Method for changing brach to desired name
 */
const nextBranch = (branch, hashArray) => {
    fetch('/next-branch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ branch: branch })
    }).then(res => {
        if (res.ok) {
            window.location.href = hashArray
                ? window.location.origin + `/#/${hashArray.join('/')}`
                : window.location.origin;
            return;
        }
        return res.text().then(message => { throw new Error(message) });
    }).catch(error => {
        alert(`Something went wrong: ${error.message}`);
        console.error(error);
    });
}