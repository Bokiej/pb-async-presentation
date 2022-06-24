import { LightningElement } from 'lwc';

export default class Notify extends LightningElement {
    
    get error() {
        return this.template.querySelector('c-error');
    }

    connectedCallback() {
        this.template.addEventListener('notify', event => {
            event.stopPropagation();
            switch (event.detail?.type) {
                case 'error':
                    this.error.showError(event.detail?.error);
                    break;
                default:
                    break;
            }
        });
    }
}