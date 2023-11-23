import express from 'express';
import authMiddleWare from './auth';
import { addPlayer, convocarPlayers, deleteJugadorById, findJugadorById, findJugadorByPosition, findJugadores, modifyPlayer } from '../db/Jugadores';

const router = express.Router();

router.get('/players/:id', authMiddleWare, async (req, res) => {
    try {
        const idJugador = req.params.id;
        const jugador = findJugadorById(idJugador)

        if (!jugador) {
            return res.status(404).json({ mensaje: `Jugador no encontrado` });
        }
        res.json({ jugador });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/players/:id', authMiddleWare, async (req, res) => {
    try {
        const idJugador = req.params.id;
        const jugador = deleteJugadorById(idJugador)

        if (!jugador) {
            return res.status(404).json({ mensaje: `Jugador no encontrado` });
        }
        res.json({ jugador });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/players', authMiddleWare, async (req, res) => {
    try {
        if (req.query.position) {
            const position = req.query.position.toString();
            const jugadores = findJugadorByPosition(position);
            if (!jugadores) {
                return res.status(404).json({ mensaje: `Jugador no encontrado` });
            }
            res.json({ jugadores });
        }
        else {
            const jugador = findJugadores();

            if (!jugador) {
                return res.status(404).json({ mensaje: `Jugador no encontrado` });
            }
            res.json({ jugador });
        }

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/players/', authMiddleWare, async (req, res) => {
    try {
        const name = req.body.name;
        const position = req.body.position;
        const suspended = req.body.suspended;
        const injured = req.body.injured;

        addPlayer(name,position,suspended,injured);

        res.json({  });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/players/:id', authMiddleWare, async (req, res) => {
    try {
        const idJugador = req.params.id;
        const name = req.body.name;
        const position = req.body.position;
        const suspended = req.body.suspended;
        const injured = req.body.injured;

        const result = modifyPlayer(idJugador,position,suspended,injured);

        res.json({result});
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/call', authMiddleWare, async (req, res) => {
    try {
        const convocados = req.body.calledPlayersId;

        const result = convocarPlayers(convocados);

        res.json({result});
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
