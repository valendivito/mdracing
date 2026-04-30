# Cómo publicar el bot de MDRACING en Vercel

## Paso 1 — Conseguir la API Key de Anthropic (Claude)
1. Ir a https://console.anthropic.com
2. Crear una cuenta (o iniciar sesión)
3. Ir a "API Keys" y crear una nueva key
4. Guardarla (la vas a necesitar en el Paso 4)

## Paso 2 — Subir el código a GitHub
1. Crear una cuenta en https://github.com si no tenés
2. Crear un repositorio nuevo llamado "mdracing"
3. Subir todos los archivos de la carpeta mdracing a ese repositorio
   (podés arrastrar y soltar los archivos desde la interfaz web de GitHub)

## Paso 3 — Conectar Vercel con GitHub
1. Ir a https://vercel.com y crear una cuenta con tu cuenta de GitHub
2. Click en "Add New Project"
3. Seleccionar el repositorio "mdracing"
4. Vercel detecta automáticamente que es un proyecto Node.js con carpeta /api

## Paso 4 — Agregar la API Key como variable de entorno
En Vercel, antes de hacer Deploy:
1. Ir a "Environment Variables"
2. Agregar:
   - Name: ANTHROPIC_API_KEY
   - Value: [la key que copiaste en el Paso 1]
3. Click "Deploy"

## Paso 5 — Listo
Vercel te da una URL pública (ej: mdracing.vercel.app).
El bot ya va a funcionar en esa URL y en cualquier dominio que conectes.

## Para conectar tu dominio propio (mdracingfundas.com.ar)
En Vercel → Settings → Domains → agregar tu dominio.
