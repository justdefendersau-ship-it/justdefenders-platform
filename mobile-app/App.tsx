import { useEffect } from "react"
import { Text, View, StyleSheet, Alert } from "react-native"
import { supabase } from "./lib/supabase"

export default function App() {

  useEffect(() => {
    testConnection()
    setupRealtime()
  }, [])

  const testConnection = async () => {
    const { data, error } = await supabase
      .from("alerts")
      .select("*")
      .limit(1)

    if (error) {
      Alert.alert("? Supabase ERROR", JSON.stringify(error))
    } else {
      Alert.alert("? Supabase Connected", JSON.stringify(data))
    }
  }

  const setupRealtime = () => {
    const channel = supabase
      .channel("alerts-debug")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "alerts"
        },
        (payload) => {
          console.log("Realtime alert:", payload)
          Alert.alert("?? REALTIME FIRED", JSON.stringify(payload.new))
        }
      )
      .subscribe((status) => {
        console.log("Subscription:", status)
        Alert.alert("Subscription: " + status)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JustDefenders Debug Mode</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold" }
})
