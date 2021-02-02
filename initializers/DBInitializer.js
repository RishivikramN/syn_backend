const mongoose = require('mongoose');

module.exports = function(){
    mongoose.set('useCreateIndex', true);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useFindAndModify', false);

    mongoose.connect(`mongodb+srv://admin:admin@greenday.bdgri.mongodb.net/synapsicadb?retryWrites=true&w=majority`)
            .then(()=>console.log(`## successful connection => ${mongoose.connection.host}`))
}