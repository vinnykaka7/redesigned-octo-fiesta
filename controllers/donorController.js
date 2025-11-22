import DonorRegistration from '../models/DonorRegistration.js';

export const registerDonor = async (req, res, next) => {
  try {
    const { fullName, email, phone, birthDate, organChoice, specificOrgans } = req.body;

    // Additional validation
    if (!fullName || !email || !birthDate || !organChoice) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: fullName, email, birthDate, organChoice'
      });
    }

    // Check if email already exists
    const existingDonor = await DonorRegistration.findOne({ email: email.toLowerCase() });
    if (existingDonor) {
      return res.status(400).json({
        success: false,
        error: 'A donor with this email address is already registered'
      });
    }

    // Create new donor registration
    const donorData = {
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      birthDate: new Date(birthDate),
      organChoice
    };

    if (phone) {
      donorData.phone = phone.trim();
    }

    if (organChoice === 'Specific' && specificOrgans && specificOrgans.length > 0) {
      donorData.specificOrgans = specificOrgans;
    }

    const donor = await DonorRegistration.create(donorData);

    res.status(201).json({
      success: true,
      message: 'Donor registration successful',
      data: {
        id: donor._id,
        fullName: donor.fullName,
        email: donor.email,
        organChoice: donor.organChoice,
        specificOrgans: donor.specificOrgans,
        createdAt: donor.createdAt
      }
    });

  } catch (error) {
    next(error);
  }
};
