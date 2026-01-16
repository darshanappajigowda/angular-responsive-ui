import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  field: string;
  header: string;
  type?: 'text' | 'status' | 'date';
}

@Component({
  selector: 'app-shared-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.css'],
})
export class SharedTableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];

  // New Input: Default to 1400px (for Info screen), but allow override
  @Input() minWidth: string = '1400px';

  searchText: string = '';

  // Pagination State
  currentPage: number = 1;
  pageSize: number = 10;

  // Data State
  filteredData: any[] = [];
  paginatedData: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.filterData();
    }
  }

  filterData() {
    if (!this.searchText) {
      this.filteredData = [...this.data];
    } else {
      const searchLower = this.searchText.toLowerCase();
      this.filteredData = this.data.filter((row) => {
        return this.columns.some((col) => {
          const val = row[col.field]
            ? String(row[col.field]).toLowerCase()
            : '';
          return val.includes(searchLower);
        });
      });
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.pageSize) || 1;
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.filteredData.length);
  }

  updatePagination() {
    this.paginatedData = this.filteredData.slice(
      this.startIndex,
      this.endIndex
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
