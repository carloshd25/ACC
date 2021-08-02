import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as AWS from 'aws-sdk';



//import * as uuid from 'uuid';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.scss']
})
export class ArchivoComponent implements OnInit {

  private isCsv='(.)*[.]+[cC]+[sS]+[vV]';

  processFileForm: FormGroup=this.fb.group({ });
  

  private AWSID_='AKIAQMM5EU3QUWPLMGT2';
  private AWSSECRET_='nzwz1cgIjw4eAMD2X4MTw4kxp/4qzs7VJLTJQc5B';
  private BUCKET_='acc-pt';
  private FILE_='C:\\fakepath\\pruebaTecnica.csv';
  private NAME_FILE='pruebaTecnica.csv';
  private RUTAOUT_='archivosIN/';

  private fileContent='';
  constructor(private fb:FormBuilder) { }

  upload(){
    
    

    
    const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: this.AWSID_,
    secretAccessKey: this.AWSSECRET_
    });
    let params = {
    Bucket: this.BUCKET_,
    Key: this.RUTAOUT_ + this.NAME_FILE,
    ACL: 'public-read',
    ContentType: 'text/csv',
    Body: this.fileContent
    };
    
    let etag =  s3.upload(params);
    return etag;
  };

fileEvent(fileinput:any){
  console.log('entro');
  console.log(fileinput);
  this.fileContent=fileinput.targat.files[0];
  console.log(this.fileContent);
}
  ngOnInit(): void {
    this.initForm();
  }

 

  onSave():void{
    console.log('entro')
    if(this.processFileForm.valid){
      console.log(this.processFileForm.value);
      console.log(this.upload());

    }else{
      console.log('formulario no valido')
    }
  }

  isValidFiel(field:string):string{
    const validateField=this.processFileForm.get(field);
    return (!validateField?.valid && validateField?.touched) 
    ? 'is-invalid' : validateField?.touched ? 'is-valid':'';
  }

  private initForm():void{
    this.processFileForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      //archivo:['',[Validators.required]]
      archivo:['',[Validators.required,Validators.pattern(this.isCsv)]]
    })
  }

}
