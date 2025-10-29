import { User } from '../types';
import { dataService } from './dataService';

class AuthService {
  private currentUser: User | null = null;

  constructor() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  login(identifier: string, password: string): { success: boolean; user?: User; error?: string } {
    const user = dataService.authenticateUser(identifier, password);

    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, user };
    }

    return { success: false, error: 'Invalid credentials' };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}

export const authService = new AuthService();
