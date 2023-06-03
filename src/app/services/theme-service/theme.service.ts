import { Injectable } from '@angular/core';
import { darkTheme, lightTheme, Theme } from "../../constants/themes";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private lightTheme = lightTheme;
  private darkTheme = darkTheme;
  private currentTheme: Theme = this.lightTheme;

  // Theme: light vs dark mode
  // boxBorder: if true, shows a solid border around the selection box
  // boxBackground: if true, adds background color to the selection box (compatible with mode color)
  setMainTheme(theme: 'light' | 'dark',
               boxBorder = false,
               boxBackground  = true,
               spanningHeightFactor: number) {
    this.currentTheme = theme === 'light' ? this.lightTheme : this.darkTheme;

    this.setElemStyle('--background-color', this.currentTheme.background);
    this.setElemStyle('--primary-color', this.currentTheme.primary);

    this.setElemStyle('--selection-box-background-color',boxBackground ? this.currentTheme.selectionBoxBackground : 'transparent');
    this.setElemStyle('--selection-box-border-width',boxBorder ? '1px' : '0');
    this.setElemStyle('--selection-box-border-color',boxBorder ? this.currentTheme.selectionBoxBorderColor : 'transparent');
    this.setElemStyle('--selection-spanning-height-factor', spanningHeightFactor.toString())
  }

  createThemes(customLightTheme: Partial<Theme>, customDarkTheme: Partial<Theme>) {
      this.lightTheme = { ...lightTheme, ...customLightTheme };
      this.darkTheme = { ...darkTheme, ...customDarkTheme };
  }

  private setElemStyle(selector: string, style: string) {
    document.documentElement.style.setProperty(selector, style);
  }
}
