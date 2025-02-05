import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    categories: { type: [String], required: true},
    __v: { type: Number, select: false } 
})

export default mongoose.model('Resource', ResourceSchema);