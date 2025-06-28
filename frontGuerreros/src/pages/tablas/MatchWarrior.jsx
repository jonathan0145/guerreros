import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import * as warriorService from '../../services/warriorService';

const MatchWarrior = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('create'); // 'create' o 'delete'
    const [relation, setRelation] = useState({ match_id: '', warrior_id: '' });

    const handleShowModal = (type) => {
        setModalType(type);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setRelation({ match_id: '', warrior_id: '' });
    };

    const handleModalAction = () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        if (modalType === 'create') {
            warriorService.addWarriorToMatch(relation.match_id, relation.warrior_id, config)
                .then(() => {
                    handleModalClose();
                    alert('Guerrero añadido a la partida');
                })
                .catch(() => alert('Error al agregar relación'));
        } else {
            warriorService.removeWarriorFromMatch(relation.match_id, relation.warrior_id, config)
                .then(() => {
                    handleModalClose();
                    alert('Guerrero eliminado de la partida');
                })
                .catch(() => alert('Error al eliminar relación'));
        }
    };

    return (
        <div>
            <h2 className="mb-4">Match Warrior</h2>
            <Button variant="success" className="mb-3 me-2" onClick={() => handleShowModal('create')}>
                Añadir Guerrero a Partida
            </Button>
            <Button variant="danger" className="mb-3" onClick={() => handleShowModal('delete')}>
                Eliminar Guerrero de Partida
            </Button>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalType === 'create' ? 'Añadir Guerrero a Partida' : 'Eliminar Guerrero de Partida'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>ID Match</Form.Label>
                            <Form.Control
                                type="number"
                                value={relation.match_id}
                                onChange={e => setRelation({ ...relation, match_id: e.target.value })}
                                placeholder="ID de la partida"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>ID Guerrero</Form.Label>
                            <Form.Control
                                type="number"
                                value={relation.warrior_id}
                                onChange={e => setRelation({ ...relation, warrior_id: e.target.value })}
                                placeholder="ID del guerrero"
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

export default MatchWarrior;