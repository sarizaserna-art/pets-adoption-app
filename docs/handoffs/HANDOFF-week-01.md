# HANDOFF — Semana 01: Setup desde cero + Core Components y Flexbox

> Lee primero `docs/00-GUIA-MAESTRA.md`. Este archivo es autocontenido para la semana 01.

## Contexto
- Proyecto: **App Centro de Adopción de Mascotas** (nombre provisional de la app: "Huellitas" — cambiar si el usuario indica otro).
- Stack: React Native + Expo **SDK 57** (Expo Go 57), TypeScript estricto, pnpm con versiones fijas, Conventional Commits.
- Rama de trabajo: `week-01`, creada desde `main`.
- Estado inicial esperado: **nada**. No hay repo local ni código. Todo se crea aquí.
- Idioma: código en inglés, textos de UI en español, docs en español.

## Outcomes de la semana
- Repo configurado con pnpm de versiones fijas, lockfile commiteado, commitlint + husky.
- App Expo SDK 57 + TypeScript corriendo en Expo Go.
- Una pantalla con tarjetas de mascotas usando Core Components y Flexbox.

## Requisitos funcionales (adaptados del proyecto semana 01 del repo de referencia)
1. Pantalla principal con `ScrollView` de tarjetas.
2. **Mínimo 4 mascotas** con datos coherentes (mock).
3. Cada tarjeta: imagen, ≥2 textos con estilos distintos (nombre / subtítulo), estado de adopción, y un `Pressable` con feedback visual.
4. Header con el nombre de la app/centro.
5. Estilos solo con `StyleSheet.create`.
6. Interfaces TypeScript para el dominio.

## Restricciones
- No `position: 'absolute'` (solo Flexbox).
- No librerías de UI externas.
- No estilos inline (`style={{ ... }}`). Estilos funcionales con `pressed` son válidos.
- Sin `any`.
- Nunca editar versiones a mano con `^` o `~`.

---

## Pasos (marca [x] al completar)

### [ ] Paso 0 — Prerrequisitos
```bash
node -v            # debe ser >= 22
corepack enable
pnpm --version     # anota la versión exacta (se pinnea abajo)
git --version
```
En el teléfono: instalar **Expo Go** desde la tienda y confirmar que soporta SDK 57.

### [ ] Paso 1 — Repo base en `main`
```bash
mkdir pets-adoption-app && cd pets-adoption-app
git init -b main
mkdir -p docs/handoffs
```
Copiar aquí `docs/00-GUIA-MAESTRA.md`, `docs/handoffs/HANDOFF-TEMPLATE.md` y este archivo.

Crear `.npmrc`:
```
save-exact=true
engine-strict=true
node-linker=hoisted
```
Crear `.gitignore`:
```
node_modules/
.expo/
dist/
web-build/
ios/
android/
coverage/
.env*
*.log
.DS_Store
```
Crear `README.md` mínimo (título + una línea de descripción + enlace a `docs/00-GUIA-MAESTRA.md`).

Commits:
```bash
git add .gitignore .npmrc
git commit -m "chore(config): add gitignore and npmrc with exact versions" \
  -m "For: guarantee reproducible installs from day one" \
  -m "Impact: every dependency added is saved without ^ or ~"

git add README.md docs
git commit -m "docs(guide): add master guide and week-01 handoff" \
  -m "For: allow any Claude session to continue the project" \
  -m "Impact: handoff protocol available from the first commit"
```
Remoto (el usuario crea el repo vacío en GitHub):
```bash
git remote add origin <URL_DEL_REPO>
git push -u origin main
```

### [ ] Paso 2 — Crear la rama de la semana
```bash
git switch -c week-01
```

### [ ] Paso 3 — Scaffold Expo SDK 57 (en carpeta temporal)
```bash
cd ..
pnpm create expo-app@latest pets-scaffold --template blank-typescript@sdk-57 --no-install
rm -rf pets-scaffold/.git
rsync -a --exclude .gitignore pets-scaffold/ pets-adoption-app/
rm -rf pets-scaffold
cd pets-adoption-app
```
**Verificar** en `package.json` que `expo` empieza por `57.`. Si no, DETENERSE y reportar al usuario.

