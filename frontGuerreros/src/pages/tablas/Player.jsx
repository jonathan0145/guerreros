import React, { useEffect, useState } from 'react';
import RecentPropertiesList from '../../components/admin/RecentPropertiesList';
import { Button, Modal, Form } from 'react-bootstrap';
import * as playerService from '../../services/playerService';

const Player = () => {
    const [propertiesData, setPropertiesData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newPlayer, setNewPlayer] = useState({ username: '', password: '', role: 'user' });

    useEffect(() => {
        fetchPlayers();
    }, []);

    const fetchPlayers = () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        playerService.getAllPlayers(config)
            .then(res => setPropertiesData(res.data))
            .catch(err => console.error('Error al obtener jugadores:', err));
    };

    const handlePlayerAction = (actionType, data) => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        if (actionType === 'create') {
            setShowModal(true);
        }
        if (actionType === 'update') {
            playerService.updatePlayer(data.player_id, data, config)
                .then(fetchPlayers)
                .catch(() => alert('Error al actualizar jugador'));
        }
        if (actionType === 'delete') {
            playerService.deletePlayer(data.player_id, config)
                .then(fetchPlayers)
                .catch(() => alert('Error al eliminar jugador'));
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setNewPlayer({ username: '', password: '', role: 'user' });
    };

    const handleModalSave = () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        playerService.adminCreatePlayer(newPlayer, config)
            .then(() => {
                fetchPlayers();
                handleModalClose();
            })
            .catch((err) => {
                console.error('Error al crear jugador:', err.response ? err.response.data : err.message);
                alert('Error al crear jugador');
            });
    };

    const playerHeaders = [
        { key: 'player_id', label: 'ID PLAYER' },
        { key: 'username', label: 'USER NAME' },
        { key: 'role', label: 'ROLE' },
        {
            key: 'acciones',
            label: 'ACCIONES',
            // render: (rowItem, handleShowUpdateModal, handleDelete, handleShowCreateModal, handleShowViewModal) => (
            //     <div>
            //         <Button
            //             variant="primary"
            //             size="sm"
            //             className="me-2"
            //             onClick={() => handleShowViewModal(rowItem)}
            //         >
            //             Ver
            //         </Button>
            //         <Button
            //             variant="info"
            //             size="sm"
            //             className="me-2"
            //             onClick={() => handleShowUpdateModal(rowItem)}
            //         >
            //             Actualizar
            //         </Button>
            //         <Button
            //             variant="danger"
            //             size="sm"
            //             onClick={() => handleDelete(rowItem.player_id)}
            //         >
            //             Eliminar
            //         </Button>
            //     </div>
            // )
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
            <h2 className="mb-4">Player</h2>
            <Button variant="success" className="mb-3" onClick={() => handlePlayerAction('create', null)}>
                Añadir Nuevo Jugador
            </Button>
            <RecentPropertiesList
                headers={playerHeaders}
                data={propertiesData}
                onAction={handlePlayerAction}
            />

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nuevo Jugador</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={newPlayer.username}
                                onChange={e => setNewPlayer({ ...newPlayer, username: e.target.value })}
                                placeholder="Usuario"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={newPlayer.password}
                                onChange={e => setNewPlayer({ ...newPlayer, password: e.target.value })}
                                placeholder="Contraseña"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                value={newPlayer.role}
                                onChange={e => setNewPlayer({ ...newPlayer, role: e.target.value })}
                            >
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                            </Form.Select>
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

export default Player;