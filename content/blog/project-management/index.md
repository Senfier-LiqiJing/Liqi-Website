---
title: 'Exploration of 3D Gaussian Splatting and Geometry-Aware SLAM Systems'
summary: An investigation into Gaussian-based scene representations that unify rendering, mapping, and geometry reasoning. This research focuses on the progression from 3DGS to geometry-aware SLAM systems under monocular constraints.
date: 2024-04-01
math: true

# Featured image
# Place an image named `featured.png` or `featured.png` in this page's folder.
image:
  caption: 'Image credit: Fig. 5 from [2312.06741] Gaussian Splatting SLAM'
authors:
  - me

tags:
  - Neural Scene Representation
  - 3D Gaussian Splatting
  - Geometry-Aware SLAM
  - Neural Rendering
  - 3D Reconstruction
---

<span style="font-family: 'Courier New', Courier, monospace; font-size: 0.9em; color: #555;">
Note: This article represents a reproduction study of [2312.06741] Gaussian Splatting SLAM.
</span>

{{< toc mobile_only=true is_open=true >}}

<div style="text-align: justify;">

## Overview

Recent advancements in neural rendering have revolutionized how we reconstruct and interact with 3D scenes. This independent research project at the University of Southern California focuses on investigating **Gaussian-based scene representations** that unify three critical components of computer vision: rendering, mapping, and geometry reasoning.

The core objective is to understand and extend frameworks that can perform real-time neural rendering while maintaining accurate geometric reconstruction, particularly suitable for robot perception.

## Key Research Areas

### 1. Theoretical Foundations of 3DGS
I began by analyzing the theoretical underpinnings of **3D Gaussian Splatting (3DGS)**. Unlike implicit representations (like NeRFs) which can be computationally expensive to query, 3DGS utilizes explicit 3D Gaussians for efficient radiance field modeling. This allows for high-fidelity real-time neural rendering, making it a promising candidate for interactive applications.

### 2. From Rendering to SLAM
A significant portion of this research examines the progression from static 3DGS to full **Simultaneous Localization and Mapping (SLAM)** systems.

I specifically investigated systems like **Gaussian Splatting SLAM** and **HI-SLAM2**. The focus here is on **geometry-aware mapping**—ensuring that the system doesn't just produce pretty pictures, but also understands the underlying structure of the environment, even under challenging **monocular constraints**. This geometry awareness is crucial for robotics tasks where collision avoidance and path planning are necessary.

## Proposed Extensions

Building on existing literature, I proposed conceptual extensions to address current limitations in the field:

* **Dynamic Environments:** Adapting Gaussian-based SLAM to handle moving objects and changing scenes, rather than assuming a static world.
* **Large-Scale Mapping:** Bridging the gap between localized neural rendering and large-scale robot perception, enabling these systems to map extensive environments efficiently.

This exploration aims to bridge the gap between high-quality visual rendering and practical, geometry-aware robot perception.

</div>

<link rel="stylesheet" href="/css/dynamic-background.css">
<script src="/js/init-background.js"></script>