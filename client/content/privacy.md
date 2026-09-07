---
title: Privacy Policy — LLM4LIFE & Zubair Muwwakil
description: Privacy Policy and Google API Services User Data Policy compliance statement for LLM4LIFE and personal software services by Zubair Muwwakil.
date: 2026-09-07
---

## Overview

This Privacy Policy explains how Zubair Muwwakil ("we", "us", or "our") collects, uses, stores, and protects information when you use our software applications, systems, and websites, including **LLM4LIFE** (a personal AI-assisted life operating system and workflow orchestrator) and related software services accessible via [zubairmuwwakil.com](https://zubairmuwwakil.com).

We are committed to user privacy, data minimization, and security. We operate under the principle of least privilege: our systems request only the permissions strictly required to provide specific, user-directed capabilities.

## Applications and Services Covered

This policy applies to:
- **LLM4LIFE**: A personal workflow automation and life operations platform that connects personal productivity services (including Google Tasks, Google Calendar, and Google Contacts), structured state stores, and knowledge repositories to assist with personal scheduling, task management, and communication follow-ups.
- **Personal Software and Web Projects**: Web applications, APIs, and tools hosted on or linked from `zubairmuwwakil.com`.

## Information We Collect and Access

### 1. Google User Data via Google APIs
When you connect LLM4LIFE with Google services via OAuth 2.0 authorization, the application may access, create, or modify user data based on the specific scopes you authorize:
- **Google Calendar**: LLM4LIFE accesses calendar events and availability to organize schedules, prevent overlapping commitments, and insert scheduled execution blocks for approved tasks.
- **Google Tasks**: LLM4LIFE reads, creates, and updates task lists and items to serve as a user-facing action surface for personal to-do items, reminders, and checklists.
- **Google Contacts (People API)**: LLM4LIFE accesses contact records (names, email addresses, phone numbers, and contact metadata) to facilitate address-book reconciliation, deduplication, and relationship follow-up reminders.

### 2. User-Provided Context and Prompts
When interacting with LLM4LIFE conversational or agentic interfaces, you may provide instructions, scheduling preferences, queries, or task descriptions. This data is processed solely to fulfill your specific requests.

### 3. System Execution and Audit Logs
To ensure reliable operation and auditability, LLM4LIFE records operational receipts (such as timestamps of completed synchronizations, action identifiers, and execution status). These operational logs are minimized and avoid recording sensitive personal message contents or secrets.

## How We Use Information

We use the information accessed through connected integrations strictly to:
- Coordinate and display your personal tasks, commitments, and calendar schedules.
- Reconcile and organize contact records upon user instruction.
- Generate automated, user-approved schedules and execution plans.
- Provide audit trails and execution receipts so you can review what actions were performed.

We do **not** sell, rent, monetize, or trade your personal information or Google user data under any circumstances.

## Google API Services User Data Policy & Limited Use Disclosure

LLM4LIFE's use and transfer to any other app of information received from Google APIs will adhere to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.

Specifically:
1. **Limited Use**: We only use Google user data to provide or improve user-facing features that are prominent in the requesting application's user interface.
2. **No Advertising**: We never use or transfer Google user data to serve advertisements, including personalized, re-targeted, or interest-based advertising.
3. **Human Access Restrictions**: We do not allow humans to read your Google user data unless you have provided explicit affirmative agreement for specific items (such as for technical troubleshooting), it is required for security purposes (such as investigating abuse or a security bug), it is necessary to comply with applicable law, or the data is aggregated and anonymized for internal technical diagnostics.
4. **No Transfer Except for Core Functionality**: We do not transfer Google user data to third parties, except as strictly necessary to provide or improve core application features requested by the user, comply with applicable law, or as part of a merger or acquisition with explicit user notification.
5. **No Model Training**: Google user data received through Google APIs is not used to train generalized artificial intelligence (AI) or machine learning (ML) foundation models.

## AI and Language Model Processing

LLM4LIFE utilizes AI models (such as Claude by Anthropic, Google Gemini, and OpenAI GPT models) as routers, planners, and universal interfaces for processing user instructions:
- Data sent to language models consists strictly of the context necessary to fulfill user-directed actions (e.g., scheduling a task or formatting an action item).
- We configure API integrations with enterprise or commercial privacy terms where zero data retention for foundation model training is enforced.
- Your personal diary entries, sensitive credentials, financial secrets, and confidential records are excluded by policy from language model prompts.

## Data Storage, Protection, and Security

We implement industry-standard technical and operational safeguards to protect your data:
- **Encryption in Transit**: All data transmitted between your browser, client applications, and backend services or external APIs is encrypted using modern Transport Layer Security (TLS/HTTPS).
- **Secure Token Storage**: OAuth access tokens and refresh tokens are stored in secure, private databases (such as Neon PostgreSQL) with restricted network access and environment variable protection.
- **Local Vault Custody**: Detailed narrative knowledge and notes remain in private, local vaults (such as Obsidian) under your direct custody.
- **Least-Privilege Architecture**: Each integration is provisioned with only the minimal API scopes needed for its defined capabilities.

## Data Retention and Deletion

We retain data only as long as necessary to provide the services or until you request deletion:
- **Revoking Google Access**: You can revoke LLM4LIFE's access to your Google account at any time via your [Google Account Third-party Apps & Services](https://myaccount.google.com/permissions) page. Revoking access prevents any further synchronization or data retrieval.
- **Data Deletion Requests**: You may request the permanent deletion of your stored credentials, database records, and execution logs at any time. To request deletion, send an email to [zmuwwakil@gmail.com](mailto:zmuwwakil@gmail.com?subject=Privacy%20Data%20Deletion%20Request). All associated records will be purged from our active databases within 30 days.

## Third-Party Services

LLM4LIFE interacts with third-party service providers solely to perform user-directed integrations:
- **Google Workspace / APIs** (Calendar, Tasks, People)
- **Neon** (Serverless PostgreSQL database hosting)
- **GitHub** (Version control and automated deployment workflows)
- **OpenAI / Anthropic / Google AI** (Inference providers for user-directed task assistance)

Each third-party service processes data in accordance with their respective privacy policies and security agreements.

## Children's Privacy

Our services and applications are not directed to children under the age of 13. We do not knowingly collect personal information from children.

## Changes to this Privacy Policy

We may update this Privacy Policy periodically to reflect changes in our services, integrations, or legal obligations. When updates occur, the "Last updated" date at the top of this page will be revised. Material changes will be noted on this page.

## Contact Us

If you have questions, concerns, or requests regarding this Privacy Policy or the handling of your data, please contact:

- **Name**: Zubair Muwwakil
- **Role**: Software Engineer
- **Email**: [zmuwwakil@gmail.com](mailto:zmuwwakil@gmail.com)
- **Website**: [https://zubairmuwwakil.com](https://zubairmuwwakil.com)
- **Location**: Brooklyn, NY
