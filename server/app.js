import express from 'express';
import cors from 'cors';
import router from './routes/route.js';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again later.', 
    headers: true, 
});



app.use(limiter);
app.use('/api', router ,limiter);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
