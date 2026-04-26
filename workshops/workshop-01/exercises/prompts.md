# Task Manager Application Prompts

Extracted copyable prompt blocks from `../../website/public/task-manager.html`.

## 1. Start Activity 1: Start the Workflow (10 minutes)

 You kick off the entire workflow with a single prompt describing what you want to build. AI-DLC Workflow takes it from there — it detects your workspace, sets up tracking, and starts guiding you through the phases.

 💡 Think about your task manager: This one prompt is all you need. The workflow handles folder structure, role assignment, planning, and approval gates automatically.
 Open a new chat and type:

 CopyUsing AI-DLC, build a simple personal task manager to help users add tasks and view their task list. Keep it simple with just these two core features.
 AI-DLC Workflow activates and runs Workspace Detection automatically. It will display a welcome message explaining the three-phase lifecycle (Inception → Construction → Operations), scan your workspace, set up the aidlc-docs/ directory with state and audit tracking, and proceed to the next stage.

 Read the welcome message — it explains the workflow you'll follow for the rest of the workshop.

 🔵 INCEPTION PHASE — No code is generated. This phase is about understanding what to build and why.

 Inception Activity 2: Requirements Analysis (~15 minutes)

 The AI analyzes your request and asks clarifying questions about anything unclear. The number and content of questions vary based on your initial prompt. You'll also see a question about enabling security extension rules.

 💡 Think about your task manager: What storage makes sense — in-memory for simplicity or a database for persistence? Single user or multi-user? These are the kinds of decisions the AI will ask you to make here.
 When the AI presents the questions file: Open it, fill in your [Answer]: tags using the multiple-choice letters. For the security extension question, answer "No" since this is a prototype. Then tell the AI:

 CopyI have answered the clarification questions. Please re-read the file and proceed.
 The AI may ask follow-up questions if it finds ambiguities in your answers. Once resolved, it generates a requirements document and presents an approval gate.

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.

 Inception Activity 3: User Stories (~20 minutes)

 The AI creates user stories that become the contract for what gets built. It runs in two parts: first it plans how to structure the stories (and asks you about organization style and detail level), then it generates the actual stories with personas and acceptance criteria.

 💡 Think about your task manager: You'll get stories around "add a task" and "view task list." Notice how the acceptance criteria cover both happy paths (valid task created) and error scenarios (missing title returns 400). These criteria become the contract that code generation follows later.
 Part 1 — Planning: The AI creates a story generation plan with questions. Open the plan file, fill in your answers, then tell the AI you're done. The AI summarizes your choices and asks for plan approval.

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.
 Part 2 — Generation: The AI executes the plan step by step, marking checkboxes as it goes. It generates user personas and user stories. The AI presents the completed stories for your review.

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.
 💡 Context reset (optional): For longer sessions, starting a fresh chat here helps maintain output quality. Resume with: Go to aidlc-docs/aidlc-state.md, find the first unchecked item, then go to the corresponding plan file and resume from that point. For shorter workshops, you can skip this and continue in the same chat.

 Inception Activity 4: Workflow Planning (~5 minutes)

 The AI looks at everything gathered so far and decides which Construction stages to run. It generates an execution plan with a visual diagram showing what's completed, what will execute, and what's being skipped.

 💡 Think about your task manager: Since this is a simple two-feature app, expect most design stages to be skipped. The AI recognizes that a basic task manager doesn't need NFR analysis or complex functional design — it goes straight to code generation. If you want deployment on AWS, this is where you'd ask the AI to add Infrastructure Design.
 For this simple project, expect most Construction design stages (Functional Design, NFR, etc.) to be skipped, with Code Generation and Build and Test marked for execution.

 If you want to add Infrastructure Design for AWS deployment, tell the AI:

 CopyAdd Infrastructure Design to the plan. We'll deploy on AWS with CloudFormation.
 Review the execution plan and respond:

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.
 💡 Context reset (optional): Starting a fresh chat before Construction can help if the Inception phase was long. Skip if things are going smoothly.

 🟢 CONSTRUCTION PHASE

 Construction Activity 5: Code Generation (~35 minutes)

 This is the main build activity. The AI creates a plan for what code to generate, gets your approval, then executes it step by step — checking off each item as it goes. Code goes in the workspace root, documentation goes in aidlc-docs/.

 💡 Think about your task manager: The code generation plan will trace directly back to your user stories. The "add task" endpoint will handle the happy path and error scenarios from your acceptance criteria. The "view tasks" endpoint will return the list as JSON. Watch how the AI connects design decisions to actual code.
 Part 1 — Planning: The AI creates a code generation plan with numbered, checkboxed steps covering what files to create, where they go, and how they map back to the user stories.

 Review the plan — check that the steps cover both user stories and that code goes in the right places.

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.
 Part 2 — Generation: The AI executes each step, marking checkboxes as it completes them.

 When complete, review the generated code and respond:

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.
 💡 Context reset (optional): Consider a fresh chat if the session has been running long. Skip if things are going smoothly.

 Construction Activity 6: Infrastructure Design + Deployment (~15 minutes)

 Skip this activity if Infrastructure Design was not added to your execution plan.
 The AI designs the AWS deployment architecture, generates a CloudFormation template and deployment guide, validates the infrastructure code, and presents for approval.

 💡 Think about your task manager: With in-memory storage, deployment is straightforward. If you chose a database during requirements, the infrastructure will include that too.
 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.

 Construction Activity 7: Build and Test (~10 minutes)

 AI-DLC Workflow generates build and test instructions covering how to build, run, and test the application.

 The exact directory name, file names, port, and endpoints may vary based on what the AI generated. Check the build instructions for the exact commands for your project.
 Test your application using the instructions provided:

 cd taskManager
