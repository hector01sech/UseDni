require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS
app.use(cors());

// Ruta para obtener datos del DNI
app.get("/api/dni/:dni", async (req, res) => {
    const dni = req.params.dni;
    const apiKey = process.env.API_KEY; // Usar variable de entorno
    const url = `https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`;

    try {
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${apiKey}` },
        });

        res.json(response.data);
    } catch (error) {
        res.status(400).json({ error: "No se pudo obtener información del DNI" });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
