//const app = require("./app.js")
import app from "./app.js"
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`server should be running at http://localhost:${port}/`))

