import React, { useEffect, useState } from 'react';
import RecentPropertiesList from '../../components/admin/RecentPropertiesList';
import { Button, Modal, Form } from 'react-bootstrap';
import * as warriorService from '../../services/warriorService';

const Warrior = () => {
    const [propertiesData, setPropertiesData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newWarrior, setNewWarrior] = useState({
        player_id: '',
        name: '',
        type_id: '',
        race_id: '',
        total_power: '',
        total_magic: '',
        health: '',
        speed: '',
        intelligence: '',
        status: ''
    });

    useEffect(() => {
        fetchWarriors();
    }, []);

    const fetchWarriors = () => {
        warriorService.getAllWarriors()
            .then(res => setPropertiesData(res.data))
            .catch(err => console.error('Error al obtener guerreros:', err));
    };

    const handleWarriorAction = (actionType, data) => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        if (actionType === 'create') {
            setShowModal(true);
        }
        if (actionType === 'update') {
            warriorService.updateWarrior(data.warrior_id, data, config)
                .then(fetchWarriors)
                .catch(() => alert('Error al actualizar guerrero'));
        }
        if (actionType === 'delete') {
            warriorService.deleteWarrior(data.warrior_id, config)
                .then(fetchWarriors)
                .catch(() => alert('Error al eliminar guerrero'));
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setNewWarrior({
            player_id: '',
            name: '',
            type_id: '',
            race_id: '',
            total_power: '',
            total_magic: '',
            health: '',
            speed: '',
            intelligence: '',
            status: ''
        });
    };

    const handleModalSave = () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        warriorService.createWarrior(newWarrior, config)
            .then(() => {
                fetchWarriors();
                handleModalClose();
            })
            .catch((err) => {
                console.error('Error al crear guerrero:', err.response ? err.response.data : err.message);
                alert('Error al crear guerrero');
            });
    };

    const warriorHeaders = [
        { key: 'warrior_id', label: 'ID WARRIOR' },
        { key: 'player_id', label: 'ID PLAYER' },
        { key: 'name', label: 'NAME' },
        { key: 'type_id', label: 'ID TYPE' },
        { key: 'race_id', label: 'ID RACE' },
        { key: 'total_power', label: 'TOTAL POWER' },
        { key: 'total_magic', label: 'TOTAL MAGIC' },
        { key: 'health', label: 'HEALTH' },
        { key: 'speed', label: 'SPEED' },
        { key: 'intelligence', label: 'INTELLIGENCE' },
        { key: 'status', label: 'STATUS' },
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
            <h2 className="mb-4">Warrior</h2>
            <Button variant="success" className="mb-3" onClick={() => handleWarriorAction('create', null)}>
                Añadir Nuevo Warrior
            </Button>
            <RecentPropertiesList
                headers={warriorHeaders}
                data={propertiesData}
                onAction={handleWarriorAction}
            />

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nuevo Guerrero</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>ID Player</Form.Label>
                            <Form.Control
                                type="number"
                                value={newWarrior.player_id}
                                onChange={e => setNewWarrior({ ...newWarrior, player_id: e.target.value })}
                                placeholder="ID del jugador"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={newWarrior.name}
                                onChange={e => setNewWarrior({ ...newWarrior, name: e.target.value })}
                                placeholder="Nombre del guerrero"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>ID Type</Form.Label>
                            <Form.Control
                                type="number"
                                value={newWarrior.type_id}
                                onChange={e => setNewWarrior({ ...newWarrior, type_id: e.target.value })}
                                placeholder="ID del tipo"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>ID Race</Form.Label>
                            <Form.Control
                                type="number"
                                value={newWarrior.race_id}
                                onChange={e => setNewWarrior({ ...newWarrior, race_id: e.target.value })}
                                placeholder="ID de la raza"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Total Power</Form.Label>
                            <Form.Control
                                type="number"
                                value={newWarrior.total_power}
                                onChange={e => setNewWarrior({ ...newWarrior, total_power: e.target.value })}
                                placeholder="Poder total"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Total Magic</Form.Label>
                            <Form.Control
                                type="number"
                                value={newWarrior.total_magic}
                                onChange={e => setNewWarrior({ ...newWarrior, total_magic: e.target.value })}
                                placeholder="Magia total"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Health</Form.Label>
                            <Form.Control
                                type="number"
                                value={newWarrior.health}
                                onChange={e => setNewWarrior({ ...newWarrior, health: e.target.value })}
                                placeholder="Salud"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Speed</Form.Label>
                            <Form.Control
                                type="number"
                                value={newWarrior.speed}
                                onChange={e => setNewWarrior({ ...newWarrior, speed: e.target.value })}
                                placeholder="Velocidad"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Intelligence</Form.Label>
                            <Form.Control
                                type="number"
                                value={newWarrior.intelligence}
                                onChange={e => setNewWarrior({ ...newWarrior, intelligence: e.target.value })}
                                placeholder="Inteligencia"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                type="text"
                                value={newWarrior.status}
                                onChange={e => setNewWarrior({ ...newWarrior, status: e.target.value })}
                                placeholder="Estado"
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

export default Warrior;