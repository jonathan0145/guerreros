import React, { useEffect, useState } from 'react';
import RecentPropertiesList from '../../components/admin/RecentPropertiesList';
import { Button, Modal, Form } from 'react-bootstrap';
import * as raceService from '../../services/raceService';

const Race = () => {
    const [propertiesData, setPropertiesData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newRace, setNewRace] = useState({ name: '', description: '' });

    useEffect(() => {
        fetchRaces();
    }, []);

    const fetchRaces = () => {
        raceService.getAllRaces()
            .then(res => setPropertiesData(res.data))
            .catch(err => console.error('Error al obtener razas:', err));
    };

    const handleRaceAction = (actionType, data) => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        if (actionType === 'create') {
            setShowModal(true);
        }
        if (actionType === 'update') {
            raceService.updateRace(data.race_id, data, config)
                .then(fetchRaces)
                .catch(() => alert('Error al actualizar raza'));
        }
        if (actionType === 'delete') {
            raceService.deleteRace(data.race_id, config)
                .then(fetchRaces)
                .catch(() => alert('Error al eliminar raza'));
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setNewRace({ name: '', description: '' });
    };

    const handleModalSave = () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        raceService.createRace(newRace, config)
            .then(() => {
                fetchRaces();
                handleModalClose();
            })
            .catch((err) => {
                console.error('Error al crear raza:', err.response ? err.response.data : err.message);
                alert('Error al crear raza');
            });
    };

    const raceHeaders = [
        { key: 'race_id', label: 'ID RACE' },
        { key: 'name', label: 'NAME' },
        { key: 'description', label: 'DESCRIPTION' },
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
            <h2 className="mb-4">Race</h2>
            <Button variant="success" className="mb-3" onClick={() => handleRaceAction('create', null)}>
                Añadir Nueva Raza
            </Button>
            <RecentPropertiesList
                headers={raceHeaders}
                data={propertiesData}
                onAction={handleRaceAction}
            />

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nueva Raza</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={newRace.name}
                                onChange={e => setNewRace({ ...newRace, name: e.target.value })}
                                placeholder="Nombre de la raza"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newRace.description}
                                onChange={e => setNewRace({ ...newRace, description: e.target.value })}
                                placeholder="Descripción de la raza"
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

export default Race;