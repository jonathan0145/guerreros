import React, { useEffect, useState } from 'react';
import RecentPropertiesList from '../../components/admin/RecentPropertiesList';
import { Button, Modal, Form } from 'react-bootstrap';
import * as warriortypeService from '../../services/warriortypeService';

const Warriortype = () => {
    const [propertiesData, setPropertiesData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newType, setNewType] = useState({ name: '', description: '' });

    useEffect(() => {
        fetchTypes();
    }, []);

    const fetchTypes = () => {
        warriortypeService.getAllWarriorTypes()
            .then(res => setPropertiesData(res.data))
            .catch(err => console.error('Error al obtener tipos:', err));
    };

    const handleTypeAction = (actionType, data) => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        if (actionType === 'create') {
            setShowModal(true);
        }
        if (actionType === 'update') {
            warriortypeService.updateWarriorType(data.type_id, data, config)
                .then(fetchTypes)
                .catch(() => alert('Error al actualizar tipo'));
        }
        if (actionType === 'delete') {
            warriortypeService.deleteWarriorType(data.type_id, config)
                .then(fetchTypes)
                .catch(() => alert('Error al eliminar tipo'));
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setNewType({ name: '', description: '' });
    };

    const handleModalSave = () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        warriortypeService.createWarriorType(newType, config)
            .then(() => {
                fetchTypes();
                handleModalClose();
            })
            .catch((err) => {
                console.error('Error al crear tipo:', err.response ? err.response.data : err.message);
                alert('Error al crear tipo');
            });
    };

    const typeHeaders = [
        { key: 'type_id', label: 'ID TYPE' },
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
            <h2 className="mb-4">Warrior Type</h2>
            <Button variant="success" className="mb-3" onClick={() => handleTypeAction('create', null)}>
                Añadir Nuevo Tipo de Guerrero
            </Button>
            <RecentPropertiesList
                headers={typeHeaders}
                data={propertiesData}
                onAction={handleTypeAction}
            />

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nuevo Tipo de Guerrero</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={newType.name}
                                onChange={e => setNewType({ ...newType, name: e.target.value })}
                                placeholder="Nombre del tipo"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newType.description}
                                onChange={e => setNewType({ ...newType, description: e.target.value })}
                                placeholder="Descripción del tipo"
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

export default Warriortype;