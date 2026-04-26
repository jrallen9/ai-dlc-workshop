# E-Commerce Product Catalog Prompts

Extracted copyable prompt blocks from `../../website/public/ecommerce-catalog.html`.

## 1. Start Activity 1: Start the Workflow (10 minutes)

 You kick off the entire workflow with a single prompt describing what you want to build. AI-DLC Workflow takes it from there.

 💡 Think about your product catalog: This one prompt captures the intent — customers browsing and buying, admins managing. The workflow handles the phasing automatically.
 Open a new chat and type:

 CopyUsing AI-DLC, build a product catalog system where customers can browse products, search, view details, and add items to cart. Admins can manage products and inventory.
 AI-DLC Workflow activates, displays a welcome message, scans your workspace, sets up aidlc-docs/, and proceeds to the next stage.

 🔵 INCEPTION PHASE — No code is generated. This phase is about understanding what to build and why.

 Inception Activity 2: Requirements Analysis (~15 minutes)

 The AI analyzes your request and asks clarifying questions about anything unclear. You'll also see a question about enabling security extension rules.

 💡 Think about your product catalog: What product categories exist? How does search work — by name, category, price range? What does the cart look like? What can admins do — CRUD products, manage inventory, view orders?
 When the AI presents the questions file: Open it, fill in your [Answer]: tags. For the security extension question, answer "No" since this is a prototype. Then tell the AI:

 CopyI have answered the clarification questions. Please re-read the file and proceed.
 The AI may ask follow-up questions. Once resolved, it generates a requirements document.

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.

 Inception Activity 3: User Stories (~20 minutes)

 The AI creates user stories that become the contract for what gets built. It runs in two parts: first it plans how to structure the stories, then it generates them with personas and acceptance criteria.

 💡 Think about your product catalog: You'll get stories for both customer-facing features (browsing, search, cart) and admin features (product management, inventory). The acceptance criteria define the contract for code generation.
 Part 1 — Planning: The AI creates a story generation plan with questions. Open the plan file, fill in your answers, then tell the AI you're done.

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.
 Part 2 — Generation: The AI executes the plan step by step, marking checkboxes as it goes.

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.
 💡 Context reset (optional): For longer sessions, starting a fresh chat here helps maintain output quality. Resume with: Go to aidlc-docs/aidlc-state.md, find the first unchecked item, then go to the corresponding plan file and resume from that point. For shorter workshops, you can skip this and continue in the same chat.

 Inception Activity 4: Workflow Planning + Units (~10 minutes)

 The AI determines which Construction stages to run and decomposes the system into multiple units that can be built independently. Units are ordered so everything is built properly.

 💡 Think about your product catalog: Expect units like product catalog/browsing, search, shopping cart, and admin management. The ordering matters — data models and core catalog before cart and admin features.
 If you want deployment and Infrastructure Design is marked SKIP:

 CopyAdd Infrastructure Design to the plan. We need deployment to AWS.
 📋 The AI will present an approval gate — review the execution plan and approve to continue, or request changes if needed.
 💡 Context reset (optional): Starting a fresh chat before Construction can help if the Inception phase was long. Skip if things are going smoothly.

 🟢 CONSTRUCTION PHASE

 Construction Activity 5: Functional Design (~20 minutes)

 AI-DLC Workflow designs the detailed component model — all components, data models, APIs, and how they interact. No code yet.

 💡 Think about your product catalog: The design will cover components for product management, catalog browsing, search, cart, and admin. Watch how the AI maps each component back to user stories.
 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.

 Construction Activity 6: Code Generation (~60 minutes)

 The main build activity. AI-DLC Workflow's Construction phase has a built-in per-unit loop — for each unit of work, it runs design and code generation stages in sequence, completing each unit fully before moving to the next. The approval gate after each unit says "Continue to next unit" or "Proceed to Build & Test." This is less explicit than a manual tracker (like the one in the Copy-Paste Prompts tab), but the workflow handles the cycling automatically.

 💡 Think about your product catalog: The AI will implement each unit, building data models, backend APIs, and frontend components. Watch how it ensures previously implemented units still work as new ones are added. After all units, it runs comprehensive end-to-end tests.
 Part 1 — Planning: The AI creates a code generation plan with numbered, checkboxed steps.

 📋 The AI will present an approval gate — review the output and approve to continue, or request changes if needed.
 Part 2 — Generation: The AI implements each unit, tests it, validates integration, and marks it complete before moving to the next.

 📋 The AI will present an approval gate when done — review the output and approve to continue, or request changes if needed.
 💡 Context reset (optional): Consider a fresh chat if the session has been running long. Skip if things are going smoothly.

 Construction Activity 7: Infrastructure Design + Deployment (~20 minutes)

 The AI designs the AWS deployment architecture, creates infrastructure as code for all resources, and deploys to us-west-2.

 💡 Think about your product catalog: The infrastructure needs to support both the frontend (product browsing, cart) and backend (APIs, data storage). The AI will determine the right AWS services based on your design.
 📋 The AI will present approval gates at each step — review and approve to continue, or request changes if needed.

 Construction Build and Test (~10 minutes)

 AI-DLC Workflow generates build and test instructions. Verify the deployed application works end-to-end.

 The exact directory names, file names, and URLs will vary. Check the build instructions for the exact values.

 🟡 OPERATIONS PHASE

 Operations Activity 8: Operations Discussion (~10 minutes)

 AI-DLC Workflow's Operations phase is a placeholder for future expansion. This is a group discussion.

 💡 Think about your product catalog: How would you handle product image uploads? What about scaling during sales events? How would you add analytics to track popular products? What about user authentication for the cart?
 Discuss as a group:

 CopyNow that we've built and deployed our product catalog, discuss how AI would help with:
