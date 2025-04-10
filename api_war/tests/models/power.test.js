import { Power } from '../../src/models/power.js';
import { expect } from 'chai';

describe('Power Model', () => {
  it('should create a valid power', async () => {
    const powerData = {
      name: 'Test Power',
      description: 'A test power',
      percentage: 50
    };

    const power = await Power.create(powerData);
    expect(power).to.be.an('object');
    expect(power.name).to.equal(powerData.name);
    expect(power.description).to.equal(powerData.description);
    expect(power.percentage).to.equal(powerData.percentage);
  });

  it('should not create a power without required fields', async () => {
    try {
      await Power.create({});
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should not create a power with duplicate name', async () => {
    const powerData = {
      name: 'Duplicate Power',
      description: 'A duplicate power',
      percentage: 50
    };

    await Power.create(powerData);

    try {
      await Power.create(powerData);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should update power correctly', async () => {
    const power = await Power.create({
      name: 'Update Power',
      description: 'A power to update',
      percentage: 50
    });

    const newDescription = 'Updated description';
    await power.update({ description: newDescription });
    await power.reload();

    expect(power.description).to.equal(newDescription);
  });

  it('should validate percentage range', async () => {
    try {
      await Power.create({
        name: 'Invalid Power',
        description: 'A power with invalid percentage',
        percentage: 150
      });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });
}); 