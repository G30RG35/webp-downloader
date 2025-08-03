# WebP Image Downloader

Este script descarga imágenes desde URLs especificadas en un archivo JSON y las convierte automáticamente al formato WebP.

## Características

- ✅ Lee URLs de imágenes desde archivo JSON
- ✅ Descarga imágenes automáticamente
- ✅ Convierte a formato WebP con calidad optimizada
- ✅ Asigna nombres personalizados a cada imagen
- ✅ Crea carpeta "imagenes" automáticamente
- ✅ Control de concurrencia para no sobrecargar servidores
- ✅ Manejo de errores y reporte de progreso

## Instalación

1. Instalar las dependencias:
```bash
npm install
```

## Uso

1. Asegúrate de que el archivo `wix-blog-export-2025-08-01.json` esté en el directorio raíz
2. Ejecutar el script:
```bash
npm start
```
O directamente:
```bash
node downloader.js
```

## Estructura del JSON esperada

```json
{
  "entradas": [
    {
      "fecha": "2025-06-17",
      "notas": [
        {
          "texto": "Descripción",
          "imagen": "159.webp",
          "url": "https://ejemplo.com/imagen.jpg"
        }
      ]
    }
  ]
}
```

## Resultado

- Las imágenes se guardarán en la carpeta `imagenes/`
- Cada imagen tendrá el nombre especificado en el campo `imagen` del JSON
- Formato de salida: WebP con calidad 85%

## Dependencias

- **sharp**: Para la conversión de imágenes a WebP
- **axios**: Para la descarga de imágenes desde URLs

## Notas

- El script procesa 3 imágenes simultáneamente para optimizar velocidad
- Incluye timeout de 30 segundos por imagen
- Maneja errores individualmente sin detener el proceso completo
