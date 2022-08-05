import { LightningElement, api } from 'lwc';
import { vendorURL } from 'c/utility';

export default class Bulb extends LightningElement {
    @api color;
    @api number;
    @api time;

    startTime;

    connectedCallback() {
        this.startTime = new Date().getTime();
        this.setBulbColor(this.color);

        // vendorURL Promise form c/utility
        vendorURL().then(url => {
            console.log('bulb', url);
        }).catch(error => {
            showError({ context: this, error });
        });
    }

    @api
    setBulbColor(value) {
        if (!!value) {
            this.color = value;
            this.template.host.style?.setProperty('--pb-bulb-bg-color', value);
        }
    }

    @api
    setBulbTime() {
        this.time = (new Date().getTime() - this.startTime) / 1000;
    }
}