import { Jugador } from "../models/Jugador";

const convocados: Jugador[] = [];

const jugadores: Jugador[] = [
  {
    "id": "0",
    "name": "Player 0",
    "position": "DF",
    "suspended": false,
    "injured": false
  },
  {
    "id": "1",
    "name": "Player 1",
    "position": "DF",
    "suspended": false,
    "injured": false
  },
  {
    "id": "2",
    "name": "Player 2",
    "position": "MD",
    "suspended": false,
    "injured": false
  },
  {
    "id": "3",
    "name": "Player 3",
    "position": "FW",
    "suspended": false,
    "injured": false
  },
  {
    "id": "4",
    "name": "Player 4",
    "position": "FW",
    "suspended": false,
    "injured": false
  },
  {
    "id": "5",
    "name": "Player 5",
    "position": "FW",
    "suspended": false,
    "injured": false
  },
  {
    "id": "6",
    "name": "Player 6",
    "position": "FW",
    "suspended": false,
    "injured": false
  },
  {
    "id": "7",
    "name": "Player 7",
    "position": "FW",
    "suspended": false,
    "injured": false
  },
  {
    "id": "8",
    "name": "Player 8",
    "position": "FW",
    "suspended": false,
    "injured": false
  },
  {
    "id": "9",
    "name": "Player 9",
    "position": "FW",
    "suspended": false,
    "injured": false
  },
  {
    "id": "10",
    "name": "Player 10",
    "position": "FW",
    "suspended": false,
    "injured": false
  },
  {
    "id": "11",
    "name": "Player 11",
    "position": "FW",
    "suspended": false,
    "injured": false
  },
  {
    "id": "12",
    "name": "Player 12",
    "position": "MD",
    "suspended": false,
    "injured": false
  },
  {
    "id": "13",
    "name": "Player 13",
    "position": "MD",
    "suspended": false,
    "injured": false
  },
  {
    "id": "14",
    "name": "Player 14",
    "position": "MD",
    "suspended": false,
    "injured": false
  },
  {
    "id": "15",
    "name": "Player 15",
    "position": "MD",
    "suspended": false,
    "injured": false
  },
  {
    "id": "16",
    "name": "Player 16",
    "position": "MD",
    "suspended": false,
    "injured": false
  },
  {
    "id": "17",
    "name": "Player 17",
    "position": "MD",
    "suspended": false,
    "injured": false
  },
  {
    "id": "18",
    "name": "Player 18",
    "position": "MD",
    "suspended": false,
    "injured": false
  },
  {
    "id": "19",
    "name": "Player 19",
    "position": "MD",
    "suspended": false,
    "injured": false
  },
  {
    "id": "20",
    "name": "Player 20",
    "position": "MD",
    "suspended": false,
    "injured": false
  },
  {
    "id": "21",
    "name": "Player 21 🥅",
    "position": "GK",
    "suspended": false,
    "injured": false
  },
  {
    "id": "22",
    "name": "Player 22 ❌ 🥅",
    "position": "MD",
    "suspended": false,
    "injured": false
  },
  {
    "id": "23",
    "name": "Player 23 🩼🤕🩼",
    "position": "GK",
    "suspended": false,
    "injured": true
  },
  {
    "id": "24",
    "name": "Player 🤬 🟥",
    "position": "GK",
    "suspended": true,
    "injured": false
  }
];

export const findJugadorById = (id: string): Jugador | undefined => {
  const result = jugadores.find((jugador) => jugador?.id === id);
  return result;
};

export const findJugadores = (): Jugador[] | undefined => {
  const result = jugadores;
  return result;
};

export const findJugadorByPosition = (position: string): Jugador[] => {
  const result: Jugador[] = [];
  jugadores.forEach((jugador) => {
    if (jugador?.position === position) {
      result.push(jugador);
    }
  });
  return result;
};

export const addPlayer = (name: string, position: string, suspended: boolean, injured: boolean): void => {
  const newPlayerId = jugadores.length++;
  const newPlayer: Jugador = { id: newPlayerId.toString(), name, position, suspended, injured };
  jugadores.push(newPlayer);
  console.log(jugadores);
};

export const modifyPlayer = (id: string, position: string, suspended: boolean, injured: boolean): Jugador => {
  const result = jugadores.find((jugador) => jugador?.id === id);
  const index = jugadores.indexOf(result as Jugador);
  console.log(jugadores[index]);
  if (result) {
    result.injured = injured;
    result.suspended = suspended;
    result.position = position;
  }
  console.log(jugadores);
  return jugadores[index];
};

export const deleteJugadorById = (id: string): boolean => {
  const result = jugadores.find((jugador) => jugador?.id === id);
  const index = jugadores.indexOf(result as Jugador);
  if (!index) {
    return false;
  }
  console.log(jugadores[index]);

  if (result) {
    jugadores.splice(index, 1);

  }
  console.log(jugadores);
  return true;
};

export const convocarPlayers = (convocados: string[]): Jugador[] => {
  const convocadosList: Jugador[] = [];
  const filledPosition = [false, false, false, false];
  const positionsFilled = false;

  convocados.forEach((id) => {
    const jugador = findJugadorById(id);
    if (jugador?.injured == false && jugador?.suspended == false) {
      convocadosList.push(jugador);
      if (jugador.position = "GK") {
        filledPosition[0] = true;
      }
      else if (jugador.position = "DF") {
        filledPosition[1] = true;
      }
      else if (jugador.position = "MD") {
        filledPosition[2] = true;
      }
      else if (jugador.position = "FW") {
        filledPosition[3] = true;
      }
    }
    else{
      console.log(jugador?.name, jugador?.injured, jugador?.suspended);
    }
  })
  console.log(filledPosition[0],filledPosition[1],filledPosition[2],filledPosition[3]);
  if (filledPosition[0] == true && filledPosition[1]== true && filledPosition[2]== true && filledPosition[3]== true) {
    if (convocadosList.length <= 22) {
      console.log(convocadosList);
      return convocadosList;
    }
  }
  console.log(convocadosList.length);
  //console.log(convocadosList);
  throw new Error("no se cumplen los requisitos");
};