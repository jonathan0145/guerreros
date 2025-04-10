import { Warrior } from '../../src/models/warrior.js';
import { Race } from '../../src/models/race.js';
import { WarriorType } from '../../src/models/warrior-type.js';
import { expect } from 'chai';

describe('Warrior Model', () => {
  let race;
  let warriorType;

  before(async () => {
    // Crear una raza y un tipo de guerrero para las pruebas
    race = await Race.create({
      name: 'Test Race',
      description: 'A test race',
      strength: 10,
      defense: 8,
      speed: 12,
      intelligence: 9
    });

    warriorType = await WarriorType.create({
      name: 'Test Type',
      description: 'A test warrior type',
      base_strength: 10,
      base_defense: 8,
      base_speed: 12,
      base_intelligence: 9
    });
  });

  it('should create a valid warrior', async () => {
    const warriorData = {
      name: 'Test Warrior',
      race_id: race.race_id,
      warrior_type_id: warriorType.warrior_type_id,
      strength: 15,
      defense: 12,
      speed: 18,
      intelligence: 14,
      status: 'active'
    };

    const warrior = await Warrior.create(warriorData);
    expect(warrior).to.be.an('object');
    expect(warrior.name).to.equal(warriorData.name);
    expect(warrior.race_id).to.equal(warriorData.race_id);
    expect(warrior.warrior_type_id).to.equal(warriorData.warrior_type_id);
    expect(warrior.strength).to.equal(warriorData.strength);
    expect(warrior.defense).to.equal(warriorData.defense);
    expect(warrior.speed).to.equal(warriorData.speed);
    expect(warrior.intelligence).to.equal(warriorData.intelligence);
    expect(warrior.status).to.equal(warriorData.status);
  });

  it('should not create a warrior without required fields', async () => {
    try {
      await Warrior.create({});
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should not create a warrior with duplicate name', async () => {
    const warriorData = {
      name: 'Duplicate Warrior',
      race_id: race.race_id,
      warrior_type_id: warriorType.warrior_type_id,
      strength: 15,
      defense: 12,
      speed: 18,
      intelligence: 14,
      status: 'active'
    };

    await Warrior.create(warriorData);

    try {
      await Warrior.create(warriorData);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should update warrior correctly', async () => {
    const warrior = await Warrior.create({
      name: 'Update Warrior',
      race_id: race.race_id,
      warrior_type_id: warriorType.warrior_type_id,
      strength: 15,
      defense: 12,
      speed: 18,
      intelligence: 14,
      status: 'active'
    });

    const newStrength = 20;
    await warrior.update({ strength: newStrength });
    await warrior.reload();

    expect(warrior.strength).to.equal(newStrength);
  });

  it('should validate attribute ranges', async () => {
    try {
      await Warrior.create({
        name: 'Invalid Warrior',
        race_id: race.race_id,
        warrior_type_id: warriorType.warrior_type_id,
        strength: 150,
        defense: 12,
        speed: 18,
        intelligence: 14,
        status: 'active'
      });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should validate foreign key constraints', async () => {
    try {
      await Warrior.create({
        name: 'Invalid Warrior',
        race_id: 999,
        warrior_type_id: 999,
        strength: 15,
        defense: 12,
        speed: 18,
        intelligence: 14,
        status: 'active'
      });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should associate with race and warrior type', async () => {
    const warrior = await Warrior.create({
      name: 'Associated Warrior',
      race_id: 1,
      warrior_type_id: 1,
      strength: 80,
      defense: 70,
      speed: 75,
      intelligence: 65,
      status: 'active'
    });

    const warriorWithAssociations = await Warrior.findByPk(warrior.warrior_id, {
      include: ['race', 'warriorType']
    });

    expect(warriorWithAssociations.race).to.be.an('object');
    expect(warriorWithAssociations.warriorType).to.be.an('object');
  });

  it('should associate with powers and spells', async () => {
    const warrior = await Warrior.create({
      name: 'Powerful Warrior',
      race_id: 1,
      warrior_type_id: 1,
      strength: 80,
      defense: 70,
      speed: 75,
      intelligence: 65,
      status: 'active'
    });

    const powerIds = [1, 2];
    const spellIds = [1, 2];

    await warrior.addPowers(powerIds);
    await warrior.addSpells(spellIds);

    const warriorWithAbilities = await Warrior.findByPk(warrior.warrior_id, {
      include: ['powers', 'spells']
    });

    expect(warriorWithAbilities.powers).to.be.an('array');
    expect(warriorWithAbilities.powers.length).to.equal(powerIds.length);
    expect(warriorWithAbilities.spells).to.be.an('array');
    expect(warriorWithAbilities.spells.length).to.equal(spellIds.length);
  });
}); 