import { LightningElement, api, track } from 'lwc';

export default class Error extends LightningElement {
    @track messages = [];

    get prular() {
        return this.messages.length > 1 ? 's' : '';
    }

    @api
    showError(message) {
        this.messages.push(message);
        this.template.host.classList.add('show');
    }

    handleClose() {
        this.messages = [];
        this.template.host.classList.remove('show');
    }
}