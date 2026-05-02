const visionContent = `# Portable File-Sharing System

## Vision

A web based file sharing system backed by open-source, locally hostable infrastructure.

## Problem

File sharing systems often depend on managed cloud services, accounts, credentials, and deployment permissions that make workshops difficult to run consistently. Developers need a portable version that teaches the same architecture patterns while running locally for education, experimentation, and self-hosting.

## Solution

A web-based file-sharing system with MinIO as S3-compatible object storage, ScyllaDB Alternator for session management, user management, and folder metadata, a local API service for gateway-style routing, function-style backend handlers, Docker Compose for local infrastructure, and React for the frontend.

## Technical Architecture

- ScyllaDB Alternator for metadata, user, session, folder, and sharing data
- MinIO for S3-compatible file storage
- A local Python API service such as FastAPI for gateway-style HTTP routes
- Function-style Python handler modules for upload, download, sharing, folder, user, and permission workflows
- React JS based static site for the frontend
- Docker Compose for local runtime, networking, volumes, health checks, and service initialization

### Cloud Service Mapping

- S3-compatible object storage: MinIO
- DynamoDB-compatible metadata store: ScyllaDB Alternator
- API Gateway-style routing: local FastAPI routes
- Lambda-style backend logic: local function-style handler modules
- CloudFormation/SAM-style deployment: Docker Compose and initialization scripts

### State Management

Use ScyllaDB Alternator for state, session, user, permission, folder, and sharing metadata. Do not use mock metadata persistence.

## Users & Roles

- personas to include: admin persona, uploader persona, viewer persona, reader persona
- User accounts should be managed within the system with a single admin account created as part of the initial build
- Admin persona has access to everything including creating new users and folders
- Uploader persona can only view and upload to specific folders that are designated during user creation or updating by the admin
- Reader persona can only view and download objects in folders they're assigned to but not upload new ones
- Viewer persona can only view objects in folders they're assigned to but not download or upload

## Usability requirements

- Need the ability for everyone browsing files to be able to search by name and sort the view by alphabetical order for the object names, date uploaded, and size of the object.
- Keep file sizes to a maximum of 1GB and allow upload and download through MinIO S3-compatible pre-signed URLs
- All server side functionality except direct object transfer through pre-signed URLs should be done through the local API service and Python function-style handlers
- The frontend, backend API, MinIO, and ScyllaDB Alternator services must run from Docker Compose

## Backend requirements

- Every API route and function-style handler should be tested before it's considered complete. The test should be a real local HTTP call and confirmation of the correct response
- Consolidate related CRUD operations into cohesive handler modules when applicable, not one file per CRUD operation
- Use real MinIO object writes and real ScyllaDB Alternator metadata writes in integration tests
- Configure all local endpoints, credentials, bucket names, table names, and ports through environment variables and .env.example
- Provide repeatable initialization scripts for the MinIO bucket and ScyllaDB Alternator tables
- Provide Docker Compose health checks and document how to reset local named volumes

## Out of Scope

- AWS, cloud accounts, cloud credentials, CloudFormation, SAM, API Gateway, Lambda, CloudFront, or managed DynamoDB
- Vendor user management like Okta

## Success Criteria

- Upload and browse files uploaded by other users
- Admin account should be able to create users, folders, and assignments between them`;

function downloadVision() {
    const blob = new Blob([visionContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vision.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Display workshop number from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const workshopNum = urlParams.get('workshop');
if (workshopNum) {
    document.getElementById('workshop-number').textContent = `Workshop ${workshopNum}: `;
}

function copyPrompt(index, event) {
    const promptElement = document.getElementById(`prompt-${index}`);
    const content = promptElement.textContent;
    
    navigator.clipboard.writeText(content).then(() => {
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
