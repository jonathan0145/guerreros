import React from 'react';
import RecentPropertiesList from '../../components/admin/RecentPropertiesList';
import { Button } from 'react-bootstrap'; // Importa Button para los botones de acción


const Warrior = () => {
    const propertiesData = [
        {
            warrior_id: 1,
            player_id: 1,
            name: "Guerrero uno",
            type_id: 1,
            race_id: 1,
            total_power: 100,
            total_magic: 100,
            health: 100,
            speed: 100,
            intelligence: 100,
            status: "active",
        },
        {
            warrior_id: 2,
            player_id: 2,
            name: "Guerrero dos",
            type_id: 2,
            race_id: 2,
            total_power: 200,
            total_magic: 200,
            health: 200,
            speed: 200,
            intelligence: 200,
            status: "inactive",
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
        { key: 'warrior_id', label: 'ID WARRIOR' },
        { key: 'player_id', label: 'ID PLAYER' },
        { key: 'name', label: 'NAME' },
        { key: 'type_id', label: 'ID TYPE' },
        { key: 'race_id', label: 'ID RACE' },
        { key: 'total_power', label: 'TOTAL POWER' },
        { key: 'total_magic', label: 'TOTAL MAGIC' },
        { key: 'health', label: 'HEALTH' },
        { key: 'speed', label: 'SPEED' },
        { key: 'intelligence', label: 'INTELLIGENCE' },
        { key: 'status', label: 'STATUS' },
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
            <h2 className="mb-4">Warrior</h2>
            {/* Botón para crear un nuevo jugador (generalmente va fuera de la tabla) */}
            <Button variant="success" className="mb-3" onClick={() => handlePlayerAction('create', null)}>
                Añadir Nuevo Warrior
            </Button>
            <RecentPropertiesList
                headers={playerHeaders}
                data={propertiesData}
                onAction={handlePlayerAction} // Pasa la función para manejar acciones
            />
        </div>
    );
};

export default Warrior;