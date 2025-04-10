import { Spell } from '../../src/models/spell.js';
import { expect } from 'chai';

describe('Spell Model', () => {
  it('should create a valid spell', async () => {
    const spellData = {
      name: 'Test Spell',
      description: 'A test spell',
      percentage: 50
    };

    const spell = await Spell.create(spellData);
    expect(spell).to.be.an('object');
    expect(spell.name).to.equal(spellData.name);
    expect(spell.description).to.equal(spellData.description);
    expect(spell.percentage).to.equal(spellData.percentage);
  });

  it('should not create a spell without required fields', async () => {
    try {
      await Spell.create({});
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should not create a spell with duplicate name', async () => {
    const spellData = {
      name: 'Duplicate Spell',
      description: 'A duplicate spell',
      percentage: 50
    };

    await Spell.create(spellData);

    try {
      await Spell.create(spellData);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should update spell correctly', async () => {
    const spell = await Spell.create({
      name: 'Update Spell',
      description: 'A spell to update',
      percentage: 50
    });

    const newDescription = 'Updated description';
    await spell.update({ description: newDescription });
    await spell.reload();

    expect(spell.description).to.equal(newDescription);
  });

  it('should validate percentage range', async () => {
    try {
      await Spell.create({
        name: 'Invalid Spell',
        description: 'A spell with invalid percentage',
        percentage: 150
      });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });
}); 