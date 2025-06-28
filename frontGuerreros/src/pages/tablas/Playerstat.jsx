import React, { useEffect, useState } from 'react';
import RecentPropertiesList from '../../components/admin/RecentPropertiesList';
import { Button, Modal, Form } from 'react-bootstrap';
import * as playerstatService from '../../services/playerstatService';

const Playerstat = () => {
    const [propertiesData, setPropertiesData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newStat, setNewStat] = useState({ player_id: '', games_played: '', victories: '', defeats: '' });

    useEffect(() => {
        fetchPlayerStats();
    }, []);

    const fetchPlayerStats = () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        playerstatService.getAllPlayerStats(config)
            .then(res => setPropertiesData(res.data))
            .catch(err => console.error('Error al obtener estadísticas:', err));
    };

    const handlePlayerAction = (actionType, data) => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        if (actionType === 'create') {
            setShowModal(true);
        }
        if (actionType === 'update') {
            playerstatService.updatePlayerStat(data.player_id, data, config)
                .then(fetchPlayerStats)
                .catch(() => alert('Error al actualizar estadística'));
        }
        if (actionType === 'delete') {
            playerstatService.deletePlayerStat(data.player_id, config)
                .then(fetchPlayerStats)
                .catch(() => alert('Error al eliminar estadística'));
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setNewStat({ player_id: '', games_played: '', victories: '', defeats: '' });
    };

    const handleModalSave = () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        playerstatService.createPlayerStat(newStat, config)
            .then(() => {
                fetchPlayerStats();
                handleModalClose();
            })
            .catch((err) => {
                console.error('Error al crear estadística:', err.response ? err.response.data : err.message);
                alert('Error al crear estadística');
            });
    };

    const playerHeaders = [
        { key: 'player_id', label: 'ID PLAYER' },
        { key: 'games_played', label: 'PARTIDAS JUGADAS' },
        { key: 'victories', label: 'VICTORIAS' },
        { key: 'defeats', label: 'PERDIDAS' },
        {
            key: 'acciones',
            label: 'ACCIONES',
            render: (rowItem, handleShowUpdateModal, handleDelete, handleShowCreateModal, handleShowViewModal) => (
                <div>
                    <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowViewModal(rowItem)}
                    >
                        Ver
                    </Button>
                    <Button
                        variant="info"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowUpdateModal(rowItem)}
                    >
                        Actualizar
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(rowItem)}
                    >
                        Eliminar
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div>
            <h2 className="mb-4">Player Stat</h2>
            <Button variant="success" className="mb-3" onClick={() => handlePlayerAction('create', null)}>
                Añadir Nuevas Estadísticas
            </Button>
            <RecentPropertiesList
                headers={playerHeaders}
                data={propertiesData}
                onAction={handlePlayerAction}
            />

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nueva Estadística</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>ID Player</Form.Label>
                            <Form.Control
                                type="number"
                                value={newStat.player_id}
                                onChange={e => setNewStat({ ...newStat, player_id: e.target.value })}
                                placeholder="ID del jugador"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Partidas Jugadas</Form.Label>
                            <Form.Control
                                type="number"
                                value={newStat.games_played}
                                onChange={e => setNewStat({ ...newStat, games_played: e.target.value })}
                                placeholder="Partidas jugadas"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Victorias</Form.Label>
                            <Form.Control
                                type="number"
                                value={newStat.victories}
                                onChange={e => setNewStat({ ...newStat, victories: e.target.value })}
                                placeholder="Victorias"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Perdidas</Form.Label>
                            <Form.Control
                                type="number"
                                value={newStat.defeats}
                                onChange={e => setNewStat({ ...newStat, defeats: e.target.value })}
                                placeholder="Perdidas"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleModalSave}>
                        Crear
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Playerstat;