import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import * as warriorService from '../../services/warriorService';

const WarriorSpell = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('create'); // 'create' o 'delete'
    const [relation, setRelation] = useState({ warrior_id: '', spell_id: '' });

    const handleShowModal = (type) => {
        setModalType(type);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setRelation({ warrior_id: '', spell_id: '' });
    };

    const handleModalAction = () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        if (modalType === 'create') {
            warriorService.addSpellToWarrior(relation.warrior_id, relation.spell_id, config)
                .then(() => {
                    handleModalClose();
                    alert('Hechizo añadido al guerrero');
                })
                .catch(() => alert('Error al agregar hechizo'));
        } else {
            warriorService.removeSpellFromWarrior(relation.warrior_id, relation.spell_id, config)
                .then(() => {
                    handleModalClose();
                    alert('Hechizo eliminado del guerrero');
                })
                .catch(() => alert('Error al eliminar hechizo'));
        }
    };

    return (
        <div>
            <h2 className="mb-4">Warrior Spell</h2>
            <Button variant="success" className="mb-3 me-2" onClick={() => handleShowModal('create')}>
                Añadir Hechizo a Guerrero
            </Button>
            <Button variant="danger" className="mb-3" onClick={() => handleShowModal('delete')}>
                Eliminar Hechizo de Guerrero
            </Button>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalType === 'create' ? 'Añadir Hechizo a Guerrero' : 'Eliminar Hechizo de Guerrero'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>ID Guerrero</Form.Label>
                            <Form.Control
                                type="number"
                                value={relation.warrior_id}
                                onChange={e => setRelation({ ...relation, warrior_id: e.target.value })}
                                placeholder="ID del guerrero"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>ID Hechizo</Form.Label>
                            <Form.Control
                                type="number"
                                value={relation.spell_id}
                                onChange={e => setRelation({ ...relation, spell_id: e.target.value })}
                                placeholder="ID del hechizo"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant={modalType === 'create' ? 'primary' : 'danger'}
                        onClick={handleModalAction}
                    >
                        {modalType === 'create' ? 'Crear' : 'Eliminar'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default WarriorSpell;