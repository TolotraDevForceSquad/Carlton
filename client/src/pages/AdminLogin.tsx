import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Renommé de AdminLogin à Login pour une utilisation plus générale
export default function AdminLogin() { 
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  // Utiliser 'email' pour correspondre à la colonne de la table
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Le point de terminaison de l'API reste le même, mais il gérera
      // l'authentification avec l'email et le mot de passe.
      const response = await fetch("/api/auth/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Envoyer l'email au lieu du nom d'utilisateur
        body: JSON.stringify({ email, password }), 
      });

      if (!response.ok) {
        // Le backend devra vérifier si l'utilisateur est actif et si
        // is_admin est true (si c'est pour un panneau d'administration)
        // ou juste si l'email/password est valide.
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      
      // Stocker le token. Le nom du token peut être générique ou spécifique (e.g., "userToken")
      localStorage.setItem("userToken", data.token); 
      
      toast({ title: "Connexion réussie" });
      // Rediriger vers un tableau de bord général ou une page d'accueil après la connexion
      setLocation("/"); 
    } catch (error) {
      toast({ 
        title: "Erreur de connexion", 
        description: "Email ou mot de passe invalide", // Texte mis à jour
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          passwordHash: password, 
          fullName 
        }), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      const data = await response.json();
      
      // Optionnel: Se connecter automatiquement après l'inscription
      localStorage.setItem("userToken", data.token || ""); // Si le backend retourne un token, sinon ajuster
      
      toast({ title: "Inscription réussie" });
      // Rediriger vers la page de connexion ou directement connecté
      setLocation("/"); 
    } catch (error) {
      toast({ 
        title: "Erreur d'inscription", 
        description: error instanceof Error ? error.message : "Échec de l'inscription",
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'register' : 'login');
    // Reset form fields
    setEmail("");
    setPassword("");
    setFullName("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          {/* Titre mis à jour pour être plus générique */}
          <CardTitle>{mode === 'login' ? 'Connexion Utilisateur' : 'Inscription Utilisateur'}</CardTitle> 
          <CardDescription>{mode === 'login' ? 'Connectez-vous à votre compte' : 'Créez un nouveau compte'}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Nom complet</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  data-testid="input-fullname"
                />
              </div>
            )}
            <div className="space-y-2">
              {/* Le label et l'ID sont maintenant 'email' */}
              <Label htmlFor="email">Email</Label> 
              <Input
                id="email"
                type="email" // Type d'input mis à jour
                value={email}
                onChange={(e) => setEmail(e.target.value)} // setUsername devient setEmail
                required
                data-testid="input-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="input-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading} data-testid={`button-${mode}`}>
              {isLoading ? (mode === 'login' ? "Connexion..." : "Inscription...") : (mode === 'login' ? "Se connecter" : "S'inscrire")}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <Button
              type="button"
              variant="link"
              onClick={toggleMode}
              className="p-0 h-auto"
              data-testid="toggle-mode"
            >
              {mode === 'login' ? "Pas de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
            </Button>
          </div>
          {/* Cette partie devrait être retirée pour une connexion en production */}
          {mode === 'login' && (
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Identifiants par défaut :</p>
              <p>Email: admin@example.com</p>
              <p>Password: admin123</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}