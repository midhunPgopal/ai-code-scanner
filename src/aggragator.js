function aggregateReviews(reviews) {
  const riskCount = { low: 0, medium: 0, high: 0 };
  const issues = [];

  reviews.forEach(r => {
    if (r?.risk_level) {
      riskCount[r.risk_level]++;
    }
    if (Array.isArray(r?.issues)) {
      issues.push(...r.issues);
    }
  });

  return {
    totalFiles: reviews.length,
    riskSummary: riskCount,
    commonIssues: [...new Set(issues)].slice(0, 10)
  };
}

module.exports = { aggregateReviews };