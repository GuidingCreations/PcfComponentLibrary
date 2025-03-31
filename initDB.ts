export const initDB = (): Promise<boolean> => {

    let request: IDBOpenDBRequest;
    let db: IDBDatabase;
    let version = 1;
    
    const enum Stores {
       Books = "Books",
       Highlights = "Highlights",
       HighlightsArea = "HighlightsArea",
    }
    
       return new Promise((resolve) => {
           // open the connection
           request = indexedDB.open("UsersDB");
           request.onupgradeneeded = () => {
               db = request.result;
    
               // if the data object store doesn't exist, create it
               if (
                   !db.objectStoreNames.contains(Stores.Books) ||
                   !db.objectStoreNames.contains(Stores.Highlights)
               ) {
                   console.log("Creating Books store");
                   db.createObjectStore(Stores.Books, { keyPath: "key" });
                   const highlightsStore = db.createObjectStore(
                       Stores.Highlights,
                       { keyPath: "id" },
                   );
                   // Define the structure of the highlights object store based on the IHighlight interface
                   highlightsStore.createIndex("content", "content", {
                       unique: false,
                   });
                   highlightsStore.createIndex("quote", "quote", {
                       unique: false,
                   });
                   highlightsStore.createIndex("cfiRange", "cfiRange", {
                       unique: false,
                   });
                   highlightsStore.createIndex("book_id", "book_id", {
                       unique: false,
                   });
    
                   // Create the highlightAreas object store
                   const highlightAreasStore = db.createObjectStore(
                       Stores.HighlightsArea,
                       { keyPath: "id", autoIncrement: true },
                   );
    
                   // Define the structure of the highlightAreas object store based on the HighlightArea interface
                   highlightAreasStore.createIndex(
                       "highlight_Id",
                       "highlight_Id",
                       { unique: false },
                   ); // Foreign key to highlights table
                   highlightAreasStore.createIndex("height", "height", {
                       unique: false,
                   });
                   highlightAreasStore.createIndex("left", "left", {
                       unique: false,
                   });
                   highlightAreasStore.createIndex("pageIndex", "pageIndex", {
                       unique: false,
                   });
                   highlightAreasStore.createIndex("top", "top", {
                       unique: false,
                   });
                   highlightAreasStore.createIndex("width", "width", {
                       unique: false,
                   });
               }
           };
    
           request.onsuccess = () => {
               db = request.result;
               version = db.version;
               console.log("request.onsuccess - initDB", version);
               resolve(true);
           };
    
           request.onerror = () => {
               resolve(false);
           };
       });
    };