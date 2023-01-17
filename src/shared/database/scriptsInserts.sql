INSERT INTO organization (name, status) VALUES ('International', 604), ('Mexico', 605), ('Colombia', 606);



INSERT INTO tribe (id_organization, name, status) VALUES ( (SELECT id_organization FROM organization WHERE status=605),'Cognitive services',605),( (SELECT id_organization FROM organization WHERE status=605),'Data analytics', 605),((SELECT id_organization FROM organization WHERE status=606),'COE',606);



INSERT INTO repository (id_tribe, name, state, status) VALUES ( (SELECT id_tribe  FROM tribe WHERE status=606 LIMIT 1), 'chatbot_service_handler','E','A');
INSERT INTO repository (id_tribe, name, state, status) VALUES ( (SELECT id_tribe  FROM tribe WHERE status=606 LIMIT 1), 'chatbot_web-gui','E','A');
INSERT INTO repository (id_tribe, name, state, status) VALUES ( (SELECT id_tribe  FROM tribe WHERE status=606 LIMIT 1), 'npl_engine_service','D','I');
INSERT INTO repository (id_tribe, name, state, status) VALUES ( (SELECT id_tribe  FROM tribe WHERE status=606 LIMIT 1), 'npl_console','A','I');
INSERT INTO repository (id_tribe, name, state, status) VALUES ( (SELECT id_tribe  FROM tribe WHERE status=605 LIMIT 1), 'automaton_service','E','A');
INSERT INTO repository (id_tribe, name, state, status) VALUES ( (SELECT id_tribe  FROM tribe WHERE status=605 LIMIT 1), 'ocr_recognition','A','A');



INSERT INTO metrics (id_repository,coverage,bugs,vulnerabilities,hotspot, code_smells) VALUES ((SELECT id_repository  FROM repository WHERE name='chatbot_web-gui'),80.79,2,1,0,3);
INSERT INTO metrics (id_repository,coverage,bugs,vulnerabilities,hotspot, code_smells) VALUES ((SELECT id_repository  FROM repository WHERE name='automaton_service'),50.56,3,6,0,2);
INSERT INTO metrics (id_repository,coverage,bugs,vulnerabilities,hotspot, code_smells) VALUES ((SELECT id_repository  FROM repository WHERE name='ocr_recognition'),74.90,3,4,1,3);
INSERT INTO metrics (id_repository,coverage,bugs,vulnerabilities,hotspot, code_smells) VALUES ((SELECT id_repository  FROM repository WHERE name='npl_console'),90,1,0,1,3);
INSERT INTO metrics (id_repository,coverage,bugs,vulnerabilities,hotspot, code_smells) VALUES ((SELECT id_repository  FROM repository WHERE name='npl_engine_service'),76.43,2,2,1,3);
INSERT INTO metrics (id_repository,coverage,bugs,vulnerabilities,hotspot, code_smells) VALUES ((SELECT id_repository  FROM repository WHERE name='chatbot_service_handler'),55.59,3,7,3,5);
