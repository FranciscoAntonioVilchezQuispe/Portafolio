import imagesManifest from './images-manifest.json'

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  features?: string[]
  image: string
  images?: string[]
  techs: string[]
  category: ('android' | 'backend' | 'frontend' | 'erp' | 'devops' | 'dotnet' | 'cloud')[]
  status: 'Completado' | 'En desarrollo' | 'Mantenimiento'
  github?: string
  demo?: string
  featured: boolean
}

const manifest = imagesManifest as Record<string, string[]>

export const projects: Project[] = [
  {
    id: 'sistema-comercial',
    title: 'Sistema Comercial ERP & POS',
    description:
      'Sistema de gestión comercial integral y modular diseñado para administrar ventas (POS), compras, inventario, facturación, catálogos y configuración multi-sucursal bajo una arquitectura de microservicios.',
    longDescription:
      'Un robusto sistema de gestión comercial integral y modular diseñado para optimizar las operaciones de medianas y grandes empresas en el mercado peruano. Construido bajo una arquitectura de microservicios, el sistema administra eficientemente el ciclo de ventas completo mediante un Punto de Venta (POS) optimizado para transacciones rápidas, gestión avanzada de inventarios distribuidos en múltiples almacenes, compras y catálogos de productos centralizados. El backend aprovecha el alto rendimiento de .NET 8, aislando las lecturas y escrituras de base de datos a través de CQRS para maximizar la escalabilidad, y la interfaz utiliza React y Zustand para una gestión de estado altamente responsiva y reactiva.',
    features: [
      'Facturación electrónica compatible con SUNAT UBL 2.1 (firma digital, generación de XML y envío a OSE/PSE).',
      'Punto de Venta (POS) responsivo diseñado para operaciones rápidas e ininterrumpidas.',
      'Arquitectura desacoplada en microservicios dockerizados para escalabilidad y fácil mantenimiento.',
      'Control de inventario multi-sucursal con asignación inteligente de stocks y alertas de reposición.',
      'Optimización de base de datos utilizando Entity Framework Core para escritura y consultas ultrarápidas con Dapper.'
    ],
    image: '/screenshots/sistema-comercial/thumb.png',
    images: manifest['sistema-comercial'] || [],
    techs: ['C#', '.NET 8.0', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Zustand', 'TanStack Query', 'Tailwind CSS', 'EF Core', 'Dapper'],
    category: ['dotnet', 'backend', 'frontend'],
    status: 'Completado',
    featured: true,
  },
  {
    id: 'localizacion-odoo-erp',
    title: 'Ecosistema de Localización ERP (Odoo)',
    description:
      'Módulos personalizados para extender la funcionalidad del ERP Odoo 19, enfocados en la localización tributaria peruana y automatización omnicanal integrando el chat nativo y WhatsApp (UltraMsg).',
    longDescription:
      'Suite de módulos altamente especializados diseñados para adaptar el ERP Odoo 19 a las exigencias fiscales y operativas del mercado peruano, además de automatizar la comunicación masiva con clientes. El sistema automatiza tareas clave como la consulta en tiempo real de padrones masivos de RUC y DNI directamente de la SUNAT e integra de forma nativa la mensajería de WhatsApp mediante la API de UltraMsg. Esto permite disparar avisos de cobranza automatizados, enviar facturas en formato PDF al instante tras su validación, y unificar las conversaciones de los clientes directamente dentro del chat nativo (Discuss) de Odoo, mejorando el flujo de soporte y ventas.',
    features: [
      'Consulta híbrida de datos tributarios RUC/DNI combinando bases de datos locales (padrón masivo) y APIs externas.',
      'Visualizador integrado en el systray para monitorear el tipo de cambio SUNAT en tiempo real.',
      'Envío automatizado de comprobantes de pago PDF por WhatsApp directamente desde el flujo de facturación.',
      'Integración bidireccional de WhatsApp en el módulo de chat interno (Discuss) de Odoo.',
      'Arquitectura modular estructurada con Odoo 19 y Python, garantizando un rendimiento óptimo y estabilidad.'
    ],
    image: '/screenshots/localizacion-odoo-erp/thumb.png',
    images: manifest['localizacion-odoo-erp'] || [],
    techs: ['Python', 'Odoo 19', 'PostgreSQL', 'XML', 'Docker', 'WhatsApp API', 'UltraMsg'],
    category: ['erp', 'backend'],
    status: 'Completado',
    featured: true,
  },
  {
    id: 'factuapp-android',
    title: 'FactuApp (Movilidad Corporativa)',
    description:
      'Aplicación móvil Android nativa para fuerza de ventas y gestión en campo, integrada directamente con Odoo vía JSON-RPC. Permite la emisión de comprobantes y escaneo rápido con IA.',
    longDescription:
      'Aplicación móvil Android nativa diseñada para potenciar la fuerza de ventas en campo y agilizar la toma de requerimientos. FactuApp se conecta de forma directa al servidor central de Odoo consumiendo servicios remotos vía JSON-RPC con persistencia de sesiones de usuario segura. La aplicación permite buscar y crear contactos, verificar listas de precios en tiempo real, emitir comprobantes de venta oficiales en el punto de entrega y procesar de forma automatizada códigos de barra gracias a un motor de reconocimiento visual embebido con inteligencia artificial utilizando Google ML Kit.',
    features: [
      'Comunicación en tiempo real con Odoo mediante llamadas seguras JSON-RPC.',
      'Modo offline con sincronización en segundo plano de datos de clientes y productos.',
      'Escáner inteligente de códigos de barra integrado en el celular usando Google ML Kit (ML Scanner).',
      'Diseño visual moderno adaptado al 100% a la guía de diseño Material 3 mediante Jetpack Compose.',
      'Inyección de dependencias modularizada con Dagger Hilt y asincronía optimizada con Kotlin Coroutines.'
    ],
    image: '/screenshots/factuapp-android/thumb.png',
    images: manifest['factuapp-android'] || [],
    techs: ['Android', 'Kotlin', 'Material 3', 'Retrofit', 'Google ML Kit', 'JSON-RPC', 'Coroutines', 'Hilt'],
    category: ['android'],
    status: 'Completado',
    featured: true,
  },
  {
    id: 'asistente-productividad-aurix',
    title: 'Asistente Inteligente de Productividad',
    description:
      'Plataforma web y servicio backend que centraliza la productividad profesional unificando integraciones en la nube (Google y Microsoft) y procesamiento de audios con Inteligencia Artificial.',
    longDescription:
      'Una avanzada plataforma web y de servicio backend diseñada para automatizar el flujo de trabajo diario de un profesional. El asistente unifica de manera transparente cuentas de Microsoft Graph (Outlook, Calendar, OneDrive) y Google APIs (Gmail, Calendar, Drive), permitiendo transcribir reuniones y notas de audio extensas con OpenAI Whisper, resumir minutas estructuradas con GPT-4o, gestionar un chat inteligente contextual con acceso a tus archivos en la nube y disparar alertas o notificaciones automatizadas a través de WhatsApp mediante Twilio SDK. El backend está construido bajo un enfoque asíncrono y distribuido utilizando FastAPI, Celery y Redis sobre bases de datos relacionales PostgreSQL.',
    features: [
      'Transcripción de audios de larga duración con segmentación automatizada y OpenAI Whisper.',
      'Integración unificada con flujos de autenticación OAuth 2.0 para Microsoft Graph y Google APIs.',
      'Chat inteligente con contexto local, acceso directo a tus correos y archivos adjuntos de nubes.',
      'Envío automatizado de resúmenes de reuniones y alertas directamente a WhatsApp vía Twilio.',
      'Arquitectura de tareas en segundo plano optimizada con Celery, Redis y consultas asíncronas con SQLAlchemy.'
    ],
    image: '/screenshots/asistente-productividad-aurix/thumb.png',
    images: manifest['asistente-productividad-aurix'] || [],
    techs: ['FastAPI', 'Python', 'React', 'Tailwind CSS', 'OpenAI API', 'Microsoft Graph', 'Google APIs', 'PostgreSQL', 'Celery', 'Redis', 'WebSockets'],
    category: ['backend', 'frontend', 'cloud'],
    status: 'En desarrollo',
    featured: true,
  },
  {
    id: 'telemedicina',
    title: 'Plataforma de Telemedicina',
    description:
      'Sistema integral de telemedicina con backend en FastAPI (Python), frontend responsivo en React y módulo de IA para soporte de diagnóstico. Todo containerizado en Docker.',
    longDescription:
      'Solución tecnológica de telesalud que conecta de manera directa a médicos y pacientes a través de videoconsultas, gestión de citas virtuales y expedientes clínicos digitales. El backend aprovecha la asincronía de FastAPI en Python para soportar múltiples conexiones concurrentes sin pérdida de rendimiento, mientras que el frontend construido en React proporciona una experiencia responsiva y amigable. El sistema incorpora de forma experimental modelos de aprendizaje automático para ofrecer un soporte preliminar de diagnóstico al personal médico basándose en análisis de síntomas tabulados.',
    features: [
      'Videoconsultas fluidas en tiempo real con canales de comunicación seguros y encriptados.',
      'Módulo de Inteligencia Artificial para asistencia preliminar de diagnóstico médico.',
      'Diseño responsivo de cliente web adaptado a pantallas de móviles y tablets con React.',
      'Infraestructura containerizada con Docker Compose que facilita despliegues homogéneos.',
      'Base de datos segura PostgreSQL estructurando historiales médicos de forma confidencial.'
    ],
    image: '/screenshots/telemedicina/thumb.png',
    images: manifest['telemedicina'] || [],
    techs: ['Python', 'FastAPI', 'React', 'Docker', 'PostgreSQL'],
    category: ['backend', 'frontend'],
    status: 'En desarrollo',
    featured: false,
  },
  {
    id: 'distribucion-carnica-milagros',
    title: 'Sistema de Gestión de Despachos & Cobranzas',
    description:
      'Sistema web local (Python + Streamlit + SQLite) para control logístico y comercial de distribución cárnica y avícola: despachos por sector y cliente, control de duplicados, liquidación de cobranzas con reportes PDF/Excel y auditoría integral.',
    longDescription:
      'Sistema integral de gestión comercial y logística diseñado específicamente para la distribución mayorista de productos cárnicos y avícolas en el mercado peruano. Desarrollado con una arquitectura local de alta confiabilidad en Python, Streamlit y SQLite (modo WAL), el sistema gestiona de extremo a extremo el ciclo de despacho nocturno por sector y cliente, calculando equivalencias de piezas de res y cerdo. Cuenta con un motor de prevención de duplicados, valorización de listas de precios históricas escalonadas por fecha de vigencia, control riguroso de antigüedad de deuda en soles (0-7, 8-15, 16-30 y >30 días) y liquidaciones periódicas automatizadas con exportación de documentos oficiales en PDF (FPDF2) y hojas de cobranza en Excel (OpenPyXL). Además, incorpora un pipeline de importación inteligente desde planillas Excel legacy, un servidor de sincronización LAN para la app de choferes y un sistema de respaldos automáticos con protección de contingencia.',
    features: [
      'Control logístico de despachos nocturnos por sector y cliente con cálculo de piezas y equivalencias de res.',
      'Motor de liquidación y cobranzas periódicas con generación automática de documentos PDF y planillas Excel.',
      'Seguimiento de saldos en soles, control de anticipos, excedentes a favor y análisis de antigüedad de deuda.',
      'Sistema de importación y conciliación de archivos Excel históricos con resolución asistida de discrepancias.',
      'Arquitectura resiliente con SQLite WAL, auditoría transaccional de cambios y respaldos automáticos en caliente.'
    ],
    image: '/screenshots/distribucion-carnica-milagros/thumb.png',
    images: manifest['distribucion-carnica-milagros'] || [],
    techs: ['Python', 'Streamlit', 'SQLite', 'Pandas', 'FPDF2', 'OpenPyXL', 'Ruff', 'Pytest'],
    category: ['backend', 'frontend', 'erp'],
    status: 'Completado',
    featured: true,
  },
  {
    id: 'carga-milagros-movil',
    title: 'Carga Milagros (App Móvil para Choferes)',
    description:
      'Aplicación móvil Android offline-first para choferes y despachadores de campo: registro de cargas nocturnas sin conexión, exportación de reportes a PDF/imagen y sincronización bidireccional Wi-Fi con el servidor local.',
    longDescription:
      'Aplicación móvil Android nativa diseñada para choferes y personal de despacho en rutas de distribución logística nocturna. Construida bajo una arquitectura limpia (Clean Architecture) con Jetpack Compose y Material 3, la aplicación opera bajo un paradigma offline-first estricto, permitiendo registrar lotes de carga, piezas y clientes en zonas sin cobertura celular ni acceso a internet. Incorpora lógica de jornada laboral nocturna que cruza la medianoche, generación de reportes visuales instantáneos exportables a PDF o imagen bitmap para compartir por WhatsApp, y un protocolo de sincronización bidireccional en red de área local (LAN / Wi-Fi) mediante HTTP/JSON contra el sistema central en laptop mediante emparejamiento rápido por código QR, garantizando cero pérdida de datos en campo.',
    features: [
      'Arquitectura Offline-First con persistencia local en SQLite para operaciones continuas sin conectividad.',
      'Interfaz moderna y reactiva construida al 100% con Jetpack Compose y Material 3.',
      'Sincronización bidireccional automática sobre red local Wi-Fi vía HTTP/JSON con el sistema central.',
      'Generación y exportación de reportes de carga en formato PDF y bitmap para compartir en campo.',
      'Módulo de emparejamiento instantáneo con la estación base mediante escaneo y lectura de código QR.'
    ],
    image: '/screenshots/carga-milagros-movil/thumb.png',
    images: manifest['carga-milagros-movil'] || [],
    techs: ['Android', 'Kotlin', 'Jetpack Compose', 'Material 3', 'SQLite', 'Coroutines', 'HTTP Client', 'JUnit'],
    category: ['android'],
    status: 'Completado',
    featured: true,
  },
]
