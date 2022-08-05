const body = fetch('./slides/slides.html');
const utilityJs = fetch('./force-app/main/default/lwc/utility/utility.js');
const bulbJs = fetch('./force-app/main/default/lwc/bulb/bulb.js');

/*
 * Init method
 */
Promise.all([body, utilityJs, bulbJs]).then(([body, utilityJs, bulbJs]) => {
    return Promise.all([body.text(), utilityJs?.text(), bulbJs?.text()]);
}).then(([text, utilityJs, bulbJs]) => {
	const html = new DOMParser().parseFromString(text, 'text/html');
    const bodyEl = document.querySelector('body');
    const utilityJsFullArray = [ ...html.querySelectorAll('.utility-full') ];
    const bulbJsFullArray = [ ...html.querySelectorAll('.bulb-js-full') ];

    utilityJsFullArray.forEach(el => el.innerHTML = utilityJs);
    bulbJsFullArray.forEach(el => el.innerHTML = bulbJs);
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