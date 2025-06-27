// import React, { useState } from 'react';
// import { Table, Badge, Button, Modal } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const DEFAULT_HEADERS = [
//     { key: 'id', label: 'ID' },
//     { key: 'titulo', label: 'Título' },
//     { key: 'tipo', label: 'Tipo' },
//     { key: 'precio', label: 'Precio' },
//     { key: 'estado', label: 'Estado' },
//     { key: 'fecha', label: 'Fecha' }
// ];

// const RecentPropertiesList = ({ headers = DEFAULT_HEADERS, data = [], onAction }) => {
//     const [showCreateModal, setShowCreateModal] = useState(false);
//     const [showUpdateModal, setShowUpdateModal] = useState(false);
//     const [showViewModal, setShowViewModal] = useState(false); // Nuevo estado para el modal de Ver
//     const [selectedRow, setSelectedRow] = useState(null);

//     const handleCloseCreateModal = () => setShowCreateModal(false);
//     const handleShowCreateModal = () => setShowCreateModal(true);

//     const handleCloseUpdateModal = () => setShowUpdateModal(false);
//     const handleShowUpdateModal = (row) => {
//         setSelectedRow(row);
//         setShowUpdateModal(true);
//     };

//     // Nueva función para manejar el botón "Ver"
//     const handleCloseViewModal = () => setShowViewModal(false);
//     const handleShowViewModal = (row) => {
//         setSelectedRow(row);
//         setShowViewModal(true);
//     };

//     const handleDelete = (rowId) => {
//         if (window.confirm(`¿Estás seguro de que quieres eliminar el ID: ${rowId}?`)) {
//             if (onAction) {
//                 onAction('delete', rowId);
//             }
//             console.log(`Eliminar elemento con ID: ${rowId}`);
//         }
//     };

//     return (
//         <div className="mt-4">
//             <Table responsive striped hover>
//                 <thead>
//                     <tr>
//                         {headers.map((headerItem, index) => (
//                             <th key={headerItem.key || index}>{headerItem.label}</th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((rowItem) => (
//                         <tr key={rowItem.id || rowItem.player_id || JSON.stringify(rowItem)}>
//                             {headers.map((headerItem) => (
//                                 <td key={`${rowItem.id || rowItem.player_id}-${headerItem.key}`}>
//                                     {headerItem.render ? (
//                                         // Pasa handleShowViewModal a la función render
//                                         headerItem.render(rowItem, handleShowUpdateModal, handleDelete, handleShowCreateModal, handleShowViewModal)
//                                     ) : (
//                                         headerItem.key === 'titulo' && rowItem.id ? (
//                                             <Link to={`/admin/propiedades/${rowItem.id}`}>
//                                                 {rowItem[headerItem.key]}
//                                             </Link>
//                                         ) : headerItem.key === 'estado' ? (
//                                             <Badge bg={rowItem.estado === "Activo" ? "success" : "warning"}>
//                                                 {rowItem[headerItem.key]}
//                                             </Badge>
//                                         ) : (
//                                             rowItem[headerItem.key]
//                                         )
//                                     )}
//                                 </td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             {/* Modal para Crear (sin cambios) */}
//             <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Crear Nuevo Elemento</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <p>Formulario para crear...</p>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseCreateModal}>Cerrar</Button>
//                     <Button variant="primary" onClick={() => { console.log("Guardar nuevo elemento"); handleCloseCreateModal(); }}>Guardar</Button>
//                 </Modal.Footer>
//             </Modal>

//             {/* Modal para Actualizar (sin cambios, solo se mostrará con un botón) */}
//             <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Actualizar Elemento: {selectedRow ? selectedRow.username || selectedRow.titulo : ''}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {selectedRow ? (
//                         <div>
//                             <p>Editando: {JSON.stringify(selectedRow)}</p>
//                             <input type="text" defaultValue={selectedRow.username || selectedRow.titulo} />
//                         </div>
//                     ) : (
//                         <p>Cargando datos...</p>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseUpdateModal}>Cerrar</Button>
//                     <Button variant="primary" onClick={() => { console.log("Guardar cambios para", selectedRow); handleCloseUpdateModal(); }}>Guardar Cambios</Button>
//                 </Modal.Footer>
//             </Modal>

