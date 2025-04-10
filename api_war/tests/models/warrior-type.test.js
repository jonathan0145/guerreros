import { WarriorType } from '../../src/models/warrior-type.js';
import { expect } from 'chai';

describe('WarriorType Model', () => {
  it('should create a valid warrior type', async () => {
    const typeData = {
      name: 'Test Type',
      description: 'A test warrior type',
      base_strength: 10,
      base_defense: 8,
      base_speed: 12,
      base_intelligence: 9
    };

    const type = await WarriorType.create(typeData);
    expect(type).to.be.an('object');
    expect(type.name).to.equal(typeData.name);
    expect(type.description).to.equal(typeData.description);
    expect(type.base_strength).to.equal(typeData.base_strength);
    expect(type.base_defense).to.equal(typeData.base_defense);
    expect(type.base_speed).to.equal(typeData.base_speed);
    expect(type.base_intelligence).to.equal(typeData.base_intelligence);
  });

  it('should not create a warrior type without required fields', async () => {
    try {
      await WarriorType.create({});
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should not create a warrior type with duplicate name', async () => {
    const typeData = {
      name: 'Duplicate Type',
      description: 'A duplicate warrior type',
      base_strength: 10,
      base_defense: 8,
      base_speed: 12,
      base_intelligence: 9
    };

    await WarriorType.create(typeData);

    try {
      await WarriorType.create(typeData);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should update warrior type correctly', async () => {
    const type = await WarriorType.create({
      name: 'Update Type',
      description: 'A type to update',
      base_strength: 10,
      base_defense: 8,
      base_speed: 12,
      base_intelligence: 9
    });

    const newDescription = 'Updated description';
    await type.update({ description: newDescription });
    await type.reload();

    expect(type.description).to.equal(newDescription);
  });

  it('should validate base attribute ranges', async () => {
    try {
      await WarriorType.create({
        name: 'Invalid Type',
        description: 'A type with invalid base attributes',
        base_strength: 150,
        base_defense: 8,
        base_speed: 12,
        base_intelligence: 9
      });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should associate with warriors', async () => {
    const warriorType = await WarriorType.create({
      name: 'Associated Type',
      description: 'A warrior type with warriors'
    });

    const typeWithWarriors = await WarriorType.findByPk(warriorType.warrior_type_id, {
      include: ['warriors']
    });

    expect(typeWithWarriors.warriors).to.be.an('array');
  });
}); 