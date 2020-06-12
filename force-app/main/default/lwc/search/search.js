import { LightningElement, track } from 'lwc';

export default class Search extends LightningElement {
    @track searchValue;
    handleChange(event) {
        const value = event.target.value;
        console.log(value)
        const searchEvent = new CustomEvent(
            'search',
            {
                detail:value
            }
        );
        this.dispatchEvent(searchEvent);

    }
}