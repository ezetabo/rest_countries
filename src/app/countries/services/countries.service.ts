import { Region } from './../interfaces/region.type';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { environment } from 'src/environments/environment.development';
import { CacheStore } from '../interfaces/cache-store.interface';


@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl = environment.apiCountry.url;

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { term: undefined, countries: [] },
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (localStorage.getItem('cacheStore')) {
      this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
    }
  }

  searchCountryByAlphaCode(term: string): Observable<Country | null> {
    const url = `${this.apiUrl}alpha/${term}`;
    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  searchForType(term: string, type: string | Region): Observable<Country[]> {
    const url = `${this.apiUrl}${type}/${term}`;
    return this.http.get<Country[]>(url)
      .pipe(catchError(() => of([])))
      .pipe(
        tap(countries => {
          switch (type) {
            case 'name':
              this.cacheStore.byCountry = { term, countries };
              break;
            case 'capital':
              this.cacheStore.byCapital = { term, countries };
              break;
            default:
              this.cacheStore.byRegion = { term: term as Region, countries };
              break;
          }
        }),
        tap(() => this.saveToLocalStorage())
      );
  }

}
