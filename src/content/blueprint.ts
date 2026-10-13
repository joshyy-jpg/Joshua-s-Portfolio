import type { Project } from './projects'

export const blueprint: Project = {
  "slug": "blueprint",
  "index": "08",
  "code": "BLUP",
  "logo": "blueprint",
  "kind": "case",
  "title": "Blueprint - Salesforce Project",
  "subtitle": "Dashboardless CRM",
  "description": "A dashboardless CRM concept bringing Salesforce workflows into Slack, developed for a Spring 2026 NYC Salesforce hackathon.",
  "role": "Product concept & strategy",
  "status": "Hackathon project / concept",
  "year": "Spring 2026",
  "summary": "Blueprint proposes a low-code AI orchestrator for mid-market revenue teams: configure business logic in Salesforce, then carry out everyday CRM tasks through conversation in Slack.",
  "facts": [
    {
      "label": "Context",
      "value": "Salesforce hackathon project"
    },
    {
      "label": "When & where",
      "value": "Spring 2026 · New York City"
    },
    {
      "label": "Focus",
      "value": "Dashboardless CRM for mid-market revenue teams"
    },
    {
      "label": "Status",
      "value": "Concept presentation and demo"
    }
  ],
  "hero": [
    {
      "kind": "video",
      "src": "/media/blueprint-demo.mp4",
      "poster": "/media/blueprint-poster.png",
      "width": 1280,
      "height": 720,
      "alt": "Blueprint dashboardless CRM project demonstration",
      "caption": "Hackathon project demo. The proposed Salesforce and Slack workflow is a concept, not a shipped Salesforce feature."
    }
  ],
  "sections": [
{"type": "media", "layout": "full", "items": [{"kind": "image", "fit": "contain", "src": "/media/field-salesforce", "alt": "Case competition participants in front of the NYU PMC case competition screen with Salesforce branding.", "width": 1800, "height": 1200, "caption": "NYC Salesforce Product Management · Spring 2026"}]},
    {
      "type": "text",
      "label": "Problem",
      "heading": "CRM work should not require another destination.",
      "body": [
        "The project explores the friction of switching between business tools to find records, update deals, and complete routine revenue operations. Its focus is mid-market teams that need automation without building a custom engineering stack."
      ]
    },
    {
      "type": "text",
      "label": "Concept",
      "heading": "Build the logic in Salesforce. Work in Slack.",
      "body": [
        "Blueprint proposes a low-code orchestration layer built around Salesforce and Agentforce, with Slack as the conversational interface. Revenue teams would request CRM actions where they already communicate, while Salesforce remains the underlying system of record."
      ]
    },
    {
      "type": "decisions",
      "label": "Key decisions",
      "heading": "Less interface. Clearer actions.",
      "items": [
        {
          "title": "Conversation as the entry point",
          "body": "Route routine requests through Slack to reduce navigation between dashboards and records."
        },
        {
          "title": "Retain the system of record",
          "body": "Keep business logic and CRM data in Salesforce rather than proposing a separate replacement database."
        },
        {
          "title": "Design for the mid-market",
          "body": "Prioritize configurable workflows for teams that cannot dedicate engineers to custom internal tools."
        }
      ]
    },
    {
      "type": "text",
      "label": "Delivered",
      "heading": "A concept deck and product demo.",
      "body": [
        "The presentation develops the problem framing, proposed architecture, an illustrative RevOps workflow, a consumption-pricing model, and success criteria. The accompanying recording presents the project demo."
      ]
    },
    {
      "type": "evidence",
      "label": "Evidence & limitations",
      "heading": "A direction to validate.",
      "observed": [
        "A presentation and demo were produced for the Spring 2026 NYC Salesforce hackathon project."
      ],
      "proposed": [
        "Reduce tool switching and dashboard navigation for routine CRM tasks.",
        "Evaluate time to first value and the share of work completed through the conversational interface."
      ],
      "limitations": [
        "The deck’s task-time comparison, pricing, and adoption figures are illustrations or proposed targets, not measured project outcomes.",
        "Production integrations, deployment, and user validation are not established by the supplied materials.",
        "This is a hackathon concept, not a claim of employment by Salesforce or an officially released Salesforce product."
      ]
    },
    {
      "type": "text",
      "label": "Next questions",
      "heading": "Make the actions trustworthy.",
      "body": [
        "Further validation would need to establish which workflows benefit from conversation, how permissions and confirmations are handled, and whether teams can complete tasks reliably without returning to a dashboard."
      ]
    }
  ]
}
