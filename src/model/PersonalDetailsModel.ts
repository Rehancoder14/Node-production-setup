import { Schema, model, Document } from 'mongoose';

// Define an interface representing the document structure
interface IPersonalDetails extends Document {
  name: string;
  profession: string;
  about: string;
  image: string;
  phoneNumber: string;
  email: string;
  linkedIn: string;
  github: string;
  city: string;
}

// Create a Mongoose schema
const PersonalDetailsSchema = new Schema<IPersonalDetails>({
  name: { type: String, required: true },
  image:{type:String},
  profession: {type:String, required :true},
  about: {type: String},
  phoneNumber: { 
    type: String, 
    required: true, 
    match: [/^\d{10,15}$/, 'Please enter a valid phone number'] // Simple regex for phone number validation (10-15 digits)
  },
  email: { 
    type: String, 
    required: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] // Basic email validation regex
  },
  linkedIn: { 
    type: String, 
    required: true,
    match: [/^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/, 'Please enter a valid LinkedIn URL'] // Basic LinkedIn URL validation
  },
  github: { 
    type: String, 
    required: true,
    match: [/^https:\/\/github\.com\/[A-Za-z0-9_-]+$/, 'Please enter a valid GitHub URL'] // Basic GitHub URL validation
  },
  city: { type: String, required: true },
}, { timestamps: true });

// Create the model from the schema
const PersonalDetailsModel = model<IPersonalDetails>('PersonalDetails', PersonalDetailsSchema);

export default PersonalDetailsModel;
