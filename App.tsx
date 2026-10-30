
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { HomeScreen } from './src/screens/HomeScreen';
import { DetailScreen } from './src/screens/DetailScreen';

import type {
  HomeStackParamList,
  RootTabParamList,
} from './src/types/navigation';

// Stack Navigator: es como el inicio de las mascotas 
const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStack(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTintColor: '#111827',
        contentStyle: { backgroundColor: '#F3F4F6' },
      }}
    >
      <Stack.Screen
        name="HomeList"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PetDetail"
        component={DetailScreen}
        options={{ title: 'Detalle de mascota' }}
      />
    </Stack.Navigator>
  );
}

// es como donde uno GUARDA SUS FAVORITOS 
function FavoritesScreen(): React.JSX.Element {
  return (
    <View style={styles.favorites}>
      <Text style={styles.title}>❤️ Mis favoritos</Text>
      <Text style={styles.subtitle}>
        Aquí aparecerán tus mascotas favoritas.
      </Text>
    </View>
  );
}

// SON LOS INICIO Y FAVORITO S Y ESTAN LOS ICONOS 
const Tab = createBottomTabNavigator<RootTabParamList>();

function MainTabs(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName =
            route.name === 'Inicio'
              ? (focused ? 'home' : 'home-outline')
              : (focused ? 'heart' : 'heart-outline');

          return (
            <Ionicons
              name={iconName as keyof typeof Ionicons.glyphMap}
              size={size}
              color={color}
            />
          );
        },

        tabBarActiveTintColor: '#61DAFB',
        tabBarInactiveTintColor: '#8b949e',

        tabBarStyle: {
          backgroundColor: '#161b22',
          borderTopColor: '#30363d',
        },

        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeStack}
      />

      <Tab.Screen
        name="Favoritos"
        component={FavoritesScreen}
      />
    </Tab.Navigator>
  );
}

// Aplicación principal
export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />

      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  favorites: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
});
