import DonorRegistration from '../models/DonorRegistration.js';
import ContactSubmission from '../models/ContactSubmission.js';

export const getAllDonors = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const donors = await DonorRegistration.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await DonorRegistration.countDocuments();

    res.status(200).json({
      success: true,
      count: donors.length,
      total,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      },
      data: donors
    });

  } catch (error) {
    next(error);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const contacts = await ContactSubmission.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await ContactSubmission.countDocuments();

    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      },
      data: contacts
    });

  } catch (error) {
    next(error);
  }
};

export const markContactResolved = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = await ContactSubmission.findByIdAndUpdate(
      id,
      { isResolved: true },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact submission not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact marked as resolved',
      data: contact
    });

  } catch (error) {
    next(error);
  }
};
