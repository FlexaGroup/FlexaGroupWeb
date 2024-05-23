const mongoose = require('mongoose');

// Define the Cluster schema
const clusterSchema = new mongoose.Schema({
    clusterId: { type: Number, required: true },
    shards: { type: String, required: true },
    problems: { type: String, required: true },
    color: { type: String, required: true },
    uptime: { type: String, required: true },
});

// Export the Cluster model
module.exports = mongoose.model('Cluster', clusterSchema);
