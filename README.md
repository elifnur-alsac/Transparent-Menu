In the directory of the project, first you should run npm i command, then to start the project ypu should type and execute npm start command.

- Welcome Page:
  The user can first view the Welcome Page. On this page, a promotional letter for the restaurant meets the user. A menu button is located on the page to direct the user to the menu.

- Menu Page:
  Users can list a variety of meals on the Menu page. Users can access ingredients information under the meals. Users can also sort the meals alphabetically ascending or descending according to the meal name. Users can apply filtering for vegan, vegetarian, or all of them. Users are referred to the Meals page to get detailed information about meals with Details button.

- Meals Page:
  Users can view detailed information on the meals page for the selected meal. A 3-level ingredient list as low, medium and high has been prepared for the ingredients of the meal. Users can observe price changes by selecting the ingredient they want for that meal. The quality is calculated dynamically according to the ingredient they choose.
According to the quality calculation;
30 = high
20-30 = medium-high
20 = medium
10-20 = low-medium
10 = low

- Error Handling:
	In the data provided for the task, there are 2 meals whose name of meal and name of ingrediens do not match. Since the name matching method was used for meals and ingredients, in this case, there was a mismatch in the calculations of quality and price for two meals. I could not access ingredients information in data with incompatibility and had to be treated as null value. To deal with this situation, the ingredient data that gave null value in the calculation of quality and price was not included in the calculation and a warning massage was displayed for the user. Another way would be to do a substring mapping between the meals name and the ingrediensts name, but in this case there would be undesired matches. For example, incorrect calculations could occur due to the matching of the words "sauce" for the contents of "apple sauce" and "orange sauce".
	An error message is also displayed for users for meals pages that cannot be accessed using the UI.

