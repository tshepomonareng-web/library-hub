# WCAG 2.1 AA Mapping Matrix

| Criterion | Component | Implementation | Verification |
|---|---|---|---|
| 1.3.1 Info and Relationships (A) | All pages, forms | Landmarks (`header, nav, main, section, article, aside, footer`), heading hierarchy, `label for` + `aria-describedby` | axe-core; NVDA landmark list (D key) |
| 1.4.3 Contrast (Minimum) (AA) | Text, buttons, links | All text 4.5:1 or higher, large text 3:1 or higher; ratios recorded in `main.css` | WebAIM Contrast Checker; Lighthouse |
| 2.4.1 Bypass Blocks (A) | Page top | `.skip-link` to `#main`, visible on focus | Keyboard: first Tab press |
| 2.4.7 Focus Visible (AA) | All interactive elements | `:focus-visible` 3px `#2B6CB0` outline with 2px offset; white ring on dark header/footer | Manual Tab-through of each page |
| 3.3.2 Labels or Instructions (A) | Booking form | Visible `<label>` and hint text per field | NVDA forms mode; axe-core |
| 2.4.4 Link Purpose (A) | Result links | Link text names the resource | NVDA links list (K key) |
| 1.4.4 Resize Text (AA) | Layout | rem units; no fixed heights | Browser zoom to 200% |
