const router = require('express').Router();
const { User, Subscribed, Feeds } = require('../../models');

// Get route returns all subcribed for a user
router.get('/:user_id', async (req, res) => {
    try {
        const subscribed = await User.findByPk(req.params.user_id, {
            include: [{ model: Subscribed, include: { model: Feeds } },],
            attributes: [['user_name', 'id']],
        });

        res.status(200).json(subscribed);
    } catch (err) {
        res.status(501).json(err);
    }
});


// Post route to create a subscribed feed flag
router.post('/', async (req, res) => {
    try {
        if (!req.body.user_id) {
            const subscribed = await Subscribed.create({
                feed_id: req.body.feed_id,
                user_id: req.session.user_id
            });
            res.status(200).json(subscribed);
        } else {
            const subscribed = await Subscribed.create({
                feed_id: req.body.feed_id,
                user_id: req.body.user_id
            });
            res.status(200).json(subscribed);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});


// Delete route

router.delete('/', async (req, res) => {

    try {
        if (!req.body.user_id) {
            const subscribed = await Subscribed.destroy({
                where: {
                    feed_id: req.body.feed_id,
                    user_id: req.session.user_id,
                },
            });
            res.status(200).json(subscribed);
        } else {
            const subscribed = await Subscribed.destroy({
                where: {
                    feed_id: req.body.feed_id,
                    user_id: req.body.user_id,
                },
            });
            res.status(200).json(subscribed);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;