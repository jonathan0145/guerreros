import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, Profile, PlayerStats } from '../models/index.js';

class AuthController {
  async register(req, res) {
    try {
      const { username, email, password, name, lastName } = req.body;

      // Check if user exists
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await User.create({
        user_user: username,
        user_email: email,
        user_password: hashedPassword,
        user_role: 'user',
        user_status_fk: 1 // active status
      });

      // Create profile
      await Profile.create({
        profile_name: name,
        profile_last_name: lastName,
        profile_email: email,
        user_id: user.user_id
      });

      // Create initial stats
      await PlayerStats.create({
        user_id: user.user_id,
        total_games: 0,
        victories: 0,
        defeats: 0,
        ranking_points: 1000
      });

      // Generate token
      const token = jwt.sign(
        { id: user.user_id, role: user.user_role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.status(201).json({
        message: 'User registered successfully',
        token
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ 
        where: { user_email: email },
        include: [
          { model: Profile, as: 'profile' },
          { model: PlayerStats, as: 'stats' }
        ]
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.user_password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate token
      const token = jwt.sign(
        { id: user.user_id, role: user.user_role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.user_id,
          username: user.user_user,
          email: user.user_email,
          role: user.user_role,
          profile: user.profile,
          stats: user.stats
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error during login' });
    }
  }

  async logout(req, res) {
    // En una implementación básica con JWT, solo eliminamos el token del cliente
    res.json({ message: 'Logged out successfully' });
  }

  async verifyToken(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.json({ valid: true, user: decoded });
    } catch (error) {
      res.status(401).json({ valid: false, message: 'Invalid token' });
    }
  }
}

export default new AuthController();