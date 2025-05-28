import { UserRole } from '@/models/enums/user-role.enum';
import { User } from '@/models/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STORAGE_KEY = '@user_profile';

export const UserServiceAsyncStorage = {
  /**
   * Retrieves the current user from AsyncStorage.
   *
   * @returns {Promise<User | null>} The user profile or null if not found.
   */
  async getUser(): Promise<User | null> {
    try {
      const json = await AsyncStorage.getItem(USER_STORAGE_KEY);
      return json ? JSON.parse(json) as User : null;
    } catch (e) {
      console.error('Failed to load user', e);
      return null;
    }
  },

  /**
   * Saves the user to AsyncStorage.
   *
   * @param user The user to save, containing the following properties:
   *   - name: The user's name.
   *   - club: The user's club (Sparks, Flames or Torches).
   *   - role: The user's role (Leader, Secretary or Director).
   * @returns A Promise that resolves when the user has been saved.
   */
  async saveUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user', e);
    }
  },

  /**
   * Retrieves the current user role from AsyncStorage.
   *
   * @returns {Promise<UserRole | null>} The user's role (Leader, Secretary or Director) or null if not found.
   */
  async getRole(): Promise<UserRole | null> {
    const user = await this.getUser();
    if (user) {
      return user.role;
    }
    return null;
  },

  /**
   * Stores the user's role in AsyncStorage.
   *
   * @param role The user's role (Leader, Secretary or Director).
   */
  async setRole(role: UserRole): Promise<void> {
    const user = await this.getUser();
    if (user) {
      user.role = role;
      await this.saveUser(user);
    }
  }
};