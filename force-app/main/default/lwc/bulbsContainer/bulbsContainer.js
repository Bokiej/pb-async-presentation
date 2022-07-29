import { LightningElement } from 'lwc';
import { setBulbColor, setBulbTime, setBulbCounter, showBulbNumber, showAllBulbNumbers } from './js/bulbUtilities';
import { showError } from 'c/utility';
import lightBulb from 'c/utility'; // here goes Apex callback

export default class BulbsContainer extends LightningElement {

    connectedCallback() {
        lightBulb({ name: 'yellow', color: '#FFEE58' }).then(data =>
            // destructuring, adding name and color values
            // in place of ...data
            setBulbColor({ context: this, ...data })
        ).then(bulb => {
            // if you use curly braces remember to use return
            // statement for returned value
            return setBulbTime(bulb);
        }).then(bulb =>
            // but if you removed curly braces statement will be 
            // automatically returned
            // in such case do not use ; at the end
            setBulbCounter(bulb)
        ).then(bulb =>
            showBulbNumber(bulb)
        ).catch(error => {
            showError({ context: this, error });
        }).finally(() => {
            console.log('everything is done');
        });
    }
}