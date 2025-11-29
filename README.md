## Documentación del Proyecto CafeteriaApp

## Resumen del Proyecto

**CafeteriaApp** es una aplicación web full-stack para la gestión de pedidos de una cafetería. El sistema permite a los clientes realizar pedidos de diferentes tipos de café y a los baristas gestionar y actualizar el estado de dichos pedidos en tiempo real.


### 1. Sistema de Autenticación y Autorización

#### Backend - AuthController
**Ruta**: `/api/auth`

##### Endpoint de Login
- **POST** `/api/auth/login`
- **Descripción**: Autentica usuarios y genera un token de sesión
- **Request Body**:
  ```json
  {
    "email": "usuario@example.com",
    "password": "contraseña"
  }
  ```
- **Response**:
  ```json
  {
    "email": "usuario@example.com",
    "rol": "CLIENTE|BARISTA",
    "token": "token_123_1234567890"
  }
  ```

#### Servicio de Autenticación (AuthService)
**Funcionalidades**:
- Validación de credenciales (email y contraseña)
- Verificación de existencia de usuario en la base de datos
- Generación de token simple (formato: `token_{userId}_{timestamp}`)
- Retorno de información del usuario autenticado (email, rol, token)

**Nota de Seguridad**: Actualmente se usa un token simple.

#### Entidad Usuario
**Campos**:
- `id` (Long): Identificador único auto-generado
- `email` (String): Email único del usuario, con validación de formato
- `password` (String): Contraseña del usuario (en texto plano - se recomienda encriptar en producción)
- `rol` (String): Rol del usuario ("CLIENTE" o "BARISTA")

**Validaciones**:
- Email obligatorio y con formato válido
- Email único en el sistema
- Contraseña obligatoria
- Rol obligatorio

#### Frontend - Flujo de Autenticación

##### 1. Selección de Rol (RoleSelector)
- Pantalla inicial donde el usuario selecciona su rol (Cliente o Barista)
- Redirige a la página de login con el rol seleccionado

##### 2. Página de Login (LoginPage)
- Formulario de autenticación con validación de campos
- Verificación de que el rol del usuario coincida con el rol seleccionado
- Almacenamiento en localStorage de:
  - `userRole`: Rol del usuario
  - `userEmail`: Email del usuario
  - `authToken`: Token de autenticación
- Redirección automática según el rol:
  - Cliente → `/cliente`
  - Barista → `/barista`

##### 3. Rutas Protegidas (ProtectedRoute)
- Componente HOC que protege rutas según el rol del usuario
- Verifica la autenticación y el rol antes de permitir el acceso
- Redirige a la página de login si no está autenticado o no tiene el rol correcto

---

### 2. Gestión de Menú de Cafés

#### Backend - CafeController
**Ruta**: `/api/menu`

##### Endpoints:

**1. Obtener Menú Completo**
- **GET** `/api/menu`
- **Descripción**: Retorna todos los productos de café disponibles
- **Response**:
  ```json
  [
    {
      "id": 1,
      "nombre": "Espresso",
      "precio": 2.50,
      "ingredientes": "Café expreso",
      "imagenUrl": "/images/espresso.png"
    }
  ]
  ```

**2. Agregar Nuevo Café**
- **POST** `/api/menu`
- **Descripción**: Permite agregar un nuevo producto al menú
- **Request Body**:
  ```json
  {
    "nombre": "Cappuccino",
    "precio": 3.50,
    "ingredientes": "Espresso, leche vaporizada, espuma de leche",
    "imagenUrl": "/images/cappuccino.png"
  }
  ```

#### Entidad Cafe
**Campos**:
- `id` (Long): Identificador único
- `nombre` (String): Nombre del café
- `precio` (double): Precio del producto
- `ingredientes` (String): Descripción de ingredientes
- `imagenUrl` (String): URL de la imagen del producto

#### Servicio CafeService
**Métodos**:
- `obtenerMenu()`: Retorna la lista completa de cafés
- `guardarCafe(Cafe cafe)`: Guarda un nuevo café en la base de datos

#### Frontend - MenuList Component
- Muestra el catálogo de cafés disponibles con imágenes
- Permite agregar productos al carrito de compras
- Muestra precio e ingredientes de cada producto
- Diseño responsivo con tarjetas visuales

---

### 3. Sistema de Gestión de Pedidos

