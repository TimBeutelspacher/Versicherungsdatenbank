
//Verwendung des relativen Pfads, um das lokale File anzusprechen --> zum Import der connected insctance von Knex
const knex = require("./knex");

//Vetragsinformationen zu einer Vertragsnummer abrufen: Vertragsnummer und Kundendaten
function getVertragById(vertrags_id){
    /*
    const vertrag = knex
        .from('Vertrag')
        .select('Vertragsbezeichnung', 'Vertragsabschlussdatum', 'Vorname')
        .where("Vertrags_ID", vertrags_id)    
    */
    const vertrag = knex('Kunde')
    .join('Vertrag', 'Kunde.Kunden_ID', 'Vertrag.Kunden_ID')
    .select('Kunde.Vorname', 'Kunde.Nachname', 'Kunde.Postleitzahl', 'Kunde.Ort', 'Kunde.Strasse', 'Kunde.Telefon', 'Vertrag.Vertragsart', 'Vertrag.Kunden_ID')
    .where('Vertrag.Vertrags_ID', vertrags_id);

    return vertrag;
    //return knex("Vertrag").where("Vertrags_ID", id);
}

//Neuen Fall anlegen
function createFall(falldaten){
    //ermittelt die Kunden ID zu einer Vertrags-ID
    falldaten.Kunden_ID = getKundenIdByVertragsId(falldaten.Vertrags_ID); 
    return knex("Fall").insert(falldaten).returning('Fall_ID');
}

function getWerkstatt(PLZ){

    return knex('Werkstatt').select('Werkstatt_ID', 'Name', 'Strasse', 'Postleitzahl', 'Ort', 'Email', 'Telefon').where('Postleitzahl',PLZ);

}


function getKundenIdByVertragsId(vertrags_id){
    const kunden_ID = knex
      	.from('Vertrag')
        .select('Kunden_ID')
        .where('Vertrags_ID', vertrags_id);
    return kunden_ID;
}

//Falldaten aktualisieren
function updateFall(fall_id, falldaten){
     return knex("Fall").where("Fall_ID", fall_id).update(falldaten);
}

function getBetrugsrelevanteDaten(vertrags_id){
    const datum_tarifabschluss = knex('Vertrag').select('Vertragsabschlussdatum').where('Vertrags_ID', vertrags_id);
    //console.log(datum_tarifabschluss);
    
    const kunden_id = getKundenIdByVertragsId(vertrags_id);
    //const anzahl_abgeschlossene_faelle = knex('Fall').count('Haftpflicht').where('Kunden_ID', kunden_id);
    
    //console.log(anzahl_abgeschlossene_faelle);

    //gesamte Anzahl der Fälle, die einem Kunden zugeordnet sind
    const anzahl_faelle = knex('Fall').count('Fallstatus').where('Kunden_ID', kunden_id);

    const anzahl_faelle_abgeschlossen = knex('Fall').count('Fallstatus').where('Kunden_ID', kunden_id).where('Fallstatus', 'nicht abgedeckt');

    //const query = knex('Fall').count();
    //const total = await query.clone().count();


    //return anzahl_faelle_abgeschlossen;

    //return anzahl_faelle.count(`Fallstatus`);

    return anzahl_faelle;
}



function getVertragsabschlussdatum(vertrags_id){
    return knex('Vertrag').select('Vertragsabschlussdatum').where('Vertrags_ID', vertrags_id);
}
function getAnzahlFaelle(vertrags_id){
    const kunden_id = getKundenIdByVertragsId(vertrags_id);
    //gesamte Anzahl der Fälle, die einem Kunden zugeordnet sind
    const anzahl_faelle = knex('Fall').count('Fallstatus').where('Kunden_ID', kunden_id);
    return anzahl_faelle;
}
function getAnzahlAbgeschlosseneFaelle(vertrags_id){
    const kunden_id = getKundenIdByVertragsId(vertrags_id);
    //gesamte Anzahl der Fälle eines Kunden, die erfolgreich abgeschlossen wurden
    const anzahl_faelle = knex('Fall').count('Fallstatus').where('Kunden_ID', kunden_id).where('Fallstatus', 'erfolgreich abgeschlossen');
    return anzahl_faelle;
}
function getAnzahlBetrugFaelle(vertrags_id){
    const kunden_id = getKundenIdByVertragsId(vertrags_id);
    //gesamte Anzahl der Fälle eines Kunden, die erfolgreich abgeschlossen wurden
    const anzahl_faelle = knex('Fall').count('Fallstatus').where('Kunden_ID', kunden_id).where('Fallstatus', 'Betrugsversuch festgestellt');
    return anzahl_faelle;
}
function getAnzahlAbgelehnterFaelle(vertrags_id){
    const kunden_id = getKundenIdByVertragsId(vertrags_id);
    //gesamte Anzahl der Fälle eines Kunden, die erfolgreich abgeschlossen wurden
    const anzahl_faelle = knex('Fall').count('Fallstatus').where('Kunden_ID', kunden_id).where('Fallstatus', 'abgelehnt nach Gutachten');
    return anzahl_faelle;
}
function getAnzahlNichtAbgedeckterFaelle(vertrags_id){
    const kunden_id = getKundenIdByVertragsId(vertrags_id);
    //gesamte Anzahl der Fälle eines Kunden, die erfolgreich abgeschlossen wurden
    const anzahl_faelle = knex('Fall').count('Fallstatus').where('Kunden_ID', kunden_id).where('Fallstatus', 'nicht abgedeckt');
    return anzahl_faelle;
}














function getAllVertraege(){
    return knex("Vertrag").select("*");
}

function deleteVertrag(id){
    return knex("Vertrag").where("id", id).del();
}

function updateVertrag(id, vertrag){
    return knex("Vertrag").where("id", id).update(vertrag)
}





//Objekt mit Functions als Keys wird exportiert

module.exports = {
    getVertragsabschlussdatum,
    getAnzahlFaelle,
    getAnzahlAbgeschlosseneFaelle,
    getAnzahlBetrugFaelle,
    getAnzahlNichtAbgedeckterFaelle,
    getAnzahlAbgelehnterFaelle,

    getVertragById,
    getKundenIdByVertragsId,
    getBetrugsrelevanteDaten,
    updateFall,
    createFall,
    getAllVertraege,
    deleteVertrag,
    updateVertrag,
    getWerkstatt
}