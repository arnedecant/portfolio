---
title: "Nyx Notes"
slug: "nyx-notes"
summary: "A self-hosted, Markdown-first notes app where plain files remain the source of truth across web, CLI, and native surfaces."
category: "Self-hosted Markdown notes product"
role: "Product engineer"
status: "Personal project in active development"
era: "Recent work"
tech:
  - Rust
  - Vue 3
  - Tauri
  - REST
  - SSE
featured: true
order: 3
---

Nyx Notes keeps notes as plain Markdown files, with a Rust workspace providing filesystem storage, an Axum server, authentication, a CLI, and a Tauri shell. The Vue application uses Nyx Kit and NyxEditor, with REST and typed SSE subscriptions for live note and vault data.

Comments live in JSON sidecars anchored to selected text. Optional end-to-end encryption and AI are future directions, not shipped features.