#### Backend - OrderController
**Ruta**: `/api/orders`

##### Endpoints:

**1. Realizar Pedido (Cliente)**
- **POST** `/api/orders`
- **Descripción**: Crea un nuevo pedido
- **Request Body**:
  ```json
  {
    "userEmail": "cliente@example.com",
    "items": [
      {
        "cafeId": 1,
        "cantidad": 2
      },
      {
        "cafeId": 3,
        "cantidad": 1
      }
    ]
  }
  ```
- **Response**: Objeto Order completo con ID generado y estado "PENDIENTE"
- **Validaciones**:
  - La lista de ítems no puede estar vacía
  - Los productos deben existir en el menú
  - Se calcula automáticamente el total del pedido

**2. Obtener Todas las Órdenes (Barista/Gerente)**
- **GET** `/api/orders`
- **Descripción**: Retorna todas las órdenes del sistema
- **Response**: Array de OrderResponseDTO con información detallada

**3. Obtener Órdenes por Usuario (Cliente)**
- **GET** `/api/orders/user/{email}`
- **Descripción**: Retorna las órdenes específicas de un usuario
- **Path Variable**: `email` - Email del usuario

**4. Obtener Orden por ID**
- **GET** `/api/orders/{id}`
- **Descripción**: Retorna una orden específica
- **Path Variable**: `id` - ID de la orden

**5. Actualizar Estado de Orden (Barista)**
- **PUT** `/api/orders/{id}/state`
- **Descripción**: Actualiza el estado de una orden
- **Path Variable**: `id` - ID de la orden
- **Request Body**: String con el nuevo estado
- **Estados Válidos**:
  - `PENDIENTE`: Orden recién creada
  - `PREPARANDO`: Orden en proceso de preparación
  - `LISTO`: Orden lista para entregar

#### Entidades del Sistema de Pedidos

##### Order (Orden)
**Campos**:
- `id` (Long): Identificador único
- `total` (double): Total a pagar
- `estado` (String): Estado actual del pedido
- `fechaCreacion` (LocalDateTime): Fecha y hora de creación
- `items` (List<OrderItem>): Lista de productos del pedido
- `usuario` (Usuario): Usuario que realizó el pedido

**Relaciones**:
- OneToMany con OrderItem (cascada completa)
- ManyToOne con Usuario

##### OrderItem (Item de Orden)
**Campos**:
- `id` (Long): Identificador único
- `order` (Order): Orden a la que pertenece
- `cafe` (Cafe): Producto de café
- `cantidad` (int): Cantidad de unidades
- `subtotal` (double): Precio total del ítem (precio × cantidad)

**Relaciones**:
- ManyToOne con Order
- ManyToOne con Cafe

#### Servicio OrderService
**Métodos Principales**:

1. **crearOrden(List<ItemOrderDTO> items, String userEmail)**
   - Valida que todos los productos existan en el menú
   - Calcula el total del pedido
   - Asocia la orden al usuario
   - Crea los OrderItem correspondientes
   - Guarda la orden con estado "PENDIENTE"
   - Retorna la orden creada

2. **obtenerTodasLasOrdenes()**
   - Retorna todas las órdenes del sistema
   - Convierte a OrderResponseDTO para enviar al frontend

3. **obtenerOrdenesPorUsuario(String userEmail)**
   - Filtra y retorna solo las órdenes del usuario especificado
   - Valida que el usuario exista

4. **GetOrderById(Long id)**
   - Retorna una orden específica por su ID
   - Lanza excepción NotFoundException si no existe

5. **updateStateOrder(Long id, String nuevoEstado)**
   - Actualiza el estado de una orden existente
   - Valida que la orden exista
   - Guarda y retorna la orden actualizada

#### DTOs (Data Transfer Objects)

##### CreateOrderRequest
- `userEmail` (String): Email del usuario
- `items` (List<ItemOrderDTO>): Lista de ítems del pedido

##### ItemOrderDTO
- `cafeId` (Long): ID del café
- `cantidad` (int): Cantidad a ordenar

##### OrderResponseDTO
- `id` (Long): ID de la orden
- `total` (double): Total del pedido
- `estado` (String): Estado actual
- `fechaCreacion` (LocalDateTime): Fecha de creación
- `items` (List<OrderItemDTO>): Detalles de los ítems

