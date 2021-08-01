import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.scss']
})
export class ArchivoComponent implements OnInit {

  private isCsv='^[*]+[.]+[cC]+[sS]+[vV]';

  processFileForm: FormGroup=this.fb.group({ });
  
  
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSave():void{
    console.log('entro')
    if(this.processFileForm.valid){
      console.log(this.processFileForm.value);
    }else{
      console.log('formulario no valido')
    }
  }

  private initForm():void{
    this.processFileForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      //archivo:['',[Validators.required]]
      archivo:['',[Validators.required,Validators.pattern(this.isCsv)]]
    })
  }

}
