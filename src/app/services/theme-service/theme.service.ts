import { Injectable } from '@angular/core';
import { darkTheme, lightTheme, Theme } from "../../constants/themes";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: Theme = lightTheme;

  // Theme: light vs dark mode
  // boxBorder: if true, shows a solid border around the selection box
  // boxBackground: if true, adds background color to the selection box (compatible with mode color)
  setMainTheme(theme: 'light' | 'dark', boxBorder = false, boxBackground  = true) {
    this.currentTheme = theme === 'light' ? lightTheme : darkTheme;

    this.setElemStyle('--background-color', this.currentTheme.background);
    this.setElemStyle('--text-color', this.currentTheme.text);
    this.setElemStyle('--primary-color', this.currentTheme.primary);
    this.setElemStyle('--secondary-color', this.currentTheme.secondary);

    this.setElemStyle('--selection-box-background-color',boxBackground ? this.currentTheme.selectionBoxBackground : 'transparent');
    this.setElemStyle('--selection-box-border-width',boxBorder ? '1px' : '0');
    this.setElemStyle('--selection-box-border-color',boxBorder ? this.currentTheme.selectionBoxBorderColor : 'transparent');
  }

  setElemStyle(selector: string, style: string) {
    document.documentElement.style.setProperty(selector, style);
  }

  isDarkTheme(): boolean {
    return this.currentTheme === darkTheme;
  }
}
