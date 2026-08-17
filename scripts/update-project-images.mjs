import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Obtener el directorio actual equivalente en ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Rutas absolutas del proyecto
const projectRoot = path.join(__dirname, '..')
const screenshotsDir = path.join(projectRoot, 'public', 'screenshots')
const manifestFile = path.join(projectRoot, 'src', 'data', 'images-manifest.json')

console.log('🤖 Escaneando capturas de pantalla físicas...')

function updateManifest() {
  const manifest = {}

  if (!fs.existsSync(screenshotsDir)) {
    console.warn(`⚠️ La carpeta de capturas de pantalla no existe en: ${screenshotsDir}`)
    fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2))
    return
  }

  try {
    const folders = fs.readdirSync(screenshotsDir)

    for (const folder of folders) {
      const folderPath = path.join(screenshotsDir, folder)
      
      // Comprobar que sea un directorio
      if (!fs.statSync(folderPath).isDirectory()) {
        continue
      }

      const files = fs.readdirSync(folderPath)
      
      // Filtrar y ordenar numéricamente imágenes como 1.png, 2.png, 10.png, etc.
      const imageFiles = files
        .filter(file => /^\d+\.(png|jpe?g|webp)$/i.test(file))
        .map(file => {
          const number = parseInt(file.split('.')[0], 10)
          return { name: file, number }
        })
        .sort((a, b) => a.number - b.number)
        .map(item => `/screenshots/${folder}/${item.name}`)

      if (imageFiles.length > 0) {
        manifest[folder] = imageFiles
        console.log(`✅ Proyecto [${folder}]: detectadas ${imageFiles.length} imágenes.`)
      }
    }

    // Escribir el manifiesto
    fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2))
    console.log(`🎉 Manifiesto de imágenes generado exitosamente en: ${manifestFile}`)

  } catch (error) {
    console.error('❌ Error escaneando las imágenes:', error)
    // Escribir manifest vacío en caso de fallo para no interrumpir la compilación
    if (!fs.existsSync(manifestFile)) {
      fs.writeFileSync(manifestFile, '{}')
    }
  }
}

updateManifest()
