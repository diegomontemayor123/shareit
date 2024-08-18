describe('Recipe Edit Screen', () => {
  beforeAll(async () => {
    await device.launchApp(); 
  });

  it('should add a new recipe successfully', async () => {
    // Ensure you are on the RecipeEditScreen
    await expect(element(by.text('Title'))).toBeVisible();

    // Add a title
    await element(by.placeholder('Title')).typeText('Delicious Pancakes');

    // Add time
    await element(by.placeholder('Time to Complete')).typeText('30');

    // Select category (assuming Picker item text exists)
    await element(by.text('Cuisine')).tap();
    await element(by.text('Dessert')).tap(); // Select 'Dessert' as category

    // Add description
    await element(by.placeholder('Recipe - Please separate each step with a period \'.\''')).typeText('Mix ingredients and cook for 30 minutes.');

    // Upload an image (mocked as part of FormImagePicker)
    await element(by.text('Image Picker')).tap();
    // Simulate image picking if necessary (mocking behavior if needed)

    // Submit the form
    await element(by.text('Post')).tap();

    // Check that the upload screen becomes invisible
    await expect(element(by.text('Upload Screen'))).toBeNotVisible();

    // Verify if navigation happens correctly (assuming you get redirected to recipe details or confirmation)
    await expect(element(by.text('Recipe Details'))).toBeVisible(); // Modify as needed
  });
});
