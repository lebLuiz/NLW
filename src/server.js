const express = require("express");
const server = express();

//Pegar o BD
const db = require("./database/db")

//Configurar pasta publica
server.use(express.static("public"));

// Utilizando Template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da minha aplicação
//página inicial
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título" });
});

server.get("/create-point", (req, res) => {

    // req.query: Query Strings da nossa url
    console.log(req.query)

    return res.render("create-point.html");
})




server.get("/search", (req, res) => {

    // pegar os dados do BD
    db.all(`SELECT * FROM places;`, function(err, rows) {
        if(err) {
            return console.log(err);
        }

        const total = rows.length;

        console.log("Aqui estão seus registros:")
        console.log(rows);
        
        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total });
    })

})

//ligar o servidor
server.listen(3000);
