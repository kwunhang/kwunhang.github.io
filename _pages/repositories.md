---
layout: page
permalink: /repositories/
title: Repositories
description: Selected research code and software projects from my GitHub repositories.
nav: true
nav_order: 4
show_github_profile: false
---

Code for my research and software projects. Browse all my public repositories on [GitHub](https://github.com/kwunhang?tab=repositories).

{% if page.show_github_profile and site.data.repositories.github_users %}

## GitHub Profile

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for user in site.data.repositories.github_users %}
    {% include repository/repo_user.liquid username=user %}
  {% endfor %}
</div>

---

{% if site.repo_trophies.enabled %}
{% for user in site.data.repositories.github_users %}
{% if site.data.repositories.github_users.size > 1 %}

  <h4>{{ user }}</h4>
  {% endif %}
  <div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo_trophies.liquid username=user %}
  </div>

---

{% endfor %}
{% endif %}
{% endif %}

{% if site.data.repositories.github_repos %}

## GitHub Repositories

My PGVector Custom Implementation builds on [pgvector](https://github.com/pgvector/pgvector), and my Federated-Learning-Analysis project builds on [pFedMe](https://github.com/CharlieDinh/pFedMe).

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>
{% endif %}
