export interface Theme {
  background: string;
  primary: string;
  selectionBoxBackground: string;
  selectionBoxBorderColor: string;
}

export const darkTheme: Theme = {
  background: '#222',
  primary: '#fff',
  selectionBoxBackground: '#3b3b3b',
  selectionBoxBorderColor: '#fff',
};

export const lightTheme: Theme = {
  background: '#fff',
  primary: '#222',
  selectionBoxBackground: '#e3e3e3',
  selectionBoxBorderColor: '#222',
};
