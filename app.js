const express = require("express")
const app     = express()
const fs      = require("fs")
const { exec } = require("child_process")


// ❌ Muammo 1: Hardcoded API key
const API_KEY    = "sk-1234abcd-secret"
const DB_PASS    = "password123"


// ❌ Muammo 2: Eval ishlatish — code injection xavfi
app.get("/eval", (req, res) => {
    const code = req.query.code
    eval(code)  // eslint-security: no-eval
})


// ❌ Muammo 3: Command injection
app.get("/cmd", (req, res) => {
    const input = req.query.q
    exec(`ls ${input}`)  // xavfli!
})


// ❌ Muammo 4: Faylni to'g'ridan yo'l bilan o'qish
app.get("/file", (req, res) => {
    const filename = req.query.name
    const data = fs.readFileSync(filename)
    res.send(data)
})


app.listen(3000, () => console.log("Server on 3000"))
 

