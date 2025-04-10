import { User } from '../../src/models/user.js';
import { UserStatus } from '../../src/models/user-status.js';
import { expect } from 'chai';
import bcrypt from 'bcrypt';

describe('User Model', () => {
  let pendingStatus;

  before(async () => {
    pendingStatus = await UserStatus.create({
      name: 'Pending',
      description: 'User is pending activation'
    });
  });

  it('should create a valid user', async () => {
    const userData = {
      username: 'testuser',
      password: 'password123',
      user_status_id: pendingStatus.user_status_id
    };

    const user = await User.create(userData);
    expect(user).to.be.an('object');
    expect(user.username).to.equal(userData.username);
    expect(user.user_status_id).to.equal(userData.user_status_id);
    
    // Verify password is hashed
    const isPasswordValid = await bcrypt.compare(userData.password, user.password);
    expect(isPasswordValid).to.be.true;
  });

  it('should not create a user without required fields', async () => {
    try {
      await User.create({});
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should not create a user with duplicate username', async () => {
    const userData = {
      username: 'duplicateuser',
      password: 'password123',
      user_status_id: pendingStatus.user_status_id
    };

    await User.create(userData);

    try {
      await User.create(userData);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should update user correctly', async () => {
    const user = await User.create({
      username: 'updateuser',
      password: 'password123',
      user_status_id: pendingStatus.user_status_id
    });

    const newPassword = 'newpassword123';
    await user.update({ password: newPassword });
    await user.reload();

    const isPasswordValid = await bcrypt.compare(newPassword, user.password);
    expect(isPasswordValid).to.be.true;
  });

  it('should associate with user status', async () => {
    const user = await User.create({
      username: 'statususer',
      password: 'password123',
      user_status_id: pendingStatus.user_status_id
    });

    const userWithStatus = await User.findByPk(user.user_id, {
      include: ['userStatus']
    });

    expect(userWithStatus.userStatus).to.be.an('object');
    expect(userWithStatus.userStatus.user_status_id).to.equal(user.user_status_id);
  });

  it('should associate with warriors', async () => {
    const user = await User.create({
      username: 'warrioruser',
      password: 'password123',
      user_status_id: 1
    });

    const warriorIds = [1, 2];
    await user.addWarriors(warriorIds);

    const userWithWarriors = await User.findByPk(user.user_id, {
      include: ['warriors']
    });

    expect(userWithWarriors.warriors).to.be.an('array');
    expect(userWithWarriors.warriors.length).to.equal(warriorIds.length);
  });
}); 