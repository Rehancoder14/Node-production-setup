import { Schema, model, Document } from 'mongoose';

// Define an interface representing the document structure
interface ISkill extends Document {
  skill: string;
  proficiency: 'good' | 'expert' | 'professional'; // Enum for proficiency levels
}

// Create a Mongoose schema
const SkillSchema = new Schema<ISkill>({
  skill: { type: String, required: true },
  proficiency: { 
    type: String,   unique: true,
    required: true, 
    enum: ['good', 'expert', 'professional'], // Enum validation
    default: 'expert',
  },
}, { timestamps: true });

// Create the model from the schema
const SkillsModel = model<ISkill>('Skills', SkillSchema);

export default SkillsModel;
