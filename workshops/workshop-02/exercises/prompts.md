# Job Application Website with CDK Prompts

Extracted copyable prompt blocks from `../../website/public/job-application-cdk.html`.

## 1. Start Activity 1: Start the Workflow (10 minutes)

 You kick off the entire workflow with a single prompt describing what you want to build. AI-DLC Workflow takes it from there — it detects your workspace, sets up tracking, and starts guiding you through the phases.

 💡 Think about your job application site: This one prompt captures the intent — what to build and for whom. The tech details come later during Construction and Operations. The workflow handles the phasing automatically.
 Open a new chat and type:

 CopyUsing AI-DLC, build a job application management site that allows applicants to search, view, and apply to job postings.
 AI-DLC Workflow activates and runs Workspace Detection automatically. It will display a welcome message explaining the three-phase lifecycle (Inception → Construction → Operations), scan your workspace, set up the aidlc-docs/ directory with state and audit tracking, and proceed to the next stage.

 🔵 INCEPTION PHASE — No code is generated. This phase is about understanding what to build and why.

 Inception Activity 2: Requirements Analysis (~15 minutes)

 The AI analyzes your request and asks clarifying questions about anything unclear. You'll also see a question about enabling security extension rules.

 💡 Think about your job application site: What fields should a job posting have — title, company, location, salary range? What does "apply" mean — a form submission or just a button click? Should search be full-text or filter-based?
 When the AI presents the questions file: Open it, fill in your [Answer]: tags. For the security extension question, answer "No" since this is a prototype. Then tell the AI:

 CopyI have answered the clarification questions. Please re-read the file and proceed.
 The AI may ask follow-up questions. Once resolved, it generates a requirements document and presents an approval gate.

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.

 Inception Activity 3: User Stories (~20 minutes)

 The AI creates user stories that become the contract for what gets built. It runs in two parts: first it plans how to structure the stories (and asks you about organization style and detail level), then it generates the actual stories with personas and acceptance criteria.

 💡 Think about your job application site: You'll get stories around searching jobs, viewing job details, applying to a job, and logging in. Notice how the acceptance criteria cover both happy paths and error scenarios — these become the contract that code generation follows later.
 Part 1 — Planning: The AI creates a story generation plan with questions. Open the plan file, fill in your answers, then tell the AI you're done. The AI summarizes your choices and asks for plan approval.

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.
 Part 2 — Generation: The AI executes the plan step by step, marking checkboxes as it goes. It generates user personas and user stories. The AI presents the completed stories for your review.

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.
 💡 Context reset (optional): For longer sessions, starting a fresh chat here helps maintain output quality. Resume with: Go to aidlc-docs/aidlc-state.md, find the first unchecked item, then go to the corresponding plan file and resume from that point. For shorter workshops, you can skip this and continue in the same chat.

 Inception Activity 4: Workflow Planning (~5 minutes)

 The AI looks at everything gathered so far and decides which Construction stages to run. It generates an execution plan with a visual diagram showing what's completed, what will execute, and what's being skipped.

 💡 Think about your job application site: Make sure Infrastructure Design is included in the plan since you'll need deployment.
 If Infrastructure Design is marked SKIP, tell the AI:

 CopyAdd Infrastructure Design to the plan. We need deployment to AWS.
 Review the execution plan and respond:

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.
 💡 Context reset (optional): Starting a fresh chat before Construction can help if the Inception phase was long. Skip if things are going smoothly.

 🟢 CONSTRUCTION PHASE

 Construction Activity 5: Functional Design (~20 minutes)

 AI-DLC Workflow designs the detailed component model — data models, business logic, component interactions, and how they implement the user stories. No code yet.

 💡 Think about your job application site: The design will cover components like job listing, job detail view, application form, search, and authentication. Watch how the AI maps each component back to user stories.
 Review the design. If you want changes, tell the AI. When satisfied:

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.

 Construction Activity 6: Code Generation (~45 minutes)

 This is the main build activity. The AI creates a plan for what code to generate, gets your approval, then executes it step by step — checking off each item as it goes. Code goes in the workspace root, documentation goes in aidlc-docs/.

 💡 Think about your job application site: The plan should cover the React Vite app in a job-app folder, with Bootstrap CDN styling (creative color theme, not default blue), mock authentication persisting across pages, 50+ sample jobs, and responsive layout with hover effects. Make sure the plan only runs npm install and npm run build — not the dev server, since we deploy separately.
 Part 1 — Planning: The AI creates a code generation plan with numbered, checkboxed steps. Review that it covers all components from the design.

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.
 Part 2 — Generation: The AI executes each step, marking checkboxes as it completes them.

 When complete, review the generated code and respond:

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.
 💡 Context reset (optional): Consider a fresh chat if the session has been running long. Skip if things are going smoothly.

 Construction Activity 7: Infrastructure Design + Deployment (~30 minutes)

 The AI designs the AWS deployment architecture and generates the CDK infrastructure code. This covers:

 A private S3 bucket with a random prefix for hosting the React build

 A CloudFront distribution with Origin Access Control and bucket policy

 Proper IAM policies with valid resource ARNs

 CloudFormation outputs: bucket name, distribution ID, and CloudFront URL

 💡 Think about your job application site: The app should be accessible at the default CloudFront distribution domain name at the root path. The AI will also handle deploying the CDK stack, building the React app with the correct base URL, copying assets to S3, and verifying the CloudFront URL works.
 📋 The AI will present approval gates at each step — review and approve to continue, or request changes if needed.

 Construction Build and Test (~10 minutes)

 AI-DLC Workflow generates build and test instructions covering how to build, deploy, and verify the application.

 The exact directory names, file names, stack outputs, and URLs will vary. Check the build instructions and CDK stack outputs for the exact values.

 🟡 OPERATIONS PHASE

 Operations Activity 8: Operations Discussion (~10 minutes)

 AI-DLC Workflow's Operations phase is a placeholder for future expansion. This is a group discussion about what comes after building.

 💡 Think about your job application site: How would you handle updates to the site — rebuild and redeploy through CDK? How would you monitor CloudFront cache hit rates and S3 access patterns? What would it take to add a custom domain with Route 53 and ACM?
 Discuss as a group:

 CopyNow that we've built and deployed our job application site, discuss how AI would help with:
