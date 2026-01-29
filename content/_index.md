---
title: 'About me'
date: 2023-10-24
type: landing
sections:
  - block: resume-biography
    content:
      # Author slug (data/authors/<slug>.yaml)
      username: me
    design:
      spacing:
        padding: [0, 0, 0, 0]
      biography:
        style: 'text-align: justify; font-size: 0.8em;'
      # Avatar customization
      avatar:
        size: medium  # Options: small (150px), medium (200px, default), large (320px), xl (400px), xxl (500px)
        shape: circle # Options: circle (default), square, rounded
  - block: markdown
    content:
      text: |
        <link rel="stylesheet" href="/css/dynamic-background.css">
        <link rel="stylesheet" href="/css/adaptive-text-contrast.css">
        <script src="/js/particle-background.js"></script>
        <script src="/js/init-background.js"></script>
        <script src="/js/bio-fix.js"></script>
        <script src="/js/adaptive-text-color.js"></script>
---
