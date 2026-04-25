import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CarService } from '../../../core/services/car.service';

import { DatePipe } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ICar } from '../../../shared/models/icar';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [
    ReactiveFormsModule, DatePipe,
    MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatProgressSpinnerModule,
    MatDialogModule, MatTooltipModule
  ],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements OnInit {
  cars: ICar[] = [];
  loading = false;
  showForm = false;
  editingCar: ICar | null = null;

  displayedColumns = ['id', 'name', 'brand', 'model', 'kilometers', 'price_per_day', 'actions'];

  // Filters
  searchControl  = new FormControl('');
  brandControl   = new FormControl('');
  minPriceControl = new FormControl('');
  maxPriceControl = new FormControl('');

  // Form
  carForm = new FormGroup({
    name:          new FormControl('', Validators.required),
    brand:         new FormControl('', Validators.required),
    model:         new FormControl('', Validators.required),
    kilometers:    new FormControl('', Validators.required),
    price_per_day: new FormControl('', Validators.required),
  });

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadCars();

    this.searchControl.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => this.loadCars());
    this.brandControl.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => this.loadCars());
    this.minPriceControl.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => this.loadCars());
    this.maxPriceControl.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => this.loadCars());
  }

  loadCars(): void {
    this.loading = true;
    const filters = {
      search:    this.searchControl.value    || '',
      brand:     this.brandControl.value     || '',
      min_price: this.minPriceControl.value  || '',
      max_price: this.maxPriceControl.value  || '',
    };
    this.carService.getCars(filters).subscribe({
      next: (res) => { this.cars = res.data; this.loading = false; },
      error: () => this.loading = false
    });
  }

  openAddForm(): void {
    this.editingCar = null;
    this.carForm.reset();
    this.showForm = true;
  }

openEditForm(car: ICar): void {
  this.editingCar = car;
  this.carForm.patchValue({
    name:          car.name,
    brand:         car.brand,
    model:         car.model,
    kilometers:    car.kilometers.toString(),
    price_per_day: car.price_per_day.toString(),
  });
  this.showForm = true;
}

  submitForm(): void {
    if (this.carForm.invalid) return;

    const data = this.carForm.value;

    if (this.editingCar) {
      this.carService.updateCar(this.editingCar.id, data).subscribe({
        next: () => { this.showForm = false; this.loadCars(); }
      });
    } else {
      this.carService.createCar(data).subscribe({
        next: () => { this.showForm = false; this.loadCars(); }
      });
    }
  }

  deleteCar(id: number): void {
    if (!confirm('Are you sure you want to delete this car?')) return;
    this.carService.deleteCar(id).subscribe({
      next: () => this.loadCars()
    });
  }

  cancelForm(): void {
    this.showForm = false;
    this.carForm.reset();
  }
}