### [ ] Paso 4 — Fijar versiones exactas
1. Quitar `^` y `~` de `dependencies` y `devDependencies`:
```bash
node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('package.json','utf8'));for(const k of ['dependencies','devDependencies']){for(const n in (p[k]||{})){p[k][n]=p[k][n].replace(/^[\^~]/,'')}}fs.writeFileSync('package.json',JSON.stringify(p,null,2)+'\n')"
```
2. Editar `package.json` y dejar estos campos (usar la versión de pnpm anotada en el Paso 0):
```json
{
  "name": "pets-adoption-app",
  "private": true,
  "packageManager": "pnpm@<VERSION_EXACTA_DE_PNPM>",
  "engines": { "node": ">=22" },
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "typecheck": "tsc --noEmit"
  }
}
```
(conservar `main`, `version`, `dependencies`, `devDependencies` existentes).
3. Instalar y validar:
```bash
pnpm install
pnpm exec expo install react-native-safe-area-context
pnpm exec expo install --check
pnpm exec expo-doctor
```
`expo install --check` es la fuente de verdad de compatibilidad. Si propone cambios, aplicarlos con `pnpm exec expo install --fix` y confirmar que `package.json` sigue **sin `^` ni `~`**.

Referencia del repo de contraste (no obligatoria si Expo indica otra cosa): `expo 57.0.4`, `react-native 0.86.0`, `react 19.2.3`, `typescript 6.0.3`.

Commits:
```bash
git add -A
git commit -m "chore(week-01): scaffold expo sdk 57 typescript app" \
  -m "For: start the project from a clean Expo template" \
  -m "Impact: base app boots in Expo Go"
```
Si hace falta separar el lockfile:
```bash
git commit -m "chore(deps): pin exact versions and commit lockfile" \
  -m "For: reproducible installs across machines and Claude sessions" \
  -m "Impact: pnpm install --frozen-lockfile is deterministic"
```
Verificar: `pnpm install --frozen-lockfile` termina sin errores.

### [ ] Paso 5 — TypeScript estricto
Abrir `tsconfig.json`; debe extender `expo/tsconfig.base` y tener `"strict": true`. Correr:
```bash
pnpm typecheck
```
Debe pasar sin errores.

### [ ] Paso 6 — Conventional Commits forzados
```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional husky
pnpm exec husky init
```
Crear `commitlint.config.mjs`:
```js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 72],
    'subject-case': [0],
  },
};
```
Contenido de los hooks:
- `.husky/pre-commit` → `pnpm typecheck`
- `.husky/commit-msg` → `pnpm exec commitlint --edit "$1"`

Confirmar que `package.json` conserva `"prepare": "husky"` y que las versiones quedaron exactas.

Probar que rechaza un mensaje inválido:
```bash
git commit --allow-empty -m "bad message"      # debe FALLAR
```
Commit:
```bash
git add -A
git commit -m "chore(config): add commitlint and husky hooks" \
  -m "For: enforce conventional commits and type safety before each commit" \
  -m "Impact: invalid messages and type errors are rejected locally"
```

### [ ] Paso 7 — `app.json`
Editar solo estos campos (conservar el resto de lo generado por el template):
```json
{ "expo": { "name": "Huellitas", "slug": "pets-adoption-app" } }
```

### [ ] Paso 8 — Tipos y datos del dominio
`src/types/index.ts`:
```ts
export type Species = 'dog' | 'cat' | 'rabbit' | 'bird' | 'other';
export type Sex = 'male' | 'female';
export type Size = 'small' | 'medium' | 'large';
export type AdoptionStatus = 'available' | 'in_process' | 'adopted';

export interface Pet {
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
`src/data/mockData.ts` — exporta `PETS: Pet[]` con **6 mascotas** variadas (al menos un perro, un gato y un conejo; estados distintos). `photoUrl` temporal: `https://picsum.photos/seed/<id>/400/300` (se reemplaza en la semana 11). Ejemplo de un elemento:
```ts
{
  id: 'pet-001',
  name: 'Luna',
  species: 'dog',
  breed: 'Criolla',
  ageMonths: 18,
  sex: 'female',
  size: 'medium',
  description: 'Juguetona y cariñosa. Se lleva bien con niños.',
  photoUrl: 'https://picsum.photos/seed/pet-001/400/300',
  vaccinated: true,
  sterilized: true,
  status: 'available',
}
```
Commit:
```bash
git add src/types src/data
git commit -m "feat(pets): add pet domain types and mock data" \
  -m "For: model the adoption center domain with strict types" \
  -m "Impact: screens can render typed pets from mock data"
```

