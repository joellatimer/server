const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./communities.db', (err) => {
    if (err) {
        console.error("Error opening database " + err.message);
    } else {
        console.log("Connected to database")
        db.run("PRAGMA foreign_keys = ON")
        db.run(`CREATE TABLE  IF NOT EXISTS groups( 
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            groupName NVARCHAR(20)  NOT NULL,
            password NVARCHAR(26) NOT NULL
         )`)
        db.run(`CREATE TABLE IF NOT EXISTS members( 
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            firstName NVARCHAR(50)  NOT NULL,
            lastName NVARCHAR(50)  NOT NULL,
            dateJoined NVARCHAR(10),
            groupId INTEGER NOT NULL,
            CONSTRAINT fk_groups
            FOREIGN KEY (groupId)
            REFERENCES groups(id)
        )`)
        db.run(`CREATE TABLE IF NOT EXISTS meetings ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            dateMeeting NVARCHAR(10)  NOT NULL,
            typeMeeting NVARCHAR(26),
            groupId INTEGER NOT NULL,
            CONSTRAINT fk_groups
            FOREIGN KEY (groupId)
            REFERENCES groups(id)
        )`) 
        db.run(`CREATE TABLE IF NOT EXISTS attends( 
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            firstName NVARCHAR(50)  NOT NULL,
            lastName NVARCHAR(50)  NOT NULL,
            present INTEGER DEFAULT FALSE,
            meetingId INTEGER NOT NULL,
            CONSTRAINT fk_meetings
            FOREIGN KEY (meetingId)
            REFERENCES meetings(id)
            ON DELETE CASCADE
        )`) 
    }       
    
    
});
module.exports = db