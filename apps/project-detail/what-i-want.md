this project is a monorepo nx react nestjs ts project that is develped so far for.
im working on a task that is defined in file: project-detail\task-detail.md and its a hire task so any extra work consider bonus and i have plan to implement this ones:
for backend:
0-all implementation that is required in project-detail\task-detail.md with best possible approach.
1- Since the requirements don’t specify time-based restrictions, this isn’t mandatory. However, adding a time check is a great idea for extra credit:
Feature: Disable the "Start Quiz" button for events that have already started, showing a message like "Event has started, quiz is closed."
Implementation:
Store a start_time field in the Event entity (e.g., as a timestamp).
On the frontend, compare the current time with start_time before enabling the quiz.
Benefit: This demonstrates attention to real-world usability (e.g., preventing quiz access after an event begins) and could impress evaluators.

4- Per the requirements, no strict validation is needed—accept garbage data with at most a warning in the response. The summary page shouldn’t break with garbage data. i suggest an optional API parameter to control answer evaluation (e.g., "moderate" or "strict").
Default Behavior:
Accept all answers (even garbage) without validation, as per the requirements.
The API response might include a warning (e.g., "message": "Some answers may be invalid") but won’t reject submissions.
The summary page will display whatever is submitted, gracefully handling nonsense data (e.g., showing "User answered: xyz" even if it’s invalid).
Optional Parameter:
Add an optional query parameter to the submission endpoint: POST /answers?validationLevel=<level>:
none (default): Accept all answers, no checks.
moderate: Ensure all questions are answered and no extra data is included (e.g., no additional fields beyond expected).
strict: Check that answers match predefined options (e.g., from the answers JSON array in the Question entity).
This adds flexibility without overcomplicating the core requirements.
5- Time-Based Quiz Availability:
disable quizzes for events that have started.
7- Multi-Sport Support and be able too add new sports with this data: add country flags, club
logos, animations to enhance appeal sport name , team name country name and club name
9- full swagger document using mock.ts and decorator.ts and swagger-config.ts in backend/src/configs/swagger
10- clean architecture and solid principle.
for frontend:
1- Adding an Admin Page (Without Authentication)
Features of the Admin Page:
Event Management: Allow admins to create, read, update, and delete (CRUD) events. For example, adding a new quiz event for a specific sport or editing an existing one.
User Answers View: Display a list of all user-submitted answers with options to:
Sort: Order answers by submission time, event, or user ID.
Filter: Narrow down answers by event, sport, or specific users.
beside that extra work i had to write test for both backend and frontend so check project and task data in pdf i attached and give step by step update of each file so i can copy them in project.
2- Quiz Progress Persistence:
Save answers in localStorage as the user progresses, so they can resume if the page reloads mid-quiz.
3- I like persisting the user ID but want it saved only during a quiz. After the quiz ends and the page reloads, a new ID should be generated. Submitted answers should persist to prevent re-answering on reload.
User ID Logic:
When the user starts a quiz, generate a random user ID (e.g., a UUID) and store it in localStorage.
Use this ID for all actions during the quiz (e.g., tracking progress, submitting answers).
After the quiz is submitted, clear the ID from localStorage. On page reload, a new ID will be generated if the user starts another quiz.
Submitted Answers Persistence:
Once answers are submitted to the server, store them in the database linked to the user ID.
On page reload, the frontend checks if a quiz is in progress (e.g., ID exists in localStorage and answers aren’t submitted yet). If so, restore the quiz state. If the quiz is already submitted, show the summary instead.
This prevents users from re-answering a completed quiz while allowing in-progress quizzes to resume.
This approach ensures a seamless user experience and meets your requirements perfectly.
4- Since i prefer batch submission and the quiz is short , we could:
Store answers locally (e.g., in localStorage) as the user progresses.
Submit them all when the user clicks "Submit Quiz." This balances apps preference with practicality.
5- Time-Based Quiz Availability:
disable quizzes for events that have started. and count down for events
for project:
