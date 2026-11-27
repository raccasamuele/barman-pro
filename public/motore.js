/*
 * Barman PRO · motore di calcolo
 *
 * Qui vivono i dati (ricette, prezzi, indici dei paesi) e la funzione che
 * da' quantita' e costi. Niente DOM, niente lingua, niente localStorage:
 * stessi parametri, stesso risultato. L'app lo carica prima di app.js; un
 * test in Node (tests/motore.test.mjs) e un futuro server MCP lo usano
 * cosi' com'e', senza copie che possano divergere.
 *
 * I blocchi qui sotto sono stati spostati da app.js senza cambiarne una
 * riga: i golden devono restare identici.
 *
 * (c) 2026 Samuele Racca · MIT
 */
(function (root) {
    'use strict';
        const aliasIngredienti = {
            // Rum
            "white rum": "Rum Bianco",
            "rum bianco": "Rum Bianco",
            "dark rum": "Rum Scuro",
            "rum scuro": "Rum Scuro",
            "gold rum": "Rum Dorato",
            "rum dorato": "Rum Dorato",
            "demerara rum": "Rum Demerara",
            "rum demerara": "Rum Demerara",
            "jamaican rum": "Rum Giamaicano",
            "rum giamaicano": "Rum Giamaicano",
            "martinique rum": "Rum Martinicano",
            "rum martinicano": "Rum Martinicano",
            // Gin
            "gin": "Gin",
            "dry gin": "Gin",
            "london dry gin": "Gin",
            // Vodka
            "vodka": "Vodka Liscia",
            "vodka liscia": "Vodka Liscia",
            "vodka citron": "Vodka al Limone",
            "vodka al limone": "Vodka al Limone",
            "vanilla vodka": "Vodka alla Vaniglia",
            "vodka alla vaniglia": "Vodka alla Vaniglia",
            // Vermouth
            "sweet vermouth": "Vermouth Rosso",
            "vermouth rosso": "Vermouth Rosso",
            "vermouth dolce": "Vermouth Rosso",
            "dry vermouth": "Vermouth Secco",
            "vermouth secco": "Vermouth Secco",
            "vermouth dry": "Vermouth Secco",
            // Whiskey
            "rye whiskey": "Whiskey Rye",
            "whiskey rye": "Whiskey Rye",
            "irish whiskey": "Whiskey Irlandese",
            "whiskey irlandese": "Whiskey Irlandese",
            "scotch whisky": "Whisky Scozzese",
            "whisky scozzese": "Whisky Scozzese",
            // Liquori
            "creme de cacao scura": "Crema di Cacao Scura",
            "crema di cacao scura": "Crema di Cacao Scura",
            "creme de violette": "Crema di Violetta",
            "crema di violetta": "Crema di Violetta",
            "orange curacao": "Curaçao all'Arancia",
            "curacao all'arancia": "Curaçao all'Arancia",
            "curaçao all'arancia": "Curaçao all'Arancia",
            "liquore al caffe": "Liquore al Caffè",
            "liquore al caffè": "Liquore al Caffè",
            "liqueur passion fruit": "Liquore Passion Fruit",
            "liquore passion fruit": "Liquore Passion Fruit",
            "peach schnapps": "Schnapps alla Pesca",
            "schnapps alla pesca": "Schnapps alla Pesca",
            "jagermeister": "Jägermeister",
            "jägermeister": "Jägermeister",
            "cachaca": "Cachaça",
            "cachaça": "Cachaça",
            // Succhi
            "succo ananas": "Succo di Ananas",
            "succo di ananas": "Succo di Ananas",
            "succo arancia": "Succo di Arancia",
            "succo di arancia": "Succo di Arancia",
            "succo limone": "Succo di Limone",
            "succo di limone": "Succo di Limone",
            "succo lime": "Succo di Lime",
            "succo di lime": "Succo di Lime",
            "succo canna zucchero": "Succo di Canna da Zucchero",
            "succo di canna da zucchero": "Succo di Canna da Zucchero",
            "cranberry": "Succo di Cranberry",
            "succo di cranberry": "Succo di Cranberry",
            "succo cranberry": "Succo di Cranberry",
            // Sciroppi
            "sciroppo": "Sciroppo di Zucchero",
            "sciroppo zucchero": "Sciroppo di Zucchero",
            "sciroppo di zucchero": "Sciroppo di Zucchero",
            "simple syrup": "Sciroppo di Zucchero",
            "sciroppo lamponi": "Sciroppo di Lamponi",
            "sciroppo di lamponi": "Sciroppo di Lamponi",
            // Altri analcolici
            "panna fresca": "Panna Fresca",
            "purea di pesca": "Purea di Pesca",
            "purea passion fruit": "Purea di Passion Fruit",
            "purea di passion fruit": "Purea di Passion Fruit",
            "caffe": "Caffè",
            "caffè": "Caffè"
        };

        const prezziBase = {
            // ─── Ingredienti aggiunti con i 70 nuovi drink (v1.3) ───
            "Amaretto": { bassa: 9.0, media: 15.0, alta: 24.0 },
            "Amaro Nonino": { bassa: 18.0, media: 28.0, alta: 45.0 },
            "Baileys": { bassa: 10.0, media: 14.0, alta: 22.0 },
            "Bénédictine": { bassa: 18.0, media: 26.0, alta: 40.0 },
            "Birra Chiara": { bassa: 2.0, media: 3.5, alta: 7.0 },
            "Blue Curaçao": { bassa: 8.0, media: 13.0, alta: 22.0 },
            "Cherry Brandy": { bassa: 10.0, media: 16.0, alta: 28.0 },
            "Crema di Cacao Bianca": { bassa: 8.0, media: 14.0, alta: 26.0 },
            "Crème de Cassis": { bassa: 9.0, media: 15.0, alta: 26.0 },
            "Crème de Menthe Bianca": { bassa: 8.0, media: 13.0, alta: 22.0 },
            "Crème de Menthe Verde": { bassa: 8.0, media: 13.0, alta: 22.0 },
            "Grand Marnier": { bassa: 18.0, media: 26.0, alta: 42.0 },
            "Green Chartreuse": { bassa: 22.0, media: 38.0, alta: 60.0 },
            "Islay Single Malt": { bassa: 22.0, media: 40.0, alta: 90.0 },
            "Kirsch": { bassa: 14.0, media: 22.0, alta: 38.0 },
            "Lillet Blanc": { bassa: 9.0, media: 14.0, alta: 22.0 },
            "Liquore ai Lamponi": { bassa: 14.0, media: 22.0, alta: 38.0 },
            "Liquore alla Mela": { bassa: 8.0, media: 13.0, alta: 22.0 },
            "Liquore alle More": { bassa: 9.0, media: 15.0, alta: 26.0 },
            "Liquore Galliano": { bassa: 14.0, media: 22.0, alta: 36.0 },
            "Porto Rosso": { bassa: 8.0, media: 14.0, alta: 28.0 },
            "Tennessee Whiskey": { bassa: 12.0, media: 20.0, alta: 38.0 },
            "Vino Bianco": { bassa: 3.0, media: 6.0, alta: 18.0 },
            "Acqua": { bassa: 0.5, media: 0.5, alta: 1.0 },
            "Brodo di manzo": { bassa: 2.0, media: 3.5, alta: 6.0 },
            "Salamoia d'oliva": { bassa: 3.0, media: 5.0, alta: 9.0 },
            "Sangrita": { bassa: 3.0, media: 5.0, alta: 9.0 },
            "Sciroppo di Miele e Zenzero": { bassa: 4.0, media: 8.0, alta: 16.0 },
            "Sciroppo di Sambuco": { bassa: 4.0, media: 8.0, alta: 16.0 },
            "Succo di Passion Fruit": { bassa: 2.5, media: 5.0, alta: 10.0 },
            "Succo di Pomodoro": { bassa: 1.5, media: 2.5, alta: 5.0 },
            "Succo di Pompelmo": { bassa: 1.5, media: 3.0, alta: 6.0 },
            "Tuorlo d'uovo": { bassa: 5.0, media: 8.0, alta: 14.0 },
            "Vodka Liscia":               { bassa: 6.5,  media: 11.5, alta: 38.0  },
            "Vodka Menta":                { bassa: 7.5,  media: 13.0, alta: 42.0  },
            "Vodka Pesca":                { bassa: 7.5,  media: 13.0, alta: 42.0  },
            "Vodka Fragola":              { bassa: 7.5,  media: 13.0, alta: 42.0  },
            "Vodka Melone":               { bassa: 7.5,  media: 13.0, alta: 42.0  },
            "Vodka al Limone":            { bassa: 7.5,  media: 13.0, alta: 42.0  },
            "Vodka alla Vaniglia":        { bassa: 7.5,  media: 13.0, alta: 42.0  },
            "Gin":                        { bassa: 7.0,  media: 14.5, alta: 45.0  },
            "Rum Bianco":                 { bassa: 7.5,  media: 13.0, alta: 35.0  },
            "Rum Scuro":                  { bassa: 9.0,  media: 18.0, alta: 65.0  },
            "Rum Dorato":                 { bassa: 9.0,  media: 18.0, alta: 65.0  },
            "Rum Demerara":               { bassa: 9.0,  media: 18.0, alta: 65.0  },
            "Rum Giamaicano":             { bassa: 9.0,  media: 18.0, alta: 65.0  },
            "Rum Martinicano":            { bassa: 9.0,  media: 18.0, alta: 65.0  },
            "Tequila":                    { bassa: 10.0, media: 18.5, alta: 55.0  },
            "Bourbon":                    { bassa: 11.0, media: 19.5, alta: 60.0  },
            "Whiskey Rye":                { bassa: 14.0, media: 28.0, alta: 75.0  },
            "Whisky Scozzese":            { bassa: 10.0, media: 16.0, alta: 45.0  },
            "Whiskey Irlandese":          { bassa: 11.0, media: 17.5, alta: 50.0  },
            "Cognac":                     { bassa: 18.0, media: 35.0, alta: 150.0 },
            "Brandy":                     { bassa: 8.0,  media: 14.0, alta: 40.0  },
            "Cachaça":                    { bassa: 9.0,  media: 15.0, alta: 35.0  },
            "Pisco":                      { bassa: 14.0, media: 22.0, alta: 48.0  },
            "Calvados":                   { bassa: 15.0, media: 26.0, alta: 65.0  },
            "Assenzio":                   { bassa: 18.0, media: 32.0, alta: 70.0  },
            "Bitter Campari":             { bassa: 15.5, media: 17.0, alta: 19.5  },
            "Aperol":                     { bassa: 11.0, media: 13.5, alta: 16.0  },
            "Vermouth Rosso":             { bassa: 5.5,  media: 9.5,  alta: 28.0  },
            "Vermouth Secco":             { bassa: 5.5,  media: 9.5,  alta: 25.0  },
            "Triple Sec":                 { bassa: 6.0,  media: 11.0, alta: 24.0  },
            "Cointreau":                  { bassa: 18.0, media: 21.0, alta: 24.0  },
            "Curaçao all'Arancia":        { bassa: 12.0, media: 24.0, alta: 38.0  },
            "Maraschino":                 { bassa: 11.0, media: 18.0, alta: 32.0  },
            "Crema di Cacao Scura":       { bassa: 8.0,  media: 14.0, alta: 26.0  },
            "Crema di Violetta":          { bassa: 14.0, media: 22.0, alta: 35.0  },
            "Schnapps alla Pesca":        { bassa: 8.0,  media: 14.5, alta: 26.0  },
            "Liquore al Caffè":           { bassa: 9.0,  media: 16.5, alta: 28.0  },
            "Liquore Passion Fruit":      { bassa: 8.0,  media: 14.5, alta: 26.0  },
            "Jägermeister":               { bassa: 12.0, media: 16.0, alta: 24.0  },
            "Amaro Montenegro":           { bassa: 12.0, media: 16.0, alta: 24.0  },
            "Fernet Branca":              { bassa: 12.0, media: 16.0, alta: 24.0  },
            "Mirto":                      { bassa: 10.0, media: 15.0, alta: 22.0  },
            "Limoncello":                 { bassa: 9.0,  media: 14.0, alta: 22.0  },
            "Sambuca":                    { bassa: 9.0,  media: 13.0, alta: 20.0  },
            "Grappa":                     { bassa: 10.0, media: 18.0, alta: 35.0  },
            "Amaro del Capo":             { bassa: 12.0, media: 16.0, alta: 24.0  },
            "Midori":                     { bassa: 12.0, media: 18.0, alta: 25.0  },
            "Malibu":                     { bassa: 8.0,  media: 14.5, alta: 26.0  },
            "Drambuie":                   { bassa: 18.0, media: 26.0, alta: 42.0  },
            "Apricot Brandy":             { bassa: 8.0,  media: 14.5, alta: 26.0  },
            "Champagne":                  { bassa: 25.0, media: 45.0, alta: 180.0 },
            "Prosecco":                   { bassa: 4.5,  media: 8.0,  alta: 22.0  },
            "Energy Drink":               { bassa: 2.0,  media: 3.5,  alta: 6.0   },
            "Lemon Soda":                 { bassa: 1.0,  media: 1.5,  alta: 4.0   },
            "Acqua Tonica":               { bassa: 1.0,  media: 2.5,  alta: 5.5   },
            "Cola":                       { bassa: 1.0,  media: 2.0,  alta: 3.5   },
            "Ginger Beer":                { bassa: 1.5,  media: 3.0,  alta: 6.5   },
            "Ginger Ale":                 { bassa: 1.0,  media: 2.5,  alta: 5.0   },
            "Soda":                       { bassa: 1.0,  media: 1.5,  alta: 4.0   },
            "Succo di Ananas":            { bassa: 1.5,  media: 3.0,  alta: 5.5   },
            "Succo di Arancia":           { bassa: 1.5,  media: 2.5,  alta: 6.0   },
            "Succo di Limone":            { bassa: 1.5,  media: 3.5,  alta: 8.0   },
            "Succo di Lime":              { bassa: 2.0,  media: 4.5,  alta: 12.0  },
            "Succo di Cranberry":         { bassa: 2.0,  media: 3.5,  alta: 7.0   },
            "Succo di Canna da Zucchero": { bassa: 1.5,  media: 3.5,  alta: 8.0   },
            "Sciroppo di Zucchero":       { bassa: 1.5,  media: 3.5,  alta: 8.0   },
            "Sciroppo di Lamponi":        { bassa: 3.0,  media: 6.5,  alta: 14.0  },
            "Granatina":                  { bassa: 2.5,  media: 5.5,  alta: 12.0  },
            "Orgeat":                     { bassa: 3.5,  media: 7.0,  alta: 16.0  },
            "Panna Fresca":               { bassa: 3.0,  media: 5.5,  alta: 10.0  },
            "Purea di Pesca":             { bassa: 2.5,  media: 6.0,  alta: 14.0  },
            "Purea di Passion Fruit":     { bassa: 2.5,  media: 6.0,  alta: 14.0  },
            "Crema di Cocco":             { bassa: 2.0,  media: 4.0,  alta: 9.0   },
            "Soda Pompelmo Rosa":         { bassa: 1.5,  media: 3.0,  alta: 6.5   },
            "Espresso":                   { bassa: 1.0,  media: 2.0,  alta: 5.0   },
            "Caffè":                      { bassa: 1.0,  media: 2.0,  alta: 5.0   },
            "Albume":                     { bassa: 5.0,  media: 10.0, alta: 20.0  },
            "_ghiaccio_kg":               { bassa: 1.5,  media: 1.5,  alta: 1.5   },
            "_bicchiere_pz":              { bassa: 0.10, media: 0.10, alta: 0.10  },
            "_bicchierino_shot_pz":       { bassa: 0.08, media: 0.08, alta: 0.08  },
            "_cannuccia_pz":              { bassa: 0.04, media: 0.04, alta: 0.04  },
            // ─── Fermentati (prezzo a bottiglia, Italia base; geoMult applicato in calcolaSpesa) ───
            "_vino_rosso_bt_75cl":        { bassa: 4.0,  media: 10.0, alta: 30.0  },
            "_vino_bianco_bt_75cl":       { bassa: 4.0,  media: 9.0,  alta: 25.0  },
            "_bollicine_bt_75cl":         { bassa: 6.0,  media: 14.0, alta: 50.0  },
            "_birra_bt_33cl":             { bassa: 1.2,  media: 2.0,  alta: 4.5   },
        };

        const indiciGeo = {
            "Albania": 0.83, "Andorra": 1.05, "Argentina": 0.50, "Australia": 2.50,
            "Austria": 1.00, "Belgio": 1.15, "Bielorussia": 0.85, "Bosnia ed Erzegovina": 0.85,
            "Brasile": 0.65, "Bulgaria": 0.76, "Canada": 1.45, "Cina": 1.25,
            "Cipro": 1.37, "Corea del Nord": 0.90, "Corea del Sud": 1.25, "Croazia": 1.05,
            "Danimarca": 1.72, "Estonia": 1.10, "Figi": 1.40, "Finlandia": 2.50,
            "Francia": 1.19, "Germania": 1.03, "Giappone": 1.15, "Grecia": 1.82,
            "Hong Kong": 1.50, "Irlanda": 2.35, "Islanda": 3.39, "Italia": 1.00,
            "Lettonia": 1.10, "Liechtenstein": 1.50, "Lituania": 1.05, "Lussemburgo": 1.15,
            "Macao": 1.30, "Macedonia del Nord": 0.65, "Malta": 1.20, "Messico": 0.60,
            "Micronesia": 1.40, "Moldavia": 0.70, "Monaco": 1.60, "Mongolia": 0.85,
            "Montenegro": 0.83, "Norvegia": 2.45, "Nuova Zelanda": 2.20, "Paesi Bassi": 1.10,
            "Papua Nuova Guinea": 1.60, "Polonia": 0.90, "Portogallo": 1.05, "Regno Unito": 1.95,
            "Repubblica Ceca": 0.94, "Romania": 0.86, "Russia": 0.80, "Samoa": 1.35,
            "San Marino": 1.00, "Serbia": 0.80, "Singapore": 2.15, "Slovacchia": 0.95,
            "Slovenia": 1.00, "Spagna": 1.16, "Stati Uniti": 1.25, "Svezia": 1.80,
            "Svizzera": 1.50, "Taiwan": 1.15, "Tonga": 1.40, "Ucraina": 0.75,
            "Ungheria": 0.97, "Vanuatu": 1.45
        };

        function normalizzaIngrediente(nome) {
            if(!nome) return nome;
            const chiave = nome.trim().toLowerCase();
            if(aliasIngredienti[chiave]) return aliasIngredienti[chiave];
            return nome.trim();
        }

        let databaseDrink = {
            "Amaretto Sour": [{nome: "Amaretto", tipo: "alcolico", ml: 45}, {nome: "Succo di Limone", tipo: "analcolico", ml: 30}, {nome: "Albume", tipo: "analcolico", ml: 15}],
            "Appletini (Apple Martini)": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 40}, {nome: "Liquore alla Mela", tipo: "alcolico", ml: 15}, {nome: "Cointreau", tipo: "alcolico", ml: 15}, {nome: "Succo di Limone", tipo: "analcolico", ml: 15}],
            "Barracuda": [{nome: "Rum Dorato", tipo: "alcolico", ml: 45}, {nome: "Liquore Galliano", tipo: "alcolico", ml: 15}, {nome: "Prosecco", tipo: "alcolico", ml: 60}, {nome: "Succo di Ananas", tipo: "analcolico", ml: 60}, {nome: "Succo di Lime", tipo: "analcolico", ml: 5}],
            "Bloody Mary": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 45}, {nome: "Succo di Pomodoro", tipo: "analcolico", ml: 90}, {nome: "Succo di Limone", tipo: "analcolico", ml: 15}],
            "Blue Lagoon": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 50}, {nome: "Blue Curaçao", tipo: "alcolico", ml: 20}, {nome: "Lemon Soda", tipo: "analcolico", ml: 100}],
            "Bramble": [{nome: "Gin", tipo: "alcolico", ml: 40}, {nome: "Liquore alle More", tipo: "alcolico", ml: 15}, {nome: "Succo di Limone", tipo: "analcolico", ml: 15}, {nome: "Sciroppo di Zucchero", tipo: "analcolico", ml: 10}],
            "Caipiroska": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 50}, {nome: "Succo di Lime", tipo: "analcolico", ml: 20}, {nome: "Sciroppo di Zucchero", tipo: "analcolico", ml: 10}],
            "French 75": [{nome: "Gin", tipo: "alcolico", ml: 30}, {nome: "Champagne", tipo: "alcolico", ml: 60}, {nome: "Succo di Limone", tipo: "analcolico", ml: 15}, {nome: "Sciroppo di Zucchero", tipo: "analcolico", ml: 15}],
            "French Martini": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 45}, {nome: "Liquore ai Lamponi", tipo: "alcolico", ml: 15}, {nome: "Succo di Ananas", tipo: "analcolico", ml: 15}],
            "Gimlet": [{nome: "Gin", tipo: "alcolico", ml: 60}, {nome: "Succo di Lime", tipo: "analcolico", ml: 15}, {nome: "Sciroppo di Zucchero", tipo: "analcolico", ml: 15}],
            "Hugo": [{nome: "Prosecco", tipo: "alcolico", ml: 120}, {nome: "Sciroppo di Sambuco", tipo: "analcolico", ml: 20}, {nome: "Soda", tipo: "analcolico", ml: 30}],
            "Last Word": [{nome: "Gin", tipo: "alcolico", ml: 22.5}, {nome: "Green Chartreuse", tipo: "alcolico", ml: 22.5}, {nome: "Maraschino", tipo: "alcolico", ml: 22.5}, {nome: "Succo di Lime", tipo: "analcolico", ml: 22.5}],
            "Martinez": [{nome: "Gin", tipo: "alcolico", ml: 45}, {nome: "Vermouth Rosso", tipo: "alcolico", ml: 45}, {nome: "Maraschino", tipo: "alcolico", ml: 5}],
            "Mint Julep": [{nome: "Bourbon", tipo: "alcolico", ml: 60}, {nome: "Acqua", tipo: "analcolico", ml: 10}, {nome: "Sciroppo di Zucchero", tipo: "analcolico", ml: 10}],
            "Paper Plane": [{nome: "Bourbon", tipo: "alcolico", ml: 22.5}, {nome: "Aperol", tipo: "alcolico", ml: 22.5}, {nome: "Amaro Nonino", tipo: "alcolico", ml: 22.5}, {nome: "Succo di Limone", tipo: "analcolico", ml: 22.5}],
            "Singapore Sling": [{nome: "Gin", tipo: "alcolico", ml: 30}, {nome: "Cherry Brandy", tipo: "alcolico", ml: 15}, {nome: "Cointreau", tipo: "alcolico", ml: 7.5}, {nome: "Bénédictine", tipo: "alcolico", ml: 7.5}, {nome: "Succo di Ananas", tipo: "analcolico", ml: 120}, {nome: "Succo di Lime", tipo: "analcolico", ml: 15}, {nome: "Granatina", tipo: "analcolico", ml: 10}],
            "Tom Collins": [{nome: "Gin", tipo: "alcolico", ml: 45}, {nome: "Succo di Limone", tipo: "analcolico", ml: 30}, {nome: "Sciroppo di Zucchero", tipo: "analcolico", ml: 15}, {nome: "Soda", tipo: "analcolico", ml: 60}],
            "Vesper Martini": [{nome: "Gin", tipo: "alcolico", ml: 45}, {nome: "Vodka Liscia", tipo: "alcolico", ml: 15}, {nome: "Lillet Blanc", tipo: "alcolico", ml: 15}],
            "White Russian": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 50}, {nome: "Liquore al Caffè", tipo: "alcolico", ml: 20}, {nome: "Panna Fresca", tipo: "analcolico", ml: 30}],
            "B52": [{nome: "Liquore al Caffè", tipo: "alcolico", ml: 20}, {nome: "Baileys", tipo: "alcolico", ml: 20}, {nome: "Grand Marnier", tipo: "alcolico", ml: 20}],
            "Blood and Sand": [{nome: "Whisky Scozzese", tipo: "alcolico", ml: 22.5}, {nome: "Vermouth Rosso", tipo: "alcolico", ml: 22.5}, {nome: "Cherry Brandy", tipo: "alcolico", ml: 22.5}, {nome: "Succo di Arancia", tipo: "analcolico", ml: 22.5}],
            "Blue Hawaiian": [{nome: "Rum Bianco", tipo: "alcolico", ml: 30}, {nome: "Blue Curaçao", tipo: "alcolico", ml: 15}, {nome: "Crema di Cocco", tipo: "analcolico", ml: 15}, {nome: "Succo di Ananas", tipo: "analcolico", ml: 60}],
            "Bronx": [{nome: "Gin", tipo: "alcolico", ml: 30}, {nome: "Vermouth Rosso", tipo: "alcolico", ml: 10}, {nome: "Vermouth Secco", tipo: "alcolico", ml: 10}, {nome: "Succo di Arancia", tipo: "analcolico", ml: 15}],
            "Bull Shot": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 30}, {nome: "Brodo di manzo", tipo: "analcolico", ml: 60}, {nome: "Succo di Limone", tipo: "analcolico", ml: 10}],
            "Cape Codder": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 40}, {nome: "Succo di Cranberry", tipo: "analcolico", ml: 120}],
            "Casino": [{nome: "Gin", tipo: "alcolico", ml: 40}, {nome: "Maraschino", tipo: "alcolico", ml: 10}, {nome: "Succo di Limone", tipo: "analcolico", ml: 10}],
            "Champagne Cocktail": [{nome: "Champagne", tipo: "alcolico", ml: 90}, {nome: "Cognac", tipo: "alcolico", ml: 10}],
            "Corpse Reviver #2": [{nome: "Gin", tipo: "alcolico", ml: 22.5}, {nome: "Lillet Blanc", tipo: "alcolico", ml: 22.5}, {nome: "Cointreau", tipo: "alcolico", ml: 22.5}, {nome: "Succo di Limone", tipo: "analcolico", ml: 22.5}],
            "Dirty Martini": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 60}, {nome: "Vermouth Secco", tipo: "alcolico", ml: 10}, {nome: "Salamoia d'oliva", tipo: "analcolico", ml: 10}],
            "El Diablo": [{nome: "Tequila", tipo: "alcolico", ml: 45}, {nome: "Crème de Cassis", tipo: "alcolico", ml: 15}, {nome: "Succo di Lime", tipo: "analcolico", ml: 15}, {nome: "Ginger Ale", tipo: "analcolico", ml: 60}],
            "French Connection": [{nome: "Cognac", tipo: "alcolico", ml: 35}, {nome: "Amaretto", tipo: "alcolico", ml: 35}],
            "Gibson": [{nome: "Gin", tipo: "alcolico", ml: 60}, {nome: "Vermouth Secco", tipo: "alcolico", ml: 10}],
            "Gin Basil Smash": [{nome: "Gin", tipo: "alcolico", ml: 60}, {nome: "Succo di Limone", tipo: "analcolico", ml: 22.5}, {nome: "Sciroppo di Zucchero", tipo: "analcolico", ml: 10}],
            "Godfather": [{nome: "Whisky Scozzese", tipo: "alcolico", ml: 35}, {nome: "Amaretto", tipo: "alcolico", ml: 35}],
            "Godmother": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 35}, {nome: "Amaretto", tipo: "alcolico", ml: 35}],
            "Golden Dream": [{nome: "Liquore Galliano", tipo: "alcolico", ml: 20}, {nome: "Triple Sec", tipo: "alcolico", ml: 20}, {nome: "Succo di Arancia", tipo: "analcolico", ml: 20}, {nome: "Panna Fresca", tipo: "analcolico", ml: 10}],
            "Grasshopper": [{nome: "Crème de Menthe Verde", tipo: "alcolico", ml: 20}, {nome: "Crema di Cacao Bianca", tipo: "alcolico", ml: 20}, {nome: "Panna Fresca", tipo: "analcolico", ml: 20}],
            "Greyhound": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 45}, {nome: "Succo di Pompelmo", tipo: "analcolico", ml: 90}],
            "Harvey Wallbanger": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 45}, {nome: "Liquore Galliano", tipo: "alcolico", ml: 15}, {nome: "Succo di Arancia", tipo: "analcolico", ml: 90}],
            "Hemingway Special": [{nome: "Rum Bianco", tipo: "alcolico", ml: 60}, {nome: "Maraschino", tipo: "alcolico", ml: 15}, {nome: "Succo di Pompelmo", tipo: "analcolico", ml: 40}, {nome: "Succo di Lime", tipo: "analcolico", ml: 15}],
            "Hurricane": [{nome: "Rum Bianco", tipo: "alcolico", ml: 60}, {nome: "Rum Scuro", tipo: "alcolico", ml: 60}, {nome: "Succo di Passion Fruit", tipo: "analcolico", ml: 60}, {nome: "Succo di Arancia", tipo: "analcolico", ml: 30}, {nome: "Succo di Lime", tipo: "analcolico", ml: 15}, {nome: "Granatina", tipo: "analcolico", ml: 15}],
            "Illusion": [{nome: "Midori", tipo: "alcolico", ml: 60}, {nome: "Cointreau", tipo: "alcolico", ml: 15}, {nome: "Vodka Liscia", tipo: "alcolico", ml: 15}, {nome: "Succo di Ananas", tipo: "analcolico", ml: 45}, {nome: "Succo di Limone", tipo: "analcolico", ml: 15}],
            "Jack Rose": [{nome: "Calvados", tipo: "alcolico", ml: 45}, {nome: "Succo di Limone", tipo: "analcolico", ml: 15}, {nome: "Granatina", tipo: "analcolico", ml: 10}],
            "Japanese Slipper": [{nome: "Midori", tipo: "alcolico", ml: 30}, {nome: "Cointreau", tipo: "alcolico", ml: 30}, {nome: "Succo di Limone", tipo: "analcolico", ml: 30}],
            "Jungle Bird": [{nome: "Rum Scuro", tipo: "alcolico", ml: 45}, {nome: "Bitter Campari", tipo: "alcolico", ml: 22.5}, {nome: "Succo di Ananas", tipo: "analcolico", ml: 45}, {nome: "Succo di Lime", tipo: "analcolico", ml: 15}, {nome: "Sciroppo di Zucchero", tipo: "analcolico", ml: 15}],
            "Kamikaze": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 30}, {nome: "Triple Sec", tipo: "alcolico", ml: 30}, {nome: "Succo di Lime", tipo: "analcolico", ml: 30}],
            "Kir": [{nome: "Vino Bianco", tipo: "alcolico", ml: 90}, {nome: "Crème de Cassis", tipo: "alcolico", ml: 10}],
            "Kir Royale": [{nome: "Champagne", tipo: "alcolico", ml: 90}, {nome: "Crème de Cassis", tipo: "alcolico", ml: 10}],
            "Lemon Drop Martini": [{nome: "Vodka al Limone", tipo: "alcolico", ml: 45}, {nome: "Triple Sec", tipo: "alcolico", ml: 15}, {nome: "Succo di Limone", tipo: "analcolico", ml: 20}, {nome: "Sciroppo di Zucchero", tipo: "analcolico", ml: 10}],
            "Lynchburg Lemonade": [{nome: "Tennessee Whiskey", tipo: "alcolico", ml: 45}, {nome: "Triple Sec", tipo: "alcolico", ml: 15}, {nome: "Succo di Limone", tipo: "analcolico", ml: 15}, {nome: "Lemon Soda", tipo: "analcolico", ml: 60}],
            "Mary Pickford": [{nome: "Rum Bianco", tipo: "alcolico", ml: 45}, {nome: "Maraschino", tipo: "alcolico", ml: 5}, {nome: "Succo di Ananas", tipo: "analcolico", ml: 45}, {nome: "Granatina", tipo: "analcolico", ml: 5}],
            "Michelada": [{nome: "Birra Chiara", tipo: "alcolico", ml: 330}, {nome: "Succo di Lime", tipo: "analcolico", ml: 15}],
            "Mimosa": [{nome: "Prosecco", tipo: "alcolico", ml: 75}, {nome: "Succo di Arancia", tipo: "analcolico", ml: 75}],
            "Monkey Gland": [{nome: "Gin", tipo: "alcolico", ml: 45}, {nome: "Succo di Arancia", tipo: "analcolico", ml: 45}, {nome: "Granatina", tipo: "analcolico", ml: 10}],
            "Mudslide": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 30}, {nome: "Liquore al Caffè", tipo: "alcolico", ml: 30}, {nome: "Baileys", tipo: "alcolico", ml: 30}, {nome: "Panna Fresca", tipo: "analcolico", ml: 30}],
            "Orgasm": [{nome: "Amaretto", tipo: "alcolico", ml: 30}, {nome: "Liquore al Caffè", tipo: "alcolico", ml: 30}, {nome: "Baileys", tipo: "alcolico", ml: 30}],
            "Paradise": [{nome: "Gin", tipo: "alcolico", ml: 35}, {nome: "Apricot Brandy", tipo: "alcolico", ml: 20}, {nome: "Succo di Arancia", tipo: "analcolico", ml: 15}],
            "Pegu Club": [{nome: "Gin", tipo: "alcolico", ml: 45}, {nome: "Curaçao all'Arancia", tipo: "alcolico", ml: 15}, {nome: "Succo di Lime", tipo: "analcolico", ml: 15}],
            "Penicillin": [{nome: "Whisky Scozzese", tipo: "alcolico", ml: 60}, {nome: "Islay Single Malt", tipo: "alcolico", ml: 7.5}, {nome: "Succo di Limone", tipo: "analcolico", ml: 22.5}, {nome: "Sciroppo di Miele e Zenzero", tipo: "analcolico", ml: 22.5}],
            "Porto Flip": [{nome: "Porto Rosso", tipo: "alcolico", ml: 45}, {nome: "Brandy", tipo: "alcolico", ml: 15}, {nome: "Tuorlo d'uovo", tipo: "analcolico", ml: 10}],
            "Ramos Gin Fizz": [{nome: "Gin", tipo: "alcolico", ml: 45}, {nome: "Succo di Limone", tipo: "analcolico", ml: 15}, {nome: "Succo di Lime", tipo: "analcolico", ml: 15}, {nome: "Sciroppo di Zucchero", tipo: "analcolico", ml: 30}, {nome: "Panna Fresca", tipo: "analcolico", ml: 60}, {nome: "Albume", tipo: "analcolico", ml: 30}, {nome: "Soda", tipo: "analcolico", ml: 30}],
            "Rose": [{nome: "Vermouth Secco", tipo: "alcolico", ml: 45}, {nome: "Kirsch", tipo: "alcolico", ml: 15}, {nome: "Sciroppo di Lamponi", tipo: "analcolico", ml: 10}],
            "Salty Dog": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 45}, {nome: "Succo di Pompelmo", tipo: "analcolico", ml: 90}],
            "Sea Breeze": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 40}, {nome: "Succo di Cranberry", tipo: "analcolico", ml: 120}, {nome: "Succo di Pompelmo", tipo: "analcolico", ml: 30}],
            "Stinger": [{nome: "Cognac", tipo: "alcolico", ml: 50}, {nome: "Crème de Menthe Bianca", tipo: "alcolico", ml: 20}],
            "Tuxedo": [{nome: "Gin", tipo: "alcolico", ml: 30}, {nome: "Vermouth Secco", tipo: "alcolico", ml: 30}, {nome: "Maraschino", tipo: "alcolico", ml: 2.5}, {nome: "Assenzio", tipo: "alcolico", ml: 2.5}],
            "Vampiro": [{nome: "Tequila", tipo: "alcolico", ml: 50}, {nome: "Sangrita", tipo: "analcolico", ml: 70}, {nome: "Succo di Lime", tipo: "analcolico", ml: 10}],
            "Vieux Carré": [{nome: "Whiskey Rye", tipo: "alcolico", ml: 22.5}, {nome: "Cognac", tipo: "alcolico", ml: 22.5}, {nome: "Vermouth Rosso", tipo: "alcolico", ml: 22.5}, {nome: "Bénédictine", tipo: "alcolico", ml: 5}],
            "Ward 8": [{nome: "Whiskey Rye", tipo: "alcolico", ml: 60}, {nome: "Succo di Limone", tipo: "analcolico", ml: 15}, {nome: "Succo di Arancia", tipo: "analcolico", ml: 15}, {nome: "Granatina", tipo: "analcolico", ml: 5}],
            "Yellow Bird": [{nome: "Rum Bianco", tipo: "alcolico", ml: 30}, {nome: "Liquore Galliano", tipo: "alcolico", ml: 15}, {nome: "Triple Sec", tipo: "alcolico", ml: 15}, {nome: "Succo di Lime", tipo: "analcolico", ml: 15}],
            "Vodka Redbull": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 45}, {nome: "Energy Drink", tipo: "analcolico", ml: 120}],
            "Vodka Lemon": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 45}, {nome: "Lemon Soda", tipo: "analcolico", ml: 120}],
            "Vodka Menta Redbull": [{nome: "Vodka Menta", tipo: "alcolico", ml: 45}, {nome: "Energy Drink", tipo: "analcolico", ml: 120}],
            "Vodka Pesca Redbull": [{nome: "Vodka Pesca", tipo: "alcolico", ml: 45}, {nome: "Energy Drink", tipo: "analcolico", ml: 120}],
            "Vodka Fragola Redbull": [{nome: "Vodka Fragola", tipo: "alcolico", ml: 45}, {nome: "Energy Drink", tipo: "analcolico", ml: 120}],
            "Vodka Melone Redbull": [{nome: "Vodka Melone", tipo: "alcolico", ml: 45}, {nome: "Energy Drink", tipo: "analcolico", ml: 120}],
            "Vodka Menta Lemon": [{nome: "Vodka Menta", tipo: "alcolico", ml: 45}, {nome: "Lemon Soda", tipo: "analcolico", ml: 120}],
            "Vodka Pesca Lemon": [{nome: "Vodka Pesca", tipo: "alcolico", ml: 45}, {nome: "Lemon Soda", tipo: "analcolico", ml: 120}],
            "Vodka Fragola Lemon": [{nome: "Vodka Fragola", tipo: "alcolico", ml: 45}, {nome: "Lemon Soda", tipo: "analcolico", ml: 120}],
            "Vodka Melone Lemon": [{nome: "Vodka Melone", tipo: "alcolico", ml: 45}, {nome: "Lemon Soda", tipo: "analcolico", ml: 120}],
            "Gin Tonic": [{nome: "Gin", tipo: "alcolico", ml: 45}, {nome: "Acqua Tonica", tipo: "analcolico", ml: 120}],
            "Gin Lemon": [{nome: "Gin", tipo: "alcolico", ml: 45}, {nome: "Lemon Soda", tipo: "analcolico", ml: 120}],
            "Rum & Coca": [{nome: "Rum Bianco", tipo: "alcolico", ml: 45}, {nome: "Cola", tipo: "analcolico", ml: 120}],
            "Monte & Coca": [{nome: "Amaro Montenegro", tipo: "alcolico", ml: 45}, {nome: "Cola", tipo: "analcolico", ml: 120}],
            "Jager & Redbull": [{nome: "Jägermeister", tipo: "alcolico", ml: 45}, {nome: "Energy Drink", tipo: "analcolico", ml: 120}],
            "Malibu & Ananas": [{nome: "Malibu", tipo: "alcolico", ml: 45}, {nome: "Succo di Ananas", tipo: "analcolico", ml: 120}],
            "Midori Lemon": [{nome: "Midori", tipo: "alcolico", ml: 45}, {nome: "Lemon Soda", tipo: "analcolico", ml: 120}],
            "Fernandito": [{nome: "Fernet Branca", tipo: "alcolico", ml: 45}, {nome: "Cola", tipo: "analcolico", ml: 120}],
            "Dark N Stormy": [{nome: "Rum Scuro", tipo: "alcolico", ml: 60}, {nome: "Ginger Beer", tipo: "analcolico", ml: 100}],
            "Horses Neck": [{nome: "Cognac", tipo: "alcolico", ml: 40}, {nome: "Ginger Ale", tipo: "analcolico", ml: 120}],
            "Alexander": [{nome: "Cognac", tipo: "alcolico", ml: 30}, {nome: "Crema di Cacao Scura", tipo: "alcolico", ml: 30}, {nome: "Panna Fresca", tipo: "analcolico", ml: 30}],
            "Americano": [{nome: "Bitter Campari", tipo: "alcolico", ml: 30}, {nome: "Vermouth Rosso", tipo: "alcolico", ml: 30}, {nome: "Soda", tipo: "analcolico", ml: 30}],
            "Angel Face": [{nome: "Gin", tipo: "alcolico", ml: 30}, {nome: "Apricot Brandy", tipo: "alcolico", ml: 30}, {nome: "Calvados", tipo: "alcolico", ml: 30}],
            "Aviation": [{nome: "Gin", tipo: "alcolico", ml: 45}, {nome: "Maraschino", tipo: "alcolico", ml: 15}, {nome: "Succo di Limone", tipo: "analcolico", ml: 15}, {nome: "Crema di Violetta", tipo: "alcolico", ml: 5}],
            "Between the Sheets": [{nome: "Rum Bianco", tipo: "alcolico", ml: 30}, {nome: "Cognac", tipo: "alcolico", ml: 30}, {nome: "Triple Sec", tipo: "alcolico", ml: 30}, {nome: "Succo di Limone", tipo: "analcolico", ml: 20}],
            "Boulevardier": [{nome: "Bourbon", tipo: "alcolico", ml: 45}, {nome: "Vermouth Rosso", tipo: "alcolico", ml: 30}, {nome: "Bitter Campari", tipo: "alcolico", ml: 30}],
            "Clover Club": [{nome: "Gin", tipo: "alcolico", ml: 45}, {nome: "Sciroppo di Lamponi", tipo: "analcolico", ml: 15}, {nome: "Succo di Limone", tipo: "analcolico", ml: 15}, {nome: "Albume", tipo: "analcolico", ml: 30}],
            "Daiquiri": [{nome: "Rum Bianco", tipo: "alcolico", ml: 60}, {nome: "Succo di Lime", tipo: "analcolico", ml: 20}, {nome: "Sciroppo di Zucchero", tipo: "analcolico", ml: 10}],
            "Dry Martini": [{nome: "Gin", tipo: "alcolico", ml: 60}, {nome: "Vermouth Secco", tipo: "alcolico", ml: 10}],
            "Gin Fizz": [{nome: "Gin", tipo: "alcolico", ml: 45}, {nome: "Succo di Limone", tipo: "analcolico", ml: 30}, {nome: "Sciroppo di Zucchero", tipo: "analcolico", ml: 10}, {nome: "Soda", tipo: "analcolico", ml: 60}],
            "Hanky Panky": [{nome: "Gin", tipo: "alcolico", ml: 45}, {nome: "Vermouth Rosso", tipo: "alcolico", ml: 45}, {nome: "Fernet Branca", tipo: "alcolico", ml: 7.5}],
            "Manhattan": [{nome: "Whiskey Rye", tipo: "alcolico", ml: 50}, {nome: "Vermouth Rosso", tipo: "alcolico", ml: 20}],
            "Negroni": [{nome: "Gin", tipo: "alcolico", ml: 30}, {nome: "Bitter Campari", tipo: "alcolico", ml: 30}, {nome: "Vermouth Rosso", tipo: "alcolico", ml: 30}],
            "Old Fashioned": [{nome: "Bourbon", tipo: "alcolico", ml: 45}, {nome: "Sciroppo di Zucchero", tipo: "analcolico", ml: 10}],
            "Planters Punch": [{nome: "Rum Giamaicano", tipo: "alcolico", ml: 45}, {nome: "Succo di Lime", tipo: "analcolico", ml: 15}, {nome: "Succo di Canna da Zucchero", tipo: "analcolico", ml: 30}],
            "Rusty Nail": [{nome: "Whisky Scozzese", tipo: "alcolico", ml: 45}, {nome: "Drambuie", tipo: "alcolico", ml: 25}],
            "Sazerac": [{nome: "Cognac", tipo: "alcolico", ml: 50}, {nome: "Assenzio", tipo: "alcolico", ml: 10}],
            "Sidecar": [{nome: "Cognac", tipo: "alcolico", ml: 50}, {nome: "Triple Sec", tipo: "alcolico", ml: 20}, {nome: "Succo di Limone", tipo: "analcolico", ml: 20}],
            "Whiskey Sour": [{nome: "Bourbon", tipo: "alcolico", ml: 45}, {nome: "Succo di Limone", tipo: "analcolico", ml: 25}, {nome: "Sciroppo di Zucchero", tipo: "analcolico", ml: 20}, {nome: "Albume", tipo: "analcolico", ml: 20}],
            "White Lady": [{nome: "Gin", tipo: "alcolico", ml: 40}, {nome: "Triple Sec", tipo: "alcolico", ml: 30}, {nome: "Succo di Limone", tipo: "analcolico", ml: 20}],
            "Bellini": [{nome: "Prosecco", tipo: "alcolico", ml: 100}, {nome: "Purea di Pesca", tipo: "analcolico", ml: 50}],
            "Black Russian": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 50}, {nome: "Liquore al Caffè", tipo: "alcolico", ml: 20}],
            "Caipirinha": [{nome: "Cachaça", tipo: "alcolico", ml: 60}, {nome: "Succo di Lime", tipo: "analcolico", ml: 30}],
            "Cosmopolitan": [{nome: "Vodka al Limone", tipo: "alcolico", ml: 40}, {nome: "Cointreau", tipo: "alcolico", ml: 15}, {nome: "Succo di Lime", tipo: "analcolico", ml: 15}, {nome: "Succo di Cranberry", tipo: "analcolico", ml: 30}],
            "Cuba Libre": [{nome: "Rum Bianco", tipo: "alcolico", ml: 50}, {nome: "Cola", tipo: "analcolico", ml: 120}, {nome: "Succo di Lime", tipo: "analcolico", ml: 10}],
            "Garibaldi": [{nome: "Bitter Campari", tipo: "alcolico", ml: 45}, {nome: "Succo di Arancia", tipo: "analcolico", ml: 120}],
            "Irish Coffee": [{nome: "Whiskey Irlandese", tipo: "alcolico", ml: 50}, {nome: "Caffè", tipo: "analcolico", ml: 120}, {nome: "Panna Fresca", tipo: "analcolico", ml: 50}],
            "Long Island": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 15}, {nome: "Tequila", tipo: "alcolico", ml: 15}, {nome: "Rum Bianco", tipo: "alcolico", ml: 15}, {nome: "Gin", tipo: "alcolico", ml: 15}, {nome: "Cointreau", tipo: "alcolico", ml: 15}, {nome: "Succo di Limone", tipo: "analcolico", ml: 25}, {nome: "Cola", tipo: "analcolico", ml: 60}],
            "Mai-Tai": [{nome: "Rum Giamaicano", tipo: "alcolico", ml: 30}, {nome: "Rum Martinicano", tipo: "alcolico", ml: 30}, {nome: "Curaçao all'Arancia", tipo: "alcolico", ml: 15}, {nome: "Orgeat", tipo: "analcolico", ml: 15}, {nome: "Succo di Lime", tipo: "analcolico", ml: 30}],
            "Margarita": [{nome: "Tequila", tipo: "alcolico", ml: 50}, {nome: "Triple Sec", tipo: "alcolico", ml: 20}, {nome: "Succo di Lime", tipo: "analcolico", ml: 15}],
            "Mojito": [{nome: "Rum Bianco", tipo: "alcolico", ml: 45}, {nome: "Succo di Lime", tipo: "analcolico", ml: 20}, {nome: "Soda", tipo: "analcolico", ml: 40}],
            "Moscow Mule": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 45}, {nome: "Ginger Beer", tipo: "analcolico", ml: 120}, {nome: "Succo di Lime", tipo: "analcolico", ml: 10}],
            "Pina Colada": [{nome: "Rum Bianco", tipo: "alcolico", ml: 50}, {nome: "Crema di Cocco", tipo: "analcolico", ml: 30}, {nome: "Succo di Ananas", tipo: "analcolico", ml: 50}],
            "Pisco Sour": [{nome: "Pisco", tipo: "alcolico", ml: 60}, {nome: "Succo di Limone", tipo: "analcolico", ml: 30}, {nome: "Albume", tipo: "analcolico", ml: 20}],
            "Sex on the Beach": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 40}, {nome: "Schnapps alla Pesca", tipo: "alcolico", ml: 20}, {nome: "Succo di Arancia", tipo: "analcolico", ml: 40}, {nome: "Succo di Cranberry", tipo: "analcolico", ml: 40}],
            "Tequila Sunrise": [{nome: "Tequila", tipo: "alcolico", ml: 45}, {nome: "Succo di Arancia", tipo: "analcolico", ml: 90}, {nome: "Granatina", tipo: "analcolico", ml: 15}],
            "Zombie": [{nome: "Rum Scuro", tipo: "alcolico", ml: 45}, {nome: "Rum Dorato", tipo: "alcolico", ml: 45}, {nome: "Rum Demerara", tipo: "alcolico", ml: 30}, {nome: "Succo di Lime", tipo: "analcolico", ml: 20}],
            "Bees Knees": [{nome: "Gin", tipo: "alcolico", ml: 52.5}, {nome: "Succo di Limone", tipo: "analcolico", ml: 22.5}, {nome: "Succo di Arancia", tipo: "analcolico", ml: 22.5}],
            "Espresso Martini": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 50}, {nome: "Liquore al Caffè", tipo: "alcolico", ml: 30}, {nome: "Espresso", tipo: "analcolico", ml: 30}],
            "Paloma": [{nome: "Tequila", tipo: "alcolico", ml: 50}, {nome: "Soda Pompelmo Rosa", tipo: "analcolico", ml: 100}],
            "Porn Star Martini": [{nome: "Vodka alla Vaniglia", tipo: "alcolico", ml: 50}, {nome: "Liquore Passion Fruit", tipo: "alcolico", ml: 20}, {nome: "Purea di Passion Fruit", tipo: "analcolico", ml: 50}, {nome: "Champagne", tipo: "alcolico", ml: 50}],
            "Spritz": [{nome: "Prosecco", tipo: "alcolico", ml: 90}, {nome: "Aperol", tipo: "alcolico", ml: 60}, {nome: "Soda", tipo: "analcolico", ml: 30}],
            "Tommys Margarita": [{nome: "Tequila", tipo: "alcolico", ml: 45}, {nome: "Succo di Lime", tipo: "analcolico", ml: 15}],
            // ─── MOCKTAIL / COCKTAIL ANALCOLICI ────────────────────────────
            // Tutti gli ingredienti tipo: "analcolico" — auto-detect li classifica come tali.
            "Virgin Mojito": [
                {nome: "Succo di Lime", tipo: "analcolico", ml: 30},
                {nome: "Sciroppo di Zucchero", tipo: "analcolico", ml: 20},
                {nome: "Soda", tipo: "analcolico", ml: 150}
            ],
            "Shirley Temple": [
                {nome: "Ginger Ale", tipo: "analcolico", ml: 180},
                {nome: "Granatina", tipo: "analcolico", ml: 20}
            ],
            "Florida": [
                {nome: "Succo di Arancia", tipo: "analcolico", ml: 120},
                {nome: "Succo di Limone", tipo: "analcolico", ml: 20},
                {nome: "Sciroppo di Zucchero", tipo: "analcolico", ml: 10}
            ]
        };

        const BP_DOSI_FESTA = {
            "Vodka Redbull": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 60}, {nome: "Energy Drink", tipo: "analcolico", ml: 140}],
            "Vodka Lemon": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 60}, {nome: "Lemon Soda", tipo: "analcolico", ml: 140}],
            "Vodka Menta Redbull": [{nome: "Vodka Menta", tipo: "alcolico", ml: 60}, {nome: "Energy Drink", tipo: "analcolico", ml: 140}],
            "Vodka Pesca Redbull": [{nome: "Vodka Pesca", tipo: "alcolico", ml: 60}, {nome: "Energy Drink", tipo: "analcolico", ml: 140}],
            "Vodka Fragola Redbull": [{nome: "Vodka Fragola", tipo: "alcolico", ml: 60}, {nome: "Energy Drink", tipo: "analcolico", ml: 140}],
            "Vodka Melone Redbull": [{nome: "Vodka Melone", tipo: "alcolico", ml: 60}, {nome: "Energy Drink", tipo: "analcolico", ml: 140}],
            "Vodka Menta Lemon": [{nome: "Vodka Menta", tipo: "alcolico", ml: 60}, {nome: "Lemon Soda", tipo: "analcolico", ml: 140}],
            "Vodka Pesca Lemon": [{nome: "Vodka Pesca", tipo: "alcolico", ml: 60}, {nome: "Lemon Soda", tipo: "analcolico", ml: 140}],
            "Vodka Fragola Lemon": [{nome: "Vodka Fragola", tipo: "alcolico", ml: 60}, {nome: "Lemon Soda", tipo: "analcolico", ml: 140}],
            "Vodka Melone Lemon": [{nome: "Vodka Melone", tipo: "alcolico", ml: 60}, {nome: "Lemon Soda", tipo: "analcolico", ml: 140}],
            "Gin Tonic": [{nome: "Gin", tipo: "alcolico", ml: 60}, {nome: "Acqua Tonica", tipo: "analcolico", ml: 140}],
            "Gin Lemon": [{nome: "Gin", tipo: "alcolico", ml: 60}, {nome: "Lemon Soda", tipo: "analcolico", ml: 140}],
            "Rum & Coca": [{nome: "Rum Bianco", tipo: "alcolico", ml: 60}, {nome: "Cola", tipo: "analcolico", ml: 140}],
            "Monte & Coca": [{nome: "Amaro Montenegro", tipo: "alcolico", ml: 60}, {nome: "Cola", tipo: "analcolico", ml: 140}],
            "Jager & Redbull": [{nome: "Jägermeister", tipo: "alcolico", ml: 60}, {nome: "Energy Drink", tipo: "analcolico", ml: 140}],
            "Malibu & Ananas": [{nome: "Malibu", tipo: "alcolico", ml: 60}, {nome: "Succo di Ananas", tipo: "analcolico", ml: 140}],
            "Midori Lemon": [{nome: "Midori", tipo: "alcolico", ml: 60}, {nome: "Lemon Soda", tipo: "analcolico", ml: 140}],
            "Garibaldi": [{nome: "Bitter Campari", tipo: "alcolico", ml: 60}, {nome: "Succo di Arancia", tipo: "analcolico", ml: 140}],
            "Fernandito": [{nome: "Fernet Branca", tipo: "alcolico", ml: 60}, {nome: "Cola", tipo: "analcolico", ml: 140}],
            "Dark N Stormy": [{nome: "Rum Scuro", tipo: "alcolico", ml: 60}, {nome: "Ginger Beer", tipo: "analcolico", ml: 140}],
            "Horses Neck": [{nome: "Cognac", tipo: "alcolico", ml: 60}, {nome: "Ginger Ale", tipo: "analcolico", ml: 140}],
            "Moscow Mule": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 60}, {nome: "Ginger Beer", tipo: "analcolico", ml: 140}, {nome: "Succo di Lime", tipo: "analcolico", ml: 10}],
        };

        const BP_AMARI_DEFAULT = ['Amaro Montenegro','Amaro Nonino','Amaro del Capo','Fernet Branca','Jägermeister','Mirto','Amaretto','Baileys','Liquore al Caffè','Limoncello','Sambuca','Grappa'];

        const garnishMap = {"Negroni":["Fetta d'arancia"],"Americano":["Fetta d'arancia"],"Boulevardier":["Scorza d'arancia"],"Old Fashioned":["Angostura","Scorza d'arancia"],"Manhattan":["Ciliegia al maraschino","Angostura"],"Sazerac":["Assenzio (per risciacquo)","Scorza di limone"],"Mojito":["Menta fresca","Lime fresco"],"Caipirinha":["Lime fresco","Zucchero di canna"],"Mai-Tai":["Menta fresca","Lime fresco"],"Margarita":["Sale","Lime fresco"],"Tommys Margarita":["Lime fresco"],"Daiquiri":["Lime fresco"],"Cuba Libre":["Lime fresco"],"Moscow Mule":["Lime fresco","Menta fresca"],"Espresso Martini":["Chicchi di caffè"],"Cosmopolitan":["Scorza d'arancia"],"Gin Fizz":["Scorza di limone"],"Whiskey Sour":["Ciliegia al maraschino","Angostura"],"Pisco Sour":["Angostura"],"Aviation":["Ciliegia al maraschino"],"Hanky Panky":["Scorza d'arancia"],"Dry Martini":["Oliva","Scorza di limone"],"Sidecar":["Zucchero (bordo)","Scorza di limone"],"Tequila Sunrise":["Fetta d'arancia","Ciliegia al maraschino"],"Sex on the Beach":["Fetta d'arancia"],"Pina Colada":["Ananas (fetta)","Ciliegia al maraschino"],"Paloma":["Sale","Lime fresco"],"Spritz":["Fetta d'arancia","Oliva"],"Garibaldi":["Fetta d'arancia"],"Zombie":["Menta fresca"],"Bees Knees":["Scorza di limone"],"Long Island":["Lime fresco"],"Alexander":["Noce moscata"],"Bull Shot":["Tabasco","Salsa Worcestershire"],"Casino":["Orange Bitters"],"Champagne Cocktail":["Angostura","Zollette di zucchero"],"Corpse Reviver #2":["Assenzio (per risciacquo)"],"Gibson":["Cipolline cocktail"],"Gin Basil Smash":["Basilico fresco"],"Michelada":["Tabasco","Salsa Worcestershire","Sale"],"Monkey Gland":["Assenzio (per risciacquo)"],"Pegu Club":["Angostura"],"Ramos Gin Fizz":["Acqua ai fiori d'arancio"],"Salty Dog":["Sale"],"Tuxedo":["Orange Bitters"],"Vieux Carré":["Angostura"]};

        /* Le ricette del file, mai toccate: l'app ne riceve una copia. */
        const RICETTE_IBA = databaseDrink;
        const DB_ORIGINAL = RICETTE_IBA;
        const _bpHa = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

        let _bpTipiNoti = null;
        function bpTipoNoto(nome) {
            if (!_bpTipiNoti) {
                _bpTipiNoti = Object.create(null);
                Object.keys(DB_ORIGINAL).forEach(d => DB_ORIGINAL[d].forEach(i => {
                    const k = normalizzaIngrediente(i.nome).toLowerCase();
                    if (!_bpTipiNoti[k]) _bpTipiNoti[k] = i.tipo === 'alcolico' ? 'alcolico' : 'analcolico';
                }));
                // Gli amari degli shot non stanno in nessuna ricetta, ma sono bottiglie alcoliche.
                BP_AMARI_DEFAULT.forEach(n => { const k = n.toLowerCase(); if (!_bpTipiNoti[k]) _bpTipiNoti[k] = 'alcolico'; });
            }
            const k = normalizzaIngrediente(String(nome == null ? '' : nome)).toLowerCase();
            return k && _bpTipiNoti[k] ? _bpTipiNoti[k] : null;
        }
        function bpIngAlcolico(ing) { return (bpTipoNoto(ing && ing.nome) || (ing && ing.tipo)) === 'alcolico'; }

        const BP_ARR_COSTO = c => Math.ceil(c * 2) / 2;

        function bpLitriArrotondati(ml) { return (Math.ceil((ml / 1000) * 2) / 2) * 1000; }

        const BP_INTERO = n => Math.ceil(n);

        function bpQuantitaRiga(requiredBaseQty, stockBaseQty, arrotonda, overrideBaseQty) {
            const req = Math.max(0, requiredBaseQty || 0);
            const stock = Math.max(0, stockBaseQty || 0);
            const remainingBaseQty = Math.max(0, req - stock);   // prima si sottrae
            const q = {
                requiredBaseQty: req,
                stockBaseQty: stock,
                remainingBaseQty,
                roundedPurchaseQty: arrotonda ? arrotonda(remainingBaseQty) : remainingBaseQty,  // poi si arrotonda
                pricingQty: remainingBaseQty,
                quantitaTua: false
            };

            const ov = parseFloat(overrideBaseQty);
            if (isFinite(ov) && ov >= 0) {
                q.roundedPurchaseQty = ov;
                q.pricingQty = ov;
                q.quantitaTua = true;
            }
            return q;
        }

        function calcolaModello(p, ctx) {
            /* Le ricette vive dell'app (con quelle aggiunte o modificate
               dall'utente) arrivano da chi chiama; senza, valgono le IBA del file. */
            const databaseDrink = (ctx && ctx.ricette) || RICETTE_IBA;
            const bpRecipes = { mods: (ctx && ctx.ricetteModificate) || {} };
            const ospiti     = parseFloat(p.ospiti) || 0;
            const drinkTesta = parseFloat(p.drinkTesta) || 0;
            const shotTesta  = parseFloat(p.shotTesta) || 0;
            const scarto     = parseFloat(p.scarto) || 0;
            const pct        = (p.pct == null) ? 80 : (parseInt(p.pct) || 0);
            const fascia     = p.fascia || 'media';
            const fasciaFerm = p.fasciaFerm || fascia;
            const nazione    = p.nazione || '';
            const geoMult    = indiciGeo[nazione] || 1;

            const ospitiAlcolici   = Math.round(ospiti * (pct / 100));
            const ospitiAnalcolici = Math.max(0, ospiti - ospitiAlcolici);
            const mult = 1 + (scarto / 100);
            const drinkTotali    = Math.ceil((ospitiAlcolici   * drinkTesta) * mult);
            const shotTotali     = Math.ceil((ospitiAlcolici   * shotTesta)  * mult);
            const mocktailTotali = Math.ceil((ospitiAnalcolici * drinkTesta) * mult);

            const drink = p.drink || {}, mocktail = p.mocktail || {}, shot = p.shot || {};
            /* Le ricette che arrivano con un evento (link condiviso, import)
               NON entrano in databaseDrink: la libreria "I miei cocktail"
               enumera proprio le sue chiavi, e installarle li' vorrebbe dire
               che un link ricevuto per messaggio riscrive la libreria di chi lo
               apre. Vivono accanto all'evento.

               PRECEDENZA: dentro QUESTO evento vince la ricetta dell'evento.
               Prima vinceva quella locale, e sembrava la scelta gentile ("e'
               la tua"), ma faceva una cosa che nessuno aveva chiesto: chi
               riceveva un evento con un Negroni diverso dal proprio vedeva
               ingredienti e costo del PROPRIO Negroni, sotto il nome di un
               evento che qualcun altro aveva preparato. Numeri diversi da
               quelli mandati, senza un avviso. La ricetta incorporata fa parte
               della definizione dell'evento; la libreria resta comunque
               intatta, che e' la garanzia separata. */
            const ricetteEvento = (p.ricetteEvento && typeof p.ricetteEvento === 'object') ? p.ricetteEvento : {};
            /* Servizio assente = bar: e' la modalita' che i golden storici
               misurano, e nessuno dei loro menu ha una dose da festa. */
            const festa = p.servizio === 'festa';
            const _ricetta = nome => {
                const ospite = ricetteEvento[nome];
                if (Array.isArray(ospite)) return ospite;
                /* La dose da festa solo se l'utente non ha riscritto la
                   ricetta: quella sua vale uguale nei due servizi. */
                if (festa && _bpHa(BP_DOSI_FESTA, nome) && !(bpRecipes.mods && bpRecipes.mods[nome])) return BP_DOSI_FESTA[nome];
                const locale = databaseDrink[nome];
                return Array.isArray(locale) ? locale : [];
            };
            let pesoTotDrink = 0; Object.keys(drink).forEach(k => pesoTotDrink += drink[k]);
            let pesoTotMock  = 0; Object.keys(mocktail).forEach(k => pesoTotMock += mocktail[k]);
            let pesoTotShot  = 0; Object.keys(shot).forEach(k => pesoTotShot += shot[k]);

            const ferm = p.ferm || {};
            const calVR = parseFloat(ferm.rosso) || 0;
            const calVB = parseFloat(ferm.bianco) || 0;
            const calBoll = parseFloat(ferm.bollicine) || 0;
            const consBirra = parseFloat(ferm.birra) || 0;
            const hasFerm = (calVR + calVB + calBoll + consBirra) > 0;

            /* Le due condizioni di rifiuto sono quelle di prima, parola per
               parola: cambia solo che qui si ritorna il motivo, e chi chiama
               decide se e come mostrarlo. */
            const drinkRichiesti = drinkTotali > 0 && pesoTotDrink === 0;
            const shotRichiesti  = shotTotali  > 0 && pesoTotShot  === 0;
            const niente = (drinkTotali === 0 || pesoTotDrink === 0)
                        && (shotTotali  === 0 || pesoTotShot  === 0)
                        && (mocktailTotali === 0 || pesoTotMock === 0)
                        && !hasFerm;
            if (niente && drinkTesta === 0 && shotTesta === 0 && !hasFerm) {
                return { ok:false, motivo:'alertNessunDrinkImpostato' };
            }
            if (drinkRichiesti && shotRichiesti && pesoTotMock === 0 && !hasFerm) {
                return { ok:false, motivo:'alertNienteMenu' };
            }

            const spesaAlcolici = {}, spesaAnalcolici = {};
            if (pesoTotDrink > 0 && drinkTotali > 0) Object.keys(drink).forEach(nome => {
                const qty = Math.ceil(drinkTotali * (drink[nome] / pesoTotDrink));
                _ricetta(nome).forEach(ing => {
                    const k = normalizzaIngrediente(ing.nome);
                    if (bpIngAlcolico(ing)) spesaAlcolici[k] = (spesaAlcolici[k] || 0) + (ing.ml * qty);
                    else spesaAnalcolici[k] = (spesaAnalcolici[k] || 0) + (ing.ml * qty);
                });
            });
            if (pesoTotMock > 0 && mocktailTotali > 0) Object.keys(mocktail).forEach(nome => {
                const qty = Math.ceil(mocktailTotali * (mocktail[nome] / pesoTotMock));
                _ricetta(nome).forEach(ing => {
                    // Anche un ingrediente classificato alcolico, dentro un
                    // mocktail resta analcolico: coerenza con quello che si legge.
                    const k = normalizzaIngrediente(ing.nome);
                    spesaAnalcolici[k] = (spesaAnalcolici[k] || 0) + (ing.ml * qty);
                });
            });
            if (pesoTotShot > 0 && shotTotali > 0) Object.keys(shot).forEach(nome => {
                const qty = Math.ceil(shotTotali * (shot[nome] / pesoTotShot));
                const k = normalizzaIngrediente(nome);
                spesaAlcolici[k] = (spesaAlcolici[k] || 0) + (40 * qty);
            });

            const righe = [];
            let totale = 0;

            /* I modificatori dell'utente: quanto ha gia' in casa, e i prezzi
               che ha corretto a mano. Arrivano da fuori e per default NON ci
               sono — ed e' quella modalita' senza modificatori che i 42 golden
               misurano, e che deve restare identica per sempre. */
            const scorte = (p.scorte && typeof p.scorte === 'object') ? p.scorte : {};
            const prezziUtente = (p.prezzi && typeof p.prezzi === 'object') ? p.prezzi : {};
            const quantitaUtente = (p.quantita && typeof p.quantita === 'object') ? p.quantita : {};
            const _scorta = id => Math.max(0, parseFloat(scorte[id]) || 0);
            /* undefined, non 0: "zero" e' una correzione legittima ("non
               comprarne", perche' ne ho gia' abbastanza), e va distinta da
               "nessuna correzione". */
            const _qta = id => {
                const v = parseFloat(quantitaUtente[id]);
                return (isFinite(v) && v >= 0) ? v : undefined;
            };
            const _prezzo = (id, predefinito) => {
                const v = parseFloat(prezziUtente[id]);
                // Un prezzo tuo e' il prezzo unitario FINALE locale: sostituisce
                // fascia e moltiplicatore geografico, non ci si somma.
                return (isFinite(v) && v >= 0) ? { valore: v, tuo: true } : { valore: predefinito, tuo: false };
            };

            /* Una riga liquida: quantita' in ml, prezzo al litro. */
            const aggiungiLiquido = (gruppo, ingrediente, ml, prezzoDefault) => {
                const id = 'ing:' + ingrediente;
                const pr = prezziBase[ingrediente];
                const prezzoLitro = pr ? pr[fascia] : prezzoDefault;
                const q = bpQuantitaRiga(ml, _scorta(id), bpLitriArrotondati, _qta(id));
                const pz = _prezzo(id, prezzoLitro * geoMult);
                /* Senza prezzo tuo l'associazione resta quella di sempre —
                   ((ml/1000) * prezzo) * geo — perche' in virgola mobile
                   cambiare l'ordine puo' spostare un totale al limite
                   dell'arrotondamento, cioe' rompere i golden. Con un prezzo
                   tuo quel valore e' gia' finale e non va moltiplicato per geo. */
                const costo = pz.tuo
                    ? BP_ARR_COSTO((q.pricingQty / 1000) * pz.valore)
                    : BP_ARR_COSTO((q.pricingQty / 1000) * prezzoLitro * geoMult);
                totale += costo;
                righe.push(Object.assign({
                    id, gruppo, ingrediente,
                    baseUnit: 'ml', displayUnit: 'L', packSize: null,
                    unitPrice: pz.valore, prezzoTuo: pz.tuo, costo
                }, q));
            };
            Object.keys(spesaAlcolici).sort().forEach(i => aggiungiLiquido('alcolici', i, spesaAlcolici[i], 15));
            Object.keys(spesaAnalcolici).sort().forEach(i => aggiungiLiquido('analcolici', i, spesaAnalcolici[i], 2));

            /* Fermentati: l'unita' base e' la bottiglia. */
            const fermDefs = [
                { v:calVR,     k:'_vino_rosso_bt_75cl',  labelKey:'lblVinoRosso',  taglia:0.75, div:5, unitKey:'lblCalici' },
                { v:calVB,     k:'_vino_bianco_bt_75cl', labelKey:'lblVinoBianco', taglia:0.75, div:5, unitKey:'lblCalici' },
                { v:calBoll,   k:'_bollicine_bt_75cl',   labelKey:'lblBollicine',  taglia:0.75, div:5, unitKey:'lblCalici' },
                { v:consBirra, k:'_birra_bt_33cl',       labelKey:'lblBirra',      taglia:0.33, div:1, unitKey:'lblConsumazioni' }
            ];
            fermDefs.forEach(d => {
                if (d.v <= 0) return;
                const bt = (d.div === 1) ? Math.ceil(ospitiAlcolici * d.v)
                                         : Math.ceil((ospitiAlcolici * d.v) / d.div);
                const id = 'ferm:' + d.k;
                const pr = prezziBase[d.k];
                const prezzoBt = pr ? pr[fasciaFerm] : 8;
                const q = bpQuantitaRiga(bt, _scorta(id), BP_INTERO, _qta(id));   // bottiglie: si contano
                const pz = _prezzo(id, prezzoBt * geoMult);
                const costo = pz.tuo
                    ? BP_ARR_COSTO(q.pricingQty * pz.valore)
                    : BP_ARR_COSTO(q.pricingQty * prezzoBt * geoMult);
                totale += costo;
                righe.push(Object.assign({
                    id, gruppo:'fermentati', ingrediente: d.k,
                    labelKey: d.labelKey, unitKey: d.unitKey,
                    baseUnit: 'bottiglie', displayUnit: 'bottiglie', packSize: d.taglia,
                    porzioni: Math.round(ospitiAlcolici * d.v),
                    unitPrice: pz.valore, prezzoTuo: pz.tuo, costo
                }, q));
            });

            const drinkMostrati    = pesoTotDrink > 0 ? drinkTotali    : 0;
            const mocktailMostrati = pesoTotMock  > 0 ? mocktailTotali : 0;
            const shotMostrati     = pesoTotShot  > 0 ? shotTotali     : 0;
            const bicchieriDrinkTot = drinkMostrati + mocktailMostrati;
            const kgGhiaccio = Math.ceil((bicchieriDrinkTot * 100) / 1000);

            const aggiungiExtra = (id, labelKey, qta, baseUnit, chiavePrezzo, prezzoDefault) => {
                const pr = prezziBase[chiavePrezzo];
                const prezzo = pr ? pr[fascia] : prezzoDefault;
                const q = bpQuantitaRiga(qta, _scorta(id), baseUnit === 'pz' ? BP_INTERO : null, _qta(id));
                const pz = _prezzo(id, prezzo * geoMult);
                const costo = pz.tuo
                    ? BP_ARR_COSTO(q.pricingQty * pz.valore)
                    : BP_ARR_COSTO(q.pricingQty * prezzo * geoMult);
                totale += costo;
                righe.push(Object.assign({
                    id, gruppo:'extra', labelKey, ingrediente: chiavePrezzo,
                    baseUnit, displayUnit: baseUnit, packSize: null,
                    unitPrice: pz.valore, prezzoTuo: pz.tuo, costo
                }, q));
            };
            aggiungiExtra('extra:ghiaccio',    'ghiaccio',          kgGhiaccio,        'kg', '_ghiaccio_kg',         1.5);
            aggiungiExtra('extra:bicchieri',   'bicchieriCocktail', bicchieriDrinkTot, 'pz', '_bicchiere_pz',        0.5);
            aggiungiExtra('extra:bicchierini', 'bicchieriniShot',   shotMostrati,      'pz', '_bicchierino_shot_pz', 0.5);
            aggiungiExtra('extra:cannucce',    'cannucce',          bicchieriDrinkTot, 'pz', '_cannuccia_pz',        0.5);

            /* Guarnizioni: non hanno dose, quindi non hanno quantita' — e per
               questo non accetteranno scorte, come dice il piano. */
            const setG = new Set();
            [].concat(Object.keys(drink), Object.keys(mocktail), Object.keys(shot))
              .forEach(nome => { (garnishMap[nome] || []).forEach(g => setG.add(g)); });
            Array.from(setG).forEach(g => righe.push({
                id: 'garnish:' + g, gruppo:'garnish', garnish: g,
                baseUnit: null, requiredBaseQty: null, stockBaseQty: null,
                remainingBaseQty: null, roundedPurchaseQty: null,
                pricingQty: null, unitPrice: null, costo: 0
            }));

            return {
                ok: true, righe, totale,
                perPersona: ospiti > 0 ? totale / ospiti : null,
                contatori: { ospiti, drinkMostrati, mocktailMostrati, shotMostrati,
                             bicchieriDrinkTot, kgGhiaccio },
                meta: { nazione, fascia, fasciaFerm, geoMult }
            };
        }

        const BarmanMotore = {
            versione: 1,
            dati: { aliasIngredienti, prezziBase, indiciGeo, BP_DOSI_FESTA, BP_AMARI_DEFAULT, garnishMap },
            /* Una copia profonda: l'app la modifica (ricette dell'utente). */
            ricetteIniziali: () => JSON.parse(JSON.stringify(RICETTE_IBA)),
            normalizzaIngrediente,
            tipoNoto: bpTipoNoto,
            ingAlcolico: bpIngAlcolico,
            arrotondaCosto: BP_ARR_COSTO,
            litriArrotondati: bpLitriArrotondati,
            intero: BP_INTERO,
            quantitaRiga: bpQuantitaRiga,
            calcolaModello
        };

        if (typeof module !== 'undefined' && module.exports) module.exports = BarmanMotore;
        else root.BarmanMotore = BarmanMotore;
})(typeof globalThis !== 'undefined' ? globalThis : this);
