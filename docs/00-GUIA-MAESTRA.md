# Guía maestra — App de Centro de Adopción de Mascotas

> Mini proyecto React Native (Expo Go 57 + TypeScript + pnpm) construido **desde cero**, semana a semana.
> Referencia pedagógica: https://github.com/ergrato-dev/bc-reactnative (solo se toma el **dominio/proyecto semanal**, NO la teoría ni los ejercicios guiados).

---

## 1. Qué se analizó del repo de referencia

| Hallazgo | Detalle |
| --- | --- |
| Estructura | 18 semanas en `bootcamp/week-XX-tema/` con `1-teoria`, `2-practicas`, `3-proyecto`, `4-recursos`, `5-glosario` |
| Qué usamos | Solo la idea del `3-proyecto` de cada semana (requisitos funcionales + restricciones), aplicada a nuestro dominio |
| Qué NO usamos | `1-teoria`, `2-practicas` (ejercicios guiados), `4-recursos`, `5-glosario`, rúbricas |
| Stack base del repo | expo `57.0.4`, react-native `0.86.0`, react `19.2.3`, typescript `6.0.3` (versiones exactas, sin `^`/`~`) |
| Gestor | pnpm 10.x, Node 22+ |
| Lockfiles | **El repo no trae `pnpm-lock.yaml`** → nosotros SÍ lo commiteamos (versiones realmente fijas) |
| Commits | Conventional Commits, asunto en inglés (≤72 chars), cuerpo `For:` / `Impact:`; scopes `week-XX`, `deps`, `docs`, etc. |
| Dominio | El repo asigna dominios únicos (anticopia). El nuestro: **centro de adopción de mascotas y animales** |
| Semana 18 | No tiene `starter/`: se parte del proyecto propio acumulado → por eso nuestro repo es **acumulativo** |
| Auditoría del repo | Axios 1.18.1 con historial de CVEs; MMKV requiere código nativo (ver §6) |

---

## 2. Decisiones del proyecto

1. **Entrega = solo el dominio.** Nada de ejercicios guiados ni carpetas de teoría. El repo contiene únicamente la app evolucionando.
2. **Desde cero.** Sin starter. Cada semana se escribe el código siguiendo el handoff.
3. **Una rama por semana, acumulativa:** `week-01` sale de `main`; `week-02` sale de `week-01`; `week-03` de `week-02`… Cada rama es la app completa al cierre de esa semana.
4. **`main`** solo contiene `README.md`, `.gitignore`, `.npmrc` y `docs/` (esta guía + handoffs).
5. **pnpm con versiones fijas:** `save-exact=true`, `packageManager` pinneado, `engines`, lockfile commiteado, `pnpm install --frozen-lockfile`.
6. **Expo Go SDK 57** como entorno de desarrollo (sin development build salvo que una semana lo exija explícitamente).
7. **TypeScript estricto**, sin `any`, interfaces explícitas.
8. **Código en inglés, documentación en español.**
9. **Conventional Commits** forzados con commitlint + husky.

---

## 3. Convenciones

### Commits

```
type(scope): short description in english      <- máx 72 chars, sin punto final

For: <por qué se necesitaba el cambio>
Impact: <qué habilita o afecta>
```

Tipos: `feat` `fix` `docs` `style` `refactor` `test` `chore` `ci` `perf` `build`
Scopes: `week-XX` `pets` `adoption` `navigation` `store` `api` `forms` `auth` `ui` `theme` `deps` `config` `docs`

Reglas: commits pequeños y atómicos; `deps` siempre en commit aparte con el lockfile.

### Ramas y entrega por semana

```
main ── week-01 ── week-02 ── week-03 ── ... ── week-18
```

Al cerrar cada semana: `pnpm typecheck` OK → push de la rama → (opcional) tag `week-XX-done`.

### Estructura de carpetas objetivo (crece por semana)

```
src/
├── components/   # PetCard, SearchBar, Badge...
├── screens/      # HomeScreen, PetDetailScreen...
├── navigation/   # a partir de week-03
├── stores/       # a partir de week-04
├── services/     # api mock, week-05
├── hooks/
├── schemas/      # zod, week-06
├── theme/        # week-02
├── types/
└── data/         # mockData
```

### Nomenclatura

Componentes/Pantallas `PascalCase.tsx` · hooks `useX.ts` · stores `useXStore` · constantes `UPPER_SNAKE_CASE` · estilos siempre con `StyleSheet.create` (sin estilos inline).

---

## 4. Modelo del dominio

```ts
type Species = 'dog' | 'cat' | 'rabbit' | 'bird' | 'other';
type Sex = 'male' | 'female';
type Size = 'small' | 'medium' | 'large';
type AdoptionStatus = 'available' | 'in_process' | 'adopted';

interface Pet {
  id: string;
  name: string;
  species: Species;
  breed: string;
  ageMonths: number;
  sex: Sex;
  size: Size;
  description: string;
  photoUrl: string;
  vaccinated: boolean;
  sterilized: boolean;
  status: AdoptionStatus;
}
```

Entidades que aparecen más adelante: `AdoptionRequest` (week-06), `User` con rol `adopter | staff` (week-08), `Shelter` con ubicación (week-11).

---

## 5. Roadmap de 18 semanas (outcomes en el dominio)

