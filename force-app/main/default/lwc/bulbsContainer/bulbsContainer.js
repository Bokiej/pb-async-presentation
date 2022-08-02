import { LightningElement } from 'lwc';
import { setBulbColor, setBulbTime, setBulbCounter, showBulbNumber, showAllBulbNumbers } from './js/bulbUtilities';
import { showError } from 'c/utility';
import lightBulb from 'c/utility'; // here goes Apex callback

export default class BulbsContainer extends LightningElement {
    isLoading = true;

    connectedCallback() {
        lightBulb({ name: 'yellow', color: '#FFEE58' }).then(data => {
            console.log('1. setBulbColor');
            return setBulbColor({ context: this, ...data });
        }).then(bulb => {
            console.log('2. setBulbTime');
            return setBulbTime(bulb);
        }).then(bulb => {
            console.log('3. setBulbCounter');
            return setBulbCounter(bulb);
        }).then(bulb => {
            console.log('4. showBulbNumber');
            return showBulbNumber(bulb);
        }).catch(error => {
            showError({ context: this, error });
        }).finally(() => {
            this.isLoading = false;
        });
    }
}