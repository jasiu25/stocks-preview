import app from "./app.js";

const PORT = (process.env.PORT) || 3000;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
        process.exitCode = 1;
        return;
    }

    const date = new Date(Date.now());
    console.log(`${date.toLocaleTimeString("pl-PL")}: Listening on port ${PORT}`);
})