import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-search-component',
  imports: [ReactiveFormsModule],
  templateUrl: './search-component.html',
  styleUrl: './search-component.css',
})
export class SearchComponent implements OnInit {
  @Input() serviceFn!: (query: string) => Observable<any[]>; // Function to fetch data
  @Input() placeholder: string = 'Search...';
  @Input() minLength: number = 2;
  @Input() debounce: number = 300;
  @Input() displayField: string = 'name'; // Field to display in dropdown
  @Input() valueField: string = 'id'; // Field to return as value

  @Output() selected = new EventEmitter<any>(); // Selected item

  searchControl = new FormControl('');
  loading: boolean = false;
  results: any[] = [];
  showDropdown: boolean = false;

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounce),
        filter((value): value is string => !!value && value.length >= this.minLength),
        tap(() => {
          this.loading = true;
          this.showDropdown = true;
        }),
        switchMap((value) => this.serviceFn(value).pipe(tap(() => (this.loading = false))))
      )
      .subscribe({
        next: (res) => (this.results = res),
        error: () => {
          this.loading = false;
          this.results = [];
        },
      });
  }

  onSelect(item: any) {
    this.selected.emit(item);
    this.searchControl.setValue(item[this.displayField], { emitEvent: false });
    this.showDropdown = false;
  }

  trackByFn(index: number, item: any) {
    return item[this.valueField];
  }
}
