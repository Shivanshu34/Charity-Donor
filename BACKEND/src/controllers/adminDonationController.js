// src/controllers/adminDonationController.js
import Donation from '../models/Donation.js';

export const listAllDonations = async (req, res) => {
  try {
    const { category } = req.query; 

    let filter = {};
    if (category) {
      filter.category = category; 
    }

    const donations = await Donation.find(filter).sort('-createdAt');

    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch donations', error: err.message });
  }
};

// export const togglePublic = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const donation = await Donation.findById(id);
//     if (!donation) return res.status(404).json({ message: 'Donation not found' });
//     donation.isPublic = !donation.isPublic;
//     await donation.save();
//     res.json(donation);
//   } catch (err) {
//     next(err);
//   }
// }; 
