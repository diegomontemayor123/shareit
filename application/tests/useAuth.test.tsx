import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useAuth from '../auth/useAuth';
import AuthContext from '../auth/context';
import AuthStorage from '../auth/Storage';
import { jwtDecode } from 'jwt-decode';

jest.mock('../auth/Storage', () => ({
    storeToken: jest.fn(),
    removeToken: jest.fn(),
}));

jest.mock('jwt-decode', () => ({
    jwtDecode: jest.fn(),
}));

describe('useAuth Hook', () => {
    const setUser = jest.fn();
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdCIsImVtYWlsIjoidGVzdEBhLmNvbSIsImlhdCI6MTcyMzg2NzE1M30.qdXGlOSwbV5PTvsCwSORsEF692qMXRba2aIMVOZebC4';
    const decodedUser = { name: 'Test', email: 'test@a.com', iat: 1723867153 };

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should throw an error if context is not provided', () => {
        const { result } = renderHook(() => useAuth(), {
            wrapper: ({ children }: { children: React.ReactNode }) => (
                <AuthContext.Provider value={null}>
                    {children}
                </AuthContext.Provider>
            ),
        });

        expect(() => result.current).toThrow('useAuth must be used within an AuthProvider');
    });

    test('should log in successfully and store token', async () => {
        (jwtDecode as jest.Mock).mockReturnValue(decodedUser);

        const { result } = renderHook(() => useAuth(), {
            wrapper: ({ children }: { children: React.ReactNode }) => (
                <AuthContext.Provider value={{ user: null, setUser }}>
                    {children}
                </AuthContext.Provider>
            ),
        });

        await act(() => {
            result.current.logIn(authToken);
        });

        expect(jwtDecode).toHaveBeenCalledWith(authToken);
        expect(setUser).toHaveBeenCalledWith(decodedUser);
        expect(AuthStorage.storeToken).toHaveBeenCalledWith(authToken);
    });

    test('should log out and remove token', async () => {
        const { result } = renderHook(() => useAuth(), {
            wrapper: ({ children }: { children: React.ReactNode }) => (
                <AuthContext.Provider value={{ user: decodedUser, setUser }}>
                    {children}
                </AuthContext.Provider>
            ),
        });

        await act(() => {
            result.current.logOut();
        });

        expect(setUser).toHaveBeenCalledWith(null);
        expect(AuthStorage.removeToken).toHaveBeenCalled();
    });

    test('should handle login errors gracefully', async () => {
        (jwtDecode as jest.Mock).mockImplementation(() => { throw new Error('Invalid token'); });

        const { result } = renderHook(() => useAuth(), {
            wrapper: ({ children }: { children: React.ReactNode }) => (
                <AuthContext.Provider value={{ user: null, setUser }}>
                    {children}
                </AuthContext.Provider>
            ),
        });

        await expect(result.current.logIn(authToken)).rejects.toThrow('Invalid token');
        expect(console.error).toHaveBeenCalledWith('Error during login:', 'Invalid token');
    });

    test('should handle logout errors gracefully', async () => {
        (AuthStorage.removeToken as jest.Mock).mockImplementation(() => { throw new Error('Failed to remove token'); });

        const { result } = renderHook(() => useAuth(), {
            wrapper: ({ children }: { children: React.ReactNode }) => (
                <AuthContext.Provider value={{ user: decodedUser, setUser }}>
                    {children}
                </AuthContext.Provider>
            ),
        });

        await expect(result.current.logOut()).rejects.toThrow('Failed to remove token');
        expect(console.error).toHaveBeenCalledWith('Error during logout:', 'Failed to remove token');
    });
});
