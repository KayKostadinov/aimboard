const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Aim = require('../../models/Aim');

// @route   POST api/aim
// @desc    create an aim
// @access  private

router.post('/', [auth, [check('title', 'Title is required').not().isEmpty()]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const newAim = new Aim({
            user: req.user.id,
            title: req.body.title,
            deadline: req.body.deadline,
            complete: req.body.complete,
        })

        const aim = await newAim.save();
        res.json(aim);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/aim
// @desc    get all aims
// @access  private

router.get('/', auth, async (req, res) => {
    try {
        const aim = await Aim.find({ user: req.user.id }).sort({ deadline: -1 });
        res.json(aim);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/aim/:id
// @desc    get a specific aim
// @access  private

router.get('/:id', auth, async (req, res) => {
    try {
        const aim = await Aim.findById(req.params.id);
        if (!aim) {
            return status(404).json({ msg: 'Aim not found' });
        }
        if (aim.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        res.json(aim);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/aim/:id
// @desc    delete an aim
// @access  private

router.delete('/:id', auth, async (req, res) => {
    try {
        const aim = await Aim.findById(req.params.id);

        if (!aim) {
            return status(404).json({ msg: 'Aim not found' });
        }

        if (aim.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await aim.remove();

        res.json({ msg: 'Aim removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return status(404).json({ msg: 'Aim not found' });
        }
        res.status(500).send('Server error');
    }
})

// @route   POST api/aim/:id
// @desc    update an aim
// @access  private

router.post('/:id', auth, async (req, res) => {
    try {
        let aim = await Aim.findById(req.params.id);

        if (!aim) {
            return status(404).json({ msg: 'Aim not found' });
        }


        if (aim.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const {
            title,
            level,
            deadline,
            complete,
        } = req.body;

        let aimFields = {
            title,
            level,
            deadline,
            complete,
        };

        // save to DB
        if (aim) {
            aim = await Aim.findOneAndUpdate(
                { _id: req.params.id },
                { $set: aimFields },
                { new: true }
            )
        }
        console.log(aim)
        res.json(aim);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})



module.exports = router;