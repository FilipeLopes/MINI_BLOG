# MINI_BLOG
 Mini blog using react and firebase

Serverless Project Installation:

1. Create the folder where the project will be installed
2. Open the folder inside VSCode
3. Right-click on the folder in VSCode and open the terminal
4. Type "npx create-react-app projectname" (wait for the react installation)
5. At the end of the installation type "cd projectname" in the terminal to access the new "projectname" folder
6. Type "npm i react-router-dom" to install the React Router
7. After installation, you can type "npm start" and the service will start
8. Access the project and open the src folder in VSCode and create the following folders:
    8.1. pages (for the created pages in the project)
    8.2. components (for the created components in the project)
    8.3. hooks (for the created hooks in the project)
    8.4. context (for all the created context in the project)
    8.5. firebase (for firebase config)


Firebase instalation:

1. Access firebase at google and criate a new db
2. In "Get started by adding Firebase to your app" select web and register the app with a nickname, at the end select "continue to console"
3. In the root file open the terminal and type "npm i firebase@9.16.0" (the last version is showing an error)
4. In firebase website select the project and take the "SDK setup and configuration"
5. Open firebase vscode file and create a file called config.js and paste the configuration from step 4
6. In config.js include the import "import { getFirestore } from "firebase/firestore";"
7. And include the lines (at the end of the code):
    "const db = getFirestore(app); 
    export { db };"