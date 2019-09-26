export interface Irmao {
  name?: string;
  privilegios?: [{nameDia: string, privilegio: Dado[]}];
  compromisso?: any[];
  id?: string;
  uid?: string;
}


export interface Dado {
  id: string;
  name: string;
  data: Date;
  existe: boolean;
}
