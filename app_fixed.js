const express    = require("express")
const app        = express()
const { execFile } = require("child_process")
require("dotenv").config()


// ✅ 1-fix: env'dan o'qish
const API_KEY = process.env.API_KEY
const DB_PASS = process.env.DB_PASS


// ✅ 2-fix: eval o'rniga Function konstruktor ham xavfli — butunlay olib tashlanadi
app.get("/safe", (req, res) => {
    res.json({ message: "eval olib tashlandi" })
})


// ✅ 3-fix: execFile (shell injection yo'q) + allowlist
const ALLOWED = ["ls", "pwd", "date"]
app.get("/cmd", (req, res) => {
    const cmd = req.query.q
    if (!ALLOWED.includes(cmd)) return res.status(400).send(Ruxsat yoq)
    execFile(cmd, [], (err, out) => res.send(out))
})


app.listen(process.env.PORT || 3000)
