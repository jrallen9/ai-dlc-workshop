# S3 File-Sharing System Prompts

Extracted copyable prompt blocks from `../../website/public/s3-file-sharing.html`.

## 1. Start Activity 1: Start the Workflow (10 minutes)

 Make sure vision.md is in your workspace before starting. You kick off the entire workflow by pointing the AI to it — AI-DLC Workflow takes it from there.

 💡 Think about your file-sharing system: The vision.md file has all the details. This one prompt points the AI to it. The workflow reads the file, asks you clarifying questions, and handles the phasing automatically.
 Open a new chat and type:

 CopyUsing AI-DLC, build the system described in vision.md.
 AI-DLC Workflow activates and runs Workspace Detection automatically. It will display a welcome message, scan your workspace (including vision.md), set up the aidlc-docs/ directory with state and audit tracking, and proceed to the next stage.

 🔵 INCEPTION PHASE — No code is generated. This phase is about understanding what to build and why.

 Inception Activity 2: Requirements Analysis (~15 minutes)

 The AI analyzes your request and the vision.md file, then asks clarifying questions about role permissions, file sharing workflows, storage limits, authentication approach, etc.

 💡 Think about your file-sharing system: What can each role do — can Viewers only view, or can they also download? What file types and size limits apply? How does sharing work — by link, by user, or by group?
 When the AI presents the questions file: Open it, fill in your [Answer]: tags. Then tell the AI:

 CopyI have answered the clarification questions. Please re-read the file and proceed.
 The AI may ask follow-up questions. Once resolved, it generates a requirements document and presents an approval gate.

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.

 Inception Activity 3: User Stories (~25 minutes)

 The AI creates user stories based on the vision.md requirements. It runs in two parts: first it plans how to structure the stories, then it generates them with personas and acceptance criteria.

 💡 Think about your file-sharing system: You'll get stories for each role — Admin managing users, Uploader sharing files, Reader accessing shared content, Viewer browsing. The acceptance criteria define the contract for code generation.
 Part 1 — Planning: The AI creates a story generation plan with questions. Open the plan file, fill in your answers, then tell the AI you're done.

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.
 Part 2 — Generation: The AI executes the plan step by step, marking checkboxes as it goes.

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.
 💡 Context reset (optional): For longer sessions, starting a fresh chat here helps maintain output quality. Resume with: Go to aidlc-docs/aidlc-state.md, find the first unchecked item, then go to the corresponding plan file and resume from that point. For shorter workshops, you can skip this and continue in the same chat.

 Inception Activity 4: Workflow Planning + Units (~10 minutes)

 The AI determines which Construction stages to run and decomposes the system into multiple units that can be built independently. Each unit contains highly cohesive user stories. The units are loosely coupled and ordered so everything is built properly.

 💡 Think about your file-sharing system: The ordering of units matters — backend units need to be built before frontend. Make sure Infrastructure Design is included since you need deployment.
 Make sure Infrastructure Design is included. If it's marked SKIP:

 CopyAdd Infrastructure Design to the plan. We need deployment to us-west-2.
 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.
 💡 Context reset (optional): Starting a fresh chat before Construction can help if the Inception phase was long. Skip if things are going smoothly.

 🟢 CONSTRUCTION PHASE

 Construction Activity 5: Functional Design (~20 minutes)

 AI-DLC Workflow designs the detailed component model — all components, attributes, behaviors, and how they interact to implement the user stories. Components should be at a business level, no code yet.

 💡 Think about your file-sharing system: The design will cover components for user management, file operations, sharing/permissions, and the frontend. Watch how the AI maps role-based permissions across components.
 Review the design. If you want changes, tell the AI. When satisfied:

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.

 Construction Activity 6: Code Generation (~60 minutes)

 The main build activity. The AI creates a plan, gets your approval, then executes step by step. Code goes in the workspace root, documentation goes in aidlc-docs/.

 💡 Think about your file-sharing system: The plan should cover both backend and frontend. Key things to watch for:

 Bootstrap CDN styling with creative color theme (not default blue), responsive layout, visual hierarchy, hover effects

 No mock data hardcoded — use real DynamoDB, real S3. Final app should not have any mock data hardcoded anywhere

 SAM to test Lambda functions locally, SAM Local for faster iteration

 Lambda layers verified before deployment with a verification script, layer structure documented in code

 Follow AWS Lambda Layer Best Practices from start

 Check Lambda Context Attributes and reference AWS documentation for correct attribute names

 Read CloudWatch Logs immediately after first deploy

 Only npm install and npm run build — no dev server, deploy separately

 TODO file for post-deployment tasks tracking failed actions

 Backend requests tested with real HTTPS requests

 Check off corresponding tasks in spec task docs as they complete

 Part 1 — Planning: The AI creates a code generation plan with numbered, checkboxed steps. Review that it covers all units and components.

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.
 Part 2 — Generation: The AI executes each step, checking off tasks in both the plan and the spec task docs.

 When complete, review the generated code and respond:

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.
 💡 Context reset (optional): Consider a fresh chat if the session has been running long. Skip if things are going smoothly.

 Construction Activity 7: Infrastructure Design + Deployment (~30 minutes)

 The AI designs the AWS deployment architecture and generates CloudFormation YAML. This covers:

 A private S3 bucket with a random prefix (e.g. -react-app-bucket-s3-file-share-workshop)

 A CloudFront distribution with Origin Access Control and bucket policy

 Valid IAM policy documents including Version: '2012-10-17' (quoted) with proper resource ARNs

 CloudFormation outputs: Buckets, Distribution ID, and CloudFront URL

 App accessible at the default CloudFront domain at root path

 The AI will also handle deployment using AWS CLI:

 Validate using validate-template command and edit if needed

 Deploy the stack (the AI will determine the stack name)

 Monitor for successful completion and report stack deployment status

 Look up the distribution ID and URL from stack outputs

 Update the React app with the CloudFront URL (React Router basename, package.json, .env)

 Build the React application and copy web assets to S3

 Deploy server-side components (Lambda, API Gateway, DynamoDB)

 curl the full URL to verify access works

 This workstation already has appropriate permissions for the AWS CLI using an IAM Role with an EC2 instance profile.
 📋 The AI will present approval gates at each step — review and approve to continue, or request changes if needed.

 Construction Build and Test (~10 minutes)

 AI-DLC Workflow generates build and test instructions. Check the TODO file for any post-deployment tasks that need to be executed.

 The exact directory names, file names, stack outputs, and URLs will vary. Check the build instructions and CloudFormation stack outputs for the exact values.

 🟡 OPERATIONS PHASE

 Operations Activity 8: Operations Discussion (~10 minutes)

 AI-DLC Workflow's Operations phase is a placeholder for future expansion. This is a group discussion about what comes after building.

 💡 Think about your file-sharing system: How would you monitor storage usage and costs? How would you handle cold starts for the API? What about file versioning and lifecycle policies? How would you add audit logging for file access?
 Discuss as a group:

 CopyNow that we've built and deployed our file sharing system, discuss how AI would help with:
