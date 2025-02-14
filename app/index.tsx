import { Redirect } from "expo-router";
import { useAuth } from "../hooks/AuthProvider";

export default function Index() {
  const { user } = useAuth();
  
  if (!user) {
    return <Redirect href="/login" />;
  }
  
  return <Redirect href="/home" />;
}
