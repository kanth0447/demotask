CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Running', 'Not Running', 'Completed'))
);

INSERT INTO jobs (name, status) VALUES ('port_scan', 'Running');
INSERT INTO jobs (name, status) VALUES ('content_discovery', 'Not Running');
INSERT INTO jobs (name, status) VALUES ('vulnerability_assessment', 'Completed');