1. Deploying updates to the site
2. Monitoring CloudFront and S3 performance
3. Adding a custom domain
4. Scaling the application as usage grows

Please explain how this would work for our specific application.

 Tips

 Answer questions in the files, not in chat. Open the markdown file, fill in your [Answer]: tags, then tell the AI to re-read.

 Context resets are optional but valuable for long sessions. If the AI starts losing track of earlier decisions or output quality drops, start a fresh chat and resume from aidlc-state.md. For short workshops, you can often skip this.

 Don't edit generated code directly. Tell the AI to update the design first, then regenerate.

 You're always in control. Nothing proceeds without your approval. Say "Request Changes" anytime.

 Check aidlc-state.md to see where you are at any point.

 File names and structure will vary. AI-DLC Workflow determines file names, directory structure, and plan steps based on your project. The workflow is consistent, the specific outputs are not.

 Run each prompt separately and allow to complete before moving to next prompt.

 Setup Setup Prompt

Source ID: `p-0`

```text
We will work on building an application today. For every front end and backend component we will create a project folder. All documents will reside in the aidlc-docs folder. Throughout our session I'll ask you to plan your work ahead and create an md file for the plan. You may work only after I approve said plan. These plans will always be stored in aidlc-docs/plans folder. You will create many types of documents in the md format. Requirement, features changes documents will reside in aidlc-docs/requirements folder. User stories must be stored in the aidlc-docs/story-artifacts folder. Architecture and Design documents must be stored in the aidlc-docs/design-artifacts folder. All prompts in order must be stored in the aidlc-docs/prompts.md file. Confirm your understanding of this prompt. Create the necessary folders and files for storage, if they do not exist already.
```

## 2. Inception Step 1: Intent to User Stories

Source ID: `p-1`

