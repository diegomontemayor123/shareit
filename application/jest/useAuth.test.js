import { renderHook, act } from '@testing-library/react-hooks';
import useAuth from '../auth/useAuth';
import AuthContext from '../auth/context';
import AuthStorage from '../auth/Storage';

jest.mock('../auth/Storage', () => ({
  storeToken: jest.fn(),
  removeToken: jest.fn()
}));

jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn()
}));

describe('useAuth Hook', () => {
  const setUser = jest.fn();  
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdCIsImVtYWlsIjoidGVzdEBhLmNvbSIsImlhdCI6MTcyMzg2NzE1M30.qdXGlOSwbV5PTvsCwSORsEF692qMXRba2aIMVOZebC4';


  beforeEach(() => {
    jest.clearAllMocks()
  });

  test('should log in successfully and store token', async () => {
    const wrapper = ({ children }) => (
      <AuthContext.Provider value={{ user: null, setUser }}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.logIn(authToken);
    });
   
    expect(setUser).toHaveBeenCalledWith({ name: 'Test', email: 'test@a.com', iat: 1723867153 });

    expect(AuthStorage.storeToken).toHaveBeenCalledWith(authToken);
  });

  test('should log out and remove token', async () => {
    const wrapper = ({ children }) => (
      <AuthContext.Provider value={{ user: { name: 'Test', email: 'test@a.com', iat: 1723867153 }, setUser }}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.logOut();
    });

  
    expect(setUser).toHaveBeenCalledWith(null);

    expect(AuthStorage.removeToken).toHaveBeenCalled();
  });
});
