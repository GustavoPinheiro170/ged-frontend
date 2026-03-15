import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { DocumentService } from '../../services/document/document.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-details-document',
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './details-document.component.html',
  styleUrl: './details-document.component.scss',
})
export class DetailsDocumentComponent {
  documentForm!: FormGroup;

  tags: string[] = [];

  isEdit = false;
  pdfUrl!: SafeResourceUrl;
  selectedFile!: File;
  fileUrl!: SafeResourceUrl;
  fileType!: string;
  roles: string[] = [];
  hasPermission: boolean = false;

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private auth: AuthService

  ) {}

  ngOnInit() {
    this.roles = this.auth.getRoles();
    this.documentForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      owner: [''],
      status: ['DRAFT'],
    });

  
    this.getPermission()
    this.loadDocument();
  }

  getPermission() {
    this.hasPermission =  this.roles.some((roles) => roles == "ADMIN")
  }

  getArchiveByDocument(id: number) {
    this.documentService
      .getDocumentArchiveById(Number(id))
      .subscribe((response) => {
        const blob = response.body!;
        const contentType = response.headers.get('content-type');

        const url = URL.createObjectURL(blob);

        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

        if (contentType?.includes('pdf')) {
          this.fileType = 'pdf';
        } else if (contentType?.includes('image')) {
          this.fileType = 'image';
        }
      });
  }

  loadDocument() {
    const id = this.route.snapshot.paramMap.get('id');
    this.documentService.getDocumentById(Number(id)).subscribe((resp) => {
      this.documentForm.patchValue(resp);
      this.tags = resp.tags;
    });

    this.getArchiveByDocument(Number(id));
  }

  enableEdit() {
    this.isEdit = true;
  }

  cancelEdit() {
    this.isEdit = false;
    this.loadDocument();
  }

  onSubmit() {
     const id = this.route.snapshot.paramMap.get('id');
    this.documentForm.value.tags = this.tags;

    this.documentService
      .updateDocument(Number(id), this.documentForm.value)
      .subscribe((resp) => {
        if (resp.id) {
          if (this.selectedFile) {
            this.documentService
              .updateArchiveExistent(this.selectedFile, resp.id)
              .subscribe();
           
          }
        }
         alert('Documento alterado com sucesso');
         this.loadDocument();
      });

    this.isEdit = false;
  }

  addTag(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    if (event.key === ',' && input.value.trim()) {
      event.preventDefault();

      this.tags.push(input.value.replace(',', '').trim());

      input.value = '';
    }
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
