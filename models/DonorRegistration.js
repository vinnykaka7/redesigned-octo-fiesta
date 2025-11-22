import mongoose from 'mongoose';

const donorRegistrationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ],
    index: true
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please provide a valid phone number']
  },
  birthDate: {
    type: Date,
    required: [true, 'Birth date is required'],
    validate: {
      validator: function(value) {
        const today = new Date();
        const age = today.getFullYear() - value.getFullYear();
        return age >= 18 && age <= 100;
      },
      message: 'Donor must be between 18 and 100 years old'
    }
  },
  organChoice: {
    type: String,
    required: [true, 'Organ choice is required'],
    enum: {
      values: ['All', 'Specific'],
      message: 'Organ choice must be either "All" or "Specific"'
    }
  },
  specificOrgans: {
    type: [String],
    validate: {
      validator: function(value) {
        if (this.organChoice === 'Specific') {
          return value && value.length > 0;
        }
        return true;
      },
      message: 'Specific organs must be selected when organ choice is "Specific"'
    },
    enum: {
      values: ['Heart', 'Liver', 'Kidneys', 'Lungs', 'Pancreas', 'Intestines', 'Corneas', 'Skin', 'Bone', 'Heart Valves'],
      message: 'Invalid organ selection'
    }
  },
  isConfirmed: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to handle specificOrgans based on organChoice
donorRegistrationSchema.pre('save', function(next) {
  if (this.organChoice === 'All') {
    this.specificOrgans = undefined;
  }
  next();
});

const DonorRegistration = mongoose.model('DonorRegistration', donorRegistrationSchema);

export default DonorRegistration;
