import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Fa0, Fa1, Fa2, Fa3, Fa4, Fa5, Fa6, Fa7, Fa8, Fa9 } from "react-icons/fa6";

const AdminLayout = () => {
    const location = useLocation();

    const adminMenuItems = [
        { path: '/admin', icon: <Fa0 />, label: 'match' },
        { path: '/admin/player', icon: <Fa1 />, label: 'player' },
        { path: '/admin/matchplayer', icon: <Fa2 />, label: 'matchplayer' },
        { path: '/admin/power', icon: <Fa3 />, label: 'power' },
        { path: '/admin/spell', icon: <Fa4 />, label: 'spell' },
        { path: '/admin/warrior', icon: <Fa5 />, label: 'warrior' },
        { path: '/admin/warriorpower', icon: <Fa6 />, label: 'warriorpower' },
        { path: '/admin/warriorspell', icon: <Fa7 />, label: 'warriorspell' },
        { path: '/admin/playerstat', icon: <Fa8 />, label: 'playerstat' },
        { path: '/admin/matchwarrior', icon: <Fa9 />, label: 'matchwarrior' },
        { path: '/admin/race', icon: (
                <span> 
                    <Fa1 /> <Fa0 /> 
                </span>
            ), label: 'race' },
        { path: '/admin/ranking', icon: (
                <span> 
                    <Fa1 /> <Fa1 /> 
                </span>
            ), label: 'ranking' },
        { path: '/admin/warriortype', icon: (
                <span> 
                    <Fa1 /> <Fa2 /> 
                </span>
            ), label: 'warriortype' }
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="admin-layout admin-layout-tamaño">
            <Row className="g-0">
                <Col md={2} className="bg-dark min-vh-100">
                    <Nav className="flex-column p-3">
                        <div className="text-white mb-4">
                            <h4>Juego de Guerreros</h4>
                        </div>
                        {adminMenuItems.map((item) => (
                            <Nav.Link 
                                key={item.path}
                                as={Link} 
                                to={item.path}
                                className={`text-white ${isActive(item.path) ? 'active' : ''}`}
                            >
                                <span className="me-2">{item.icon}</span>
                                {item.label}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Col>
                <Col md={10}>
                    <Container fluid className="p-4">
                        <Outlet />
                    </Container>
                </Col>
            </Row>
        </div>
    );
};

export default AdminLayout;