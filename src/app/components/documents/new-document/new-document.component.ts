import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DocumentService } from '../../services/document/document.service';

@Component({
  selector: 'app-new-document',
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './new-document.component.html',
  styleUrl: './new-document.component.scss',
})
export class NewDocumentComponent {
  documentForm: FormGroup;
  selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService,
  ) {
    this.documentForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      tags: [''],
      owner: [''],
      status: ['DRAFT'],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.documentForm.invalid) {
      return;
    }

    this.documentForm.value.tags = this.tags;

    this.documentService
      .createDocument(this.documentForm.value)
      .subscribe((resp) => {
        if (resp.id) {
          if (this.selectedFile) {
            this.documentService
              .updateFile(this.selectedFile, resp.id)
              .subscribe();
            alert('Documento criado com sucesso');
          }
        }
      });
  }

  tags: string[] = [];

  addTag(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    if (event.key === ',' || event.key === 'Enter') {
      event.preventDefault();

      const value = input.value.replace(',', '').trim();
      if (value && !this.tags.includes(value)) {
        this.tags.push(value);
      }

      input.value = '';
    }
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }
}
