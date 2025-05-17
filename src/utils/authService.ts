// Mot de passe temporaire pour la démo - en production, utilisez une authentification plus robuste
const ADMIN_PASSWORD = 'admin123';

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('admin_auth') === 'true';
};

export const login = (password: string): boolean => {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem('admin_auth', 'true');
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem('admin_auth');
}; 