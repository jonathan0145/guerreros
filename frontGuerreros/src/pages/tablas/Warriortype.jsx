import React from 'react';
import RecentPropertiesList from '../../components/admin/RecentPropertiesList';
import { Button } from 'react-bootstrap'; // Importa Button para los botones de acción


const Warriortype = () => {
    const propertiesData = [
        {
            type_id: 1,
            name: "Espadachin",
            description: "Un guerrero experto en el uso de espadas, ágil y letal en combate cuerpo a cuerpo. Su habilidad con la espada le permite realizar ataques rápidos y precisos, dominando el arte del combate con filo."
        },
        {
            type_id: 2,
            name: "Arquero",
            description: "Un maestro del arco y las flechas, capaz de atacar a sus enemigos desde la distancia con una puntería excepcional. Su agilidad y precisión le permiten moverse rápidamente por el campo de batalla, evitando ataques mientras dispara con eficacia."
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
        { key: 'type_id', label: 'ID TYPE' },
        { key: 'name', label: 'NAME' },
        { key: 'description', label: 'DESCRIPTION' },
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
            <h2 className="mb-4">Warrior Type</h2>
            {/* Botón para crear un nuevo jugador (generalmente va fuera de la tabla) */}
            <Button variant="success" className="mb-3" onClick={() => handlePlayerAction('create', null)}>
                Añadir Nuevo Tipo de Guerrero
            </Button>
            <RecentPropertiesList
                headers={playerHeaders}
                data={propertiesData}
                onAction={handlePlayerAction} // Pasa la función para manejar acciones
            />
        </div>
    );
};

export default Warriortype;