1. Monitoring storage, API performance, and usage
2. Managing file lifecycle policies and versioning
3. Adding audit logging for file access and role changes
4. Scaling the system as users and files grow

Please explain how this would work for our specific application.

 Tips

 Answer questions in the files, not in chat. Open the markdown file, fill in your [Answer]: tags, then tell the AI to re-read.

 Context resets are optional but valuable for long sessions. If the AI starts losing track of earlier decisions or output quality drops, start a fresh chat and resume from aidlc-state.md. For short workshops, you can often skip this.

 Don't edit generated code directly. Tell the AI to update the design first, then regenerate.

 You're always in control. Nothing proceeds without your approval. Say "Request Changes" anytime.

 Check aidlc-state.md to see where you are at any point.

 Check the TODO file after deployment for any failed actions that need to be re-executed.

 File names and structure will vary. AI-DLC Workflow determines file names, directory structure, and plan steps based on your project.

 Run each prompt separately and allow to complete before moving to next prompt.

 Inception AI-DLC 1: Build the User Stories

Source ID: `p-0`

```text
You are an expert product manager and are tasked with creating well defined user stories that becomes the contract for developing the system as mentioned in the Task section below. Plan for the work ahead and write your steps in a Markdown file: .aidlc/user_stories_plan.md with checkboxes for each step in the plan. List your Deliverables in the plan. If any step needs my clarification, add a note in the step to get my confirmation. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Build user stories for the high level requirements as described here in the markdown file vision.md

Write the user stories to a .aidlc/user_stories.md file
```

## 2. Inception AI-DLC 2: Create the units with specs

Source ID: `p-1`

