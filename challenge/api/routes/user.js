import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

// Instances
const routes = express.Router();

// Constants
const users = [];
const salt = process.env.PASSWORD_ENCRYPT_SALT | 10;
const secret = process.env.PASSWORD_ENCRYPT_SECRET | 'ventipay';

routes.post('/user', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = users
      .find(user => user.name === name || user.email === email);
    if (exist) res.status(409).redirect('/register?error=1');
    else {
      const hash = await bcrypt.hash(password, salt);
      users.push({ ...req.body, id: nanoid(), password: hash });
      res.status(200).redirect('/users?register=true');
    }
  } catch (error) {
    console.log('Error create user', { error });
    res.status(500).redirect('/register?error=2');
  }
});

routes.post('/login', async (req, res) => {
  const errorLoginUrl = 1;
  const errorSystemUrl = 2;
  try {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);
    if (user) {
      const decrypted = await bcrypt.compare(password, user.password);
      if (decrypted) {
        const { id, name, email } = user;
        const token = jwt.sign({ id, email }, 'ventipay');
        res.status(200).json({ error: false, info: { name, email, token } });
      } else res.status(404).json({ error: errorLoginUrl });
    } else res.status(404).json({ error: errorLoginUrl });
  } catch (error) {
    console.log('Error on login', { error });
    res.status(500).json({ error: errorSystemUrl });
  }
});

routes.get('/user/list', (req, res) => {
  try {
    const cleaned = users.map(user => ({ name: user.name, email: user.email }));
    res.status(200).json(cleaned);
  } catch (error) {
    console.log('Error on list users', { error });
    res.status(500).json({ error: true });
  }
});

routes.post('/user/:email', async (req, res) => {
  const systemError = 'System error';
  const dataError = 'Invalid data';
  const moreDataError = 'Need more data';
  const tokenError = 'Token invalid or not found';
  try {
    const { email } = req.params;
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (email && token) {
      const valid = jwt.verify(token, 'ventipay');
      if (valid) {
        const user = users.find(user => user.email === email);
        if (user) {
          const { name, email } = user;
          res.status(200).json({ error: false, info: { name, email } });
        } else res.status(404).json({ error: true, message: dataError });
      } else res.status(404).json({ error: true, message: tokenError });
    } else res.status(404).json({ error: true, message: moreDataError });
  } catch (error) {
    console.log('Error on get user', { error });
    res.status(500).json({ error: true, message: systemError });
  }
});

export default routes;