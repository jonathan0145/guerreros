import React, { useEffect, useState } from 'react';
import RecentPropertiesList from '../../components/admin/RecentPropertiesList';
import { Button, Modal, Form } from 'react-bootstrap';
import * as spellService from '../../services/spellService';

const Spell = () => {
    const [propertiesData, setPropertiesData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newSpell, setNewSpell] = useState({ name: '', description: '', percentage: '' });

    useEffect(() => {
        fetchSpells();
    }, []);

    const fetchSpells = () => {
        spellService.getAllSpells()
            .then(res => setPropertiesData(res.data))
            .catch(err => console.error('Error al obtener hechizos:', err));
    };

    const handleSpellAction = (actionType, data) => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        if (actionType === 'create') {
            setShowModal(true);
        }
        if (actionType === 'update') {
            spellService.updateSpell(data.spell_id, data, config)
                .then(fetchSpells)
                .catch(() => alert('Error al actualizar hechizo'));
        }
        if (actionType === 'delete') {
            spellService.deleteSpell(data.spell_id, config)
                .then(fetchSpells)
                .catch(() => alert('Error al eliminar hechizo'));
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setNewSpell({ name: '', description: '', percentage: '' });
    };

    const handleModalSave = () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        spellService.createSpell(newSpell, config)
            .then(() => {
                fetchSpells();
                handleModalClose();
            })
            .catch((err) => {
                console.error('Error al crear hechizo:', err.response ? err.response.data : err.message);
                alert('Error al crear hechizo');
            });
    };

    const spellHeaders = [
        { key: 'spell_id', label: 'ID SPELL' },
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
            <h2 className="mb-4">Spell</h2>
            <Button variant="success" className="mb-3" onClick={() => handleSpellAction('create', null)}>
                Añadir Nuevo Hechizo
            </Button>
            <RecentPropertiesList
                headers={spellHeaders}
                data={propertiesData}
                onAction={handleSpellAction}
            />

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nuevo Hechizo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={newSpell.name}
                                onChange={e => setNewSpell({ ...newSpell, name: e.target.value })}
                                placeholder="Nombre del hechizo"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newSpell.description}
                                onChange={e => setNewSpell({ ...newSpell, description: e.target.value })}
                                placeholder="Descripción del hechizo"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Porcentaje</Form.Label>
                            <Form.Control
                                type="number"
                                value={newSpell.percentage}
                                onChange={e => setNewSpell({ ...newSpell, percentage: e.target.value })}
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

export default Spell;