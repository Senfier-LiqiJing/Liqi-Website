---
title: '🧬 GenBinder: Flow Matching with Optimal Transport for TCR Binder Design'
summary: A novel generative pipeline for protein binder design. By leveraging Optimal Transport and Flow Matching, we move beyond standard diffusion models to generate biologically plausible protein structures directly from real distributions.
date: 2025-09-20
draft: true
math: true

# Featured image
# Place an image named `featured.jpg` or `featured.png` in this page's folder.
image:
  caption: 'Image credit: GenBinder Architecture / Project Schematic'

authors:
  - me

tags:
  - Generative AI
  - Protein Design
  - Flow Matching
  - Optimal Transport
  - Deep Learning
---

{{< toc mobile_only=true is_open=true >}}

<div style="text-align: justify;">

## Overview

Protein binder design is a challenging task that requires navigating a vast chemical space to find structures that bind specifically to a target. While diffusion models have shown promise, they often rely on denoising from Gaussian noise, which can be inefficient for modeling highly structured biological data.

**GenBinder** is a new project where I developed an end-to-end generative pipeline for T-cell receptor (TCR) binder design. The key innovation is formulating the generation process as an **Optimal Transport (OT)** problem between real biological distributions, rather than starting from random noise.

## Key Methodology

### 1. Flow Matching with Optimal Transport
Instead of standard diffusion, GenBinder uses **Flow Matching** to model binder generation. We define the generation as a structured transport process:
* **Source:** Distributions of existing TCRs and natural binders.
* **Target:** The specific binder distribution required for the antigen.

This "real-to-real" transport approach aims to be more biologically grounded than "noise-to-real" methods, potentially leading to higher quality candidates.

### 2. Sequence-Structure Coupled Training
A protein's function is inextricably partial to both its 3D geometry and its amino acid sequence. To address this, I implemented a **sequence-structure coupled training framework**. This ensures that the generated backbone geometries are compatible with their sequences, and the system features modular loss components to allow for flexible ablation studies and future extensions.

## Physically Motivated Constraints

To ensure the generated proteins are not just mathematically optimal but physically viable, I designed and integrated **physically motivated structural losses**.

These include specific **helicity-based geometric constraints** to encourage the formation of realistic secondary structures (like $\alpha$-helices) and avoid biologically implausible conformations.

## Project Status

The project currently has a **fully runnable training and evaluation pipeline**. I am currently working on integrating larger datasets and establishing comprehensive benchmarks to further validate the model's performance against state-of-the-art methods.

</div>

<link rel="stylesheet" href="/css/dynamic-background.css">
<script src="/js/init-background.js"></script>