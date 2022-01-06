const express = require('express');
var pg = require('pg');
const app = express();
const bodyParser = require('body-parser');
const port = normalizePort(process.env.PORT || '3000');
var connectionString = "postgres://onhirkepnjqlcw:2b8b310ee25ae03f6f2703a9f40687929930823c1eff5b53a090e2e698c527af@ec2-54-77-182-219.eu-west-1.compute.amazonaws.com:5432/d2i40f3gjsoa7u";
var pgClient = new pg.Client(connectionString);
//var fs = require('fs');

//Import, um auf Funktionen zugreifen zu können (jeder Key des Objekts repräsentiert eine Funktion)
const db = require("./db/kundendaten");

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


//Vertrag anhand der Vertrags_ID bzw. Versicherungsscheinnummer erhalten
//Wenn die Versicherungsscheinnummer nicht vorhanden ist, dann Fehler zurücksenden
app.get("/vertrag/:vertrags_id", async(req, res) => {
  const vertrag = await db.getVertragById(req.params.vertrags_id);
  if(vertrag.length===0){
    return res.status(404).json({"message": "Insurance policy number does not exist."});
  }
  return res.status(200).json({vertrag})
})

//Neuen Fall in der Datenbank anlegen
app.post("/fall", async(req, res) => {
  const results = await db.createFall(req.body);

  res.status(201).json({id: results[0]});
})

//Fallstatus aktualisieren
app.patch("/fall/:fall_id", async(req, res) => {
  const update = await db.updateFall(req.params.fall_id, req.body);
  res.status(200).json({update});
})

//Betrugsrelevante Daten abrufen
app.get("/betrugsdaten/:vertrags_id", async(req, res) => {

  // mehrere Methoden
  const Vertragsabschlussdatum = await db.getVertragsabschlussdatum(req.params.vertrags_id);
  const Anzahl_Faelle = await db.getAnzahlFaelle(req.params.vertrags_id);
  const Anzahl_abgeschlossene_Faelle = await db.getAnzahlAbgeschlosseneFaelle(req.params.vertrags_id);
  const Anzahl_abgelehnter_Faelle = await db.getAnzahlAbgelehnterFaelle(req.params.vertrags_id);
  const Anzahl_nicht_abgedeckter_Faelle = await db.getAnzahlNichtAbgedeckterFaelle(req.params.vertrags_id);
  const Anzahl_Betrug_Faelle = await db.getAnzahlBetrugFaelle(req.params.vertrags_id);
  const Anzahl_Laufender_Faelle = await db.getAnzahlLaufenderFaelle(req.params.vertrags_id);

  const daten = {
    Vertragabschlussdatum: Vertragsabschlussdatum[0].Vertragsabschlussdatum,
    Anzahl_Faelle: Anzahl_Faelle[0].count,
    Anzahl_abgeschlossene_Faelle: Anzahl_abgeschlossene_Faelle[0].count,
    Anzahl_abgelehnter_Faelle: Anzahl_abgelehnter_Faelle[0].count,
    Anzahl_nicht_abgedeckter_Faelle: Anzahl_nicht_abgedeckter_Faelle[0].count,
    Anzahl_Betrug_Faelle: Anzahl_Betrug_Faelle[0].count,
    Anzahl_Laufender_Faelle: Anzahl_Laufender_Faelle[0].count
  }
  return res.status(200).json(daten);
})


app.get("/werkstatt/:PLZ", async(req, res) => {
  const werkstatt = await db.getWerkstatt(req.params.PLZ);
  if(werkstatt.length===0){
    return res.status(404).json({"message": "There is no workshop in this city."});
  }
  return res.status(200).json({werkstatt})
})


/*
Help-functions
*/
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
      // named pipe
      return val;
  }

  if (port >= 0) {
      // port number
      return port;
  }

  return false;
}





