import "./db";
import "./models/Video";
import "./models/User";

import app from "./server";

const PORT = 4000;

app.listen(PORT, () => console.log(`✅ server listening on http://localhost:4000/ 👻`));