##### OrderItemDTO
- `cafeId` (Long): ID del café
- `nombreCafe` (String): Nombre del café
- `ingredientes` (String): Ingredientes
- `precio` (double): Precio unitario
- `cantidad` (int): Cantidad ordenada
- `subtotal` (double): Subtotal del ítem

#### Frontend - Gestión de Pedidos

##### Cliente (ClientePage)
**Componentes**:
- **MenuList**: Catálogo de productos disponibles
- **Cart**: Carrito de compras interactivo
- **ClientNotifications**: Notificaciones en tiempo real del estado de pedidos

**Funcionalidades**:
- Agregar productos al carrito
- Modificar cantidades
- Eliminar productos del carrito
- Realizar pedido (envía a backend)
- Ver historial de pedidos propios
- Recibir notificaciones de cambios de estado

##### Barista (BaristaPage)
**Componentes**:
- **OrdersList**: Lista de todas las órdenes del sistema

**Funcionalidades**:
- Ver todas las órdenes activas
- Actualizar estado de órdenes:
  - Marcar como "PREPARANDO"
  - Marcar como "LISTO"
- Ver detalles completos de cada orden
- Filtrar por estado
- Ver información del cliente

---

### 4. Sistema de Seguridad

#### SecurityConfig
**Configuración de Spring Security**:

**CORS (Cross-Origin Resource Sharing)**:
- Origen permitido: `http://localhost:3000`
- Métodos permitidos: GET, POST, PUT, DELETE, OPTIONS
- Headers: Todos permitidos
- Credenciales: Habilitadas

**Autorización**:
- Rutas `/api/**`: Acceso público (permitAll)
- Otras rutas: Requieren autenticación
- CSRF: Deshabilitado (común en APIs REST)

---

### 5. Manejo de Excepciones

#### GlobalExceptionHandler
**Manejo centralizado de errores**:
- Captura excepciones en toda la aplicación
- Retorna respuestas HTTP estandarizadas
- Registra logs de errores

#### NotFoundException
**Excepción personalizada**:
- Se lanza cuando no se encuentra un recurso
- Retorna código HTTP 404
- Mensaje descriptivo del recurso no encontrado

**Casos de Uso**:
- Usuario no encontrado
- Orden no encontrada
- Producto de café no encontrado

---

##  Base de Datos

### Repositorios (Spring Data JPA)

#### CafeRepository
```java
public interface CafeRepository extends JpaRepository<Cafe, Long>
```
- Operaciones CRUD automáticas para la entidad Cafe

#### OrderRepository
```java
public interface OrderRepository extends JpaRepository<Order, Long>
```
- Operaciones CRUD automáticas para la entidad Order

#### UsuarioRepository
```java
public interface UsuarioRepository extends JpaRepository<Usuario, Long>
```
- Operaciones CRUD automáticas para la entidad Usuario
- Método personalizado: `Optional<Usuario> findByEmail(String email)`

### Modelo de Datos

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│   Usuario   │       │    Order     │       │    Cafe     │
├─────────────┤       ├──────────────┤       ├─────────────┤
│ id (PK)     │──┐    │ id (PK)      │    ┌──│ id (PK)     │
│ email       │  │    │ total        │    │  │ nombre      │
│ password    │  │    │ estado       │    │  │ precio      │
│ rol         │  │    │ fechaCreacion│    │  │ ingredientes│
└─────────────┘  │    │usuario_id(FK)│    │  │ imagenUrl   │
                 │    └──────────────┘    │  └─────────────┘
                 │            │           │
                 └────────────┤           │
                              │           │
                    ┌─────────┴──────┐    │
                    │   OrderItem    │    │
                    ├────────────────┤    │
                    │ id (PK)        │    │
                    │ order_id (FK)  │────┘
                    │ cafe_id (FK)   │────┘
                    │ cantidad       │
                    │ subtotal       │
                    └────────────────┘
