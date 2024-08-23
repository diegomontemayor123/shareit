import { renderHook, act } from '@testing-library/react-hooks';
import { Alert } from 'react-native';
import useSubmitRecipe from '../hooks/useSubmitRecipe';
import recipesApi from '../api/recipes';
import useAuth from '../auth/useAuth';
import useLocation from '../hooks/useLocation';
import routes from '../navigation/routes';


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


jest.mock('expo-location', () => ({
    getCurrentPositionAsync: jest.fn(),
    requestForegroundPermissionsAsync: jest.fn(),
    requestBackgroundPermissionsAsync: jest.fn(),
}));


jest.mock('../api/recipes');
jest.mock('../auth/useAuth');
jest.mock('../hooks/useLocation');
jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());




const mockNavigation = { navigate: jest.fn() };
const mockResetForm = jest.fn();
const mockUser = { email: 'user@example.com', name: 'User' };
const mockLocation = { latitude: 0, longitude: 0 };


describe('useSubmitRecipe Hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
        (useLocation as jest.Mock).mockReturnValue(mockLocation);
    });


    test('should handle successful recipe submission', async () => {
        const mockRecipe = {
            id: '1',
            title: 'Recipe Title',
            time: '30 mins',
            category: { value: 'Dessert', icon: '🍰', backgroundColor: '#f5a623' },
            description: 'Delicious dessert',
            user: mockUser,
            images: ['image1.png'],
            location: mockLocation,
        };


        const mockAddRecipeResponse = { ok: true, data: mockRecipe };
        const mockGetRecipesResponse = { data: [mockRecipe] };


        (recipesApi.addRecipe as jest.Mock).mockResolvedValue(mockAddRecipeResponse);
        (recipesApi.getRecipes as jest.Mock).mockResolvedValue(mockGetRecipesResponse);


        const { result } = renderHook(() => useSubmitRecipe({ navigation: mockNavigation }));


        await act(async () => {
            await result.current.handleSubmit(mockRecipe, { resetForm: mockResetForm });
        });


        expect(recipesApi.addRecipe).toHaveBeenCalledWith(
            { ...mockRecipe, location: mockLocation },
            expect.any(Function),
            mockUser
        );
        expect(recipesApi.getRecipes).toHaveBeenCalled();
        expect(mockNavigation.navigate).toHaveBeenCalledWith(routes.RECIPE_DETAILS, mockRecipe);
        expect(mockResetForm).toHaveBeenCalled();
        expect(result.current.uploadVisible).toBe(false);
        expect(result.current.progress).toBe(0);
    });


    test('should handle recipe submission error', async () => {
        const mockRecipe = {
            id: '1',
            title: 'Recipe Title',
            time: '30 mins',
            category: { value: 'Dessert', icon: '🍰', backgroundColor: '#f5a623' },
            description: 'Delicious dessert',
            user: mockUser,
            images: ['image1.png'],
            location: mockLocation,
        };


        const mockAddRecipeResponse = { ok: false, data: null };


        (recipesApi.addRecipe as jest.Mock).mockResolvedValue(mockAddRecipeResponse);


        const { result } = renderHook(() => useSubmitRecipe({ navigation: mockNavigation }));


        await act(async () => {
            await result.current.handleSubmit(mockRecipe, { resetForm: mockResetForm });
        });


        expect(recipesApi.addRecipe).toHaveBeenCalledWith(
            { ...mockRecipe, location: mockLocation },
            expect.any(Function),
            mockUser
        );
        expect(Alert.alert).toHaveBeenCalledWith("Could not save the recipe");
        expect(mockResetForm).toHaveBeenCalled();
        expect(result.current.uploadVisible).toBe(false);
    });


    test('should handle error in fetching updated recipe', async () => {
        const mockRecipe = {
            id: '1',
            title: 'Recipe Title',
            time: '30 mins',
            category: { value: 'Dessert', icon: '🍰', backgroundColor: '#f5a623' },
            description: 'Delicious dessert',
            user: mockUser,
            images: ['image1.png'],
            location: mockLocation,
        };


        const mockAddRecipeResponse = { ok: true, data: mockRecipe };
        const mockGetRecipesResponse = { data: [] }; // Empty recipes response


        (recipesApi.addRecipe as jest.Mock).mockResolvedValue(mockAddRecipeResponse);
        (recipesApi.getRecipes as jest.Mock).mockResolvedValue(mockGetRecipesResponse);


        const { result } = renderHook(() => useSubmitRecipe({ navigation: mockNavigation }));


        await act(async () => {
            await result.current.handleSubmit(mockRecipe, { resetForm: mockResetForm });
        });


        expect(recipesApi.addRecipe).toHaveBeenCalledWith(
            { ...mockRecipe, location: mockLocation },
            expect.any(Function),
            mockUser
        );
        expect(recipesApi.getRecipes).toHaveBeenCalled();
        expect(Alert.alert).toHaveBeenCalledWith("Could not fetch the updated recipe from the server");
        expect(mockResetForm).toHaveBeenCalled();
        expect(result.current.uploadVisible).toBe(false);
    });


    test('should handle unexpected error', async () => {
        const mockRecipe = {
            id: '1',
            title: 'Recipe Title',
            time: '30 mins',
            category: { value: 'Dessert', icon: '🍰', backgroundColor: '#f5a623' },
            description: 'Delicious dessert',
            user: mockUser,
            images: ['image1.png'],
            location: mockLocation,
        };


        (recipesApi.addRecipe as jest.Mock).mockRejectedValue(new Error('Unexpected error'));


        const { result } = renderHook(() => useSubmitRecipe({ navigation: mockNavigation }));


        await act(async () => {
            await result.current.handleSubmit(mockRecipe, { resetForm: mockResetForm });
        });


        expect(Alert.alert).toHaveBeenCalledWith("An unexpected error occurred");
        expect(result.current.uploadVisible).toBe(false);
    });
});


