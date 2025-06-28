import React, { useEffect, useState } from 'react';
import RecentPropertiesList from '../../components/admin/RecentPropertiesList';
import { Button, Modal, Form } from 'react-bootstrap';
import * as powerService from '../../services/powerService';

const Power = () => {
    const [propertiesData, setPropertiesData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newPower, setNewPower] = useState({ name: '', description: '', percentage: '' });

    useEffect(() => {
        fetchPowers();
    }, []);

    const fetchPowers = () => {
        powerService.getAllPowers()
            .then(res => setPropertiesData(res.data))
            .catch(err => console.error('Error al obtener poderes:', err));
    };

    const handlePowerAction = (actionType, data) => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        if (actionType === 'create') {
            setShowModal(true);
        }
        if (actionType === 'update') {
            powerService.updatePower(data.power_id, data, config)
                .then(fetchPowers)
                .catch(() => alert('Error al actualizar poder'));
        }
        if (actionType === 'delete') {
            powerService.deletePower(data.power_id, config)
                .then(fetchPowers)
                .catch(() => alert('Error al eliminar poder'));
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setNewPower({ name: '', description: '', percentage: '' });
    };

    const handleModalSave = () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        powerService.createPower(newPower, config)
            .then(() => {
                fetchPowers();
                handleModalClose();
            })
            .catch((err) => {
                console.error('Error al crear poder:', err.response ? err.response.data : err.message);
                alert('Error al crear poder');
            });
    };

    const powerHeaders = [
        { key: 'power_id', label: 'ID POWER' },
        { key: 'name', label: 'NAME' },
        { key: 'description', label: 'DESCRIPTION' },
        { key: 'percentage', label: 'PERCENTAGE' },
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
            <h2 className="mb-4">Power</h2>
            <Button variant="success" className="mb-3" onClick={() => handlePowerAction('create', null)}>
                Añadir Nuevo Poder
            </Button>
            <RecentPropertiesList
                headers={powerHeaders}
                data={propertiesData}
                onAction={handlePowerAction}
            />

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nuevo Poder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={newPower.name}
                                onChange={e => setNewPower({ ...newPower, name: e.target.value })}
                                placeholder="Nombre del poder"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newPower.description}
                                onChange={e => setNewPower({ ...newPower, description: e.target.value })}
                                placeholder="Descripción del poder"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Porcentaje</Form.Label>
                            <Form.Control
                                type="number"
                                value={newPower.percentage}
                                onChange={e => setNewPower({ ...newPower, percentage: e.target.value })}
                                placeholder="Porcentaje"
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

export default Power;