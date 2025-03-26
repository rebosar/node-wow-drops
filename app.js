const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;

const db = new sqlite3.Database("./wow-drops.db");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.get('/item', (req, res) => {
    const {armor_type_id, strength, stamina, intellect, agility, critical_strike, haste, mastery, versatility, slot_id, season, isMythic0} = req.query;

    let query = `
    SELECT
        i.id AS "ItemID",
        i.item_name AS "Item", 
        d.dungeon_name AS "Dungeon",
        s.slot_name AS "Slot",
        w.type AS "Weapon Type",
        d.season AS "Season"
    FROM item i 
    LEFT JOIN dungeon d ON d.id = i.dungeon_id 
    LEFT JOIN slot s ON s.id = i.slot_id
    LEFT JOIN weapon_type w ON w.id = i.weapon_type_id
    WHERE 1=1
    `;
    let params = [];

    if (armor_type_id) {
        query += ' AND armor_type_id = ?';
        params.push(armor_type_id);
    }
    if (slot_id) {
        query += ' AND slot_id = ?';
        params.push(slot_id);
    }
    if (stamina) {
        query += ' AND stamina = ?';
        params.push(stamina);
    }
    if (strength) {
        query += ' AND strength = ?';
        params.push(strength);
    }
    if (intellect) {
        query += ' AND intellect = ?';
        params.push(intellect);
    }
    if (agility) {
        query += ' AND agility = ?';
        params.push(agility);
    }
    if (critical_strike) {
        query += ' AND critical_strike = ?';
        params.push(critical_strike);
    }
    if (haste) {
        query += ' AND haste = ?';
        params.push(haste);
    }
    if (mastery) {
        query += ' AND mastery = ?';
        params.push(mastery);
    }
    if (versatility) {
        query += ' AND versatility = ?';
        params.push(versatility);
    }

    if (season) {
        query += ' AND d.season = ?';
        params.push(season)
    }

    if (isMythic0)
    {
        query += ' AND d.isMythic0 = ?'
        params.push(isMythic0)
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ results: rows });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
