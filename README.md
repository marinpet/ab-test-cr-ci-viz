## CR Bar with 95 % Confidence Interval (Looker Studio)
1. File → Embed report → Manage Community Visualizations
2. “+ Enable custom viz” → Paste URL:  
   https://raw.githubusercontent.com/marinpet/ab-test-cr-ci-viz/main/manifest.json
3. In the editor:  
   * Dimension → variant ('Control','Treatment')  
   * Metrics   → cr, ci_low, ci_high
