import { LightningElement } from 'lwc';
import { setBulbColor, setBulbTime, setBulbCounter, showBulbNumber, showAllBulbNumbers } from './js/bulbUtilities';
import { showError } from 'c/utility';
import lightBulb from 'c/utility'; // here goes Apex callback

export default class BulbsContainer extends LightningElement {
    YELLOW = { name: 'yellow', color: '#FFEE58' };
    RED = { name: 'red', color: '#FF7043' };
    GREEN = { name: 'green', color: '#66BB6A' };
    BLUE = { name: 'blue', color: '#4FC3F7' }; 

    connectedCallback() {
        Promise.race([
            lightBulb({ ...this.YELLOW }),
            lightBulb({ ...this.RED }),
            lightBulb({ ...this.GREEN }),
            lightBulb({ ...this.BLUE })
        ]).then(bulb =>
            // returns single Promise
            setBulbColor({ context: this, ...bulb })
        ).then(bulb =>
            setBulbTime(bulb)
        ).then(bulb =>
            setBulbCounter(bulb)
        ).then(bulb =>
            showBulbNumber(bulb)
        ).catch(error => {
            showError({ context: this, error });
        });
    }
}