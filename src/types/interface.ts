export interface SidebarInterface {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface ExchangeRate {
  id: number;
  Ccy: string;
  Rate: string;
  Diff: string;
}
