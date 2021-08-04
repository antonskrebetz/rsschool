export interface interfaceCar {
  name: string;
  color: string;
  id: number;
}

export interface interfaceRace {
  distance: number;
  velocity: number;
}

export interface interfaceWinner {
  id: number;
  time: number;
  wins: number;
}

export interface interfaceWinn {
  time: number;
  wins: number;
}

export interface interfaceResult {
  id: number;
  name: string;
  succes: boolean;
  time: number;
}

export interface interfaceCreate {
  name: string;
  color: string;
}