pip install -r requirements.txt
python app.py
 In a separate terminal:

 # Add a task
curl -X POST http://localhost:5000/tasks -H "Content-Type: application/json" \
 -d '{"title": "Learn AI-DLC", "description": "Complete the tutorial"}'

# Get all tasks
curl http://localhost:5000/tasks

 🟡 OPERATIONS PHASE

 Operations Activity 8: Operations Discussion (~10 minutes)

 AI-DLC Workflow's Operations phase is a placeholder for future expansion. This is a group discussion about what comes after building.

 💡 Think about your task manager: How would you monitor API response times? What happens if the in-memory store fills up? How would you add persistence without breaking the existing API contract? These are the kinds of production concerns this phase is designed to address.
 Discuss as a group:

 CopyNow that we've built our task manager, discuss how AI would help with:
1. Deploying our task manager to production
2. Monitoring the application performance
3. Detecting and responding to issues automatically
4. Scaling the application as usage grows

Please explain how this would work for our specific task manager application.

 Tips

 Answer questions in the files, not in chat. Open the markdown file, fill in your [Answer]: tags, then tell the AI to re-read.

 Context resets are optional but valuable for long sessions. If the AI starts losing track of earlier decisions or output quality drops, start a fresh chat and resume from aidlc-state.md. For short workshops, you can often skip this.

 Don't edit generated code directly. If something's wrong, tell the AI to update the design first, then regenerate.

 You're always in control. Nothing proceeds without your approval. Say "Request Changes" anytime.

 Check aidlc-state.md to see where you are at any point.

 File names and structure will vary. AI-DLC Workflow determines file names, directory structure, and plan steps based on your project. The workflow is consistent, the specific outputs are not.

 Copy and paste each prompt into your AI assistant. Follow the activities in order.

 Setup Activity 1: Setup (10 minutes)

Source ID: `p-0`

```text
We will work on building an application today. For every front end and backend component we will create a project folder. All documents will reside in the aidlc-docs folder. Throughout our session I'll ask you to plan your work ahead and create an md file for the plan. You may work only after I approve said plan. These plans will always be stored in aidlc-docs/plans folder. You will create many types of documents in the md format. Requirement, features changes documents will reside in aidlc-docs/requirements folder. User stories must be stored in the aidlc-docs/story-artifacts folder. Architecture and Design documents must be stored in the aidlc-docs/design-artifacts folder. All prompts in order must be stored in the aidlc-docs/prompts.md file. Confirm your understanding of this prompt. Create the necessary folders and files for storage, if they do not exist already.
```

## 2. Inception Activity 1.5: Intent Definition (5 minutes)

Source ID: `p-1`

