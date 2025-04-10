import { Game } from '../../src/models/game.js';
import { User } from '../../src/models/user.js';
import { Warrior } from '../../src/models/warrior.js';
import { expect } from 'chai';

describe('Game Model', () => {
  it('should create a valid game', async () => {
    const gameData = {
      name: 'Test Game',
      status: 'pending',
      max_players: 2,
      created_by: 1
    };

    const game = await Game.create(gameData);
    expect(game).to.be.an('object');
    expect(game.name).to.equal(gameData.name);
    expect(game.status).to.equal(gameData.status);
    expect(game.max_players).to.equal(gameData.max_players);
    expect(game.created_by).to.equal(gameData.created_by);
  });

  it('should not create a game without required fields', async () => {
    try {
      await Game.create({});
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should not create a game with invalid status', async () => {
    const gameData = {
      name: 'Invalid Game',
      status: 'invalid_status',
      max_players: 2,
      created_by: 1
    };

    try {
      await Game.create(gameData);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should update game correctly', async () => {
    const game = await Game.create({
      name: 'Update Game',
      status: 'pending',
      max_players: 2,
      created_by: 1
    });

    const newStatus = 'in_progress';
    await game.update({ status: newStatus });
    await game.reload();

    expect(game.status).to.equal(newStatus);
  });

  it('should associate with creator user', async () => {
    const game = await Game.create({
      name: 'Creator Game',
      status: 'pending',
      max_players: 2,
      created_by: 1
    });

    const gameWithCreator = await Game.findByPk(game.game_id, {
      include: ['creator']
    });

    expect(gameWithCreator.creator).to.be.an('object');
    expect(gameWithCreator.creator.user_id).to.equal(game.created_by);
  });

  it('should associate with warriors', async () => {
    const game = await Game.create({
      name: 'Warrior Game',
      status: 'pending',
      max_players: 2,
      created_by: 1
    });

    const warriorIds = [1, 2];
    await game.addWarriors(warriorIds);

    const gameWithWarriors = await Game.findByPk(game.game_id, {
      include: ['warriors']
    });

    expect(gameWithWarriors.warriors).to.be.an('array');
    expect(gameWithWarriors.warriors.length).to.equal(warriorIds.length);
  });

  it('should associate with players', async () => {
    const game = await Game.create({
      name: 'Player Game',
      status: 'pending',
      max_players: 2,
      created_by: 1
    });

    const playerIds = [1, 2];
    await game.addPlayers(playerIds);

    const gameWithPlayers = await Game.findByPk(game.game_id, {
      include: ['players']
    });

    expect(gameWithPlayers.players).to.be.an('array');
    expect(gameWithPlayers.players.length).to.equal(playerIds.length);
  });
}); 