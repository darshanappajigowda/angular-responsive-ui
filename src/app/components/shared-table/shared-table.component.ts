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

  searchText: string = '';

  // Pagination State
  currentPage: number = 1;
  pageSize: number = 10;

  // Data State
  filteredData: any[] = []; // Holds data after search is applied
  paginatedData: any[] = []; // Holds only the 10 rows visible on screen

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      // When new API data arrives, reset everything
      this.filterData();
    }
  }

  // --- SEARCH LOGIC ---
  filterData() {
    // 1. If search is empty, filtered data is just the original data
    if (!this.searchText) {
      this.filteredData = [...this.data];
    } else {
      // 2. Otherwise, filter rows
      const searchLower = this.searchText.toLowerCase();

      this.filteredData = this.data.filter((row) => {
        // Check if ANY column contains the search text
        return this.columns.some((col) => {
          const val = row[col.field]
            ? String(row[col.field]).toLowerCase()
            : '';
          return val.includes(searchLower);
        });
      });
    }

    // 3. Reset to page 1 and re-slice the data
    this.currentPage = 1;
    this.updatePagination();
  }

  // --- PAGINATION LOGIC ---
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
    // Slice from FILTERED data, not raw data
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
