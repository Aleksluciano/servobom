import { Privilegio } from '../privilegio/privilegio.model';

export interface Dia {
        name: string;
        isActive: boolean;
        priv?: Privilegio[];
}

export interface DiaSemana {
       uid?: string;
       dias: Dia[];
}
