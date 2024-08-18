import { renderHook, act } from '@testing-library/react-hooks';
import useRecipeActions from '../hooks/useRecipeActions';
import recipesApi from '../api/recipes';
import useApi from '../hooks/useApi';
import { Alert } from 'react-native';


jest.mock('@react-native-async-storage/async-storage', () => 
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'));
jest.mock('../hooks/useApi');
jest.mock('../api/recipes');
jest.spyOn(Alert, 'alert');

describe('useRecipeActions Hook', () => {
  const mockRequest = jest.fn();
  const mockFilterFn = jest.fn(data => data);

  beforeEach(() => {
    jest.clearAllMocks();
    useApi.mockReturnValue({
      request: mockRequest,
      data: [
        { id: 1, name: 'Recipe 1', likesCount: 0 },
        { id: 2, name: 'Recipe 2', likesCount: 0 },
      ],
    });
  });

  test('should refresh recipes when handleRefresh is called', async () => {
    const { result } = renderHook(() => useRecipeActions(mockFilterFn));

    await act(async () => {
      await result.current.handleRefresh();
    });

    expect(mockRequest).toHaveBeenCalledTimes(2); // One from useEffect, one from handleRefresh
    expect(result.current.refreshing).toBe(false);
  });

  test('should add a like when handleAddLike is called', async () => {
    recipesApi.addLike.mockResolvedValue({ ok: true });
    const { result } = renderHook(() => useRecipeActions(mockFilterFn));

    await act(async () => {
      await result.current.handleAddLike(1);
    });

    expect(recipesApi.addLike).toHaveBeenCalledWith(1);
    expect(result.current.filteredRecipes[0].likesCount).toBe(1);
  });

  test('should show alert and delete recipe when handleDelete is called and confirmed', async () => {
    recipesApi.deleteRecipe.mockResolvedValue({ ok: true });

    const { result } = renderHook(() => useRecipeActions(mockFilterFn));

    act(() => {
      result.current.handleDelete(1);
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "Delete",
      "Are you sure you want to delete this recipe?",
      expect.any(Array)
    );

    // Simulate pressing 'Yes' in the alert
    await act(async () => {
      const alertCallbacks = Alert.alert.mock.calls[0][2];
      alertCallbacks[0].onPress(); 
    });

    expect(recipesApi.deleteRecipe).toHaveBeenCalledWith(1);
    expect(result.current.filteredRecipes).toEqual([{ id: 2, name: 'Recipe 2', likesCount: 0 }]);
  });

  test('should not delete recipe when alert is canceled', () => {
    const { result } = renderHook(() => useRecipeActions(mockFilterFn));

    act(() => {
      result.current.handleDelete(1);
    });

    expect(Alert.alert).toHaveBeenCalled();

    // Simulate pressing 'No' in the alert
    act(() => {
      const alertCallbacks = Alert.alert.mock.calls[0][2];
      alertCallbacks[1] = { ...alertCallbacks[1], onPress: jest.fn() };
      alertCallbacks[1].onPress(); 
    });

    expect(recipesApi.deleteRecipe).not.toHaveBeenCalled();
    expect(result.current.filteredRecipes.length).toBe(2);
  });

  test('should filter recipes based on filterFn', () => {
    const mockFilterFn = jest.fn(data => data.filter(recipe => recipe.id == 1));
    const { result } = renderHook(() => useRecipeActions(mockFilterFn));


    act(() => {
      
    });

    // Assert the filtered recipes based on the mockFilterFn
    expect(result.current.filteredRecipes.length).toEqual(1);
  });
});

