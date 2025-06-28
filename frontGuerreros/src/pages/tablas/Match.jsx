import React, { useEffect, useState } from 'react';
import RecentPropertiesList from '../../components/admin/RecentPropertiesList';
import { Button, Modal, Form } from 'react-bootstrap';
import * as matchService from '../../services/matchService';

const Match = () => {
    const [propertiesData, setPropertiesData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newMatch, setNewMatch] = useState({ mode: '' });

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = () => {
        matchService.getAllMatches()
            .then(res => setPropertiesData(res.data))
            .catch(err => console.error('Error al obtener partidas:', err));
    };

    const handlePlayerAction = (actionType, data) => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    if (actionType === 'create') {
        setShowModal(true);
    }
    if (actionType === 'update') {
        matchService.updateMatch(data.match_id, data, config)
            .then(fetchMatches)
            .catch(() => alert('Error al actualizar partida'));
    }
    if (actionType === 'delete') {
        matchService.deleteMatch(data.match_id, config)
            .then(fetchMatches)
            .catch(() => alert('Error al eliminar partida'));
    }
};

    const handleModalClose = () => {
        setShowModal(false);
        setNewMatch({ mode: '' });
    };

    const handleModalSave = () => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    matchService.createMatch(newMatch, config)
        .then(() => {
            fetchMatches();
            handleModalClose();
        })
        .catch((err) => {
            console.error('Error al crear partida:', err.response ? err.response.data : err.message);
            alert('Error al crear partida');
        });
    };

    const playerHeaders = [
        { key: 'match_id', label: 'ID MATCH' },
        { key: 'mode', label: 'MODE' },
        { key: 'winner_id', label: 'WINNER' },
        { key: 'created_at', label: 'CREATED' },
        { key: 'finished_at', label: 'FINISHED' },
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
                    {/* <Button
                        variant="info"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowUpdateModal(rowItem)}
                    >
                        Actualizar
                    </Button> */}
                    <Button
                        variant="info"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowUpdateModal(rowItem)}
                        >
                        Actualizar
                    </Button>
                    {/* <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(rowItem.match_id)}
                    >
                        Eliminar
                    </Button> */}
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
            <h2 className="mb-4">Match</h2>
            <Button variant="success" className="mb-3" onClick={() => handlePlayerAction('create', null)}>
                Añadir Nueva Partida
            </Button>
            <RecentPropertiesList
                headers={playerHeaders}
                data={propertiesData}
                onAction={handlePlayerAction}
            />

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nueva Partida</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Modo</Form.Label>
                            <Form.Control
                                type="text"
                                value={newMatch.mode}
                                onChange={e => setNewMatch({ ...newMatch, mode: e.target.value })}
                                placeholder="Ej: PODER, HECHIZO, etc."
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

export default Match;