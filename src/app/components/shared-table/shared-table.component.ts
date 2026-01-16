import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms'; // 1. Import ReactiveFormsModule
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export interface TableColumn {
  field: string;
  header: string;
  type?: 'text' | 'status' | 'date';
}

@Component({
  selector: 'app-shared-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // 2. Add ReactiveFormsModule
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.css'],
})
export class SharedTableComponent implements OnChanges, OnInit, OnDestroy {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() minWidth: string = '1400px';

  // 3. Replace simple string with FormControl
  searchControl = new FormControl('');
  private searchSubscription: Subscription | undefined;

  // Pagination State
  currentPage: number = 1;
  pageSize: number = 10;

  // Data State
  filteredData: any[] = [];
  paginatedData: any[] = [];

  // 4. Setup the reactive listener
  ngOnInit() {
    this.searchSubscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Wait 300ms after user stops typing
        distinctUntilChanged() // Only emit if value is different from previous
      )
      .subscribe(() => {
        this.filterData();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.filterData();
    }
  }

  // 5. Clean up subscription
  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  filterData() {
    // 6. Get value from FormControl
    const searchText = this.searchControl.value || '';

    if (!searchText) {
      this.filteredData = [...this.data];
    } else {
      const searchLower = searchText.toLowerCase();
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
