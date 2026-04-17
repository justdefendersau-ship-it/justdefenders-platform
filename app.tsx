// JustDefenders ©
// File: /mobile-app/App.tsx
// Timestamp: 30 March 2026 12:00

import { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Linking from 'expo-linking'

import { supabase } from './src/auth/supabase'

import LoginScreen from './src/screens/LoginScreen'
import DashboardScreen from './src/screens/DashboardScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    )

    const sub = Linking.addEventListener('url', async (event) => {
      await supabase.auth.exchangeCodeForSession(event.url)
    })

    return () => {
      listener.subscription.unsubscribe()
      sub.remove()
    }
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session ? (
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}