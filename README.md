# Factory Motor Bike - Deploy ready con Cloudinary

Proyecto full stack con:
- **Frontend** en React + Vite
- **Backend** en Node + Express + MongoDB
- **Imágenes** en Cloudinary
- **Admin** con login y CRUD de motos

## Qué ha quedado preparado
- Variables de entorno separadas con `.env.example`
- Backend listo para usar **Cloudinary** en lugar de `uploads/` local
- Frontend compatible con URLs externas de imagen
- Proyecto preparado para desplegar con:
  - **Vercel** para frontend
  - **Render** para backend
  - **MongoDB Atlas** para base de datos
  - **Cloudinary** para imágenes

## Importante sobre las imágenes
Las imágenes de las motos ya **no deben guardarse en el servidor**. El backend ahora sube cada archivo a Cloudinary y guarda en MongoDB la `secure_url` devuelta por Cloudinary.

## Variables de entorno

### backend/.env
Copia `backend/.env.example` a `backend/.env` y rellena:

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/factory-motor-bike
JWT_SECRET=super-secret-change-me
CLIENT_URL=http://localhost:3000
ADMIN_EMAIL=admin@factorymotorbike.com
ADMIN_PASSWORD=Admin1234@
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### frontend/.env
Copia `frontend/.env.example` a `frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

## Arranque local

### Backend
```powershell
cd "RUTA\factory-motor-bike-node-full\backend"
npm install
notepad .env
npm run seed
npm run dev
```

### Frontend
```powershell
cd "RUTA\factory-motor-bike-node-full\frontend"
npm install
notepad .env
npm run dev
```

## Deploy recomendado

### Backend en Render
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

Variables en Render:
```env
PORT=4000
MONGODB_URI=TU_URI_DE_ATLAS
JWT_SECRET=TU_CLAVE_SEGURA
CLIENT_URL=TU_URL_DE_VERCEL
ADMIN_EMAIL=admin@factorymotorbike.com
ADMIN_PASSWORD=Admin1234@
CLOUDINARY_CLOUD_NAME=TU_CLOUD_NAME
CLOUDINARY_API_KEY=TU_API_KEY
CLOUDINARY_API_SECRET=TU_API_SECRET
```

### Frontend en Vercel
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`

Variable en Vercel:
```env
VITE_BACKEND_URL=TU_URL_DEL_BACKEND_EN_RENDER
```

## Seed
El comando `npm run seed` borra y vuelve a crear los datos de ejemplo. Úsalo solo la primera vez o cuando quieras reiniciar la base de datos.

## Credenciales iniciales
- **Email:** admin@factorymotorbike.com
- **Contraseña:** Admin1234@
