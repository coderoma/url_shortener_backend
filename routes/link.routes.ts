import { Router } from 'express';
import config from 'config';
import shortid from 'shortid';
import { Link } from '../models/Link';
import auth from '../middleware/auth.middleware';
const router = Router();

// @ts-ignore
router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl');
    const { from } = req.body;
    const code = shortid.generate();

    const existing = await Link.findOne({ from });
    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + '/t/' + code;
    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    });

    await link.save();

    res.status(201).json({ link });
  } catch (e) {
    res.status(500).json({ message: 'something went wrong' });
  }
});

// @ts-ignore
router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: 'something went wrong' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const links = await Link.findById(req.params.id);
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: 'something went wrong' });
  }
});
export default router;
