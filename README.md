# RollingVet - Servicio Veterinario Móvil

Una aplicación web moderna para un servicio veterinario móvil especializada en el cuidado de mascotas. Desarrollada con React, Vite y Material-UI, ofrece una experiencia completa para conectar dueños de mascotas con servicios profesionales veterinarios a domicilio.

## ✨ Características

- **Servicio veterinario móvil**: Atención profesional directamente en el domicilio del cliente
- **Catálogo de productos**: Amplia gama de productos veterinarios (alimentos, juguetes, medicamentos, higiene, accesorios)
- **Gestión de pacientes**: Formularios para historia clínica digital de mascotas
- **Interfaz responsive**: Diseño moderna y adaptable a todos los dispositivos
- **Componentes reutilizables**: Arquitectura de componentes modulares con React Bootstrap y Material-UI
- **Navegación intuitiva**: Menú dinámico con efectos de cristal y funcionalidad de scroll

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** - Biblioteca principal para interfaces de usuario
- **Vite** - Herramienta de construcción rápida
- **React Router** - Navegación y enrutamiento
- **React Bootstrap** - Componentes UI responsives
- **Material-UI (@mui/material)** - Biblioteca de componentes design moderno
- **Bootswatch Minty Theme** - Tema visual elegante

### Formularios y Validación
- **React Hook Form** - Gestión de formularios
- **React Password Checklist** - Validación de contraseñas

### Utilidades
- **UUID** - Generación de identificadores únicos
- **SweetAlert2** - Alertas y modales interactivos
- **Swiper** - Componentes de carrusel
- **Emotion** - Librería de estilos CSS-in-JS

### Desarrollo
- **ESLint** - Análisis estático de código
- **ESLint Plugin React** - Reglas específicas para React

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── layout/           # Componentes de layout
│   ├── shared/           # Componentes compartidos (Menu, Footer)
│   ├── pages/            # Páginas principales
│   │   ├── inicio/       # Página de inicio
│   │   ├── producto/     # Catálogo de productos
│   │   ├── paciente/     # Gestión de pacientes
│   │   ├── administrador/# Panel de administración
│   │   ├── carro-compras/# Carrito de compras
│   │   ├── login-registro/# Autenticación
│   │   ├── sobre-nosotros/# Información de la empresa
│   │   └── error404/     # Página de error
│   └── routes/           # Configuración de rutas (pendiente)
├── assets/               # Recursos estáticos
├── index.css             # Estilos globales
└── main.jsx              # Punto de entrada
```

## 🚀 Requisitos y Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/nachodev2/rollingVet.git
   cd rollingvet
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Construye para producción:
   ```bash
   npm run build
   ```

## 📱 Funcionalidades en Desarrollo

### Implementadas ✅
- Página de inicio con sección informativa
- Catálogo de productos veterinarios
- Formulario de historia clínica de pacientes
- Componentes de navegación y layout

### Pendientes 🚧
- Sistema de enrutamiento completo (React Router)
- Panel de administración
- Funcionalidad de carrito de compras
- Sistema de autenticación de usuarios
- Integración con backend API
- Base de datos para productos, pacientes y usuarios

## 🎨 Diseño y UX

La aplicación utiliza un diseño moderno con:
- **Tema Minty** de Bootswatch para una apariencia limpia
- **Efectos visuales** como navegación cristalina al hacer scroll
- **Componentes Material-UI** para elementos avanzados
- **Responsive design** para móviles, tablets y desktop
- **Iconografía** de Bootstrap Icons

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run lint` - Ejecuta el linter
- `npm run preview` - Vista previa de la build de producción

## 🤝 Contribución

Este proyecto se encuentra en desarrollo inicial. Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 📞 Contacto

**RollingVet** - Servicio Veterinario Móvil
- Desarrollador: Nacho Dev
- GitHub: [@nachodev2](https://github.com/nachodev2)
