# To-Do List App

A simple, user-friendly To-Do List web application built with HTML, CSS, and JavaScript.

## Features

- Add tasks with optional due dates
- Mark tasks as completed by clicking on them
- Delete individual tasks with a dedicated **Delete** button
- Undo the last deleted task using the **Undo Delete** button
- Reset and clear all tasks with confirmation
- Search tasks by keywords in real time
- Filter tasks by **All**, **Completed**, and **Pending**
- Dark and Light theme toggle with persistence using localStorage
- Tasks and theme settings are saved in localStorage for persistence across browser sessions

## How to Use

1. Open `index.html` in your web browser.
2. Use the input box to add a new task. Optionally select a due date.
3. Click **Add** or press Enter to add the task.
4. Click on a task to mark it completed or pending.
5. Click **Delete** next to a task to remove it.
6. Use the **Undo Delete** button to restore the last deleted task.
7. Use **Reset All** to clear all tasks.
8. Use the search box to filter tasks by keyword.
9. Use the filter buttons to show all, completed, or pending tasks.
10. Toggle the theme between light and dark mode using the top right button.

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Browser localStorage for data persistence

## Installation

No installation needed! Simply clone or download this repository and open `index.html` in your browser.

```bash
git clone https://github.com/mendoncaarnold/todo-list-app.git
cd todo-list-app
open index.html
