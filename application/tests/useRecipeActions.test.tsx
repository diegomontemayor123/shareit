import { renderHook, act } from '@testing-library/react-hooks';
import { Alert } from 'react-native';
import useRecipeActions from '../hooks/useRecipeActions';
import useApi from '../hooks/useApi';
import recipesApi from '../api/recipes';


jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
}));

jest.mock('expo-secure-store', () => ({
    getItemAsync: jest.fn(),
    setItemAsync: jest.fn(),
    deleteItemAsync: jest.fn(),
}));

jest.mock('expo-constants', () => ({
    manifest: {
        extra: {
            apiUrl: 'https://mockapi.com',
        },
    },
}));


jest.mock('../hooks/useApi');
jest.mock('../api/recipes');
jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());


describe('useRecipeActions Hook', () => {
    const mockGetRecipesApi = {
        request: jest.fn(),
        data: [] as { id: number; name: string; likesCount?: number }[],
        error: null,
        loading: false,
    };


    const mockFilterFn = jest.fn((recipes) => recipes);


    beforeEach(() => {
        jest.clearAllMocks();
        (useApi as jest.Mock).mockReturnValue(mockGetRecipesApi);
    });


    test('should fetch recipes on mount', () => {
        renderHook(() => useRecipeActions(mockFilterFn));
        expect(mockGetRecipesApi.request).toHaveBeenCalled();
    });


    test('should filter recipes when data changes', () => {
        const { result, rerender } = renderHook(() => useRecipeActions(mockFilterFn));
        const newData = [{ id: 1, name: 'Recipe 1' }];


        act(() => {
            mockGetRecipesApi.data = newData;
            rerender()
            result.current.filteredRecipes;
        });


        expect(mockFilterFn).toHaveBeenCalledWith(newData);
    });


    test('should handle refresh correctly', async () => {
        const { result } = renderHook(() => useRecipeActions(mockFilterFn));


        await act(async () => {
            await result.current.handleRefresh();
        });


        expect(mockGetRecipesApi.request).toHaveBeenCalledTimes(2);
        expect(result.current.refreshing).toBe(false);
    });


    test('should handle delete correctly', async () => {
        const mockRecipe = { id: 1, name: 'Recipe 1' };
        mockGetRecipesApi.data = [mockRecipe];
        (recipesApi.deleteRecipe as jest.Mock).mockResolvedValue({ ok: true });


        const { result } = renderHook(() => useRecipeActions(mockFilterFn));


        act(() => {
            result.current.handleDelete(1);
        });


        expect(Alert.alert).toHaveBeenCalledWith(
            "Delete",
            "Are you sure you want to delete this recipe?",
            expect.any(Array)
        );


        await act(async () => {
            (Alert.alert as jest.Mock).mock.calls[0][2][0].onPress();
        });


        expect(recipesApi.deleteRecipe).toHaveBeenCalledWith(1);
        expect(result.current.filteredRecipes).toEqual([]);
    });


    test('should handle add like correctly', async () => {
        const mockRecipe = { id: 1, name: 'Recipe 1', likesCount: 0 };
        mockGetRecipesApi.data = [mockRecipe];
        (recipesApi.addLike as jest.Mock).mockResolvedValue({ ok: true });


        const { result } = renderHook(() => useRecipeActions(mockFilterFn));


        await act(async () => {
            await result.current.handleAddLike(1);
        });


        expect(recipesApi.addLike).toHaveBeenCalledWith(1);
        expect(result.current.filteredRecipes[0].likesCount).toBe(1);
    });


    test('should handle error in adding like', async () => {
        (recipesApi.addLike as jest.Mock).mockResolvedValue({ ok: false });


        const { result } = renderHook(() => useRecipeActions(mockFilterFn));


        global.alert = jest.fn();


        await act(async () => {
            await result.current.handleAddLike(1);
        });


        expect(global.alert).toHaveBeenCalledWith('Error adding like.');
    });
});