```

## Endpoints API

| Método | Endpoint | Descripción | Rol Requerido |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | Iniciar sesión | Público |
| GET | `/api/menu` | Obtener menú completo | Público |
| POST | `/api/menu` | Agregar café al menú | Gerente |
| POST | `/api/orders` | Crear nuevo pedido | Cliente |
| GET | `/api/orders` | Listar todas las órdenes | Barista |
| GET | `/api/orders/user/{email}` | Órdenes de un usuario | Cliente |
| GET | `/api/orders/{id}` | Obtener orden por ID | Barista |
| PUT | `/api/orders/{id}/state` | Actualizar estado | Barista |

---

## 🔐 Usuarios de Prueba

### Para Pruebas Locales
*Nota: Estos usuarios deben ser creados en la base de datos inicialmente o mediante un DataLoader*

**Cliente**:
- Email: `cliente@cafeteria.com`
- Password: `cliente123`
- Rol: `CLIENTE`

**Barista**:
- Email: `barista@cafeteria.com`
- Password: `barista123`
- Rol: `BARISTA`

---

##  Estructura del Proyecto

```
CafeteriaApp/
├── src/
│   ├── main/
│   │   ├── java/com/project/cafeteria/cafeteriaapp/
│   │   │   ├── CafeteriaAppApplication.java    # Clase principal
│   │   │   ├── ServletInitializer.java         # Inicializador servlet
│   │   │   ├── config/
│   │   │   │   └── SecurityConfig.java         # Configuración seguridad
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java         # Control autenticación
│   │   │   │   ├── CafeController.java         # Control menú
│   │   │   │   └── OrderController.java        # Control pedidos
│   │   │   ├── dto/
│   │   │   │   ├── CreateOrderRequest.java     # DTO crear orden
│   │   │   │   ├── ItemOrderDTO.java           # DTO item
│   │   │   │   ├── LoginRequest.java           # DTO login
│   │   │   │   ├── LoginResponse.java          # DTO respuesta login
│   │   │   │   ├── OrderItemDTO.java           # DTO item respuesta
│   │   │   │   └── OrderResponseDTO.java       # DTO orden respuesta
│   │   │   ├── entity/
│   │   │   │   ├── Cafe.java                   # Entidad Cafe
│   │   │   │   ├── Order.java                  # Entidad Order
│   │   │   │   ├── OrderItem.java              # Entidad OrderItem
│   │   │   │   └── Usuario.java                # Entidad Usuario
│   │   │   ├── exceptions/
│   │   │   │   ├── GlobalExceptionHandler.java # Manejo global errores
│   │   │   │   └── NotFoundException.java      # Excepción no encontrado
│   │   │   ├── repository/
│   │   │   │   ├── CafeRepository.java         # Repositorio Cafe
│   │   │   │   ├── OrderRepository.java        # Repositorio Order
│   │   │   │   └── UsuarioRepository.java      # Repositorio Usuario
│   │   │   └── service/
│   │   │       ├── AuthService.java            # Lógica autenticación
│   │   │       ├── CafeService.java            # Lógica menú
│   │   │       └── OrderService.java           # Lógica pedidos
│   │   └── resources/
│   │       └── application.properties          # Configuración app
│   └── test/
│       └── java/                               # Tests unitarios
├── frontend/
│   ├── public/
│   │   ├── images/                             # Imágenes productos
│   │   │   ├── americano.png
│   │   │   ├── cappuccino.png
│   │   │   ├── espresso.png
│   │   │   ├── irish.png
│   │   │   ├── latte.png
│   │   │   └── mocca.png
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Cart.jsx                        # Carrito compras
│   │   │   ├── ClientNotifications.jsx         # Notificaciones
│   │   │   ├── Loader.jsx                      # Componente carga
│   │   │   ├── MenuList.jsx                    # Lista menú
│   │   │   ├── Navbar.jsx                      # Barra navegación
│   │   │   ├── OrdersList.jsx                  # Lista órdenes
│   │   │   └── ProtectedRoute.jsx              # Rutas protegidas
│   │   ├── pages/
│   │   │   ├── BaristaPage.jsx                 # Página barista
│   │   │   ├── ClientePage.jsx                 # Página cliente
│   │   │   ├── LoginPage.jsx                   # Página login
│   │   │   └── RoleSelector.jsx                # Selector rol
│   │   ├── services/
│   │   │   └── api.js                          # Cliente HTTP
│   │   ├── App.jsx                             # Componente principal
│   │   ├── index.js                            # Entry point
│   │   └── index.css                           # Estilos globales
│   ├── package.json                            # Dependencias npm
│   └── tailwind.config.js                      # Config Tailwind
├── pom.xml                                     # Dependencias Maven
└── README.md                                   # Este archivo
```
