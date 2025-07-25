import mongoose from 'mongoose';

const CategoryRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  requestedAt: { type: Date, default: Date.now }
});

const CategoryRequest = mongoose.model('CategoryRequest', CategoryRequestSchema);

export default CategoryRequest;


