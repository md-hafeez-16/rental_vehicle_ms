import Vehicle from "../schemas/vehicleSchema.js";

export const addVehicle = async (req, res) => {
    try {
        const vehicle = new Vehicle(req.body);
        await vehicle.save();
        res.status(200).json({
            msg: "added vehicle",
        })

    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.send(vehicles);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).send('Vehicle Not Found');
        }
        res.status(200).send(vehicle);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vehicle) {
            return res.status(404).send('Vehicle Not Found');
        }
        res.status(200).send(vehicle);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!vehicle) {
            return res.status(404).send('Vehicle not found');
        }
        res.status(200).send(vehicle)
    } catch (error) {
        res.status(500).send(error.message);
    }
};