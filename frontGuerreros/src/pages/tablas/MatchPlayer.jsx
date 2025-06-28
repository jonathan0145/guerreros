import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import * as matchService from '../../services/matchService';

const MatchPlayer = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('create'); // 'create' o 'delete'
    const [relation, setRelation] = useState({ match_id: '', player_id: '' });

    const handleShowModal = (type) => {
        setModalType(type);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setRelation({ match_id: '', player_id: '' });
    };

    const handleModalAction = () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        if (modalType === 'create') {
            matchService.addPlayerToMatch(relation.match_id, relation.player_id, config)
                .then(() => {
                    handleModalClose();
                    alert('Jugador añadido a la partida');
                })
                .catch(() => alert('Error al agregar relación'));
        } else {
            matchService.removePlayerFromMatch(relation.match_id, relation.player_id, config)
                .then(() => {
                    handleModalClose();
                    alert('Jugador eliminado de la partida');
                })
                .catch(() => alert('Error al eliminar relación'));
        }
    };

    return (
        <div>
            <h2 className="mb-4">Match Player</h2>
            <Button variant="success" className="mb-3 me-2" onClick={() => handleShowModal('create')}>
                Añadir Nuevo MatchPlayer
            </Button>
            <Button variant="danger" className="mb-3" onClick={() => handleShowModal('delete')}>
                Eliminar MatchPlayer
            </Button>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalType === 'create' ? 'Añadir Jugador a Partida' : 'Eliminar Jugador de Partida'}
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
                            <Form.Label>ID Player</Form.Label>
                            <Form.Control
                                type="number"
                                value={relation.player_id}
                                onChange={e => setRelation({ ...relation, player_id: e.target.value })}
                                placeholder="ID del jugador"
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

export default MatchPlayer;