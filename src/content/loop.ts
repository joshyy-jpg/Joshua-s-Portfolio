import type { Project } from './projects'

// Project facts supplied by Joshua; individual responsibilities and dates are not yet specified.
export const loop: Project = {
  "slug": "loop",
  "index": "07",
  "code": "LOOP",
  "logo": "loop",
  "kind": "case",
  "title": "Loop",
  "subtitle": "Stay in the loop.",
  "description": "A Meta hackathon finalist project turning everyday moments into a weekly recap for friends across distance.",
  "role": "Hackathon & product development",
  "status": "Meta hackathon finalist · Product in development",
  "year": "In development",
  "summary": "Loop began as a Meta hackathon finalist project and is now being developed into a real product. A mobile-first prototype brings photos, text updates, and voice notes together in one weekly story, helping friends share the small moments between catch-ups.",
  "facts": [
    {
      "label": "Context",
      "value": "Meta hackathon finalist project"
    },
    {
      "label": "Stage",
      "value": "Working web prototype; product in development"
    },
    {
      "label": "Original concept",
      "value": "Feature within Instagram Instants"
    },
    {
      "label": "Implementation",
      "value": "Browser-local storage; no Instagram integration"
    }
  ],
  "hero": [{
    "kind": "video",
    "src": "/media/loop-portfolio-demo.mp4",
    "poster": "/media/loop-poster.png",
    "width": 1280,
    "height": 720,
    "alt": "Loop product walkthrough: capture everyday moments, collect a weekly draft, review, and watch a weekly Loop.",
    "caption": "Interactive prototype walkthrough. Content is stored locally; Instagram integration and multi-user accounts are not yet implemented."
  }],
  "sections": [
    {
      "type": "text",
      "label": "Problem",
      "heading": "The little things get lost between catch-ups.",
      "body": [
        "When friends move to different cities or get busy, big updates still get shared. Everyday moments—a new coffee spot, a small win, or a rough afternoon—can disappear between conversations. Loop is designed to make those moments easier to collect and share."
      ]
    },
    {
      "type": "text",
      "label": "Concept",
      "heading": "One small chapter of your week.",
      "body": [
        "Originally conceived as a feature within Instagram Instants, Loop collects photos, text updates, and voice notes in a private weekly draft. Users review, rearrange, and publish the moments as one cohesive, swipeable weekly Loop post.",
        "The experience centers on individuals and their friendships. Users do not need to create groups or manage a separate destination for every update. The intended audience model preserves the visibility of each source moment; production audience controls remain to be built."
      ]
    },
    {
      "type": "list",
      "label": "Experience",
      "heading": "Capture. Collect. Curate. Publish. Connect.",
      "items": [
        "Capture: save small moments as they happen.",
        "Collect: build a private weekly draft.",
        "Curate: choose moments, arrange their order, and add a caption.",
        "Publish: share one weekly Loop.",
        "Connect: friends watch, react, and reply to specific moments."
      ]
    },
    {
      "type": "decisions",
      "label": "Design direction",
      "heading": "A weekly story, with room to edit.",
      "items": [
        {
          "title": "A recap, rather than another stream",
          "body": "The concept focuses on the accumulated story of a week rather than a continuous stream of individual posts."
        },
        {
          "title": "Private until curated",
          "body": "A private draft creates space to review the week and choose what to share before publishing."
        },
        {
          "title": "Keep source audiences intact",
          "body": "The proposed visibility model follows each original moment. Supporting that model across a weekly post is part of the next implementation phase."
        }
      ]
    },
    {
      "type": "list",
      "label": "Delivered",
      "heading": "A complete prototype flow.",
      "intro": "The interactive, mobile-first web prototype demonstrates the experience locally in the browser.",
      "items": [
        "Photo uploads, voice recording, and text updates.",
        "Draft editing, ordering, and publishing.",
        "Reactions and replies to individual moments.",
        "A swipeable viewer with animated transitions, automatic playback, and pause controls.",
        "An Instagram-inspired palette, iOS-style navigation, and a presentation opening that reveals “loop.” from a white screen."
      ]
    },
    {
      "type": "evidence",
      "label": "Outcome & limits",
      "heading": "A finalist concept. A working prototype. A product ahead.",
      "observed": [
        "Meta hackathon finalist project.",
        "An interactive web prototype demonstrates the capture-to-reply flow.",
        "Subsequent development has established an interaction model and visual direction."
      ],
      "proposed": [
        "Make staying close easier through a meaningful weekly recap.",
        "Validate the experience with long-distance friendships."
      ],
      "limitations": [
        "Content is stored locally in the browser.",
        "No Instagram connection, delivered messages, or real multi-user accounts.",
        "The effect on friendship or engagement has not yet been validated."
      ]
    },
    {
      "type": "list",
      "label": "Next steps",
      "heading": "From a local prototype to a shared experience.",
      "items": [
        "Validate the experience with friends living apart.",
        "Decide whether Loop should be an integration or a standalone product.",
        "Build backend services, accounts, audience controls, and media storage.",
        "Establish the weekly publishing infrastructure."
      ]
    },
    {
      "type": "text",
      "label": "Product goal",
      "heading": "Stay in the loop, even when life takes you somewhere else.",
      "body": [
        "Give friends a small, meaningful chapter of each other’s lives every week. The next phase will test that goal with real friendships before claiming an impact."
      ]
    }
  ]
}
