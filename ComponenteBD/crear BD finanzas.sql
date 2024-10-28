-- -- Crear la base de datos
-- CREATE DATABASE FinanzasPersonales;
-- GO

-- Usar la base de datos creada
USE FinanzasPersonales;
GO
IF OBJECT_ID('dbo.EgresosAhorro', 'U') IS NOT NULL DROP TABLE dbo.EgresosAhorro;
IF OBJECT_ID('dbo.EgresosDeudas', 'U') IS NOT NULL DROP TABLE dbo.EgresosDeudas;
IF OBJECT_ID('dbo.EgresosGastos', 'U') IS NOT NULL DROP TABLE dbo.EgresosGastos;
IF OBJECT_ID('dbo.EgresosServicios', 'U') IS NOT NULL DROP TABLE dbo.EgresosServicios;
IF OBJECT_ID('dbo.Presupuesto', 'U') IS NOT NULL DROP TABLE dbo.Presupuesto;
IF OBJECT_ID('dbo.Proyecciones', 'U') IS NOT NULL DROP TABLE dbo.Proyecciones;
IF OBJECT_ID('dbo.Gastos', 'U') IS NOT NULL DROP TABLE dbo.Gastos;
IF OBJECT_ID('dbo.Deudas', 'U') IS NOT NULL DROP TABLE dbo.Deudas;
IF OBJECT_ID('dbo.Ahorro', 'U') IS NOT NULL DROP TABLE dbo.Ahorro;
IF OBJECT_ID('dbo.Servicios', 'U') IS NOT NULL DROP TABLE dbo.Servicios;
IF OBJECT_ID('dbo.Movimientos', 'U') IS NOT NULL DROP TABLE dbo.Movimientos;
IF OBJECT_ID('dbo.TipoMovimientos', 'U') IS NOT NULL DROP TABLE dbo.TipoMovimientos;
IF OBJECT_ID('dbo.Usuarios', 'U') IS NOT NULL DROP TABLE dbo.Usuarios;
IF OBJECT_ID('dbo.Monedas', 'U') IS NOT NULL DROP TABLE dbo.Monedas;
IF OBJECT_ID('dbo.Monedas', 'U') IS NOT NULL DROP TABLE dbo.Monedas;
GO
CREATE TABLE Usuarios (
	usuarioID INT IDENTITY(1,1) NOT NULL,
    usuario NVARCHAR(150) UNIQUE NOT NULL,
    nombreCompleto NVARCHAR(250) NOT NULL,
    correo NVARCHAR(255) UNIQUE NOT NULL,
    contrasena NVARCHAR(255) NOT NULL,
    fechaCreacion DATETIME NOT NULL DEFAULT GETDATE(),
    activo INT NOT NULL CHECK (activo IN (0,1)),
    CONSTRAINT PK_Usuarios PRIMARY KEY CLUSTERED (usuarioID ASC )
) ON [PRIMARY];

CREATE TABLE Movimientos (
    movimientoID INT IDENTITY(1,1) NOT NULL,
    fechaMovimiento DATE NOT NULL,
    montoAbonado DECIMAL(18, 2) NOT NULL,
    usuarioID INT NOT NULL,  -- Relación con el usuario,
    CONSTRAINT PK_Movimientos PRIMARY KEY CLUSTERED (movimientoID ASC ),
    CONSTRAINT FK_MovimientosUsuarios FOREIGN KEY (usuarioID) REFERENCES Usuarios (usuarioID),
)ON [PRIMARY];

CREATE TABLE TipoMovimientos (
    tipoMovimientosID INT IDENTITY(1,1) NOT NULL,
    tipoMovimientos NVARCHAR(100) NOT NULL,
    activo INT NOT NULL CHECK (activo IN (0,1)),
    CONSTRAINT PK_TipoMovimientos PRIMARY KEY CLUSTERED (tipoMovimientosID ASC )
)ON [PRIMARY];

INSERT INTO TipoMovimientos VALUES ('INGRESO',0),('EGRESO',0)

