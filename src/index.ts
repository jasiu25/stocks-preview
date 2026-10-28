import app from "./app.js";

const PORT = (process.env.PORT) || 3000;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
        process.exitCode = 1;
        return;
    }
    console.log(`Listening on port ${PORT}`);
})