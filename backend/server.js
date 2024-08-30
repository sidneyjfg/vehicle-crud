const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let vehicles = [];

// Carregar dados dos veículos a partir de um arquivo
const loadVehicles = () => {
    try {
        const data = fs.readFileSync('vehicles.json', 'utf8');
        vehicles = JSON.parse(data);
    } catch (err) {
        vehicles = [];
    }
};

// Salvar dados dos veículos em um arquivo
const saveVehicles = () => {
    fs.writeFileSync('vehicles.json', JSON.stringify(vehicles));
};

// Definição das rotas
// READ

app.get('/api/vehicles', (req, res) => {
    loadVehicles();
    res.json(vehicles);
});

// CREATE
app.post('/api/vehicles', (req, res) => {
    const vehicle = req.body;

    // Encontrar o maior ID existente
    const maxId = vehicles.reduce((max, v) => (v.id > max ? v.id : max), 0);

    // Atribuir o próximo ID
    vehicle.id = maxId + 1;

    vehicles.push(vehicle);
    saveVehicles();

    res.status(201).json(vehicle);
});


// UPDATE 
app.put('/api/vehicles/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedVehicle = req.body;

    // Carregar dados dos veículos
    loadVehicles();

    // Encontrar o veículo pelo ID
    const index = vehicles.findIndex(v => v.id === id);
    if (index === -1) {
        return res.status(404).send('Vehicle not found');
    }

    // Atualizar o veículo
    vehicles[index] = { ...vehicles[index], ...updatedVehicle };
    saveVehicles();

    // Enviar o veículo atualizado
    res.json(vehicles[index]);
});

// DELETE
app.delete('/api/vehicles/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    // Carregar dados dos veículos
    loadVehicles();

    // Encontrar o índice do veículo pelo ID
    const index = vehicles.findIndex(v => v.id === id);
    if (index === -1) {
        return res.status(404).send('Vehicle not found');
    }

    // Remover o veículo
    vehicles.splice(index, 1);
    saveVehicles();

    // Enviar resposta de sucesso
    res.status(204).send();
});


// Iniciar o servidor e exportar a instância
const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = server;
