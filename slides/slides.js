const body = fetch('./slides/slides.html');
const bulbsContainer = fetch('./force-app/main/default/lwc/bulbsContainer/bulbsContainer.js');
const bulbsContainerHTML = fetch('./force-app/main/default/lwc/bulbsContainer/bulbsContainer.html');

/*
 * Init method
 */
Promise.all([body, bulbsContainer, bulbsContainerHTML]).then(([body, bulbsContainer, bulbsContainerHTML]) => {
    return Promise.all([body.text(), bulbsContainer?.text(), bulbsContainerHTML?.text()]);
}).then(([text, js, bulbsContainerHTML]) => {
	const html = new DOMParser().parseFromString(text, 'text/html');
    const bodyEl = document.querySelector('body');
    const bulbsContainerFullArray = [ ...html.querySelectorAll('.bulbs-container-full') ];
    const bulbsContainerHTMLArray = [ ...html.querySelectorAll('.bulbs-container-html') ];
    const bulbsContainerJsArray = [ ...html.querySelectorAll('.bulbs-container-js') ];
    const promise = (/connectedCallback\(\).\{((.|[\r\n])*\;)\r\n.*\}/g.exec(js) || [])[1];

    bulbsContainerJsArray.forEach(el => el.innerHTML = promise);
    bulbsContainerFullArray.forEach(el => el.innerHTML = js);
    bulbsContainerHTMLArray.forEach(el => el.innerHTML = bulbsContainerHTML);
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