# Sitio web — Dr. Lisandro J. Laurito, Médico Psiquiatra

Proyecto Gulp 4 + Dart Sass, mismo stack que el sitio de kinesiología.

## Uso

```bash
npm install
npm start        # levanta BrowserSync en dist/ con recarga en vivo
npm run build    # genera dist/ listo para deploy (Netlify)
```

## Estructura

```
src/
  index.html
  scss/          # main.scss + partials (_variables, _base, _hero, etc.)
  js/main.js
dist/            # generado por gulp — esto es lo que se sube a Netlify
```

## Pendiente de confirmar con el cliente

- **Email**: se transcribió como `psiqlisandrolaurito@gmail.com` a partir de
  la nota manuscrita — la caligrafía es ambigua entre "psiq" y "psip",
  conviene confirmarlo antes de publicar.
- **Matrícula profesional (M.P.)**: no aparece en las notas. Se dejó fuera
  del hero; agregarla en `src/index.html` cuando la tengas a mano
  (junto a "Médico Psiquiatra especialista en TCC").
- **Dos direcciones** (Pasaje Santa Cruz 355 y Paraguay 574): se muestran
  como dos sedes en Contacto. Confirmar si son dos consultorios distintos o
  si una es la ubicación correcta y la otra una referencia (cruce de calles).
- **Foto**: la sección "Sobre mí" tiene un placeholder marcado, reemplazar
  por la fotografía real en `src/img/` y actualizar `.about__photo` en el HTML.
