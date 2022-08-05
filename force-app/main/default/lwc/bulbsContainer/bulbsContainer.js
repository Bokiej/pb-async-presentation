import { LightningElement } from 'lwc';
import { setBulbColor, setBulbTime, setBulbCounter, showBulbNumber, showAllBulbNumbers, clearOrder } from './js/bulbUtilities';
import { showError } from 'c/utility';
import lightBulb from 'c/utility'; // here goes Apex callback

export default class BulbsContainer extends LightningElement {
    YELLOW = { name: 'yellow', color: '#FFEE58' };
    RED = { name: 'red', color: '#FF7043' };
    GREEN = { name: 'green', color: '#66BB6A' };
    BLUE = { name: 'blue', color: '#4FC3F7' };

    allBulbs = [ this.YELLOW, this.RED, this.GREEN, this.BLUE ];
    bulbsToRender = [];

    promiseId = 0; // to check what promises currently is the last one

    // CHECKBOX VARIABLES
    choosedBulbs = [];

    get options() {
        return this.allBulbs.map(el => {
            return { label: el.name, value: el.name };
        });
    }

    handleBulbsChange(event) {
        // clear all rendered bulbs
        this.bulbsToRender = [];
        this.choosedBulbs = event.detail.value;
        
        clearOrder();

        // wait to clear HTML
        setTimeout(() => {
            const currentPromiseId = ++this.promiseId;

            this.bulbsToRender = this.allBulbs.filter(el => this.choosedBulbs.includes(el.name));

            Promise.all( this.bulbsToRender.map(
                bulb => lightBulb({ ...bulb }))
            ).then(bulbs => {
                // check if current promise is resolved not previous one
                if (currentPromiseId === this.promiseId) {
                    return Promise.resolve(bulbs)
                        .then(bulbs =>
                            bulbs.map(bulb => setBulbColor({ context: this, ...bulb }))
                        ).then(bulbs =>
                            bulbs.map(bulb => setBulbTime(bulb))
                        ).then(bulbs =>
                            bulbs.map(bulb => setBulbCounter(bulb))
                        ).then(bulbs =>
                            bulbs.map(bulb => showBulbNumber(bulb))
                        );
                }
            }).catch(error => {
                showError({ context: this, error });
            });
        }, 0);
    }
}