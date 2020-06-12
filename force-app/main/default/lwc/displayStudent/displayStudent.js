import { LightningElement, api } from 'lwc';
import deleteStudent from '@salesforce/apex/student.deleteStudent'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
export default class DisplayStudent extends NavigationMixin(LightningElement) {
    @api studentRecord;
    @api updateData = false;
    @api deleteData = false;
    @api openModal = false;
    handleUpdate(){
        this.openModal = true;
    }
    handleDelete(event){
        let studentId = event.target.name;
        console.log(studentId);
        deleteStudent({
            searchParam: studentId
        })
        .then(result => {
            const toast = new ShowToastEvent({
                'title' : 'Success!!',
                "message" : 'Deleted the student info',
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
                'title' : 'Success!!',
                "message" : JSON.stringify(error),
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
    }
}