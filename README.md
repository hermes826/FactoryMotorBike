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
Las imágenes de las motos ya **no se guardan en el servidor**. El backend ahora sube cada archivo a Cloudinary y guarda en MongoDB la `secure_url` devuelta por Cloudinary.


