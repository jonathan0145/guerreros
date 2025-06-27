import React from 'react';
import RecentPropertiesList from '../../components/admin/RecentPropertiesList'; // Asegúrate de la ruta correcta
import { Button } from 'react-bootstrap'; // Importa Button para los botones de acción


const MyDashboardPage = () => {
    const propertiesData = [
        {
            match_id: 1,
            mode: "PODER",
            winner_id: 123,
            create_at: "2023-10-01T12:00:00Z",
            finished_at: "2023-10-01T14:00:00Z"
        },
        {
            match_id: 2,
            mode: "HECHIZO",
            winner_id: 456,
            create_at: "2023-10-02T12:00:00Z",
            finished_at: "2023-10-02T14:00:00Z"
        },
        // ... más datos de jugadores
    ];

    // Función para manejar las acciones (crear, actualizar, eliminar)
    const handlePlayerAction = (actionType, playerId) => {
        console.log(`Acción: ${actionType} para el jugador ID: ${playerId}`);
        // Aquí iría la lógica real para interactuar con la API
        // Por ejemplo:
        // if (actionType === 'delete') {
        //     axios.delete(`/api/players/${playerId}`)
        //         .then(() => { /* actualizar lista */ })
        //         .catch(error => { /* manejar error */ });
        // }
        // etc.
    };

    // Cabeceras para la tabla de jugadores
    const playerHeaders = [
        { key: 'match_id', label: 'ID MATCH' },
        { key: 'mode', label: 'MODE' },
        { key: 'winner_id', label: 'WINNER' },
        { key: 'create_at', label: 'CREATED' },
        { key: 'finished_at', label: 'FINISHED' },
        {
            key: 'acciones',
            label: 'ACCIONES',
            // La función render recibe la fila completa (rowItem)
            render: (rowItem, handleShowUpdateModal, handleDelete, handleShowCreateModal, handleShowViewModal) => (
                <div>
                    {/* Botón para Crear (ejemplo, podría estar fuera de la tabla si es para toda la entidad) */}
                    {/* Si el botón de crear es para toda la entidad (no para una fila específica),
                        podrías ponerlo fuera de la tabla, por ejemplo, encima de ella.
                        Lo dejo aquí como ejemplo de cómo podrías pasar handleShowCreateModal
                        si tuvieras un botón de "Crear" por fila, lo cual es menos común.
                        Para crear un nuevo jugador, normalmente tendrías un botón "Añadir Jugador"
                        fuera de la tabla, que abre el modal de creación.
                    */}
                    {/* <Button variant="primary" size="sm" className="me-2" onClick={handleShowCreateModal}>
                        Crear
                    </Button> */}

                    {/* Botón para Ver */}
                    <Button
                        variant="primary" // O el color que prefieras (secondary, outline-primary, etc.)
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowViewModal(rowItem)} // Llama a la nueva función
                        >
                        Ver
                    </Button>

                    {/* Botón para Actualizar (abre el modal de actualización con los datos de la fila) */}
                    <Button
                        variant="info"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowUpdateModal(rowItem)}
                    >
                        Actualizar
                    </Button>

                    {/* Botón para Eliminar (llama directamente a la función de eliminación) */}
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(rowItem.player_id)}
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
            {/* Botón para crear un nuevo jugador (generalmente va fuera de la tabla) */}
            <Button variant="success" className="mb-3" onClick={() => handlePlayerAction('create', null)}>
                Añadir Nueva Partida
            </Button>
            <RecentPropertiesList
                headers={playerHeaders}
                data={propertiesData}
                onAction={handlePlayerAction} // Pasa la función para manejar acciones
            />
        </div>
    );
};

export default MyDashboardPage;