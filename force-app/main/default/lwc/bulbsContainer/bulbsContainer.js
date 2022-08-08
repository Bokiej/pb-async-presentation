import { LightningElement, wire } from 'lwc';
import { setBulbColor, setBulbTime, setBulbCounter, showBulbNumber, showAllBulbNumbers } from './js/bulbUtilities';
import { showError } from 'c/utility';
import getBulb from '@salesforce/apex/bulbController.getBulb'; // real Apex callback for wire
import lightBulb from 'c/utility'; // here goes Apex callback

export default class BulbsContainer extends LightningElement {
    YELLOW = { name: 'yellow', color: '#FFEE58' };
    RED = { name: 'red', color: '#FF7043' };
    GREEN = { name: 'green', color: '#66BB6A' };
    BLUE = { name: 'blue', color: '#4FC3F7' };
    WIRE = { name: 'wire' };

    wireBulbReady = false;
    otherBulbsReady = false;

    isRendered = false;

    get isLoading() {
        return !(this.wireBulbReady && this.otherBulbsReady);
    }

    @wire(getBulb, {})
    getBulb({error, data}) {
        if (data) {
            this.wire = JSON.parse(data);

            const bulb = setBulbColor({ context: this, ...this.wire });

            setBulbTime(bulb);
            setBulbCounter(bulb);

            console.log(`'${this.wire.name}' bulb is running`);
        } else if (error) {
            showError({ context: this, error });
        }
        this.wireBulbReady = true;
    }

    connectedCallback() {
        Promise.all([
            lightBulb({ ...this.YELLOW }),
            lightBulb({ ...this.RED }),
            lightBulb({ ...this.GREEN }),
            lightBulb({ ...this.BLUE })
        ]).then(bulbs =>
            bulbs.map(bulb => setBulbColor({ context: this, ...bulb }))
        ).then(bulbs =>
            bulbs.map(bulb => setBulbTime(bulb))
        ).then(bulbs =>
            bulbs.map(bulb => setBulbCounter(bulb))
        ).catch(error => {
            showError({ context: this, error });
        }).finally(() => {
            this.otherBulbsReady = true;
            console.log(`other bulbs are running`);
        });
    }

    renderedCallback() {
        if (!this.isLoading && !this.isRendered) {
            setTimeout(() => {
                showAllBulbNumbers({ context: this });
                this.isRendered = true;
            }, 2000);
        }
    }
}