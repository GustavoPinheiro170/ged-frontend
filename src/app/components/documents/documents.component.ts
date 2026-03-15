import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DocumentService } from '../services/document/document.service';

@Component({
  selector: 'app-documents',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {
  @Input() documents: any[] = [];

  page = 0;
  size = 10;

  searchTitle = '';
  statusFilter = '';

  constructor(
    private documentService: DocumentService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(){
    const params = {
      page: this.page,
      size: this.size,
      title: this.searchTitle,
      status: this.statusFilter
    };

    this.documentService.getDocuments(params.title, params.status, params.page, params.size)
      .subscribe((response:any) => {
        this.documents = response.content;

      });
  }

  newDocument() {
    return this.route.navigate(["document"])
  }
  nextPage(){
    this.page++;
    this.loadDocuments();
  }

  previousPage(){
    if(this.page > 0){
      this.page--;
      this.loadDocuments();
    }
  }

  openDocument(id:number){
    this.route.navigate([`dashboard/detail/${id}`])
  }

}
