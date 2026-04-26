const workshops = {
    1: {
        title: "Workshop 1: S3 File-Sharing System",
        description: "Build a complete web-based file sharing system backed by S3",
        visionFile: `# S3 File-Sharing System

## Vision

A web based file sharing system backed by S3.

## Problem

File sharing using S3 is a difficult process because it requires AWS account access which can be hard to manage when working with 3rd parties.

## Solution

A web-based file-sharing system with S3 as the file storage, DynamoDB for session management, user management, and folder structure.

## Technical Architecture

- Amazon DynamoDB for the database
-- make sure to remember that the Decimal type returned from DynamoDB isn't JSON serializable
- Amazon S3 for file storage
- Amazon API Gateway and Python Lambda functions for back-end functionality
- React JS based static site hosted in S3 for the front-end

### State Management

Use DynamoDB for state and session management

## Users & Roles

- personas to include: admin persona, uploader persona, viewer persona, reader persona
- User accounts should be managed within the system with a single admin account created as part of the initial build
- Admin persona has access to everything including creating new users and folders
- Uploader persona can only view and upload to specific folders that are designated during user creation or updating by the admin
- Reader persona can only view and download objects in folders they're assigned to but not upload new ones
- Viewer persona can only view objects in folders they're assigned to but not download or upload

## Usability requirements

- Need the ability for everyone browsing files to be able to search by name and sort the view by alphabetical order for the object names, date uploaded, and size of the object.
- Keep file sizes to a maximum of 1GB and allow upload and download through S3 pre-signed URLs
- All server side functionality except the upload through pre-signed URLs should be done through API Gateway and Lambda functions written in Python

## Backend requirements

- Every lambda function linked to an API Gateway method should be tested before it's considered complete. The test should be an HTTPS call to that method and confirmation of the correct response
- Consolidate all CRUD operations into one Lambda function when applicable, not one CRUD operation per Lambda file
- For Python development and AWS SAM, use the same python version that's installed locally, DO NOT use containers

## Out of Scope

- AWS Cognito or other vendor user management like Okta

## Success Criteria

- Upload and browse files uploaded by other users
- Admin account should be able to create users, folders, and assignments between them`,
        vision: `
            <div class="alert alert-info">
                <i class="bi bi-info-circle"></i> The prompts below reference a <strong>vision.md</strong> file. Download it first before starting the workshop.
            </div>
            <div class="mb-4">
                <button class="btn btn-success" onclick="downloadVision(1)">
                    <i class="bi bi-download"></i> Download vision.md
                </button>
            </div>
            <h3>Workshop Overview</h3>
            <p>Build a web-based file sharing system with S3 storage, DynamoDB for data management, API Gateway + Lambda for backend, and React for the frontend. Includes multiple user roles (Admin, Uploader, Reader, Viewer) with role-based permissions.</p>
        `,
        prompts: [
            {
                title: "AI-DLC 1: Build the User Stories",
                content: `You are an expert product manager and are tasked with creating well defined user stories that becomes the contract for developing the system as mentioned in the Task section below. Plan for the work ahead and write your steps in a Markdown file: .aidlc/user_stories_plan.md with checkboxes for each step in the plan. List your Deliverables in the plan. If any step needs my clarification, add a note in the step to get my confirmation. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Build user stories for the high level requirements as described here in the markdown file vision.md

Write the user stories to a .aidlc/user_stories.md file`
            },
            {
                title: "AI-DLC 2: Create the units with specs",
                content: `Your Role: You are an experienced software architect. Before you start the task as mentioned below, please do the planning and write your steps in the .aidlc/units_plan.md file with checkboxes against each step in the plan. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Group the user stories in .aidlc/user_stories.md into multiple units that can be built independently. Each unit contains highly cohesive user stories that can be built by a single team. The units are loosely coupled with each other. For each unit, create a spec folder in specs/ with requirements, design, and tasks. The units must be in order so everything is built properly.`
            },
            {
                title: "AI-DLC 3: Create the Component Model",
                content: `Your Role: You are an experienced software architect and engineer. Before you start the task as mentioned below, please do the planning and write your steps in in a Markdown file named .aidlc/component_model_plan.md with checkboxes against each step in the plan. List your Deliverables in the plan file. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.
 
Your Task: 
Refer to all the specs/. Design the component model to implement all the user stories. This model shall contain all the components, the attributes, the behaviors and how the components interact to implement the user stories. 
-	The components should be at a business level, do not generate any code yet. 
-	Write the component model into a Markdown file: .aidlc/component_model.md.`
            },
            {
                title: "AI-DLC 4: Build the code for the vision",
                content: `Your Role: You are an experienced software engineer. Read the specs documents and proceed with building the application, task by task. Before you start building please do the planning and write your steps in the markdown file .aidlc/app_plan.md file with checkboxes against each step in the plan. List your Deliverables in the plan file. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval.

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
-	Read CloudWatch Logs Immediately After First Deploy`
            },
            {
                title: "AI-DLC 5: Deploy the code",
                content: `Your Role: You are an experienced Cloud Architect. Before you start the task as mentioned below, please do the planning and write your steps in the markdown file .aidlc/deployment_plan.md file with checkboxes against each step in the plan. List your Deliverables in the plan file. If any step needs my clarification, please add it to the step to interact with me and get my confirmation. Do not make critical decisions on your own. Once you produce the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.  
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
- curl the full URL to verify that the access works`
            }
        ]
    },
    2: {
        title: "Workshop 2: Advanced AI-DLC",
        description: "Deep dive into AI-driven development lifecycle",
        vision: `
            <h3>Coming Soon</h3>
            <p>Advanced AI-DLC workshop content will be available soon.</p>
        `,
        prompts: []
    },
    3: {
        title: "Workshop 3: Job Application with CDK",
        description: "Build a job application website using AWS CDK",
        vision: `
            <h3>Coming Soon</h3>
            <p>Job Application with CDK workshop content will be available soon.</p>
        `,
        prompts: []
    }
};

