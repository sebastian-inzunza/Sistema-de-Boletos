// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('test');

// Create a new document in the collection.

for (let index = 1; index <501; index++) {
        
    db.getCollection('boletos').insertOne({
       numero: index,
        activo:false
    });
    
}

