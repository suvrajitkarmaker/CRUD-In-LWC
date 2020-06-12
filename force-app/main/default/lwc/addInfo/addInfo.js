import { LightningElement,track, wire } from 'lwc';
import allStudent from '@salesforce/apex/student.allStudent';

export default class AddInfo extends LightningElement {
    @track studentRecords;
    @track errros;
    constructor() {
        super();
        allStudent()
        .then(result => {
            this.studentRecords = result;
            this.errros = undefined;
        })
        .catch(error => {
            this.errors = error;
            this.studentRecords = undefined;
        })
    }
}