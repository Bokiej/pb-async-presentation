import { LightningElement } from 'lwc';
import { setBulbColor, setBulbTime, setBulbCounter, showBulbNumber, showAllBulbNumbers } from './js/bulbUtilities';
import { showError } from 'c/utility';
import lightBulb from 'c/utility'; // here goes Apex callback

export default class BulbsContainer extends LightningElement {

    connectedCallback() {
        lightBulb({ name: 'yellow', color: '#FFEE58' }).then(data => {
            console.log('1. setBulbColor');
            return setBulbColor({ context: this, ...data });
         } ).then(bulb => {
            throw new Error('Error 1');
            console.log('2. setBulbTime');
            return setBulbTime(bulb);
        }).catch(error => {
            showError({ context: this, error });
        }).then(bulb => {
            console.log('3. setBulbCounter');
            console.log('bulb object is', bulb);
            return setBulbCounter(bulb);
        }).then(bulb => {
            throw new Error('Error 2');
            console.log('4. showBulbNumber');
            return showBulbNumber(bulb);
        }).catch(error => {
            showError({ context: this, error });
        }).finally(() => {
            console.warn('finally method');
        });
    }
}