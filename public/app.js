/*
 * Barman PRO · logica dell'applicazione
 *
 * Estratto dai due blocchi <script> di index.html, nello stesso ordine.
 * Caricato con "defer": viene eseguito dopo il parsing del documento, quindi
 * gli elementi cercati con getElementById esistono gia'.
 */

/* ═══ blocco 1 di 2 (era riga 1809 di index.html) ═══ */
        /* L'animazione della polvere d'oro viveva qui: e' uscita di scena con il
   tema oro. Faceva girare un requestAnimationFrame a ogni frame sulla
   home, per una decorazione che non diceva niente. */


/* ═══ blocco 2 di 2 (era riga 2831 di index.html) ═══ */
        /* ════════════════════════════════════════════════════════════
           INTERNAZIONALIZZAZIONE (i18n)
           ════════════════════════════════════════════════════════════ */
        let linguaCorrente = 'en';

        const translations = {
            it: {
                // Meta
                storageStatus: 'Stato salvato automaticamente',
                btnInstalla: 'Installa app',
                btnReset: 'Azzera tutto',
                // Ricettario
                
                
                
                
                btnScarica: 'Scarica',
                btnChiudi: 'Chiudi',
                
                // Parametri
                h2Parametri: "Parametri dell'Evento",
                labelOspiti: 'Ospiti previsti',
                labelDrink: 'Cocktail a persona',
                labelShot: 'Shot a persona',
                labelScarto: 'Margine sicurezza (%)',
                // Stepper + builder
                stepSetup: 'Setup',
                stepMenu: 'Menu',
                stepLista: 'Lista',
                h2Menu: 'Costruisci il Menu',
                menuSub: "Passa da una scheda all'altra: ogni voce scelta confluisce nella lista finale",
                descFermentati: "Vino e birra: indica calici/consumazioni a persona, l'app calcola bottiglie e costi",
                // Cocktail serata
                h2Cocktail: 'Cocktail Alcolici',
                descCocktail: 'Cerca dal ricettario e regola la frequenza con il cursore da 1 a 5',
                phSearchDrink: 'Cerca dal ricettario (es. Negroni, Spritz, Margarita)...',
                btnAggiungi: 'Aggiungi',
                // Shot
                h2Shot: 'Shot & Amari',
                descShot: 'Dose standard 40 ml · cerca tra gli alcolici disponibili',
                phSearchShot: 'Cerca shot, amaro o liquore...',
                // Creator
                h2Creazioni: 'Creazioni Personalizzate',
                newCocktailH3: 'Nuovo Cocktail',
                phNewCocktail: 'Nome del cocktail',
                labelIngredienti: 'Ingredienti',
                labelAlcolico: 'Alcolico',
                labelAnalcolico: 'Analcolico',
                btnAggiungiIng: 'Aggiungi ingrediente',
                btnCrea: 'Crea e aggiungi alla serata',
                bottShotH3: 'Bottiglia Shot',
                descBottShot: 'Aggiungi un alcolico extra non presente nel ricettario',
                phNewShot: 'Nome (es. Limoncello)',
                btnCreaShot: 'Crea e aggiungi',
                // Risultati
                btnGenera: 'Genera lista della spesa',
                printTitle: 'Lista della Spesa · Barman PRO',
                risultatiAlcolici: 'Alcolici (Litri)',
                risultatiAnalcolici: 'Analcolici & Filler (Litri)',
                risultatiAttrezzatura: 'Attrezzatura',
                btnCopia: 'Copia testo',
                btnCondividi: 'Condividi',
                btnStampa: 'Stampa o salva in PDF',
                perPersonaTxt: 'a persona',
                pdfGuests: 'ospiti',
                sliderRimuovi: '× Rimuovi',
                sliderFreq: 'Freq.',
                
                
                
                // JS strings
                alertCocktailNonTrovato: 'Cocktail non trovato. Selezionalo dalla tendina o crealo nel pannello qui sotto.',
                confirmReset: 'Vuoi davvero azzerare tutto? Questa azione non può essere annullata.',
                toastReset: 'Tutto azzerato',
                alertNomeCocktailVuoto: 'Inserisci il nome del cocktail.',
                alertIngVuoti: 'Inserisci almeno un ingrediente con il valore in ml.',
                toastCocktailCreato: 'Cocktail "{nome}" creato',
                alertNomeShotVuoto: "Inserisci il nome dell'alcolico.",
                toastShotCreato: '"{nome}" aggiunto agli shot',
                alertNienteMenu: 'Hai impostato cocktail e shot per gli ospiti, ma non hai aggiunto nulla al menu della serata. Aggiungi almeno un cocktail o uno shot.',
                alertNessunCocktailMenu: 'Hai impostato cocktail per gli ospiti, ma non hai aggiunto nessun cocktail al menu della serata.',
                alertNessunDrinkImpostato: 'Imposta almeno un cocktail o uno shot a persona.',
                risultatiTotali: 'Da preparare: {drink} cocktail · {shot} shot',
                nessunAlcolico: 'Nessun alcolico',
                nessunAnalcolico: 'Nessun analcolico',
                ghiaccio: 'Ghiaccio a cubi',
                bicchieriCocktail: 'Bicchieri da cocktail',
                bicchieriniShot: 'Bicchierini da shot',
                cannucce: 'Cannucce',
                toastCopiaOk: 'Lista copiata negli appunti',
                errCopia: 'Errore nella copia: ',
                toastInstallata: 'App installata',
                
                
                // Esportazione testo
                copyHeader: '❦  LISTA DELLA SPESA — EVENTO',
                copyAlcolici: 'ALCOLICI (Litri)',
                copyAnalcolici: 'ANALCOLICI & FILLER (Litri)',
                copyAttrezzatura: 'ATTREZZATURA',
                // Nomi ingredienti
                ing: {
                    'Mirto': 'Mirto', 'Amaretto': 'Amaretto', 'Amaro Nonino': 'Amaro Nonino',
                    'Baileys': 'Baileys', 'Bénédictine': 'Bénédictine', 'Birra Chiara': 'Birra Chiara',
                    'Blue Curaçao': 'Blue Curaçao', 'Cherry Brandy': 'Cherry Brandy', 'Crema di Cacao Bianca': 'Crema di Cacao Bianca',
                    'Crème de Cassis': 'Crème de Cassis', 'Crème de Menthe Bianca': 'Crème de Menthe Bianca', 'Crème de Menthe Verde': 'Crème de Menthe Verde',
                    'Grand Marnier': 'Grand Marnier', 'Green Chartreuse': 'Green Chartreuse', 'Islay Single Malt': 'Islay Single Malt',
                    'Kirsch': 'Kirsch', 'Lillet Blanc': 'Lillet Blanc', 'Liquore ai Lamponi': 'Liquore ai Lamponi',
                    'Liquore alla Mela': 'Liquore alla Mela', 'Liquore alle More': 'Liquore alle More', 'Liquore Galliano': 'Liquore Galliano',
                    'Porto Rosso': 'Porto Rosso', 'Tennessee Whiskey': 'Tennessee Whiskey', 'Vino Bianco': 'Vino Bianco',
                    'Acqua': 'Acqua', 'Brodo di manzo': 'Brodo di manzo', "Salamoia d'oliva": "Salamoia d'oliva",
                    'Sangrita': 'Sangrita', 'Sciroppo di Miele e Zenzero': 'Sciroppo di Miele e Zenzero', 'Sciroppo di Sambuco': 'Sciroppo di Sambuco',
                    'Succo di Passion Fruit': 'Succo di Passion Fruit', 'Succo di Pomodoro': 'Succo di Pomodoro', 'Succo di Pompelmo': 'Succo di Pompelmo',
                    "Tuorlo d'uovo": "Tuorlo d'uovo",
                    'Rum Bianco': 'Rum Bianco', 'Rum Scuro': 'Rum Scuro', 'Rum Dorato': 'Rum Dorato',
                    'Rum Demerara': 'Rum Demerara', 'Rum Giamaicano': 'Rum Giamaicano', 'Rum Martinicano': 'Rum Martinicano',
                    'Gin': 'Gin', 'Vodka Liscia': 'Vodka Liscia', 'Vodka al Limone': 'Vodka al Limone',
                    'Vodka alla Vaniglia': 'Vodka alla Vaniglia', 'Vodka Menta': 'Vodka Menta', 'Vodka Pesca': 'Vodka Pesca',
                    'Vodka Fragola': 'Vodka Fragola', 'Vodka Melone': 'Vodka Melone',
                    'Vermouth Rosso': 'Vermouth Rosso', 'Vermouth Secco': 'Vermouth Secco',
                    'Whiskey Rye': 'Whiskey Rye', 'Whiskey Irlandese': 'Whiskey Irlandese', 'Whisky Scozzese': 'Whisky Scozzese',
                    'Cognac': 'Cognac', 'Bourbon': 'Bourbon', 'Tequila': 'Tequila', 'Pisco': 'Pisco', 'Cachaça': 'Cachaça',
                    'Bitter Campari': 'Bitter Campari', 'Aperol': 'Aperol', 'Triple Sec': 'Triple Sec',
                    'Cointreau': 'Cointreau', 'Maraschino': 'Maraschino', "Curaçao all'Arancia": "Curaçao all'Arancia",
                    'Crema di Cacao Scura': 'Crema di Cacao Scura', 'Crema di Violetta': 'Crema di Violetta',
                    'Drambuie': 'Drambuie', 'Malibu': 'Malibu', 'Midori': 'Midori',
                    'Amaro Montenegro': 'Amaro Montenegro', 'Fernet Branca': 'Fernet Branca', 'Jägermeister': 'Jägermeister',
                    'Liquore al Caffè': 'Liquore al Caffè', 'Liquore Passion Fruit': 'Liquore Passion Fruit',
                    'Schnapps alla Pesca': 'Schnapps alla Pesca', 'Apricot Brandy': 'Apricot Brandy',
                    'Calvados': 'Calvados', 'Assenzio': 'Assenzio', 'Prosecco': 'Prosecco', 'Champagne': 'Champagne',
                    'Orgeat': 'Orgeat', 'Granatina': 'Granatina',
                    'Succo di Limone': 'Succo di Limone', 'Succo di Lime': 'Succo di Lime',
                    'Succo di Arancia': 'Succo di Arancia', 'Succo di Ananas': 'Succo di Ananas',
                    'Succo di Cranberry': 'Succo di Cranberry', 'Succo di Canna da Zucchero': 'Succo di Canna da Zucchero',
                    'Sciroppo di Zucchero': 'Sciroppo di Zucchero', 'Sciroppo di Lamponi': 'Sciroppo di Lamponi',
                    'Panna Fresca': 'Panna Fresca', 'Albume': 'Albume',
                    'Purea di Pesca': 'Purea di Pesca', 'Purea di Passion Fruit': 'Purea di Passion Fruit',
                    'Crema di Cocco': 'Crema di Cocco', 'Caffè': 'Caffè', 'Espresso': 'Espresso',
                    'Soda': 'Soda', 'Cola': 'Cola', 'Acqua Tonica': 'Acqua Tonica',
                    'Lemon Soda': 'Lemon Soda', 'Energy Drink': 'Energy Drink',
                    'Ginger Beer': 'Ginger Beer', 'Ginger Ale': 'Ginger Ale',
                    'Soda Pompelmo Rosa': 'Soda Pompelmo Rosa'
                }
            },
            en: {
                storageStatus: 'State saved automatically',
                btnInstalla: 'Install app',
                btnReset: 'Reset all',
                
                
                
                
                btnScarica: 'Download',
                btnChiudi: 'Close',
                
                h2Parametri: 'Event Parameters',
                labelOspiti: 'Expected guests',
                labelDrink: 'Cocktails per person',
                labelShot: 'Shots per person',
                labelScarto: 'Safety margin (%)',
                stepSetup: 'Setup',
                stepMenu: 'Menu',
                stepLista: 'List',
                h2Menu: 'Build the Menu',
                menuSub: 'Switch between tabs: every item you pick flows into the final list',
                descFermentati: 'Wine and beer: set glasses/servings per guest, the app computes bottles and costs',
                h2Cocktail: "Alcoholic Cocktails",
                descCocktail: 'Search the recipe book and adjust the frequency slider from 1 to 5',
                phSearchDrink: 'Search recipes (e.g. Negroni, Spritz, Margarita)...',
                btnAggiungi: 'Add',
                h2Shot: 'Shots & Spirits',
                descShot: 'Standard 40 ml dose · search available spirits',
                phSearchShot: 'Search shots, bitters or liqueurs...',
                h2Creazioni: 'Custom Creations',
                newCocktailH3: 'New Cocktail',
                phNewCocktail: 'Cocktail name',
                labelIngredienti: 'Ingredients',
                labelAlcolico: 'Alcoholic',
                labelAnalcolico: 'Non-alcoholic',
                btnAggiungiIng: 'Add ingredient',
                btnCrea: 'Create & add to evening',
                bottShotH3: 'Shot Bottle',
                descBottShot: 'Add an extra spirit not in the recipe book',
                phNewShot: 'Name (e.g. Limoncello)',
                btnCreaShot: 'Create & add',
                btnGenera: 'Generate shopping list',
                printTitle: 'Shopping List · Barman PRO',
                risultatiAlcolici: 'Spirits (Litres)',
                risultatiAnalcolici: 'Mixers & Fillers (Litres)',
                risultatiAttrezzatura: 'Equipment',
                btnCopia: 'Copy text',
                btnCondividi: 'Share',
                btnStampa: 'Print or save as PDF',
                perPersonaTxt: 'per person',
                pdfGuests: 'guests',
                sliderRimuovi: '× Remove',
                sliderFreq: 'Freq.',
                
                
                
                alertCocktailNonTrovato: 'Cocktail not found. Select it from the dropdown or create it in the panel below.',
                confirmReset: 'Are you sure you want to reset everything? This action cannot be undone.',
                toastReset: 'Everything reset',
                alertNomeCocktailVuoto: 'Please enter the cocktail name.',
                alertIngVuoti: 'Please add at least one ingredient with an ml value.',
                toastCocktailCreato: 'Cocktail "{nome}" created',
                alertNomeShotVuoto: 'Please enter the spirit name.',
                toastShotCreato: '"{nome}" added to shots',
                alertNienteMenu: "You've set cocktails and shots per guest but haven't added anything to the evening menu. Add at least one cocktail or shot.",
                alertNessunCocktailMenu: "You've set cocktails per guest but haven't added any cocktails to the evening menu.",
                alertNessunDrinkImpostato: 'Please set at least one cocktail or shot per person.',
                risultatiTotali: 'To prepare: {drink} cocktails · {shot} shots',
                nessunAlcolico: 'No spirits',
                nessunAnalcolico: 'No mixers',
                ghiaccio: 'Ice cubes',
                bicchieriCocktail: 'Cocktail glasses',
                bicchieriniShot: 'Shot glasses',
                cannucce: 'Straws',
                toastCopiaOk: 'List copied to clipboard',
                errCopia: 'Copy error: ',
                toastInstallata: 'App installed',
                
                
                copyHeader: '❦  SHOPPING LIST — EVENT',
                copyAlcolici: 'SPIRITS (Litres)',
                copyAnalcolici: 'MIXERS & FILLERS (Litres)',
                copyAttrezzatura: 'EQUIPMENT',
                ing: {
                    'Mirto': 'Mirto', 'Amaretto': 'Amaretto', 'Amaro Nonino': 'Amaro Nonino',
                    'Baileys': 'Baileys', 'Bénédictine': 'Bénédictine', 'Birra Chiara': 'Lager Beer',
                    'Blue Curaçao': 'Blue Curaçao', 'Cherry Brandy': 'Cherry Brandy', 'Crema di Cacao Bianca': 'White Cacao Cream',
                    'Crème de Cassis': 'Crème de Cassis', 'Crème de Menthe Bianca': 'White Crème de Menthe', 'Crème de Menthe Verde': 'Green Crème de Menthe',
                    'Grand Marnier': 'Grand Marnier', 'Green Chartreuse': 'Green Chartreuse', 'Islay Single Malt': 'Islay Single Malt',
                    'Kirsch': 'Kirsch', 'Lillet Blanc': 'Lillet Blanc', 'Liquore ai Lamponi': 'Raspberry Liqueur',
                    'Liquore alla Mela': 'Apple Liqueur', 'Liquore alle More': 'Blackberry Liqueur', 'Liquore Galliano': 'Galliano',
                    'Porto Rosso': 'Red Port', 'Tennessee Whiskey': 'Tennessee Whiskey', 'Vino Bianco': 'White Wine',
                    'Acqua': 'Water', 'Brodo di manzo': 'Beef Broth', "Salamoia d'oliva": 'Olive Brine',
                    'Sangrita': 'Sangrita', 'Sciroppo di Miele e Zenzero': 'Honey-Ginger Syrup', 'Sciroppo di Sambuco': 'Elderflower Syrup',
                    'Succo di Passion Fruit': 'Passion Fruit Juice', 'Succo di Pomodoro': 'Tomato Juice', 'Succo di Pompelmo': 'Grapefruit Juice',
                    "Tuorlo d'uovo": 'Egg Yolk',
                    'Rum Bianco': 'White Rum', 'Rum Scuro': 'Dark Rum', 'Rum Dorato': 'Golden Rum',
                    'Rum Demerara': 'Demerara Rum', 'Rum Giamaicano': 'Jamaican Rum', 'Rum Martinicano': 'Martinique Rum',
                    'Gin': 'Gin', 'Vodka Liscia': 'Vodka', 'Vodka al Limone': 'Lemon Vodka',
                    'Vodka alla Vaniglia': 'Vanilla Vodka', 'Vodka Menta': 'Mint Vodka', 'Vodka Pesca': 'Peach Vodka',
                    'Vodka Fragola': 'Strawberry Vodka', 'Vodka Melone': 'Melon Vodka',
                    'Vermouth Rosso': 'Sweet Vermouth', 'Vermouth Secco': 'Dry Vermouth',
                    'Whiskey Rye': 'Rye Whiskey', 'Whiskey Irlandese': 'Irish Whiskey', 'Whisky Scozzese': 'Scotch Whisky',
                    'Cognac': 'Cognac', 'Bourbon': 'Bourbon', 'Tequila': 'Tequila', 'Pisco': 'Pisco', 'Cachaça': 'Cachaça',
                    'Bitter Campari': 'Campari', 'Aperol': 'Aperol', 'Triple Sec': 'Triple Sec',
                    'Cointreau': 'Cointreau', 'Maraschino': 'Maraschino', "Curaçao all'Arancia": 'Orange Curaçao',
                    'Crema di Cacao Scura': 'Dark Crème de Cacao', 'Crema di Violetta': 'Crème de Violette',
                    'Drambuie': 'Drambuie', 'Malibu': 'Malibu', 'Midori': 'Midori',
                    'Amaro Montenegro': 'Amaro Montenegro', 'Fernet Branca': 'Fernet-Branca', 'Jägermeister': 'Jägermeister',
                    'Liquore al Caffè': 'Coffee Liqueur', 'Liquore Passion Fruit': 'Passion Fruit Liqueur',
                    'Schnapps alla Pesca': 'Peach Schnapps', 'Apricot Brandy': 'Apricot Brandy',
                    'Calvados': 'Calvados', 'Assenzio': 'Absinthe', 'Prosecco': 'Prosecco', 'Champagne': 'Champagne',
                    'Orgeat': 'Orgeat', 'Granatina': 'Grenadine',
                    'Succo di Limone': 'Lemon Juice', 'Succo di Lime': 'Lime Juice',
                    'Succo di Arancia': 'Orange Juice', 'Succo di Ananas': 'Pineapple Juice',
                    'Succo di Cranberry': 'Cranberry Juice', 'Succo di Canna da Zucchero': 'Sugarcane Juice',
                    'Sciroppo di Zucchero': 'Simple Syrup', 'Sciroppo di Lamponi': 'Raspberry Syrup',
                    'Panna Fresca': 'Fresh Cream', 'Albume': 'Egg White',
                    'Purea di Pesca': 'Peach Purée', 'Purea di Passion Fruit': 'Passion Fruit Purée',
                    'Crema di Cocco': 'Coconut Cream', 'Caffè': 'Coffee', 'Espresso': 'Espresso',
                    'Soda': 'Soda Water', 'Cola': 'Cola', 'Acqua Tonica': 'Tonic Water',
                    'Lemon Soda': 'Lemon Soda', 'Energy Drink': 'Energy Drink',
                    'Ginger Beer': 'Ginger Beer', 'Ginger Ale': 'Ginger Ale',
                    'Soda Pompelmo Rosa': 'Pink Grapefruit Soda'
                }
            },
            es: {
                storageStatus: 'Estado guardado automáticamente',
                btnInstalla: 'Instalar app',
                btnReset: 'Resetear todo',
                
                
                
                
                btnScarica: 'Descargar',
                btnChiudi: 'Cerrar',
                
                h2Parametri: 'Parámetros del Evento',
                labelOspiti: 'Invitados previstos',
                labelDrink: 'Cócteles por persona',
                labelShot: 'Shots por persona',
                labelScarto: 'Margen de seguridad (%)',
                stepSetup: 'Ajustes',
                stepMenu: 'Menú',
                stepLista: 'Lista',
                h2Menu: 'Crea el Menú',
                menuSub: 'Cambia entre pestañas: cada elemento elegido se suma a la lista final',
                descFermentati: 'Vino y cerveza: indica copas/consumiciones por persona, la app calcula botellas y costes',
                h2Cocktail: 'Cócteles Alcohólicos',
                descCocktail: 'Busca en el recetario y ajusta la frecuencia con el deslizador de 1 a 5',
                phSearchDrink: 'Buscar en el recetario (p. ej. Negroni, Spritz, Margarita)...',
                btnAggiungi: 'Añadir',
                h2Shot: 'Shots y Amargos',
                descShot: 'Dosis estándar 40 ml · busca entre los destilados disponibles',
                phSearchShot: 'Buscar shots, amargo o licor...',
                h2Creazioni: 'Creaciones Personalizadas',
                newCocktailH3: 'Nuevo Cóctel',
                phNewCocktail: 'Nombre del cóctel',
                labelIngredienti: 'Ingredientes',
                labelAlcolico: 'Alcohólico',
                labelAnalcolico: 'Sin alcohol',
                btnAggiungiIng: 'Añadir ingrediente',
                btnCrea: 'Crear y añadir a la noche',
                bottShotH3: 'Botella de Shot',
                descBottShot: 'Añade un destilado extra que no esté en el recetario',
                phNewShot: 'Nombre (p. ej. Limoncello)',
                btnCreaShot: 'Crear y añadir',
                btnGenera: 'Generar lista de compra',
                printTitle: 'Lista de Compra · Barman PRO',
                risultatiAlcolici: 'Destilados (Litros)',
                risultatiAnalcolici: 'Mixers y Rellenos (Litros)',
                risultatiAttrezzatura: 'Equipamiento',
                btnCopia: 'Copiar texto',
                btnCondividi: 'Compartir',
                btnStampa: 'Imprimir o guardar PDF',
                perPersonaTxt: 'por persona',
                pdfGuests: 'invitados',
                sliderRimuovi: '× Quitar',
                sliderFreq: 'Frec.',
                
                
                
                alertCocktailNonTrovato: 'Cóctel no encontrado. Selecciónalo del desplegable o créalo en el panel de abajo.',
                confirmReset: '¿Seguro que quieres resetear todo? Esta acción no se puede deshacer.',
                toastReset: 'Todo reseteado',
                alertNomeCocktailVuoto: 'Introduce el nombre del cóctel.',
                alertIngVuoti: 'Añade al menos un ingrediente con su valor en ml.',
                toastCocktailCreato: 'Cóctel "{nome}" creado',
                alertNomeShotVuoto: 'Introduce el nombre del destilado.',
                toastShotCreato: '"{nome}" añadido a los shots',
                alertNienteMenu: 'Has configurado cócteles y shots por invitado pero no has añadido nada al menú de la noche.',
                alertNessunCocktailMenu: 'Has configurado cócteles por invitado pero no has añadido ningún cóctel al menú.',
                alertNessunDrinkImpostato: 'Configura al menos un cóctel o shot por persona.',
                risultatiTotali: 'A preparar: {drink} cócteles · {shot} shots',
                nessunAlcolico: 'Sin destilados',
                nessunAnalcolico: 'Sin mixers',
                ghiaccio: 'Hielo en cubitos',
                bicchieriCocktail: 'Vasos de cóctel',
                bicchieriniShot: 'Vasitos de shot',
                cannucce: 'Pajitas',
                toastCopiaOk: 'Lista copiada al portapapeles',
                errCopia: 'Error al copiar: ',
                toastInstallata: 'App instalada',
                
                
                copyHeader: '❦  LISTA DE COMPRA — EVENTO',
                copyAlcolici: 'DESTILADOS (Litros)',
                copyAnalcolici: 'MIXERS Y RELLENOS (Litros)',
                copyAttrezzatura: 'EQUIPAMIENTO',
                ing: {
                    'Mirto': 'Mirto', 'Amaretto': 'Amaretto', 'Amaro Nonino': 'Amaro Nonino',
                    'Baileys': 'Baileys', 'Bénédictine': 'Bénédictine', 'Birra Chiara': 'Cerveza Rubia',
                    'Blue Curaçao': 'Blue Curaçao', 'Cherry Brandy': 'Cherry Brandy', 'Crema di Cacao Bianca': 'Crema de Cacao Blanca',
                    'Crème de Cassis': 'Crème de Cassis', 'Crème de Menthe Bianca': 'Crème de Menthe Blanca', 'Crème de Menthe Verde': 'Crème de Menthe Verde',
                    'Grand Marnier': 'Grand Marnier', 'Green Chartreuse': 'Chartreuse Verde', 'Islay Single Malt': 'Islay Single Malt',
                    'Kirsch': 'Kirsch', 'Lillet Blanc': 'Lillet Blanc', 'Liquore ai Lamponi': 'Licor de Frambuesa',
                    'Liquore alla Mela': 'Licor de Manzana', 'Liquore alle More': 'Licor de Mora', 'Liquore Galliano': 'Galliano',
                    'Porto Rosso': 'Oporto Tinto', 'Tennessee Whiskey': 'Tennessee Whiskey', 'Vino Bianco': 'Vino Blanco',
                    'Acqua': 'Agua', 'Brodo di manzo': 'Caldo de Carne', "Salamoia d'oliva": 'Salmuera de Aceitunas',
                    'Sangrita': 'Sangrita', 'Sciroppo di Miele e Zenzero': 'Sirope de Miel y Jengibre', 'Sciroppo di Sambuco': 'Sirope de Saúco',
                    'Succo di Passion Fruit': 'Zumo de Maracuyá', 'Succo di Pomodoro': 'Zumo de Tomate', 'Succo di Pompelmo': 'Zumo de Pomelo',
                    "Tuorlo d'uovo": 'Yema de Huevo',
                    'Rum Bianco': 'Ron Blanco', 'Rum Scuro': 'Ron Oscuro', 'Rum Dorato': 'Ron Dorado',
                    'Rum Demerara': 'Ron Demerara', 'Rum Giamaicano': 'Ron Jamaicano', 'Rum Martinicano': 'Ron Martiniqués',
                    'Gin': 'Gin', 'Vodka Liscia': 'Vodka', 'Vodka al Limone': 'Vodka de Limón',
                    'Vodka alla Vaniglia': 'Vodka de Vainilla', 'Vodka Menta': 'Vodka de Menta', 'Vodka Pesca': 'Vodka de Melocotón',
                    'Vodka Fragola': 'Vodka de Fresa', 'Vodka Melone': 'Vodka de Melón',
                    'Vermouth Rosso': 'Vermut Rojo', 'Vermouth Secco': 'Vermut Seco',
                    'Whiskey Rye': 'Whiskey de Centeno', 'Whiskey Irlandese': 'Whiskey Irlandés', 'Whisky Scozzese': 'Whisky Escocés',
                    'Cognac': 'Coñac', 'Bourbon': 'Bourbon', 'Tequila': 'Tequila', 'Pisco': 'Pisco', 'Cachaça': 'Cachaça',
                    'Bitter Campari': 'Campari', 'Aperol': 'Aperol', 'Triple Sec': 'Triple Sec',
                    'Cointreau': 'Cointreau', 'Maraschino': 'Maraschino', "Curaçao all'Arancia": 'Curaçao de Naranja',
                    'Crema di Cacao Scura': 'Crema de Cacao Oscura', 'Crema di Violetta': 'Crema de Violeta',
                    'Drambuie': 'Drambuie', 'Malibu': 'Malibu', 'Midori': 'Midori',
                    'Amaro Montenegro': 'Amaro Montenegro', 'Fernet Branca': 'Fernet-Branca', 'Jägermeister': 'Jägermeister',
                    'Liquore al Caffè': 'Licor de Café', 'Liquore Passion Fruit': 'Licor de Maracuyá',
                    'Schnapps alla Pesca': 'Schnapps de Melocotón', 'Apricot Brandy': 'Brandy de Albaricoque',
                    'Calvados': 'Calvados', 'Assenzio': 'Absenta', 'Prosecco': 'Prosecco', 'Champagne': 'Champán',
                    'Orgeat': 'Orgeat', 'Granatina': 'Granadina',
                    'Succo di Limone': 'Zumo de Limón', 'Succo di Lime': 'Zumo de Lima',
                    'Succo di Arancia': 'Zumo de Naranja', 'Succo di Ananas': 'Zumo de Piña',
                    'Succo di Cranberry': 'Zumo de Arándano Rojo', 'Succo di Canna da Zucchero': 'Jugo de Caña de Azúcar',
                    'Sciroppo di Zucchero': 'Jarabe de Azúcar', 'Sciroppo di Lamponi': 'Jarabe de Frambuesa',
                    'Panna Fresca': 'Nata Fresca', 'Albume': 'Clara de Huevo',
                    'Purea di Pesca': 'Puré de Melocotón', 'Purea di Passion Fruit': 'Puré de Maracuyá',
                    'Crema di Cocco': 'Crema de Coco', 'Caffè': 'Café', 'Espresso': 'Espresso',
                    'Soda': 'Soda', 'Cola': 'Cola', 'Acqua Tonica': 'Agua Tónica',
                    'Lemon Soda': 'Soda de Limón', 'Energy Drink': 'Bebida Energética',
                    'Ginger Beer': 'Cerveza de Jengibre', 'Ginger Ale': 'Ginger Ale',
                    'Soda Pompelmo Rosa': 'Soda de Pomelo Rosa'
                }
            },
            fr: {
                storageStatus: 'État sauvegardé automatiquement',
                btnInstalla: "Installer l'app",
                btnReset: 'Tout réinitialiser',
                
                
                
                
                btnScarica: 'Télécharger',
                btnChiudi: 'Fermer',
                
                h2Parametri: "Paramètres de l'Événement",
                labelOspiti: 'Invités prévus',
                labelDrink: 'Cocktails par personne',
                labelShot: 'Shots par personne',
                labelScarto: 'Marge de sécurité (%)',
                stepSetup: 'Réglages',
                stepMenu: 'Menu',
                stepLista: 'Liste',
                h2Menu: 'Composez le Menu',
                menuSub: "Passez d'un onglet à l'autre : chaque élément choisi alimente la liste finale",
                descFermentati: "Vin et bière : indiquez verres/consommations par personne, l'app calcule bouteilles et coûts",
                h2Cocktail: 'Cocktails Alcoolisés',
                descCocktail: 'Cherchez dans le recueil et ajustez la fréquence avec le curseur de 1 à 5',
                phSearchDrink: 'Chercher dans le recueil (ex. Negroni, Spritz, Margarita)...',
                btnAggiungi: 'Ajouter',
                h2Shot: 'Shots & Digestifs',
                descShot: 'Dose standard 40 ml · cherchez parmi les alcools disponibles',
                phSearchShot: 'Chercher shot, digestif ou liqueur...',
                h2Creazioni: 'Créations Personnalisées',
                newCocktailH3: 'Nouveau Cocktail',
                phNewCocktail: 'Nom du cocktail',
                labelIngredienti: 'Ingrédients',
                labelAlcolico: 'Alcoolisé',
                labelAnalcolico: 'Sans alcool',
                btnAggiungiIng: 'Ajouter un ingrédient',
                btnCrea: 'Créer et ajouter à la soirée',
                bottShotH3: 'Bouteille de Shot',
                descBottShot: "Ajoutez un alcool supplémentaire absent du recueil",
                phNewShot: 'Nom (ex. Limoncello)',
                btnCreaShot: 'Créer et ajouter',
                btnGenera: 'Générer la liste de courses',
                printTitle: 'Liste de Courses · Barman PRO',
                risultatiAlcolici: 'Alcools (Litres)',
                risultatiAnalcolici: 'Softs & Remplisseurs (Litres)',
                risultatiAttrezzatura: 'Équipement',
                btnCopia: 'Copier le texte',
                btnCondividi: 'Partager',
                btnStampa: 'Imprimer ou enregistrer en PDF',
                perPersonaTxt: 'par personne',
                pdfGuests: 'invités',
                sliderRimuovi: '× Supprimer',
                sliderFreq: 'Fréq.',
                
                
                
                alertCocktailNonTrovato: "Cocktail introuvable. Sélectionnez-le dans la liste ou créez-le dans le panneau ci-dessous.",
                confirmReset: 'Voulez-vous vraiment tout réinitialiser ? Cette action est irréversible.',
                toastReset: 'Tout réinitialisé',
                alertNomeCocktailVuoto: 'Veuillez saisir le nom du cocktail.',
                alertIngVuoti: 'Ajoutez au moins un ingrédient avec sa valeur en ml.',
                toastCocktailCreato: 'Cocktail « {nome} » créé',
                alertNomeShotVuoto: "Veuillez saisir le nom de l'alcool.",
                toastShotCreato: '« {nome} » ajouté aux shots',
                alertNienteMenu: "Vous avez configuré cocktails et shots par invité mais n'avez rien ajouté au menu de la soirée.",
                alertNessunCocktailMenu: "Vous avez configuré des cocktails par invité mais n'en avez ajouté aucun au menu.",
                alertNessunDrinkImpostato: 'Configurez au moins un cocktail ou un shot par personne.',
                risultatiTotali: 'À préparer : {drink} cocktails · {shot} shots',
                nessunAlcolico: 'Aucun alcool',
                nessunAnalcolico: 'Aucun soft',
                ghiaccio: 'Glaçons',
                bicchieriCocktail: 'Verres à cocktail',
                bicchieriniShot: 'Verres à shot',
                cannucce: 'Pailles',
                toastCopiaOk: 'Liste copiée dans le presse-papiers',
                errCopia: 'Erreur de copie : ',
                toastInstallata: 'App installée',
                
                
                copyHeader: '❦  LISTE DE COURSES — ÉVÉNEMENT',
                copyAlcolici: 'ALCOOLS (Litres)',
                copyAnalcolici: 'SOFTS & REMPLISSEURS (Litres)',
                copyAttrezzatura: 'ÉQUIPEMENT',
                ing: {
                    'Mirto': 'Mirto', 'Amaretto': 'Amaretto', 'Amaro Nonino': 'Amaro Nonino',
                    'Baileys': 'Baileys', 'Bénédictine': 'Bénédictine', 'Birra Chiara': 'Bière Blonde',
                    'Blue Curaçao': 'Blue Curaçao', 'Cherry Brandy': 'Cherry Brandy', 'Crema di Cacao Bianca': 'Crème de Cacao Blanche',
                    'Crème de Cassis': 'Crème de Cassis', 'Crème de Menthe Bianca': 'Crème de Menthe Blanche', 'Crème de Menthe Verde': 'Crème de Menthe Verte',
                    'Grand Marnier': 'Grand Marnier', 'Green Chartreuse': 'Chartreuse Verte', 'Islay Single Malt': 'Islay Single Malt',
                    'Kirsch': 'Kirsch', 'Lillet Blanc': 'Lillet Blanc', 'Liquore ai Lamponi': 'Liqueur de Framboise',
                    'Liquore alla Mela': 'Liqueur de Pomme', 'Liquore alle More': 'Liqueur de Mûre', 'Liquore Galliano': 'Galliano',
                    'Porto Rosso': 'Porto Rouge', 'Tennessee Whiskey': 'Tennessee Whiskey', 'Vino Bianco': 'Vin Blanc',
                    'Acqua': 'Eau', 'Brodo di manzo': 'Bouillon de Bœuf', "Salamoia d'oliva": "Saumure d'Olive",
                    'Sangrita': 'Sangrita', 'Sciroppo di Miele e Zenzero': 'Sirop Miel-Gingembre', 'Sciroppo di Sambuco': 'Sirop de Sureau',
                    'Succo di Passion Fruit': 'Jus de Fruit de la Passion', 'Succo di Pomodoro': 'Jus de Tomate', 'Succo di Pompelmo': 'Jus de Pamplemousse',
                    "Tuorlo d'uovo": "Jaune d'Œuf",
                    'Rum Bianco': 'Rhum Blanc', 'Rum Scuro': 'Rhum Brun', 'Rum Dorato': 'Rhum Doré',
                    'Rum Demerara': 'Rhum Demerara', 'Rum Giamaicano': 'Rhum Jamaïcain', 'Rum Martinicano': 'Rhum Martiniquais',
                    'Gin': 'Gin', 'Vodka Liscia': 'Vodka', 'Vodka al Limone': 'Vodka Citron',
                    'Vodka alla Vaniglia': 'Vodka Vanille', 'Vodka Menta': 'Vodka Menthe', 'Vodka Pesca': 'Vodka Pêche',
                    'Vodka Fragola': 'Vodka Fraise', 'Vodka Melone': 'Vodka Melon',
                    'Vermouth Rosso': 'Vermouth Rouge', 'Vermouth Secco': 'Vermouth Sec',
                    'Whiskey Rye': 'Whisky de Seigle', 'Whiskey Irlandese': 'Whiskey Irlandais', 'Whisky Scozzese': 'Scotch Whisky',
                    'Cognac': 'Cognac', 'Bourbon': 'Bourbon', 'Tequila': 'Tequila', 'Pisco': 'Pisco', 'Cachaça': 'Cachaça',
                    'Bitter Campari': 'Campari', 'Aperol': 'Aperol', 'Triple Sec': 'Triple Sec',
                    'Cointreau': 'Cointreau', 'Maraschino': 'Marasquin', "Curaçao all'Arancia": "Curaçao Orange",
                    'Crema di Cacao Scura': 'Crème de Cacao Sombre', 'Crema di Violetta': 'Crème de Violette',
                    'Drambuie': 'Drambuie', 'Malibu': 'Malibu', 'Midori': 'Midori',
                    'Amaro Montenegro': 'Amaro Montenegro', 'Fernet Branca': 'Fernet-Branca', 'Jägermeister': 'Jägermeister',
                    'Liquore al Caffè': 'Liqueur de Café', 'Liquore Passion Fruit': 'Liqueur Fruit de la Passion',
                    'Schnapps alla Pesca': 'Schnaps Pêche', 'Apricot Brandy': 'Brandy Abricot',
                    'Calvados': 'Calvados', 'Assenzio': 'Absinthe', 'Prosecco': 'Prosecco', 'Champagne': 'Champagne',
                    'Orgeat': 'Orgeat', 'Granatina': 'Grenadine',
                    'Succo di Limone': 'Jus de Citron', 'Succo di Lime': 'Jus de Citron Vert',
                    'Succo di Arancia': "Jus d'Orange", 'Succo di Ananas': "Jus d'Ananas",
                    'Succo di Cranberry': 'Jus de Canneberge', 'Succo di Canna da Zucchero': 'Jus de Canne à Sucre',
                    'Sciroppo di Zucchero': 'Sirop de Sucre', 'Sciroppo di Lamponi': 'Sirop de Framboise',
                    'Panna Fresca': 'Crème Fraîche', 'Albume': "Blanc d'Œuf",
                    'Purea di Pesca': 'Purée de Pêche', 'Purea di Passion Fruit': 'Purée de Fruit de la Passion',
                    'Crema di Cocco': 'Crème de Coco', 'Caffè': 'Café', 'Espresso': 'Espresso',
                    'Soda': 'Eau Gazeuse', 'Cola': 'Cola', 'Acqua Tonica': 'Eau Tonique',
                    'Lemon Soda': 'Limonade', 'Energy Drink': 'Boisson Énergisante',
                    'Ginger Beer': 'Bière de Gingembre', 'Ginger Ale': 'Ginger Ale',
                    'Soda Pompelmo Rosa': 'Soda Pamplemousse Rose'
                }
            },
            de: {
                storageStatus: 'Zustand automatisch gespeichert',
                btnInstalla: 'App installieren',
                btnReset: 'Alles zurücksetzen',
                
                
                
                
                btnScarica: 'Herunterladen',
                btnChiudi: 'Schließen',
                
                h2Parametri: 'Veranstaltungsparameter',
                labelOspiti: 'Erwartete Gäste',
                labelDrink: 'Cocktails pro Person',
                labelShot: 'Shots pro Person',
                labelScarto: 'Sicherheitsmarge (%)',
                stepSetup: 'Setup',
                stepMenu: 'Menü',
                stepLista: 'Liste',
                h2Menu: 'Menü zusammenstellen',
                menuSub: 'Wechsle zwischen den Reitern: jede Auswahl fließt in die finale Liste ein',
                descFermentati: 'Wein und Bier: Gläser/Getränke pro Person angeben, die App berechnet Flaschen und Kosten',
                h2Cocktail: 'Alkoholische Cocktails',
                descCocktail: 'Im Rezeptbuch suchen und die Häufigkeit mit dem Regler von 1 bis 5 einstellen',
                phSearchDrink: 'Im Rezeptbuch suchen (z. B. Negroni, Spritz, Margarita)...',
                btnAggiungi: 'Hinzufügen',
                h2Shot: 'Shots & Digestifs',
                descShot: 'Standarddosis 40 ml · unter verfügbaren Spirituosen suchen',
                phSearchShot: 'Shots, Bitterlikör oder Likör suchen...',
                h2Creazioni: 'Eigene Kreationen',
                newCocktailH3: 'Neuer Cocktail',
                phNewCocktail: 'Cocktailname',
                labelIngredienti: 'Zutaten',
                labelAlcolico: 'Alkoholisch',
                labelAnalcolico: 'Alkoholfrei',
                btnAggiungiIng: 'Zutat hinzufügen',
                btnCrea: 'Erstellen & zum Abend hinzufügen',
                bottShotH3: 'Shot-Flasche',
                descBottShot: 'Füge eine Spirituose hinzu, die nicht im Rezeptbuch steht',
                phNewShot: 'Name (z. B. Limoncello)',
                btnCreaShot: 'Erstellen & hinzufügen',
                btnGenera: 'Einkaufsliste generieren',
                printTitle: 'Einkaufsliste · Barman PRO',
                risultatiAlcolici: 'Spirituosen (Liter)',
                risultatiAnalcolici: 'Mischgetränke & Füller (Liter)',
                risultatiAttrezzatura: 'Ausrüstung',
                btnCopia: 'Text kopieren',
                btnCondividi: 'Teilen',
                btnStampa: 'Drucken oder als PDF speichern',
                perPersonaTxt: 'pro Person',
                pdfGuests: 'Gäste',
                sliderRimuovi: '× Entfernen',
                sliderFreq: 'Freq.',
                
                
                
                alertCocktailNonTrovato: 'Cocktail nicht gefunden. Wähle ihn aus der Liste oder erstelle ihn im Bereich unten.',
                confirmReset: 'Möchtest du wirklich alles zurücksetzen? Diese Aktion kann nicht rückgängig gemacht werden.',
                toastReset: 'Alles zurückgesetzt',
                alertNomeCocktailVuoto: 'Bitte gib den Cocktailnamen ein.',
                alertIngVuoti: 'Füge mindestens eine Zutat mit ml-Wert hinzu.',
                toastCocktailCreato: 'Cocktail „{nome}" erstellt',
                alertNomeShotVuoto: 'Bitte gib den Namen der Spirituose ein.',
                toastShotCreato: '„{nome}" zu Shots hinzugefügt',
                alertNienteMenu: 'Du hast Cocktails und Shots pro Gast konfiguriert, aber nichts zum Abendmenü hinzugefügt.',
                alertNessunCocktailMenu: 'Du hast Cocktails pro Gast konfiguriert, aber keine Cocktails zum Menü hinzugefügt.',
                alertNessunDrinkImpostato: 'Lege mindestens einen Cocktail oder Shot pro Person fest.',
                risultatiTotali: 'Zuzubereiten: {drink} Cocktails · {shot} Shots',
                nessunAlcolico: 'Keine Spirituosen',
                nessunAnalcolico: 'Keine Mischgetränke',
                ghiaccio: 'Eiswürfel',
                bicchieriCocktail: 'Cocktailgläser',
                bicchieriniShot: 'Shotgläser',
                cannucce: 'Strohhalme',
                toastCopiaOk: 'Liste in Zwischenablage kopiert',
                errCopia: 'Kopierfehler: ',
                toastInstallata: 'App installiert',
                
                
                copyHeader: '❦  EINKAUFSLISTE — VERANSTALTUNG',
                copyAlcolici: 'SPIRITUOSEN (Liter)',
                copyAnalcolici: 'MISCHGETRÄNKE & FÜLLER (Liter)',
                copyAttrezzatura: 'AUSRÜSTUNG',
                ing: {
                    'Mirto': 'Mirto', 'Amaretto': 'Amaretto', 'Amaro Nonino': 'Amaro Nonino',
                    'Baileys': 'Baileys', 'Bénédictine': 'Bénédictine', 'Birra Chiara': 'Helles Bier',
                    'Blue Curaçao': 'Blue Curaçao', 'Cherry Brandy': 'Cherry Brandy', 'Crema di Cacao Bianca': 'Weiße Kakaocreme',
                    'Crème de Cassis': 'Crème de Cassis', 'Crème de Menthe Bianca': 'Weiße Crème de Menthe', 'Crème de Menthe Verde': 'Grüne Crème de Menthe',
                    'Grand Marnier': 'Grand Marnier', 'Green Chartreuse': 'Grüner Chartreuse', 'Islay Single Malt': 'Islay Single Malt',
                    'Kirsch': 'Kirsch', 'Lillet Blanc': 'Lillet Blanc', 'Liquore ai Lamponi': 'Himbeerlikör',
                    'Liquore alla Mela': 'Apfellikör', 'Liquore alle More': 'Brombeerlikör', 'Liquore Galliano': 'Galliano',
                    'Porto Rosso': 'Roter Portwein', 'Tennessee Whiskey': 'Tennessee Whiskey', 'Vino Bianco': 'Weißwein',
                    'Acqua': 'Wasser', 'Brodo di manzo': 'Rinderbrühe', "Salamoia d'oliva": 'Olivenlake',
                    'Sangrita': 'Sangrita', 'Sciroppo di Miele e Zenzero': 'Honig-Ingwer-Sirup', 'Sciroppo di Sambuco': 'Holunderblütensirup',
                    'Succo di Passion Fruit': 'Maracujasaft', 'Succo di Pomodoro': 'Tomatensaft', 'Succo di Pompelmo': 'Grapefruitsaft',
                    "Tuorlo d'uovo": 'Eigelb',
                    'Rum Bianco': 'Weißer Rum', 'Rum Scuro': 'Dunkler Rum', 'Rum Dorato': 'Goldener Rum',
                    'Rum Demerara': 'Demerara-Rum', 'Rum Giamaicano': 'Jamaikanischer Rum', 'Rum Martinicano': 'Martinique-Rum',
                    'Gin': 'Gin', 'Vodka Liscia': 'Wodka', 'Vodka al Limone': 'Zitronen-Wodka',
                    'Vodka alla Vaniglia': 'Vanille-Wodka', 'Vodka Menta': 'Minz-Wodka', 'Vodka Pesca': 'Pfirsich-Wodka',
                    'Vodka Fragola': 'Erdbeer-Wodka', 'Vodka Melone': 'Melonen-Wodka',
                    'Vermouth Rosso': 'Roter Wermut', 'Vermouth Secco': 'Trockener Wermut',
                    'Whiskey Rye': 'Roggen-Whiskey', 'Whiskey Irlandese': 'Irischer Whiskey', 'Whisky Scozzese': 'Scotch Whisky',
                    'Cognac': 'Kognak', 'Bourbon': 'Bourbon', 'Tequila': 'Tequila', 'Pisco': 'Pisco', 'Cachaça': 'Cachaça',
                    'Bitter Campari': 'Campari', 'Aperol': 'Aperol', 'Triple Sec': 'Triple Sec',
                    'Cointreau': 'Cointreau', 'Maraschino': 'Maraschino', "Curaçao all'Arancia": 'Orangen-Curaçao',
                    'Crema di Cacao Scura': 'Dunkle Crème de Cacao', 'Crema di Violetta': 'Veilchenlikör',
                    'Drambuie': 'Drambuie', 'Malibu': 'Malibu', 'Midori': 'Midori',
                    'Amaro Montenegro': 'Amaro Montenegro', 'Fernet Branca': 'Fernet-Branca', 'Jägermeister': 'Jägermeister',
                    'Liquore al Caffè': 'Kaffeelikör', 'Liquore Passion Fruit': 'Maracujalikör',
                    'Schnapps alla Pesca': 'Pfirsichschnaps', 'Apricot Brandy': 'Aprikosenlikör',
                    'Calvados': 'Calvados', 'Assenzio': 'Absinth', 'Prosecco': 'Prosecco', 'Champagne': 'Champagner',
                    'Orgeat': 'Mandelsirup', 'Granatina': 'Grenadine',
                    'Succo di Limone': 'Zitronensaft', 'Succo di Lime': 'Limettensaft',
                    'Succo di Arancia': 'Orangensaft', 'Succo di Ananas': 'Ananassaft',
                    'Succo di Cranberry': 'Cranberrysaft', 'Succo di Canna da Zucchero': 'Zuckerrohrsaft',
                    'Sciroppo di Zucchero': 'Zuckersirup', 'Sciroppo di Lamponi': 'Himbeersirup',
                    'Panna Fresca': 'Sahne', 'Albume': 'Eiweiß',
                    'Purea di Pesca': 'Pfirsichpüree', 'Purea di Passion Fruit': 'Maracujapüree',
                    'Crema di Cocco': 'Kokosnusscreme', 'Caffè': 'Kaffee', 'Espresso': 'Espresso',
                    'Soda': 'Sodawasser', 'Cola': 'Cola', 'Acqua Tonica': 'Tonicwater',
                    'Lemon Soda': 'Zitronenlimonade', 'Energy Drink': 'Energy-Drink',
                    'Ginger Beer': 'Ingwerbier', 'Ginger Ale': 'Ginger Ale',
                    'Soda Pompelmo Rosa': 'Grapefruitlimonade'
                }
            },
            pt: {
                storageStatus: 'Estado salvo automaticamente',
                btnInstalla: 'Instalar app',
                btnReset: 'Reiniciar tudo',
                
                
                
                
                btnScarica: 'Baixar',
                btnChiudi: 'Fechar',
                
                h2Parametri: 'Parâmetros do Evento',
                labelOspiti: 'Convidados previstos',
                labelDrink: 'Cocktails por pessoa',
                labelShot: 'Shots por pessoa',
                labelScarto: 'Margem de segurança (%)',
                stepSetup: 'Ajustes',
                stepMenu: 'Menu',
                stepLista: 'Lista',
                h2Menu: 'Monte o Menu',
                menuSub: 'Alterne entre as abas: cada item escolhido entra na lista final',
                descFermentati: 'Vinho e cerveja: indique taças/consumos por pessoa, o app calcula garrafas e custos',
                h2Cocktail: 'Cocktails Alcoólicos',
                descCocktail: 'Pesquise no receituário e ajuste a frequência com o cursor de 1 a 5',
                phSearchDrink: 'Pesquisar no receituário (ex. Negroni, Spritz, Margarita)...',
                btnAggiungi: 'Adicionar',
                h2Shot: 'Shots & Amargos',
                descShot: 'Dose padrão 40 ml · pesquise entre as bebidas disponíveis',
                phSearchShot: 'Pesquisar shots, amargo ou licor...',
                h2Creazioni: 'Criações Personalizadas',
                newCocktailH3: 'Novo Cocktail',
                phNewCocktail: 'Nome do cocktail',
                labelIngredienti: 'Ingredientes',
                labelAlcolico: 'Alcoólico',
                labelAnalcolico: 'Sem álcool',
                btnAggiungiIng: 'Adicionar ingrediente',
                btnCrea: 'Criar e adicionar à noite',
                bottShotH3: 'Garrafa de Shot',
                descBottShot: 'Adicione uma bebida extra não presente no receituário',
                phNewShot: 'Nome (ex. Limoncello)',
                btnCreaShot: 'Criar e adicionar',
                btnGenera: 'Gerar lista de compras',
                printTitle: 'Lista de Compras · Barman PRO',
                risultatiAlcolici: 'Bebidas Alcoólicas (Litros)',
                risultatiAnalcolici: 'Mixers & Complementos (Litros)',
                risultatiAttrezzatura: 'Equipamento',
                btnCopia: 'Copiar texto',
                btnCondividi: 'Compartilhar',
                btnStampa: 'Imprimir ou salvar em PDF',
                perPersonaTxt: 'por pessoa',
                pdfGuests: 'convidados',
                sliderRimuovi: '× Remover',
                sliderFreq: 'Freq.',
                
                
                
                alertCocktailNonTrovato: 'Cocktail não encontrado. Selecione-o na lista ou crie-o no painel abaixo.',
                confirmReset: 'Tem certeza que deseja reiniciar tudo? Esta ação não pode ser desfeita.',
                toastReset: 'Tudo reiniciado',
                alertNomeCocktailVuoto: 'Insira o nome do cocktail.',
                alertIngVuoti: 'Adicione pelo menos um ingrediente com valor em ml.',
                toastCocktailCreato: 'Cocktail "{nome}" criado',
                alertNomeShotVuoto: 'Insira o nome da bebida.',
                toastShotCreato: '"{nome}" adicionado aos shots',
                alertNienteMenu: 'Você configurou cocktails e shots por convidado mas não adicionou nada ao menu da noite.',
                alertNessunCocktailMenu: 'Você configurou cocktails por convidado mas não adicionou nenhum cocktail ao menu.',
                alertNessunDrinkImpostato: 'Configure pelo menos um cocktail ou shot por pessoa.',
                risultatiTotali: 'A preparar: {drink} cocktails · {shot} shots',
                nessunAlcolico: 'Sem bebidas alcoólicas',
                nessunAnalcolico: 'Sem mixers',
                ghiaccio: 'Gelo em cubos',
                bicchieriCocktail: 'Copos de cocktail',
                bicchieriniShot: 'Copo de shot',
                cannucce: 'Canudos',
                toastCopiaOk: 'Lista copiada para a área de transferência',
                errCopia: 'Erro ao copiar: ',
                toastInstallata: 'App instalado',
                
                
                copyHeader: '❦  LISTA DE COMPRAS — EVENTO',
                copyAlcolici: 'BEBIDAS ALCOÓLICAS (Litros)',
                copyAnalcolici: 'MIXERS & COMPLEMENTOS (Litros)',
                copyAttrezzatura: 'EQUIPAMENTO',
                ing: {
                    'Mirto': 'Mirto', 'Amaretto': 'Amaretto', 'Amaro Nonino': 'Amaro Nonino',
                    'Baileys': 'Baileys', 'Bénédictine': 'Bénédictine', 'Birra Chiara': 'Cerveja Clara',
                    'Blue Curaçao': 'Blue Curaçao', 'Cherry Brandy': 'Cherry Brandy', 'Crema di Cacao Bianca': 'Creme de Cacau Branco',
                    'Crème de Cassis': 'Crème de Cassis', 'Crème de Menthe Bianca': 'Crème de Menthe Branca', 'Crème de Menthe Verde': 'Crème de Menthe Verde',
                    'Grand Marnier': 'Grand Marnier', 'Green Chartreuse': 'Chartreuse Verde', 'Islay Single Malt': 'Islay Single Malt',
                    'Kirsch': 'Kirsch', 'Lillet Blanc': 'Lillet Blanc', 'Liquore ai Lamponi': 'Licor de Framboesa',
                    'Liquore alla Mela': 'Licor de Maçã', 'Liquore alle More': 'Licor de Amora', 'Liquore Galliano': 'Galliano',
                    'Porto Rosso': 'Vinho do Porto Tinto', 'Tennessee Whiskey': 'Tennessee Whiskey', 'Vino Bianco': 'Vinho Branco',
                    'Acqua': 'Água', 'Brodo di manzo': 'Caldo de Carne', "Salamoia d'oliva": 'Salmoura de Azeitona',
                    'Sangrita': 'Sangrita', 'Sciroppo di Miele e Zenzero': 'Xarope de Mel e Gengibre', 'Sciroppo di Sambuco': 'Xarope de Sabugueiro',
                    'Succo di Passion Fruit': 'Sumo de Maracujá', 'Succo di Pomodoro': 'Sumo de Tomate', 'Succo di Pompelmo': 'Sumo de Toranja',
                    "Tuorlo d'uovo": 'Gema de Ovo',
                    'Rum Bianco': 'Rum Branco', 'Rum Scuro': 'Rum Escuro', 'Rum Dorato': 'Rum Dourado',
                    'Rum Demerara': 'Rum Demerara', 'Rum Giamaicano': 'Rum Jamaicano', 'Rum Martinicano': 'Rum Martinicano',
                    'Gin': 'Gin', 'Vodka Liscia': 'Vodka', 'Vodka al Limone': 'Vodka de Limão',
                    'Vodka alla Vaniglia': 'Vodka de Baunilha', 'Vodka Menta': 'Vodka de Hortelã', 'Vodka Pesca': 'Vodka de Pêssego',
                    'Vodka Fragola': 'Vodka de Morango', 'Vodka Melone': 'Vodka de Melão',
                    'Vermouth Rosso': 'Vermute Tinto', 'Vermouth Secco': 'Vermute Seco',
                    'Whiskey Rye': 'Whiskey de Centeio', 'Whiskey Irlandese': 'Whiskey Irlandês', 'Whisky Scozzese': 'Scotch Whisky',
                    'Cognac': 'Conhaque', 'Bourbon': 'Bourbon', 'Tequila': 'Tequila', 'Pisco': 'Pisco', 'Cachaça': 'Cachaça',
                    'Bitter Campari': 'Campari', 'Aperol': 'Aperol', 'Triple Sec': 'Triple Sec',
                    'Cointreau': 'Cointreau', 'Maraschino': 'Maraschino', "Curaçao all'Arancia": 'Curaçao de Laranja',
                    'Crema di Cacao Scura': 'Creme de Cacau Escuro', 'Crema di Violetta': 'Licor de Violeta',
                    'Drambuie': 'Drambuie', 'Malibu': 'Malibu', 'Midori': 'Midori',
                    'Amaro Montenegro': 'Amaro Montenegro', 'Fernet Branca': 'Fernet-Branca', 'Jägermeister': 'Jägermeister',
                    'Liquore al Caffè': 'Licor de Café', 'Liquore Passion Fruit': 'Licor de Maracujá',
                    'Schnapps alla Pesca': 'Schnapps de Pêssego', 'Apricot Brandy': 'Brandy de Damasco',
                    'Calvados': 'Calvados', 'Assenzio': 'Absinto', 'Prosecco': 'Prosecco', 'Champagne': 'Champanhe',
                    'Orgeat': 'Xarope de Amêndoa', 'Granatina': 'Granadina',
                    'Succo di Limone': 'Sumo de Limão', 'Succo di Lime': 'Sumo de Lima',
                    'Succo di Arancia': 'Sumo de Laranja', 'Succo di Ananas': 'Sumo de Ananás',
                    'Succo di Cranberry': 'Sumo de Cranberry', 'Succo di Canna da Zucchero': 'Caldo de Cana',
                    'Sciroppo di Zucchero': 'Xarope de Açúcar', 'Sciroppo di Lamponi': 'Xarope de Framboesa',
                    'Panna Fresca': 'Natas Frescas', 'Albume': 'Clara de Ovo',
                    'Purea di Pesca': 'Purê de Pêssego', 'Purea di Passion Fruit': 'Purê de Maracujá',
                    'Crema di Cocco': 'Creme de Coco', 'Caffè': 'Café', 'Espresso': 'Espresso',
                    'Soda': 'Água com Gás', 'Cola': 'Cola', 'Acqua Tonica': 'Água Tónica',
                    'Lemon Soda': 'Limonada', 'Energy Drink': 'Bebida Energética',
                    'Ginger Beer': 'Cerveja de Gengibre', 'Ginger Ale': 'Ginger Ale',
                    'Soda Pompelmo Rosa': 'Soda de Toranja Rosa'
                }
            },
            nl: {
                storageStatus: 'Status automatisch opgeslagen',
                btnInstalla: 'App installeren',
                btnReset: 'Alles resetten',
                
                
                
                
                btnScarica: 'Downloaden',
                btnChiudi: 'Sluiten',
                
                h2Parametri: 'Evenementparameters',
                labelOspiti: 'Verwachte gasten',
                labelDrink: "Cocktails per persoon",
                labelShot: 'Shots per persoon',
                labelScarto: 'Veiligheidsmarge (%)',
                stepSetup: 'Instellen',
                stepMenu: 'Menu',
                stepLista: 'Lijst',
                h2Menu: 'Stel het Menu samen',
                menuSub: 'Wissel tussen tabbladen: elke keuze komt in de uiteindelijke lijst',
                descFermentati: 'Wijn en bier: geef glazen/consumpties per persoon, de app berekent flessen en kosten',
                h2Cocktail: "Alcoholische Cocktails",
                descCocktail: 'Zoek in het receptenboek en pas de frequentie aan met de schuifregelaar van 1 tot 5',
                phSearchDrink: 'Zoek in het receptenboek (bijv. Negroni, Spritz, Margarita)...',
                btnAggiungi: 'Toevoegen',
                h2Shot: "Shots & Digestieven",
                descShot: 'Standaarddosis 40 ml · zoek onder beschikbare dranken',
                phSearchShot: 'Zoek shots, bitters of likeur...',
                h2Creazioni: 'Persoonlijke Creaties',
                newCocktailH3: 'Nieuwe Cocktail',
                phNewCocktail: 'Naam van de cocktail',
                labelIngredienti: 'Ingrediënten',
                labelAlcolico: 'Alcoholisch',
                labelAnalcolico: 'Alcoholvrij',
                btnAggiungiIng: 'Ingrediënt toevoegen',
                btnCrea: 'Aanmaken & toevoegen aan avond',
                bottShotH3: 'Shot-fles',
                descBottShot: 'Voeg een extra drank toe die niet in het receptenboek staat',
                phNewShot: 'Naam (bijv. Limoncello)',
                btnCreaShot: 'Aanmaken & toevoegen',
                btnGenera: 'Boodschappenlijst genereren',
                printTitle: 'Boodschappenlijst · Barman PRO',
                risultatiAlcolici: 'Alcohol (Liter)',
                risultatiAnalcolici: 'Mixers & Vullers (Liter)',
                risultatiAttrezzatura: 'Materiaal',
                btnCopia: 'Tekst kopiëren',
                btnCondividi: 'Delen',
                btnStampa: 'Afdrukken of als PDF opslaan',
                perPersonaTxt: 'per persoon',
                pdfGuests: 'gasten',
                sliderRimuovi: '× Verwijderen',
                sliderFreq: 'Freq.',
                
                
                
                alertCocktailNonTrovato: 'Cocktail niet gevonden. Selecteer hem uit de lijst of maak hem aan in het paneel hieronder.',
                confirmReset: 'Weet je zeker dat je alles wilt resetten? Deze actie kan niet ongedaan worden gemaakt.',
                toastReset: 'Alles gereset',
                alertNomeCocktailVuoto: 'Voer de naam van de cocktail in.',
                alertIngVuoti: 'Voeg minstens één ingrediënt toe met een ml-waarde.',
                toastCocktailCreato: 'Cocktail "{nome}" aangemaakt',
                alertNomeShotVuoto: 'Voer de naam van de drank in.',
                toastShotCreato: '"{nome}" toegevoegd aan shots',
                alertNienteMenu: 'Je hebt cocktails en shots per gast ingesteld maar niets aan het avondmenu toegevoegd.',
                alertNessunCocktailMenu: 'Je hebt cocktails per gast ingesteld maar geen cocktails aan het menu toegevoegd.',
                alertNessunDrinkImpostato: 'Stel minstens één cocktail of shot per persoon in.',
                risultatiTotali: 'Te bereiden: {drink} cocktails · {shot} shots',
                nessunAlcolico: 'Geen alcohol',
                nessunAnalcolico: 'Geen mixers',
                ghiaccio: 'IJsblokjes',
                bicchieriCocktail: 'Cocktailglazen',
                bicchieriniShot: 'Shotglaasjes',
                cannucce: 'Rietjes',
                toastCopiaOk: 'Lijst gekopieerd naar klembord',
                errCopia: 'Kopiëerfout: ',
                toastInstallata: 'App geïnstalleerd',
                
                
                copyHeader: '❦  BOODSCHAPPENLIJST — EVENEMENT',
                copyAlcolici: 'ALCOHOL (Liter)',
                copyAnalcolici: 'MIXERS & VULLERS (Liter)',
                copyAttrezzatura: 'MATERIAAL',
                ing: {
                    'Mirto': 'Mirto', 'Amaretto': 'Amaretto', 'Amaro Nonino': 'Amaro Nonino',
                    'Baileys': 'Baileys', 'Bénédictine': 'Bénédictine', 'Birra Chiara': 'Pils',
                    'Blue Curaçao': 'Blue Curaçao', 'Cherry Brandy': 'Cherry Brandy', 'Crema di Cacao Bianca': 'Witte Cacaocrème',
                    'Crème de Cassis': 'Crème de Cassis', 'Crème de Menthe Bianca': 'Witte Crème de Menthe', 'Crème de Menthe Verde': 'Groene Crème de Menthe',
                    'Grand Marnier': 'Grand Marnier', 'Green Chartreuse': 'Groene Chartreuse', 'Islay Single Malt': 'Islay Single Malt',
                    'Kirsch': 'Kirsch', 'Lillet Blanc': 'Lillet Blanc', 'Liquore ai Lamponi': 'Frambozenlikeur',
                    'Liquore alla Mela': 'Appellikeur', 'Liquore alle More': 'Bramenlikeur', 'Liquore Galliano': 'Galliano',
                    'Porto Rosso': 'Rode Port', 'Tennessee Whiskey': 'Tennessee Whiskey', 'Vino Bianco': 'Witte Wijn',
                    'Acqua': 'Water', 'Brodo di manzo': 'Runderbouillon', "Salamoia d'oliva": 'Olijfpekel',
                    'Sangrita': 'Sangrita', 'Sciroppo di Miele e Zenzero': 'Honing-gembersiroop', 'Sciroppo di Sambuco': 'Vlierbloesemsiroop',
                    'Succo di Passion Fruit': 'Passievruchtensap', 'Succo di Pomodoro': 'Tomatensap', 'Succo di Pompelmo': 'Grapefruitsap',
                    "Tuorlo d'uovo": 'Eidooier',
                    'Rum Bianco': 'Witte Rum', 'Rum Scuro': 'Donkere Rum', 'Rum Dorato': 'Gouden Rum',
                    'Rum Demerara': 'Demerara Rum', 'Rum Giamaicano': 'Jamaicaanse Rum', 'Rum Martinicano': 'Martinique Rum',
                    'Gin': 'Gin', 'Vodka Liscia': 'Wodka', 'Vodka al Limone': 'Citroen Vodka',
                    'Vodka alla Vaniglia': 'Vanille Vodka', 'Vodka Menta': 'Munt Vodka', 'Vodka Pesca': 'Perzik Vodka',
                    'Vodka Fragola': 'Aardbei Vodka', 'Vodka Melone': 'Meloen Vodka',
                    'Vermouth Rosso': 'Rode Vermout', 'Vermouth Secco': 'Droge Vermout',
                    'Whiskey Rye': 'Rogge Whiskey', 'Whiskey Irlandese': 'Ierse Whiskey', 'Whisky Scozzese': 'Schotse Whisky',
                    'Cognac': 'Cognac', 'Bourbon': 'Bourbon', 'Tequila': 'Tequila', 'Pisco': 'Pisco', 'Cachaça': 'Cachaça',
                    'Bitter Campari': 'Campari', 'Aperol': 'Aperol', 'Triple Sec': 'Triple Sec',
                    'Cointreau': 'Cointreau', 'Maraschino': 'Maraschino', "Curaçao all'Arancia": 'Sinaasappel Curaçao',
                    'Crema di Cacao Scura': 'Donkere Cacaolikeur', 'Crema di Violetta': 'Viooltjeslikeur',
                    'Drambuie': 'Drambuie', 'Malibu': 'Malibu', 'Midori': 'Midori',
                    'Amaro Montenegro': 'Amaro Montenegro', 'Fernet Branca': 'Fernet-Branca', 'Jägermeister': 'Jägermeister',
                    'Liquore al Caffè': 'Koffielikeur', 'Liquore Passion Fruit': 'Passievruchtlikeur',
                    'Schnapps alla Pesca': 'Perzikschnapps', 'Apricot Brandy': 'Abrikozenlikeur',
                    'Calvados': 'Calvados', 'Assenzio': 'Absint', 'Prosecco': 'Prosecco', 'Champagne': 'Champagne',
                    'Orgeat': 'Orgeadesirop', 'Granatina': 'Grenadine',
                    'Succo di Limone': 'Citroensap', 'Succo di Lime': 'Limoensap',
                    'Succo di Arancia': 'Sinaasappelsap', 'Succo di Ananas': 'Ananassap',
                    'Succo di Cranberry': 'Cranberrysap', 'Succo di Canna da Zucchero': 'Suikerrietstap',
                    'Sciroppo di Zucchero': 'Suikerstroop', 'Sciroppo di Lamponi': 'Frambozensiroop',
                    'Panna Fresca': 'Slagroom', 'Albume': 'Eiwit',
                    'Purea di Pesca': 'Perzikpuree', 'Purea di Passion Fruit': 'Passievruchtpuree',
                    'Crema di Cocco': 'Kokosroom', 'Caffè': 'Koffie', 'Espresso': 'Espresso',
                    'Soda': 'Sodawater', 'Cola': 'Cola', 'Acqua Tonica': 'Tonicwater',
                    'Lemon Soda': 'Citroenlimonade', 'Energy Drink': 'Energiedrank',
                    'Ginger Beer': 'Gemberbier', 'Ginger Ale': 'Ginger Ale',
                    'Soda Pompelmo Rosa': 'Roze Grapefruitsoda'
                }
            }
        };

        /* ════════════════════════════════════════════════════════════
           Estensioni i18n: temi, %bevitori, mocktail, fermentati.
           Merge non-distruttivo nei 7 oggetti lingua esistenti.
           ════════════════════════════════════════════════════════════ */
        const _extraI18n = {
            it: {
                themeNight: "Scuro", themeWedding: "Chiaro",
                labelPctBevitori: "Percentuale bevitori (alcolici)",
                lblAlcolici: "Alcolici", lblAnalcolici: "Analcolici",
                h2Mocktail: "Cocktail Analcolici",
                descMocktail: "Mocktail e drink analcolici per ospiti che non bevono alcol",
                phSearchMocktail: "Cerca un mocktail (es. Virgin Mojito, Shirley Temple)...",
                alertMocktailNonTrovato: "Mocktail non trovato. Selezionalo dalla tendina o crealo nel pannello sotto (solo ingredienti analcolici).",
                h2Fermentati: "Servizio Fermentati",
                btnToggleFermentati: "▾ Mostra / Nascondi vino e birra",
                labelVinoRosso: "Calici Vino Rosso/persona",
                labelVinoBianco: "Calici Vino Bianco/persona",
                labelBollicine: "Calici Bollicine/persona",
                labelBirra: "Consumazioni Birra/persona",
                labelFasciaFermentati: "Fascia Prezzo Fermentati",
                fasciaBassa: "Bassa", fasciaMedia: "Media", fasciaAlta: "Alta",
                helperFermentati: "Nota: l'app calcola automaticamente 1 bottiglia di vino ogni 5 calici e 1 bottiglia/lattina di birra per consumazione.",
                risultatiFermentati: "Vini e Birre (Bottiglie)",
                copyFermentati: "VINI E BIRRE",
                lblVinoRosso: "Vino Rosso", lblVinoBianco: "Vino Bianco",
                lblBollicine: "Bollicine", lblBirra: "Birra",
                bottiglie: "bottiglie", bottigliaSing: "bottiglia",
                lblCalici: "calici", lblConsumazioni: "consumazioni"
            },
            en: {
                themeNight: "Dark", themeWedding: "Light",
                labelPctBevitori: "Alcohol drinkers percentage",
                lblAlcolici: "Alcoholic", lblAnalcolici: "Non-alcoholic",
                h2Mocktail: "Non-alcoholic Cocktails",
                descMocktail: "Mocktails and alcohol-free drinks for non-drinking guests",
                phSearchMocktail: "Search a mocktail (e.g. Virgin Mojito, Shirley Temple)...",
                alertMocktailNonTrovato: "Mocktail not found. Pick one from the dropdown or create it in the panel below (non-alcoholic ingredients only).",
                h2Fermentati: "Fermented Service",
                btnToggleFermentati: "▾ Show / Hide wine and beer",
                labelVinoRosso: "Red Wine glasses/person",
                labelVinoBianco: "White Wine glasses/person",
                labelBollicine: "Sparkling glasses/person",
                labelBirra: "Beer servings/person",
                labelFasciaFermentati: "Fermented Price Tier",
                fasciaBassa: "Low", fasciaMedia: "Medium", fasciaAlta: "High",
                helperFermentati: "Note: the app automatically calculates 1 wine bottle every 5 glasses and 1 bottle/can of beer per serving.",
                risultatiFermentati: "Wines & Beers (Bottles)",
                copyFermentati: "WINES & BEERS",
                lblVinoRosso: "Red Wine", lblVinoBianco: "White Wine",
                lblBollicine: "Sparkling Wine", lblBirra: "Beer",
                bottiglie: "bottles", bottigliaSing: "bottle",
                lblCalici: "glasses", lblConsumazioni: "servings"
            },
            es: {
                themeNight: "Oscuro", themeWedding: "Claro",
                labelPctBevitori: "Porcentaje bebedores (alcohol)",
                lblAlcolici: "Alcohólicos", lblAnalcolici: "Sin alcohol",
                h2Mocktail: "Cócteles Sin Alcohol",
                descMocktail: "Mocktails y bebidas sin alcohol para invitados no bebedores",
                phSearchMocktail: "Busca un mocktail (ej. Virgin Mojito, Shirley Temple)...",
                alertMocktailNonTrovato: "Mocktail no encontrado. Selecciónalo del menú o créalo abajo (solo ingredientes sin alcohol).",
                h2Fermentati: "Servicio de Fermentados",
                btnToggleFermentati: "▾ Mostrar / Ocultar vino y cerveza",
                labelVinoRosso: "Copas Vino Tinto/persona",
                labelVinoBianco: "Copas Vino Blanco/persona",
                labelBollicine: "Copas Espumoso/persona",
                labelBirra: "Consumiciones Cerveza/persona",
                labelFasciaFermentati: "Gama Precio Fermentados",
                fasciaBassa: "Baja", fasciaMedia: "Media", fasciaAlta: "Alta",
                helperFermentati: "Nota: la app calcula automáticamente 1 botella de vino cada 5 copas y 1 botella/lata de cerveza por consumición.",
                risultatiFermentati: "Vinos y Cervezas (Botellas)",
                copyFermentati: "VINOS Y CERVEZAS",
                lblVinoRosso: "Vino Tinto", lblVinoBianco: "Vino Blanco",
                lblBollicine: "Espumoso", lblBirra: "Cerveza",
                bottiglie: "botellas", bottigliaSing: "botella",
                lblCalici: "copas", lblConsumazioni: "consumiciones"
            },
            fr: {
                themeNight: "Sombre", themeWedding: "Clair",
                labelPctBevitori: "Pourcentage buveurs (alcool)",
                lblAlcolici: "Alcoolisés", lblAnalcolici: "Sans alcool",
                h2Mocktail: "Cocktails Sans Alcool",
                descMocktail: "Mocktails et boissons sans alcool pour invités non-buveurs",
                phSearchMocktail: "Cherche un mocktail (ex. Virgin Mojito, Shirley Temple)...",
                alertMocktailNonTrovato: "Mocktail introuvable. Sélectionne-le dans le menu ou crée-le ci-dessous (uniquement ingrédients sans alcool).",
                h2Fermentati: "Service Fermentés",
                btnToggleFermentati: "▾ Afficher / Masquer vin et bière",
                labelVinoRosso: "Verres Vin Rouge/personne",
                labelVinoBianco: "Verres Vin Blanc/personne",
                labelBollicine: "Verres Mousseux/personne",
                labelBirra: "Consommations Bière/personne",
                labelFasciaFermentati: "Gamme Prix Fermentés",
                fasciaBassa: "Basse", fasciaMedia: "Moyenne", fasciaAlta: "Haute",
                helperFermentati: "Note: l'app calcule automatiquement 1 bouteille de vin tous les 5 verres et 1 bouteille/canette de bière par consommation.",
                risultatiFermentati: "Vins et Bières (Bouteilles)",
                copyFermentati: "VINS ET BIÈRES",
                lblVinoRosso: "Vin Rouge", lblVinoBianco: "Vin Blanc",
                lblBollicine: "Mousseux", lblBirra: "Bière",
                bottiglie: "bouteilles", bottigliaSing: "bouteille",
                lblCalici: "verres", lblConsumazioni: "consommations"
            },
            de: {
                themeNight: "Dunkel", themeWedding: "Hell",
                labelPctBevitori: "Anteil Alkoholtrinker",
                lblAlcolici: "Alkoholisch", lblAnalcolici: "Alkoholfrei",
                h2Mocktail: "Alkoholfreie Cocktails",
                descMocktail: "Mocktails und alkoholfreie Drinks für nicht trinkende Gäste",
                phSearchMocktail: "Suche einen Mocktail (z.B. Virgin Mojito, Shirley Temple)...",
                alertMocktailNonTrovato: "Mocktail nicht gefunden. Aus dem Dropdown wählen oder unten anlegen (nur alkoholfreie Zutaten).",
                h2Fermentati: "Gärungsservice",
                btnToggleFermentati: "▾ Wein und Bier ein-/ausblenden",
                labelVinoRosso: "Gläser Rotwein/Person",
                labelVinoBianco: "Gläser Weißwein/Person",
                labelBollicine: "Gläser Schaumwein/Person",
                labelBirra: "Bierportionen/Person",
                labelFasciaFermentati: "Preisklasse Gärungen",
                fasciaBassa: "Niedrig", fasciaMedia: "Mittel", fasciaAlta: "Hoch",
                helperFermentati: "Hinweis: Die App rechnet automatisch 1 Flasche Wein pro 5 Gläser und 1 Flasche/Dose Bier pro Portion.",
                risultatiFermentati: "Weine und Biere (Flaschen)",
                copyFermentati: "WEINE UND BIERE",
                lblVinoRosso: "Rotwein", lblVinoBianco: "Weißwein",
                lblBollicine: "Schaumwein", lblBirra: "Bier",
                bottiglie: "Flaschen", bottigliaSing: "Flasche",
                lblCalici: "Gläser", lblConsumazioni: "Getränke"
            },
            pt: {
                themeNight: "Escuro", themeWedding: "Claro",
                labelPctBevitori: "Percentagem bebedores (álcool)",
                lblAlcolici: "Alcoólicos", lblAnalcolici: "Sem álcool",
                h2Mocktail: "Cocktails Sem Álcool",
                descMocktail: "Mocktails e bebidas sem álcool para convidados não bebedores",
                phSearchMocktail: "Procure um mocktail (ex. Virgin Mojito, Shirley Temple)...",
                alertMocktailNonTrovato: "Mocktail não encontrado. Escolha no menu ou crie abaixo (apenas ingredientes sem álcool).",
                h2Fermentati: "Serviço Fermentados",
                btnToggleFermentati: "▾ Mostrar / Ocultar vinho e cerveja",
                labelVinoRosso: "Copos Vinho Tinto/pessoa",
                labelVinoBianco: "Copos Vinho Branco/pessoa",
                labelBollicine: "Copos Espumante/pessoa",
                labelBirra: "Consumos Cerveja/pessoa",
                labelFasciaFermentati: "Gama Preço Fermentados",
                fasciaBassa: "Baixa", fasciaMedia: "Média", fasciaAlta: "Alta",
                helperFermentati: "Nota: a app calcula automaticamente 1 garrafa de vinho a cada 5 copos e 1 garrafa/lata de cerveja por consumo.",
                risultatiFermentati: "Vinhos e Cervejas (Garrafas)",
                copyFermentati: "VINHOS E CERVEJAS",
                lblVinoRosso: "Vinho Tinto", lblVinoBianco: "Vinho Branco",
                lblBollicine: "Espumante", lblBirra: "Cerveja",
                bottiglie: "garrafas", bottigliaSing: "garrafa",
                lblCalici: "taças", lblConsumazioni: "consumos"
            },
            nl: {
                themeNight: "Donker", themeWedding: "Licht",
                labelPctBevitori: "Percentage alcoholdrinkers",
                lblAlcolici: "Alcoholisch", lblAnalcolici: "Alcoholvrij",
                h2Mocktail: "Alcoholvrije Cocktails",
                descMocktail: "Mocktails en alcoholvrije drankjes voor niet-drinkende gasten",
                phSearchMocktail: "Zoek een mocktail (bv. Virgin Mojito, Shirley Temple)...",
                alertMocktailNonTrovato: "Mocktail niet gevonden. Kies uit het menu of maak hieronder een aan (alleen alcoholvrije ingrediënten).",
                h2Fermentati: "Gefermenteerd Service",
                btnToggleFermentati: "▾ Wijn en bier tonen/verbergen",
                labelVinoRosso: "Glazen Rode Wijn/persoon",
                labelVinoBianco: "Glazen Witte Wijn/persoon",
                labelBollicine: "Glazen Mousserend/persoon",
                labelBirra: "Bier porties/persoon",
                labelFasciaFermentati: "Prijscategorie Gefermenteerd",
                fasciaBassa: "Laag", fasciaMedia: "Middel", fasciaAlta: "Hoog",
                helperFermentati: "Let op: de app berekent automatisch 1 fles wijn per 5 glazen en 1 fles/blikje bier per portie.",
                risultatiFermentati: "Wijnen en Bieren (Flessen)",
                copyFermentati: "WIJNEN EN BIEREN",
                lblVinoRosso: "Rode Wijn", lblVinoBianco: "Witte Wijn",
                lblBollicine: "Mousserende Wijn", lblBirra: "Bier",
                bottiglie: "flessen", bottigliaSing: "fles",
                lblCalici: "glazen", lblConsumazioni: "consumpties"
            }
        };
        Object.keys(_extraI18n).forEach(lg => {
            if (translations[lg]) Object.assign(translations[lg], _extraI18n[lg]);
        });

        /* ════════════════════════════════════════════════════════════
           Estensioni i18n round 2: stringhe ancora hardcoded
           (label nazione/fascia, opzioni, budget box, footer, placeholder
           creator, toggle generico sezione).
           ════════════════════════════════════════════════════════════ */
        const _extraI18n2 = {
            it: {
                btnToggleSezione: "▾ Mostra / Nascondi",
                labelNazione: "Nazione Evento", labelFascia: "Fascia di Prezzo",
                optBassa: "Bassa · Prodotti Economici",
                optMedia: "Media · Prodotti Standard",
                optAlta: "Alta · Prodotti Premium",
                budgetLabel: "Budget Stimato Materie Prime",
                budgetFasciaWord: "fascia",
                phNomeCocktail: "Nome del cocktail",
                phIngrediente: "Ingrediente",
                phMl: "ml",
                h3NuovoCocktail: "Nuovo Cocktail",
                h3BottigliaShot: "Bottiglia Shot",
                phNomeShot: "Nome (es. Limoncello)",
                footerContatti: "Contatti",
                footerRights: "© 2026 Samuele Racca · Tutti i diritti riservati",
                
                
                
                
                btnSuggerisci: "Suggerisci un menu",
                risultatiGarnish: "Da comprare a parte",
                garnishSub: "Guarnizioni e ingredienti di preparazione (senza dose): procurali a parte",
                copyGarnish: "DA COMPRARE A PARTE",
                tipSuggerisci: "Scegli il tipo di evento e l'app compila in automatico un menu di partenza (cocktail, mocktail, shot e vini/birre). Potrai poi modificarlo a piacere.",
                sugTitolo: "Suggerisci un menu",
                sugSub: "Per che tipo di evento? Compileremo un menu di partenza, poi potrai modificarlo.",
                sugMatrimonio: "Matrimonio",
                sugCompleanno: "Compleanno",
                sugAperitivo: "Aperitivo",
                sugSerata: "Serata / Festa",
                sugAziendale: "Evento aziendale",
                sugAnnulla: "Annulla",
                sugConferma: "Questo sostituirà il menu attuale. Continuare?",
                sugFatto: "Menu suggerito applicato. Modificalo a piacere.",
                tipDrink: "Quanti cocktail berrà in media un ospite. Indicativamente: aperitivo ~2, festa serale lunga ~4. Vale solo per gli ospiti che bevono alcolici.",
                tipShot: "Numero medio di shottini per ospite. Lascialo a 0 se non servi shot.",
                tipScarto: "Scorta extra aggiunta alle quantità per non rimanere a secco. 10-15% è il valore consigliato.",
                tipPct: "Quota di ospiti che beve alcolici. Il resto riceve mocktail e analcolici. Sposta il cursore per dividere automaticamente cocktail alcolici e analcolici.",
                tipFascia: "Qualità/prezzo dei prodotti usati per la stima: Bassa = economici, Media = standard, Alta = premium. Cambia i costi unitari, non le quantità.",
                tipFermentati: "Indica per ogni ospite quanti calici di vino/bollicine e quante consumazioni di birra. L'app calcola le bottiglie (vino 75 cl ≈ 5 calici) e le aggiunge alla lista con i relativi costi.",
                tipFrequenza: "La frequenza (da 1 a 5) indica quanto spesso quel drink verrà scelto rispetto agli altri: 5 = molto gettonato, 1 = di nicchia. L'app distribuisce le quantità totali in base a questi pesi relativi.",
                lblFreq: "Freq.", lblRimuovi: "× Rimuovi", alertNoListPrint: "Genera prima la lista della spesa, poi prova a stampare."
            },
            en: {
                btnToggleSezione: "▾ Show / Hide",
                labelNazione: "Event Country", labelFascia: "Price Tier",
                optBassa: "Low · Budget Products",
                optMedia: "Medium · Standard Products",
                optAlta: "High · Premium Products",
                budgetLabel: "Estimated Raw Materials Budget",
                budgetFasciaWord: "tier",
                phNomeCocktail: "Cocktail name",
                phIngrediente: "Ingredient",
                phMl: "ml",
                h3NuovoCocktail: "New Cocktail",
                h3BottigliaShot: "Shot Bottle",
                phNomeShot: "Name (e.g. Limoncello)",
                footerContatti: "Contact",
                footerRights: "© 2026 Samuele Racca · All rights reserved",
                
                
                
                
                btnSuggerisci: "Suggest a menu",
                risultatiGarnish: "Buy separately",
                garnishSub: "Garnishes and prep ingredients (no measure): get them separately",
                copyGarnish: "BUY SEPARATELY",
                tipSuggerisci: "Pick the type of event and the app fills in a starting menu for you (cocktails, mocktails, shots and wines/beers). You can fine-tune it afterwards.",
                sugTitolo: "Suggest a menu",
                sugSub: "What kind of event? We'll build a starting menu that you can then adjust.",
                sugMatrimonio: "Wedding",
                sugCompleanno: "Birthday",
                sugAperitivo: "Aperitivo",
                sugSerata: "Night / Party",
                sugAziendale: "Corporate event",
                sugAnnulla: "Cancel",
                sugConferma: "This will replace your current menu. Continue?",
                sugFatto: "Suggested menu applied. Tweak it as you like.",
                tipDrink: "How many cocktails an average guest will drink. Rough guide: aperitivo ~2, long evening party ~4. Counts only guests who drink alcohol.",
                tipShot: "Average number of shots per guest. Leave at 0 if you don't serve shots.",
                tipScarto: "Extra buffer added to the quantities so you don't run out. 10-15% is the recommended value.",
                tipPct: "Share of guests who drink alcohol. The rest get mocktails and soft drinks. Move the slider to split alcoholic and non-alcoholic cocktails automatically.",
                tipFascia: "Quality/price of the products used for the estimate: Low = budget, Medium = standard, High = premium. Changes unit costs, not quantities.",
                tipFermentati: "Set how many glasses of wine/sparkling and how many beers per guest. The app works out the bottles (75 cl wine ≈ 5 glasses) and adds them to the list with their costs.",
                tipFrequenza: "Frequency (1 to 5) sets how often that drink is chosen compared to the others: 5 = very popular, 1 = niche. The app splits the total quantities by these relative weights.",
                lblFreq: "Freq.", lblRimuovi: "× Remove", alertNoListPrint: "Generate the shopping list first, then try to print."
            },
            es: {
                btnToggleSezione: "▾ Mostrar / Ocultar",
                labelNazione: "País del Evento", labelFascia: "Gama de Precio",
                optBassa: "Baja · Productos Económicos",
                optMedia: "Media · Productos Estándar",
                optAlta: "Alta · Productos Premium",
                budgetLabel: "Presupuesto Estimado Materias Primas",
                budgetFasciaWord: "gama",
                phNomeCocktail: "Nombre del cóctel",
                phIngrediente: "Ingrediente",
                phMl: "ml",
                h3NuovoCocktail: "Nuevo Cóctel",
                h3BottigliaShot: "Botella de Chupito",
                phNomeShot: "Nombre (ej. Limoncello)",
                footerContatti: "Contacto",
                footerRights: "© 2026 Samuele Racca · Todos los derechos reservados",
                
                
                
                
                btnSuggerisci: "Sugerir un menú",
                risultatiGarnish: "Comprar aparte",
                garnishSub: "Guarniciones e ingredientes de preparación (sin dosis): consíguelos aparte",
                copyGarnish: "COMPRAR APARTE",
                tipSuggerisci: "Elige el tipo de evento y la app crea un menú inicial (cócteles, mocktails, chupitos y vinos/cervezas). Luego podrás modificarlo.",
                sugTitolo: "Sugerir un menú",
                sugSub: "¿Qué tipo de evento? Crearemos un menú inicial que luego podrás ajustar.",
                sugMatrimonio: "Boda",
                sugCompleanno: "Cumpleaños",
                sugAperitivo: "Aperitivo",
                sugSerata: "Fiesta / Noche",
                sugAziendale: "Evento de empresa",
                sugAnnulla: "Cancelar",
                sugConferma: "Esto reemplazará el menú actual. ¿Continuar?",
                sugFatto: "Menú sugerido aplicado. Modifícalo a tu gusto.",
                tipDrink: "Cuántos cócteles beberá de media un invitado. Orientativo: aperitivo ~2, fiesta larga ~4. Solo para los invitados que beben alcohol.",
                tipShot: "Número medio de chupitos por invitado. Déjalo en 0 si no sirves chupitos.",
                tipScarto: "Reserva extra añadida a las cantidades para no quedarte corto. 10-15% es el valor recomendado.",
                tipPct: "Proporción de invitados que beben alcohol. El resto recibe mocktails y refrescos. Mueve el control para dividir automáticamente cócteles con y sin alcohol.",
                tipFascia: "Calidad/precio de los productos usados para la estimación: Baja = económicos, Media = estándar, Alta = premium. Cambia los costes unitarios, no las cantidades.",
                tipFermentati: "Indica cuántas copas de vino/espumoso y cuántas cervezas por invitado. La app calcula las botellas (vino 75 cl ≈ 5 copas) y las añade a la lista con sus costes.",
                tipFrequenza: "La frecuencia (de 1 a 5) indica con qué frecuencia se elige esa bebida frente a las demás: 5 = muy pedida, 1 = de nicho. La app reparte las cantidades totales según estos pesos relativos.",
                lblFreq: "Frec.", lblRimuovi: "× Quitar", alertNoListPrint: "Genera primero la lista de la compra, luego intenta imprimir."
            },
            fr: {
                btnToggleSezione: "▾ Afficher / Masquer",
                labelNazione: "Pays de l'Évènement", labelFascia: "Gamme de Prix",
                optBassa: "Basse · Produits Économiques",
                optMedia: "Moyenne · Produits Standard",
                optAlta: "Haute · Produits Premium",
                budgetLabel: "Budget Estimé Matières Premières",
                budgetFasciaWord: "gamme",
                phNomeCocktail: "Nom du cocktail",
                phIngrediente: "Ingrédient",
                phMl: "ml",
                h3NuovoCocktail: "Nouveau Cocktail",
                h3BottigliaShot: "Bouteille Shot",
                phNomeShot: "Nom (ex. Limoncello)",
                footerContatti: "Contact",
                footerRights: "© 2026 Samuele Racca · Tous droits réservés",
                
                
                
                
                btnSuggerisci: "Suggérer un menu",
                risultatiGarnish: "À acheter à part",
                garnishSub: "Garnitures et ingrédients de préparation (sans dose) : à prévoir séparément",
                copyGarnish: "À ACHETER À PART",
                tipSuggerisci: "Choisis le type d'événement et l'app crée un menu de départ (cocktails, mocktails, shots et vins/bières). Tu pourras ensuite le modifier.",
                sugTitolo: "Suggérer un menu",
                sugSub: "Pour quel type d'événement ? Nous créons un menu de départ que tu pourras ajuster.",
                sugMatrimonio: "Mariage",
                sugCompleanno: "Anniversaire",
                sugAperitivo: "Apéritif",
                sugSerata: "Soirée / Fête",
                sugAziendale: "Événement d'entreprise",
                sugAnnulla: "Annuler",
                sugConferma: "Cela remplacera le menu actuel. Continuer ?",
                sugFatto: "Menu suggéré appliqué. Modifie-le à ta guise.",
                tipDrink: "Combien de cocktails boira en moyenne un invité. Indicatif : apéritif ~2, longue soirée ~4. Concerne seulement les invités qui boivent de l'alcool.",
                tipShot: "Nombre moyen de shots par invité. Laisse 0 si tu ne sers pas de shots.",
                tipScarto: "Marge supplémentaire ajoutée aux quantités pour ne pas être à court. 10-15 % est la valeur conseillée.",
                tipPct: "Part des invités qui boivent de l'alcool. Les autres reçoivent des mocktails et softs. Déplace le curseur pour répartir automatiquement cocktails alcoolisés et sans alcool.",
                tipFascia: "Qualité/prix des produits utilisés pour l'estimation : Basse = économiques, Moyenne = standard, Haute = premium. Change les coûts unitaires, pas les quantités.",
                tipFermentati: "Indique par invité combien de verres de vin/bulles et combien de bières. L'app calcule les bouteilles (vin 75 cl ≈ 5 verres) et les ajoute à la liste avec leurs coûts.",
                tipFrequenza: "La fréquence (de 1 à 5) indique à quel point cette boisson est choisie par rapport aux autres : 5 = très demandée, 1 = de niche. L'app répartit les quantités totales selon ces poids relatifs.",
                lblFreq: "Fréq.", lblRimuovi: "× Retirer", alertNoListPrint: "Génère d'abord la liste de courses, puis essaie d'imprimer."
            },
            de: {
                btnToggleSezione: "▾ Ein-/Ausblenden",
                labelNazione: "Veranstaltungsland", labelFascia: "Preisklasse",
                optBassa: "Niedrig · Günstige Produkte",
                optMedia: "Mittel · Standard-Produkte",
                optAlta: "Hoch · Premium-Produkte",
                budgetLabel: "Geschätztes Rohstoff-Budget",
                budgetFasciaWord: "Klasse",
                phNomeCocktail: "Cocktail-Name",
                phIngrediente: "Zutat",
                phMl: "ml",
                h3NuovoCocktail: "Neuer Cocktail",
                h3BottigliaShot: "Shot-Flasche",
                phNomeShot: "Name (z.B. Limoncello)",
                footerContatti: "Kontakt",
                footerRights: "© 2026 Samuele Racca · Alle Rechte vorbehalten",
                
                
                
                
                btnSuggerisci: "Menü vorschlagen",
                risultatiGarnish: "Separat kaufen",
                garnishSub: "Garnituren und Zubereitungszutaten (ohne Menge): separat besorgen",
                copyGarnish: "SEPARAT KAUFEN",
                tipSuggerisci: "Wähle die Art der Veranstaltung und die App erstellt ein Start-Menü (Cocktails, Mocktails, Shots und Wein/Bier). Du kannst es danach anpassen.",
                sugTitolo: "Menü vorschlagen",
                sugSub: "Welche Art von Event? Wir erstellen ein Start-Menü, das du anpassen kannst.",
                sugMatrimonio: "Hochzeit",
                sugCompleanno: "Geburtstag",
                sugAperitivo: "Aperitif",
                sugSerata: "Party / Abend",
                sugAziendale: "Firmenevent",
                sugAnnulla: "Abbrechen",
                sugConferma: "Dies ersetzt dein aktuelles Menü. Fortfahren?",
                sugFatto: "Vorgeschlagenes Menü übernommen. Passe es nach Belieben an.",
                tipDrink: "Wie viele Cocktails ein Gast im Schnitt trinkt. Richtwert: Aperitif ~2, lange Party ~4. Gilt nur für Gäste, die Alkohol trinken.",
                tipShot: "Durchschnittliche Anzahl Shots pro Gast. Auf 0 lassen, wenn du keine Shots servierst.",
                tipScarto: "Zusätzliche Reserve auf die Mengen, damit nichts ausgeht. 10-15 % ist der empfohlene Wert.",
                tipPct: "Anteil der Gäste, die Alkohol trinken. Der Rest bekommt Mocktails und Softdrinks. Bewege den Regler, um alkoholische und alkoholfreie Cocktails automatisch aufzuteilen.",
                tipFascia: "Qualität/Preis der für die Schätzung verwendeten Produkte: Niedrig = günstig, Mittel = Standard, Hoch = Premium. Ändert die Stückkosten, nicht die Mengen.",
                tipFermentati: "Gib pro Gast an, wie viele Gläser Wein/Sekt und wie viele Bier. Die App berechnet die Flaschen (75-cl-Wein ≈ 5 Gläser) und fügt sie mit Kosten zur Liste hinzu.",
                tipFrequenza: "Die Häufigkeit (1 bis 5) gibt an, wie oft dieses Getränk im Vergleich zu den anderen gewählt wird: 5 = sehr beliebt, 1 = Nische. Die App verteilt die Gesamtmengen nach diesen relativen Gewichten.",
                lblFreq: "Häuf.", lblRimuovi: "× Entfernen", alertNoListPrint: "Erstelle zuerst die Einkaufsliste, dann versuche zu drucken."
            },
            pt: {
                btnToggleSezione: "▾ Mostrar / Ocultar",
                labelNazione: "País do Evento", labelFascia: "Gama de Preço",
                optBassa: "Baixa · Produtos Económicos",
                optMedia: "Média · Produtos Standard",
                optAlta: "Alta · Produtos Premium",
                budgetLabel: "Orçamento Estimado Matérias-Primas",
                budgetFasciaWord: "gama",
                phNomeCocktail: "Nome do cocktail",
                phIngrediente: "Ingrediente",
                phMl: "ml",
                h3NuovoCocktail: "Novo Cocktail",
                h3BottigliaShot: "Garrafa Shot",
                phNomeShot: "Nome (ex. Limoncello)",
                footerContatti: "Contacto",
                footerRights: "© 2026 Samuele Racca · Todos os direitos reservados",
                
                
                
                
                btnSuggerisci: "Sugerir um menu",
                risultatiGarnish: "Comprar à parte",
                garnishSub: "Guarnições e ingredientes de preparação (sem dose): compra-os à parte",
                copyGarnish: "COMPRAR À PARTE",
                tipSuggerisci: "Escolhe o tipo de evento e a app cria um menu inicial (cocktails, mocktails, shots e vinhos/cervejas). Depois podes modificá-lo.",
                sugTitolo: "Sugerir um menu",
                sugSub: "Que tipo de evento? Criamos um menu inicial que podes depois ajustar.",
                sugMatrimonio: "Casamento",
                sugCompleanno: "Aniversário",
                sugAperitivo: "Aperitivo",
                sugSerata: "Festa / Noite",
                sugAziendale: "Evento de empresa",
                sugAnnulla: "Cancelar",
                sugConferma: "Isto vai substituir o menu atual. Continuar?",
                sugFatto: "Menu sugerido aplicado. Modifica-o à vontade.",
                tipDrink: "Quantos cocktails um convidado bebe em média. Orientação: aperitivo ~2, festa longa ~4. Conta só os convidados que bebem álcool.",
                tipShot: "Número médio de shots por convidado. Deixa em 0 se não serves shots.",
                tipScarto: "Reserva extra somada às quantidades para não ficares sem. 10-15% é o valor recomendado.",
                tipPct: "Percentagem de convidados que bebem álcool. Os restantes recebem mocktails e refrigerantes. Move o cursor para dividir automaticamente cocktails com e sem álcool.",
                tipFascia: "Qualidade/preço dos produtos usados na estimativa: Baixa = económicos, Média = padrão, Alta = premium. Altera os custos unitários, não as quantidades.",
                tipFermentati: "Indica por convidado quantos copos de vinho/espumante e quantas cervejas. A app calcula as garrafas (vinho 75 cl ≈ 5 copos) e adiciona-as à lista com os custos.",
                tipFrequenza: "A frequência (de 1 a 5) indica com que frequência essa bebida é escolhida face às outras: 5 = muito pedida, 1 = de nicho. A app distribui as quantidades totais segundo estes pesos relativos.",
                lblFreq: "Freq.", lblRimuovi: "× Remover", alertNoListPrint: "Gera primeiro a lista de compras, depois tenta imprimir."
            },
            nl: {
                btnToggleSezione: "▾ Tonen / Verbergen",
                labelNazione: "Land Evenement", labelFascia: "Prijscategorie",
                optBassa: "Laag · Voordelige producten",
                optMedia: "Middel · Standaardproducten",
                optAlta: "Hoog · Premium producten",
                budgetLabel: "Geschat Budget Grondstoffen",
                budgetFasciaWord: "categorie",
                phNomeCocktail: "Cocktailnaam",
                phIngrediente: "Ingrediënt",
                phMl: "ml",
                h3NuovoCocktail: "Nieuwe Cocktail",
                h3BottigliaShot: "Shot Fles",
                phNomeShot: "Naam (bv. Limoncello)",
                footerContatti: "Contact",
                footerRights: "© 2026 Samuele Racca · Alle rechten voorbehouden",
                
                
                
                
                btnSuggerisci: "Menu voorstellen",
                risultatiGarnish: "Apart kopen",
                garnishSub: "Garnituren en bereidingsingrediënten (zonder maat): apart aanschaffen",
                copyGarnish: "APART KOPEN",
                tipSuggerisci: "Kies het type evenement en de app stelt een startmenu samen (cocktails, mocktails, shots en wijn/bier). Je kunt het daarna aanpassen.",
                sugTitolo: "Menu voorstellen",
                sugSub: "Wat voor evenement? We maken een startmenu dat je daarna kunt aanpassen.",
                sugMatrimonio: "Bruiloft",
                sugCompleanno: "Verjaardag",
                sugAperitivo: "Aperitief",
                sugSerata: "Feest / Avond",
                sugAziendale: "Bedrijfsevenement",
                sugAnnulla: "Annuleren",
                sugConferma: "Dit vervangt je huidige menu. Doorgaan?",
                sugFatto: "Voorgesteld menu toegepast. Pas het aan naar wens.",
                tipDrink: "Hoeveel cocktails een gast gemiddeld drinkt. Richtlijn: aperitief ~2, lang avondfeest ~4. Geldt alleen voor gasten die alcohol drinken.",
                tipShot: "Gemiddeld aantal shots per gast. Laat op 0 als je geen shots schenkt.",
                tipScarto: "Extra marge bovenop de hoeveelheden zodat je niet zonder komt. 10-15% is de aanbevolen waarde.",
                tipPct: "Aandeel gasten dat alcohol drinkt. De rest krijgt mocktails en frisdrank. Verschuif de schuifregelaar om alcoholische en niet-alcoholische cocktails automatisch te verdelen.",
                tipFascia: "Kwaliteit/prijs van de gebruikte producten voor de schatting: Laag = goedkoop, Middel = standaard, Hoog = premium. Verandert de stukkosten, niet de hoeveelheden.",
                tipFermentati: "Geef per gast aan hoeveel glazen wijn/bubbels en hoeveel bier. De app berekent de flessen (75 cl wijn ≈ 5 glazen) en voegt ze met kosten toe aan de lijst.",
                tipFrequenza: "De frequentie (1 tot 5) geeft aan hoe vaak die drank wordt gekozen t.o.v. de andere: 5 = erg populair, 1 = niche. De app verdeelt de totale hoeveelheden op basis van deze relatieve gewichten.",
                lblFreq: "Freq.", lblRimuovi: "× Verwijderen", alertNoListPrint: "Genereer eerst de boodschappenlijst, probeer dan af te drukken."
            }
        };
        Object.keys(_extraI18n2).forEach(lg => {
            if (translations[lg]) Object.assign(translations[lg], _extraI18n2[lg]);
        });

        /* ── i18n Configuratore Guidato (v1.4) — 7 lingue ── */
        const _extraI18nCfg = {
            it: {
                cfgWelcomeEyebrow: "Barman PRO", cfgWelcomeTitle: "Come vuoi preparare l'evento?",
                cfgWelcomeSub: "Scegli come iniziare. Potrai sempre cambiare ogni dettaglio dopo.",
                cfgChoiceGuidedTitle: "Configurazione guidata", cfgChoiceGuidedDesc: "Rispondi a poche domande semplici: l'app compila parametri e menu di partenza.",
                cfgChoiceManualTitle: "Creazione manuale", cfgChoiceManualDesc: "Vai diretto ai parametri e costruisci tutto a mano, come sempre.",
                cfgLaunchTitle: "Configurazione guidata", cfgLaunchSub: "Rispondi a poche domande, compiliamo noi parametri e menu",
                cfgBack: "Indietro", cfgNext: "Avanti", cfgApply: "Applica configurazione", cfgSkip: "Salta", cfgYes: "Sì", cfgNo: "No",
                cfgEyName: "Nome evento", cfgEyType: "Tipo di evento", cfgEyGuests: "Ospiti", cfgEyDuration: "Durata", cfgEyIntensity: "Consumo",
                cfgEyDrinkers: "Bevitori", cfgEyMocktail: "Analcolici", cfgEyShot: "Shot", cfgEyFerm: "Vini e birre", cfgEyPrice: "Budget",
                cfgEyMargin: "Sicurezza", cfgEyStyle: "Stile menu", cfgEySummary: "Riepilogo",
                cfgNomeQ: "Che evento è?", cfgNomeDesc: "Dai un nome all'evento per ritrovarlo facilmente. È facoltativo.", cfgNomePh: "Es. Matrimonio Anna & Luca",
                cfgTipoQ: "Che tipo di evento?", cfgTipoDesc: "Scegliamo da qui un menu di partenza adatto.",
                cfgTipoMatrimonio: "Matrimonio", cfgTipoMatrimonioSub: "Elegante, bollicine e classici",
                cfgTipoCompleanno: "Compleanno", cfgTipoCompleannoSub: "Festoso, drink popolari",
                cfgTipoAperitivo: "Aperitivo", cfgTipoAperitivoSub: "Spritz e grandi classici",
                cfgTipoSerata: "Serata / Festa", cfgTipoSerataSub: "Long drink e shot",
                cfgTipoAziendale: "Evento aziendale", cfgTipoAziendaleSub: "Sobrio e curato",
                cfgOspitiQ: "Quanti ospiti previsti?", cfgOspitiDesc: "Una stima va benissimo, la puoi correggere dopo.", cfgOspitiUnit: "ospiti previsti",
                cfgDurataQ: "Quanto dura l'evento?", cfgDurataDesc: "Più lunga è la serata, più consumazioni a testa.",
                cfgDurBreve: "Breve", cfgDurBreveSub: "Fino a 2 ore", cfgDurMedia: "Media", cfgDurMediaSub: "3-4 ore", cfgDurLunga: "Lunga", cfgDurLungaSub: "5 ore o più",
                cfgIntQ: "Quanto si beve?", cfgIntDesc: "Il ritmo medio di consumo degli ospiti.",
                cfgIntLeggera: "Leggero", cfgIntLeggeraSub: "Brindisi e poco più", cfgIntMedia: "Medio", cfgIntMediaSub: "Il ritmo tipico", cfgIntAlta: "Sostenuto", cfgIntAltaSub: "Si beve parecchio",
                cfgPctQ: "Quanti bevono alcolici?", cfgPctDesc: "Il resto degli ospiti riceverà mocktail e analcolici.",
                cfgPctMore: "Sposta il cursore per dividere ospiti che bevono alcolici e ospiti analcolici. L'app distribuisce automaticamente le quantità tra cocktail e mocktail.",
                cfgMockQ: "Servire anche mocktail?", cfgMockDesc: "Drink analcolici per chi non beve alcol o guida.",
                cfgShotQ: "Vuoi servire shot?", cfgShotDesc: "Shottini e amari serviti in piccola dose.",
                cfgFermQ: "Anche vino e birra?", cfgFermDesc: "Servizio di vini, bollicine e birra a parte rispetto ai cocktail.",
                cfgFasciaQ: "Che budget per i prodotti?", cfgFasciaDesc: "Incide sul costo stimato, non sulle quantità.",
                cfgFasciaBassa: "Economico", cfgFasciaBassaSub: "Prodotti base", cfgFasciaMedia: "Standard", cfgFasciaMediaSub: "Buon rapporto qualità-prezzo", cfgFasciaAlta: "Premium", cfgFasciaAltaSub: "Prodotti di alta gamma",
                cfgScartoQ: "Quanto margine di scorta?", cfgScartoDesc: "Scorta extra per non rimanere a secco.", cfgScartoMore: "Una scorta del 10-15% è il valore consigliato: copre gli imprevisti senza sprechi eccessivi.",
                cfgStileQ: "Quanto ricco il menu?", cfgStileDesc: "Quante proposte mettere nel menu di partenza.",
                cfgStileEssenziale: "Essenziale", cfgStileEssenzialeSub: "Pochi drink, semplice", cfgStileClassico: "Classico", cfgStileClassicoSub: "La scelta equilibrata", cfgStileRicco: "Ricco", cfgStileRiccoSub: "Più varietà",
                cfgSummaryQ: "Tutto pronto", cfgSummaryDesc: "Controlla e applica: compiliamo parametri e menu di partenza.",
                cfgSumNome: "Evento", cfgSumTipo: "Tipo", cfgSumOspiti: "Ospiti", cfgSumConsumo: "Consumo", cfgSumPct: "Bevitori alcolici", cfgSumFascia: "Budget", cfgSumMenu: "Menu iniziale", cfgSumNomeVuoto: "Senza nome",
                cfgUnitCocktail: "cocktail", cfgUnitMocktail: "mocktail", cfgUnitShot: "shot", cfgUnitNone: "nessuna voce",
                cfgReadGuests: "ospiti", cfgReadDrinkEach: "drink a testa", cfgReadPrudent: "Stima prudente: il margine di sicurezza è già incluso nelle quantità.",
                cfgDone: "Configurazione applicata. Ecco il tuo menu di partenza."
            },
            en: {
                cfgWelcomeEyebrow: "Barman PRO", cfgWelcomeTitle: "How do you want to plan the event?",
                cfgWelcomeSub: "Choose how to start. You can change every detail later.",
                cfgChoiceGuidedTitle: "Guided setup", cfgChoiceGuidedDesc: "Answer a few simple questions: the app fills in parameters and a starting menu.",
                cfgChoiceManualTitle: "Manual setup", cfgChoiceManualDesc: "Go straight to the parameters and build everything by hand, as usual.",
                cfgLaunchTitle: "Guided setup", cfgLaunchSub: "Answer a few questions, we fill in parameters and menu",
                cfgBack: "Back", cfgNext: "Next", cfgApply: "Apply setup", cfgSkip: "Skip", cfgYes: "Yes", cfgNo: "No",
                cfgEyName: "Event name", cfgEyType: "Event type", cfgEyGuests: "Guests", cfgEyDuration: "Duration", cfgEyIntensity: "Drinking",
                cfgEyDrinkers: "Drinkers", cfgEyMocktail: "Soft drinks", cfgEyShot: "Shots", cfgEyFerm: "Wine & beer", cfgEyPrice: "Budget",
                cfgEyMargin: "Safety", cfgEyStyle: "Menu style", cfgEySummary: "Summary",
                cfgNomeQ: "What's the event?", cfgNomeDesc: "Name the event so you can find it easily. Optional.", cfgNomePh: "e.g. Anna & Luca Wedding",
                cfgTipoQ: "What kind of event?", cfgTipoDesc: "We'll pick a fitting starting menu from this.",
                cfgTipoMatrimonio: "Wedding", cfgTipoMatrimonioSub: "Elegant, bubbles and classics",
                cfgTipoCompleanno: "Birthday", cfgTipoCompleannoSub: "Festive, popular drinks",
                cfgTipoAperitivo: "Aperitif", cfgTipoAperitivoSub: "Spritz and great classics",
                cfgTipoSerata: "Night / Party", cfgTipoSerataSub: "Long drinks and shots",
                cfgTipoAziendale: "Corporate event", cfgTipoAziendaleSub: "Refined and sober",
                cfgOspitiQ: "How many guests?", cfgOspitiDesc: "An estimate is fine, you can adjust it later.", cfgOspitiUnit: "expected guests",
                cfgDurataQ: "How long is the event?", cfgDurataDesc: "The longer the night, the more drinks per head.",
                cfgDurBreve: "Short", cfgDurBreveSub: "Up to 2 hours", cfgDurMedia: "Medium", cfgDurMediaSub: "3-4 hours", cfgDurLunga: "Long", cfgDurLungaSub: "5 hours or more",
                cfgIntQ: "How much drinking?", cfgIntDesc: "The average pace of your guests.",
                cfgIntLeggera: "Light", cfgIntLeggeraSub: "A toast and little more", cfgIntMedia: "Medium", cfgIntMediaSub: "The typical pace", cfgIntAlta: "Heavy", cfgIntAltaSub: "Plenty of drinking",
                cfgPctQ: "How many drink alcohol?", cfgPctDesc: "The rest of the guests get mocktails and soft drinks.",
                cfgPctMore: "Move the slider to split alcohol drinkers from non-drinkers. The app automatically distributes quantities between cocktails and mocktails.",
                cfgMockQ: "Serve mocktails too?", cfgMockDesc: "Alcohol-free drinks for non-drinkers or drivers.",
                cfgShotQ: "Want to serve shots?", cfgShotDesc: "Shots and bitters served in small doses.",
                cfgFermQ: "Wine and beer too?", cfgFermDesc: "Wine, sparkling and beer served alongside the cocktails.",
                cfgFasciaQ: "What product budget?", cfgFasciaDesc: "Affects the estimated cost, not the quantities.",
                cfgFasciaBassa: "Budget", cfgFasciaBassaSub: "Basic products", cfgFasciaMedia: "Standard", cfgFasciaMediaSub: "Good value for money", cfgFasciaAlta: "Premium", cfgFasciaAltaSub: "High-end products",
                cfgScartoQ: "How much safety stock?", cfgScartoDesc: "Extra stock so you don't run dry.", cfgScartoMore: "A 10-15% buffer is the recommended value: it covers surprises without major waste.",
                cfgStileQ: "How rich is the menu?", cfgStileDesc: "How many options to put in the starting menu.",
                cfgStileEssenziale: "Essential", cfgStileEssenzialeSub: "Few drinks, simple", cfgStileClassico: "Classic", cfgStileClassicoSub: "The balanced choice", cfgStileRicco: "Rich", cfgStileRiccoSub: "More variety",
                cfgSummaryQ: "All set", cfgSummaryDesc: "Review and apply: we fill in parameters and a starting menu.",
                cfgSumNome: "Event", cfgSumTipo: "Type", cfgSumOspiti: "Guests", cfgSumConsumo: "Drinking", cfgSumPct: "Alcohol drinkers", cfgSumFascia: "Budget", cfgSumMenu: "Starting menu", cfgSumNomeVuoto: "Untitled",
                cfgUnitCocktail: "cocktails", cfgUnitMocktail: "mocktails", cfgUnitShot: "shots", cfgUnitNone: "no items",
                cfgReadGuests: "guests", cfgReadDrinkEach: "drinks each", cfgReadPrudent: "Cautious estimate: the safety margin is already included in the quantities.",
                cfgDone: "Setup applied. Here is your starting menu."
            },
            es: {
                cfgWelcomeEyebrow: "Barman PRO", cfgWelcomeTitle: "¿Cómo quieres preparar el evento?",
                cfgWelcomeSub: "Elige cómo empezar. Podrás cambiar cada detalle después.",
                cfgChoiceGuidedTitle: "Configuración guiada", cfgChoiceGuidedDesc: "Responde a unas preguntas sencillas: la app rellena parámetros y un menú inicial.",
                cfgChoiceManualTitle: "Creación manual", cfgChoiceManualDesc: "Ve directo a los parámetros y constrúyelo todo a mano, como siempre.",
                cfgLaunchTitle: "Configuración guiada", cfgLaunchSub: "Responde a unas preguntas, rellenamos parámetros y menú",
                cfgBack: "Atrás", cfgNext: "Siguiente", cfgApply: "Aplicar configuración", cfgSkip: "Omitir", cfgYes: "Sí", cfgNo: "No",
                cfgEyName: "Nombre del evento", cfgEyType: "Tipo de evento", cfgEyGuests: "Invitados", cfgEyDuration: "Duración", cfgEyIntensity: "Consumo",
                cfgEyDrinkers: "Bebedores", cfgEyMocktail: "Sin alcohol", cfgEyShot: "Chupitos", cfgEyFerm: "Vino y cerveza", cfgEyPrice: "Presupuesto",
                cfgEyMargin: "Seguridad", cfgEyStyle: "Estilo menú", cfgEySummary: "Resumen",
                cfgNomeQ: "¿Qué evento es?", cfgNomeDesc: "Pon un nombre al evento para encontrarlo fácilmente. Es opcional.", cfgNomePh: "Ej. Boda Anna y Luca",
                cfgTipoQ: "¿Qué tipo de evento?", cfgTipoDesc: "Elegiremos un menú inicial adecuado a partir de esto.",
                cfgTipoMatrimonio: "Boda", cfgTipoMatrimonioSub: "Elegante, burbujas y clásicos",
                cfgTipoCompleanno: "Cumpleaños", cfgTipoCompleannoSub: "Festivo, bebidas populares",
                cfgTipoAperitivo: "Aperitivo", cfgTipoAperitivoSub: "Spritz y grandes clásicos",
                cfgTipoSerata: "Noche / Fiesta", cfgTipoSerataSub: "Combinados y chupitos",
                cfgTipoAziendale: "Evento de empresa", cfgTipoAziendaleSub: "Sobrio y cuidado",
                cfgOspitiQ: "¿Cuántos invitados?", cfgOspitiDesc: "Una estimación está bien, puedes corregirla después.", cfgOspitiUnit: "invitados previstos",
                cfgDurataQ: "¿Cuánto dura el evento?", cfgDurataDesc: "Cuanto más larga la noche, más consumiciones por persona.",
                cfgDurBreve: "Corta", cfgDurBreveSub: "Hasta 2 horas", cfgDurMedia: "Media", cfgDurMediaSub: "3-4 horas", cfgDurLunga: "Larga", cfgDurLungaSub: "5 horas o más",
                cfgIntQ: "¿Cuánto se bebe?", cfgIntDesc: "El ritmo medio de consumo de los invitados.",
                cfgIntLeggera: "Ligero", cfgIntLeggeraSub: "Un brindis y poco más", cfgIntMedia: "Medio", cfgIntMediaSub: "El ritmo típico", cfgIntAlta: "Alto", cfgIntAltaSub: "Se bebe bastante",
                cfgPctQ: "¿Cuántos beben alcohol?", cfgPctDesc: "El resto de invitados recibirá mocktails y bebidas sin alcohol.",
                cfgPctMore: "Mueve el control para dividir bebedores de alcohol y no bebedores. La app reparte automáticamente las cantidades entre cócteles y mocktails.",
                cfgMockQ: "¿Servir también mocktails?", cfgMockDesc: "Bebidas sin alcohol para quien no bebe o conduce.",
                cfgShotQ: "¿Quieres servir chupitos?", cfgShotDesc: "Chupitos y amargos servidos en pequeña dosis.",
                cfgFermQ: "¿También vino y cerveza?", cfgFermDesc: "Servicio de vino, espumosos y cerveza aparte de los cócteles.",
                cfgFasciaQ: "¿Qué presupuesto de productos?", cfgFasciaDesc: "Influye en el coste estimado, no en las cantidades.",
                cfgFasciaBassa: "Económico", cfgFasciaBassaSub: "Productos básicos", cfgFasciaMedia: "Estándar", cfgFasciaMediaSub: "Buena relación calidad-precio", cfgFasciaAlta: "Premium", cfgFasciaAltaSub: "Productos de alta gama",
                cfgScartoQ: "¿Cuánto margen de reserva?", cfgScartoDesc: "Reserva extra para no quedarte sin nada.", cfgScartoMore: "Una reserva del 10-15% es el valor recomendado: cubre los imprevistos sin desperdicio excesivo.",
                cfgStileQ: "¿Menú más o menos amplio?", cfgStileDesc: "Cuántas propuestas poner en el menú inicial.",
                cfgStileEssenziale: "Esencial", cfgStileEssenzialeSub: "Pocas bebidas, simple", cfgStileClassico: "Clásico", cfgStileClassicoSub: "La opción equilibrada", cfgStileRicco: "Amplio", cfgStileRiccoSub: "Más variedad",
                cfgSummaryQ: "Todo listo", cfgSummaryDesc: "Revisa y aplica: rellenamos parámetros y un menú inicial.",
                cfgSumNome: "Evento", cfgSumTipo: "Tipo", cfgSumOspiti: "Invitados", cfgSumConsumo: "Consumo", cfgSumPct: "Bebedores de alcohol", cfgSumFascia: "Presupuesto", cfgSumMenu: "Menú inicial", cfgSumNomeVuoto: "Sin nombre",
                cfgUnitCocktail: "cócteles", cfgUnitMocktail: "mocktails", cfgUnitShot: "chupitos", cfgUnitNone: "ningún elemento",
                cfgReadGuests: "invitados", cfgReadDrinkEach: "bebidas por persona", cfgReadPrudent: "Estimación prudente: el margen de seguridad ya está incluido en las cantidades.",
                cfgDone: "Configuración aplicada. Aquí tienes tu menú inicial."
            },
            fr: {
                cfgWelcomeEyebrow: "Barman PRO", cfgWelcomeTitle: "Comment préparer l'événement ?",
                cfgWelcomeSub: "Choisissez comment commencer. Vous pourrez tout modifier ensuite.",
                cfgChoiceGuidedTitle: "Configuration guidée", cfgChoiceGuidedDesc: "Répondez à quelques questions simples : l'app remplit les paramètres et un menu de départ.",
                cfgChoiceManualTitle: "Création manuelle", cfgChoiceManualDesc: "Allez droit aux paramètres et construisez tout à la main, comme d'habitude.",
                cfgLaunchTitle: "Configuration guidée", cfgLaunchSub: "Répondez à quelques questions, on remplit paramètres et menu",
                cfgBack: "Retour", cfgNext: "Suivant", cfgApply: "Appliquer la configuration", cfgSkip: "Passer", cfgYes: "Oui", cfgNo: "Non",
                cfgEyName: "Nom de l'événement", cfgEyType: "Type d'événement", cfgEyGuests: "Invités", cfgEyDuration: "Durée", cfgEyIntensity: "Consommation",
                cfgEyDrinkers: "Buveurs", cfgEyMocktail: "Sans alcool", cfgEyShot: "Shots", cfgEyFerm: "Vin et bière", cfgEyPrice: "Budget",
                cfgEyMargin: "Sécurité", cfgEyStyle: "Style menu", cfgEySummary: "Récapitulatif",
                cfgNomeQ: "Quel événement ?", cfgNomeDesc: "Nommez l'événement pour le retrouver facilement. C'est facultatif.", cfgNomePh: "Ex. Mariage Anna et Luca",
                cfgTipoQ: "Quel type d'événement ?", cfgTipoDesc: "Nous choisirons un menu de départ adapté à partir de cela.",
                cfgTipoMatrimonio: "Mariage", cfgTipoMatrimonioSub: "Élégant, bulles et classiques",
                cfgTipoCompleanno: "Anniversaire", cfgTipoCompleannoSub: "Festif, boissons populaires",
                cfgTipoAperitivo: "Apéritif", cfgTipoAperitivoSub: "Spritz et grands classiques",
                cfgTipoSerata: "Soirée / Fête", cfgTipoSerataSub: "Long drinks et shots",
                cfgTipoAziendale: "Événement pro", cfgTipoAziendaleSub: "Sobre et soigné",
                cfgOspitiQ: "Combien d'invités ?", cfgOspitiDesc: "Une estimation suffit, vous pourrez la corriger ensuite.", cfgOspitiUnit: "invités prévus",
                cfgDurataQ: "Quelle durée d'événement ?", cfgDurataDesc: "Plus la soirée est longue, plus de consommations par personne.",
                cfgDurBreve: "Courte", cfgDurBreveSub: "Jusqu'à 2 heures", cfgDurMedia: "Moyenne", cfgDurMediaSub: "3-4 heures", cfgDurLunga: "Longue", cfgDurLungaSub: "5 heures ou plus",
                cfgIntQ: "On boit beaucoup ?", cfgIntDesc: "Le rythme moyen de consommation des invités.",
                cfgIntLeggera: "Léger", cfgIntLeggeraSub: "Un toast et un peu plus", cfgIntMedia: "Moyen", cfgIntMediaSub: "Le rythme habituel", cfgIntAlta: "Soutenu", cfgIntAltaSub: "On boit beaucoup",
                cfgPctQ: "Combien boivent de l'alcool ?", cfgPctDesc: "Les autres invités recevront mocktails et boissons sans alcool.",
                cfgPctMore: "Déplacez le curseur pour répartir buveurs d'alcool et non-buveurs. L'app répartit automatiquement les quantités entre cocktails et mocktails.",
                cfgMockQ: "Servir aussi des mocktails ?", cfgMockDesc: "Boissons sans alcool pour ceux qui ne boivent pas ou conduisent.",
                cfgShotQ: "Servir des shots ?", cfgShotDesc: "Shots et amers servis en petite dose.",
                cfgFermQ: "Vin et bière aussi ?", cfgFermDesc: "Service de vin, bulles et bière à côté des cocktails.",
                cfgFasciaQ: "Quel budget produits ?", cfgFasciaDesc: "Influe sur le coût estimé, pas sur les quantités.",
                cfgFasciaBassa: "Économique", cfgFasciaBassaSub: "Produits de base", cfgFasciaMedia: "Standard", cfgFasciaMediaSub: "Bon rapport qualité-prix", cfgFasciaAlta: "Premium", cfgFasciaAltaSub: "Produits haut de gamme",
                cfgScartoQ: "Quelle marge de réserve ?", cfgScartoDesc: "Réserve supplémentaire pour ne pas être à sec.", cfgScartoMore: "Une réserve de 10-15% est la valeur conseillée : elle couvre les imprévus sans gaspillage excessif.",
                cfgStileQ: "Menu plus ou moins riche ?", cfgStileDesc: "Combien de propositions mettre dans le menu de départ.",
                cfgStileEssenziale: "Essentiel", cfgStileEssenzialeSub: "Peu de boissons, simple", cfgStileClassico: "Classique", cfgStileClassicoSub: "Le choix équilibré", cfgStileRicco: "Riche", cfgStileRiccoSub: "Plus de variété",
                cfgSummaryQ: "Tout est prêt", cfgSummaryDesc: "Vérifiez et appliquez : on remplit paramètres et menu de départ.",
                cfgSumNome: "Événement", cfgSumTipo: "Type", cfgSumOspiti: "Invités", cfgSumConsumo: "Consommation", cfgSumPct: "Buveurs d'alcool", cfgSumFascia: "Budget", cfgSumMenu: "Menu de départ", cfgSumNomeVuoto: "Sans nom",
                cfgUnitCocktail: "cocktails", cfgUnitMocktail: "mocktails", cfgUnitShot: "shots", cfgUnitNone: "aucun élément",
                cfgReadGuests: "invités", cfgReadDrinkEach: "boissons par personne", cfgReadPrudent: "Estimation prudente : la marge de sécurité est déjà incluse dans les quantités.",
                cfgDone: "Configuration appliquée. Voici votre menu de départ."
            },
            de: {
                cfgWelcomeEyebrow: "Barman PRO", cfgWelcomeTitle: "Wie möchtest du das Event planen?",
                cfgWelcomeSub: "Wähle, wie du startest. Du kannst jedes Detail später ändern.",
                cfgChoiceGuidedTitle: "Geführte Einrichtung", cfgChoiceGuidedDesc: "Beantworte ein paar einfache Fragen: die App füllt Parameter und ein Startmenü aus.",
                cfgChoiceManualTitle: "Manuelle Erstellung", cfgChoiceManualDesc: "Geh direkt zu den Parametern und baue alles von Hand, wie gewohnt.",
                cfgLaunchTitle: "Geführte Einrichtung", cfgLaunchSub: "Beantworte ein paar Fragen, wir füllen Parameter und Menü aus",
                cfgBack: "Zurück", cfgNext: "Weiter", cfgApply: "Konfiguration anwenden", cfgSkip: "Überspringen", cfgYes: "Ja", cfgNo: "Nein",
                cfgEyName: "Event-Name", cfgEyType: "Event-Typ", cfgEyGuests: "Gäste", cfgEyDuration: "Dauer", cfgEyIntensity: "Konsum",
                cfgEyDrinkers: "Trinker", cfgEyMocktail: "Alkoholfrei", cfgEyShot: "Shots", cfgEyFerm: "Wein & Bier", cfgEyPrice: "Budget",
                cfgEyMargin: "Reserve", cfgEyStyle: "Menü-Stil", cfgEySummary: "Übersicht",
                cfgNomeQ: "Welches Event?", cfgNomeDesc: "Benenne das Event, um es leicht wiederzufinden. Optional.", cfgNomePh: "z. B. Hochzeit Anna & Luca",
                cfgTipoQ: "Welche Art von Event?", cfgTipoDesc: "Daraus wählen wir ein passendes Startmenü.",
                cfgTipoMatrimonio: "Hochzeit", cfgTipoMatrimonioSub: "Elegant, Sekt und Klassiker",
                cfgTipoCompleanno: "Geburtstag", cfgTipoCompleannoSub: "Festlich, beliebte Drinks",
                cfgTipoAperitivo: "Aperitif", cfgTipoAperitivoSub: "Spritz und große Klassiker",
                cfgTipoSerata: "Abend / Party", cfgTipoSerataSub: "Longdrinks und Shots",
                cfgTipoAziendale: "Firmenevent", cfgTipoAziendaleSub: "Nüchtern und gepflegt",
                cfgOspitiQ: "Wie viele Gäste?", cfgOspitiDesc: "Eine Schätzung reicht, du kannst sie später anpassen.", cfgOspitiUnit: "erwartete Gäste",
                cfgDurataQ: "Wie lange dauert das Event?", cfgDurataDesc: "Je länger der Abend, desto mehr Drinks pro Kopf.",
                cfgDurBreve: "Kurz", cfgDurBreveSub: "Bis 2 Stunden", cfgDurMedia: "Mittel", cfgDurMediaSub: "3-4 Stunden", cfgDurLunga: "Lang", cfgDurLungaSub: "5 Stunden oder mehr",
                cfgIntQ: "Wie viel wird getrunken?", cfgIntDesc: "Das durchschnittliche Trinktempo der Gäste.",
                cfgIntLeggera: "Leicht", cfgIntLeggeraSub: "Ein Toast und etwas mehr", cfgIntMedia: "Mittel", cfgIntMediaSub: "Das übliche Tempo", cfgIntAlta: "Hoch", cfgIntAltaSub: "Es wird viel getrunken",
                cfgPctQ: "Wie viele trinken Alkohol?", cfgPctDesc: "Die übrigen Gäste bekommen Mocktails und alkoholfreie Drinks.",
                cfgPctMore: "Verschiebe den Regler, um Alkoholtrinker und Nicht-Trinker aufzuteilen. Die App verteilt die Mengen automatisch zwischen Cocktails und Mocktails.",
                cfgMockQ: "Auch Mocktails servieren?", cfgMockDesc: "Alkoholfreie Drinks für Nicht-Trinker oder Fahrer.",
                cfgShotQ: "Möchtest du Shots servieren?", cfgShotDesc: "Shots und Amaro in kleiner Dosis serviert.",
                cfgFermQ: "Auch Wein und Bier?", cfgFermDesc: "Service von Wein, Schaumwein und Bier neben den Cocktails.",
                cfgFasciaQ: "Welches Produktbudget?", cfgFasciaDesc: "Beeinflusst die geschätzten Kosten, nicht die Mengen.",
                cfgFasciaBassa: "Günstig", cfgFasciaBassaSub: "Basisprodukte", cfgFasciaMedia: "Standard", cfgFasciaMediaSub: "Gutes Preis-Leistungs-Verhältnis", cfgFasciaAlta: "Premium", cfgFasciaAltaSub: "Hochwertige Produkte",
                cfgScartoQ: "Wie viel Sicherheitsreserve?", cfgScartoDesc: "Zusätzliche Reserve, um nicht leer auszugehen.", cfgScartoMore: "Eine Reserve von 10-15% ist der empfohlene Wert: deckt Unvorhergesehenes ohne große Verschwendung.",
                cfgStileQ: "Wie reichhaltig das Menü?", cfgStileDesc: "Wie viele Vorschläge ins Startmenü kommen.",
                cfgStileEssenziale: "Minimal", cfgStileEssenzialeSub: "Wenige Drinks, einfach", cfgStileClassico: "Klassisch", cfgStileClassicoSub: "Die ausgewogene Wahl", cfgStileRicco: "Reichhaltig", cfgStileRiccoSub: "Mehr Vielfalt",
                cfgSummaryQ: "Alles bereit", cfgSummaryDesc: "Prüfe und wende an: wir füllen Parameter und ein Startmenü aus.",
                cfgSumNome: "Event", cfgSumTipo: "Typ", cfgSumOspiti: "Gäste", cfgSumConsumo: "Konsum", cfgSumPct: "Alkoholtrinker", cfgSumFascia: "Budget", cfgSumMenu: "Startmenü", cfgSumNomeVuoto: "Ohne Namen",
                cfgUnitCocktail: "Cocktails", cfgUnitMocktail: "Mocktails", cfgUnitShot: "Shots", cfgUnitNone: "keine Einträge",
                cfgReadGuests: "Gäste", cfgReadDrinkEach: "Drinks pro Kopf", cfgReadPrudent: "Vorsichtige Schätzung: die Sicherheitsreserve ist bereits in den Mengen enthalten.",
                cfgDone: "Konfiguration angewendet. Hier ist dein Startmenü."
            },
            pt: {
                cfgWelcomeEyebrow: "Barman PRO", cfgWelcomeTitle: "Como queres preparar o evento?",
                cfgWelcomeSub: "Escolhe como começar. Podes mudar cada detalhe depois.",
                cfgChoiceGuidedTitle: "Configuração guiada", cfgChoiceGuidedDesc: "Responde a algumas perguntas simples: a app preenche parâmetros e um menu inicial.",
                cfgChoiceManualTitle: "Criação manual", cfgChoiceManualDesc: "Vai direto aos parâmetros e constrói tudo à mão, como sempre.",
                cfgLaunchTitle: "Configuração guiada", cfgLaunchSub: "Responde a algumas perguntas, preenchemos parâmetros e menu",
                cfgBack: "Voltar", cfgNext: "Seguinte", cfgApply: "Aplicar configuração", cfgSkip: "Saltar", cfgYes: "Sim", cfgNo: "Não",
                cfgEyName: "Nome do evento", cfgEyType: "Tipo de evento", cfgEyGuests: "Convidados", cfgEyDuration: "Duração", cfgEyIntensity: "Consumo",
                cfgEyDrinkers: "Bebedores", cfgEyMocktail: "Sem álcool", cfgEyShot: "Shots", cfgEyFerm: "Vinho e cerveja", cfgEyPrice: "Orçamento",
                cfgEyMargin: "Segurança", cfgEyStyle: "Estilo menu", cfgEySummary: "Resumo",
                cfgNomeQ: "Que evento é?", cfgNomeDesc: "Dá um nome ao evento para o encontrares facilmente. É opcional.", cfgNomePh: "Ex. Casamento Anna & Luca",
                cfgTipoQ: "Que tipo de evento?", cfgTipoDesc: "A partir disto escolhemos um menu inicial adequado.",
                cfgTipoMatrimonio: "Casamento", cfgTipoMatrimonioSub: "Elegante, espumantes e clássicos",
                cfgTipoCompleanno: "Aniversário", cfgTipoCompleannoSub: "Festivo, bebidas populares",
                cfgTipoAperitivo: "Aperitivo", cfgTipoAperitivoSub: "Spritz e grandes clássicos",
                cfgTipoSerata: "Noite / Festa", cfgTipoSerataSub: "Long drinks e shots",
                cfgTipoAziendale: "Evento de empresa", cfgTipoAziendaleSub: "Sóbrio e cuidado",
                cfgOspitiQ: "Quantos convidados?", cfgOspitiDesc: "Uma estimativa serve, podes corrigi-la depois.", cfgOspitiUnit: "convidados previstos",
                cfgDurataQ: "Quanto dura o evento?", cfgDurataDesc: "Quanto mais longa a noite, mais consumos por pessoa.",
                cfgDurBreve: "Curta", cfgDurBreveSub: "Até 2 horas", cfgDurMedia: "Média", cfgDurMediaSub: "3-4 horas", cfgDurLunga: "Longa", cfgDurLungaSub: "5 horas ou mais",
                cfgIntQ: "Bebe-se muito?", cfgIntDesc: "O ritmo médio de consumo dos convidados.",
                cfgIntLeggera: "Leve", cfgIntLeggeraSub: "Um brinde e pouco mais", cfgIntMedia: "Médio", cfgIntMediaSub: "O ritmo típico", cfgIntAlta: "Alto", cfgIntAltaSub: "Bebe-se bastante",
                cfgPctQ: "Quantos bebem álcool?", cfgPctDesc: "Os restantes convidados recebem mocktails e bebidas sem álcool.",
                cfgPctMore: "Move o cursor para dividir bebedores de álcool e não bebedores. A app distribui automaticamente as quantidades entre cocktails e mocktails.",
                cfgMockQ: "Servir também mocktails?", cfgMockDesc: "Bebidas sem álcool para quem não bebe ou conduz.",
                cfgShotQ: "Queres servir shots?", cfgShotDesc: "Shots e amargos servidos em pequena dose.",
                cfgFermQ: "Também vinho e cerveja?", cfgFermDesc: "Serviço de vinho, espumantes e cerveja além dos cocktails.",
                cfgFasciaQ: "Que orçamento de produtos?", cfgFasciaDesc: "Afeta o custo estimado, não as quantidades.",
                cfgFasciaBassa: "Económico", cfgFasciaBassaSub: "Produtos base", cfgFasciaMedia: "Padrão", cfgFasciaMediaSub: "Boa relação qualidade-preço", cfgFasciaAlta: "Premium", cfgFasciaAltaSub: "Produtos de alta gama",
                cfgScartoQ: "Quanta margem de reserva?", cfgScartoDesc: "Reserva extra para não ficares sem nada.", cfgScartoMore: "Uma reserva de 10-15% é o valor recomendado: cobre os imprevistos sem desperdício excessivo.",
                cfgStileQ: "Menu mais ou menos amplo?", cfgStileDesc: "Quantas propostas pôr no menu inicial.",
                cfgStileEssenziale: "Essencial", cfgStileEssenzialeSub: "Poucas bebidas, simples", cfgStileClassico: "Clássico", cfgStileClassicoSub: "A escolha equilibrada", cfgStileRicco: "Amplo", cfgStileRiccoSub: "Mais variedade",
                cfgSummaryQ: "Tudo pronto", cfgSummaryDesc: "Confere e aplica: preenchemos parâmetros e um menu inicial.",
                cfgSumNome: "Evento", cfgSumTipo: "Tipo", cfgSumOspiti: "Convidados", cfgSumConsumo: "Consumo", cfgSumPct: "Bebedores de álcool", cfgSumFascia: "Orçamento", cfgSumMenu: "Menu inicial", cfgSumNomeVuoto: "Sem nome",
                cfgUnitCocktail: "cocktails", cfgUnitMocktail: "mocktails", cfgUnitShot: "shots", cfgUnitNone: "nenhum item",
                cfgReadGuests: "convidados", cfgReadDrinkEach: "bebidas por pessoa", cfgReadPrudent: "Estimativa prudente: a margem de segurança já está incluída nas quantidades.",
                cfgDone: "Configuração aplicada. Aqui está o teu menu inicial."
            },
            nl: {
                cfgWelcomeEyebrow: "Barman PRO", cfgWelcomeTitle: "Hoe wil je het evenement voorbereiden?",
                cfgWelcomeSub: "Kies hoe je begint. Je kunt elk detail later aanpassen.",
                cfgChoiceGuidedTitle: "Begeleide setup", cfgChoiceGuidedDesc: "Beantwoord een paar eenvoudige vragen: de app vult parameters en een startmenu in.",
                cfgChoiceManualTitle: "Handmatig maken", cfgChoiceManualDesc: "Ga direct naar de parameters en bouw alles met de hand, zoals altijd.",
                cfgLaunchTitle: "Begeleide setup", cfgLaunchSub: "Beantwoord een paar vragen, wij vullen parameters en menu in",
                cfgBack: "Terug", cfgNext: "Volgende", cfgApply: "Configuratie toepassen", cfgSkip: "Overslaan", cfgYes: "Ja", cfgNo: "Nee",
                cfgEyName: "Naam evenement", cfgEyType: "Soort evenement", cfgEyGuests: "Gasten", cfgEyDuration: "Duur", cfgEyIntensity: "Verbruik",
                cfgEyDrinkers: "Drinkers", cfgEyMocktail: "Alcoholvrij", cfgEyShot: "Shots", cfgEyFerm: "Wijn & bier", cfgEyPrice: "Budget",
                cfgEyMargin: "Reserve", cfgEyStyle: "Menustijl", cfgEySummary: "Overzicht",
                cfgNomeQ: "Welk evenement?", cfgNomeDesc: "Geef het evenement een naam om het makkelijk terug te vinden. Optioneel.", cfgNomePh: "Bv. Bruiloft Anna & Luca",
                cfgTipoQ: "Wat voor evenement?", cfgTipoDesc: "Hieruit kiezen we een passend startmenu.",
                cfgTipoMatrimonio: "Bruiloft", cfgTipoMatrimonioSub: "Elegant, bubbels en klassiekers",
                cfgTipoCompleanno: "Verjaardag", cfgTipoCompleannoSub: "Feestelijk, populaire drankjes",
                cfgTipoAperitivo: "Aperitief", cfgTipoAperitivoSub: "Spritz en grote klassiekers",
                cfgTipoSerata: "Avond / Feest", cfgTipoSerataSub: "Long drinks en shots",
                cfgTipoAziendale: "Bedrijfsevent", cfgTipoAziendaleSub: "Sober en verzorgd",
                cfgOspitiQ: "Hoeveel gasten?", cfgOspitiDesc: "Een schatting is prima, je kunt het later bijstellen.", cfgOspitiUnit: "verwachte gasten",
                cfgDurataQ: "Hoe lang duurt het evenement?", cfgDurataDesc: "Hoe langer de avond, hoe meer drankjes per persoon.",
                cfgDurBreve: "Kort", cfgDurBreveSub: "Tot 2 uur", cfgDurMedia: "Gemiddeld", cfgDurMediaSub: "3-4 uur", cfgDurLunga: "Lang", cfgDurLungaSub: "5 uur of meer",
                cfgIntQ: "Hoeveel wordt er gedronken?", cfgIntDesc: "Het gemiddelde drinktempo van de gasten.",
                cfgIntLeggera: "Licht", cfgIntLeggeraSub: "Een toost en iets meer", cfgIntMedia: "Gemiddeld", cfgIntMediaSub: "Het gebruikelijke tempo", cfgIntAlta: "Hoog", cfgIntAltaSub: "Er wordt flink gedronken",
                cfgPctQ: "Hoeveel drinken alcohol?", cfgPctDesc: "De overige gasten krijgen mocktails en alcoholvrije drankjes.",
                cfgPctMore: "Verschuif de schuifregelaar om alcoholdrinkers en niet-drinkers te verdelen. De app verdeelt de hoeveelheden automatisch tussen cocktails en mocktails.",
                cfgMockQ: "Ook mocktails serveren?", cfgMockDesc: "Alcoholvrije drankjes voor niet-drinkers of bestuurders.",
                cfgShotQ: "Wil je shots serveren?", cfgShotDesc: "Shots en bitters in kleine dosis geserveerd.",
                cfgFermQ: "Ook wijn en bier?", cfgFermDesc: "Service van wijn, bubbels en bier naast de cocktails.",
                cfgFasciaQ: "Welk productbudget?", cfgFasciaDesc: "Beïnvloedt de geschatte kosten, niet de hoeveelheden.",
                cfgFasciaBassa: "Voordelig", cfgFasciaBassaSub: "Basisproducten", cfgFasciaMedia: "Standaard", cfgFasciaMediaSub: "Goede prijs-kwaliteit", cfgFasciaAlta: "Premium", cfgFasciaAltaSub: "Hoogwaardige producten",
                cfgScartoQ: "Hoeveel reservemarge?", cfgScartoDesc: "Extra voorraad zodat je niet zonder komt.", cfgScartoMore: "Een reserve van 10-15% is de aanbevolen waarde: dekt verrassingen zonder veel verspilling.",
                cfgStileQ: "Hoe uitgebreid het menu?", cfgStileDesc: "Hoeveel voorstellen in het startmenu komen.",
                cfgStileEssenziale: "Essentieel", cfgStileEssenzialeSub: "Weinig drankjes, simpel", cfgStileClassico: "Klassiek", cfgStileClassicoSub: "De evenwichtige keuze", cfgStileRicco: "Uitgebreid", cfgStileRiccoSub: "Meer variatie",
                cfgSummaryQ: "Alles klaar", cfgSummaryDesc: "Controleer en pas toe: wij vullen parameters en een startmenu in.",
                cfgSumNome: "Evenement", cfgSumTipo: "Soort", cfgSumOspiti: "Gasten", cfgSumConsumo: "Verbruik", cfgSumPct: "Alcoholdrinkers", cfgSumFascia: "Budget", cfgSumMenu: "Startmenu", cfgSumNomeVuoto: "Naamloos",
                cfgUnitCocktail: "cocktails", cfgUnitMocktail: "mocktails", cfgUnitShot: "shots", cfgUnitNone: "geen items",
                cfgReadGuests: "gasten", cfgReadDrinkEach: "drankjes per persoon", cfgReadPrudent: "Voorzichtige schatting: de veiligheidsmarge zit al in de hoeveelheden.",
                cfgDone: "Configuratie toegepast. Hier is je startmenu."
            }
        };
        Object.keys(_extraI18nCfg).forEach(lg => {
            if (translations[lg]) Object.assign(translations[lg], _extraI18nCfg[lg]);
        });


        /* ── i18n firma condivisione lista (crescita: ogni lista condivisa porta un link) ── */
        const _shareI18n = {
            it: { shareFooter: "Lista creata con Barman PRO · fai la tua su https://barman-pro.raccasamuele2004.workers.dev/?ref=share" },
            en: { shareFooter: "List made with Barman PRO · make yours at https://barman-pro.raccasamuele2004.workers.dev/?ref=share" },
            es: { shareFooter: "Lista creada con Barman PRO · haz la tuya en https://barman-pro.raccasamuele2004.workers.dev/?ref=share" },
            fr: { shareFooter: "Liste créée avec Barman PRO · faites la vôtre sur https://barman-pro.raccasamuele2004.workers.dev/?ref=share" },
            de: { shareFooter: "Liste erstellt mit Barman PRO · erstelle deine auf https://barman-pro.raccasamuele2004.workers.dev/?ref=share" },
            pt: { shareFooter: "Lista criada com Barman PRO · faça a sua em https://barman-pro.raccasamuele2004.workers.dev/?ref=share" },
            nl: { shareFooter: "Lijst gemaakt met Barman PRO · maak de jouwe op https://barman-pro.raccasamuele2004.workers.dev/?ref=share" }
        };
        Object.keys(_shareI18n).forEach(lg => {
            if (translations[lg]) Object.assign(translations[lg], _shareI18n[lg]);
        });

        /* ── i18n "Menù da esporre" (4 stili, modificabile, stampabile) — 7 lingue ── */
        const _menuI18n = {
            it: { menuOpenBtn:"Crea menù da esporre", menuViewBtn:"Visualizza il menù", menuDefaultTitle:"Il nostro Menù", menuEyebrow:"La selezione della serata", menuCatCocktail:"Cocktail", menuCatMocktail:"Analcolici", menuCatShot:"Shot & Amari", menuCatVini:"Vini & Birre", menuPrint:"Stampa / PDF", menuEditHint:"Tocca i testi per modificarli. Usa × per togliere una voce.", menuStyleElegant:"Elegante", menuStyleMinimal:"Minimal", menuStyleChalk:"Lavagna", menuStyleFesta:"Festa", menuEmpty:"Aggiungi qualche drink al menù della serata prima di creare il menù da esporre.", menuRemove:"Rimuovi" },
            en: { menuOpenBtn:"Create a display menu", menuViewBtn:"View the menu", menuDefaultTitle:"Our Menu", menuEyebrow:"Tonight's selection", menuCatCocktail:"Cocktails", menuCatMocktail:"Mocktails", menuCatShot:"Shots & Bitters", menuCatVini:"Wines & Beers", menuPrint:"Print / PDF", menuEditHint:"Tap any text to edit it. Use × to remove an item.", menuStyleElegant:"Elegant", menuStyleMinimal:"Minimal", menuStyleChalk:"Chalkboard", menuStyleFesta:"Party", menuEmpty:"Add a few drinks to the night's menu before creating a display menu.", menuRemove:"Remove" },
            es: { menuOpenBtn:"Crear menú para exponer", menuViewBtn:"Ver el menú", menuDefaultTitle:"Nuestro Menú", menuEyebrow:"La selección de la noche", menuCatCocktail:"Cócteles", menuCatMocktail:"Sin Alcohol", menuCatShot:"Chupitos y Amargos", menuCatVini:"Vinos y Cervezas", menuPrint:"Imprimir / PDF", menuEditHint:"Toca cualquier texto para editarlo. Usa × para quitar un elemento.", menuStyleElegant:"Elegante", menuStyleMinimal:"Minimalista", menuStyleChalk:"Pizarra", menuStyleFesta:"Fiesta", menuEmpty:"Añade algunas bebidas al menú de la noche antes de crear el menú para exponer.", menuRemove:"Quitar" },
            fr: { menuOpenBtn:"Créer un menu à afficher", menuViewBtn:"Voir le menu", menuDefaultTitle:"Notre Menu", menuEyebrow:"La sélection du soir", menuCatCocktail:"Cocktails", menuCatMocktail:"Sans Alcool", menuCatShot:"Shots & Amers", menuCatVini:"Vins & Bières", menuPrint:"Imprimer / PDF", menuEditHint:"Touchez un texte pour le modifier. Utilisez × pour retirer un élément.", menuStyleElegant:"Élégant", menuStyleMinimal:"Minimal", menuStyleChalk:"Ardoise", menuStyleFesta:"Fête", menuEmpty:"Ajoutez quelques boissons au menu de la soirée avant de créer le menu à afficher.", menuRemove:"Retirer" },
            de: { menuOpenBtn:"Aushang-Menü erstellen", menuViewBtn:"Menü ansehen", menuDefaultTitle:"Unser Menü", menuEyebrow:"Die Auswahl des Abends", menuCatCocktail:"Cocktails", menuCatMocktail:"Alkoholfrei", menuCatShot:"Shots & Kräuterliköre", menuCatVini:"Weine & Biere", menuPrint:"Drucken / PDF", menuEditHint:"Tippe auf einen Text, um ihn zu ändern. Mit × entfernst du einen Eintrag.", menuStyleElegant:"Elegant", menuStyleMinimal:"Minimal", menuStyleChalk:"Tafel", menuStyleFesta:"Party", menuEmpty:"Füge dem Abend-Menü ein paar Drinks hinzu, bevor du ein Aushang-Menü erstellst.", menuRemove:"Entfernen" },
            pt: { menuOpenBtn:"Criar menu para expor", menuViewBtn:"Ver o menu", menuDefaultTitle:"O nosso Menu", menuEyebrow:"A seleção da noite", menuCatCocktail:"Cocktails", menuCatMocktail:"Sem Álcool", menuCatShot:"Shots & Amargos", menuCatVini:"Vinhos & Cervejas", menuPrint:"Imprimir / PDF", menuEditHint:"Toca num texto para o editar. Usa × para remover um item.", menuStyleElegant:"Elegante", menuStyleMinimal:"Minimal", menuStyleChalk:"Quadro", menuStyleFesta:"Festa", menuEmpty:"Adiciona algumas bebidas ao menu da noite antes de criar o menu para expor.", menuRemove:"Remover" },
            nl: { menuOpenBtn:"Menu om op te hangen maken", menuViewBtn:"Bekijk het menu", menuDefaultTitle:"Ons Menu", menuEyebrow:"De selectie van de avond", menuCatCocktail:"Cocktails", menuCatMocktail:"Alcoholvrij", menuCatShot:"Shots & Bitters", menuCatVini:"Wijnen & Bieren", menuPrint:"Afdrukken / PDF", menuEditHint:"Tik op een tekst om die te wijzigen. Gebruik × om een item te verwijderen.", menuStyleElegant:"Elegant", menuStyleMinimal:"Minimaal", menuStyleChalk:"Schoolbord", menuStyleFesta:"Feest", menuEmpty:"Voeg eerst wat drankjes toe aan het menu van de avond voordat je een menu om op te hangen maakt.", menuRemove:"Verwijderen" }
        };
        Object.keys(_menuI18n).forEach(lg => {
            if (translations[lg]) Object.assign(translations[lg], _menuI18n[lg]);
        });

        /* ── i18n Libreria "I miei cocktail" / "I miei amari" — 7 lingue ── */
        const _libI18n = {
            it: { navCocktail:"I miei cocktail", navAmari:"I miei amari", libCocktailSub:"Modifica le ricette, creane di nuove, aggiungile al menù della serata.", libAmariSub:"Amari e liquori da shot: aggiungili al menù, modificali o creane di nuovi.", libSearchCocktail:"Cerca un cocktail...", libSearchAmari:"Cerca un amaro o liquore...", libNewCocktail:"Nuovo cocktail", libNewAmaro:"Nuovo amaro", libAddToMenu:"Aggiungi al menù", libAddToShots:"Aggiungi agli shot", libEdit:"Modifica", libDelete:"Elimina", libReset:"Ripristina originale", libBadgeCustom:"Personale", libBadgeMod:"Modificato", libTagAnalc:"Analcolico", libSave:"Salva", libCancel:"Annulla", libAddIng:"Aggiungi ingrediente", libEmpty:"Nessun risultato.", libAddedMenu:"«{nome}» aggiunto al menù", libAddedShots:"«{nome}» aggiunto agli shot", libConfirmDelete:"Eliminare «{nome}»?", libSavedToast:"Ricetta salvata", libResetToast:"Ricetta ripristinata", libDeletedToast:"Eliminato", libAlertName:"Dai un nome alla ricetta.", libAlertIng:"Aggiungi almeno un ingrediente con la dose.", libEditTitle:"Modifica ricetta", libCreateTitle:"Nuova ricetta", libIngredients:"Ingredienti", libPhName:"Nome del cocktail", libPhAmaro:"Nome dell'amaro o liquore" },
            en: { navCocktail:"My cocktails", navAmari:"My bitters & liqueurs", libCocktailSub:"Edit recipes, create new ones, add them to the night's menu.", libAmariSub:"Bitters and shot liqueurs: add them to the menu, edit or create new ones.", libSearchCocktail:"Search a cocktail...", libSearchAmari:"Search a bitter or liqueur...", libNewCocktail:"New cocktail", libNewAmaro:"New liqueur", libAddToMenu:"Add to menu", libAddToShots:"Add to shots", libEdit:"Edit", libDelete:"Delete", libReset:"Reset to original", libBadgeCustom:"Custom", libBadgeMod:"Edited", libTagAnalc:"Alcohol-free", libSave:"Save", libCancel:"Cancel", libAddIng:"Add ingredient", libEmpty:"No results.", libAddedMenu:"\"{nome}\" added to the menu", libAddedShots:"\"{nome}\" added to shots", libConfirmDelete:"Delete \"{nome}\"?", libSavedToast:"Recipe saved", libResetToast:"Recipe reset", libDeletedToast:"Deleted", libAlertName:"Give the recipe a name.", libAlertIng:"Add at least one ingredient with its amount.", libEditTitle:"Edit recipe", libCreateTitle:"New recipe", libIngredients:"Ingredients", libPhName:"Cocktail name", libPhAmaro:"Bitter or liqueur name" },
            es: { navCocktail:"Mis cócteles", navAmari:"Mis amargos y licores", libCocktailSub:"Edita recetas, crea nuevas y añádelas al menú de la noche.", libAmariSub:"Amargos y licores para chupitos: añádelos al menú, edítalos o crea nuevos.", libSearchCocktail:"Busca un cóctel...", libSearchAmari:"Busca un amargo o licor...", libNewCocktail:"Nuevo cóctel", libNewAmaro:"Nuevo licor", libAddToMenu:"Añadir al menú", libAddToShots:"Añadir a chupitos", libEdit:"Editar", libDelete:"Eliminar", libReset:"Restaurar original", libBadgeCustom:"Personal", libBadgeMod:"Editado", libTagAnalc:"Sin alcohol", libSave:"Guardar", libCancel:"Cancelar", libAddIng:"Añadir ingrediente", libEmpty:"Sin resultados.", libAddedMenu:"«{nome}» añadido al menú", libAddedShots:"«{nome}» añadido a chupitos", libConfirmDelete:"¿Eliminar «{nome}»?", libSavedToast:"Receta guardada", libResetToast:"Receta restaurada", libDeletedToast:"Eliminado", libAlertName:"Pon un nombre a la receta.", libAlertIng:"Añade al menos un ingrediente con su cantidad.", libEditTitle:"Editar receta", libCreateTitle:"Nueva receta", libIngredients:"Ingredientes", libPhName:"Nombre del cóctel", libPhAmaro:"Nombre del amargo o licor" },
            fr: { navCocktail:"Mes cocktails", navAmari:"Mes amers & liqueurs", libCocktailSub:"Modifie les recettes, créés-en de nouvelles, ajoute-les au menu de la soirée.", libAmariSub:"Amers et liqueurs à shot : ajoute-les au menu, modifie-les ou créés-en.", libSearchCocktail:"Cherche un cocktail...", libSearchAmari:"Cherche un amer ou une liqueur...", libNewCocktail:"Nouveau cocktail", libNewAmaro:"Nouvelle liqueur", libAddToMenu:"Ajouter au menu", libAddToShots:"Ajouter aux shots", libEdit:"Modifier", libDelete:"Supprimer", libReset:"Rétablir l'original", libBadgeCustom:"Perso", libBadgeMod:"Modifié", libTagAnalc:"Sans alcool", libSave:"Enregistrer", libCancel:"Annuler", libAddIng:"Ajouter un ingrédient", libEmpty:"Aucun résultat.", libAddedMenu:"« {nome} » ajouté au menu", libAddedShots:"« {nome} » ajouté aux shots", libConfirmDelete:"Supprimer « {nome} » ?", libSavedToast:"Recette enregistrée", libResetToast:"Recette rétablie", libDeletedToast:"Supprimé", libAlertName:"Donne un nom à la recette.", libAlertIng:"Ajoute au moins un ingrédient avec sa dose.", libEditTitle:"Modifier la recette", libCreateTitle:"Nouvelle recette", libIngredients:"Ingrédients", libPhName:"Nom du cocktail", libPhAmaro:"Nom de l'amer ou liqueur" },
            de: { navCocktail:"Meine Cocktails", navAmari:"Meine Amari & Liköre", libCocktailSub:"Rezepte bearbeiten, neue erstellen und zum Abend-Menü hinzufügen.", libAmariSub:"Amari und Shot-Liköre: zum Menü hinzufügen, bearbeiten oder neu erstellen.", libSearchCocktail:"Cocktail suchen...", libSearchAmari:"Amaro oder Likör suchen...", libNewCocktail:"Neuer Cocktail", libNewAmaro:"Neuer Likör", libAddToMenu:"Zum Menü", libAddToShots:"Zu den Shots", libEdit:"Bearbeiten", libDelete:"Löschen", libReset:"Original wiederherstellen", libBadgeCustom:"Eigen", libBadgeMod:"Bearbeitet", libTagAnalc:"Alkoholfrei", libSave:"Speichern", libCancel:"Abbrechen", libAddIng:"Zutat hinzufügen", libEmpty:"Keine Ergebnisse.", libAddedMenu:"«{nome}» zum Menü hinzugefügt", libAddedShots:"«{nome}» zu den Shots hinzugefügt", libConfirmDelete:"«{nome}» löschen?", libSavedToast:"Rezept gespeichert", libResetToast:"Rezept zurückgesetzt", libDeletedToast:"Gelöscht", libAlertName:"Gib dem Rezept einen Namen.", libAlertIng:"Füge mindestens eine Zutat mit Menge hinzu.", libEditTitle:"Rezept bearbeiten", libCreateTitle:"Neues Rezept", libIngredients:"Zutaten", libPhName:"Name des Cocktails", libPhAmaro:"Name des Amaro/Likörs" },
            pt: { navCocktail:"Os meus cocktails", navAmari:"Os meus amari & licores", libCocktailSub:"Edita receitas, cria novas e adiciona-as ao menu da noite.", libAmariSub:"Amari e licores para shots: adiciona ao menu, edita ou cria novos.", libSearchCocktail:"Procura um cocktail...", libSearchAmari:"Procura um amargo ou licor...", libNewCocktail:"Novo cocktail", libNewAmaro:"Novo licor", libAddToMenu:"Adicionar ao menu", libAddToShots:"Adicionar aos shots", libEdit:"Editar", libDelete:"Eliminar", libReset:"Repor original", libBadgeCustom:"Pessoal", libBadgeMod:"Editado", libTagAnalc:"Sem álcool", libSave:"Guardar", libCancel:"Cancelar", libAddIng:"Adicionar ingrediente", libEmpty:"Sem resultados.", libAddedMenu:"«{nome}» adicionado ao menu", libAddedShots:"«{nome}» adicionado aos shots", libConfirmDelete:"Eliminar «{nome}»?", libSavedToast:"Receita guardada", libResetToast:"Receita reposta", libDeletedToast:"Eliminado", libAlertName:"Dá um nome à receita.", libAlertIng:"Adiciona pelo menos um ingrediente com a dose.", libEditTitle:"Editar receita", libCreateTitle:"Nova receita", libIngredients:"Ingredientes", libPhName:"Nome do cocktail", libPhAmaro:"Nome do amargo ou licor" },
            nl: { navCocktail:"Mijn cocktails", navAmari:"Mijn bitters & likeuren", libCocktailSub:"Bewerk recepten, maak nieuwe en voeg ze toe aan het menu van de avond.", libAmariSub:"Bitters en shotlikeuren: voeg toe aan het menu, bewerk of maak nieuwe.", libSearchCocktail:"Zoek een cocktail...", libSearchAmari:"Zoek een bitter of likeur...", libNewCocktail:"Nieuwe cocktail", libNewAmaro:"Nieuwe likeur", libAddToMenu:"Aan menu toevoegen", libAddToShots:"Aan shots toevoegen", libEdit:"Bewerken", libDelete:"Verwijderen", libReset:"Origineel herstellen", libBadgeCustom:"Eigen", libBadgeMod:"Bewerkt", libTagAnalc:"Alcoholvrij", libSave:"Opslaan", libCancel:"Annuleren", libAddIng:"Ingrediënt toevoegen", libEmpty:"Geen resultaten.", libAddedMenu:"«{nome}» toegevoegd aan het menu", libAddedShots:"«{nome}» toegevoegd aan shots", libConfirmDelete:"«{nome}» verwijderen?", libSavedToast:"Recept opgeslagen", libResetToast:"Recept hersteld", libDeletedToast:"Verwijderd", libAlertName:"Geef het recept een naam.", libAlertIng:"Voeg minstens één ingrediënt met hoeveelheid toe.", libEditTitle:"Recept bewerken", libCreateTitle:"Nieuw recept", libIngredients:"Ingrediënten", libPhName:"Naam van de cocktail", libPhAmaro:"Naam van de bitter of likeur" }
        };
        Object.keys(_libI18n).forEach(lg => {
            if (translations[lg]) Object.assign(translations[lg], _libI18n[lg]);
        });

        /* ── i18n Home (hub d'ingresso) — 7 lingue ── */
        const _homeI18n = {
            it: { homeEyebrow:"Da dove vuoi iniziare?", homeNewTitle:"Crea nuovo evento", homeNewDesc:"Calcola la lista della spesa e i costi per la tua serata.", homeResumeTitle:"Riprendi evento in corso", homeResumeDesc:"Torna all'evento che stavi preparando.", homeEventsDesc:"Apri, modifica o spunta la lista di un evento salvato.", homeCocktailDesc:"Modifica le ricette o creane di nuove.", homeAmariDesc:"Gestisci amari e liquori da shot.", homeConfirmNew:"Iniziare un nuovo evento? I dati non ancora salvati andranno persi." },
            en: { homeEyebrow:"Where do you want to start?", homeNewTitle:"Create new event", homeNewDesc:"Work out the shopping list and costs for your night.", homeResumeTitle:"Resume event in progress", homeResumeDesc:"Go back to the event you were preparing.", homeEventsDesc:"Open, edit or check off the list of a saved event.", homeCocktailDesc:"Edit recipes or create new ones.", homeAmariDesc:"Manage bitters and shot liqueurs.", homeConfirmNew:"Start a new event? Any unsaved data will be lost." },
            es: { homeEyebrow:"¿Por dónde quieres empezar?", homeNewTitle:"Crear nuevo evento", homeNewDesc:"Calcula la lista de la compra y los costes de tu noche.", homeResumeTitle:"Retomar evento en curso", homeResumeDesc:"Vuelve al evento que estabas preparando.", homeEventsDesc:"Abre, edita o marca la lista de un evento guardado.", homeCocktailDesc:"Edita las recetas o crea nuevas.", homeAmariDesc:"Gestiona amargos y licores para chupitos.", homeConfirmNew:"¿Empezar un nuevo evento? Se perderán los datos no guardados." },
            fr: { homeEyebrow:"Par où veux-tu commencer ?", homeNewTitle:"Créer un événement", homeNewDesc:"Calcule la liste de courses et les coûts de ta soirée.", homeResumeTitle:"Reprendre l'événement en cours", homeResumeDesc:"Reviens à l'événement que tu préparais.", homeEventsDesc:"Ouvre, modifie ou coche la liste d'un événement enregistré.", homeCocktailDesc:"Modifie les recettes ou créés-en de nouvelles.", homeAmariDesc:"Gère les amers et liqueurs à shot.", homeConfirmNew:"Commencer un nouvel événement ? Les données non enregistrées seront perdues." },
            de: { homeEyebrow:"Womit möchtest du starten?", homeNewTitle:"Neues Event erstellen", homeNewDesc:"Berechne Einkaufsliste und Kosten für deinen Abend.", homeResumeTitle:"Laufendes Event fortsetzen", homeResumeDesc:"Zurück zum Event, das du vorbereitet hast.", homeEventsDesc:"Öffne, bearbeite oder hake die Liste eines gespeicherten Events ab.", homeCocktailDesc:"Rezepte bearbeiten oder neue erstellen.", homeAmariDesc:"Amari und Shot-Liköre verwalten.", homeConfirmNew:"Neues Event starten? Nicht gespeicherte Daten gehen verloren." },
            pt: { homeEyebrow:"Por onde queres começar?", homeNewTitle:"Criar novo evento", homeNewDesc:"Calcula a lista de compras e os custos da tua noite.", homeResumeTitle:"Retomar evento em curso", homeResumeDesc:"Volta ao evento que estavas a preparar.", homeEventsDesc:"Abre, edita ou marca a lista de um evento guardado.", homeCocktailDesc:"Edita as receitas ou cria novas.", homeAmariDesc:"Gere amari e licores para shots.", homeConfirmNew:"Começar um novo evento? Os dados não guardados serão perdidos." },
            nl: { homeEyebrow:"Waar wil je beginnen?", homeNewTitle:"Nieuw evenement maken", homeNewDesc:"Bereken de boodschappenlijst en kosten voor je avond.", homeResumeTitle:"Lopend evenement hervatten", homeResumeDesc:"Ga terug naar het evenement dat je aan het voorbereiden was.", homeEventsDesc:"Open, bewerk of vink de lijst van een opgeslagen evenement af.", homeCocktailDesc:"Bewerk recepten of maak nieuwe.", homeAmariDesc:"Beheer bitters en shotlikeuren.", homeConfirmNew:"Een nieuw evenement beginnen? Niet-opgeslagen gegevens gaan verloren." }
        };
        Object.keys(_homeI18n).forEach(lg => {
            if (translations[lg]) Object.assign(translations[lg], _homeI18n[lg]);
        });

        /* ── i18n Impostazioni (lingua/tema/salvataggio automatico) — 7 lingue ── */
        const _settingsI18n = {
            it: { homeSettingsTitle:"Impostazioni", homeSettingsDesc:"Lingua, tema e salvataggio automatico.", setEyebrow:"Preferenze", setTitle:"Impostazioni", setLang:"Lingua predefinita", setTheme:"Tema predefinito", setAutosave:"Salvataggio automatico", setAutosaveDesc:"Salva da solo l'evento in corso mentre lavori.", storageStatusOff:"Salvataggio automatico disattivato" },
            en: { homeSettingsTitle:"Settings", homeSettingsDesc:"Language, theme and auto-save.", setEyebrow:"Preferences", setTitle:"Settings", setLang:"Default language", setTheme:"Default theme", setAutosave:"Auto-save", setAutosaveDesc:"Automatically saves the event in progress as you work.", storageStatusOff:"Auto-save off" },
            es: { homeSettingsTitle:"Ajustes", homeSettingsDesc:"Idioma, tema y guardado automático.", setEyebrow:"Preferencias", setTitle:"Ajustes", setLang:"Idioma predeterminado", setTheme:"Tema predeterminado", setAutosave:"Guardado automático", setAutosaveDesc:"Guarda solo el evento en curso mientras trabajas.", storageStatusOff:"Guardado automático desactivado" },
            fr: { homeSettingsTitle:"Réglages", homeSettingsDesc:"Langue, thème et sauvegarde automatique.", setEyebrow:"Préférences", setTitle:"Réglages", setLang:"Langue par défaut", setTheme:"Thème par défaut", setAutosave:"Sauvegarde automatique", setAutosaveDesc:"Enregistre tout seul l'événement en cours pendant que tu travailles.", storageStatusOff:"Sauvegarde automatique désactivée" },
            de: { homeSettingsTitle:"Einstellungen", homeSettingsDesc:"Sprache, Thema und automatisches Speichern.", setEyebrow:"Präferenzen", setTitle:"Einstellungen", setLang:"Standardsprache", setTheme:"Standard-Thema", setAutosave:"Automatisches Speichern", setAutosaveDesc:"Speichert das laufende Event automatisch, während du arbeitest.", storageStatusOff:"Automatisches Speichern aus" },
            pt: { homeSettingsTitle:"Definições", homeSettingsDesc:"Idioma, tema e gravação automática.", setEyebrow:"Preferências", setTitle:"Definições", setLang:"Idioma predefinido", setTheme:"Tema predefinido", setAutosave:"Gravação automática", setAutosaveDesc:"Grava sozinho o evento em curso enquanto trabalhas.", storageStatusOff:"Gravação automática desativada" },
            nl: { homeSettingsTitle:"Instellingen", homeSettingsDesc:"Taal, thema en automatisch opslaan.", setEyebrow:"Voorkeuren", setTitle:"Instellingen", setLang:"Standaardtaal", setTheme:"Standaardthema", setAutosave:"Automatisch opslaan", setAutosaveDesc:"Slaat het lopende evenement automatisch op terwijl je werkt.", storageStatusOff:"Automatisch opslaan uit" }
        };
        Object.keys(_settingsI18n).forEach(lg => {
            if (translations[lg]) Object.assign(translations[lg], _settingsI18n[lg]);
        });

        /* Empty state del builder (schede menu vuote) — ×7 lingue */
        const _emptyI18n = {
            it: { emptyMenuTitle:"Ancora niente qui", emptyMenuDesc:"Usa la ricerca qui sopra per aggiungere voci: compariranno in questo elenco." },
            en: { emptyMenuTitle:"Nothing here yet", emptyMenuDesc:"Use the search above to add items: they'll show up in this list." },
            es: { emptyMenuTitle:"Aún no hay nada", emptyMenuDesc:"Usa el buscador de arriba para añadir elementos: aparecerán en esta lista." },
            fr: { emptyMenuTitle:"Rien ici pour l'instant", emptyMenuDesc:"Utilise la recherche ci-dessus pour ajouter des éléments : ils apparaîtront dans cette liste." },
            de: { emptyMenuTitle:"Noch nichts hier", emptyMenuDesc:"Nutze die Suche oben, um Einträge hinzuzufügen – sie erscheinen in dieser Liste." },
            pt: { emptyMenuTitle:"Ainda nada aqui", emptyMenuDesc:"Usa a pesquisa acima para adicionar itens: vão aparecer nesta lista." },
            nl: { emptyMenuTitle:"Nog niets hier", emptyMenuDesc:"Gebruik de zoekbalk hierboven om items toe te voegen: ze verschijnen in deze lijst." }
        };
        Object.keys(_emptyI18n).forEach(lg => {
            if (translations[lg]) Object.assign(translations[lg], _emptyI18n[lg]);
        });


        /* Helper: restituisce la stringa tradotta nella lingua corrente */
        function T(key) {
            const tr = translations[linguaCorrente] || translations.it;
            return tr[key] !== undefined ? tr[key] : (translations.it[key] || key);
        }

        /* Traduce il nome di un ingrediente (canonico italiano → lingua corrente) */
        function tradIngrediente(nomeIt) {
            const tr = translations[linguaCorrente] || translations.it;
            return (tr.ing && tr.ing[nomeIt]) ? tr.ing[nomeIt] : nomeIt;
        }

        /* Applica tutte le traduzioni al DOM */
        function cambiaLingua(lang) {
            if (!translations[lang]) lang = 'it';
            linguaCorrente = lang;
            document.documentElement.lang = lang;
            const tr = translations[lang];

            /* ── Elementi generici con data-i18n → textContent ── */
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const k = el.dataset.i18n;
                if (tr[k] !== undefined) el.textContent = tr[k];
            });

            /* ── Placeholder con data-i18n-ph ── */
            document.querySelectorAll('[data-i18n-ph]').forEach(el => {
                const k = el.dataset.i18nPh;
                if (tr[k] !== undefined) el.placeholder = tr[k];
            });

            /* ── Elementi con icone — aggiornamento diretto ── */
            document.querySelectorAll('[href$=".pdf"][download]').forEach(a => { if (!a.dataset.i18nSkip) a.textContent = '↳ ' + tr.btnScarica; });
            _i18nTxt('#h3-nuovo-cocktail',                  '' + tr.newCocktailH3);
            _i18nTxt('#h3-bottiglia-shot',                  '' + tr.bottShotH3);
            _i18nTxt('.btn-aggiungi-ing',                   '✚ ' + tr.btnAggiungiIng);
            document.querySelectorAll('.search-add-row button').forEach(b => b.textContent = '✚ ' + tr.btnAggiungi);
            const bsArr = document.querySelectorAll('.btn-secondary');
            if (bsArr[0]) bsArr[0].textContent = '' + tr.btnCrea;
            if (bsArr[1]) bsArr[1].textContent = '' + tr.btnCreaShot;
            false && _i18nHTML('.btn-grande', '❦  ' + tr.btnGenera + '  ❦');
            const rh3 = document.querySelectorAll('.result-section h3');
            if (rh3[0]) rh3[0].textContent = '' + tr.risultatiAlcolici;
            if (rh3[1]) rh3[1].textContent = '' + tr.risultatiAnalcolici;
            if (rh3[2]) rh3[2].textContent = '' + tr.risultatiAttrezzatura;
            const abtn = document.querySelectorAll('.action-buttons button');
            if (abtn[0]) abtn[0].textContent = '➜ ' + (tr.btnCondividi || translations.it.btnCondividi);
            if (abtn[1]) abtn[1].textContent = '' + tr.btnCopia;
            if (abtn[2]) abtn[2].textContent = '' + tr.btnStampa;
            if (abtn[3]) abtn[3].textContent = '' + (tr.menuOpenBtn || translations.it.menuOpenBtn);
            // La home è costruita con T() al render (niente data-i18n): se è aperta, va ri-renderizzata.
            if (document.body.classList.contains('bp-home') && typeof bpHomeRender === 'function') bpHomeRender();
            // Storage status (riflette anche lo stato del salvataggio automatico)
            if (typeof bpUpdateStorageStatus === 'function') bpUpdateStorageStatus();
            // Bottone installa
            const binst = document.getElementById('btn-installa-app');
            if (binst) binst.textContent = '⬇ ' + tr.btnInstalla;

            /* ── Selettore lingua ── */
            const sel = document.getElementById('lang-selector');
            if (sel && sel.value !== lang) sel.value = lang;

            /* ── Re-render slider per "Rimuovi" e "Freq." ── */
            if (typeof renderizzaMenu === 'function') renderizzaMenu();

            bpSaveSettings();   // la lingua scelta è una preferenza: persiste sempre
            salvaStato();
        }

        function _i18nTxt(sel, txt) {
            const el = document.querySelector(sel);
            if (el) el.textContent = txt;
        }
        function _i18nHTML(sel, html) {
            const el = document.querySelector(sel);
            if (el) el.innerHTML = html;
        }

        /* ════════════════════════════════════════════════════════════
           DATABASE COCKTAIL
           ════════════════════════════════════════════════════════════ */
        /* ─── MAPPA ALIAS — fonde voci equivalenti scritte in lingue diverse ───
           Aggiungi qui qualsiasi nuovo alias se l'utente scrive un ingrediente in modo diverso.
           Tutto viene normalizzato in italiano coerente nella lista finale. */
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

        /* ════════════════════════════════════════════════════════════
           MOTORE DI STIMA COSTI — Dati (prezzi arrotondati ↑0.5)
           ════════════════════════════════════════════════════════════ */
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

        function escHTML(str) {
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
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
            "Vodka Redbull (HV)": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 60}, {nome: "Energy Drink", tipo: "analcolico", ml: 140}],
            "Vodka Lemon (HV)": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 60}, {nome: "Lemon Soda", tipo: "analcolico", ml: 140}],
            "Vodka Menta Redbull (HV)": [{nome: "Vodka Menta", tipo: "alcolico", ml: 60}, {nome: "Energy Drink", tipo: "analcolico", ml: 140}],
            "Vodka Pesca Redbull (HV)": [{nome: "Vodka Pesca", tipo: "alcolico", ml: 60}, {nome: "Energy Drink", tipo: "analcolico", ml: 140}],
            "Vodka Fragola Redbull (HV)": [{nome: "Vodka Fragola", tipo: "alcolico", ml: 60}, {nome: "Energy Drink", tipo: "analcolico", ml: 140}],
            "Vodka Melone Redbull (HV)": [{nome: "Vodka Melone", tipo: "alcolico", ml: 60}, {nome: "Energy Drink", tipo: "analcolico", ml: 140}],
            "Vodka Menta Lemon (HV)": [{nome: "Vodka Menta", tipo: "alcolico", ml: 60}, {nome: "Lemon Soda", tipo: "analcolico", ml: 140}],
            "Vodka Pesca Lemon (HV)": [{nome: "Vodka Pesca", tipo: "alcolico", ml: 60}, {nome: "Lemon Soda", tipo: "analcolico", ml: 140}],
            "Vodka Fragola Lemon (HV)": [{nome: "Vodka Fragola", tipo: "alcolico", ml: 60}, {nome: "Lemon Soda", tipo: "analcolico", ml: 140}],
            "Vodka Melone Lemon (HV)": [{nome: "Vodka Melone", tipo: "alcolico", ml: 60}, {nome: "Lemon Soda", tipo: "analcolico", ml: 140}],
            "Gin Tonic (HV)": [{nome: "Gin", tipo: "alcolico", ml: 60}, {nome: "Acqua Tonica", tipo: "analcolico", ml: 140}],
            "Gin Lemon (HV)": [{nome: "Gin", tipo: "alcolico", ml: 60}, {nome: "Lemon Soda", tipo: "analcolico", ml: 140}],
            "Rum & Coca (HV)": [{nome: "Rum Bianco", tipo: "alcolico", ml: 60}, {nome: "Cola", tipo: "analcolico", ml: 140}],
            "Monte & Coca (HV)": [{nome: "Amaro Montenegro", tipo: "alcolico", ml: 60}, {nome: "Cola", tipo: "analcolico", ml: 140}],
            "Jager & Redbull (HV)": [{nome: "Jägermeister", tipo: "alcolico", ml: 60}, {nome: "Energy Drink", tipo: "analcolico", ml: 140}],
            "Malibu & Ananas (HV)": [{nome: "Malibu", tipo: "alcolico", ml: 60}, {nome: "Succo di Ananas", tipo: "analcolico", ml: 140}],
            "Midori Lemon (HV)": [{nome: "Midori", tipo: "alcolico", ml: 60}, {nome: "Lemon Soda", tipo: "analcolico", ml: 140}],
            "Garibaldi (HV)": [{nome: "Bitter Campari", tipo: "alcolico", ml: 60}, {nome: "Succo di Arancia", tipo: "analcolico", ml: 140}],
            "Fernandito (HV)": [{nome: "Fernet Branca", tipo: "alcolico", ml: 60}, {nome: "Cola", tipo: "analcolico", ml: 140}],
            "Dark N Stormy (HV)": [{nome: "Rum Scuro", tipo: "alcolico", ml: 60}, {nome: "Ginger Beer", tipo: "analcolico", ml: 140}],
            "Horses Neck (HV)": [{nome: "Cognac", tipo: "alcolico", ml: 60}, {nome: "Ginger Ale", tipo: "analcolico", ml: 140}],
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
            "Garibaldi (IBA)": [{nome: "Bitter Campari", tipo: "alcolico", ml: 45}, {nome: "Succo di Arancia", tipo: "analcolico", ml: 120}],
            "Irish Coffee": [{nome: "Whiskey Irlandese", tipo: "alcolico", ml: 50}, {nome: "Caffè", tipo: "analcolico", ml: 120}, {nome: "Panna Fresca", tipo: "analcolico", ml: 50}],
            "Long Island": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 15}, {nome: "Tequila", tipo: "alcolico", ml: 15}, {nome: "Rum Bianco", tipo: "alcolico", ml: 15}, {nome: "Gin", tipo: "alcolico", ml: 15}, {nome: "Cointreau", tipo: "alcolico", ml: 15}, {nome: "Succo di Limone", tipo: "analcolico", ml: 25}, {nome: "Cola", tipo: "analcolico", ml: 60}],
            "Mai-Tai": [{nome: "Rum Giamaicano", tipo: "alcolico", ml: 30}, {nome: "Rum Martinicano", tipo: "alcolico", ml: 30}, {nome: "Curaçao all'Arancia", tipo: "alcolico", ml: 15}, {nome: "Orgeat", tipo: "analcolico", ml: 15}, {nome: "Succo di Lime", tipo: "analcolico", ml: 30}],
            "Margarita": [{nome: "Tequila", tipo: "alcolico", ml: 50}, {nome: "Triple Sec", tipo: "alcolico", ml: 20}, {nome: "Succo di Lime", tipo: "analcolico", ml: 15}],
            "Mojito": [{nome: "Rum Bianco", tipo: "alcolico", ml: 45}, {nome: "Succo di Lime", tipo: "analcolico", ml: 20}, {nome: "Soda", tipo: "analcolico", ml: 40}],
            "Moscow Mule (IBA)": [{nome: "Vodka Liscia", tipo: "alcolico", ml: 45}, {nome: "Ginger Beer", tipo: "analcolico", ml: 120}, {nome: "Succo di Lime", tipo: "analcolico", ml: 10}],
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

        // Snapshot dei cocktail predefiniti — per "Ripristina originale" nella libreria.
        const DB_ORIGINAL = JSON.parse(JSON.stringify(databaseDrink));

        /* ════ LIBRERIA RICETTE · "I miei cocktail" / "I miei amari" ════
           Store persistente, separato da barmanProState_v7 (sopravvive al reset evento).
           mods: ricette modificate/create (riapplicate su databaseDrink al load)
           custom: nomi creati dall'utente (eliminabili); amari: lista nomi per gli shot. */
        const BP_RECIPES_KEY = 'bp_recipes';
        const BP_AMARI_DEFAULT = ['Amaro Montenegro','Amaro Nonino','Amaro del Capo','Fernet Branca','Jägermeister','Mirto','Amaretto','Baileys','Liquore al Caffè','Limoncello','Sambuca','Grappa'];
        let bpRecipes = { mods:{}, custom:[], amari:null };
        function bpRecipesLoad(){
            try { const r = JSON.parse(localStorage.getItem(BP_RECIPES_KEY)); if (r && typeof r === 'object'){ bpRecipes.mods = r.mods || {}; bpRecipes.custom = Array.isArray(r.custom) ? r.custom : []; bpRecipes.amari = Array.isArray(r.amari) ? r.amari : null; } } catch(e){}
            if (!bpRecipes.amari) bpRecipes.amari = BP_AMARI_DEFAULT.slice();
        }
        function bpRecipesSave(){ try { localStorage.setItem(BP_RECIPES_KEY, JSON.stringify(bpRecipes)); } catch(e){} }
        function bpRecipesApply(){ Object.keys(bpRecipes.mods).forEach(n => { databaseDrink[n] = JSON.parse(JSON.stringify(bpRecipes.mods[n])); }); }

        let menuSerataDrink = {};
        let menuSerataMocktail = {};
        let menuSerataShot = {};
        let customShots = [];
        let customDrinks = {};
        let ingredientCounter = 0;

        const STORAGE_KEY = 'barmanProState_v7';
        const BP_SETTINGS_KEY = 'bp_settings';   // preferenze (lingua/tema/auto-save), chiave separata da STORAGE_KEY
        let bpAutoSave = true;                   // salvataggio automatico dell'evento in corso (toggle Impostazioni, ON di default)
        let bpSaveTimer = 0;
        let bpCalcFrame = 0;

        function programmaSalvataggio(delay) {
            clearTimeout(bpSaveTimer);
            bpSaveTimer = setTimeout(() => {
                bpSaveTimer = 0;
                salvaStato();
            }, delay == null ? 350 : delay);
        }

        function flushSalvataggio() {
            if (!bpSaveTimer) return;
            clearTimeout(bpSaveTimer);
            bpSaveTimer = 0;
            salvaStato();
        }

        function programmaRicalcoloLista() {
            if (bpCalcFrame) return;
            bpCalcFrame = requestAnimationFrame(() => {
                bpCalcFrame = 0;
                calcolaSpesa(true);
                programmaSalvataggio();
            });
        }

        window.addEventListener('pagehide', flushSalvataggio);
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') flushSalvataggio();
        });

        /* ════════════════════════════════════════════════════════════
           PERSISTENZA  (localStorage)
           ════════════════════════════════════════════════════════════ */
        function salvaStato() {
            // Auto-save OFF: non persistere l'evento in corso. Le preferenze
            // (lingua/tema/auto-save) vivono in bp_settings e restano salvate a parte.
            if (!bpAutoSave) return;
            try {
                const _get = id => { const el = document.getElementById(id); return el ? el.value : ''; };
                const state = {
                    menuSerataDrink: menuSerataDrink,
                    menuSerataMocktail: menuSerataMocktail,
                    menuSerataShot: menuSerataShot,
                    customShots: customShots,
                    customDrinks: customDrinks,
                    lingua: linguaCorrente,
                    tema: document.body.getAttribute('data-theme') || 'night',
                    config: {
                        ospiti: _get('ospiti'),
                        drink_testa: _get('drink_testa'),
                        shot_testa: _get('shot_testa'),
                        scarto: _get('scarto'),
                        nazione: _get('sel-nazione'),
                        fascia: _get('sel-fascia'),
                        pct_bevitori: _get('pct-bevitori'),
                        ferm_vino_rosso: _get('ferm_vino_rosso'),
                        ferm_vino_bianco: _get('ferm_vino_bianco'),
                        ferm_bollicine: _get('ferm_bollicine'),
                        ferm_birra: _get('ferm_birra'),
                        fascia_fermentati: _get('sel-fascia-fermentati'),
                        nome_evento: bpCfgNomeEvento || ''
                    }
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            } catch(e) { console.warn('Salvataggio fallito:', e); }
        }

        function caricaStato() {
            try {
                const raw = localStorage.getItem(STORAGE_KEY);
                if(!raw) return;
                const s = JSON.parse(raw);
                menuSerataDrink = s.menuSerataDrink || {};
                menuSerataMocktail = s.menuSerataMocktail || {};
                menuSerataShot = s.menuSerataShot || {};
                customShots = s.customShots || [];
                customDrinks = s.customDrinks || {};
                Object.assign(databaseDrink, customDrinks);
                if (s.lingua && translations[s.lingua]) linguaCorrente = s.lingua;
                if (s.tema === 'night' || s.tema === 'wedding') {
                    document.body.setAttribute('data-theme', s.tema);
                    aggiornaThemeButtons(s.tema);
                }
                const _set = (id, v) => { const el = document.getElementById(id); if (el && v != null && v !== '') el.value = v; };
                if(s.config) {
                    _set('ospiti', s.config.ospiti);
                    _set('drink_testa', s.config.drink_testa);
                    _set('shot_testa', s.config.shot_testa);
                    _set('scarto', s.config.scarto);
                    _set('sel-fascia', s.config.fascia);
                    _set('pct-bevitori', s.config.pct_bevitori);
                    _set('ferm_vino_rosso', s.config.ferm_vino_rosso);
                    _set('ferm_vino_bianco', s.config.ferm_vino_bianco);
                    _set('ferm_bollicine', s.config.ferm_bollicine);
                    _set('ferm_birra', s.config.ferm_birra);
                    _set('sel-fascia-fermentati', s.config.fascia_fermentati);
                    if (s.config.nome_evento) bpCfgNomeEvento = s.config.nome_evento;
                }
                aggiornaPctBevitori();
            } catch(e) { console.warn('Caricamento fallito:', e); }
        }

        /* ════════════════════════════════════════════════════════════
           IMPOSTAZIONI · preferenze persistenti (bp_settings)
           Chiave separata da STORAGE_KEY: lingua/tema/auto-save si salvano
           SEMPRE qui, anche con auto-save OFF (sono "default" dell'app).
           ════════════════════════════════════════════════════════════ */
        function bpSaveSettings() {
            try {
                localStorage.setItem(BP_SETTINGS_KEY, JSON.stringify({
                    lingua: linguaCorrente,
                    tema: document.body.getAttribute('data-theme') || 'night',
                    autosave: bpAutoSave ? 1 : 0
                }));
            } catch(e) { console.warn('Salvataggio impostazioni fallito:', e); }
        }
        function bpLoadSettings() {
            try {
                const raw = localStorage.getItem(BP_SETTINGS_KEY);
                if (!raw) return;
                const s = JSON.parse(raw);
                if (s.lingua && translations[s.lingua]) linguaCorrente = s.lingua;
                if (s.tema === 'night' || s.tema === 'wedding') {
                    document.body.setAttribute('data-theme', s.tema);
                    aggiornaThemeButtons(s.tema);
                }
                if (s.autosave != null) bpAutoSave = !!s.autosave;
            } catch(e) { console.warn('Caricamento impostazioni fallito:', e); }
        }
        function bpUpdateStorageStatus() {
            const ss = document.getElementById('storage-status');
            if (ss) ss.textContent = '' + (bpAutoSave ? T('storageStatus') : T('storageStatusOff'));
        }
        function bpSettingsOpen() {
            const o = document.getElementById('bp-settings'); if (!o) return;
            const sel = document.getElementById('lang-selector'); if (sel) sel.value = linguaCorrente;
            aggiornaThemeButtons(document.body.getAttribute('data-theme') || 'night');
            bpSyncAutoSaveUI();
            o.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
        function bpSettingsClose() {
            const o = document.getElementById('bp-settings'); if (o) o.classList.remove('show');
            document.body.style.overflow = '';
        }
        function bpSyncAutoSaveUI() {
            const b = document.getElementById('bp-autosave'); if (!b) return;
            b.setAttribute('aria-checked', bpAutoSave ? 'true' : 'false');
        }
        function bpToggleAutoSave() {
            bpAutoSave = !bpAutoSave;
            bpSyncAutoSaveUI();
            bpSaveSettings();
            if (bpAutoSave) salvaStato();   // riattivato: persisti subito lo stato corrente
            bpUpdateStorageStatus();
        }

        function resetCompleto() {
            if(!confirm(T('confirmReset'))) return;
            _bpEventResetCore();
            vaiAStep('step-setup');
            mostraToast(T('toastReset'));
        }
        // Reset dell'evento corrente SENZA conferma né navigazione/toast.
        // Usato da "Crea nuovo evento" in home (che ha la sua conferma) prima di mostrare la scelta guidata/manuale.
        function _bpEventResetCore() {
            bpEditingId = null;
            bpCfgNomeEvento = '';
            if (typeof bpSyncNomeField === 'function') bpSyncNomeField();
            menuSerataDrink = {};
            menuSerataMocktail = {};
            menuSerataShot = {};
            customShots = [];
            customDrinks = {};
            // ricostruisco databaseDrink rimuovendo i custom
            for(const k in databaseDrink) {
                if(k in (customDrinks || {})) delete databaseDrink[k];
            }
            localStorage.removeItem(STORAGE_KEY);
            document.getElementById('ospiti').value = 50;
            document.getElementById('drink_testa').value = 3;
            document.getElementById('shot_testa').value = 1;
            document.getElementById('scarto').value = 15;
            document.getElementById('sel-nazione').value = 'Italia';
            document.getElementById('sel-fascia').value = 'media';
            const _pct = document.getElementById('pct-bevitori'); if (_pct) { _pct.value = 80; aggiornaPctBevitori(); }
            ['ferm_vino_rosso','ferm_vino_bianco','ferm_bollicine','ferm_birra'].forEach(id => { const e = document.getElementById(id); if (e) e.value = 0; });
            const _fascF = document.getElementById('sel-fascia-fermentati'); if (_fascF) _fascF.value = 'media';
            document.getElementById('budget-box').style.display = 'none';
            document.getElementById('risultati').style.display = 'none';
            const _bf = document.getElementById('block_fermentati'); if (_bf) _bf.style.display = 'none';
            document.getElementById('ingredienti-container').innerHTML = '';
            aggiungiRigaIngrediente();
            aggiungiRigaIngrediente();
            inizializzaApp();
            renderizzaMenu();
        }

        function mostraToast(testo) {
            const t = document.getElementById('toast');
            t.textContent = '❖  ' + testo;
            t.classList.add('show');
            clearTimeout(window._toastTimer);
            window._toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
        }

        /* ════════════════════════════════════════════════════════════
           INIZIALIZZAZIONE
           ════════════════════════════════════════════════════════════ */
        function inizializzaApp() {
            function aggiungiOption(datalist, valore) {
                const opt = document.createElement('option');
                opt.value = valore;
                datalist.appendChild(opt);
            }

            // Datalist drink ALCOLICI: cocktail con ≥1 ingrediente alcolico
            // Datalist drink ANALCOLICI (mocktail): cocktail con TUTTI ingredienti analcolici
            const datalistDrink = document.getElementById('lista-database-drink');
            const datalistMocktail = document.getElementById('lista-database-mocktail');
            datalistDrink.innerHTML = '';
            if (datalistMocktail) datalistMocktail.innerHTML = '';
            Object.keys(databaseDrink).sort().forEach(nome => {
                const ings = databaseDrink[nome] || [];
                const hasAlc = ings.some(i => i.tipo === 'alcolico');
                if (hasAlc) {
                    aggiungiOption(datalistDrink, nome);
                } else if (datalistMocktail) {
                    aggiungiOption(datalistMocktail, nome);
                }
            });

            let setTuttiIngredienti = new Set();
            let setSoloAlcolici = new Set();

            for (const d in databaseDrink) {
                databaseDrink[d].forEach(ing => {
                    setTuttiIngredienti.add(ing.nome);
                    if (ing.tipo === 'alcolico') setSoloAlcolici.add(ing.nome);
                });
            }
            customShots.forEach(s => {
                setSoloAlcolici.add(s);
                setTuttiIngredienti.add(s);
            });
            // Shot/amari proposti dal suggeritore ma non presenti in nessun cocktail del DB:
            // li rendiamo cercabili anche manualmente nella ricerca shot.
            ['Mirto'].forEach(s => { setSoloAlcolici.add(s); setTuttiIngredienti.add(s); });

            const datalistIngredienti = document.getElementById('lista-ingredienti');
            datalistIngredienti.innerHTML = '';
            Array.from(setTuttiIngredienti).sort().forEach(nome => aggiungiOption(datalistIngredienti, nome));

            const datalistShot = document.getElementById('lista-database-shot');
            datalistShot.innerHTML = '';
            Array.from(setSoloAlcolici).sort().forEach(nome => aggiungiOption(datalistShot, nome));

            const selNazione = document.getElementById('sel-nazione');
            if (selNazione && selNazione.options.length === 0) {
                Object.keys(indiciGeo).sort().forEach(n => {
                    const opt = document.createElement('option');
                    opt.value = n;
                    opt.textContent = n;
                    if (n === 'Italia') opt.selected = true;
                    selNazione.appendChild(opt);
                });
            }
        }

        /* ════════════════════════════════════════════════════════════
           AGGIUNTA E RIMOZIONE
           ════════════════════════════════════════════════════════════ */
        function aggiungiDrinkSerata() {
            let inputField = document.getElementById('search-drink-input');
            let nome = inputField.value.trim();
            if(!nome) return;
            if(!databaseDrink[nome]) return alert(T('alertCocktailNonTrovato'));

            // Sicurezza: se per errore l'utente cerca qui un mocktail (es. autocomplete cross-section),
            // ridirigiamo nel menu corretto basandoci sul contenuto degli ingredienti.
            const hasAlc = databaseDrink[nome].some(i => i.tipo === 'alcolico');
            if (!hasAlc) {
                if (!(nome in menuSerataMocktail)) menuSerataMocktail[nome] = 1;
            } else {
                if (!(nome in menuSerataDrink)) menuSerataDrink[nome] = 1;
            }
            inputField.value = '';
            renderizzaMenu();
            salvaStato();
        }

        function aggiungiMocktailSerata() {
            let inputField = document.getElementById('search-mocktail-input');
            let nome = inputField.value.trim();
            if(!nome) return;
            if(!databaseDrink[nome]) return alert(T('alertMocktailNonTrovato'));
            const hasAlc = (databaseDrink[nome] || []).some(i => i.tipo === 'alcolico');
            if (hasAlc) return alert(T('alertMocktailNonTrovato'));

            if (!(nome in menuSerataMocktail)) menuSerataMocktail[nome] = 1;
            inputField.value = '';
            renderizzaMenu();
            salvaStato();
        }

        function aggiungiShotSerata() {
            let inputField = document.getElementById('search-shot-input');
            let nome = inputField.value.trim();
            if(!nome) return;

            if (!(nome in menuSerataShot)) menuSerataShot[nome] = 1;
            inputField.value = '';
            renderizzaMenu();
            salvaStato();
        }

        function aggiornaFrequenza(nome, tipo, valore) {
            if (tipo === 'drink')    menuSerataDrink[nome]    = parseInt(valore);
            if (tipo === 'mocktail') menuSerataMocktail[nome] = parseInt(valore);
            if (tipo === 'shot')     menuSerataShot[nome]     = parseInt(valore);
            programmaSalvataggio();
            aggiornaStimaForm();
        }

        function rimuovi(nome, tipo) {
            if(tipo === 'drink')    delete menuSerataDrink[nome];
            if(tipo === 'mocktail') delete menuSerataMocktail[nome];
            if(tipo === 'shot')     delete menuSerataShot[nome];
            renderizzaMenu();
            salvaStato();
        }

        function renderizzaMenu() {
            const renderMenuGroup = (containerId, menu, tipo) => {
                const container = document.getElementById(containerId);
                if (!container) return;
                const frag = document.createDocumentFragment();
                Object.keys(menu).sort().forEach(nome => {
                    frag.appendChild(creaSliderElement(nome, tipo, menu[nome]));
                });
                container.replaceChildren(frag);
            };
            renderMenuGroup('drink-serata-container', menuSerataDrink, 'drink');
            renderMenuGroup('mocktail-serata-container', menuSerataMocktail, 'mocktail');
            renderMenuGroup('shot-serata-container', menuSerataShot, 'shot');

            aggiornaBadge();
        }

        /* ── Conteggio voci per le schede del builder ── */
        function aggiornaBadge() {
            const setBadge = (id, n) => {
                const b = document.getElementById(id);
                if (!b) return;
                b.textContent = n;
                b.classList.toggle('empty', n === 0);
            };
            setBadge('badge-alcolici', Object.keys(menuSerataDrink).length);
            setBadge('badge-analcolici', Object.keys(menuSerataMocktail).length);
            setBadge('badge-shot', Object.keys(menuSerataShot).length);
            const fermN = ['ferm_vino_rosso','ferm_vino_bianco','ferm_bollicine','ferm_birra']
                .reduce((acc, fid) => {
                    const el = document.getElementById(fid);
                    return acc + (el && parseFloat(el.value) > 0 ? 1 : 0);
                }, 0);
            setBadge('badge-fermentati', fermN);
            aggiornaStimaForm();
        }

        /* ── Schede del builder ── */
        function mostraTab(key) {
            document.querySelectorAll('.builder-tab').forEach(t => {
                const on = t.dataset.tab === key;
                t.classList.toggle('active', on);
                t.setAttribute('aria-selected', on ? 'true' : 'false');   // a11y: stato tab (additivo)
            });
            document.querySelectorAll('.builder-panel').forEach(p => {
                p.classList.toggle('active', p.dataset.panel === key);
            });
        }

        /* ── Navigazione a step (wizard: una sezione visibile alla volta) ── */
        function vaiAStep(id) {
            // Arrivando alla lista, (ri)calcola: se manca il menu resta dove sei
            if (id === 'risultati' && calcolaSpesa() === false) return;
            document.body.classList.remove('bp-home');   // entrare in uno step esce dalla home
            // Mostra solo il pannello scelto
            document.querySelectorAll('.step-panel').forEach(p => {
                p.classList.toggle('active', p.dataset.stepid === id);
            });
            // Aggiorna lo stato dello stepper
            document.querySelectorAll('.app-stepper .step').forEach(s => {
                const on = s.dataset.step === id;
                s.classList.toggle('active', on);
                if (on) s.setAttribute('aria-current', 'step');           // a11y: passo corrente (additivo)
                else s.removeAttribute('aria-current');
            });
            // Riporta in alto il pannello attivo, sotto lo stepper sticky
            const panel = document.querySelector('.step-panel[data-stepid="' + id + '"]');
            if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function creaSliderElement(nome, tipo, valoreAttuale) {
            const wrap = document.createElement('div');
            wrap.className = 'menu-item';

            const header = document.createElement('div');
            header.className = 'menu-header';

            const span = document.createElement('span');
            span.textContent = nome;

            const btnRimuovi = document.createElement('button');
            btnRimuovi.className = 'btn-rimuovi';
            btnRimuovi.textContent = T('sliderRimuovi');
            btnRimuovi.addEventListener('click', () => rimuovi(nome, tipo));

            header.appendChild(span);
            header.appendChild(btnRimuovi);

            const sliderWrap = document.createElement('div');
            sliderWrap.className = 'slider-container';

            const lbl = document.createElement('span');
            lbl.className = 'lbl';
            lbl.textContent = T('sliderFreq');

            const slider = document.createElement('input');
            slider.type = 'range';
            slider.min = 1;
            slider.max = 5;
            slider.value = valoreAttuale;

            const sliderVal = document.createElement('span');
            sliderVal.className = 'slider-value';
            sliderVal.textContent = valoreAttuale;

            slider.addEventListener('input', function() {
                sliderVal.textContent = this.value;
                aggiornaFrequenza(nome, tipo, this.value);
            });

            sliderWrap.appendChild(lbl);
            sliderWrap.appendChild(slider);
            sliderWrap.appendChild(sliderVal);

            wrap.appendChild(header);
            wrap.appendChild(sliderWrap);
            return wrap;
        }

        /* ════════════════════════════════════════════════════════════
           CREATOR — Cocktail con N ingredienti dinamici
           ════════════════════════════════════════════════════════════ */
        function aggiungiRigaIngrediente(preset) {
            const c = document.getElementById('ingredienti-container');
            const id = ++ingredientCounter;
            const nome = preset && preset.nome ? preset.nome : '';
            const ml = preset && preset.ml ? preset.ml : '';
            const tipo = preset && preset.tipo ? preset.tipo : 'alcolico';
            const div = document.createElement('div');
            div.className = 'creator-row';
            div.id = 'row-' + id;
            div.innerHTML = `
                <input type="text" class="ing-nome" placeholder="${T('phIngrediente')}" list="lista-ingredienti">
                <select class="ing-tipo">
                    <option value="alcolico">${T('labelAlcolico')}</option>
                    <option value="analcolico">${T('labelAnalcolico')}</option>
                </select>
                <input type="number" class="ing-ml" placeholder="${T('phMl')}" min="0" step="0.5">
                <button class="btn-rimuovi-ing" title="${T('lblRimuovi') || 'Rimuovi'}">&times;</button>
            `;
            div.querySelector('.ing-nome').value = nome;
            div.querySelector('.ing-ml').value = ml;
            div.querySelector('.ing-tipo').value = tipo;
            div.querySelector('.btn-rimuovi-ing').addEventListener('click', () => div.remove());
            c.appendChild(div);
        }

        function creaCocktail() {
            let nome = document.getElementById('new_cocktail_name').value.trim();
            if(!nome) return alert(T('alertNomeCocktailVuoto'));

            let ingredienti = [];
            document.querySelectorAll('#ingredienti-container .creator-row').forEach(row => {
                let n = row.querySelector('.ing-nome').value.trim();
                let mlRaw = row.querySelector('.ing-ml').value;
                let ml = parseFloat(mlRaw);
                let tipo = row.querySelector('.ing-tipo').value;
                if(n && !isNaN(ml) && ml > 0) ingredienti.push({nome: n, tipo: tipo, ml: ml});
            });

            if(ingredienti.length === 0) return alert(T('alertIngVuoti'));

            databaseDrink[nome] = ingredienti;
            // Registra la ricetta nella libreria "I miei cocktail": così compare
            // come voce personale (badge "Personale") ed è eliminabile, e sopravvive
            // al reset dell'evento (store bp_recipes, separato da customDrinks/stato).
            bpRecipes.mods[nome] = JSON.parse(JSON.stringify(ingredienti));
            if (!DB_ORIGINAL[nome] && bpRecipes.custom.indexOf(nome) < 0) bpRecipes.custom.push(nome);
            bpRecipesSave();

            // ─── AUTO-DETECT alcolico vs mocktail ────────────────────────
            // Se NESSUN ingrediente è alcolico → mocktail (va nella sezione analcolici).
            // Altrimenti → cocktail alcolico standard.
            const hasAlc = ingredienti.some(i => i.tipo === 'alcolico');
            if (hasAlc) {
                menuSerataDrink[nome] = 1;
            } else {
                menuSerataMocktail[nome] = 1;
            }

            document.getElementById('new_cocktail_name').value = '';
            document.getElementById('ingredienti-container').innerHTML = '';
            aggiungiRigaIngrediente();
            aggiungiRigaIngrediente();

            inizializzaApp();
            renderizzaMenu();
            salvaStato();
            mostraToast(T('toastCocktailCreato').replace('{nome}', nome));
        }

        function creaShot() {
            let nome = document.getElementById('new_shot_name').value.trim();
            if(!nome) return alert(T('alertNomeShotVuoto'));

            if(!customShots.includes(nome)) customShots.push(nome);
            // Registra lo shot tra "I miei amari" (consultabile ed eliminabile dalla libreria).
            if (bpRecipes.amari.indexOf(nome) < 0) { bpRecipes.amari.push(nome); bpRecipesSave(); }
            menuSerataShot[nome] = 1;

            document.getElementById('new_shot_name').value = '';
            inizializzaApp();
            renderizzaMenu();
            salvaStato();
            mostraToast(T('toastShotCreato').replace('{nome}', nome));
        }

        /* ════════════════════════════════════════════════════════════
           THEME SWITCHER (Night ↔ Wedding)
           ════════════════════════════════════════════════════════════ */
        function aggiornaThemeButtons(tema) {
            const n = document.getElementById('theme-btn-night');
            const w = document.getElementById('theme-btn-wedding');
            if (!n || !w) return;
            n.classList.toggle('active', tema === 'night');
            w.classList.toggle('active', tema === 'wedding');
        }
        function cambiaTema(tema) {
            if (tema !== 'night' && tema !== 'wedding') tema = 'night';
            document.body.setAttribute('data-theme', tema);
            aggiornaThemeButtons(tema);
            bpSaveSettings();   // il tema scelto è una preferenza: persiste sempre
            // Salvataggio differito: scrivere su localStorage in modo sincrono qui
            // bloccava il thread proprio durante il repaint del cambio tema.
            programmaSalvataggio();
        }

        /* ════════════════════════════════════════════════════════════
           SLIDER % BEVITORI (alcolici vs analcolici)
           ════════════════════════════════════════════════════════════ */
        function aggiornaPctBevitori() {
            const r = document.getElementById('pct-bevitori');
            if (!r) return;
            const v = parseInt(r.value) || 0;
            const valEl = document.getElementById('pct-bevitori-val');
            const invEl = document.getElementById('pct-bevitori-inv');
            if (valEl) valEl.textContent = v;
            if (invEl) invEl.textContent = (100 - v);
            ricalcolaSeVisibile();
            programmaSalvataggio();
        }

        /* ════════════════════════════════════════════════════════════
           SUGGERITORE MENU (profili evento)
           ════════════════════════════════════════════════════════════ */
        // ─── Guarnizioni / prep da comprare a parte (v1.3) ───
        const garnishMap = {"Negroni":["Fetta d'arancia"],"Americano":["Fetta d'arancia"],"Boulevardier":["Scorza d'arancia"],"Old Fashioned":["Angostura","Scorza d'arancia"],"Manhattan":["Ciliegia al maraschino","Angostura"],"Sazerac":["Assenzio (per risciacquo)","Scorza di limone"],"Mojito":["Menta fresca","Lime fresco"],"Caipirinha":["Lime fresco","Zucchero di canna"],"Mai-Tai":["Menta fresca","Lime fresco"],"Margarita":["Sale","Lime fresco"],"Tommys Margarita":["Lime fresco"],"Daiquiri":["Lime fresco"],"Cuba Libre":["Lime fresco"],"Moscow Mule (IBA)":["Lime fresco","Menta fresca"],"Espresso Martini":["Chicchi di caffè"],"Cosmopolitan":["Scorza d'arancia"],"Gin Fizz":["Scorza di limone"],"Whiskey Sour":["Ciliegia al maraschino","Angostura"],"Pisco Sour":["Angostura"],"Aviation":["Ciliegia al maraschino"],"Hanky Panky":["Scorza d'arancia"],"Dry Martini":["Oliva","Scorza di limone"],"Sidecar":["Zucchero (bordo)","Scorza di limone"],"Tequila Sunrise":["Fetta d'arancia","Ciliegia al maraschino"],"Sex on the Beach":["Fetta d'arancia"],"Pina Colada":["Ananas (fetta)","Ciliegia al maraschino"],"Paloma":["Sale","Lime fresco"],"Spritz":["Fetta d'arancia","Oliva"],"Garibaldi (IBA)":["Fetta d'arancia"],"Zombie":["Menta fresca"],"Bees Knees":["Scorza di limone"],"Long Island":["Lime fresco"],"Alexander":["Noce moscata"],"Bull Shot":["Tabasco","Salsa Worcestershire"],"Casino":["Orange Bitters"],"Champagne Cocktail":["Angostura","Zollette di zucchero"],"Corpse Reviver #2":["Assenzio (per risciacquo)"],"Gibson":["Cipolline cocktail"],"Gin Basil Smash":["Basilico fresco"],"Michelada":["Tabasco","Salsa Worcestershire","Sale"],"Monkey Gland":["Assenzio (per risciacquo)"],"Pegu Club":["Angostura"],"Ramos Gin Fizz":["Acqua ai fiori d'arancio"],"Salty Dog":["Sale"],"Tuxedo":["Orange Bitters"],"Vieux Carré":["Angostura"]};
        const _garnishI18n = {"en":{"Tabasco":"Tabasco","Salsa Worcestershire":"Worcestershire sauce","Orange Bitters":"Orange Bitters","Angostura":"Angostura","Zollette di zucchero":"Sugar cubes","Assenzio (per risciacquo)":"Absinthe (rinse)","Cipolline cocktail":"Cocktail onions","Basilico fresco":"Fresh basil","Sale":"Salt","Acqua ai fiori d'arancio":"Orange flower water","Fetta d'arancia":"Orange slice","Scorza d'arancia":"Orange peel","Scorza di limone":"Lemon peel","Ciliegia al maraschino":"Maraschino cherry","Menta fresca":"Fresh mint","Lime fresco":"Fresh lime","Zucchero di canna":"Cane sugar","Chicchi di caffè":"Coffee beans","Oliva":"Olive","Ananas (fetta)":"Pineapple slice","Noce moscata":"Nutmeg","Zucchero (bordo)":"Sugar (rim)"},"es":{"Tabasco":"Tabasco","Salsa Worcestershire":"Salsa Worcestershire","Orange Bitters":"Orange Bitters","Angostura":"Angostura","Zollette di zucchero":"Terrones de azúcar","Assenzio (per risciacquo)":"Absenta (enjuague)","Cipolline cocktail":"Cebollitas cóctel","Basilico fresco":"Albahaca fresca","Sale":"Sal","Acqua ai fiori d'arancio":"Agua de azahar","Fetta d'arancia":"Rodaja de naranja","Scorza d'arancia":"Piel de naranja","Scorza di limone":"Piel de limón","Ciliegia al maraschino":"Cereza al marrasquino","Menta fresca":"Menta fresca","Lime fresco":"Lima fresca","Zucchero di canna":"Azúcar de caña","Chicchi di caffè":"Granos de café","Oliva":"Aceituna","Ananas (fetta)":"Rodaja de piña","Noce moscata":"Nuez moscada","Zucchero (bordo)":"Azúcar (borde)"},"fr":{"Tabasco":"Tabasco","Salsa Worcestershire":"Sauce Worcestershire","Orange Bitters":"Orange Bitters","Angostura":"Angostura","Zollette di zucchero":"Sucres en morceaux","Assenzio (per risciacquo)":"Absinthe (rinçage)","Cipolline cocktail":"Oignons cocktail","Basilico fresco":"Basilic frais","Sale":"Sel","Acqua ai fiori d'arancio":"Eau de fleur d'oranger","Fetta d'arancia":"Tranche d'orange","Scorza d'arancia":"Zeste d'orange","Scorza di limone":"Zeste de citron","Ciliegia al maraschino":"Cerise au marasquin","Menta fresca":"Menthe fraîche","Lime fresco":"Citron vert frais","Zucchero di canna":"Sucre de canne","Chicchi di caffè":"Grains de café","Oliva":"Olive","Ananas (fetta)":"Tranche d'ananas","Noce moscata":"Noix de muscade","Zucchero (bordo)":"Sucre (bord)"},"de":{"Tabasco":"Tabasco","Salsa Worcestershire":"Worcestershiresauce","Orange Bitters":"Orange Bitters","Angostura":"Angostura","Zollette di zucchero":"Würfelzucker","Assenzio (per risciacquo)":"Absinth (zum Ausspülen)","Cipolline cocktail":"Cocktailzwiebeln","Basilico fresco":"Frischer Basilikum","Sale":"Salz","Acqua ai fiori d'arancio":"Orangenblütenwasser","Fetta d'arancia":"Orangenscheibe","Scorza d'arancia":"Orangenschale","Scorza di limone":"Zitronenschale","Ciliegia al maraschino":"Maraschino-Kirsche","Menta fresca":"Frische Minze","Lime fresco":"Frische Limette","Zucchero di canna":"Rohrzucker","Chicchi di caffè":"Kaffeebohnen","Oliva":"Olive","Ananas (fetta)":"Ananasscheibe","Noce moscata":"Muskatnuss","Zucchero (bordo)":"Zucker (Rand)"},"pt":{"Tabasco":"Tabasco","Salsa Worcestershire":"Molho inglês","Orange Bitters":"Orange Bitters","Angostura":"Angostura","Zollette di zucchero":"Cubos de açúcar","Assenzio (per risciacquo)":"Absinto (para enxaguar)","Cipolline cocktail":"Cebolinhas cocktail","Basilico fresco":"Manjericão fresco","Sale":"Sal","Acqua ai fiori d'arancio":"Água de flor de laranjeira","Fetta d'arancia":"Fatia de laranja","Scorza d'arancia":"Casca de laranja","Scorza di limone":"Casca de limão","Ciliegia al maraschino":"Cereja ao maraschino","Menta fresca":"Hortelã fresca","Lime fresco":"Lima fresca","Zucchero di canna":"Açúcar de cana","Chicchi di caffè":"Grãos de café","Oliva":"Azeitona","Ananas (fetta)":"Fatia de ananás","Noce moscata":"Noz-moscada","Zucchero (bordo)":"Açúcar (borda)"},"nl":{"Tabasco":"Tabasco","Salsa Worcestershire":"Worcestershiresaus","Orange Bitters":"Orange Bitters","Angostura":"Angostura","Zollette di zucchero":"Suikerklontjes","Assenzio (per risciacquo)":"Absint (om te spoelen)","Cipolline cocktail":"Cocktailuitjes","Basilico fresco":"Verse basilicum","Sale":"Zout","Acqua ai fiori d'arancio":"Oranjebloesemwater","Fetta d'arancia":"Sinaasappelschijf","Scorza d'arancia":"Sinaasappelschil","Scorza di limone":"Citroenschil","Ciliegia al maraschino":"Maraschinokers","Menta fresca":"Verse munt","Lime fresco":"Verse limoen","Zucchero di canna":"Rietsuiker","Chicchi di caffè":"Koffiebonen","Oliva":"Olijf","Ananas (fetta)":"Ananasschijf","Noce moscata":"Nootmuskaat","Zucchero (bordo)":"Suiker (rand)"}};
        function traduciGarnish(label){ const M=_garnishI18n[linguaCorrente]; return (M && M[label]) ? M[label] : label; }
        const PROFILI_EVENTO = {
            matrimonio: {
                drink:    { 'Spritz':4, 'Negroni':3, 'Gin Tonic (HV)':3, 'Bellini':3, 'Americano':3 },
                mocktail: { 'Virgin Mojito':3 },
                shot:     { 'Mirto':2, 'Amaro Montenegro':2 },
                ferm: { rosso:0.25, bianco:0.5, bollicine:1, birra:0.10 }
            },
            compleanno: {
                drink:    { 'Spritz':4, 'Vodka Lemon (HV)':3, 'Mojito':3, 'Gin Tonic (HV)':3 },
                mocktail: { 'Shirley Temple':3 },
                shot:     { 'Amaro Montenegro':2, 'Jägermeister':2 },
                ferm: { rosso:0, bianco:0, bollicine:0, birra:0.20 }
            },
            aperitivo: {
                drink:    { 'Spritz':5, 'Negroni':3, 'Americano':3, 'Gin Tonic (HV)':3 },
                mocktail: { 'Florida':3 },
                shot:     {},
                ferm: { rosso:0, bianco:0, bollicine:0.30, birra:0.20 }
            },
            serata: {
                drink:    { 'Vodka Redbull (HV)':4, 'Rum & Coca (HV)':4, 'Gin Lemon (HV)':3, 'Mojito':3, 'Gin Tonic (HV)':3 },
                mocktail: { 'Virgin Mojito':3 },
                shot:     { 'Jägermeister':3, 'Tequila':2, 'Amaro Montenegro':2 },
                ferm: { rosso:0, bianco:0, bollicine:0, birra:0.30 }
            },
            aziendale: {
                drink:    { 'Spritz':4, 'Gin Tonic (HV)':3, 'Negroni':3, 'Americano':3 },
                mocktail: { 'Florida':3 },
                shot:     {},
                ferm: { rosso:0.10, bianco:0.10, bollicine:0.5, birra:0 }
            }
        };

        function apriSuggeritore() {
            document.getElementById('suggeritore-modal').classList.add('show');
        }
        function chiudiSuggeritore() {
            document.getElementById('suggeritore-modal').classList.remove('show');
        }
        function applicaSuggerimento(evento) {
            const prof = PROFILI_EVENTO[evento];
            if (!prof) return;
            const haContenuto = Object.keys(menuSerataDrink).length
                             || Object.keys(menuSerataMocktail).length
                             || Object.keys(menuSerataShot).length;
            if (haContenuto && !confirm(T('sugConferma') || 'Questo sostituirà il menu attuale. Continuare?')) return;

            // Sovrascrivi i menu (solo voci valide nel DB / nei prezzi)
            menuSerataDrink = {};
            menuSerataMocktail = {};
            menuSerataShot = {};
            Object.keys(prof.drink).forEach(n => { if (databaseDrink[n]) menuSerataDrink[n] = prof.drink[n]; });
            Object.keys(prof.mocktail).forEach(n => { if (databaseDrink[n]) menuSerataMocktail[n] = prof.mocktail[n]; });
            Object.keys(prof.shot).forEach(n => { if (prezziBase[n]) menuSerataShot[n] = prof.shot[n]; });

            // Imposta i fermentati
            const _setF = (id, v) => { const e = document.getElementById(id); if (e) e.value = v; };
            _setF('ferm_vino_rosso',  prof.ferm.rosso);
            _setF('ferm_vino_bianco', prof.ferm.bianco);
            _setF('ferm_bollicine',   prof.ferm.bollicine);
            _setF('ferm_birra',       prof.ferm.birra);

            chiudiSuggeritore();
            renderizzaMenu();
            aggiornaBadge();
            salvaStato();
            mostraTab('alcolici');
            mostraToast(T('sugFatto') || 'Menu suggerito applicato. Modificalo a piacere.');
        }

        /* ════════════════════════════════════════════════════════════
           CONFIGURATORE GUIDATO (v1.4)
           Onboarding (manuale/guidato) + flusso step-by-step che compila
           i campi esistenti e applica un menu di partenza riusando
           PROFILI_EVENTO (stessa logica del suggeritore, nessun duplicato).
           ════════════════════════════════════════════════════════════ */
        const _cfgMore = { it:'Più dettagli', en:'More details', es:'Más detalles', fr:'Plus de détails', de:'Mehr Details', pt:'Mais detalhes', nl:'Meer details' };
        Object.keys(_cfgMore).forEach(lg => { if (translations[lg]) translations[lg].cfgMoreLabel = _cfgMore[lg]; });

        /* ── i18n CTA navigazione wizard (Fase 2) — 7 lingue ── */
        const _extraI18nWiz = {
            it: { cfgContinuaMenu:"Continua al menu", cfgTornaSetup:"Torna al setup", cfgModificaMenu:"Modifica menu", cfgNuovoEvento:"Nuovo evento", cfgSalvaEvento:"Salva evento", toastEventoSalvato:"Evento salvato" },
            en: { cfgContinuaMenu:"Continue to menu", cfgTornaSetup:"Back to setup", cfgModificaMenu:"Edit menu", cfgNuovoEvento:"New event", cfgSalvaEvento:"Save event", toastEventoSalvato:"Event saved" },
            es: { cfgContinuaMenu:"Continuar al menú", cfgTornaSetup:"Volver a parámetros", cfgModificaMenu:"Editar menú", cfgNuovoEvento:"Nuevo evento", cfgSalvaEvento:"Guardar evento", toastEventoSalvato:"Evento guardado" },
            fr: { cfgContinuaMenu:"Continuer vers le menu", cfgTornaSetup:"Retour aux paramètres", cfgModificaMenu:"Modifier le menu", cfgNuovoEvento:"Nouvel événement", cfgSalvaEvento:"Enregistrer l'événement", toastEventoSalvato:"Événement enregistré" },
            de: { cfgContinuaMenu:"Weiter zum Menü", cfgTornaSetup:"Zurück zu Parametern", cfgModificaMenu:"Menü bearbeiten", cfgNuovoEvento:"Neues Event", cfgSalvaEvento:"Event speichern", toastEventoSalvato:"Event gespeichert" },
            pt: { cfgContinuaMenu:"Continuar para o menu", cfgTornaSetup:"Voltar aos parâmetros", cfgModificaMenu:"Editar menu", cfgNuovoEvento:"Novo evento", cfgSalvaEvento:"Guardar evento", toastEventoSalvato:"Evento guardado" },
            nl: { cfgContinuaMenu:"Verder naar menu", cfgTornaSetup:"Terug naar setup", cfgModificaMenu:"Menu bewerken", cfgNuovoEvento:"Nieuw evenement", cfgSalvaEvento:"Evenement opslaan", toastEventoSalvato:"Evenement opgeslagen" }
        };
        Object.keys(_extraI18nWiz).forEach(lg => { if (translations[lg]) Object.assign(translations[lg], _extraI18nWiz[lg]); });

        /* ── i18n "I miei eventi" + checklist (Fase 3) — 7 lingue ── */
        const _extraI18nEv = {
            it: { evHeaderBtn:"I miei eventi", evTitle:"I miei eventi", evEmpty:"Nessun evento salvato", evEmptySub:"Salva un evento dalla lista della spesa per ritrovarlo qui con la sua checklist.", evOpen:"Apri", evEdit:"Modifica", evDup:"Duplica", evDelete:"Elimina", evGuestsWord:"ospiti", evConfirmDelete:"Eliminare questo evento? L'azione non si può annullare.", evToastDeleted:"Evento eliminato", evToastDuplicated:"Evento duplicato", evToastLoaded:"Evento caricato: modifica e risalva", evCopySuffix:"(copia)", chkTitle:"Lista della spesa", chkBought:"acquistati" },
            en: { evHeaderBtn:"My events", evTitle:"My events", evEmpty:"No saved events", evEmptySub:"Save an event from the shopping list to find it here with its checklist.", evOpen:"Open", evEdit:"Edit", evDup:"Duplicate", evDelete:"Delete", evGuestsWord:"guests", evConfirmDelete:"Delete this event? This cannot be undone.", evToastDeleted:"Event deleted", evToastDuplicated:"Event duplicated", evToastLoaded:"Event loaded: edit and save again", evCopySuffix:"(copy)", chkTitle:"Shopping list", chkBought:"bought" },
            es: { evHeaderBtn:"Mis eventos", evTitle:"Mis eventos", evEmpty:"No hay eventos guardados", evEmptySub:"Guarda un evento desde la lista de la compra para encontrarlo aquí con su checklist.", evOpen:"Abrir", evEdit:"Editar", evDup:"Duplicar", evDelete:"Eliminar", evGuestsWord:"invitados", evConfirmDelete:"¿Eliminar este evento? No se puede deshacer.", evToastDeleted:"Evento eliminado", evToastDuplicated:"Evento duplicado", evToastLoaded:"Evento cargado: edítalo y vuelve a guardar", evCopySuffix:"(copia)", chkTitle:"Lista de la compra", chkBought:"comprados" },
            fr: { evHeaderBtn:"Mes événements", evTitle:"Mes événements", evEmpty:"Aucun événement enregistré", evEmptySub:"Enregistrez un événement depuis la liste de courses pour le retrouver ici avec sa checklist.", evOpen:"Ouvrir", evEdit:"Modifier", evDup:"Dupliquer", evDelete:"Supprimer", evGuestsWord:"invités", evConfirmDelete:"Supprimer cet événement ? Action irréversible.", evToastDeleted:"Événement supprimé", evToastDuplicated:"Événement dupliqué", evToastLoaded:"Événement chargé : modifiez et réenregistrez", evCopySuffix:"(copie)", chkTitle:"Liste de courses", chkBought:"achetés" },
            de: { evHeaderBtn:"Meine Events", evTitle:"Meine Events", evEmpty:"Keine gespeicherten Events", evEmptySub:"Speichere ein Event aus der Einkaufsliste, um es hier mit seiner Checkliste zu finden.", evOpen:"Öffnen", evEdit:"Bearbeiten", evDup:"Duplizieren", evDelete:"Löschen", evGuestsWord:"Gäste", evConfirmDelete:"Dieses Event löschen? Kann nicht rückgängig gemacht werden.", evToastDeleted:"Event gelöscht", evToastDuplicated:"Event dupliziert", evToastLoaded:"Event geladen: bearbeiten und neu speichern", evCopySuffix:"(Kopie)", chkTitle:"Einkaufsliste", chkBought:"gekauft" },
            pt: { evHeaderBtn:"Os meus eventos", evTitle:"Os meus eventos", evEmpty:"Nenhum evento guardado", evEmptySub:"Guarda um evento a partir da lista de compras para o encontrares aqui com a sua checklist.", evOpen:"Abrir", evEdit:"Editar", evDup:"Duplicar", evDelete:"Eliminar", evGuestsWord:"convidados", evConfirmDelete:"Eliminar este evento? Não pode ser anulado.", evToastDeleted:"Evento eliminado", evToastDuplicated:"Evento duplicado", evToastLoaded:"Evento carregado: edita e volta a guardar", evCopySuffix:"(cópia)", chkTitle:"Lista de compras", chkBought:"comprados" },
            nl: { evHeaderBtn:"Mijn evenementen", evTitle:"Mijn evenementen", evEmpty:"Geen opgeslagen evenementen", evEmptySub:"Sla een evenement op vanuit de boodschappenlijst om het hier met zijn checklist terug te vinden.", evOpen:"Openen", evEdit:"Bewerken", evDup:"Dupliceren", evDelete:"Verwijderen", evGuestsWord:"gasten", evConfirmDelete:"Dit evenement verwijderen? Kan niet ongedaan worden.", evToastDeleted:"Evenement verwijderd", evToastDuplicated:"Evenement gedupliceerd", evToastLoaded:"Evenement geladen: bewerk en sla opnieuw op", evCopySuffix:"(kopie)", chkTitle:"Boodschappenlijst", chkBought:"gekocht" }
        };
        Object.keys(_extraI18nEv).forEach(lg => { if (translations[lg]) Object.assign(translations[lg], _extraI18nEv[lg]); });

        /* ── i18n menu a panino + totali checklist (UX-2) — 7 lingue ── */
        const _extraI18nUi = {
            it: { uiMenu:"Menu", uiNuovoEvento:"Crea nuovo evento", uiVaiEventi:"Apri i miei eventi salvati", chkTotale:"Totale", chkSpeso:"Speso", chkManca:"Da spendere" },
            en: { uiMenu:"Menu", uiNuovoEvento:"Create new event", uiVaiEventi:"Open my saved events", chkTotale:"Total", chkSpeso:"Spent", chkManca:"Remaining" },
            es: { uiMenu:"Menú", uiNuovoEvento:"Crear nuevo evento", uiVaiEventi:"Abrir mis eventos guardados", chkTotale:"Total", chkSpeso:"Gastado", chkManca:"Por gastar" },
            fr: { uiMenu:"Menu", uiNuovoEvento:"Créer un événement", uiVaiEventi:"Ouvrir mes événements", chkTotale:"Total", chkSpeso:"Dépensé", chkManca:"Restant" },
            de: { uiMenu:"Menü", uiNuovoEvento:"Neues Event erstellen", uiVaiEventi:"Meine Events öffnen", chkTotale:"Gesamt", chkSpeso:"Ausgegeben", chkManca:"Offen" },
            pt: { uiMenu:"Menu", uiNuovoEvento:"Criar novo evento", uiVaiEventi:"Abrir os meus eventos", chkTotale:"Total", chkSpeso:"Gasto", chkManca:"Por gastar" },
            nl: { uiMenu:"Menu", uiNuovoEvento:"Nieuw evenement maken", uiVaiEventi:"Mijn evenementen openen", chkTotale:"Totaal", chkSpeso:"Uitgegeven", chkManca:"Resterend" }
        };
        Object.keys(_extraI18nUi).forEach(lg => { if (translations[lg]) Object.assign(translations[lg], _extraI18nUi[lg]); });

        const BP_CFG_STEPS = ['nome','tipo','ospiti','durata','intensita','pct','mocktail','shot','fermentati','fascia','scarto','stile','riepilogo'];
        let bpCfgIdx = 0, bpCfgDir = 1, bpCfgBusy = false, bpCfgNomeEvento = '';
        const bpCfg = { nome:'', tipo:'serata', ospiti:50, durata:'media', intensita:'media', pct:80, mocktail:true, shot:true, fermentati:true, fascia:'media', scarto:15, stile:'classico' };

        function _bpEsc(s){ return String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
        function _bpCap(s){ return String(s).charAt(0).toUpperCase() + String(s).slice(1); }
        function _bpNum(n){ return (''+n).replace('.', linguaCorrente==='en' ? '.' : ','); }

        function bpShowWelcome(){
            const w = document.getElementById('bp-welcome');
            if (!w) return;
            const ls = document.getElementById('bp-welcome-lang');
            if (ls) ls.value = linguaCorrente;
            w.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
        function bpWelcomeManual(){
            document.getElementById('bp-welcome').classList.remove('show');
            document.body.style.overflow = '';
            vaiAStep('step-setup');   // entra nel wizard (esce dalla home)
            try { localStorage.setItem('bp_onboarded','1'); } catch(e){}
        }
        function bpCfgStart(){
            // Precompila dai valori correnti, così la modalità guidata rispetta lo stato esistente
            const gv = (id, def) => { const e = document.getElementById(id); const v = e ? parseFloat(e.value) : NaN; return isNaN(v) ? def : v; };
            bpCfg.ospiti = Math.max(1, Math.round(gv('ospiti', 50)));
            bpCfg.pct    = Math.min(100, Math.max(0, Math.round(gv('pct-bevitori', 80))));
            bpCfg.scarto = Math.min(40, Math.max(0, Math.round(gv('scarto', 15))));
            const fSel = document.getElementById('sel-fascia');
            if (fSel && ['bassa','media','alta'].includes(fSel.value)) bpCfg.fascia = fSel.value;
            if (bpCfgNomeEvento) bpCfg.nome = bpCfgNomeEvento;
            const wel = document.getElementById('bp-welcome'); if (wel) wel.classList.remove('show');
            document.getElementById('bp-config').classList.add('show');
            document.body.style.overflow = 'hidden';
            bpCfgIdx = 0; bpCfgDir = 1;
            bpCfgRender();
        }
        function bpCfgClose(){
            document.getElementById('bp-config').classList.remove('show');
            document.body.style.overflow = '';
            try { localStorage.setItem('bp_onboarded','1'); } catch(e){}
        }
        function bpCfgPrev(){
            if (bpCfgIdx > 0) { bpCfgIdx--; bpCfgDir = -1; bpCfgRender(); }
            else { document.getElementById('bp-config').classList.remove('show'); bpShowWelcome(); }
        }
        function bpCfgNext(){
            if (bpCfgIdx < BP_CFG_STEPS.length - 1) { bpCfgIdx++; bpCfgDir = 1; bpCfgRender(); }
            else bpCfgApply();
        }

        /* Drink extra per ampliare davvero il menu "ricco"/"classico" oltre il profilo base.
           Tutti presenti in databaseDrink (FULL); quelli assenti vengono saltati. */
        const BP_STILE_EXTRA = {
            matrimonio: ['French 75','Mimosa','Kir Royale','Cosmopolitan','Margarita'],
            compleanno: ['Vodka Redbull (HV)','Sex on the Beach','Tequila Sunrise','Long Island','Margarita'],
            aperitivo:  ['Hugo','Garibaldi (IBA)','Boulevardier','Bellini','Cosmopolitan'],
            serata:     ['Jager & Redbull (HV)','Vodka Lemon (HV)','Long Island','Cuba Libre','Tequila Sunrise'],
            aziendale:  ['Bellini','Mimosa','Margarita','Cosmopolitan','French 75']
        };
        const BP_MOCK_EXTRA = ['Virgin Mojito','Shirley Temple','Florida'];

        /* Calcola parametri derivati + menu di partenza (singola fonte di verità).
           Stile menu → quante voci: essenziale 3 · classico 5 · ricco 8 drink
           (+ un mocktail in più nel ricco). I drink mancano dal profilo vengono
           integrati dal pool extra del tipo evento. */
        function bpCfgDerive(){
            const baseDur = ({ breve:2, media:3, lunga:4 })[bpCfg.durata] || 3;
            const intMul  = ({ leggera:0.8, media:1, alta:1.25 })[bpCfg.intensita] || 1;
            let drinkTesta = Math.round(baseDur * intMul * 2) / 2;
            if (drinkTesta < 1) drinkTesta = 1;
            const shotBase = ({ leggera:0.5, media:1, alta:1.5 })[bpCfg.intensita] || 1;
            const shotTesta = bpCfg.shot ? shotBase : 0;
            const prof = PROFILI_EVENTO[bpCfg.tipo] || PROFILI_EVENTO.serata;
            const target = bpCfg.stile === 'essenziale' ? 3 : bpCfg.stile === 'classico' ? 5 : 8;
            let de = Object.keys(prof.drink).filter(n => databaseDrink[n]).map(n => [n, prof.drink[n]]);
            de.sort((a,b) => b[1] - a[1]);
            if (de.length < target) {
                for (const n of (BP_STILE_EXTRA[bpCfg.tipo] || [])) {
                    if (de.length >= target) break;
                    if (databaseDrink[n] && !de.some(e => e[0] === n)) de.push([n, 2]);
                }
            }
            de = de.slice(0, target);
            const drink = {}; de.forEach(([n,w]) => drink[n] = w);
            const mocktail = {};
            const mockTarget = (bpCfg.stile === 'ricco') ? 2 : 1;
            if (bpCfg.mocktail) {
                Object.keys(prof.mocktail).forEach(n => { if (databaseDrink[n] && Object.keys(mocktail).length < mockTarget) mocktail[n] = prof.mocktail[n]; });
                for (const n of BP_MOCK_EXTRA) { if (Object.keys(mocktail).length >= mockTarget) break; if (databaseDrink[n] && !mocktail[n]) mocktail[n] = 2; }
            }
            const shot = {};
            if (bpCfg.shot) Object.keys(prof.shot).forEach(n => { if (prezziBase[n]) shot[n] = prof.shot[n]; });
            const ferm = bpCfg.fermentati ? prof.ferm : { rosso:0, bianco:0, bollicine:0, birra:0 };
            return { drinkTesta, shotTesta, drink, mocktail, shot, ferm };
        }
        function _bpMenuStr(d){
            const parts = [];
            const nd = Object.keys(d.drink).length, nm = Object.keys(d.mocktail).length, ns = Object.keys(d.shot).length;
            if (nd) parts.push(nd + ' ' + T('cfgUnitCocktail'));
            if (nm) parts.push(nm + ' ' + T('cfgUnitMocktail'));
            if (ns) parts.push(ns + ' ' + T('cfgUnitShot'));
            return parts.length ? parts.join(' · ') : T('cfgUnitNone');
        }

        function _bpHead(ey, q, desc, moreKey){
            let h = '<div class="bpc-eyebrow">' + T(ey) + '</div>';
            h += '<h2 class="bpc-q" id="bp-cfg-q">' + T(q) + '</h2>';
            h += '<p class="bpc-desc">' + T(desc) + '</p>';
            if (moreKey) h += '<details class="bpc-more"><summary>' + T('cfgMoreLabel') + '</summary><p>' + T(moreKey) + '</p></details>';
            return h;
        }
        function _bpChips(field, opts, wrap){
            let h = '<div class="bpc-chips' + (wrap ? ' bpc-wrap' : '') + '">';
            opts.forEach(o => {
                const sel = (bpCfg[field] === o.val) ? ' sel' : '';
                h += '<button type="button" class="bpc-chip' + sel + '" data-val="' + o.val + '"><span>' + T(o.label) + '</span>' +
                     (o.sub ? '<span class="bpc-chip-sub">' + T(o.sub) + '</span>' : '') + '</button>';
            });
            return h + '</div>';
        }
        function _bpStepper(field, unitKey){
            return '<div class="bpc-stepper"><button type="button" data-act="dec" aria-label="−">−</button>' +
                   '<input type="number" inputmode="numeric" class="bpc-valinput" id="bpc-stepval" value="' + bpCfg[field] + '" aria-label="' + T(unitKey) + '">' +
                   '<button type="button" data-act="inc" aria-label="+">+</button></div>' +
                   '<div class="bpc-unit">' + T(unitKey) + '</div>';
        }
        function _bpToggle(field){
            const y = bpCfg[field] ? ' sel' : '', n = bpCfg[field] ? '' : ' sel';
            return '<div class="bpc-toggle"><button type="button" class="bpc-seg' + y + '" data-val="1">' + T('cfgYes') +
                   '</button><button type="button" class="bpc-seg' + n + '" data-val="0">' + T('cfgNo') + '</button></div>';
        }
        function _bpSlider(){
            return '<div class="bpc-slider-display"><span id="bpc-pctv">' + bpCfg.pct + '</span>% ' + T('lblAlcolici') +
                   ' <span class="bpc-inv">/ <span id="bpc-pctinv">' + (100 - bpCfg.pct) + '</span>% ' + T('lblAnalcolici') + '</span></div>' +
                   '<div class="bpc-slider-wrap"><input type="range" min="0" max="100" value="' + bpCfg.pct + '" id="bpc-pct" aria-label="%"></div>' +
                   '<div class="bpc-slider-legend"><span>0%</span><span>100%</span></div>';
        }
        function _bpSummary(){
            const d = bpCfgDerive();
            const rows = [
                [T('cfgSumNome'),   bpCfg.nome ? _bpEsc(bpCfg.nome) : T('cfgSumNomeVuoto')],
                [T('cfgSumTipo'),   T('cfgTipo' + _bpCap(bpCfg.tipo))],
                [T('cfgSumOspiti'), bpCfg.ospiti],
                [T('cfgSumConsumo'),T('cfgInt' + _bpCap(bpCfg.intensita)) + ' · ' + T('cfgDur' + _bpCap(bpCfg.durata))],
                [T('cfgSumPct'),    bpCfg.pct + '%'],
                [T('cfgSumFascia'), T('cfgFascia' + _bpCap(bpCfg.fascia))],
                [T('cfgSumMenu'),   _bpMenuStr(d)]
            ];
            let h = '<div class="bpc-summary">';
            rows.forEach(r => { h += '<div class="bpc-summary-row"><span class="k">' + r[0] + '</span><span class="v">' + r[1] + '</span></div>'; });
            h += '</div>';
            // ─── Stima costo in tempo reale ───
            try {
                const est = stimaBudget({
                    ospiti: bpCfg.ospiti, drinkTesta: d.drinkTesta, shotTesta: d.shotTesta, scarto: bpCfg.scarto,
                    pct: bpCfg.pct, fascia: bpCfg.fascia, nazione: (document.getElementById('sel-nazione') || {}).value || '',
                    drink: d.drink, mocktail: d.mocktail, shot: d.shot,
                    ferm: { rosso: d.ferm.rosso, bianco: d.ferm.bianco, bollicine: d.ferm.bollicine, birra: d.ferm.birra }
                });
                const totStr = '€ ' + est.totale.toLocaleString('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
                const ppStr = (bpCfg.ospiti > 0) ? '≈ € ' + (est.totale / bpCfg.ospiti).toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ' + T('perPersonaTxt') : '';
                h += '<div class="bpc-costbox"><span class="cb-k">' + T('budgetLabel') + '</span><span class="cb-v">' + totStr + '</span>' +
                     (ppStr ? '<span class="cb-pp">' + ppStr + '</span>' : '') + '</div>';
            } catch (e) { /* stima non bloccante */ }
            h += '<div class="bpc-readout"><strong>' + bpCfg.ospiti + ' ' + T('cfgReadGuests') + '</strong> · ' +
                 T('cfgStile' + _bpCap(bpCfg.stile)) + ' · ~' + _bpNum(d.drinkTesta) + ' ' + T('cfgReadDrinkEach') +
                 '<br>' + T('cfgReadPrudent') + '</div>';
            return h;
        }

        function bpCfgStepHTML(step){
            switch(step){
                case 'nome':       return _bpHead('cfgEyName','cfgNomeQ','cfgNomeDesc') +
                    '<input type="text" class="bpc-text" id="bpc-nome" maxlength="60" value="' + _bpEsc(bpCfg.nome) + '" placeholder="' + _bpEsc(T('cfgNomePh')) + '">';
                case 'tipo':       return _bpHead('cfgEyType','cfgTipoQ','cfgTipoDesc') + _bpChips('tipo', [
                    {val:'matrimonio',label:'cfgTipoMatrimonio',sub:'cfgTipoMatrimonioSub'},
                    {val:'compleanno',label:'cfgTipoCompleanno',sub:'cfgTipoCompleannoSub'},
                    {val:'aperitivo', label:'cfgTipoAperitivo', sub:'cfgTipoAperitivoSub'},
                    {val:'serata',    label:'cfgTipoSerata',    sub:'cfgTipoSerataSub'},
                    {val:'aziendale', label:'cfgTipoAziendale', sub:'cfgTipoAziendaleSub'}]);
                case 'ospiti':     return _bpHead('cfgEyGuests','cfgOspitiQ','cfgOspitiDesc') + _bpStepper('ospiti','cfgOspitiUnit');
                case 'durata':     return _bpHead('cfgEyDuration','cfgDurataQ','cfgDurataDesc') + _bpChips('durata', [
                    {val:'breve',label:'cfgDurBreve',sub:'cfgDurBreveSub'},
                    {val:'media',label:'cfgDurMedia',sub:'cfgDurMediaSub'},
                    {val:'lunga',label:'cfgDurLunga',sub:'cfgDurLungaSub'}]);
                case 'intensita':  return _bpHead('cfgEyIntensity','cfgIntQ','cfgIntDesc') + _bpChips('intensita', [
                    {val:'leggera',label:'cfgIntLeggera',sub:'cfgIntLeggeraSub'},
                    {val:'media',  label:'cfgIntMedia',  sub:'cfgIntMediaSub'},
                    {val:'alta',   label:'cfgIntAlta',   sub:'cfgIntAltaSub'}]);
                case 'pct':        return _bpHead('cfgEyDrinkers','cfgPctQ','cfgPctDesc','cfgPctMore') + _bpSlider();
                case 'mocktail':   return _bpHead('cfgEyMocktail','cfgMockQ','cfgMockDesc') + _bpToggle('mocktail');
                case 'shot':       return _bpHead('cfgEyShot','cfgShotQ','cfgShotDesc') + _bpToggle('shot');
                case 'fermentati': return _bpHead('cfgEyFerm','cfgFermQ','cfgFermDesc') + _bpToggle('fermentati');
                case 'fascia':     return _bpHead('cfgEyPrice','cfgFasciaQ','cfgFasciaDesc') + _bpChips('fascia', [
                    {val:'bassa',label:'cfgFasciaBassa',sub:'cfgFasciaBassaSub'},
                    {val:'media',label:'cfgFasciaMedia',sub:'cfgFasciaMediaSub'},
                    {val:'alta', label:'cfgFasciaAlta', sub:'cfgFasciaAltaSub'}]);
                case 'scarto':     return _bpHead('cfgEyMargin','cfgScartoQ','cfgScartoDesc','cfgScartoMore') + _bpStepper('scarto','cfgEyMargin');
                case 'stile':      return _bpHead('cfgEyStyle','cfgStileQ','cfgStileDesc') + _bpChips('stile', [
                    {val:'essenziale',label:'cfgStileEssenziale',sub:'cfgStileEssenzialeSub'},
                    {val:'classico',  label:'cfgStileClassico',  sub:'cfgStileClassicoSub'},
                    {val:'ricco',     label:'cfgStileRicco',     sub:'cfgStileRiccoSub'}]);
                case 'riepilogo':  return _bpHead('cfgEySummary','cfgSummaryQ','cfgSummaryDesc') + _bpSummary();
            }
            return '';
        }

        function bpCfgWire(step, mount){
            const auto = () => { if (bpCfgBusy) return; bpCfgBusy = true; setTimeout(() => { bpCfgBusy = false; bpCfgNext(); }, 200); };
            const chipPick = (field) => {
                mount.querySelectorAll('.bpc-chip').forEach(b => b.addEventListener('click', () => {
                    bpCfg[field] = b.dataset.val;
                    mount.querySelectorAll('.bpc-chip').forEach(x => x.classList.toggle('sel', x === b));
                    auto();
                }));
            };
            if (['tipo','durata','intensita','fascia','stile'].includes(step)) { chipPick(step); return; }
            if (['mocktail','shot','fermentati'].includes(step)) {
                mount.querySelectorAll('.bpc-seg').forEach(b => b.addEventListener('click', () => {
                    bpCfg[step] = b.dataset.val === '1';
                    mount.querySelectorAll('.bpc-seg').forEach(x => x.classList.toggle('sel', x === b));
                    auto();
                }));
                return;
            }
            if (step === 'ospiti' || step === 'scarto') {
                const conf = step === 'ospiti' ? { stepv:5, min:1, max:5000 } : { stepv:5, min:0, max:90 };
                const inp = mount.querySelector('#bpc-stepval');
                const clamp = v => Math.min(conf.max, Math.max(conf.min, v));
                mount.querySelectorAll('.bpc-stepper button').forEach(b => b.addEventListener('click', () => {
                    bpCfg[step] = clamp((parseInt(inp.value) || bpCfg[step] || 0) + (b.dataset.act === 'inc' ? conf.stepv : -conf.stepv));
                    inp.value = bpCfg[step];
                }));
                inp.addEventListener('input', () => { const n = parseInt(inp.value); if (!isNaN(n)) bpCfg[step] = n; });
                inp.addEventListener('blur', () => { bpCfg[step] = clamp(parseInt(inp.value) || conf.min); inp.value = bpCfg[step]; });
                return;
            }
            if (step === 'pct') {
                const sl = mount.querySelector('#bpc-pct'), v = mount.querySelector('#bpc-pctv'), inv = mount.querySelector('#bpc-pctinv');
                sl.addEventListener('input', function(){ bpCfg.pct = parseInt(this.value) || 0; v.textContent = bpCfg.pct; inv.textContent = 100 - bpCfg.pct; });
                return;
            }
            if (step === 'nome') {
                const t = mount.querySelector('#bpc-nome');
                t.addEventListener('input', function(){ bpCfg.nome = this.value; });
                return;
            }
        }

        function bpCfgRender(){
            const step = BP_CFG_STEPS[bpCfgIdx];
            const tot = BP_CFG_STEPS.length;
            const mount = document.getElementById('bp-cfg-mount');
            document.getElementById('bp-cfg-progress').style.width = Math.round(((bpCfgIdx + 1) / tot) * 100) + '%';
            document.getElementById('bp-cfg-count').textContent = (bpCfgIdx + 1) + ' / ' + tot;
            document.getElementById('bp-cfg-back').textContent = T('cfgBack');
            document.getElementById('bp-cfg-next').textContent = (bpCfgIdx === tot - 1) ? T('cfgApply') : T('cfgNext');
            mount.innerHTML = bpCfgStepHTML(step);
            bpCfgWire(step, mount);
            mount.style.setProperty('--bpc-dx', bpCfgDir < 0 ? '-24px' : '24px');
            mount.classList.remove('bpc-anim'); void mount.offsetWidth; mount.classList.add('bpc-anim');
            // Rilascia il layer GPU (will-change) quando l'animazione è finita
            mount.addEventListener('animationend', () => mount.classList.remove('bpc-anim'), { once: true });
        }

        function bpCfgApply(){
            const d = bpCfgDerive();
            const setV = (id, v) => { const e = document.getElementById(id); if (e) e.value = v; };
            setV('ospiti', bpCfg.ospiti);
            setV('drink_testa', d.drinkTesta);
            setV('shot_testa', d.shotTesta);
            setV('scarto', bpCfg.scarto);
            setV('sel-fascia', bpCfg.fascia);
            setV('sel-fascia-fermentati', bpCfg.fascia);
            setV('pct-bevitori', bpCfg.pct);
            setV('ferm_vino_rosso', d.ferm.rosso);
            setV('ferm_vino_bianco', d.ferm.bianco);
            setV('ferm_bollicine', d.ferm.bollicine);
            setV('ferm_birra', d.ferm.birra);
            menuSerataDrink = Object.assign({}, d.drink);
            menuSerataMocktail = Object.assign({}, d.mocktail);
            menuSerataShot = Object.assign({}, d.shot);
            bpCfgNomeEvento = bpCfg.nome || '';
            bpEditingId = null;
            bpSyncNomeField();
            document.getElementById('bp-config').classList.remove('show');
            const wel = document.getElementById('bp-welcome'); if (wel) wel.classList.remove('show');
            document.body.style.overflow = '';
            try { localStorage.setItem('bp_onboarded','1'); } catch(e){}
            inizializzaApp();
            renderizzaMenu();
            aggiornaPctBevitori();   // aggiorna display % + ricalcolo-se-visibile + salva
            aggiornaBadge();
            salvaStato();
            mostraTab('alcolici');
            vaiAStep('step-menu');
            mostraToast(T('cfgDone'));
        }

        /* ════════════════════════════════════════════════════════════
           I MIEI EVENTI (Fase 3) — eventi salvati + checklist interattiva.
           Modulo condiviso FULL/DEMO: _bpT() restituisce T() o t() a runtime.
           ════════════════════════════════════════════════════════════ */
        let bpEditingId = null;
        const _bpT = () => (typeof T === 'function' ? T : t);
        function bpGetEvents(){ try { return JSON.parse(localStorage.getItem('bp_events') || '[]'); } catch(e){ return []; } }
        function bpSetEvents(list){ try { localStorage.setItem('bp_events', JSON.stringify(list)); } catch(e){} }
        function _bpFmtDate(ts){ try { return new Date(ts).toLocaleDateString(linguaCorrente, {day:'2-digit', month:'short', year:'numeric'}); } catch(e){ return ''; } }
        function _bpParseCost(str){ if(!str) return 0; const m = String(str).replace(/[^\d.,]/g, ''); if(!m) return 0; const v = parseFloat(m.replace(/\./g, '').replace(',', '.')); return isNaN(v) ? 0 : v; }
        function _bpMoney(n){ return '€ ' + (Math.round(n * 100) / 100).toLocaleString('it-IT', {minimumFractionDigits:2, maximumFractionDigits:2}); }

        /* Fotografa la lista della spesa renderizzata (gruppi + voci, snapshot nella lingua attuale) */
        function bpSnapshotLista(){
            const groups = [
                {key:'alcolici', ul:'lista_alcolici'},
                {key:'analcolici', ul:'lista_analcolici'},
                {key:'fermentati', ul:'lista_fermentati', block:'block_fermentati'},
                {key:'extra', ul:'lista_extra'},
                {key:'garnish', ul:'lista_garnish', block:'block_garnish'}
            ];
            const out = [];
            groups.forEach(g => {
                if (g.block){ const b = document.getElementById(g.block); if (!b || b.style.display === 'none') return; }
                const ul = document.getElementById(g.ul); if (!ul) return;
                const sec = ul.closest('.result-section'); const h3 = sec ? sec.querySelector('h3') : null;
                const titolo = h3 ? h3.textContent.trim() : '';
                const items = [];
                ul.querySelectorAll('li').forEach(li => {
                    const sp = li.querySelector('span'); const strong = li.querySelector('strong'); const cs = li.querySelector('.costo-voce');
                    const nome = sp ? sp.textContent.trim() : li.textContent.trim();
                    if (!nome) return;
                    const qty = strong ? strong.textContent.trim() : '';
                    if (g.key !== 'garnish' && !qty) return; // salta i placeholder "Nessun..."
                    const costo = cs ? cs.textContent.trim() : '';
                    items.push({ nome, qty, costo });
                });
                if (items.length) out.push({ key:g.key, titolo, items });
            });
            return out;
        }

        /* Salva (o aggiorna, se bpEditingId è impostato) un evento in localStorage 'bp_events'. */
        function bpSalvaEvento(){
            const _T = _bpT();
            try {
                const _g = id => { const e = document.getElementById(id); return e ? e.value : ''; };
                const nome = (bpCfgNomeEvento && bpCfgNomeEvento.trim())
                    ? bpCfgNomeEvento.trim()
                    : (_T('cfgSumNomeVuoto') + ' · ' + new Date().toLocaleDateString(linguaCorrente));
                const config = { ospiti:_g('ospiti'), drink_testa:_g('drink_testa'), shot_testa:_g('shot_testa'), scarto:_g('scarto'), nazione:_g('sel-nazione'), fascia:_g('sel-fascia'), pct_bevitori:_g('pct-bevitori'), ferm_vino_rosso:_g('ferm_vino_rosso'), ferm_vino_bianco:_g('ferm_vino_bianco'), ferm_bollicine:_g('ferm_bollicine'), ferm_birra:_g('ferm_birra'), fascia_fermentati:_g('sel-fascia-fermentati') };
                const menu = { drink: Object.assign({}, menuSerataDrink), mocktail: Object.assign({}, menuSerataMocktail), shot: Object.assign({}, menuSerataShot) };
                const totale = (function(){ const b = document.getElementById('budget-amount'); return b ? b.textContent.trim() : ''; })();
                const lista = bpSnapshotLista();
                const list = bpGetEvents();
                const idx = bpEditingId ? list.findIndex(e => e.id === bpEditingId) : -1;
                if (idx >= 0) {
                    list[idx] = Object.assign({}, list[idx], { nome, data: Date.now(), config, menu, totale, lista, check: list[idx].check || {} });
                } else {
                    list.push({ id:'ev_'+Date.now(), nome, data: Date.now(), config, menu, totale, lista, check:{} });
                }
                bpSetEvents(list);
                bpEditingId = null;
                mostraToast(_T('toastEventoSalvato'));
            } catch(e){ console.warn('Salvataggio evento fallito:', e); }
        }

        function bpEventsOpen(){
            const o=document.getElementById('bp-events'); if(!o) return;
            const mount=document.getElementById('bp-ev-mount');
            if (mount && !mount._bound){
                mount._bound = true;
                mount.addEventListener('click', e => {
                    const kebab = e.target.closest('.bpc-evkebab');
                    if (kebab){
                        const menu = kebab.parentElement.querySelector('.bpc-evmenu');
                        const wasOpen = menu && menu.classList.contains('show');
                        mount.querySelectorAll('.bpc-evmenu.show').forEach(m => m.classList.remove('show'));
                        if (menu && !wasOpen) menu.classList.add('show');
                        return;
                    }
                    const act = e.target.closest('.bpc-evmenu button');
                    if (act){
                        const id = act.dataset.id, a = act.dataset.act;
                        mount.querySelectorAll('.bpc-evmenu.show').forEach(m => m.classList.remove('show'));
                        if (a === 'edit') bpEventEdit(id);
                        else if (a === 'dup') bpEventDup(id);
                        else if (a === 'del') bpEventDelete(id);
                        return;
                    }
                    const card = e.target.closest('.bpc-evcard-main');
                    if (card){ bpEventOpen(card.dataset.id); return; }
                    const item = e.target.closest('.bpc-chkitem');
                    if (item && mount._evId){ bpChkToggle(mount._evId, item, item.dataset.key); return; }
                    mount.querySelectorAll('.bpc-evmenu.show').forEach(m => m.classList.remove('show'));
                });
            }
            o.classList.add('show'); document.body.style.overflow='hidden'; bpEventsList();
        }
        function bpEventsClose(){ const o=document.getElementById('bp-events'); if(!o) return; o.classList.remove('show'); document.body.style.overflow=''; }

        function bpEventsList(){
            const _T = _bpT();
            const back = document.getElementById('bp-ev-backbtn'); if (back) back.style.display = 'none';
            const mount = document.getElementById('bp-ev-mount'); if (!mount) return;
            mount._evId = null; mount._evTot = 0;
            const list = bpGetEvents().sort((a,b) => b.data - a.data);
            if (!list.length){
                mount.innerHTML = '<div class="bpc-evempty"><div class="mk">&#10070;</div><h3>'+_T('evEmpty')+'</h3><p>'+_T('evEmptySub')+'</p></div>';
                return;
            }
            let h = '<div class="bpc-evhead"><h2>'+_T('evTitle')+'</h2><span class="cnt">'+list.length+'</span></div><div class="bpc-evlist">';
            list.forEach(ev => {
                const osp = ev.config && ev.config.ospiti ? ev.config.ospiti : '';
                h += '<div class="bpc-evcard">'+
                     '<div class="bpc-evcard-main" data-id="'+ev.id+'">'+
                       '<h3>'+_bpEsc(ev.nome)+'</h3>'+
                       '<div class="bpc-evmeta">'+
                         '<span>'+_bpFmtDate(ev.data)+'</span>'+
                         (osp ? '<span>'+_bpEsc(osp)+' '+_T('evGuestsWord')+'</span>' : '')+
                         (ev.totale ? '<span class="tot">'+_bpEsc(ev.totale)+'</span>' : '')+
                       '</div>'+
                     '</div>'+
                     '<button type="button" class="bpc-evkebab" aria-label="•••">&#8942;</button>'+
                     '<div class="bpc-evmenu">'+
                       '<button data-act="edit" data-id="'+ev.id+'"><span class="mi">&#9998;</span>'+_T('evEdit')+'</button>'+
                       '<button data-act="dup" data-id="'+ev.id+'"><span class="mi">&#10697;</span>'+_T('evDup')+'</button>'+
                       '<button data-act="del" data-id="'+ev.id+'"><span class="mi">&times;</span>'+_T('evDelete')+'</button>'+
                     '</div>'+
                     '</div>';
            });
            h += '</div>';
            mount.innerHTML = h;   // i click sono gestiti per delega in bpEventsOpen
        }

        function bpEventOpen(id){
            const _T = _bpT();
            const ev = bpGetEvents().find(e => e.id === id); if (!ev) return;
            const back = document.getElementById('bp-ev-backbtn'); if (back) back.style.display = '';
            const mount = document.getElementById('bp-ev-mount'); if (!mount) return;
            ev.check = ev.check || {};
            let tot = 0, done = 0, body = '', costTot = 0, costDone = 0;
            (ev.lista || []).forEach(g => {
                body += '<div class="bpc-chkgroup"><div class="gt">'+_bpEsc(g.titolo)+'</div>';
                g.items.forEach(it => {
                    const key = g.key + '|' + it.nome;
                    const isDone = !!ev.check[key];
                    tot++; if (isDone) done++;
                    const c = _bpParseCost(it.costo);
                    costTot += c; if (isDone) costDone += c;
                    const det = [it.qty, it.costo].filter(Boolean).join(' · ');
                    body += '<div class="bpc-chkitem'+(isDone?' done':'')+'" data-key="'+_bpEsc(key)+'">'+
                            '<span class="bpc-chkbox"></span><span class="nm">'+_bpEsc(it.nome)+'</span>'+
                            (det ? '<span class="qt">'+_bpEsc(det)+'</span>' : '')+'</div>';
                });
                body += '</div>';
            });
            if (!tot) body = '<div class="bpc-evempty"><p>'+_T('evEmptySub')+'</p></div>';
            const pct = tot ? Math.round(done/tot*100) : 0;
            const stats = '<div class="bpc-chkstats">'+
                '<div class="bpc-chkstat"><div class="k">'+_T('chkTotale')+'</div><div class="v">'+_bpMoney(costTot)+'</div></div>'+
                '<div class="bpc-chkstat spent"><div class="k">'+_T('chkSpeso')+'</div><div class="v" id="bp-chk-speso">'+_bpMoney(costDone)+'</div></div>'+
                '<div class="bpc-chkstat"><div class="k">'+_T('chkManca')+'</div><div class="v" id="bp-chk-manca">'+_bpMoney(costTot - costDone)+'</div></div>'+
                '</div>';
            const head = '<div class="bpc-chkhead"><h2>'+_bpEsc(ev.nome)+'</h2><div class="sub">'+_T('chkTitle')+'</div></div>'+
                '<button type="button" class="bpm-evbtn" data-do="bpMenuOpenFromEvent" data-arg="'+_bpEsc(ev.id)+'">'+_T('menuViewBtn')+'</button>'+
                '<div class="bpc-chkprog"><div class="bar"><div class="fill" id="bp-chk-fill" style="width:'+pct+'%"></div></div>'+
                '<span class="lbl" id="bp-chk-lbl">'+done+'/'+tot+' '+_T('chkBought')+'</span></div>';
            mount.innerHTML = head + stats + body;
            mount._evId = id; mount._evTot = tot;   // i tap sulle voci sono gestiti per delega in bpEventsOpen
        }

        function bpChkToggle(id, el, key){
            const list = bpGetEvents(); const ev = list.find(e => e.id === id); if (!ev) return;
            ev.check = ev.check || {};
            if (ev.check[key]) delete ev.check[key]; else ev.check[key] = 1;
            bpSetEvents(list);
            el.classList.toggle('done');
            // ricalcola progresso + costi dallo stato dell'evento (singola fonte di verità)
            let tot = 0, done = 0, cTot = 0, cDone = 0;
            (ev.lista || []).forEach(g => g.items.forEach(it => {
                const k = g.key + '|' + it.nome, d = !!ev.check[k], c = _bpParseCost(it.costo);
                tot++; if (d) done++; cTot += c; if (d) cDone += c;
            }));
            const set = (eid, txt) => { const e = document.getElementById(eid); if (e) e.textContent = txt; };
            const fill = document.getElementById('bp-chk-fill'); if (fill) fill.style.width = (tot ? Math.round(done/tot*100) : 0) + '%';
            set('bp-chk-lbl', done + '/' + tot + ' ' + _bpT()('chkBought'));
            set('bp-chk-speso', _bpMoney(cDone));
            set('bp-chk-manca', _bpMoney(cTot - cDone));
        }

        function bpEventEdit(id){
            const _T = _bpT();
            const ev = bpGetEvents().find(e => e.id === id); if (!ev) return;
            const c = ev.config || {};
            const _s = (eid, v) => { const e = document.getElementById(eid); if (e && v != null && v !== '') e.value = v; };
            _s('ospiti', c.ospiti); _s('drink_testa', c.drink_testa); _s('shot_testa', c.shot_testa); _s('scarto', c.scarto);
            _s('sel-nazione', c.nazione); _s('sel-fascia', c.fascia); _s('pct-bevitori', c.pct_bevitori);
            _s('ferm_vino_rosso', c.ferm_vino_rosso); _s('ferm_vino_bianco', c.ferm_vino_bianco); _s('ferm_bollicine', c.ferm_bollicine); _s('ferm_birra', c.ferm_birra); _s('sel-fascia-fermentati', c.fascia_fermentati);
            menuSerataDrink = Object.assign({}, (ev.menu && ev.menu.drink) || {});
            menuSerataMocktail = Object.assign({}, (ev.menu && ev.menu.mocktail) || {});
            menuSerataShot = Object.assign({}, (ev.menu && ev.menu.shot) || {});
            bpCfgNomeEvento = ev.nome || '';
            bpEditingId = ev.id;
            bpSyncNomeField();
            if (typeof inizializzaApp === 'function') inizializzaApp();
            if (typeof aggiornaPctBevitori === 'function') aggiornaPctBevitori();
            if (typeof renderizzaMenu === 'function') renderizzaMenu();
            if (typeof aggiornaBadge === 'function') aggiornaBadge();
            if (typeof salvaStato === 'function') salvaStato();
            bpEventsClose();
            if (typeof vaiAStep === 'function') vaiAStep('step-setup');
            mostraToast(_T('evToastLoaded'));
        }

        function bpEventDup(id){
            const _T = _bpT();
            const list = bpGetEvents(); const ev = list.find(e => e.id === id); if (!ev) return;
            const copy = JSON.parse(JSON.stringify(ev));
            copy.id = 'ev_' + Date.now(); copy.data = Date.now(); copy.nome = (ev.nome || '') + ' ' + _T('evCopySuffix'); copy.check = {};
            list.push(copy); bpSetEvents(list); bpEventsList();
            mostraToast(_T('evToastDuplicated'));
        }

        function bpEventDelete(id){
            const _T = _bpT();
            if (!confirm(_T('evConfirmDelete'))) return;
            bpSetEvents(bpGetEvents().filter(e => e.id !== id));
            bpEventsList();
            mostraToast(_T('evToastDeleted'));
        }

        /* ── Menu a panino (hamburger) ── */
        function bpToggleNav(){
            const n = document.getElementById('bp-nav'), b = document.getElementById('bp-burger');
            if (!n || !b) return;
            const open = !n.classList.contains('show');
            n.classList.toggle('show', open);
            b.classList.toggle('open', open);
            b.setAttribute('aria-expanded', open ? 'true' : 'false');
            document.body.style.overflow = open ? 'hidden' : '';
        }
        function bpCloseNav(){
            const n = document.getElementById('bp-nav'), b = document.getElementById('bp-burger');
            if (n) n.classList.remove('show');
            if (b){ b.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); }
            document.body.style.overflow = '';
        }
        function bpNavGo(which){
            bpCloseNav();
            if (which === 'nuovo') resetCompleto();
            else if (which === 'eventi') bpEventsOpen();
            else if (which === 'cocktail') bpLibraryOpen('cocktail');
            else if (which === 'amari') bpLibraryOpen('amari');
        }

        /* ════════════════════════════════════════════════════════════
           MENÙ DA ESPORRE — vista lato-ospite (solo nomi), 4 stili,
           modificabile inline (contenteditable) e stampabile/PDF.
           Sorgente: stato live (dalla lista) oppure un evento salvato.
           Non tocca calcoli/prezzi: è solo una vista del menu scelto.
           ════════════════════════════════════════════════════════════ */
        const BPM_STYLES = ['elegant','minimal','chalk','festa'];

        function _bpmStripHV(n){ return String(n == null ? '' : n).replace(/\s*\((?:HV|hv)\)\s*$/, '').trim(); }

        /* Costruisce le categorie del menù (solo nomi) dalla sorgente. */
        function _bpmCats(src){
            const cats = [];
            const uniq = arr => { const s = {}, out = []; arr.forEach(n => { if (n && !s[n]) { s[n] = 1; out.push(n); } }); return out; };
            const dk = uniq(Object.keys(src.drink || {}).map(_bpmStripHV));
            const mk = uniq(Object.keys(src.mocktail || {}).map(_bpmStripHV));
            const sk = uniq(Object.keys(src.shot || {}).map(_bpmStripHV));
            const f = src.ferm || {};
            const vk = [];
            if ((parseFloat(f.rosso) || 0) > 0)     vk.push(T('lblVinoRosso'));
            if ((parseFloat(f.bianco) || 0) > 0)    vk.push(T('lblVinoBianco'));
            if ((parseFloat(f.bollicine) || 0) > 0) vk.push(T('lblBollicine'));
            if ((parseFloat(f.birra) || 0) > 0)     vk.push(T('lblBirra'));
            if (dk.length) cats.push({ t: T('menuCatCocktail'), items: dk });
            if (mk.length) cats.push({ t: T('menuCatMocktail'), items: mk });
            if (sk.length) cats.push({ t: T('menuCatShot'),     items: sk });
            if (vk.length) cats.push({ t: T('menuCatVini'),     items: vk });
            return cats;
        }

        // Sceglie il numero di colonne in base a quante voci ci sono, così il menù
        // resta su UNA sola facciata: 1 colonna centrata se sono poche, 2 o 3 se tante.
        function _bpmCols(cats){
            let total = 0; cats.forEach(c => total += c.items.length);
            return total > 24 ? 3 : (total > 10 ? 2 : 1);
        }
        function bpMenuRender(src){
            const canvas = document.getElementById('bpm-canvas');
            if (!canvas) return;
            const esc = _bpEsc;
            const cats = _bpmCats(src);
            canvas.dataset.cols = _bpmCols(cats);
            let html = '<div class="bpm-head">' +
                '<div class="bpm-eyebrow" contenteditable="true" spellcheck="false">' + esc(src.eyebrow || T('menuEyebrow')) + '</div>' +
                '<h1 class="bpm-title" contenteditable="true" spellcheck="false">' + esc(src.titolo || T('menuDefaultTitle')) + '</h1>' +
                '<div class="bpm-date" contenteditable="true" spellcheck="false">' + esc(src.dataTxt || '') + '</div>' +
                '<div class="bpm-headrule" aria-hidden="true"></div>' +
                '</div>';
            html += '<div class="bpm-cats">';
            cats.forEach(c => {
                html += '<section class="bpm-cat">' +
                    '<h2 class="bpm-cat-title"><span class="bpm-cat-text" contenteditable="true" spellcheck="false">' + esc(c.t) + '</span></h2>' +
                    '<div class="bpm-cat-rule" aria-hidden="true"></div>' +
                    '<ul class="bpm-list">';
                c.items.forEach(n => {
                    html += '<li class="bpm-item"><span class="bpm-name" contenteditable="true" spellcheck="false">' + esc(n) + '</span>' +
                        '<button type="button" class="bpm-del" tabindex="-1" aria-label="' + esc(T('menuRemove')) + '">×</button></li>';
                });
                html += '</ul></section>';
            });
            html += '</div>';
            html += '<div class="bpm-foot" contenteditable="true" spellcheck="false">' + esc(src.foot || '') + '</div>';
            canvas.innerHTML = html;
        }

        function bpMenuSetStyle(style){
            if (BPM_STYLES.indexOf(style) < 0) style = 'elegant';
            const canvas = document.getElementById('bpm-canvas');
            if (canvas){
                const cols = canvas.dataset.cols;
                canvas.className = 'bpm-canvas bpm-' + style + (cols && cols !== '1' ? ' bpm-cols-' + cols : '');
            }
            document.querySelectorAll('.bpm-style-btn').forEach(b => b.classList.toggle('active', b.dataset.style === style));
            try { localStorage.setItem('bp_menu_style', style); } catch (e) {}
        }

        function bpMenuOpen(src){
            const o = document.getElementById('bp-menu');
            if (!o) return;
            bpMenuRender(src);
            let st = 'elegant';
            try { st = localStorage.getItem('bp_menu_style') || 'elegant'; } catch (e) {}
            bpMenuSetStyle(st);
            const canvas = document.getElementById('bpm-canvas');
            if (canvas && !canvas._bpmBound){
                canvas._bpmBound = true;
                canvas.addEventListener('click', e => {
                    const d = e.target.closest('.bpm-del');
                    if (d){ const li = d.closest('.bpm-item'); if (li) li.remove(); }
                });
            }
            o.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        function bpMenuClose(){
            const o = document.getElementById('bp-menu');
            if (!o) return;
            o.classList.remove('show');
            // Se sotto c'è ancora un overlay aperto (es. "I miei eventi"), tieni il blocco scroll.
            document.body.style.overflow = document.querySelector('.bpc-overlay.show') ? 'hidden' : '';
        }

        /* Apre il menù dallo stato live (step Lista). */
        function bpMenuOpenFromList(){
            const g = id => { const e = document.getElementById(id); return e ? e.value : ''; };
            const src = {
                titolo: (bpCfgNomeEvento && bpCfgNomeEvento.trim()) ? bpCfgNomeEvento.trim() : '',
                eyebrow: T('menuEyebrow'),
                dataTxt: new Date().toLocaleDateString(linguaCorrente || 'it', { day:'numeric', month:'long', year:'numeric' }),
                drink: menuSerataDrink, mocktail: menuSerataMocktail, shot: menuSerataShot,
                ferm: { rosso: g('ferm_vino_rosso'), bianco: g('ferm_vino_bianco'), bollicine: g('ferm_bollicine'), birra: g('ferm_birra') }
            };
            if (!_bpmCats(src).length){ alert(T('menuEmpty')); return; }
            bpMenuOpen(src);
        }

        /* Apre il menù da un evento salvato (punto 2). */
        function bpMenuOpenFromEvent(id){
            const ev = bpGetEvents().find(e => e.id === id);
            if (!ev) return;
            const c = ev.config || {}, m = ev.menu || {};
            const src = {
                titolo: ev.nome || '',
                eyebrow: T('menuEyebrow'),
                dataTxt: _bpFmtDate(ev.data),
                drink: m.drink || {}, mocktail: m.mocktail || {}, shot: m.shot || {},
                ferm: { rosso: c.ferm_vino_rosso, bianco: c.ferm_vino_bianco, bollicine: c.ferm_bollicine, birra: c.ferm_birra }
            };
            if (!_bpmCats(src).length){ alert(T('menuEmpty')); return; }
            bpMenuOpen(src);
        }

        function bpMenuPrint(){
            try { window.print(); }
            catch (e) { alert('Impossibile aprire il dialogo di stampa. Prova da Menu del browser → Stampa.'); }
        }

        /* Isola la stampa al solo menù quando l'overlay è aperto (vale anche per Ctrl+P). */
        window.addEventListener('beforeprint', function(){
            const m = document.getElementById('bp-menu');
            if (m && m.classList.contains('show')) document.body.classList.add('bp-printing-menu');
        });
        window.addEventListener('afterprint', function(){ document.body.classList.remove('bp-printing-menu'); });

        /* ════════════════════════════════════════════════════════════
           LIBRERIA "I miei cocktail" / "I miei amari"
           Lista + ricerca, editor ricette (modifica anche i predefiniti,
           crea/elimina/ripristina), e "aggiungi al menù / agli shot".
           Click gestiti per delega (niente nomi negli onclick → no escaping).
           ════════════════════════════════════════════════════════════ */
        let bpLibMode = 'cocktail';   // 'cocktail' | 'amari'
        let bpLibQuery = '';
        let bpLibEditType = 'cocktail';
        let bpLibEditOriginal = null;

        function _bplMl(ml){ return (''+ml).replace('.', (linguaCorrente === 'en') ? '.' : ',') + ' ml'; }

        function bpLibraryOpen(mode){
            bpLibMode = (mode === 'amari') ? 'amari' : 'cocktail';
            bpLibQuery = '';
            const o = document.getElementById('bp-library'); if (!o) return;
            const wrap = document.getElementById('bpl-wrap');
            if (wrap && !wrap._bound){ wrap._bound = true; wrap.addEventListener('click', bpLibClick); }
            bpLibShowList();
            o.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
        function bpLibraryClose(){
            const o = document.getElementById('bp-library'); if (!o) return;
            o.classList.remove('show');
            document.body.style.overflow = document.querySelector('.bpc-overlay.show, .bpm-overlay.show') ? 'hidden' : '';
        }

        function bpLibClick(e){
            const b = e.target.closest('[data-act]'); if (!b) return;
            const act = b.dataset.act, name = b.dataset.name || '';
            if (act === 'addmenu') bpLibAddToMenu(name);
            else if (act === 'addshot') bpLibAddAmaroToShots(name);
            else if (act === 'edit') bpLibShowEditor('cocktail', name);
            else if (act === 'editamaro') bpLibShowEditor('amaro', name);
            else if (act === 'del') bpLibDelete(name);
            else if (act === 'delamaro') bpLibAmaroDelete(name);
            else if (act === 'reset') bpLibResetOriginal(name);
            else if (act === 'new') bpLibShowEditor(bpLibMode === 'amari' ? 'amaro' : 'cocktail', null);
            else if (act === 'adding') bpLibAddIngRow();
            else if (act === 'savecocktail') bpLibSaveCocktail();
            else if (act === 'saveamaro') bpLibSaveAmaro();
            else if (act === 'cancel') bpLibShowList();
        }

        function bpLibFilter(v){ bpLibQuery = v || ''; bpLibRenderListItems(); }

        function bpLibShowList(){
            bpLibEditOriginal = null;
            const back = document.getElementById('bpl-backbtn'); if (back) back.style.display = 'none';
            const wrap = document.getElementById('bpl-wrap'); if (!wrap) return;
            const isC = bpLibMode === 'cocktail';
            const title = isC ? T('navCocktail') : T('navAmari');
            const sub   = isC ? T('libCocktailSub') : T('libAmariSub');
            const ph    = isC ? T('libSearchCocktail') : T('libSearchAmari');
            const newL  = isC ? T('libNewCocktail') : T('libNewAmaro');
            wrap.innerHTML =
                '<div class="bpl-head"><h2>' + _bpEsc(title) + '</h2><div class="bpl-sub">' + _bpEsc(sub) + '</div></div>' +
                '<div class="bpl-toolbar">' +
                    '<input type="text" id="bpl-search" autocomplete="off" placeholder="' + _bpEsc(ph) + '" value="' + _bpEsc(bpLibQuery) + '" data-on-input-value="bpLibFilter">' +
                    '<button type="button" class="bpl-btn primary bpl-new" data-act="new">✚ ' + _bpEsc(newL) + '</button>' +
                '</div>' +
                '<div class="bpl-count" id="bpl-count"></div>' +
                '<div class="bpl-list" id="bpl-list"></div>';
            bpLibRenderListItems();
        }

        function bpLibRenderListItems(){
            const list = document.getElementById('bpl-list'); if (!list) return;
            const q = (bpLibQuery || '').trim().toLowerCase();
            let html = '', count = 0;
            if (bpLibMode === 'cocktail'){
                const names = Object.keys(databaseDrink).sort((a, b) => _bpmStripHV(a).localeCompare(_bpmStripHV(b)));
                names.forEach(name => {
                    const disp = _bpmStripHV(name);
                    if (q && disp.toLowerCase().indexOf(q) < 0 && name.toLowerCase().indexOf(q) < 0) return;
                    count++;
                    const ings = databaseDrink[name] || [];
                    const allAnalc = ings.length > 0 && ings.every(i => i.tipo !== 'alcolico');
                    const ingTxt = ings.map(i => _bpEsc(tradIngrediente(i.nome)) + ' ' + _bplMl(i.ml)).join(' · ');
                    const isCustom = bpRecipes.custom.indexOf(name) >= 0;
                    const isMod = !isCustom && Object.prototype.hasOwnProperty.call(bpRecipes.mods, name);
                    let badges = '';
                    if (isCustom) badges += '<span class="bpl-badge">' + _bpEsc(T('libBadgeCustom')) + '</span>';
                    else if (isMod) badges += '<span class="bpl-badge">' + _bpEsc(T('libBadgeMod')) + '</span>';
                    if (allAnalc) badges += ' <span class="bpl-badge analc">' + _bpEsc(T('libTagAnalc')) + '</span>';
                    let actions = '<button type="button" class="bpl-btn primary" data-act="addmenu" data-name="' + _bpEsc(name) + '">' + _bpEsc(T('libAddToMenu')) + '</button>' +
                                  '<button type="button" class="bpl-btn" data-act="edit" data-name="' + _bpEsc(name) + '">' + _bpEsc(T('libEdit')) + '</button>';
                    if (isCustom) actions += '<button type="button" class="bpl-btn danger" data-act="del" data-name="' + _bpEsc(name) + '">' + _bpEsc(T('libDelete')) + '</button>';
                    else if (isMod) actions += '<button type="button" class="bpl-btn" data-act="reset" data-name="' + _bpEsc(name) + '">' + _bpEsc(T('libReset')) + '</button>';
                    html += '<div class="bpl-card"><div class="bpl-card-top"><div class="bpl-name">' + _bpEsc(disp) + '</div><div>' + badges + '</div></div>' +
                            '<div class="bpl-ings">' + ingTxt + '</div>' +
                            '<div class="bpl-actions">' + actions + '</div></div>';
                });
            } else {
                const amari = (bpRecipes.amari || []).slice().sort((a, b) => a.localeCompare(b));
                amari.forEach(name => {
                    if (q && name.toLowerCase().indexOf(q) < 0) return;
                    count++;
                    const actions = '<button type="button" class="bpl-btn primary" data-act="addshot" data-name="' + _bpEsc(name) + '">' + _bpEsc(T('libAddToShots')) + '</button>' +
                                    '<button type="button" class="bpl-btn" data-act="editamaro" data-name="' + _bpEsc(name) + '">' + _bpEsc(T('libEdit')) + '</button>' +
                                    '<button type="button" class="bpl-btn danger" data-act="delamaro" data-name="' + _bpEsc(name) + '">' + _bpEsc(T('libDelete')) + '</button>';
                    html += '<div class="bpl-card"><div class="bpl-card-top"><div class="bpl-name">' + _bpEsc(name) + '</div></div>' +
                            '<div class="bpl-actions">' + actions + '</div></div>';
                });
            }
            if (!count) html = '<div class="bpl-empty">' + _bpEsc(T('libEmpty')) + '</div>';
            list.innerHTML = html;
            const c = document.getElementById('bpl-count'); if (c) c.textContent = count ? ('' + count) : '';
        }

        function bpLibShowEditor(type, name){
            bpLibEditType = type;
            bpLibEditOriginal = name || null;
            const back = document.getElementById('bpl-backbtn'); if (back) back.style.display = '';
            const wrap = document.getElementById('bpl-wrap'); if (!wrap) return;
            const title = name ? T('libEditTitle') : T('libCreateTitle');
            if (type === 'amaro'){
                wrap.innerHTML = '<div class="bpl-head"><h2>' + _bpEsc(title) + '</h2></div>' +
                    '<div class="bpl-editor">' +
                        '<div><label class="bpl-field-label">' + _bpEsc(T('libPhAmaro')) + '</label>' +
                        '<input type="text" id="bpl-name" autocomplete="off" placeholder="' + _bpEsc(T('libPhAmaro')) + '" value="' + _bpEsc(name || '') + '"></div>' +
                        '<div class="bpl-ed-actions"><button type="button" class="bpl-btn primary" data-act="saveamaro">' + _bpEsc(T('libSave')) + '</button>' +
                        '<button type="button" class="bpl-btn" data-act="cancel">' + _bpEsc(T('libCancel')) + '</button></div>' +
                    '</div>';
                return;
            }
            const ings = (name && databaseDrink[name]) ? databaseDrink[name] : [];
            wrap.innerHTML = '<div class="bpl-head"><h2>' + _bpEsc(title) + '</h2></div>' +
                '<div class="bpl-editor">' +
                    '<div><label class="bpl-field-label">' + _bpEsc(T('libPhName')) + '</label>' +
                    '<input type="text" id="bpl-name" autocomplete="off" placeholder="' + _bpEsc(T('libPhName')) + '" value="' + _bpEsc(name || '') + '"></div>' +
                    '<div><label class="bpl-field-label">' + _bpEsc(T('libIngredients')) + '</label><div class="bpl-ing" id="bpl-ing"></div></div>' +
                    '<div><button type="button" class="bpl-btn" data-act="adding">✚ ' + _bpEsc(T('libAddIng')) + '</button></div>' +
                    '<div class="bpl-ed-actions"><button type="button" class="bpl-btn primary" data-act="savecocktail">' + _bpEsc(T('libSave')) + '</button>' +
                    '<button type="button" class="bpl-btn" data-act="cancel">' + _bpEsc(T('libCancel')) + '</button></div>' +
                '</div>';
            if (ings.length) ings.forEach(i => bpLibAddIngRow(i));
            else { bpLibAddIngRow(); bpLibAddIngRow(); }
        }

        function bpLibAddIngRow(preset){
            const c = document.getElementById('bpl-ing'); if (!c) return;
            const div = document.createElement('div');
            div.className = 'creator-row';
            div.innerHTML =
                '<input type="text" class="ing-nome" placeholder="' + _bpEsc(T('phIngrediente')) + '" list="lista-ingredienti">' +
                '<select class="ing-tipo"><option value="alcolico">' + _bpEsc(T('labelAlcolico')) + '</option><option value="analcolico">' + _bpEsc(T('labelAnalcolico')) + '</option></select>' +
                '<input type="number" class="ing-ml" placeholder="' + _bpEsc(T('phMl')) + '" min="0" step="0.5">' +
                '<button type="button" class="btn-rimuovi-ing" title="' + _bpEsc(T('lblRimuovi') || 'Rimuovi') + '">&times;</button>';
            div.querySelector('.ing-nome').value = preset && preset.nome ? preset.nome : '';
            div.querySelector('.ing-ml').value = preset && preset.ml != null ? preset.ml : '';
            div.querySelector('.ing-tipo').value = preset && preset.tipo ? preset.tipo : 'alcolico';
            div.querySelector('.btn-rimuovi-ing').addEventListener('click', () => div.remove());
            c.appendChild(div);
        }

        function bpLibSaveCocktail(){
            const nameEl = document.getElementById('bpl-name'); if (!nameEl) return;
            const nome = nameEl.value.trim();
            if (!nome) return alert(T('libAlertName'));
            const ings = [];
            document.querySelectorAll('#bpl-ing .creator-row').forEach(row => {
                const n = row.querySelector('.ing-nome').value.trim();
                const ml = parseFloat(row.querySelector('.ing-ml').value);
                const tipo = row.querySelector('.ing-tipo').value;
                if (n && !isNaN(ml) && ml > 0) ings.push({ nome: n, tipo: tipo, ml: ml });
            });
            if (!ings.length) return alert(T('libAlertIng'));
            const orig = bpLibEditOriginal;
            if (orig && orig !== nome){
                bpRecipes.custom = bpRecipes.custom.filter(x => x !== orig);
                delete bpRecipes.mods[orig];
                if (DB_ORIGINAL[orig]) databaseDrink[orig] = JSON.parse(JSON.stringify(DB_ORIGINAL[orig]));
                else delete databaseDrink[orig];
                delete menuSerataDrink[orig];
                delete menuSerataMocktail[orig];
            }
            bpRecipes.mods[nome] = ings;
            if (!DB_ORIGINAL[nome] && bpRecipes.custom.indexOf(nome) < 0) bpRecipes.custom.push(nome);
            databaseDrink[nome] = JSON.parse(JSON.stringify(ings));
            bpRecipesSave();
            inizializzaApp();
            renderizzaMenu();
            if (typeof aggiornaBadge === 'function') aggiornaBadge();
            salvaStato();
            mostraToast(T('libSavedToast'));
            bpLibShowList();
        }

        function bpLibSaveAmaro(){
            const el = document.getElementById('bpl-name'); if (!el) return;
            const nome = el.value.trim();
            if (!nome) return alert(T('libAlertName'));
            const orig = bpLibEditOriginal;
            if (orig){
                const i = bpRecipes.amari.indexOf(orig);
                if (i >= 0) bpRecipes.amari[i] = nome;
                else if (bpRecipes.amari.indexOf(nome) < 0) bpRecipes.amari.push(nome);
            } else if (bpRecipes.amari.indexOf(nome) < 0) {
                bpRecipes.amari.push(nome);
            }
            bpRecipesSave();
            mostraToast(T('libSavedToast'));
            bpLibShowList();
        }

        function bpLibAddToMenu(nome){
            const ings = databaseDrink[nome]; if (!ings) return;
            const hasAlc = ings.some(i => i.tipo === 'alcolico');
            if (hasAlc){ if (!(nome in menuSerataDrink)) menuSerataDrink[nome] = 1; }
            else { if (!(nome in menuSerataMocktail)) menuSerataMocktail[nome] = 1; }
            renderizzaMenu();
            if (typeof aggiornaBadge === 'function') aggiornaBadge();
            salvaStato();
            mostraToast(T('libAddedMenu').replace('{nome}', _bpmStripHV(nome)));
        }

        function bpLibAddAmaroToShots(nome){
            if (!(nome in menuSerataShot)) menuSerataShot[nome] = 1;
            renderizzaMenu();
            if (typeof aggiornaBadge === 'function') aggiornaBadge();
            salvaStato();
            mostraToast(T('libAddedShots').replace('{nome}', nome));
        }

        function bpLibDelete(nome){
            if (!confirm(T('libConfirmDelete').replace('{nome}', _bpmStripHV(nome)))) return;
            bpRecipes.custom = bpRecipes.custom.filter(x => x !== nome);
            delete bpRecipes.mods[nome];
            bpRecipesSave();
            delete databaseDrink[nome];
            if (customDrinks && (nome in customDrinks)) delete customDrinks[nome];   // pulizia legacy: evita il ripristino al reload
            delete menuSerataDrink[nome];
            delete menuSerataMocktail[nome];
            inizializzaApp();
            renderizzaMenu();
            if (typeof aggiornaBadge === 'function') aggiornaBadge();
            salvaStato();
            mostraToast(T('libDeletedToast'));
            bpLibRenderListItems();
        }

        function bpLibResetOriginal(nome){
            if (!DB_ORIGINAL[nome]) return;
            delete bpRecipes.mods[nome];
            bpRecipesSave();
            databaseDrink[nome] = JSON.parse(JSON.stringify(DB_ORIGINAL[nome]));
            inizializzaApp();
            renderizzaMenu();
            mostraToast(T('libResetToast'));
            bpLibRenderListItems();
        }

        function bpLibAmaroDelete(nome){
            if (!confirm(T('libConfirmDelete').replace('{nome}', nome))) return;
            bpRecipes.amari = bpRecipes.amari.filter(x => x !== nome);
            bpRecipesSave();
            mostraToast(T('libDeletedToast'));
            bpLibRenderListItems();
        }

        /* ════════════════════════════════════════════════════════════
           HOME — hub d'ingresso (mostrata all'avvio, sotto l'header).
           "Crea nuovo evento" → resetta (con conferma se c'è lavoro non
           salvato) e mostra SEMPRE la scelta guidata/manuale.
           L'icona "home" in alto a sinistra (#bp-burger) ci riporta qui.
           ════════════════════════════════════════════════════════════ */
        function bpHasInProgress(){
            return !!(Object.keys(menuSerataDrink).length
                   || Object.keys(menuSerataMocktail).length
                   || Object.keys(menuSerataShot).length
                   || (bpCfgNomeEvento && bpCfgNomeEvento.trim()));
        }

        function bpGoHome(){
            // chiudi eventuali overlay aperti
            ['bp-menu','bp-library','bp-events','bp-ricettario','bp-welcome','bp-config','bp-settings'].forEach(id => {
                const o = document.getElementById(id); if (o) o.classList.remove('show');
            });
            document.body.style.overflow = '';
            document.body.classList.add('bp-home');
            bpHomeRender();
            window.scrollTo({ top: 0, behavior: 'instant' });
        }

        function bpHomeRender(){
            const wrap = document.getElementById('bph-inner'); if (!wrap) return;
            if (!wrap._bound){ wrap._bound = true; wrap.addEventListener('click', bpHomeClick); }
            const esc = _bpEsc;
            let h = '<div class="bph-eyebrow">' + esc(T('homeEyebrow')) + '</div>';
            h += '<button type="button" class="bph-hero" data-home="new">' +
                    '<span class="bph-hero-ic">&#10010;</span>' +
                    '<span class="bph-hero-tx"><span class="bph-hero-title">' + esc(T('homeNewTitle')) + '</span>' +
                    '<span class="bph-hero-desc">' + esc(T('homeNewDesc')) + '</span></span>' +
                    '<span class="bph-hero-arrow">&rsaquo;</span></button>';
            if (bpHasInProgress()){
                // Card "Riprendi": area sinistra cliccabile = riprendi; a destra il reset
                // (compare quindi SOLO quando c'è un evento in corso). Rosso all'hover.
                h += '<div class="bph-resume">' +
                        '<button type="button" class="bph-resume-main" data-home="resume">' +
                            '<span class="bph-resume-ic">&#8635;</span>' +
                            '<span class="bph-resume-tx"><span class="bph-resume-title">' + esc(T('homeResumeTitle')) + '</span>' +
                            '<span class="bph-resume-desc">' + esc(T('homeResumeDesc')) + '</span></span>' +
                            '<span class="bph-resume-arrow">&rsaquo;</span></button>' +
                        '<button type="button" class="bph-resume-reset" data-home="reset" title="' + esc(T('btnReset')) + '" aria-label="' + esc(T('btnReset')) + '">' +
                            '<span class="bph-reset-ic">&#10005;</span>' +
                            '<span class="bph-reset-lbl">' + esc(T('btnReset')) + '</span></button>' +
                     '</div>';
            }
            const gcard = (act, icon, title, desc, extra) =>
                '<button type="button" class="bph-card' + (extra ? ' ' + extra : '') + '" data-home="' + act + '">' +
                    '<span class="bph-card-ic">' + icon + '</span>' +
                    '<span class="bph-card-tx"><span class="bph-card-title">' + esc(title) + '</span>' +
                    '<span class="bph-card-desc">' + esc(desc) + '</span></span></button>';
            h += '<div class="bph-grid">' +
                    gcard('events',     '&#10070;', T('evHeaderBtn'),  T('homeEventsDesc')) +
                    gcard('cocktail',   '&#10049;', T('navCocktail'),  T('homeCocktailDesc')) +
                    gcard('amari',      '&#10059;', T('navAmari'),     T('homeAmariDesc')) +
                    gcard('settings',   '&#9881;',  T('homeSettingsTitle'), T('homeSettingsDesc'), 'bph-card-wide') +
                 '</div>';
            wrap.innerHTML = h;
        }

        function bpHomeClick(e){
            const b = e.target.closest('[data-home]'); if (!b) return;
            const a = b.dataset.home;
            if (a === 'new') bpHomeNewEvent();
            else if (a === 'resume') bpHomeResume();
            else if (a === 'reset') bpHomeReset();
            else if (a === 'events') bpEventsOpen();
            else if (a === 'cocktail') bpLibraryOpen('cocktail');
            else if (a === 'amari') bpLibraryOpen('amari');
            else if (a === 'ricettario') bpRicettarioOpen();
            else if (a === 'settings') bpSettingsOpen();
        }

        // "Azzera tutto" dalla card Riprendi: conferma, resetta l'evento in corso
        // e resta in home (la card Riprendi sparisce perché non c'è più lavoro in corso).
        function bpHomeReset(){
            if (!confirm(T('confirmReset'))) return;
            _bpEventResetCore();
            mostraToast(T('toastReset'));
            bpHomeRender();
        }

        function bpHomeNewEvent(){
            if (bpHasInProgress() && !confirm(T('homeConfirmNew'))) return;
            _bpEventResetCore();
            bpShowWelcome();   // mostra SEMPRE la scelta guidata/manuale
        }

        function bpHomeResume(){
            vaiAStep('step-setup');   // rimuove bp-home ed entra nel wizard con i dati attuali
        }

        /* ── Nome evento: campo Setup ↔ variabile bpCfgNomeEvento ── */
        function bpAggiornaNomeEvento(v){ bpCfgNomeEvento = v || ''; programmaSalvataggio(); }
        function bpSyncNomeField(){ const e = document.getElementById('nome-evento'); if (e) e.value = bpCfgNomeEvento || ''; }

        /* ════════════════════════════════════════════════════════════
           CALCOLO
           ════════════════════════════════════════════════════════════ */
        function ricalcolaSeVisibile() {
            aggiornaBadge();
            // I pannelli wizard si mostrano/nascondono con la classe .active (non con lo style
            // inline), quindi controlliamo quella. Il ricalcolo automatico è silenzioso: non deve
            // mai far comparire alert (es. all'avvio o cambiando lo slider sullo step Setup).
            const panel = document.querySelector('.step-panel[data-stepid="risultati"]');
            if (panel && panel.classList.contains('active')) {
                programmaRicalcoloLista();
            }
        }

        /* ════════════════════════════════════════════════════════════
           STIMA COSTO VELOCE (solo numero, niente DOM) — per la stima live
           ────────────────────────────────────────────────────────────
           ATTENZIONE: rispecchia esattamente la matematica dei costi di
           calcolaSpesa() (stesse tabelle prezziBase/indiciGeo, stesse formule
           e arrotondamenti). Se cambi i prezzi/formule in calcolaSpesa,
           aggiorna anche qui. Un test in console verifica che i due totali
           coincidano per gli stessi input. ════════════════════════════════ */
        function stimaBudget(p) {
            const ospiti = parseFloat(p.ospiti) || 0;
            const drinkTesta = parseFloat(p.drinkTesta) || 0;
            const shotTesta = parseFloat(p.shotTesta) || 0;
            const scarto = parseFloat(p.scarto) || 0;
            const pct = (p.pct == null) ? 80 : (parseInt(p.pct) || 0);
            const fascia = p.fascia || 'media';
            const fasciaFerm = p.fasciaFerm || fascia;
            const geoMult = indiciGeo[p.nazione] || 1;
            const arr = c => Math.ceil(c * 2) / 2;

            const ospitiAlc = Math.round(ospiti * (pct / 100));
            const ospitiAna = Math.max(0, ospiti - ospitiAlc);
            const mult = 1 + (scarto / 100);
            const drinkTot = Math.ceil(ospitiAlc * drinkTesta * mult);
            const shotTot  = Math.ceil(ospitiAlc * shotTesta  * mult);
            const mockTot  = Math.ceil(ospitiAna * drinkTesta * mult);

            const drink = p.drink || {}, mocktail = p.mocktail || {}, shot = p.shot || {};
            let pesoD = 0; Object.keys(drink).forEach(k => pesoD += drink[k]);
            let pesoM = 0; Object.keys(mocktail).forEach(k => pesoM += mocktail[k]);
            let pesoS = 0; Object.keys(shot).forEach(k => pesoS += shot[k]);

            const spesaA = {}, spesaN = {};
            if (pesoD > 0 && drinkTot > 0) Object.keys(drink).forEach(nome => {
                const qty = Math.ceil(drinkTot * (drink[nome] / pesoD));
                (databaseDrink[nome] || []).forEach(ing => {
                    const k = normalizzaIngrediente(ing.nome);
                    if (ing.tipo === 'alcolico') spesaA[k] = (spesaA[k] || 0) + ing.ml * qty;
                    else spesaN[k] = (spesaN[k] || 0) + ing.ml * qty;
                });
            });
            if (pesoM > 0 && mockTot > 0) Object.keys(mocktail).forEach(nome => {
                const qty = Math.ceil(mockTot * (mocktail[nome] / pesoM));
                (databaseDrink[nome] || []).forEach(ing => {
                    const k = normalizzaIngrediente(ing.nome);
                    spesaN[k] = (spesaN[k] || 0) + ing.ml * qty;
                });
            });
            if (pesoS > 0 && shotTot > 0) Object.keys(shot).forEach(nome => {
                const qty = Math.ceil(shotTot * (shot[nome] / pesoS));
                const k = normalizzaIngrediente(nome);
                spesaA[k] = (spesaA[k] || 0) + 40 * qty;
            });

            let tot = 0;
            Object.keys(spesaA).forEach(ing => { const pr = prezziBase[ing]; tot += arr((spesaA[ing] / 1000) * (pr ? pr[fascia] : 15) * geoMult); });
            Object.keys(spesaN).forEach(ing => { const pr = prezziBase[ing]; tot += arr((spesaN[ing] / 1000) * (pr ? pr[fascia] : 2) * geoMult); });

            const ferm = p.ferm || {};
            const fermDefs = [['rosso', '_vino_rosso_bt_75cl', 5], ['bianco', '_vino_bianco_bt_75cl', 5], ['bollicine', '_bollicine_bt_75cl', 5], ['birra', '_birra_bt_33cl', 1]];
            fermDefs.forEach(([key, pk, div]) => {
                const v = parseFloat(ferm[key]) || 0; if (v <= 0) return;
                const bt = (div === 1) ? Math.ceil(ospitiAlc * v) : Math.ceil((ospitiAlc * v) / div);
                const pr = prezziBase[pk]; const prezzo = pr ? pr[fasciaFerm] : 8;
                tot += arr(bt * prezzo * geoMult);
            });

            const drinkMostrati = pesoD > 0 ? drinkTot : 0;
            const mockMostrati  = pesoM > 0 ? mockTot  : 0;
            const shotMostrati  = pesoS > 0 ? shotTot  : 0;
            const bicchieriDrinkTot = drinkMostrati + mockMostrati;
            const kgGhiaccio = Math.ceil((bicchieriDrinkTot * 100) / 1000);
            const pG  = prezziBase['_ghiaccio_kg']         ? prezziBase['_ghiaccio_kg'][fascia]         : 1.5;
            const pB  = prezziBase['_bicchiere_pz']        ? prezziBase['_bicchiere_pz'][fascia]        : 0.5;
            const pBs = prezziBase['_bicchierino_shot_pz'] ? prezziBase['_bicchierino_shot_pz'][fascia] : 0.5;
            const pC  = prezziBase['_cannuccia_pz']        ? prezziBase['_cannuccia_pz'][fascia]        : 0.5;
            tot += arr(kgGhiaccio * pG * geoMult) + arr(bicchieriDrinkTot * pB * geoMult)
                 + arr(shotMostrati * pBs * geoMult) + arr(bicchieriDrinkTot * pC * geoMult);

            return { totale: tot, ospiti, drinkMostrati, mockMostrati, shotMostrati };
        }

        let _stimaFormFrame = 0;
        function aggiornaStimaForm() {
            if (_stimaFormFrame) return;
            _stimaFormFrame = requestAnimationFrame(() => {
                _stimaFormFrame = 0;
                const box = document.getElementById('stima-live-form');
                if (!box) return;
                const num = id => { const e = document.getElementById(id); return e ? (parseFloat(e.value) || 0) : 0; };
                const ospiti = num('ospiti');
                const hasMenu = Object.keys(menuSerataDrink).length || Object.keys(menuSerataMocktail).length || Object.keys(menuSerataShot).length;
                const hasFerm = (num('ferm_vino_rosso') + num('ferm_vino_bianco') + num('ferm_bollicine') + num('ferm_birra')) > 0;
                if (ospiti <= 0 || (!hasMenu && !hasFerm)) { box.style.display = 'none'; return; }
                const selV = id => { const e = document.getElementById(id); return e ? e.value : ''; };
                const r = stimaBudget({
                    ospiti, drinkTesta: num('drink_testa'), shotTesta: num('shot_testa'), scarto: num('scarto'),
                    pct: (document.getElementById('pct-bevitori') ? parseInt(document.getElementById('pct-bevitori').value) : 80),
                    fascia: selV('sel-fascia') || 'media', nazione: selV('sel-nazione'), fasciaFerm: selV('sel-fascia-fermentati'),
                    drink: menuSerataDrink, mocktail: menuSerataMocktail, shot: menuSerataShot,
                    ferm: { rosso: num('ferm_vino_rosso'), bianco: num('ferm_vino_bianco'), bollicine: num('ferm_bollicine'), birra: num('ferm_birra') }
                });
                document.getElementById('stima-live-tot').textContent = '€ ' + r.totale.toLocaleString('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
                const ppEl = document.getElementById('stima-live-pp');
                if (ppEl) ppEl.textContent = '· ≈ € ' + (r.totale / ospiti).toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ' + T('perPersonaTxt');
                box.style.display = '';
            });
        }

        function calcolaSpesa(silenzioso) {
            let ospiti = parseFloat(document.getElementById('ospiti').value) || 0;
            let drinkTesta = parseFloat(document.getElementById('drink_testa').value) || 0;
            let shotTesta = parseFloat(document.getElementById('shot_testa').value) || 0;
            let scarto = parseFloat(document.getElementById('scarto').value) || 0;

            // ─── SPLIT BEVITORI / NON-BEVITORI ───────────────────────────
            const pctBevitori = (() => {
                const r = document.getElementById('pct-bevitori');
                return r ? (parseInt(r.value) || 0) : 80;
            })();
            const ospitiAlcolici   = Math.round(ospiti * (pctBevitori / 100));
            const ospitiAnalcolici = Math.max(0, ospiti - ospitiAlcolici);

            let moltiplicatore = 1 + (scarto / 100);
            // Cocktail/shot alcolici → bevitori; mocktail → non-bevitori (riuso drinkTesta come dose/persona).
            let drinkTotali    = Math.ceil((ospitiAlcolici   * drinkTesta) * moltiplicatore);
            let shotTotali     = Math.ceil((ospitiAlcolici   * shotTesta)  * moltiplicatore);
            let mocktailTotali = Math.ceil((ospitiAnalcolici * drinkTesta) * moltiplicatore);

            let pesoTotDrink = 0; let drinkSelezionati = [];
            Object.keys(menuSerataDrink).forEach(nome => {
                let p = menuSerataDrink[nome];
                pesoTotDrink += p;
                drinkSelezionati.push({nome: nome, peso: p});
            });

            let pesoTotMock = 0; let mockSelezionati = [];
            Object.keys(menuSerataMocktail).forEach(nome => {
                let p = menuSerataMocktail[nome];
                pesoTotMock += p;
                mockSelezionati.push({nome: nome, peso: p});
            });

            let pesoTotShot = 0; let shotSelezionati = [];
            Object.keys(menuSerataShot).forEach(nome => {
                let p = menuSerataShot[nome];
                pesoTotShot += p;
                shotSelezionati.push({nome: nome, peso: p});
            });

            // Input fermentati (numerici a-persona)
            const _num = id => { const e = document.getElementById(id); return e ? (parseFloat(e.value) || 0) : 0; };
            const calVR = _num('ferm_vino_rosso');
            const calVB = _num('ferm_vino_bianco');
            const calBoll = _num('ferm_bollicine');
            const consBirra = _num('ferm_birra');
            const hasFerm = (calVR + calVB + calBoll + consBirra) > 0;

            const drinkRichiesti = drinkTotali > 0 && pesoTotDrink === 0;
            const shotRichiesti  = shotTotali  > 0 && pesoTotShot  === 0;

            // Tolleranza alle nuove sezioni: l'app è valida se almeno UNO tra
            // drink alcolici, shot, mocktail o fermentati produce output.
            const niente = (drinkTotali === 0 || pesoTotDrink === 0)
                        && (shotTotali  === 0 || pesoTotShot  === 0)
                        && (mocktailTotali === 0 || pesoTotMock === 0)
                        && !hasFerm;
            if (niente && drinkTesta === 0 && shotTesta === 0 && !hasFerm) {
                if (!silenzioso) alert(T('alertNessunDrinkImpostato'));
                return false;
            }
            if (drinkRichiesti && shotRichiesti && pesoTotMock === 0 && !hasFerm) {
                if (!silenzioso) alert(T('alertNienteMenu'));
                return false;
            }

            const fascia = document.getElementById('sel-fascia').value;
            const nazione = document.getElementById('sel-nazione').value;
            const geoMult = indiciGeo[nazione] || 1;
            const _fascF = document.getElementById('sel-fascia-fermentati');
            const fasciaFerm = (_fascF && _fascF.value) ? _fascF.value : fascia;

            let spesaAlcolici = {}; let spesaAnalcolici = {};

            if (pesoTotDrink > 0 && drinkTotali > 0) {
                drinkSelezionati.forEach(item => {
                    let qty = Math.ceil(drinkTotali * (item.peso / pesoTotDrink));
                    databaseDrink[item.nome].forEach(ing => {
                        const nomeNorm = normalizzaIngrediente(ing.nome);
                        if(ing.tipo === 'alcolico') spesaAlcolici[nomeNorm] = (spesaAlcolici[nomeNorm] || 0) + (ing.ml * qty);
                        else spesaAnalcolici[nomeNorm] = (spesaAnalcolici[nomeNorm] || 0) + (ing.ml * qty);
                    });
                });
            }

            // ─── MOCKTAIL: ingredienti tutti analcolici → confluiscono in spesaAnalcolici ───
            if (pesoTotMock > 0 && mocktailTotali > 0) {
                mockSelezionati.forEach(item => {
                    let qty = Math.ceil(mocktailTotali * (item.peso / pesoTotMock));
                    (databaseDrink[item.nome] || []).forEach(ing => {
                        const nomeNorm = normalizzaIngrediente(ing.nome);
                        // Robustezza: anche se un ingrediente fosse misclassificato come alcolico,
                        // dentro un mocktail lo trattiamo come analcolico per coerenza UI.
                        spesaAnalcolici[nomeNorm] = (spesaAnalcolici[nomeNorm] || 0) + (ing.ml * qty);
                    });
                });
            }

            if (pesoTotShot > 0 && shotTotali > 0) {
                shotSelezionati.forEach(item => {
                    let qty = Math.ceil(shotTotali * (item.peso / pesoTotShot));
                    const nomeNorm = normalizzaIngrediente(item.nome);
                    spesaAlcolici[nomeNorm] = (spesaAlcolici[nomeNorm] || 0) + (40 * qty);
                });
            }

            // ─── FERMENTATI: calcolo bottiglie/lattine ─────────────────
            // Conv: 1 bottiglia vino/bollicine = 75 cl (≈5 calici da 150 ml) → bt = ceil((ospitiAlc × calici) / 5)
            //       1 birra 33 cl per consumazione → bt = ceil(ospitiAlc × consumazioni)
            const fermItems = []; // {keyPrezzo, label, bottiglie, taglia_L, totLitri, porzioni, unitKey}
            if (calVR > 0) {
                const bt = Math.ceil((ospitiAlcolici * calVR) / 5);
                fermItems.push({k:'_vino_rosso_bt_75cl',   labelKey:'lblVinoRosso',   bottiglie: bt, taglia: 0.75, porzioni: Math.round(ospitiAlcolici * calVR), unitKey:'lblCalici'});
            }
            if (calVB > 0) {
                const bt = Math.ceil((ospitiAlcolici * calVB) / 5);
                fermItems.push({k:'_vino_bianco_bt_75cl',  labelKey:'lblVinoBianco',  bottiglie: bt, taglia: 0.75, porzioni: Math.round(ospitiAlcolici * calVB), unitKey:'lblCalici'});
            }
            if (calBoll > 0) {
                const bt = Math.ceil((ospitiAlcolici * calBoll) / 5);
                fermItems.push({k:'_bollicine_bt_75cl',    labelKey:'lblBollicine',   bottiglie: bt, taglia: 0.75, porzioni: Math.round(ospitiAlcolici * calBoll), unitKey:'lblCalici'});
            }
            if (consBirra > 0) {
                const bt = Math.ceil(ospitiAlcolici * consBirra);
                fermItems.push({k:'_birra_bt_33cl',        labelKey:'lblBirra',       bottiglie: bt, taglia: 0.33, porzioni: Math.round(ospitiAlcolici * consBirra), unitKey:'lblConsumazioni'});
            }

            const drinkMostrati = pesoTotDrink > 0 ? drinkTotali : 0;
            const mocktailMostrati = pesoTotMock > 0 ? mocktailTotali : 0;
            const shotMostrati = pesoTotShot > 0 ? shotTotali : 0;
            const bicchieriDrinkTot = drinkMostrati + mocktailMostrati;

            document.getElementById('drink-totali-text').innerHTML =
                T('risultatiTotali')
                    .replace('{drink}', `<strong>${drinkMostrati + mocktailMostrati}</strong>`)
                    .replace('{shot}',  `<strong>${shotMostrati}</strong>`);

            function arrotondaLitri(ml) {
                const v = Math.ceil((ml / 1000) * 2) / 2;
                return v % 1 === 0 ? v.toString() : v.toFixed(1);
            }

            function appendVoce(ul, nomeDisp, litri, costo) {
                const li = document.createElement('li');
                const s = document.createElement('span');
                s.textContent = nomeDisp;
                const strong = document.createElement('strong');
                strong.textContent = litri + ' L';
                li.appendChild(s);
                li.appendChild(strong);
                if (costo > 0) {
                    const cs = document.createElement('span');
                    cs.className = 'costo-voce';
                    cs.textContent = '≈ € ' + costo.toLocaleString('it-IT', {minimumFractionDigits:2, maximumFractionDigits:2});
                    li.appendChild(cs);
                }
                ul.appendChild(li);
            }

            function rigaExtra(ul, label, val, costo) {
                const li = document.createElement('li');
                const sp = document.createElement('span'); sp.textContent = label;
                const st = document.createElement('strong'); st.textContent = val;
                li.appendChild(sp); li.appendChild(st);
                if (costo > 0) {
                    const cs = document.createElement('span'); cs.className = 'costo-voce';
                    cs.textContent = '≈ € ' + costo.toLocaleString('it-IT', {minimumFractionDigits:2, maximumFractionDigits:2});
                    li.appendChild(cs);
                }
                ul.appendChild(li);
            }

            let budgetTot = 0;
            const arrotondaCosto = c => Math.ceil(c * 2) / 2;

            const ulAlcol = document.getElementById('lista_alcolici');
            ulAlcol.innerHTML = '';
            const keysAlcol = Object.keys(spesaAlcolici).sort();
            if (keysAlcol.length === 0) {
                const li=document.createElement('li'); const s=document.createElement('span');
                s.textContent=T('nessunAlcolico'); li.appendChild(s); ulAlcol.appendChild(li);
            } else {
                keysAlcol.forEach(ing => {
                    const ml = spesaAlcolici[ing];
                    const p = prezziBase[ing];
                    const costo = arrotondaCosto((ml / 1000) * (p ? p[fascia] : 15) * geoMult);
                    budgetTot += costo;
                    appendVoce(ulAlcol, tradIngrediente(ing), arrotondaLitri(ml), costo);
                });
            }

            const ulAnalcol = document.getElementById('lista_analcolici');
            ulAnalcol.innerHTML = '';
            const keysAnalcol = Object.keys(spesaAnalcolici).sort();
            if (keysAnalcol.length === 0) {
                const li=document.createElement('li'); const s=document.createElement('span');
                s.textContent=T('nessunAnalcolico'); li.appendChild(s); ulAnalcol.appendChild(li);
            } else {
                keysAnalcol.forEach(ing => {
                    const ml = spesaAnalcolici[ing];
                    const p = prezziBase[ing];
                    const costo = arrotondaCosto((ml / 1000) * (p ? p[fascia] : 2) * geoMult);
                    budgetTot += costo;
                    appendVoce(ulAnalcol, tradIngrediente(ing), arrotondaLitri(ml), costo);
                });
            }

            // ─── BLOCCO FERMENTATI (Vini & Birre) ──────────────────────
            const blockFerm = document.getElementById('block_fermentati');
            const ulFerm = document.getElementById('lista_fermentati');
            if (ulFerm) ulFerm.innerHTML = '';
            if (fermItems.length > 0 && ulFerm && blockFerm) {
                blockFerm.style.display = 'block';
                fermItems.forEach(it => {
                    const p = prezziBase[it.k];
                    const prezzoBt = p ? p[fasciaFerm] : 8;
                    // CRITICO: applica geoMult al costo unitario, come per gli altri ingredienti
                    const costoTot = arrotondaCosto(it.bottiglie * prezzoBt * geoMult);
                    budgetTot += costoTot;
                    const totLitri = (it.bottiglie * it.taglia).toFixed(2).replace(/\.?0+$/, '').replace('.', ',');
                    const taglia_L = it.taglia.toString().replace('.', ',');
                    const li = document.createElement('li');
                    const nameSpan = document.createElement('span');
                    nameSpan.textContent = T(it.labelKey) + ': ' + it.porzioni + ' ' + T(it.unitKey) + ' · ' + totLitri + ' L';
                    const btStrong = document.createElement('strong');
                    btStrong.textContent = it.bottiglie + ' ' + T(it.bottiglie === 1 ? 'bottigliaSing' : 'bottiglie') + ' (' + taglia_L + ' L)';
                    li.appendChild(nameSpan);
                    li.appendChild(btStrong);
                    const cs = document.createElement('span');
                    cs.className = 'costo-voce';
                    cs.textContent = '≈ € ' + costoTot.toLocaleString('it-IT', {minimumFractionDigits:2, maximumFractionDigits:2});
                    li.appendChild(cs);
                    ulFerm.appendChild(li);
                });
            } else if (blockFerm) {
                blockFerm.style.display = 'none';
            }

            let kgGhiaccio = Math.ceil((bicchieriDrinkTot * 100) / 1000);
            const pGhiaccio    = prezziBase['_ghiaccio_kg']         ? prezziBase['_ghiaccio_kg'][fascia]         : 1.5;
            const pBicchiere   = prezziBase['_bicchiere_pz']        ? prezziBase['_bicchiere_pz'][fascia]        : 0.5;
            const pBicchierino = prezziBase['_bicchierino_shot_pz'] ? prezziBase['_bicchierino_shot_pz'][fascia] : 0.5;
            const pCannuccia   = prezziBase['_cannuccia_pz']        ? prezziBase['_cannuccia_pz'][fascia]        : 0.5;
            const costoGhiaccio    = arrotondaCosto(kgGhiaccio        * pGhiaccio    * geoMult);
            const costoBicchieri   = arrotondaCosto(bicchieriDrinkTot * pBicchiere   * geoMult);
            const costoBicchierini = arrotondaCosto(shotMostrati      * pBicchierino * geoMult);
            const costoCannucce    = arrotondaCosto(bicchieriDrinkTot * pCannuccia   * geoMult);
            budgetTot += costoGhiaccio + costoBicchieri + costoBicchierini + costoCannucce;

            const ulExtra = document.getElementById('lista_extra');
            ulExtra.innerHTML = '';
            rigaExtra(ulExtra, T('ghiaccio'),          kgGhiaccio        + ' kg',  costoGhiaccio);
            rigaExtra(ulExtra, T('bicchieriCocktail'), bicchieriDrinkTot + ' pz',  costoBicchieri);
            rigaExtra(ulExtra, T('bicchieriniShot'),   shotMostrati      + ' pz',  costoBicchierini);
            rigaExtra(ulExtra, T('cannucce'),          bicchieriDrinkTot + ' pz',  costoCannucce);

            // ─── Da comprare a parte (guarnizioni / ingredienti di preparazione, senza dose) ───
            const ulGarnish = document.getElementById('lista_garnish');
            const blockGarnish = document.getElementById('block_garnish');
            if (ulGarnish && blockGarnish) {
                const sceltiPerGarnish = [].concat(
                    Object.keys(menuSerataDrink), Object.keys(menuSerataMocktail), Object.keys(menuSerataShot)
                );
                const setG = new Set();
                sceltiPerGarnish.forEach(nome => { (garnishMap[nome] || []).forEach(g => setG.add(g)); });
                ulGarnish.innerHTML = '';
                if (setG.size) {
                    Array.from(setG).map(traduciGarnish).sort((a,b)=>a.localeCompare(b)).forEach(label => {
                        const li = document.createElement('li');
                        const s = document.createElement('span'); s.textContent = label;
                        li.appendChild(s);
                        ulGarnish.appendChild(li);
                    });
                    blockGarnish.style.display = 'block';
                } else {
                    blockGarnish.style.display = 'none';
                }
            }

            const bbox = document.getElementById('budget-box');
            bbox.style.display = 'block';
            document.getElementById('budget-amount').textContent =
                '€ ' + budgetTot.toLocaleString('it-IT', {minimumFractionDigits:2, maximumFractionDigits:2});
            // ─── Costo a persona ───
            const ppEl = document.getElementById('budget-perperson');
            if (ppEl) {
                if (ospiti > 0) {
                    const perPersona = budgetTot / ospiti;
                    ppEl.textContent = '≈ € ' + perPersona.toLocaleString('it-IT', {minimumFractionDigits:2, maximumFractionDigits:2}) + ' ' + T('perPersonaTxt');
                    ppEl.style.display = '';
                } else {
                    ppEl.textContent = '';
                }
            }
            // Traduce sia "fascia" sia il valore (bassa/media/alta) → fasciaBassa/Media/Alta già nelle traduzioni
            const _fasciaKey = 'fascia' + fascia.charAt(0).toUpperCase() + fascia.slice(1);
            document.getElementById('budget-sub').textContent =
                nazione + ' · ' + T('budgetFasciaWord') + ' ' + (T(_fasciaKey) || fascia).toLowerCase();

            document.getElementById('risultati').style.display = 'block';
            return true;
        }

        /* ════════════════════════════════════════════════════════════
           ESPORTAZIONE TESTO
           ════════════════════════════════════════════════════════════ */
        /* ════════════════════════════════════════════════════════════
           STAMPA / SALVA PDF (con safety check)
           ════════════════════════════════════════════════════════════
           Bug fix: prima il button chiamava window.print() direttamente.
           Se l'utente cliccava PRIMA di "Genera lista", il dialog si
           apriva su #risultati ancora display:none → pagina vuota. */
        function stampaLista() {
            const ris = document.getElementById('risultati');
            if (!ris || ris.style.display === 'none' || !ris.offsetHeight) {
                alert(T('alertNoListPrint') || 'Genera prima la lista della spesa, poi prova a stampare.');
                return;
            }
            // Intestazione documento (nome evento · data · n° ospiti) — appare solo nel PDF/stampa
            const pm = document.getElementById('print-meta');
            if (pm) {
                const nomeEv = (bpCfgNomeEvento && bpCfgNomeEvento.trim()) ? bpCfgNomeEvento.trim() : '';
                const nOspiti = parseInt((document.getElementById('ospiti') || {}).value) || 0;
                const dataStr = new Date().toLocaleDateString(linguaCorrente || 'it', { day: 'numeric', month: 'long', year: 'numeric' });
                const meta = [dataStr];
                if (nOspiti > 0) meta.push(nOspiti + ' ' + T('pdfGuests'));
                pm.innerHTML = (nomeEv ? '<span class="pm-ev">' + nomeEv.replace(/[<>&]/g, '') + '</span>' : '') + meta.join(' · ');
            }
            ris.scrollIntoView({ behavior: 'instant', block: 'start' });
            setTimeout(function() {
                try { window.print(); }
                catch (e) {
                    console.warn('[print] window.print() failed:', e);
                    alert('Impossibile aprire il dialogo di stampa. Prova da Menu del browser → Stampa.');
                }
            }, 50);
        }

        /* Costruisce il testo formattato della lista (usato da Copia e Condividi) */
        function costruisciTestoLista() {
            let testo = '';
            const _nomeEv = (bpCfgNomeEvento && bpCfgNomeEvento.trim()) ? bpCfgNomeEvento.trim() : '';
            testo += T('copyHeader') + (_nomeEv ? '\n' + _nomeEv : '') + "\n\n";
            testo += document.getElementById('drink-totali-text').innerText + "\n\n";

            testo += T('copyAlcolici') + "\n";
            document.querySelectorAll('#lista_alcolici li').forEach(li => {
                testo += "  • " + li.innerText + "\n";
            });

            testo += "\n" + T('copyAnalcolici') + "\n";
            document.querySelectorAll('#lista_analcolici li').forEach(li => {
                testo += "  • " + li.innerText + "\n";
            });

            const _blockFerm = document.getElementById('block_fermentati');
            if (_blockFerm && _blockFerm.style.display !== 'none') {
                testo += "\n" + T('copyFermentati') + "\n";
                document.querySelectorAll('#lista_fermentati li').forEach(li => {
                    testo += "  • " + li.innerText + "\n";
                });
            }

            testo += "\n" + T('copyAttrezzatura') + "\n";
            document.querySelectorAll('#lista_extra li').forEach(li => {
                testo += "  • " + li.innerText + "\n";
            });

            const _blockGarnish = document.getElementById('block_garnish');
            if (_blockGarnish && _blockGarnish.style.display !== 'none') {
                testo += "\n" + T('copyGarnish') + "\n";
                document.querySelectorAll('#lista_garnish li').forEach(li => {
                    testo += "  • " + li.innerText + "\n";
                });
            }

            const bbox = document.getElementById('budget-box');
            if (bbox && bbox.style.display !== 'none') {
                const amount = document.getElementById('budget-amount').textContent;
                const sub = document.getElementById('budget-sub').textContent;
                const pp = document.getElementById('budget-perperson');
                testo += "\n─────────────────────\n";
                testo += T('budgetLabel') + ": " + amount + "\n";
                if (pp && pp.textContent.trim()) testo += pp.textContent.trim() + "\n";
                testo += "(" + sub + ")\n";
            }
            testo += "\n" + T('shareFooter') + "\n";
            return testo;
        }

        function _listaPronta() {
            const ris = document.getElementById('risultati');
            return ris && ris.style.display !== 'none' && ris.offsetHeight;
        }

        function copiaListaTesto() {
            if (!_listaPronta()) { alert(T('alertNoListPrint') || 'Genera prima la lista della spesa.'); return; }
            const testo = costruisciTestoLista();
            navigator.clipboard.writeText(testo).then(() => {
                mostraToast(T('toastCopiaOk'));
            }).catch(err => {
                alert(T('errCopia') + err);
            });
        }

        /* Condivisione nativa (WhatsApp, email, Telegram, AirDrop…) con fallback a copia */
        function condividiLista() {
            if (!_listaPronta()) { alert(T('alertNoListPrint') || 'Genera prima la lista della spesa.'); return; }
            const testo = costruisciTestoLista();
            const titolo = (bpCfgNomeEvento && bpCfgNomeEvento.trim()) ? bpCfgNomeEvento.trim() : T('copyHeader');
            if (navigator.share) {
                navigator.share({ title: titolo, text: testo }).catch(err => {
                    if (err && err.name === 'AbortError') return;   // utente ha annullato
                    copiaListaTesto();
                });
            } else {
                copiaListaTesto();
            }
        }

        /* ════════════════════════════════════════════════════════════
           RICETTARIO PDF
           ════════════════════════════════════════════════════════════ */

        
/* ════════════════════════════════════════════════════════════
   AZIONI · un solo ascoltatore per tutti i click
   ════════════════════════════════════════════════════════════
   Il markup dichiara COSA fare (data-do), non COME farlo: niente codice
   negli attributi, quindi la CSP puo' vietare gli script inline.

   Gestisce anche Invio e Spazio: su un <span role="button"> il tasto Invio
   non genera un click da solo, e prima quei controlli erano raggiungibili
   con il Tab ma non azionabili con la tastiera.
   ════════════════════════════════════════════════════════════ */
(function () {
    function esegui(el, evento) {
        const daAlternare = el.getAttribute('data-toggle');
        if (daAlternare) { el.classList.toggle(daAlternare); return; }

        const nome = el.getAttribute('data-do');
        if (!nome) return;
        const fn = window[nome];
        if (typeof fn !== 'function') {
            console.warn('[bp] azione sconosciuta:', nome);
            return;
        }
        const arg = el.getAttribute('data-arg');
        if (evento && el.tagName === 'A') evento.preventDefault();
        if (arg === null) fn(); else fn(arg);
    }

    document.addEventListener('click', function (e) {
        const el = e.target.closest('[data-do],[data-toggle]');
        if (el) esegui(el, e);
    });


    /* Stessa idea per input e change. Due attributi distinti invece di uno
       solo: passare il valore del campo a tutte le funzioni sarebbe stato
       comodo ma sbagliato — programmaSalvataggio(delay) lo avrebbe letto
       come un ritardo di salvataggio. */
    function chiamaTutte(el, attr, conValore) {
        const lista = el.getAttribute(attr);
        if (!lista) return;
        for (const nome of lista.split(/s+/)) {
            const fn = window[nome];
            if (typeof fn !== 'function') { console.warn('[bp] azione sconosciuta:', nome); continue; }
            if (conValore) fn(el.value); else fn();
        }
    }

    for (const evento of ['input', 'change']) {
        document.addEventListener(evento, function (e) {
            const el = e.target;
            if (!el || !el.getAttribute) return;
            chiamaTutte(el, 'data-on-' + evento, false);
            chiamaTutte(el, 'data-on-' + evento + '-value', true);
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const el = e.target.closest('[data-do],[data-toggle]');
        // I <button> generano gia' un click da soli: non raddoppiare.
        if (!el || el.tagName === 'BUTTON' || el.tagName === 'A') return;
        e.preventDefault();
        esegui(el, e);
    });
})();

/* ════════════════════════════════════════════════════════════
           AVVIO
           ════════════════════════════════════════════════════════════ */
        // Rileva se l'app è in esecuzione come PWA installata (non come tab del browser)
        function isPwaInstallata() {
            return window.matchMedia('(display-mode: standalone)').matches
                || window.matchMedia('(display-mode: fullscreen)').matches
                || window.matchMedia('(display-mode: minimal-ui)').matches
                || window.navigator.standalone === true
                || document.referrer.startsWith('android-app://');
        }

        window.onload = async function() {
            caricaStato();
            bpLoadSettings();   // preferenze (lingua/tema/auto-save): override sui default di caricaStato
            bpSyncNomeField();
            bpRecipesLoad();
            bpRecipesApply();
            inizializzaApp();
            try {
                const _raw = localStorage.getItem(STORAGE_KEY);
                if (_raw) { const _s = JSON.parse(_raw); if (_s.config && _s.config.nazione) document.getElementById('sel-nazione').value = _s.config.nazione; }
            } catch(e) {}
            // Tema: se non c'è stato salvato, default = night (gold/dark)
            const _temaSalvato = document.body.getAttribute('data-theme');
            if (!_temaSalvato) { document.body.setAttribute('data-theme', 'night'); }
            aggiornaThemeButtons(document.body.getAttribute('data-theme'));
            aggiornaPctBevitori();
            renderizzaMenu();
            aggiungiRigaIngrediente();
            aggiungiRigaIngrediente();
            cambiaLingua(linguaCorrente);


            // All'avvio si entra nella HOME (hub). "Crea nuovo evento" mostrerà poi la scelta guidata/manuale.
            try { bpGoHome(); } catch(e){}

            // Registrazione PWA + bottone "Installa app"
            registraServiceWorker();
            if(/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.matchMedia('(display-mode: standalone)').matches) {
                mostraBottoneInstalla();
            }
        };

        /* ════════════════════════════════════════════════════════════
           PWA — Service Worker e bottone "Installa app"
           ════════════════════════════════════════════════════════════ */
        let installPromptEvent = null;

        function registraServiceWorker() {
            if(!('serviceWorker' in navigator)) return;
            if(location.protocol !== 'https:' && location.protocol !== 'http:') return;
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('[PWA] Service worker registrato:', reg.scope))
                .catch(err => console.warn('[PWA] Registrazione fallita:', err));
        }

        window.addEventListener('beforeinstallprompt', e => {
            e.preventDefault();
            installPromptEvent = e;
            mostraBottoneInstalla();
        });

        function mostraBottoneInstalla() {
            const btn = document.getElementById('btn-installa-app');
            if(btn) btn.style.display = 'inline-flex';
        }

        function nascondiBottoneInstalla() {
            const btn = document.getElementById('btn-installa-app');
            if(btn) btn.style.display = 'none';
        }

        async function installaApp() {
            if(!installPromptEvent) {
                const ua = navigator.userAgent;
                if(/iPhone|iPad|iPod/i.test(ua)) {
                    alert('Per installare Barman PRO sul tuo iPhone:\n\n1. Tocca il pulsante Condividi (in basso al centro)\n2. Scorri e tocca "Aggiungi alla schermata Home"\n3. Conferma con "Aggiungi"');
                } else {
                    alert('Per installare Barman PRO:\n\nApri il menu del browser (i tre puntini) e cerca "Installa app" o "Aggiungi alla schermata Home".');
                }
                return;
            }
            installPromptEvent.prompt();
            const result = await installPromptEvent.userChoice;
            if(result.outcome === 'accepted') {
                mostraToast('App installata');
                nascondiBottoneInstalla();
            }
            installPromptEvent = null;
        }

        window.addEventListener('appinstalled', () => {
            nascondiBottoneInstalla();
            installPromptEvent = null;
        });