```text
Your Role: You are an experienced software architect. Before you start the task as mentioned below, please do the planning and write your steps in the .aidlc/units_plan.md file with checkboxes against each step in the plan. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Group the user stories in .aidlc/user_stories.md into multiple units that can be built independently. Each unit contains highly cohesive user stories that can be built by a single team. The units are loosely coupled with each other. For each unit, create a spec folder in specs/ with requirements, design, and tasks. The units must be in order so everything is built properly.
```

## 3. Construction AI-DLC 3: Create the Component Model

Source ID: `p-2`

```text
Your Role: You are an experienced software architect and engineer. Before you start the task as mentioned below, please do the planning and write your steps in in a Markdown file named .aidlc/component_model_plan.md with checkboxes against each step in the plan. List your Deliverables in the plan file. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.
 
Your Task: 
Refer to all the specs/. Design the component model to implement all the user stories. This model shall contain all the components, the attributes, the behaviors and how the components interact to implement the user stories. 
-	The components should be at a business level, do not generate any code yet. 
-	Write the component model into a Markdown file: .aidlc/component_model.md.
```

## 4. Construction AI-DLC 4: Build the code for the vision

Source ID: `p-3`

```text
Your Role: You are an experienced software engineer. Read the specs documents and proceed with building the application, task by task. Before you start building please do the planning and write your steps in the markdown file .aidlc/app_plan.md file with checkboxes against each step in the plan. List your Deliverables in the plan file. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval.

After my approval, execute the same plan and all the specs in specs/ folder, one step at a time. Remember to check off each task as it gets completed, check off the corresponding task in the spec task docs, and if the task involves a back-end, server-side, request make sure to test it with a real HTTPS request. NEVER mock up any data except when you need a placeholder. The final app should not have any mock data hardcoded anywhere.
Task: You MUST refer to component design in the .aidlc/component_model.md file and the .aidlc/user_stories.md file.
-	Use modern design styling for the UX with Bootstrap CDN: icons, color theme, responsive layout, intuitive visual hierarchy, CSS for hover effects
-	Choose a creative professional color theme avoiding default blue (e.g. green, blue, teal, gray, purple, orange, teal etc.) 
-	Do not run the npm dev server, only use npm-install and npm-run-build. We will deploy the app separately
-	Create a TODO file for post-deployment tasks where you keep track of actions that failed and you need to execute after a full deploy
-	Use SAM to test lambda functions locally
-	Verify Lambda layers structure before first deployment, create a layer verification script, and document the layer structure in code
-	Follow AWS Lambda Layer Best Practices from Start
-	Check Lambda Context Attributes and reference AWS documentation via the AWS Docs MCP server for the correct attribute names
-	Use SAM Local for Faster Iteration
-	Read CloudWatch Logs Immediately After First Deploy
```

## 5. Operations AI-DLC 5: Deploy the code

Source ID: `p-4`

```text
Your Role: You are an experienced Cloud Architect. Before you start the task as mentioned below, please do the planning and write your steps in the markdown file .aidlc/deployment_plan.md file with checkboxes against each step in the plan. List your Deliverables in the plan file. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.  
Task: Use the following steps to deploy the application code generated in the backend and react-app folders to AWS us-west-2 Region. This workstation already has appropriate permissions for the AWS CLI using an IAM Role with an EC2 instance profile.
Step 1: Create and Deploy IaC for the React app 
Create a CloudFormation YAML file that defines:
  - A private S3 bucket with a random prefix. E.g. <prefix>-react-app-bucket-s3-file-share-workshop
  - A CloudFront distribution with a path pattern pointing to the S3 origin with Origin Access Control and Bucket policy
- CloudFormation Outputs: Buckets, Distribution ID, and CloudFront URL 
- Ensure all IAM policy documents are valid, including Version: '2012-10-17' (quoted) and use proper resource ARNs (e.g., arn:aws:s3:::bucket/* for object access).
The app should be accessible at the default CloudFront distribution domain name at the root path. E.g. https://<distribution-prefix>.cloudfront.net/
Step 2: USE AWS CLI to deploy the CloudFormation template 
- Validate using validate-template command and edit if needed
- Deploy using Stack names: s3-file-share-workshop
- Monitor for successful completion and keep me updated with the Stack deployment status 
- Once complete, lookup the distribution ID and URL from the stack outputs.
Step 3: Deploy the React App and Server Side components
- Update the React application with any prefix and CloudFront URL. E.g. the React Router basename, package.json, .env file, and any other files you deem relevant
- Build the React application
- Copy the web assets to the S3 origin
- curl the full URL to verify that the access works
```