### [ ] Paso 9 — Componente `PetCard`
`src/components/PetCard.tsx`:
```tsx
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Pet } from '../types';

interface PetCardProps {
  pet: Pet;
  onPress: (pet: Pet) => void;
}

const SPECIES_EMOJI: Record<Pet['species'], string> = {
  dog: '🐶',
  cat: '🐱',
  rabbit: '🐰',
  bird: '🐦',
  other: '🐾',
};

const STATUS_LABEL: Record<Pet['status'], string> = {
  available: 'Disponible',
  in_process: 'En proceso',
  adopted: 'Adoptado',
};

function formatAge(ageMonths: number): string {
  if (ageMonths < 12) {
    return `${ageMonths} ${ageMonths === 1 ? 'mes' : 'meses'}`;
  }
  const years = Math.floor(ageMonths / 12);
  return `${years} ${years === 1 ? 'año' : 'años'}`;
}

export function PetCard({ pet, onPress }: PetCardProps): React.JSX.Element {
  const isAvailable = pet.status === 'available';

  return (
    <Pressable
      onPress={() => onPress(pet)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Image source={{ uri: pet.photoUrl }} style={styles.image} />
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.name}>
            {SPECIES_EMOJI[pet.species]} {pet.name}
          </Text>
          <View style={[styles.badge, isAvailable ? styles.badgeAvailable : styles.badgeOther]}>
            <Text style={styles.badgeText}>{STATUS_LABEL[pet.status]}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>
          {pet.breed} · {formatAge(pet.ageMonths)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: '100%',
    height: 180,
  },
  body: {
    padding: 12,
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeAvailable: {
    backgroundColor: '#D1FAE5',
  },
  badgeOther: {
    backgroundColor: '#FEF3C7',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
});
```
Commit:
```bash
git add src/components
git commit -m "feat(ui): add PetCard component" \
  -m "For: reusable card to present each pet with Core Components and Flexbox" \
  -m "Impact: list screens can reuse the same card from week-02"
```

### [ ] Paso 10 — `HomeScreen` y `App.tsx`
`src/screens/HomeScreen.tsx`:
```tsx
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PetCard } from '../components/PetCard';
import { PETS } from '../data/mockData';
import type { Pet } from '../types';

export function HomeScreen(): React.JSX.Element {
  const handlePress = (pet: Pet): void => {
    Alert.alert(pet.name, pet.description);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>🐾 Huellitas</Text>
        <Text style={styles.subtitle}>Centro de adopción de mascotas</Text>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {PETS.map((pet) => (
          <PetCard key={pet.id} pet={pet} onPress={handlePress} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  list: {
    padding: 16,
  },
});
```
`App.tsx`:
```tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './src/screens/HomeScreen';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <HomeScreen />
    </SafeAreaProvider>
  );
}
```
Commit:
```bash
git add App.tsx src/screens
git commit -m "feat(week-01): add home screen with pet cards" \
  -m "For: deliver the week-01 outcome: a styled list of pets with Flexbox" \
  -m "Impact: app shows header and pressable pet cards in Expo Go"
```

### [ ] Paso 11 — Verificación en Expo Go
```bash
pnpm start
```
Escanear el QR con Expo Go. Confirmar visualmente: header, ≥4 tarjetas, imagen, badge de estado, feedback al presionar, Alert con descripción.

Verificación final:
```bash
pnpm typecheck
pnpm install --frozen-lockfile
git status        # limpio
```

### [ ] Paso 12 — Entrega de la semana
```bash
git push -u origin week-01
git tag week-01-done && git push origin week-01-done
```

---

## Definition of Done
- [ ] `pnpm typecheck` sin errores
- [ ] App corre en Expo Go 57 con las ≥4 tarjetas
- [ ] `package.json` sin `^`/`~`, con `packageManager` y `engines`; `pnpm-lock.yaml` commiteado
- [ ] commitlint rechaza mensajes inválidos
- [ ] Sin `position: 'absolute'`, sin estilos inline, sin `any`
- [ ] Todos los commits siguen Conventional Commits
- [ ] Rama `week-01` pusheada (y tag `week-01-done`)

## Siguiente semana
`week-02` sale de `week-01` (`git switch -c week-02`). Outcome: `FlatList` ≥10 mascotas, búsqueda en vivo, filtro por especie, estado vacío, theme centralizado en `src/theme/index.ts`, `KeyboardAvoidingView`. Pedir a Claude el **HANDOFF-week-02**.

## ESTADO (actualizar al avanzar)
- Paso actual: Paso 0
- Último commit: —
- Bloqueos: —
- Notas para el siguiente Claude: —