//             {/* Nuevo Modal para Ver Detalles */}
//             <Modal show={showViewModal} onHide={handleCloseViewModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Detalles del Elemento: {selectedRow ? selectedRow.username || selectedRow.titulo : ''}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {selectedRow ? (
//                         <div>
//                             <p>ID: {selectedRow.id || selectedRow.player_id}</p>
//                             <p>Título/Username: {selectedRow.titulo || selectedRow.username}</p>
//                             <p>Tipo/Rol: {selectedRow.tipo || selectedRow.role}</p>
//                             {/* Puedes mostrar más detalles aquí según la estructura de tus datos */}
//                             <pre>{JSON.stringify(selectedRow, null, 2)}</pre> {/* Para mostrar todos los datos */}
//                         </div>
//                     ) : (
//                         <p>No hay datos seleccionados.</p>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseViewModal}>Cerrar</Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default RecentPropertiesList;

import React, { useState } from 'react';
import { Table, Badge, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DEFAULT_HEADERS = [
    { key: 'id', label: 'ID' },
    { key: 'titulo', label: 'Título' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'precio', label: 'Precio' },
    { key: 'estado', label: 'Estado' },
    { key: 'fecha', label: 'Fecha' }
];

const RecentPropertiesList = ({ headers = DEFAULT_HEADERS, data = [], onAction }) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [formData, setFormData] = useState({});

    const handleCloseCreateModal = () => setShowCreateModal(false);
    const handleShowCreateModal = () => {
        setFormData({});
        setShowCreateModal(true);
    };

    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowUpdateModal = (row) => {
        setSelectedRow(row);
        setFormData(row);
        setShowUpdateModal(true);
    };

    const handleCloseViewModal = () => setShowViewModal(false);
    const handleShowViewModal = (row) => {
        setSelectedRow(row);
        setShowViewModal(true);
    };

    const handleDelete = (rowId) => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar el ID: ${rowId}?`)) {
            if (onAction) {
                onAction('delete', rowId);
            }
            console.log(`Eliminar elemento con ID: ${rowId}`);
        }
    };

    // Maneja cambios en los inputs del modal
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Filtra headers para no incluir la columna de acciones
    const inputHeaders = headers.filter(h => h.key !== 'acciones');

    return (
        <div className="mt-4">
            <Table responsive striped hover>
                <thead>
                    <tr>
                        {headers.map((headerItem, index) => (
                            <th key={headerItem.key || index}>{headerItem.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((rowItem) => (
                        <tr key={rowItem.id || rowItem.player_id || JSON.stringify(rowItem)}>
                            {headers.map((headerItem) => (
                                <td key={`${rowItem.id || rowItem.player_id}-${headerItem.key}`}>
                                    {headerItem.render ? (
                                        headerItem.render(rowItem, handleShowUpdateModal, handleDelete, handleShowCreateModal, handleShowViewModal)
                                    ) : (
                                        headerItem.key === 'titulo' && rowItem.id ? (
                                            <Link to={`/admin/propiedades/${rowItem.id}`}>
                                                {rowItem[headerItem.key]}
                                            </Link>
                                        ) : headerItem.key === 'estado' ? (
                                            <Badge bg={rowItem.estado === "Activo" ? "success" : "warning"}>
                                                {rowItem[headerItem.key]}
                                            </Badge>
                                        ) : (
                                            rowItem[headerItem.key]
                                        )
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal para Crear */}
            <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nuevo Elemento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {inputHeaders.map((h) => (
                        <div key={h.key} className="mb-2">
                            <label>{h.label}</label>
                            <input
                                type="text"
                                name={h.key}
                                value={formData[h.key] || ''}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreateModal}>Cerrar</Button>
                    <Button variant="primary" onClick={() => {
                        if (onAction) onAction('create', formData);
                        handleCloseCreateModal();
                    }}>Guardar</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Actualizar */}
            <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Elemento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedRow ? (
                        inputHeaders.map((h) => (
                            <div key={h.key} className="mb-2">
                                <label>{h.label}</label>
                                <input
                                    type="text"
                                    name={h.key}
                                    value={formData[h.key] || ''}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        ))
                    ) : (
                        <p>Cargando datos...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdateModal}>Cerrar</Button>
                    <Button variant="primary" onClick={() => {
                        if (onAction) onAction('update', formData);
                        handleCloseUpdateModal();
                    }}>Guardar Cambios</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Ver Detalles */}
            <Modal show={showViewModal} onHide={handleCloseViewModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del Elemento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedRow ? (
                        <div>
                            {inputHeaders.map((h) => (
                                <p key={h.key}><strong>{h.label}:</strong> {selectedRow[h.key]}</p>
                            ))}
                            <pre>{JSON.stringify(selectedRow, null, 2)}</pre>
                        </div>
                    ) : (
                        <p>No hay datos seleccionados.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseViewModal}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RecentPropertiesList;