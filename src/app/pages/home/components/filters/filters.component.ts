import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreAPIService } from 'src/app/services/store-api.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.components.html',
})
export class FiltersComponent implements OnInit, OnDestroy { 
  @Output() showCategory = new EventEmitter<string>();

  categoriesSubscription: Subscription | undefined;
  categories: Array<string> | undefined

  constructor(private storeService: StoreAPIService) {}

  ngOnInit(): void {
  this.categoriesSubscription = this.storeService.getAllCategories()
    .subscribe((_categories) => {
    this.categories = _categories})
  }

  onShowCategory(category: string): void { 
    this.showCategory.emit(category)
  }
  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

}
