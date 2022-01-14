# Versicherungsdatenbank
Dieses Repository enthält das Node.js Express Projekt für die Gruppenarbeit der Veranstaltung "Business Process Technology" des Wintersemesters 21/22.

## Links zu Dateien
Der folgende Abschnitt enthält Links zu den wichtigsten Dateien:

### [server.js](https://github.com/TimBeutelspacher/Versicherungsdatenbank/blob/main/server.js)
Enthält die Implementierung der Endpunkte der REST-API.

### [knex.js](https://github.com/TimBeutelspacher/Versicherungsdatenbank/blob/main/db/knex.js)
Enthält die Anbindung an die PostgreSQL Datenbank. Die Anmeldungsdaten sind aus Sicherheitsgründen nicht direkt im Git-Repository einlesbar.

### [kundendaten.js](https://github.com/TimBeutelspacher/Versicherungsdatenbank/blob/main/db/kundendaten.js)
Erstellt mithilfe von knex die SQL-Statements, um Datensätze aus der Datenbank zu lesen, zu updaten und um neue Datensätze einzufügen.

