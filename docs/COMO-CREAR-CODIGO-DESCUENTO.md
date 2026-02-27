# Cómo crear un código de descuento

Los códigos de descuento se aplican sobre la **tarifa diaria** del vehículo (antes de multiplicar por los días). Se configuran en el código del proyecto; no hay panel de administración.

---

## Dónde editarlo

Abre el archivo:

```
src/features/booking/config/constants.ts
```

Busca la sección **DISCOUNT_CODES**. Verás un array con los códigos existentes:

```typescript
export const DISCOUNT_CODES: DiscountCode[] = [
  { code: 'OTTO10', percent: 10, label: '10% descuento' },
  { code: 'EARLY15', percent: 15, label: '15% early bird' },
  { code: 'AMIGO20', percent: 20, label: '20% referido' },
];
```

---

## Agregar un código nuevo

Añade una nueva línea al array con estos tres campos:

| Campo     | Descripción |
|----------|-------------|
| **code**   | El texto que el cliente escribe (ej. `VERANO25`). La validación ignora mayúsculas/minúsculas. |
| **percent**| Porcentaje de descuento sobre la tarifa diaria. Ej: `10` = 10% de descuento, `25` = 25%. |
| **label**  | Texto que se muestra al cliente cuando el código es válido (ej. "25% descuento verano"). |

### Ejemplo

Para un código **VERANO25** con 25% de descuento:

```typescript
export const DISCOUNT_CODES: DiscountCode[] = [
  { code: 'OTTO10', percent: 10, label: '10% descuento' },
  { code: 'EARLY15', percent: 15, label: '15% early bird' },
  { code: 'AMIGO20', percent: 20, label: '20% referido' },
  { code: 'VERANO25', percent: 25, label: '25% descuento verano' },  // ← nuevo
];
```

Guarda el archivo. Si la app está en marcha, se recargará sola; si no, vuelve a hacer build o `npm run dev`.

---

## Modificar o eliminar un código

- **Modificar:** cambia `code`, `percent` o `label` en la línea correspondiente.
- **Eliminar:** borra la línea completa del código (y la coma de la línea anterior si queda suelta).

---

## Comportamiento en la reserva

1. En el **Paso 3** del formulario de reserva, el cliente escribe el código en el campo "Código de descuento".
2. Si el código existe, aparece un mensaje en verde con el `label` (ej. "10% descuento").
3. Si no existe o está mal escrito, aparece "Código no válido" en naranja.
4. El descuento se aplica a la tarifa diaria; el total se actualiza automáticamente en el desglose.

El código usado y el porcentaje se envían en la solicitud al backend (Google Apps Script) para que queden registrados en la hoja de cálculo y en el correo.
