export interface Theme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  selectionBoxBackground: string;
  selectionBoxBorderColor: string;
}

export const darkTheme: Theme = {
  background: '#222',
  text: '#fff',
  primary: '#2196F3',
  secondary: '#E91E63',
  selectionBoxBackground: '#3b3b3b',
  selectionBoxBorderColor: '#fff',
};

export const lightTheme: Theme = {
  background: '#fff',
  text: '#222',
  primary: '#1976D2',
  secondary: '#FFC107',
  selectionBoxBackground: '#e3e3e3',
  selectionBoxBorderColor: '#222',
};