1. Adding product recommendations
2. Implementing user authentication
3. Adding an analytics dashboard
4. Scaling during high-traffic events

Please explain how this would work for our specific application.

 Tips

 Answer questions in the files, not in chat. Open the markdown file, fill in your [Answer]: tags, then tell the AI to re-read.

 Context resets are optional but valuable for long sessions. If the AI starts losing track of earlier decisions or output quality drops, start a fresh chat and resume from aidlc-state.md. For short workshops, you can often skip this.

 Don't edit generated code directly. Tell the AI to update the design first, then regenerate.

 You're always in control. Nothing proceeds without your approval. Say "Request Changes" anytime.

 Check aidlc-state.md to see where you are at any point.

 File names and structure will vary. AI-DLC Workflow determines file names, directory structure, and plan steps based on your project.

 Copy and paste each prompt into your AI assistant. Follow the activities in order.

 Setup Activity 1: Setup (10 minutes)

Source ID: `p-0`

```text
We will work on building an application today. For every front end and backend component we will create a project folder. All documents will reside in the aidlc-docs folder. Throughout our session I'll ask you to plan your work ahead and create an md file for the plan. You may work only after I approve said plan. These plans will always be stored in aidlc-docs/plans folder. You will create many types of documents in the md format. Requirement, features changes documents will reside in aidlc-docs/requirements folder. User stories must be stored in the aidlc-docs/story-artifacts folder. Architecture and Design documents must be stored in the aidlc-docs/design-artifacts folder. All prompts in order must be stored in the aidlc-docs/prompts.md file. Confirm your understanding of this prompt. Create the necessary folders and files for storage, if they do not exist already.
```

## 2. Inception Activity 2: Intent Definition (5 minutes)

Source ID: `p-1`

```text
Intent:
Build a product catalog system where customers can browse products, search, view details, and add items to cart. Admins can manage products and inventory.

Do not propose solutions yet.
Acknowledge the intent and confirm understanding.
```

## 3. Inception Activity 3: User Stories Creation (20 minutes)

Source ID: `p-2`

```text
Your Role: You are an expert product manager with e-commerce domain expertise. Before you start the task as mentioned below, please do the planning and write your steps in the aidlc-docs/plans/user_stories_plan.md file with checkboxes against each step in the plan. List your Deliverables in the plan. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Build comprehensive user stories for the product catalog system based on the intent. Include customer-facing features (browsing, search, cart) and admin features (product management, inventory).

Write the user stories to aidlc-docs/story-artifacts/user_stories.md
```

## 4. Inception Activity 4: Units Definition (15 minutes)

Source ID: `p-3`

```text
Your Role: You are an experienced software architect. Before you start the task as mentioned below, please do the planning and write your steps in the aidlc-docs/plans/units_plan.md file with checkboxes against each step in the plan. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Group the user stories in aidlc-docs/story-artifacts/user_stories.md into multiple units that can be built independently. Each unit contains highly cohesive user stories that can be built by a single team. The units are loosely coupled with each other. For each unit, write the respective user stories and acceptance criteria.

Write the units to aidlc-docs/story-artifacts/units.md
```

## 5. Construction Activity 5: Domain Model Creation (20 minutes)

Source ID: `p-4`

```text
Your Role: You are an experienced software architect and engineer. Before you start the task as mentioned below, please do the planning and write your steps in the aidlc-docs/plans/domain_model_plan.md file with checkboxes against each step in the plan. List your Deliverables in the plan file. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Design the domain model to implement all the user stories. This model shall contain all the components, the data models, the APIs, and how the components interact to implement the user stories. The components should be at a business level, do not generate any code yet.

Write the domain model into aidlc-docs/design-artifacts/domain_model.md
```

## 6. Construction Activity 6: Build Units Incrementally (60 minutes)
 Incremental Development: Build one unit at a time, test, validate, then move to the next.

 Step 6.1: Create Implementation Tracker (5 minutes)
 CopyYour Role: You are an experienced software engineer.

Your Task:
1. Review the units in aidlc-docs/story-artifacts/units.md
2. Create a file aidlc-docs/plans/unit_implementation_tracker.md with:
 - Total number of units
 - List of all units with checkboxes (unchecked)
 - Suggested implementation order

Format:
# Unit Implementation Tracker

Total Units: X

## Implementation Order
- [ ] Unit 1: [Name] - [Brief description]
- [ ] Unit 2: [Name] - [Brief description]
- [ ] Unit 3: [Name] - [Brief description]
...

Show me the tracker file.

 Step 6.2: Implement Each Unit (50 minutes)
 Repeat for each unchecked unit in the tracker:

Source ID: `p-6`

```text
Your Task: Look at aidlc-docs/plans/unit_implementation_tracker.md and implement the next unchecked unit.

1. Implement ONLY that unit from aidlc-docs/story-artifacts/units.md
2. Refer to the domain model in aidlc-docs/design-artifacts/domain_model.md
3. Build data models, backend APIs, and frontend components for this unit
4. Ensure all previously implemented units still work
5. Mark the unit as complete in the tracker by checking the checkbox

Tell me which unit you're implementing before you start.
```

## 7. Operations Activity 7: Deploy the Application (20 minutes)

Source ID: `p-8`

```text
Your Role: You are an experienced Cloud Architect. Before you start the task as mentioned below, please do the planning and write your steps in the aidlc-docs/plans/deployment_plan.md file with checkboxes against each step in the plan. List your Deliverables in the plan file. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Deploy the application to AWS. Create infrastructure as code for all resources. Deploy to us-west-2 region.
```
