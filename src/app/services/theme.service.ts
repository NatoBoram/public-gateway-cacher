import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Theme } from '../enums/theme.enum';

function enumGuard<T>(enumeration: T): (token: unknown) => token is T[keyof T] {
  return (token: unknown): token is T[keyof T] => Object.values(enumeration).includes(token);
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  current = Theme.Light;
  icon = 'brightness_low';
  readonly valueChanges: Observable<Theme>;

  private readonly subject$ = new Subject<Theme>();

  constructor() {
    const stored = localStorage.getItem('theme');
    if (enumGuard(Theme)(stored)) {
      this.setTheme(stored);
    }

    this.valueChanges = this.subject$.asObservable();
  }

  switchTheme(): void {
    this.setTheme(this.current === Theme.Light ? Theme.Dark : Theme.Light)
  }

  setTheme(theme: Theme): void {
    document.querySelector('body')?.classList.remove(this.current)
    document.querySelector('body')?.classList.add(theme)
    this.current = theme;
    this.icon = this.getIcon(theme)
    this.subject$.next(theme);
    localStorage.setItem('theme', theme);
  }

  getIcon(theme: Theme): string {
    switch (theme) {
      case Theme.Dark: return 'brightness_high';
      case Theme.Light:
      default: return 'brightness_low';
    }
  }
}
