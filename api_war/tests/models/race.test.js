import { Race } from '../../src/models/race.js';
import { expect } from 'chai';

describe('Race Model', () => {
  it('should create a valid race', async () => {
    const raceData = {
      name: 'Test Race',
      description: 'A test race',
      strength: 10,
      defense: 8,
      speed: 12,
      intelligence: 9
    };

    const race = await Race.create(raceData);
    expect(race).to.be.an('object');
    expect(race.name).to.equal(raceData.name);
    expect(race.description).to.equal(raceData.description);
    expect(race.strength).to.equal(raceData.strength);
    expect(race.defense).to.equal(raceData.defense);
    expect(race.speed).to.equal(raceData.speed);
    expect(race.intelligence).to.equal(raceData.intelligence);
  });

  it('should not create a race without required fields', async () => {
    try {
      await Race.create({});
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should not create a race with duplicate name', async () => {
    const raceData = {
      name: 'Duplicate Race',
      description: 'A duplicate race',
      strength: 10,
      defense: 8,
      speed: 12,
      intelligence: 9
    };

    await Race.create(raceData);

    try {
      await Race.create(raceData);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should update race correctly', async () => {
    const race = await Race.create({
      name: 'Update Race',
      description: 'A race to update',
      strength: 10,
      defense: 8,
      speed: 12,
      intelligence: 9
    });

    const newDescription = 'Updated description';
    await race.update({ description: newDescription });
    await race.reload();

    expect(race.description).to.equal(newDescription);
  });

  it('should validate attribute ranges', async () => {
    try {
      await Race.create({
        name: 'Invalid Race',
        description: 'A race with invalid attributes',
        strength: 150,
        defense: 8,
        speed: 12,
        intelligence: 9
      });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should associate with warriors', async () => {
    const race = await Race.create({
      name: 'Associated Race',
      description: 'A race with warriors'
    });

    const raceWithWarriors = await Race.findByPk(race.race_id, {
      include: ['warriors']
    });

    expect(raceWithWarriors.warriors).to.be.an('array');
  });
}); 