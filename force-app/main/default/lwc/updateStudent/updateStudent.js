import { LightningElement , api, track} from 'lwc';
import saveData from '@salesforce/apex/student.saveData'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import searchStudentById from '@salesforce/apex/student.searchStudentById'
export default class UpdateStudent extends NavigationMixin(LightningElement) {

    
    @api studentDetails = {
        Id: '',
        email__c: '',
        id__c: '',
        image__c: '',
        phone__c: '',
        Name: ''
    }
    @api studentid;
    @api errors;


    @track openmodel = false;
    openmodal() {
        searchStudentById({
            searchParam: this.studentid
        })
        .then(result => {
             this.studentDetails = result[0];
             this.errros = undefined;
        })
        .catch(error => {
            this.errors = error;
            this.studentDetails = undefined;
        })
        this.openmodel = true
    }
    closeModal() {
        this.openmodel = false
    }
    saveMethod() {
        this.closeModal();
        saveData({
            student : this.studentDetails
        })
        .then(record => {
            const toast = new ShowToastEvent({
                'title' : 'Success!!',
                "message" : 'Updated the student info',
                "variant" : "success", 
            });
            this.dispatchEvent(toast);

            this[NavigationMixin.Navigate]({
                type: 'standard__navItemPage',
                attributes: {
                    apiName: 'Update_Or_delete' 
                }
            });
        })
        .catch(error => {
            const toast = new ShowToastEvent({
                'title' : 'Error!!',
                "message" : JSON.stringify(error),
                "variant" : "error", 
            });
            this.dispatchEvent(toast);
            console.log('navigation error');

            this[NavigationMixin.Navigate]({
                type: 'standard__navItemPage',
                attributes: {
                    apiName: 'Update_Or_delete' 
                }
            });
        });
        
    }

    handleInputChange(event) {
        let apiName = event.target.name;
        let inputval = event.target.value;
        this.studentDetails[apiName] = inputval
    }
}