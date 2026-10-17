---
layout: page
permalink: /experiences/
title: Experiences
description: Research, software development, and AI roles in Hong Kong.
nav: true
nav_order: 3
_styles: |
  .experience-list {
    --experience-muted: color-mix(in srgb, var(--global-text-color) 72%, var(--global-bg-color));
    margin: 2rem 0 0;
    padding: 0 0 1rem;
    list-style: none;
  }

  .experience-list .experience-item {
    position: relative;
    padding: 0 0 1.75rem 1.75rem;
  }

  .experience-list .experience-item:not(:last-child)::before {
    content: "";
    position: absolute;
    top: 0.6875rem;
    bottom: -0.6875rem;
    left: calc(0.3125rem - 0.5px);
    width: 1px;
    background: var(--global-divider-color);
  }

  .experience-list .experience-item::after {
    content: "";
    position: absolute;
    top: 0.375rem;
    left: 0;
    width: 0.625rem;
    height: 0.625rem;
    border: 2px solid var(--global-theme-color);
    border-radius: 50%;
    background: var(--global-bg-color);
  }

  .experience-list .experience-entry {
    padding-bottom: 1.75rem;
    border-bottom: 1px solid var(--global-divider-color);
  }

  .experience-list .experience-item:last-child,
  .experience-list .experience-item:last-child .experience-entry {
    padding-bottom: 0;
  }

  .experience-list .experience-item:last-child .experience-entry {
    border-bottom: 0;
  }

  .experience-list .experience-heading {
    margin-bottom: 1rem;
  }

  .experience-list .experience-role {
    margin: 0 0 0.3rem;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.4;
  }

  .experience-list .experience-company {
    margin: 0 0 0.45rem;
    color: var(--global-theme-color);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  }

  .experience-list .experience-meta {
    margin: 0;
    color: var(--experience-muted);
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.6;
  }

  .experience-list .experience-period {
    margin: 0 0 0.4rem;
    color: var(--experience-muted);
    font-size: 0.875rem;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    line-height: 1.6;
    white-space: nowrap;
  }

  .experience-list .experience-highlights {
    display: grid;
    gap: 0.45rem;
    margin: 0;
    padding-left: 1.15rem;
    list-style: disc;
    font-size: 0.9375rem;
    line-height: 1.7;
  }

  .experience-list .experience-highlights p {
    margin: 0;
  }

  .experience-list .experience-highlights strong {
    font-weight: 500;
  }

  @media print {
    .experience-list .experience-item {
      break-inside: avoid;
    }
  }
---

<ol class="experience-list" role="list" aria-label="Work experience, newest first">
  {% for experience in site.data.experiences %}
    <li class="experience-item">
      <section class="experience-entry" aria-labelledby="experience-{{ experience.id }}">
        <header class="experience-heading">
          <p class="experience-period">
            <time datetime="{{ experience.start }}">{{ experience.start | append: '-01' | date: '%b %Y' }}</time>
            –
            <time datetime="{{ experience.end }}">{{ experience.end | append: '-01' | date: '%b %Y' }}</time>
          </p>
          <h2 class="experience-role" id="experience-{{ experience.id }}">{{ experience.role }}</h2>
          <p class="experience-company">{{ experience.company }}</p>
          <p class="experience-meta">
            {{ experience.location }}{% if experience.employment %} · {{ experience.employment }}{% endif %}
          </p>
        </header>
        <ul class="experience-highlights">
          {% for highlight in experience.highlights %}
            <li>{{ highlight | markdownify }}</li>
          {% endfor %}
        </ul>
      </section>
    </li>
  {% endfor %}
</ol>