| Sem | Tema (repo) | Outcome aplicado a adopción de mascotas | Deps nuevas (ref. repo) |
| --- | --- | --- | --- |
| 01 | Core components + Flexbox | Pantalla con tarjetas de mascotas (`PetCard`), header, `Pressable` con feedback | — |
| 02 | Listas, inputs, estilos | `FlatList` ≥10 mascotas, búsqueda en vivo, filtro por especie, estado vacío, theme, `KeyboardAvoidingView` | — |
| 03 | React Navigation 7 | Tabs (Mascotas / Favoritos) + stack lista→detalle con params tipados | `@react-navigation/native` `native-stack` `bottom-tabs`, `react-native-screens`, `@expo/vector-icons` (`react-native-safe-area-context` ya entra en week-01) |
| 04 | Zustand | Store de favoritos (agregar/quitar/limpiar), badge en tab, botón "Guardar" en detalle | `zustand` (+ `async-storage` si persiste) |
| 05 | Networking + TanStack Query | Servicio mock con latencia; `useQuery` lista/detalle, `useMutation` crear mascota, loading/error/empty, pull-to-refresh | `@tanstack/react-query` |
| 06 | Formularios | Formulario de **solicitud de adopción** y de **registrar mascota** con RHF + Zod | `react-hook-form`, `zod`, `@hookform/resolvers` |
| 07 | Persistencia local | Preferencias (orden, modo compacto), caché offline de mascotas, datos sensibles en SecureStore | `@react-native-async-storage/async-storage`, `expo-secure-store` |
| 08 | Autenticación | Login/registro, roles adopter/staff, tokens en SecureStore, navegación condicional | `expo-secure-store`, `jwt-decode` (opcional) |
| 09 | Animaciones básicas | Entrada animada del detalle, botón "adoptar" con feedback, lista escalonada (`Animated`) | — |
| 10 | Reanimated 4 + Gesture Handler | Tarjetas **swipe** (adoptar / descartar) con umbral y snap-back | `react-native-reanimated`, `react-native-gesture-handler`, `react-native-worklets` |
| 11 | APIs nativas | Foto de mascota (cámara/galería), ubicación del refugio, permisos | `expo-camera`, `expo-image-picker`, `expo-location` |
| 12 | Notificaciones | Notificaciones **locales**: solicitud enviada, recordatorio de visita | `expo-notifications`, `expo-device`, `expo-constants` |
| 13 | Testing | Jest + RNTL: formatters, `PetCard`, `HomeScreen` (≥60% cobertura) | `jest`, `jest-expo`, `@testing-library/react-native`, `@types/jest` |
| 14 | Performance | Lista de 300+ mascotas, `memo`, `useMemo`, `useCallback`, props de `FlatList` | — |
| 15 | EAS Build | `eas.json` con perfiles dev/preview/production | `eas-cli` (global/dev) |
| 16 | Tiendas | Metadatos, capturas, política de privacidad (sin publicar) | — |
| 17 | CI/CD + OTA | GitHub Actions: `pnpm/action-setup` + `tsc --noEmit` + tests; EAS Update | — |
| 18 | Proyecto final | Checklist de integración, `decisiones-arquitectura.md`, README final | — |

> Las versiones de la columna "Deps nuevas" NO se escriben de memoria: cada handoff instruye instalar con `pnpm exec expo install <pkg>` (que respeta SDK 57) y verificar el valor exacto en `package.json`.
> Referencia de versiones del repo (solo contraste): `@react-navigation/native 7.3.8`, `native-stack 7.17.10`, `bottom-tabs 7.18.8`, `react-native-screens 4.25.2`, `safe-area-context 5.7.0`, `zustand 5.0.14`, `@tanstack/react-query 5.101.2`, `react-hook-form 7.81.0`, `zod 4.4.3`, `@hookform/resolvers 5.4.0`, `reanimated 4.5.0`, `gesture-handler 2.32.0`, `worklets 0.10.2`, `expo-camera 57.0.1`, `expo-location 57.0.2`, `expo-notifications 57.0.3`, `jest 29.7.0`, `jest-expo 57.0.1`, `@testing-library/react-native 13.3.3`.

---

## 6. Riesgos conocidos con Expo Go 57

| Tema | Riesgo | Decisión |
| --- | --- | --- |
| `react-native-mmkv` (week-07 del repo) | Requiere módulos nativos (Nitro) → **no corre en Expo Go** | Usar `AsyncStorage` + `expo-secure-store` |
| Push **remotas** (week-12) | No soportadas en Expo Go | Solo notificaciones **locales**; remotas documentadas |
| `axios` | Historial de CVEs, dependencia extra | Usar `fetch` nativo salvo que el handoff diga otra cosa |
| Reanimated 4 | Requiere New Architecture + `react-native-worklets` | Funciona en Expo Go 57; instalar vía `expo install` |
| Semanas 15–17 | EAS/stores/CI no se ejecutan en Expo Go | Se entregan como configuración + documentación |

Si algo falla, correr `pnpm exec expo-doctor` antes de depurar.

---

## 7. Protocolo de handoff (continuidad entre Claudes)

- **1 handoff = 1 semana** → `docs/handoffs/HANDOFF-week-XX.md`.
- Cada handoff es **autocontenido**: un Claude nuevo, leyendo solo (a) esta guía y (b) el handoff, puede ejecutar la semana sin preguntas.
- Cada handoff termina con un bloque **ESTADO** que se actualiza al avanzar (paso actual, commits hechos, bloqueos).
- Si Claude se queda sin tokens: copiar el handoff **con el bloque ESTADO actualizado** al nuevo chat + el mensaje de arranque (abajo).

### Mensaje de arranque para el nuevo Claude

```
Continúa el proyecto "App Centro de Adopción de Mascotas" (React Native, Expo Go 57, TypeScript, pnpm versiones fijas, conventional commits, ramas week-XX).
Lee la guía maestra y el handoff adjunto. Retoma exactamente desde el bloque ESTADO.
No rehagas pasos marcados [x]. Al terminar cada paso, marca [x] y dame el bloque ESTADO actualizado.
```

### Plantilla de handoff

Ver `docs/handoffs/HANDOFF-TEMPLATE.md`.
