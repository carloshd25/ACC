import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as AWS from 'aws-sdk';
import { HttpClient  } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.scss']
})
export class ArchivoComponent implements OnInit {

  private isCsv='(.)*[.]+[cC]+[sS]+[vV]';

  processFileForm: FormGroup=this.fb.group({ });
  

  private AWSID_='AKIAQMM5EU3QUWPLMGT2';
  private AWSSECRET_='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';
  private BUCKET_='acc-pt';
  
  private NAME_FILE='pruebaTecnica2.csv';
  private RUTAOUT_='archivosIN/';
  private BODY_='';

  
  
  constructor(private fb:FormBuilder,private http: HttpClient) { }

  upload(){
    
    var content='hola';
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
    Body:  this.BODY_
    };
    
    let etag =  s3.upload(params ,function (err:any, data:any) {
      if (err) {
          console.log('There was an error uploading your file: ', err);
          return false;
      }
      console.log('Successfully uploaded file.', data);
      return true;
    });
    return etag;
  };

  ngOnInit(): void {
    this.initForm();
  }

  onFileSelected(event:any){
    const file:File = event.target.files[0];

        if (file) {

            this.NAME_FILE = file.name;
            console.log(this.NAME_FILE);
        }


        
        let reader = new FileReader();
        reader.onload = (e:any) => {
          // Cuando el archivo se terminó de cargar
          let lines = e.target.result;
          //let output = reverseMatrix(lines);
          console.log(lines);
          this.BODY_=lines;
        };
          // Leemos el contenido del archivo seleccionado
          reader.readAsBinaryString(file);


  }

  onSave():void{
    
    if(this.processFileForm.valid){

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
