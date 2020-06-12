import { LightningElement, track,wire } from 'lwc';
import searchStudent from '@salesforce/apex/student.searchStudent'
import allStudent from '@salesforce/apex/student.allStudent'
export default class UpdateOrDelete extends LightningElement {
    @track studentRecords;
    @track errros;
    @track check = true;

    

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
    
    handleEvent(event){
        const eventVal = event.detail;
        searchStudent({
            searchParam : eventVal
        })
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