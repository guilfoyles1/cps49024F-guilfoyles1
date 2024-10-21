const Candy = require('../models/candy');

// Check if candy exists
const candyExists = async (companyname, brandname) => {
    const query = { company: companyname, brand: brandname };
    return await Candy.exists(query);
};

// Get all candies
const getAllCandy = async (req, res) => {
    try {
        const candies = await Candy.find({});
        res.status(200).json({ success: true, candies });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get a specific candy
const getCandy = async (req, res) => {
    try {
        const cname = req.params.company;
        const bname = req.params.brand;
        const query = { company: cname, brand: bname };

        const foundCandy = await Candy.findOne(query);
        if (!foundCandy) {
            return res.status(404).json({ success: false, message: "Candy retrieval failed", error: "Unable to retrieve Candy" });
        }

        res.status(200).json({ success: true, foundCandy });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Create a new candy
const createCandy = async (req, res) => {
    try {
        const candyData = req.body;
        console.log(`This is the data: ${JSON.stringify(candyData)}`);

        const cname = candyData.company;
        const bname = candyData.brand;
        const num = candyData.quantity;

        if (await candyExists(cname, bname)) {
            return res.status(400).json({ success: false, message: "Candy already exists." });
        }

        const db_data = { company: cname, brand: bname, quantity: num };
        const createdCandy = await Candy.create(db_data);

        if (!createdCandy) {
            return res.status(404).json({ success: false, message: "Candy creation failed", error: "Unable to get created Candy" });
        }

        res.status(201).json({ success: true, createdCandy });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Update a candy
const updateCandy = async (req, res) => {
    try {
        const cname = req.params.company;
        const bname = req.params.brand;
        const query = { company: cname, brand: bname };

        const candy = await Candy.findOneAndUpdate(
            query,
            { quantity: req.body.quantity },
            { new: true }
        );

        if (!candy) {
            return res.status(404).json({ success: false, message: "Candy not found" });
        }

        res.status(200).json({ success: true, candy });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Delete a candy
const deleteCandy = async (req, res) => {
    try {
        const cname = req.params.company;
        const bname = req.params.brand;
        const query = { company: cname, brand: bname };

        const candy = await Candy.findOneAndDelete(query);
        if (!candy) {
            return res.status(404).json({ success: false, message: "Candy not found" });
        }

        res.status(200).json({ success: true, message: "Candy deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Administrative functions (not typically included in controllers)
const dropCandy = async () => {
    await Candy.deleteMany({});
};

const seedCandy = async () => {
    const candyData = [
        { company: "Hershey", brand: "Reece's Pieces", quantity: 5 },
        { company: "Hershey", brand: "5th Avenue", quantity: 10 },
        { company: "Hershey", brand: "York Peppermint Patties", quantity: 11 },
        { company: "Mars", brand: "Snickers", quantity: 2 },
        { company: "Mars", brand: "Twix", quantity: 7 },
    ];

    await Candy.insertMany(candyData);
};

// Exporting the API functions
module.exports = {
    getAllCandy,
    getCandy,
    createCandy,
    updateCandy,
    deleteCandy,
    dropCandy, 
    seedCandy, 
};
