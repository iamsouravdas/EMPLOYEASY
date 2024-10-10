import app from "./app"
import { PORT } from "./core/configs/configuration.configs"

export const startServer = async () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    process.on("uncaughtException", (error)=>{
        console.log("An error occurred here: ", error);
        process.exit(1);
    })
}

startServer().then(()=>{
    console.log("Server is running");
})