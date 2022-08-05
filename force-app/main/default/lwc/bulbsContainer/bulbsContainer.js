import { LightningElement } from 'lwc';
import { setBulbColor, setBulbTime, setBulbCounter, showBulbNumber, showAllBulbNumbers } from './js/bulbUtilities';
import { showError } from 'c/utility';
import lightBulb from 'c/utility'; // here goes Apex callback

export default class BulbsContainer extends LightningElement {
    YELLOW = { name: 'yellow', color: '#FFEE58' };

    connectedCallback() {
        lightBulb({ ...this.YELLOW }).then(bulb =>
            setBulbColor({ context: this, ...bulb })
        ).then(bulb =>
           setBulbTime(bulb)
        ).then(bulb =>
            setBulbCounter(bulb)
        ).then(bulb => {
            showBulbNumber(bulb);

            const number = this.template
                .querySelector(`c-bulb[data-name=${this.YELLOW.name}]`)
                .getBulbNumber();
    
            console.log(`number of '${this.YELLOW.name}' bulb is: ${number}`);
        }).then(bulb => {}).catch(error => {
            showError({ context: this, error });
        });
    }
}