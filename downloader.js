const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const axios = require('axios');

// Función para crear la carpeta de destino si no existe
function createImageDirectory() {
    const imageDir = path.join(__dirname, 'imagenes');
    if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, { recursive: true });
        console.log('📁 Carpeta "imagenes" creada');
    }
    return imageDir;
}

// Función para descargar una imagen y convertirla a WebP
async function downloadAndConvertToWebP(url, filename, outputDir) {
    try {
        console.log(`📥 Descargando: ${filename}`);
        
        // Descargar la imagen
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'arraybuffer',
            timeout: 30000, // 30 segundos timeout
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        // Convertir a WebP usando Sharp
        const outputPath = path.join(outputDir, filename);
        await sharp(response.data)
            .webp({ quality: 85 })
            .toFile(outputPath);

        console.log(`✅ Guardado: ${filename}`);
        return true;
    } catch (error) {
        console.error(`❌ Error al procesar ${filename}:`, error.message);
        return false;
    }
}

// Función principal
async function processImages() {
    try {
        // Leer el archivo JSON
        const jsonPath = path.join(__dirname, 'wix-blog-export-2025-08-01.json');
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        
        // Crear directorio de imágenes
        const imageDir = createImageDirectory();
        
        // Extraer todas las imágenes
        const imagesToDownload = [];
        
        jsonData.entradas.forEach(entrada => {
            entrada.notas.forEach(nota => {
                if (nota.url && nota.imagen) {
                    imagesToDownload.push({
                        url: nota.url,
                        filename: nota.imagen
                    });
                }
            });
        });

        console.log(`🔍 Encontradas ${imagesToDownload.length} imágenes para descargar`);
        
        // Procesar imágenes con control de concurrencia
        const batchSize = 3; // Procesar 3 imágenes a la vez
        let processed = 0;
        let successful = 0;
        
        for (let i = 0; i < imagesToDownload.length; i += batchSize) {
            const batch = imagesToDownload.slice(i, i + batchSize);
            
            const promises = batch.map(async (image) => {
                const result = await downloadAndConvertToWebP(image.url, image.filename, imageDir);
                processed++;
                if (result) successful++;
                
                // Mostrar progreso
                console.log(`📊 Progreso: ${processed}/${imagesToDownload.length} (${successful} exitosas)`);
                
                return result;
            });
            
            await Promise.all(promises);
            
            // Pequeña pausa entre lotes para no sobrecargar el servidor
            if (i + batchSize < imagesToDownload.length) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        
        console.log(`\n🎉 Proceso completado!`);
        console.log(`✅ Imágenes descargadas exitosamente: ${successful}`);
        console.log(`❌ Imágenes con error: ${processed - successful}`);
        console.log(`📁 Ubicación: ${imageDir}`);
        
    } catch (error) {
        console.error('💥 Error en el proceso principal:', error.message);
    }
}

// Ejecutar el script
console.log('🚀 Iniciando descarga de imágenes...\n');
processImages();
