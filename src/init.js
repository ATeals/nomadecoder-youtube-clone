import app from "./server";
import "./db";
import "./models/Video";

const PORT = 4000;

app.listen(PORT, () => console.log(`✅ server listening on http://localhost:4000/ 👻`));
