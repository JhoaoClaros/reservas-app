-- =====================================================
-- TABLA: roles
-- =====================================================
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =====================================================
-- TABLA: usuarios
-- =====================================================
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol_id INTEGER NOT NULL,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario_rol FOREIGN KEY (rol_id) 
        REFERENCES roles(id) ON DELETE RESTRICT
);


-- =====================================================
-- TABLA: tipos_espacio
-- =====================================================
CREATE TABLE tipos_espacio (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =====================================================
-- TABLA: espacios
-- =====================================================
CREATE TABLE espacios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    capacidad INTEGER NOT NULL CHECK (capacidad > 0),
    tipo_id INTEGER NOT NULL,
    ubicacion VARCHAR(200),
    descripcion TEXT,
    disponible BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_espacio_tipo FOREIGN KEY (tipo_id) 
        REFERENCES tipos_espacio(id) ON DELETE RESTRICT
);


-- =====================================================
-- TABLA: equipos
-- =====================================================
CREATE TABLE equipos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    espacio_id INTEGER NOT NULL,
    cantidad INTEGER DEFAULT 1 CHECK (cantidad >= 0),
    funcional BOOLEAN DEFAULT true,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_equipo_espacio FOREIGN KEY (espacio_id) 
        REFERENCES espacios(id) ON DELETE CASCADE
);


-- =====================================================
-- TABLA: horarios
-- =====================================================
CREATE TABLE horarios (
    id SERIAL PRIMARY KEY,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    descripcion VARCHAR(100),
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_horario_valido CHECK (hora_fin > hora_inicio)
);


-- =====================================================
-- TABLA: reservas
-- =====================================================
CREATE TABLE reservas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    espacio_id INTEGER NOT NULL,
    horario_id INTEGER NOT NULL,
    fecha DATE NOT NULL,
    estado VARCHAR(20) DEFAULT 'activa' CHECK (estado IN ('activa', 'completada', 'cancelada')),
    motivo TEXT,
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_reserva_usuario FOREIGN KEY (usuario_id) 
        REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_reserva_espacio FOREIGN KEY (espacio_id) 
        REFERENCES espacios(id) ON DELETE CASCADE,
    CONSTRAINT fk_reserva_horario FOREIGN KEY (horario_id) 
        REFERENCES horarios(id) ON DELETE RESTRICT,
    CONSTRAINT uq_reserva_espacio_horario_fecha UNIQUE(espacio_id, horario_id, fecha),
    CONSTRAINT chk_fecha_futura CHECK (fecha >= CURRENT_DATE)
);

-- =====================================================
-- TABLA: incidencias
-- =====================================================
CREATE TABLE incidencias (
    id SERIAL PRIMARY KEY,
    reserva_id INTEGER NOT NULL,
    descripcion TEXT NOT NULL,
    estado VARCHAR(20) DEFAULT 'reportada' CHECK (estado IN ('reportada', 'en_proceso', 'resuelta', 'cerrada')),
    prioridad VARCHAR(20) DEFAULT 'media' CHECK (prioridad IN ('baja', 'media', 'alta', 'critica')),
    reportado_por INTEGER NOT NULL,
    resuelto_por INTEGER,
    fecha_reporte TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_resolucion TIMESTAMP,
    notas_resolucion TEXT,
    CONSTRAINT fk_incidencia_reserva FOREIGN KEY (reserva_id) 
        REFERENCES reservas(id) ON DELETE CASCADE,
    CONSTRAINT fk_incidencia_reportado FOREIGN KEY (reportado_por) 
        REFERENCES usuarios(id) ON DELETE RESTRICT,
    CONSTRAINT fk_incidencia_resuelto FOREIGN KEY (resuelto_por) 
        REFERENCES usuarios(id) ON DELETE SET NULL
);

