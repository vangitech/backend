import dotevn from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';


dotevn.config({
    path: "./.env"
});

const startServer = async () => {
    try {
        await connectDB();

        app.on("error", (error) => {
            console.error("Error starting the server:", error);
            throw error // Rethrow the error to be caught by the outer catch block
        });
        
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on : ${process.env.PORT}`);
            
        });
    } catch (error) {
        console.error("Error starting the server:", error);
    }
}

startServer();