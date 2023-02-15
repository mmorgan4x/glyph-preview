export interface Font {
  name: string;
  url: string;
}

export interface FontData {
  postscriptName: string;
  fullName: string;
  family: string;
  style: string;
}
export interface Gylph {
  code: number;
  unicode: string;
  char: string;
  isDefault: boolean;
}