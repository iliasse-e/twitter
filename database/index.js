const mongoose = require('mongoose');

exports.clientPromise = mongoose.connect(
        'mongodb+srv://iliasse:JBm3nvc77jPOEh00@cluster0.fpjzuri.mongodb.net/twitter?retryWrites=true&w=majority&appName=Cluster0'
        )
        .then(() => console.log('connexion db ok !'))
        .catch(err => console.log(err));