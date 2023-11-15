import { Component } from '@angular/core';

@Component({
  selector: 'app-pepe-and-footer',
  templateUrl: './pepe-and-footer.component.html',
  styleUrls: ['./pepe-and-footer.component.scss']
})
export class PepeAndFooterComponent {

  curr_page: number = 0;
  page_size: number = 5;
  last_page: number = 0;
  totalPages: number = 0;
  totalRegistros: number = 0;
  page_sizes = [5, 10, 15, 20, 50, 100]
  registros = [];

  teste = [
    {'teste': 'aa'}
  ]

  setPageSize(aa: number) {}

  goFirstPage(): void {
    this.curr_page = 0
  }

  goLastPage(): void {
    this.curr_page = this.last_page;
  }

  goPreviousPage(): void {
    this.curr_page = this.curr_page > 0 ? this.curr_page - 1 : 0;
  }

  goNextPage(): void {
    this.curr_page = this.curr_page < this.last_page ? this.curr_page + 1 : this.last_page;
  }

}
