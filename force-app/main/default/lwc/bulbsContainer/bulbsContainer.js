import { LightningElement } from 'lwc';
import { showError } from 'c/utility';
import lightBulb from 'c/utility'; // here goes Apex callback

export default class BulbsContainer extends LightningElement {
    YELLOW = { name: 'yellow', color: '#FFEE58' };
    RED = { name: 'red', color: '#FF7043' };
    GREEN = { name: 'green', color: '#66BB6A' };
    BLUE = { name: 'blue', color: '#4FC3F7' }; 

    counter = 0;
    order = [];

    connectedCallback() {
        lightBulb({ ...this.YELLOW }).then(data =>
            this.setBulbColor(data)
        ).then(bulb =>
            this.setBulbTime(bulb)
        ).then(bulb =>
            this.setBulbCounter(bulb)
        ).then(bulb =>
            this.showBulbNumber(bulb)
        );

        lightBulb({ ...this.RED }).then(data => {
            this.setBulbColor(data)
        }).then(bulb =>{
            this.setBulbTime(bulb)
            // throw `2Fatal error in ${this.RED.name} bulb.`
        }).catch(error => {
            showError({ context: this, error });
        }).then(bulb =>
            this.setBulbCounter(bulb)
        ).then(bulb => {
            this.showBulbNumber(bulb);
        }).catch(error => {
            showError({ context: this, error });
        });

        lightBulb({ ...this.GREEN }).then(data =>
            this.setBulbColor(data)
        ).then(bulb =>
            this.setBulbTime(bulb)
        ).then(bulb =>
            this.setBulbCounter(bulb)
        ).then(bulb => {
            this.showBulbNumber(bulb);
            // throw `Fatal error in ${this.GREEN.name} bulb.`;
        }).catch(error => {
            showError({ context: this, error });
        });

        lightBulb({ ...this.BLUE }).then(data =>
            this.setBulbColor(data)
        ).then(bulb =>
            this.setBulbTime(bulb)
        ).then(bulb =>
            this.setBulbCounter(bulb)
        ).then(bulb =>
            this.showBulbNumber(bulb)
        );
    }

    setBulbColor({ name, color }) {
        const bulb = this.template.querySelector(`[data-name="${name}"]`);

        bulb?.setBulbColor(color);
    
        return bulb;
    }

    setBulbTime(bulb) {
        bulb?.setBulbTime();

        return bulb;
    }

    setBulbCounter(bulb) {
        if (bulb) this.order.push(bulb.dataset.name);

        return bulb;
    }

    showBulbNumber(bulb) {
        const counter = this.order.indexOf(bulb?.dataset.name) + 1;

        if (bulb && counter > 0) bulb.number = counter;

        return bulb;
    }

    showAllBulbNumbers() {
        this.template.querySelectorAll('c-bulb').forEach(bulb => {
            this.showBulbNumber(bulb);
        });
    }
}