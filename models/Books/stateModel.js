import mongoose from 'mongoose';

let StateSchema = mongoose.Schema({
    name: {type: String, required: true, max: 100}
});

export default mongoose.model('State', StateSchema, 'states');