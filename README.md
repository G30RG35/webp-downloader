# WebP Image Downloader - Extensión de Blog Wix

Este script es parte de una extensión diseñada para exportar y procesar notas de un blog de Wix. Su función principal es descargar imágenes desde URLs especificadas en un archivo JSON exportado por la extensión y convertirlas automáticamente al formato WebP optimizado.

## 🎯 Propósito

Este componente forma parte de un sistema más amplio de exportación de contenido de blogs Wix que:

- **Exporta notas y entradas** del blog de Wix a formato JSON estructurado
- **Procesa imágenes automáticamente** convirtiéndolas a WebP para optimizar el almacenamiento
- **Mantiene la estructura original** de las entradas del blog
- **Facilita la migración** de contenido de Wix a otros sistemas

## ✨ Características

### Funcionalidades Principales
- ✅ **Integración con extensión Wix**: Lee archivos JSON exportados por la extensión del blog
- ✅ **Descarga automática de imágenes**: Procesa todas las imágenes referenciadas en las notas
- ✅ **Conversión optimizada**: Convierte automáticamente a formato WebP con calidad 85%
- ✅ **Nomenclatura inteligente**: Asigna nombres personalizados basados en la estructura del blog
- ✅ **Gestión de directorios**: Crea automáticamente la carpeta "imagenes" para organizar el contenido

### Optimizaciones Técnicas
- ✅ **Control de concurrencia**: Procesa 3 imágenes simultáneamente para optimizar velocidad
- ✅ **Manejo robusto de errores**: Continúa el proceso aunque algunas imágenes fallen
- ✅ **Timeout configurado**: 30 segundos por imagen para evitar bloqueos
- ✅ **Reporte de progreso**: Muestra estadísticas en tiempo real del proceso

## 🚀 Instalación

1. **Clonar o descargar** el proyecto de la extensión Wix
2. **Instalar dependencias**:
```bash
npm install
```

## 📖 Uso

### Requisitos Previos
- Tener un archivo JSON exportado por la extensión del blog Wix (ej: `wix-blog-export-2025-08-01.json`)
- El archivo debe estar en el directorio raíz del proyecto

### Ejecución
```bash
# Opción 1: Usando npm script
npm start

# Opción 2: Ejecución directa
node downloader.js
```

## 📋 Estructura del JSON de la Extensión Wix

El script espera un archivo JSON con la siguiente estructura, generado por la extensión del blog:

```json
{
  "entradas": [
    {
      "fecha": "2025-06-17",
      "notas": [
        {
          "texto": "Descripción de la nota del blog",
          "imagen": "159.webp",
          "url": "https://static.wixstatic.com/media/ejemplo.jpg"
        },
        {
          "texto": "Otra nota con imagen",
          "imagen": "160.webp", 
          "url": "https://static.wixstatic.com/media/otra-imagen.jpg"
        }
      ]
    },
    {
      "fecha": "2025-06-18",
      "notas": [
        {
          "texto": "Nota de otro día",
          "imagen": "161.webp",
          "url": "https://static.wixstatic.com/media/nueva-imagen.jpg"
        }
      ]
    }
  ]
}
```

### Campos del JSON
- **`entradas`**: Array de entradas del blog organizadas por fecha
- **`fecha`**: Fecha de la entrada en formato YYYY-MM-DD
- **`notas`**: Array de notas individuales dentro de cada entrada
- **`texto`**: Contenido textual de la nota
- **`imagen`**: Nombre del archivo de imagen (con extensión .webp)
- **`url`**: URL completa de la imagen en los servidores de Wix

## 📁 Resultado del Procesamiento

### Estructura de Archivos Generada
```
proyecto/
├── downloader.js
├── wix-blog-export-2025-08-01.json
├── imagenes/
│   ├── 159.webp
│   ├── 160.webp
│   ├── 161.webp
│   └── ...
└── README.md
```

### Características de las Imágenes Procesadas
- **Formato**: WebP optimizado
- **Calidad**: 85% (balance entre calidad y tamaño)
- **Nomenclatura**: Basada en el campo `imagen` del JSON
- **Organización**: Todas las imágenes en la carpeta `imagenes/`

## 🔧 Dependencias

### Principales
- **sharp**: Librería de procesamiento de imágenes para conversión a WebP
- **axios**: Cliente HTTP para descarga de imágenes desde URLs de Wix

### Instalación
```bash
npm install sharp axios
```

## ⚙️ Configuración Avanzada

### Parámetros Ajustables en el Código
- **Concurrencia**: `batchSize = 3` (imágenes procesadas simultáneamente)
- **Timeout**: `30000ms` (30 segundos por imagen)
- **Calidad WebP**: `quality: 85` (balance calidad/tamaño)
- **Pausa entre lotes**: `1000ms` (1 segundo entre grupos de imágenes)

## 📊 Monitoreo y Reportes

El script proporciona información detallada durante la ejecución:

```
📁 Carpeta "imagenes" creada
🔍 Encontradas 15 imágenes para descargar
📥 Descargando: 159.webp
✅ Guardado: 159.webp
📊 Progreso: 1/15 (1 exitosas)
...
🎉 Proceso completado!
✅ Imágenes descargadas exitosamente: 14
❌ Imágenes con errores: 1
```

## 🔄 Flujo de Trabajo Completo

1. **Exportación desde Wix**: La extensión exporta el contenido del blog a JSON
2. **Procesamiento de imágenes**: Este script descarga y convierte las imágenes
3. **Organización**: Las imágenes se almacenan localmente con nombres estructurados
4. **Migración**: El contenido está listo para importar en otros sistemas

## 🛠️ Solución de Problemas

### Errores Comunes
- **Timeout en descargas**: Aumentar el valor de timeout en el código
- **Errores de red**: Verificar conectividad y URLs válidas
- **Permisos de escritura**: Asegurar permisos en la carpeta del proyecto

### Logs de Debug
El script muestra información detallada de cada operación para facilitar la depuración.

## 📝 Notas de Desarrollo

- Diseñado específicamente para trabajar con la estructura JSON de la extensión Wix
- Optimizado para manejar grandes volúmenes de imágenes de blogs
- Compatible con diferentes formatos de imagen de entrada (JPG, PNG, etc.)
- Preparado para integración con sistemas de migración de contenido

---

**Desarrollado como parte del sistema de exportación de blogs Wix** 🚀