CREATE TABLE Monedas (
    monedaID  INT IDENTITY(1,1) NOT NULL,
    moneda NVARCHAR(255) NOT NULL,
    activo INT NOT NULL CHECK (activo IN (0,1)),
    CONSTRAINT PK_Moneda PRIMARY KEY CLUSTERED (monedaID ASC )
)ON [PRIMARY];

CREATE TABLE Paridad (
    paridadID  INT IDENTITY(1,1) NOT NULL,
    fecha DATE NOT NULL,
    factorCambio DECIMAL(5,2) NOT NULL,
    monedaID INT NOT NULL
    CONSTRAINT PK_Paridad PRIMARY KEY CLUSTERED (paridadID ASC )
    CONSTRAINT FK_ParidadMoneda FOREIGN KEY (monedaID) REFERENCES Monedas (monedaID),
)ON [PRIMARY];

CREATE TABLE Servicios (
    servicioID INT IDENTITY(1,1) NOT NULL,
    nombreServicio NVARCHAR(250) NOT NULL,  
    descripcion NVARCHAR(255),
    proveedor NVARCHAR(250) NOT NULL,
    costoMensual DECIMAL(18, 2) NOT NULL,
    diaFacturacion TINYINT NOT NULL CHECK (diaFacturacion BETWEEN 1 AND 31),
    fechaInicio DATE NOT NULL,
    fechaFin DATE,
    activo INT NOT NULL CHECK (activo IN (0,1)),
    monedaID  INT NOT NULL, -- Relación con el Monedas
    tipoMovimientosID INT NOT NULL,  -- Relación con el TipoMovimientos
    CONSTRAINT PK_Servicios PRIMARY KEY CLUSTERED (servicioID ASC),
    CONSTRAINT FK_ServiciosMonedas FOREIGN KEY (monedaID) REFERENCES Monedas (monedaID),
    CONSTRAINT FK_ServiciosTipoMovimientos FOREIGN KEY (TipoMovimientosID) REFERENCES TipoMovimientos (TipoMovimientosID)
)ON [PRIMARY];

CREATE TABLE EgresosServicios (
    movimientoID INT NOT NULL, -- Relación con el Movimientos
    servicioID INT NOT NULL, -- Relación con el Servicios
    CONSTRAINT FK_EgresosServicios_Egreso FOREIGN KEY (movimientoID) REFERENCES Movimientos (movimientoID),
    CONSTRAINT FK_EgresosServicios_Servicio FOREIGN KEY (servicioID) REFERENCES Servicios (servicioID)
);

CREATE TABLE Ahorro (
    ahorroID INT IDENTITY(1,1) NOT NULL,
    tipoAhorro NVARCHAR(50) NOT NULL, 
    descripcion NVARCHAR(255),
    monto DECIMAL(18,2) NOT NULL,
    objetivo NVARCHAR(255),
    fechaInicio DATE NOT NULL,
    fechaFin DATE,
    usuarioID INT NOT NULL, -- Relación con el usuario
    tipoMovimientosID INT NOT NULL,  -- Relación con el TipoMovimientos,
    CONSTRAINT PK_Ahorro PRIMARY KEY CLUSTERED (ahorroID ASC),
    CONSTRAINT FK_AhorroUsuarios FOREIGN KEY (usuarioID) REFERENCES Usuarios (usuarioID),
    CONSTRAINT FK_AhorroTipoMovimientos FOREIGN KEY (TipoMovimientosID) REFERENCES TipoMovimientos (TipoMovimientosID)
);

CREATE TABLE EgresosAhorro (
    movimientoID INT NOT NULL,
    ahorroID INT NOT NULL,
    CONSTRAINT FK_EgresosAhorro_ahorro FOREIGN KEY (ahorroID) REFERENCES Ahorro (ahorroID),
    CONSTRAINT FK_EgresosAhorro_Movimientos FOREIGN KEY (movimientoID) REFERENCES Movimientos (movimientoID)
);

