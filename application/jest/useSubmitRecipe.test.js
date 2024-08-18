import { renderHook, act } from '@testing-library/react-hooks';
import useSubmitRecipe from '../hooks/useSubmitRecipe';
import recipesApi from '../api/recipes';
import useAuth from '../auth/useAuth';
import useLocation from '../hooks/useLocation';
import { Alert } from 'react-native';
import routes from '../navigation/routes';

jest.mock('@react-native-async-storage/async-storage', () => 
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'));
jest.mock('../api/recipes');
jest.mock('../auth/useAuth');
jest.mock('../hooks/useLocation');
jest.spyOn(Alert, 'alert');

describe('useSubmitRecipe Hook', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({ user: { id: 1, name: 'Test User' } });
    useLocation.mockReturnValue('Test Location');
  });

  test('should handle submit recipe successfully', async () => {
  
    recipesApi.addRecipe.mockResolvedValue({
      ok: true,
      data: { _id: 1 },
    });
    recipesApi.getRecipes.mockResolvedValue({
      data: [{ id: 1, name: 'Test Recipe', location: 'Test Location' }],
    });

    const { result } = renderHook(() => useSubmitRecipe({ navigation: mockNavigation }));

    await act(async () => {
      await result.current.handleSubmit({ name: 'New Recipe' }, { resetForm: jest.fn() });
    });

    expect(recipesApi.addRecipe).toHaveBeenCalledWith(
      { name: 'New Recipe', location: 'Test Location' },
      expect.any(Function),
      { id: 1, name: 'Test User' }
    );
    expect(recipesApi.getRecipes).toHaveBeenCalled();

    // Verify navigation
    expect(mockNavigation.navigate).toHaveBeenCalledWith(routes.RECIPE_DETAILS, {
      id: 1,
      name: 'Test Recipe',
      location: 'Test Location',
    });
  });

  test('should handle submit recipe failure', async () => {
    // Mock API responses
    recipesApi.addRecipe.mockResolvedValue({ ok: false });

    const { result } = renderHook(() => useSubmitRecipe({ navigation: mockNavigation }));

    await act(async () => {
      await result.current.handleSubmit({ name: 'New Recipe' }, { resetForm: jest.fn() });
    });

    // Verify the upload visibility changes and alert
    expect(result.current.uploadVisible).toBe(false);
    expect(Alert.alert).toHaveBeenCalledWith('Could not save the recipe');
  });

  test('should handle failure when fetching updated recipe', async () => {
    // Mock API responses
    recipesApi.addRecipe.mockResolvedValue({
      ok: true,
      data: { _id: 1 },
    });
    recipesApi.getRecipes.mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useSubmitRecipe({ navigation: mockNavigation }));

    await act(async () => {
      await result.current.handleSubmit({ name: 'New Recipe' }, { resetForm: jest.fn() });
    });

    // Verify the upload visibility changes and alert
    expect(result.current.uploadVisible).toBe(false);
    expect(Alert.alert).toHaveBeenCalledWith('Could not fetch the updated recipe from the server');
  });

  test('should update progress during upload', async () => {
    // Mock API responses
    const simulateProgress = () => {
      return new Promise((resolve) => {
        setTimeout(resolve, 200); // Simulate delay for each progress update
      });
    };

    recipesApi.addRecipe.mockImplementation(async (recipe, onUploadProgress) => {
      // Simulate progress updates
      for (let progress = 0; progress <= 1; progress += 0.1) {
        await simulateProgress(); 
        onUploadProgress(progress * 100); 
      }
      return { ok: true, data: { _id: 1 } };
    });

    recipesApi.getRecipes.mockResolvedValue({
      data: [{ id: 1, name: 'Test Recipe', location: 'Test Location' }],
    });

    const { result } = renderHook(() => useSubmitRecipe({ navigation: mockNavigation }));

    await act(async () => {
      await result.current.handleSubmit({ name: 'New Recipe' }, { resetForm: jest.fn() });
    });

    
    expect(result.current.progress).toBeGreaterThan(99);
  });
});
