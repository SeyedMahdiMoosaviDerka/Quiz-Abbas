engagement-fs-task
Home Assignment: Sports Event Quiz Web
Application
Overview
Develop a responsive, single-page web application that displays sports events and allows users to
play a quiz by selecting answers. The solution should be implemented using either JavaScript/
TypeScript (with your choice of API) or Elixir + LiveView, if you want an additional challenge.
Backend Requirements
• Data & Persistence:
◦ The candidate is free to choose any database, but SQL-based databases are preferred
◦ Seed the database with some dummy data:
▪ Events: Each event has a name, start time, and info.
▪ Questions: Each event can have up to 5 questions.
▪ Question Format: A question (text) with up to 6 predefined answers (text). User
can pick only one answer per question.
◦ Save user answers to the database (no logic needed for verifying correctness).
◦ No user authentication is required. A random user ID should be generated every time
the page is loaded and used to associate the user’s answers.
• API (for JS/TS option):
◦ Provide endpoints to fetch event and question data.
◦ Endpoint to store user answers.
• Testing:
◦ Include tests covering backend functionality.
Frontend Requirements
• General:
◦ The UI must be fully responsive.

◦ Avoid using component libraries if possible.
◦ Write tests covering UI components and user interactions.
• Views:
i. Main App Page (Events List):
▪ Display all events as cards. Each event card should include:
▪ Event Name: E.g., “Manchester City vs Manchester United”
▪ Time Until Start: Countdown until the event begins.
▪ Event info: E.g., “Answer 5/5 questions and win 50 USDT, Answer 4/5 and win
10 USDT”
▪ Start Button: A button to begin the quiz for that event.
▪ Candidates are encouraged to customize the visuals (e.g., add country flags, club
logos, animations) to enhance appeal.
ii. Quiz View (Questions):
▪ Upon clicking an event, present the first question.
▪ For each question:
▪ Display the question text and up to 6 possible answers.
▪ Allow the user to select one answer.
▪ Provide a way to proceed to the next question.
▪ Visual customization is encouraged to make the quiz experience engaging.
iii. Summary View:
▪ After all questions are answered, display a summary screen showing the user’s
selected answers.
▪ Visual enhancements to improve the presentation are welcome.
Additional Notes
• No Answer Validation: There is no need to implement any logic for checking if an answer is
correct.
• Customization & Creativity: While requirements are defined, creative visual improvements
and design enhancements are highly encouraged.
• Repository The task should be implemented in a private github repository. Please notify us
when it’s done and we will share our usernames so you could invite us to the repo.
• Setup The project should have documentation or scripts explaining how to run the project
locally (e.g. a README file that explains how to run the app with database & seeded data
locally).