CREATE TABLE Deudas (
    deudaID INT IDENTITY(1,1) NOT NULL,
    tipoDeuda NVARCHAR(50) NOT NULL,
    descripcion NVARCHAR(255),
    montoTotal DECIMAL(10, 2) NOT NULL,
    montoPagado DECIMAL(10, 2) DEFAULT 0,
    fechaInicio DATE NOT NULL,
    fechaVencimiento DATE NOT NULL,
    usuarioID INT NOT NULL,  -- Relación con el usuario
    tipoMovimientosID INT NOT NULL,  -- Relación con el TipoMovimientos
    CONSTRAINT PK_Deudas PRIMARY KEY CLUSTERED (deudaID ASC ),
    CONSTRAINT FK_DeudasUsuarios FOREIGN KEY (usuarioID) REFERENCES Usuarios (usuarioID),
    CONSTRAINT FK_DeudasTipoMovimientos FOREIGN KEY (TipoMovimientosID) REFERENCES TipoMovimientos (TipoMovimientosID)
);

CREATE TABLE EgresosDeudas (
    movimientoID INT NOT NULL,  -- Relacionado con el egreso en Movimientos
    deudaID INT NOT NULL,  -- Relacionado con la deuda
    CONSTRAINT FK_EgresosDeudas_Movimientos FOREIGN KEY (movimientoID) REFERENCES Movimientos (movimientoID),
    CONSTRAINT FK_EgresosDeudas_Deuda FOREIGN KEY (deudaID) REFERENCES Deudas (deudaID)
);

CREATE TABLE Gastos (
    gastoID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    tipoGasto NVARCHAR(50) NOT NULL,--  CHECK (tipoGasto IN ('Compra', 'Entretenimiento', 'Comida', 'Transporte', 'Otro')),
    monto DECIMAL(10, 2) NOT NULL,
    fecha DATE NOT NULL,
    descripcion NVARCHAR(255),
    usuarioID INT NOT NULL,  -- Relación con el usuario
    tipoMovimientosID INT NOT NULL,  -- Relación con el TipoMovimientos,
    CONSTRAINT FK_GastosUsuarios FOREIGN KEY (usuarioID) REFERENCES Usuarios (usuarioID),
    CONSTRAINT FK_GastosTipoMovimientos FOREIGN KEY (TipoMovimientosID) REFERENCES TipoMovimientos (TipoMovimientosID)
);

CREATE TABLE EgresosGastos (
    movimientoID INT NOT NULL,  -- Relacionado con el egreso en Movimientos
    gastoID INT NOT NULL,  -- Relacionado con el gasto
    CONSTRAINT FK_EgresosGastos_Movimientos FOREIGN KEY (movimientoID) REFERENCES Movimientos (movimientoID),
    CONSTRAINT FK_EgresosGastos_Gasto FOREIGN KEY (gastoID) REFERENCES Gastos (gastoID)
);

-- CREATE TABLE Presupuesto (
--     presupuestoID INT IDENTITY(1,1) NOT NULL,
--     tipoPresupuesto NVARCHAR(50) NOT NULL, -- ejemplo  'Mensual', 'Anual', 'Proyectado' 
--     montoPresupuestado DECIMAL(10, 2) NOT NULL,
--     fecha DATE NOT NULL,
--     usuarioID INT NOT NULL, -- Relación con el usuario
--     CONSTRAINT PK_Presupuesto PRIMARY KEY CLUSTERED (presupuestoID ASC ),
--     CONSTRAINT FK_PresupuestoUsuarios FOREIGN KEY (usuarioID) REFERENCES Usuarios (usuarioID)
-- );

-- CREATE TABLE Proyecciones (
--     proyeccionID INT IDENTITY(1,1) NOT NULL,
--     categoria NVARCHAR(50) NOT NULL,  -- Ejemplo: 'Ahorro', 'Gasto', 'Ingreso', etc.
--     montoProyectado DECIMAL(10, 2) NOT NULL,
--     fechaProyectada DATE NOT NULL,
--     descripcion NVARCHAR(255),
--     usuarioID INT NOT NULL, -- Relación con el usuario
--     CONSTRAINT PK_Proyecciones PRIMARY KEY CLUSTERED (proyeccionID ASC ),
--     CONSTRAINT FK_ProyeccionesUsuarios FOREIGN KEY (usuarioID) REFERENCES Usuarios (usuarioID)
-- );