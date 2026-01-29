---
title: ⚙️ Unlocking "Free Control" in Chaos - A Compact Multiplier-Oriented Oscillator
summary: A deep dive into my research on simplifying chaotic circuits. We achieved independent control of amplitude, frequency, and offset using a novel multiplier-oriented design.
date: 2023-06-08
math: true
profile: false

# Featured image
# Place an image named `featured.jpg/png` in this page's folder and customize its options here.
image:
  caption: 'Image credit: Adapted from Xu et al., IEEE TCS-II, 2023'

authors:
  - me
  - Chunbiao Li
  - Junyao Wu
  - Guanrong Chen
  - Chuang Zhang

tags:
  - Chaos Theory
  - Analog Circuits
  - IEEE Publication
  - Simplified Circuit
---

Welcome to my project blog 👋

{{< toc mobile_only=true is_open=true >}}

<div style="text-align: justify;">

## Overview

Chaotic systems are crucial for modern applications in cryptography, image encryption, and secure communications. However, implementing these systems in hardware often comes with a heavy cost: they typically require complex circuits with many quadratic terms, leading to high power consumption and stability issues.

In this project, which was published in **IEEE Transactions on Circuits and Systems II: Express Briefs**, we addressed a significant challenge in the field: **How do we build a robust chaotic oscillator that is both compact and easy to control?**


### The Core Problem
Traditional chaotic circuits rely heavily on operational amplifiers (op-amps) for integral summation. When a system has many quadratic nonlinear feedback terms, the circuit becomes cumbersome and prone to failure. Furthermore, controlling the signal's properties—like amplitude or offset—usually involves complex parameter tuning that can break the chaotic state.

## Our Solution: "Free Control"

We introduced a **Compact Multiplier-Oriented Chaotic Oscillator** that allows for "Free Control." This means the chaotic signal can be freely manipulated in three key aspects without altering the fundamental circuit structure:
1.  **Amplitude Control**
2.  **Frequency Modulation**
3.  **Offset Boosting**


### Key Innovations

* **Multiplier-Oriented Design:** We simplified the circuit by exploiting the current output characteristics of the **AD633 multiplier** and the **AD844 current feedback op-amp (CFOA)**.
* **Reduced Component Count:** We realized a chaotic system containing *five* quadratic terms using only **three multipliers and one op-amp**. This is a significant reduction compared to conventional implementations.
* **Robustness:** By utilizing the AD844 to handle current feedback, we alleviated the computational burden on the multipliers, resulting in a more robust system with higher load capability.

## Technical Implementation

During this research, I conducted comprehensive numerical analysis of the nonlinear dynamical systems using **Python and MATLAB**, applying Lyapunov stability theory to ensure chaotic behavior.

The hardware implementation focused on a specific system equation tailored for simplification:

$$
\begin{cases}
\dot{x} = cy + y^2 - ayz \\
\dot{y} = -z^2 + byz \\
\dot{z} = (x-d)y
\end{cases}
$$

By rescaling parameters $c$ and $d$, we achieved the following control mechanisms:
* **Parameter $c$:** Controls amplitude and frequency simultaneously.
* **Parameter $d$:** Controls offset boosting (polarity and position) of the attractor.

We validated these theoretical models by building hardware prototypes. The experimental results perfectly matched our numerical simulations, demonstrating that the phase trajectories could be shifted and scaled freely by simply tuning a rheostat or a DC voltage source.

## Impact & Future Work

This design proves that chaotic circuits do not need to be expensive or complex to be effective. The **multiplier-oriented approach** opens new doors for engineering applications where space and power are limited.

By enabling "free control," we make it easier to adapt chaotic signals for specific engineering requirements, such as signal masking in secure communications, without redesigning the entire hardware architecture.

---

### Citation
If you find this work useful for your research, please cite our paper:
> Y. Xu, C. Li, J. Wu, G. Chen and C. Zhang, "A Compact Multiplier-Oriented Chaotic Oscillator for Free Control," in *IEEE Transactions on Circuits and Systems II: Express Briefs*, vol. 70, no. 6, pp. 2276-2280, June 2023.

</div>

<link rel="stylesheet" href="/css/dynamic-background.css">
<script src="/js/init-background.js"></script>