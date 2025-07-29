// src/controllers/donationController.js
import Donation from '../models/Donation.js'; 
import createError from '../utils/createError.js';
import { sendDonationConfirmation } from "../utils/emailService.js";

export const createDonation = async (req, res, next) => {
  try {
    const { donorName, donorEmail, anonymous, category, amount, message } = req.body;

    let donation;
    try {
      donation = await Donation.create({
        donorName: anonymous ? null : donorName, 
        donorEmail: anonymous ? null : donorEmail, 
        anonymous: !!anonymous,
        category,
        amount,
        message
      });
      //console.log("Step 2: Donation saved to DB");
    } catch (err) {
     // console.error("❌ Donation DB Save Error:", err);
      return res.status(500).json({ message: "Failed to save donation." });
    }

    // Email logic
    if (donorEmail && !anonymous) {
        //console.log("Step 3: Sending confirmation email");
      sendDonationConfirmation({ to: donorEmail, donorName, amount })
        .then(info => console.log("✅ Email sent:", info.response))
        .catch(err => console.error("❌ Email error:", err));
    } 

    res.status(201).json(donation);
  } catch (err) {
    next(err);
  }
};

export const getDonationsByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const donations = await Donation.find({ donorEmail: email });
    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donations by email:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ anonymous: false }).sort('-createdAt');
    res.json(donations);
  } catch (err) {
    next(err);
  }
};

export const getPublicDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ isPublic: true }).sort('-createdAt');
    res.json(donations);
  } catch (err) {
    next(err);
  }
};