```text
Intent:
Build a simple personal task manager to help users add tasks and view their task list.

Do not propose solutions yet.
Acknowledge the intent and confirm understanding.
```

## 3. Inception Activity 2: User Stories Creation (30 minutes)

Source ID: `p-2`

```text
Your Role: You are an expert product manager and are tasked with creating well defined user stories that becomes the contract for developing the system as mentioned in the Task section below. Plan for the work ahead and write your steps in an md file (user_stories_plan.md) with checkboxes for each step in the plan. If any step needs my clarification, add a note in the step to get my confirmation. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Build user stories for the high-level requirement as described here: "Build a simple task manager that allows me to add new tasks and view my task list. Keep it simple with just these two core features." Save the final user stories in aidlc-docs/story-artifacts/mvp_user_stories.md file.
```

## 4. Inception Activity 3: Units Decomposition (20 minutes)

Source ID: `p-3`

```text
Your Role: You are an experienced software architect. Before you start the task as mentioned below, please do the planning and write your steps in the aidlc-docs/plans/units_plan.md file with checkboxes against each step in the plan. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Refer to the user stories in aidlc-docs/story-artifacts/mvp_user_stories.md file. Group the user stories into a single cohesive unit called "Task Management Unit" that contains all the user stories. Save this as aidlc-docs/design-artifacts/task_management_unit.md.
```

## 5. Construction Activity 4: Domain Model Creation (25 minutes)

Source ID: `p-4`

```text
Your Role: You are an experienced software engineer. Before you start the task as mentioned below, please do the planning and write your steps in an aidlc-docs/design-artifacts/component_model_plan.md file with checkboxes against each step in the plan. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Refer to the user stories in the aidlc-docs/design-artifacts/task_management_unit.md file. Design the component model to implement all the user stories. This model shall contain all the components, the attributes, the behaviors and how the components interact to implement the user stories. Do not generate any codes yet. Write the component model into aidlc-docs/design-artifacts/task_component_model.md file.
```

## 6. Construction Activity 5: Code Generation (35 minutes)

Source ID: `p-5`

```text
Your Role: You are an experienced software engineer. Before you start the task as mentioned below, please do the planning and write your steps in an aidlc-docs/plans/code_generation_plan.md file with checkboxes against each step in the plan. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Task: Refer to component design in the aidlc-docs/design-artifacts/task_component_model.md file. Generate a very simple Python implementation for the Task Management Component with just two features: add new tasks and list all tasks. Keep it simple - no complex priority logic needed. Generate the classes in respective individual files and save them in the taskManager directory: task.py (Task class), and task_service.py (TaskService class).
```

## 7. Construction Activity 6: Build APIs (15 minutes)

Source ID: `p-6`

```text
Your Role: You are an experienced software engineer. Before you start the task as mentioned below, please do the planning and write your steps in an md file with checkboxes against each step in the plan. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Task: Refer to the task_service.py under the taskManager/ folder. Create python flask apis for each of the service there.
```

## 8. Construction Activity 7: Architecture Planning (15 minutes)

Source ID: `p-7`

```text
Your Role: You are an experienced Cloud Architect. Before you start the task as mentioned below, please do the planning and write your steps in a deployment_plan.md file with checkboxes against each step in the plan. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Task: Refer component design model: aidlc-docs/design-artifacts/task_component_model.md, units in the aidlc-docs/design-artifacts/ folder, and backend code in the taskManager/ folder. Complete the following:
- Generate a end-to-end plan for deployment of the backend on AWS cloud using CloudFormation.
- Document all the pre-requisites for the deployment, if any.

Once I approve the plan:
- Follow the best practice of clean, simple, explainable coding.
- All output code goes in the DEPLOYMENT/ folder as cloudformation-template.yaml and deployment-guide.md.
- Validate that the generated code works as intended, by creating a validation plan, generate a validation report.
- Review the validation report and fix all identified issues, update the validation report.
```

## 9. Operations Activity 8: Operations Phase Discussion

Source ID: `p-8`

```text
Now that we've built our task manager, let's discuss the Operations Phase. Based on what we've created, how would AI help with:

1. Deploying our task manager to production
2. Monitoring the application performance  
3. Detecting and responding to issues automatically
4. Scaling the application as usage grows

Please explain how this would work for our specific task manager application.
```
