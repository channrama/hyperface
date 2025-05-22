import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Product from './Product.js'


dotenv.config();
const app = express();
const port = 3000;
const MONGO_URI = "mongodb+srv://dschannappa93:HjMtsNUTTWYGR3A0@cluster0.6wdecju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})      
.then(() =>
    console.log('Connected to MongoDB...'))
.catch((err) =>

    console.error('Could not connect to MongoDB...', err)
);

app.get('/api/getdata', async (req, res) =>
    {
        try {
            const data = await Product.find();
            res.json(data);
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Server Error');
            }   
    }
);  
// add data to mongodb
app.post('/api/adddata', async (req, res) => {
    const { amount, type, category, description } = req.body;
    try {
        const newProduct = new Product({
            amount,
            type,
            category,
            description,
        });
        await newProduct.save();
        res.status(201).json(newProduct);
        console.log('Data added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
//delete data from mongodb
app.delete('/api/deldata/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id); 
        res.json(deletedProduct);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }

    }
);
//update data from mongodb
app.put('/api/updata/:id', async (req, res) =>

    {
        const { id } = req.params;
        const { amount, type, category, description } = req.body;
        try {
            const updatedProduct = await Product.findByIdAndUpdate( id, { amount, type, category, description }, { new: true });
            res.json(updatedProduct);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
);
//total balance
app.get('/api/total', async (req, res) =>
    {
        try {
            const total = await Product.aggregate([
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: '$amount' },
                    },
                },
            ]);
            res.json(total);
            } catch (err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
            }
);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});