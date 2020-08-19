const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   POST api/posts
// @desc    create a post
// @access  private

router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            user: req.user.id,
            text: req.body.text,
            aim: req.body.aim,
            avatar: user.avatar
        });

        const post = await newPost.save();
        res.json(post);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/posts
// @desc    get all posts
// @access  public

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        posts.comments
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   GET api/posts/:post_id
// @desc    get a single post
// @access  public

router.get('/:post_id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if (!post) {
            return status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server error');
    }
})

// @route   DELETE api/posts/:post_id
// @desc    delete a post
// @access  private

router.delete('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return status(404).json({ msg: 'Post not found' });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await post.remove();

        res.json({ msg: 'Post removed' });

    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server error');
    }
})

// @route   PUT api/posts/like/:id
// @desc    like a post
// @access  private

router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //check if already liked by this user
        if (post.updoots.filter(x => x.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' });
        }

        post.updoots.unshift({ user: req.user.id });
        await post.save();

        res.json(post.updoots);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   PUT api/posts/unlike/:id
// @desc    unlike a post
// @access  private

router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //check if already liked by this user
        if (post.updoots.filter(x => x.user.toString() === req.user.id).length == 0) {
            return res.status(400).json({ msg: 'Post not liked' });
        }

        const removeIndex = post.updoots.map(x => x.user.toString()).indexOf(req.user.id);
        post.updoots.splice(removeIndex, 1);
        await post.save();

        res.json(post.updoots);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   POST api/posts/comment/:id
// @desc    comment on a post
// @access  private

router.post('/comment/:id', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            user: req.user.id,
            text: req.body.text,
            avatar: user.avatar
        };

        post.comments.push(newComment);

        await post.save();
        res.json(post.comments);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    delete a comment
// @access  private

router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comment = post.comments.find(x => x.id === req.params.comment_id);

        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const removeIndex = post.comments
            .map(x => x.user.toString())
            .indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);
        await post.save();

        res.json(post.comments);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})
module.exports = router;