function showWorkshop(id) {
    const workshop = workshops[id];
    const content = document.getElementById('workshop-content');
    
    let promptsHtml = '';
    workshop.prompts.forEach((prompt, index) => {
        promptsHtml += `
            <div class="mb-4">
                <div class="prompt-title">
                    <span class="step-badge">Step ${index + 1}</span> ${prompt.title}
                </div>
                <div class="prompt-box">
                    <button class="btn btn-sm btn-light copy-btn" onclick="copyPrompt(${id}, ${index}, event)">
                        <i class="bi bi-clipboard"></i> Copy
                    </button>
                    <pre>${prompt.content}</pre>
                </div>
            </div>
        `;
    });
    
    content.innerHTML = `
        <section class="workshop-detail">
            <div class="container">
                <button class="btn btn-outline-primary back-btn" onclick="hideWorkshop()">
                    <i class="bi bi-arrow-left"></i> Back to Workshops
                </button>
                
                <h2 class="mb-4">${workshop.title}</h2>
                <p class="lead">${workshop.description}</p>
                
                <div class="vision-section">
                    ${workshop.vision}
                </div>
                
                <h3 class="mt-5 mb-4">AI-DLC Prompts</h3>
                ${promptsHtml || '<p class="text-muted">Prompts coming soon...</p>'}
            </div>
        </section>
    `;
    
    content.scrollIntoView({ behavior: 'smooth' });
}

function hideWorkshop() {
    document.getElementById('workshop-content').innerHTML = '';
    document.getElementById('workshops').scrollIntoView({ behavior: 'smooth' });
}

function copyPrompt(workshopId, promptIndex, event) {
    const prompt = workshops[workshopId].prompts[promptIndex];
    navigator.clipboard.writeText(prompt.content).then(() => {
        const btn = event.target.closest('button');
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check"></i> Copied!';
        btn.classList.add('btn-success');
        btn.classList.remove('btn-light');
        
        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.classList.remove('btn-success');
            btn.classList.add('btn-light');
        }, 2000);
    });
}

function downloadVision(workshopId) {
    const workshop = workshops[workshopId];
    const blob = new Blob([workshop.visionFile], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vision.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
