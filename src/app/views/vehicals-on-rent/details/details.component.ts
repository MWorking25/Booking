import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/observable';
import Swal from 'sweetalert2';
import { FileUploader } from "ng2-file-upload";
import { CabsNBusesService } from '../../../services/cabs-n-buses.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @ViewChild('coverImage')
  myInputVariable: ElementRef;

  url:any;
  htmlContent:any;

  vehicalDetails:any = [{id:0,company:null,model:null,passingno:null,cpacity:null,color:null,price:null,discounted_price:null,createdby:null}];
  vehicalDocs:any[] = [{id:0,vehicalid:0,docname:null,docimg:null,createdby:null}];
  constructor(private _CabsNBusesService:CabsNBusesService,private activatedRoute: ActivatedRoute) { }

  isCollapsedGeneraldetails:boolean = false;
  isCollapsedDocDetails:boolean = false;
  ngOnInit() {

  }

  
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });


  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: Event) => { // called once readAsDataURL is completed
        this.url = event.currentTarget;
        this.url = this.url.result;
      }
    }
  }

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  resetImage() {
    this.myInputVariable.nativeElement.value = "";
    this.url = ''
    this.uploader.clearQueue();
  }

  VerifyForm()
{
  if(this.vehicalDetails[0].company != null && this.vehicalDetails[0].model != null && this.vehicalDetails[0].passingno != null && this.vehicalDetails[0].cpacity != null && this.vehicalDetails[0].price != null)
  {
    return false;
  }
  else{
    return true;
  }
}

saveVehicalDetails(vehicalDetails)
{
  if (this.uploader.queue.length > 0) {
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      data.append('file', fileItem);
      data.append('vehicalDetails', JSON.stringify(vehicalDetails.value));
      this.uploadFile(data);
    }
  } else {
    this.saveVehicalDetailasWithoutPic(vehicalDetails.value);
  }
}

uploadFile(data: FormData) {

  this._CabsNBusesService.saveVehicalDetails(data).subscribe((res: any) => {
    if(res.vehicalid > 0) 
    {
      this.vehicalDetails[0].id = res.vehicalid;
    }

    Swal.fire({
      title: res.title,
      text: res.message,
      type: res.type,
    }).then((result) => {
      if (res.status === 1) {
        this.uploader.clearQueue();
      } else {
       
      }
    });
  });
}


saveVehicalDetailasWithoutPic(hoteldetails)
{
  this._CabsNBusesService.saveVehicalDetails(hoteldetails).subscribe((res: any) => {
    if(res.vehicalid > 0) 
    {
      this.vehicalDetails[0].id = res.vehicalid;
    }

    Swal.fire({
      title: res.title,
      text: res.message,
      type: res.type,
    }).then((result) => {
      if (res.status === 1) {

      } else {
      }
    });
  });
}

addDocFile()
{

  this.vehicalDocs.push({id:0,vehicalid:0,docname:null,docimg:null,createdby:null});

 /*  if(this.vehicalDocs.length > 0)
  {
    if(this.vehicalDocs[this.vehicalDocs.length - 1].docname != null && this.vehicalDocs[this.vehicalDocs.length - 1].docname != '')
    {
      this.vehicalDocs.push({id:0,vehicalid:0,docname:null,docimg:null,createdby:null});
    }
  }
  else
  {
    this.vehicalDocs.push({id:0,vehicalid:0,docname:null,docimg:null,createdby:null});
  } */
}

VerifyDocForm()
{

}

saveVehicalDocDetails(vehicalDocsDetails)
{
  
 
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      data.append('file', fileItem);

      var vehicaldocDetails = {docname:vehicalDocsDetails.value["docname"+j],vehicalid:this.vehicalDetails[0].id,createdby:null}

      data.append('vehicalDocDetails', JSON.stringify(vehicaldocDetails));
      this.uploadVehicalDocs(data,j);
    } 
 
}


uploadVehicalDocs(data: FormData,j) {

  this._CabsNBusesService.uploadVehicalDocs(data).subscribe((res: any) => {
   
    if(j === this.uploader.queue.length - 1)
    {
      Swal.fire({
        title: res.title,
        text: res.message,
        type: res.type,
      }).then((result) => {
        if (res.status === 1) {

        } else {
          
        }
      });
    }
  });
}


}
