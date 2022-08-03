import { LightningElement } from 'lwc';
import { setBulbColor, setBulbTime, setBulbCounter, showBulbNumber, showAllBulbNumbers } from './js/bulbUtilities';
import { showError } from 'c/utility';
import lightBulb from 'c/utility'; // here goes Apex callback

export default class BulbsContainer extends LightningElement {
    YELLOW = { name: 'yellow', color: '#FFEE58' };
    RED = { name: 'red', color: '#FF7043' };
    GREEN = { name: 'green', color: '#66BB6A' };
    BLUE = { name: 'blue', color: '#4FC3F7' };

    bulbsArraySize = 56;
    bulbs = new Array(this.bulbsArraySize).fill('').map((el, index) => {
        const bulb = { ...[ this.YELLOW, this.RED, this.GREEN, this.BLUE ][Math.floor(Math.random() * 4)] };

        bulb.name += `-${index}`;
        return bulb;
    });

    connectedCallback() {
        for (let i = 0; i < this.bulbsArraySize; i++) {
            this.runLightBulbPromise(this.bulbs[i]);
        }
    }

    runLightBulbPromise(bulb) {
        lightBulb(bulb).then(data =>
            setBulbColor({ context: this, ...data })
        ).then(bulb =>
            setBulbCounter(bulb)
        ).then(bulb =>
            showBulbNumber(bulb)
        ).catch(error => {
            showError({ context: this, error });
        });
    }
}