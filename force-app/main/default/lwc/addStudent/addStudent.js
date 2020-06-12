import { LightningElement , api, track} from 'lwc';
import saveData from '@salesforce/apex/student.saveData'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
export default class AddStudent extends NavigationMixin(LightningElement) {
    @api studentDetails = {
        email__c: '',
        id__c: '',
        image__c: '',
        phone__c: '',
        Name: ''
    }

    @track openmodel = false;
    openmodal() {
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
                "message" : 'Added the student info',
                "variant" : "success", 
            });
            this.dispatchEvent(toast);

            this[NavigationMixin.Navigate]({
                type: 'standard__navItemPage',
                attributes: {
                    apiName: 'Add_Student_Info' 
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
            
            this[NavigationMixin.Navigate]({
                type: 'standard__navItemPage',
                attributes: {
                    apiName: 'Add_Student_Info' 
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