import { LightningElement } from 'lwc';
import { setBulbColor, setBulbTime, setBulbCounter, showBulbNumber, showAllBulbNumbers } from './js/bulbUtilities';
import { showError } from 'c/utility';
import lightBulb from 'c/utility'; // here goes Apex callback

export default class BulbsContainer extends LightningElement {
    isLoading = true;

    YELLOW = { name: 'yellow', color: '#FFEE58' };
    RED = { name: 'red', color: '#FF7043' };
    GREEN = { name: 'green', color: '#66BB6A' };
    BLUE = { name: 'blue', color: '#4FC3F7' }; 

    connectedCallback() {
        this.runBulb(
            lightBulb(this.YELLOW)
        ).then(() =>
            this.runBulb(lightBulb(this.RED)).then(() => {
                throw new Error('Red bulb Error');
            })
        ).then(() =>
            this.runBulb(lightBulb(this.GREEN))
        ).then(() =>
            this.runBulb(lightBulb(this.BLUE))
        ).catch(error => {
            showError({ context: this, error });
        }).finally(() => {
            this.isLoading = false;
        });
    }

    runBulb(promise) {
        return promise.then(bulb =>
            setBulbColor({ context: this, ...bulb })
        ).then(bulb =>
            setBulbTime(bulb)
        ).then(bulb =>
            setBulbCounter(bulb)
        ).then(bulb =>
            showBulbNumber(bulb)
        ).then(bulb => {
            console.log(`'${bulb.dataset.name}' bulb works`)
        });
    }
}