```text
Your Role: You are an expert product manager and are tasked with creating well defined user stories that becomes the contract for developing the system as mentioned in the Task section below. Plan for the work ahead and write your steps in a Markdown file: user_stories_plan.md with checkboxes for each step in the plan. List your Deliverables in the plan. If any step needs my clarification, add a note in the step to get my confirmation. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Build user stories for the high level requirement as described here: A job application management site that allows:
- Applicants to search, view, and apply to job postings

Write the user stores to a user_stories.md file
```

## 3. Inception Step 2: User Stories to Units

Source ID: `p-2`

```text
Your Role: You are an experienced software architect. Before you start the task as mentioned below, please do the planning and write your steps in the units_plan.md file with checkboxes against each step in the plan. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Group these user stories in user_stories.md into multiple units that can be built independently. Each unit contains highly cohesive user stories that can be built by a single team. The units are loosely coupled with each other. For each unit, write the respective user stories and acceptance criteria in a units.md file.
```

## 4. Construction Step 3: Units to Domain/Component Model

Source ID: `p-3`

```text
Your Role: You are an experienced software architect and engineer. Before you start the task as mentioned below, please do the planning and write your steps in in a Markdown file named component_model_plan.md with checkboxes against each step in the plan. List your Deliverables in the plan file. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Refer to the user stories in the units.md file. Design the component model to implement all the user stories. This model shall contain all the components, the attributes, the behaviors and how the components interact to implement the user stories. The components should be at a business level, do not generate any codes yet. Write the component model into a Markdown file: component_model.md.
```

## 5. Construction Step 4: Code Generation

Source ID: `p-4`

```text
Your Role: You are an experienced software engineer. Before you start the task as mentioned below, please do the planning and write your steps in the markdown file react_app_plan.md file with checkboxes against each step in the plan. List your Deliverables in the plan file. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Refer to component design in the component_model.md file and the units.md file.
Generate a simple and intuitive React Vite web application for the Login and applicant view job listing component in an job-app folder
Use modern design styling for the UX with Bootstrap CDN: icons, color theme, responsive layout, intuitive visual hierarchy, CSS for hover effects
Choose a creative professional color theme avoiding default blue (e.g. green, blue, teal, gray, purple, orange, teal etc.) 
Use simple mock authentication for now with authentication state persisting across all pages and components
Populate the page with some sample jobs (50+) for local testing.
Build the React application and attempt to resolve any errors. Install any tools you need.
Do not run the npm dev server, only use npm-install and npm-run-build. We will deploy the app separately
```

## 6. Operations Step 5: IaC/DevOps - Deploy with CDK

Source ID: `p-5`

```text
Your Role: You are an experienced Cloud Architect. Before you start the task as mentioned below, please do the planning and write your steps in the markdown file deployment_plan.md file with checkboxes against each step in the plan. List your Deliverables in the plan file. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Use the following steps to deploy the application code generated in the previous step job-app folder to AWS us-west-2 Region.

Step 1: Create and Deploy IaC for the React app 
Create a CDK that defines:
- A private S3 bucket with a random prefix. E.g. <prefix>-agent-workshop-react-app-bucket 
- A CloudFront distribution with a path pattern pointing to the S3 origin with Origin Access Control and Bucket policy 
- CloudFormation Outputs: Buckets, Distribution ID, and CloudFront URL  
- Ensure all IAM policy documents are valid, including Version: '2012-10-17' (quoted) and use proper resource ARNs (e.g., arn:aws:s3:::bucket/* for object access). 
The app should be accessible at the default CloudFront distribution domain name at the root path. E.g. https://<distribution-prefix>.cloudfront.net/ 

Step 2: Deploy the infrastructure using CDK
- Validate using validate-template command and edit if needed
- Deploy the stack (the AI will determine the stack name)
- Monitor for successful completion and keep me updated with the Stack deployment status 
- Once complete, lookup the distribution ID and URL from the stack outputs.

Step 3: Deploy the React App
- Update the React application with any prefix and CloudFront URL. E.g. the React Router basename, package.json, .env file, and any other files you deem relevant
- Build the React application
- Copy the web assets to the S3 origin
- curl the full URL to verify that the access works
```
