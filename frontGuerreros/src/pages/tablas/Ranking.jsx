import React, { useEffect, useState } from 'react';
import RecentPropertiesList from '../../components/admin/RecentPropertiesList';
import { Button, Modal, Form } from 'react-bootstrap';
import * as rankingService from '../../services/rankingService';

const Ranking = () => {
    const [propertiesData, setPropertiesData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newRanking, setNewRanking] = useState({ player_id: '', score: '' });

    useEffect(() => {
        fetchRanking();
    }, []);

    const fetchRanking = () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        rankingService.getAllRanking(config)
            .then(res => setPropertiesData(res.data))
            .catch(err => console.error('Error al obtener ranking:', err));
    };

    const handleRankingAction = (actionType, data) => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        if (actionType === 'create') {
            setShowModal(true);
        }
        if (actionType === 'update') {
            rankingService.updateRanking(data.player_id, data, config)
                .then(fetchRanking)
                .catch(() => alert('Error al actualizar ranking'));
        }
        if (actionType === 'delete') {
            rankingService.deleteRanking(data.player_id, config)
                .then(fetchRanking)
                .catch(() => alert('Error al eliminar ranking'));
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setNewRanking({ player_id: '', score: '' });
    };

    const handleModalSave = () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        rankingService.createRanking(newRanking, config)
            .then(() => {
                fetchRanking();
                handleModalClose();
            })
            .catch((err) => {
                console.error('Error al crear ranking:', err.response ? err.response.data : err.message);
                alert('Error al crear ranking');
            });
    };

    const rankingHeaders = [
        { key: 'player_id', label: 'ID PLAYER' },
        { key: 'score', label: 'SCORE' },
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
            <h2 className="mb-4">Ranking</h2>
            <Button variant="success" className="mb-3" onClick={() => handleRankingAction('create', null)}>
                Añadir Nuevo Ranking
            </Button>
            <RecentPropertiesList
                headers={rankingHeaders}
                data={propertiesData}
                onAction={handleRankingAction}
            />

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nuevo Ranking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>ID Player</Form.Label>
                            <Form.Control
                                type="number"
                                value={newRanking.player_id}
                                onChange={e => setNewRanking({ ...newRanking, player_id: e.target.value })}
                                placeholder="ID del jugador"
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Score</Form.Label>
                            <Form.Control
                                type="number"
                                value={newRanking.score}
                                onChange={e => setNewRanking({ ...newRanking, score: e.target.value })}
                                placeholder="Puntaje"
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

export default Ranking;