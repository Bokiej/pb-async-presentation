import getURL from '@salesforce/apex/bulbController.getURL';

let _vendorURL;

/*
 * Singleton for returning vendorURL
 * Method forces to query only for the first time and if it does
 * returns always the same Promise with correct value.
 * Method prevent to query multiple times.
 */
const vendorURL = () => {
    _vendorURL = _vendorURL || getURL().then(data => {
            console.count(data); // check how often getURL is invoked
            return data;
        });

    return _vendorURL
}

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

function setRandomTimeout(min = 1, max = 10) {
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

export {
    showError,
    vendorURL
};