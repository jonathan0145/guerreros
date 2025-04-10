# Modelo de Base de Datos - War Game

## Descripción General

Este documento describe la estructura de la base de datos para el juego de guerra, incluyendo todas las tablas, sus relaciones y restricciones.

## Tablas

### USER
```sql
CREATE TABLE USER (
    User_id INT PRIMARY KEY AUTO_INCREMENT,
    User_user VARCHAR(50) NOT NULL UNIQUE,
    User_email VARCHAR(100) NOT NULL UNIQUE,
    User_password VARCHAR(255) NOT NULL,
    User_role ENUM('user', 'admin') DEFAULT 'user' NOT NULL,
    User_status_fk INT NOT NULL DEFAULT 1,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (User_status_fk) REFERENCES USER_STATUS(User_status_id)
);

CREATE INDEX idx_user_email ON USER(User_email);
CREATE INDEX idx_user_status ON USER(User_status_fk);
```

### USER_STATUS
```sql
CREATE TABLE USER_STATUS (
    User_status_id INT PRIMARY KEY AUTO_INCREMENT,
    User_status_name VARCHAR(20) NOT NULL UNIQUE,
    User_status_description VARCHAR(80),
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_status_name ON USER_STATUS(User_status_name);
```

### WARRIOR
```sql
CREATE TABLE WARRIOR (
    Warrior_id INT PRIMARY KEY AUTO_INCREMENT,
    Warrior_name VARCHAR(50) NOT NULL,
    Warrior_level INT DEFAULT 1,
    Warrior_health INT NOT NULL,
    Warrior_attack INT NOT NULL,
    Warrior_defense INT NOT NULL,
    Warrior_experience INT DEFAULT 0,
    Race_id INT NOT NULL,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (Race_id) REFERENCES RACE(Race_id)
);

CREATE INDEX idx_warrior_race ON WARRIOR(Race_id);
```

### RACE
```sql
CREATE TABLE RACE (
    Race_id INT PRIMARY KEY AUTO_INCREMENT,
    Race_name VARCHAR(50) NOT NULL UNIQUE,
    Race_description TEXT,
    Race_health_bonus INT DEFAULT 0,
    Race_attack_bonus INT DEFAULT 0,
    Race_defense_bonus INT DEFAULT 0,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_race_name ON RACE(Race_name);
```

### POWER
```sql
CREATE TABLE POWER (
    Power_id INT PRIMARY KEY AUTO_INCREMENT,
    Power_name VARCHAR(50) NOT NULL UNIQUE,
    Power_description TEXT,
    Power_damage INT NOT NULL,
    Power_cooldown INT NOT NULL,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_power_name ON POWER(Power_name);
```

### SPELL
```sql
CREATE TABLE SPELL (
    Spell_id INT PRIMARY KEY AUTO_INCREMENT,
    Spell_name VARCHAR(50) NOT NULL UNIQUE,
    Spell_description TEXT,
    Spell_mana_cost INT NOT NULL,
    Spell_effect TEXT NOT NULL,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_spell_name ON SPELL(Spell_name);
```

### WARRIOR_POWER (Relación N:M)
```sql
CREATE TABLE WARRIOR_POWER (
    Warrior_id INT NOT NULL,
    Power_id INT NOT NULL,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Warrior_id, Power_id),
    FOREIGN KEY (Warrior_id) REFERENCES WARRIOR(Warrior_id) ON DELETE CASCADE,
    FOREIGN KEY (Power_id) REFERENCES POWER(Power_id) ON DELETE CASCADE
);

CREATE INDEX idx_warrior_power ON WARRIOR_POWER(Power_id);
```

### WARRIOR_SPELL (Relación N:M)
```sql
CREATE TABLE WARRIOR_SPELL (
    Warrior_id INT NOT NULL,
    Spell_id INT NOT NULL,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Warrior_id, Spell_id),
    FOREIGN KEY (Warrior_id) REFERENCES WARRIOR(Warrior_id) ON DELETE CASCADE,
    FOREIGN KEY (Spell_id) REFERENCES SPELL(Spell_id) ON DELETE CASCADE
);

CREATE INDEX idx_warrior_spell ON WARRIOR_SPELL(Spell_id);
```

### WARRIOR_USER (Relación N:M)
```sql
CREATE TABLE WARRIOR_USER (
    Warrior_id INT NOT NULL,
    User_id INT NOT NULL,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Warrior_id, User_id),
    FOREIGN KEY (Warrior_id) REFERENCES WARRIOR(Warrior_id) ON DELETE CASCADE,
    FOREIGN KEY (User_id) REFERENCES USER(User_id) ON DELETE CASCADE
);

CREATE INDEX idx_warrior_user ON WARRIOR_USER(User_id);
```

## Relaciones

1. **Usuario -> Estado**: Cada usuario tiene un estado asociado (1:1)
2. **Usuario <-> Guerreros**: Un usuario puede tener múltiples guerreros y un guerrero puede pertenecer a múltiples usuarios (N:M)
3. **Raza -> Guerreros**: Una raza puede tener múltiples guerreros (1:N)
4. **Guerrero <-> Poderes**: Un guerrero puede tener múltiples poderes y un poder puede pertenecer a múltiples guerreros (N:M)
5. **Guerrero <-> Hechizos**: Un guerrero puede tener múltiples hechizos y un hechizo puede pertenecer a múltiples guerreros (N:M)

## Índices

Se han creado índices para optimizar las siguientes operaciones:
1. Búsqueda de usuarios por email
2. Filtrado de usuarios por estado
3. Búsqueda de guerreros por raza
4. Búsqueda de poderes y hechizos por nombre
5. Búsqueda en relaciones N:M

## Restricciones

1. **Unicidad**:
   - Nombres de usuario y email deben ser únicos
   - Nombres de razas, poderes y hechizos deben ser únicos
   - Nombres de estados de usuario deben ser únicos

2. **Valores por defecto**:
   - Rol de usuario por defecto: 'user'
   - Estado de usuario por defecto: 1 (Activo)
   - Nivel de guerrero por defecto: 1
   - Experiencia de guerrero por defecto: 0

3. **Integridad referencial**:
   - Eliminación en cascada para relaciones N:M
   - Referencias a tablas principales protegidas

4. **Campos requeridos**:
   - Todos los campos marcados como NOT NULL son obligatorios
   - Las contraseñas deben estar hasheadas

## Convenciones de Nombrado

1. **Tablas**:
   - Nombres en mayúsculas
   - Singular
   - Sin prefijos

2. **Campos**:
   - PascalCase
   - Prefijados con el nombre de la tabla
   - Sufijo '_id' para claves primarias
   - Sufijo '_fk' para claves foráneas

3. **Timestamps**:
   - Created_at: Fecha de creación
   - Updated_at: Fecha de última actualización

## Triggers

```sql
DELIMITER //

CREATE TRIGGER before_warrior_insert
BEFORE INSERT ON warriors
FOR EACH ROW
BEGIN
    SET NEW.max_health = NEW.health;
END//

CREATE TRIGGER before_game_warrior_insert
BEFORE INSERT ON game_warriors
FOR EACH ROW
BEGIN
    SET NEW.current_health = (
        SELECT health 
        FROM warriors 
        WHERE id = NEW.warrior_id
    );
END//

DELIMITER ;
```

## Notas de Implementación

1. Todos los timestamps se manejan en UTC
2. Los campos de estado usan ENUM para garantizar valores válidos
3. Se implementa borrado en cascada para mantener la integridad referencial
4. Los bonus de raza se aplican al crear un guerrero
5. Los cooldowns se manejan a nivel de aplicación y base de datos 