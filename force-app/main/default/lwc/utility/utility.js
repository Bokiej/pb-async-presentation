function lightBulb({ name, color }) {
    return new Promise((resolve, reject) => {
        if (!!name || !!color) {
            setTimeout(
                () => resolve({ name, color }),
                setRandomTimeout()
            );
        } else {
            reject('color or name value is undefined');
        }
    });
}

function setRandomTimeout(min = 3, max = 7) {
    return (Math.floor(Math.random() * (max - min)) + min) * 1000;
}

export default lightBulb;

function showError({ context, error }) {
    context.dispatchEvent(new CustomEvent('notify', {
        detail: { type: 'error', error },
        bubbles: true,
        composed: true
    }));
}

export { showError };