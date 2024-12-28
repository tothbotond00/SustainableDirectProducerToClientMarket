import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-image-dialog',
  standalone: false,

  templateUrl: './image-dialog.component.html',
  styleUrl: './image-dialog.component.scss'
})
export class ImageDialogComponent {

  form!: FormGroup
  url = '';
  selectedFile?: File;

  constructor(private dialogRef: MatDialogRef<ImageDialogComponent>,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.formBuilder.group({
      image: ['', [Validators.required]]
    });
    this.url = data.url;
    console.log(this.url);
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/webp', 'image/jpg'];
      if (!validImageTypes.includes(file.type)) {
        this.form.controls['image'].setErrors({ 'incorrect': true });
        return;
      }
      this.form.controls['image'].setErrors(null);
      this.selectedFile = file;
    }
  }

  onSave() {
    if (this.selectedFile) {
      this.dialogRef.close(this.selectedFile);
    }
  }
}
