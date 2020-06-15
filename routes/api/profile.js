const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route   GET api/profile/me
// @desc    get current profile
// @access  private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', [name, avatar]);

        if (!profile) {
            return res.status(400).json({ msg: 'Profile does not exist' });
        }
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   POST api/profile
// @desc    create/ update a user profile
// @access  private
router.post('/', auth, async (req, res) => {
    const {
        about,
        goals,
        interests,
    } = req.body;

    const {
        youtube,
        twitter,
        facebook,
        instagram,
        linkedin
    } = req.body.social;

    const profileFields = {};
    profileFields.social = {};
    profileFields.user = req.user.id;
    if (about) profileFields.about = about;
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (goals) {
        profileFields.goals = goals.split(',').map(x => x.trim());
    }
    if (interests) {
        profileFields.interests = interests.split(',').map(x => x.trim());
    }

    // save to DB
    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) { // Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );

            return res.json(profile);
        }
        // Create
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;