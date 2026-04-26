export const studentProfile = {
  name: 'Sofia Martinez',
  major: 'Computer Science BS',
  studentId: '24839102',
  estimatedGraduation: 'Spring 2027',
  advisor: 'Dr. Elena Reyes',
  statusLine: 'Graduation risk detected early',
};

export const degreeProgress = {
  requiredCredits: 120,
  plannedCredits: 113,
  completedCredits: 78,
};

export const requirements = [
  { name: 'Foundation courses', status: 'complete', detail: 'ENGL, math, and first-year foundation completed' },
  { name: 'Major core', status: 'in progress', detail: 'CSC 245 and CSC 335 still sequence-sensitive' },
  { name: 'General education', status: 'complete', detail: 'Exploring Perspectives and Building Connections satisfied' },
  { name: 'Upper division credits', status: 'missing', detail: 'Needs 6 additional upper-division credits' },
  { name: 'Electives', status: 'missing', detail: 'Current plan is short by 7 credits' },
  { name: 'Capstone', status: 'in progress', detail: 'Eligible after CSC 335 is completed' },
];

export const semesters = [
  {
    term: 'Fall 2025',
    courses: [
      {
        code: 'MATH 129',
        name: 'Calculus II',
        credits: 4,
        type: 'Foundation',
        risk: 'Prerequisite-sensitive',
        note: 'Required before upper math electives.',
        requirement: 'Math foundation requirement',
        riskIfDelayed: 'Can block later quantitative courses and technical electives.',
      },
      {
        code: 'ENGL 102',
        name: 'Writing',
        credits: 3,
        type: 'Counts as Gen Ed',
        risk: null,
        note: 'Completes writing requirement.',
        requirement: 'General Education writing requirement',
        riskIfDelayed: 'Low risk, but graduation audit still requires it to be complete.',
      },
      {
        code: 'CHEM 151',
        name: 'General Chemistry I',
        credits: 4,
        type: 'Counts as Gen Ed',
        risk: 'Bottleneck',
        note: 'High demand course with limited seats.',
        requirement: 'Lab science requirement',
        riskIfDelayed: 'Limited seats can push science requirement completion later.',
      },
    ],
  },
  {
    term: 'Spring 2026',
    courses: [
      {
        code: 'CSC 245',
        name: 'Data Structures',
        credits: 3,
        type: 'Major Core',
        risk: 'Bottleneck',
        note: 'Data Structures is required before CSC 335. Delaying it may push the major sequence and capstone later.',
        requirement: 'Computer Science prerequisite chain',
        riskIfDelayed: 'CSC 335 and capstone timing may shift by a semester.',
      },
      {
        code: 'CSC 252',
        name: 'Computer Organization',
        credits: 3,
        type: 'Major Core',
        risk: 'Prerequisite-sensitive',
        note: 'Keeps core sequence moving.',
        requirement: 'Computer Science core requirement',
        riskIfDelayed: 'Can narrow future semester options for upper-division CS work.',
      },
      {
        code: 'ISTA 130',
        name: 'Computational Thinking',
        credits: 3,
        type: 'Elective credit',
        risk: 'Elective credit',
        note: 'This elective helps total credits, but it may not satisfy the missing upper-division requirement.',
        requirement: 'Total credit progress',
        riskIfDelayed: 'Helps credits, but does not solve the upper-division shortfall.',
      },
    ],
  },
  {
    term: 'Fall 2026',
    courses: [
      {
        code: 'CSC 335',
        name: 'Object-Oriented Programming',
        credits: 3,
        type: 'Major Core',
        risk: 'Prerequisite-sensitive',
        note: 'Depends on successful CSC 245 completion.',
        requirement: 'Computer Science major sequence',
        riskIfDelayed: 'Can push capstone eligibility later.',
      },
      {
        code: 'CSC 380',
        name: 'Principles of Data Science',
        credits: 3,
        type: 'Upper Division',
        risk: 'Upper Division',
        note: 'Supports data science pathway.',
        requirement: 'Upper-division major elective',
        riskIfDelayed: 'Could preserve major progress but leave fewer advanced-credit options.',
      },
      {
        code: 'PAH 200',
        name: 'Intro to Arts & Humanities',
        credits: 3,
        type: 'Counts as Gen Ed',
        risk: null,
        note: 'Applies to remaining Gen Ed breadth.',
        requirement: 'General Education breadth',
        riskIfDelayed: 'Can leave a non-major graduation rule incomplete.',
      },
    ],
  },
  {
    term: 'Spring 2027',
    courses: [
      {
        code: 'CSC 498',
        name: 'Senior Capstone',
        credits: 3,
        type: 'Capstone',
        risk: 'Prerequisite-sensitive',
        note: 'Final graduation milestone.',
        requirement: 'Capstone requirement',
        riskIfDelayed: 'Usually cannot be replaced by a random elective.',
      },
      {
        code: 'CSC 460',
        name: 'Database Design',
        credits: 3,
        type: 'Upper Division',
        risk: 'Upper Division',
        note: 'Upper-division elective.',
        requirement: 'Upper-division elective requirement',
        riskIfDelayed: 'May leave advanced-credit minimum short.',
      },
      {
        code: 'UNIV 301',
        name: 'Career Readiness',
        credits: 1,
        type: 'Elective credit',
        risk: 'Elective credit',
        note: 'Helpful, but does not close the credit gap.',
        requirement: 'General elective credit',
        riskIfDelayed: 'Only one credit, so Sofia still needs more credit-bearing work.',
      },
    ],
  },
];

export const riskAnalysis = {
  level: 'Medium',
  reasons: [
    'Credit gap: 113 / 120 credits',
    'Prerequisite chain: CSC 245 must come before CSC 335',
    'Bottleneck course: CSC 245 may fill quickly',
    'Elective mismatch: one planned elective does not close the missing requirement',
  ],
  nextActions: [
    'Move CSC 245 earlier',
    'Add one 3-credit upper-division elective',
    'Confirm Gen Ed completion',
    'Meet advisor before registration',
  ],
  timeSaved: 'Potential delay avoided: 1 semester',
};

export const gpsCheckpoints = [
  { label: 'Credits', status: 'delay risk', color: 'red', detail: '7 credits short' },
  { label: 'Gen Ed', status: 'clear', color: 'green', detail: 'Requirement complete' },
  { label: 'Prerequisites', status: 'needs attention', color: 'yellow', detail: 'CSC 245 → CSC 335 sequence' },
  { label: 'Course Availability', status: 'delay risk', color: 'red', detail: 'CSC 245 bottleneck' },
  { label: 'Advisor Review', status: 'recommended', color: 'yellow', detail: 'Meet before registration' },
];

export const hiddenRules = [
  {
    name: 'Gen Ed',
    explanation: 'Required courses outside your major.',
    whyMissed: 'Students may focus only on major classes.',
    delayRisk: 'You can finish your major but still be missing graduation requirements.',
    action: 'Flags missing Gen Eds early.',
  },
  {
    name: 'Electives',
    explanation: 'Courses that help you reach the total credit requirement.',
    whyMissed: 'Elective does not mean optional.',
    delayRisk: 'You may complete required classes but still be short of 120 credits.',
    action: 'Shows which electives help close your credit gap.',
  },
  {
    name: 'Prerequisites',
    explanation: 'Courses that must be taken before another course.',
    whyMissed: 'One missed class can block a whole sequence.',
    delayRisk: 'CSC 245 delayed means CSC 335 and capstone may shift later.',
    action: 'Warns before registration.',
  },
  {
    name: 'Upper Division',
    explanation: 'Advanced 300/400-level credits required by many degrees.',
    whyMissed: 'Students may take enough total credits but not enough advanced credits.',
    delayRisk: 'Graduation audit can fail even with 120 credits.',
    action: 'Tracks upper-division credit count separately.',
  },
  {
    name: 'Bottleneck Course',
    explanation: 'A required course with limited seats or limited offerings.',
    whyMissed: 'Students assume required courses are always available.',
    delayRisk: 'If it fills up, graduation can move back a semester.',
    action: 'Flags high-impact courses early.',
  },
  {
    name: 'Transfer Credit',
    explanation: 'Transferred courses may not count how students expect.',
    whyMissed: 'A course may transfer as general credit but not satisfy a specific requirement.',
    delayRisk: 'Transfer students may discover missing requirements late.',
    action: 'Shows credit mismatch warnings.',
  },
  {
    name: 'Course Availability',
    explanation: 'Some courses are not offered every semester.',
    whyMissed: 'Students plan a course for a semester when it may not exist.',
    delayRisk: 'A once-a-year course can delay graduation.',
    action: 'Checks plan timing against expected offering patterns.',
  },
];

export const advisorSummary = {
  totalAssigned: 184,
  onTrack: 126,
  supportNeeded: 43,
  highRisk: 15,
};

export const advisorDistribution = [
  { name: 'On Track', value: 126 },
  { name: 'Support Needed', value: 43 },
  { name: 'Off Track', value: 15 },
];

export const advisorStudents = [
  {
    name: 'Sofia Martinez',
    group: 'First-Time Students',
    studentType: 'International',
    major: 'Computer Science',
    creditsPlanned: 113,
    risk: 'Medium',
    mainIssue: 'Missing 7 credits + CSC 245 bottleneck',
    action: 'Review plan',
    hiddenRule: 'Credits + prerequisite chain',
    delayRisk: '1 semester',
    suggestedOutreach: 'Review plan',
    urgency: 'Before registration',
    needsReview: true,
  },
  {
    name: 'Jordan Lee',
    group: 'Transfer Students',
    studentType: 'First-generation',
    major: 'Engineering',
    creditsPlanned: 108,
    risk: 'High',
    mainIssue: 'MATH 129 delay risk',
    action: 'Immediate outreach',
    hiddenRule: 'MATH 129 bottleneck',
    delayRisk: '1 semester',
    suggestedOutreach: 'Immediate outreach',
    urgency: 'High',
    needsReview: true,
  },
  {
    name: 'Aaliyah Brown',
    group: 'First-Time Students',
    studentType: 'Continuing',
    major: 'Business',
    creditsPlanned: 121,
    risk: 'Low',
    mainIssue: 'On track',
    action: 'No action',
    hiddenRule: 'None detected',
    delayRisk: 'None',
    suggestedOutreach: 'No outreach needed',
    urgency: 'Monitor',
    needsReview: false,
  },
  {
    name: 'Mateo Garcia',
    group: 'Transfer Students',
    studentType: 'First-generation',
    major: 'Psychology',
    creditsPlanned: 116,
    risk: 'Medium',
    mainIssue: 'Missing upper division credits',
    action: 'Add elective',
    hiddenRule: 'Upper-division minimum',
    delayRisk: 'Possible audit issue',
    suggestedOutreach: 'Add approved upper-division elective',
    urgency: 'Medium',
    needsReview: true,
  },
  {
    name: 'Emma Wilson',
    group: 'First-Time Students',
    studentType: 'Transfer',
    major: 'Biology',
    creditsPlanned: 105,
    risk: 'High',
    mainIssue: 'CHEM 151 bottleneck + transfer credit mismatch',
    action: 'Audit transfer credits',
    hiddenRule: 'CHEM 151 + transfer credit mismatch',
    delayRisk: '1 semester',
    suggestedOutreach: 'Audit transfer credits',
    urgency: 'High',
    needsReview: true,
  },
];

export const systemBlockers = [
  {
    title: 'CSC 245 Bottleneck',
    affected: 289,
    detail: 'Required for later CS sequence.',
    impact: 'Adding one section could protect 80+ plans.',
  },
  {
    title: 'Advisor Coverage Gap',
    affected: 412,
    detail: 'Students may miss planning help before registration.',
    impact: 'Earlier advisor assignment reduces late intervention.',
  },
  {
    title: 'Transfer Credit Mismatch',
    affected: 236,
    detail: 'Credits may transfer but not satisfy expected requirements.',
    impact: 'Earlier explanation prevents senior-year audit surprises.',
  },
  {
    title: 'Upper-Division Credit Shortfall',
    affected: 318,
    detail: 'Students may reach 120 credits but still lack advanced credits.',
    impact: 'Degree audits pass earlier.',
  },
  {
    title: 'Course Offered Once Per Year',
    affected: 174,
    detail: 'Missing the course can create a full-year delay.',
    impact: 'Availability warnings protect expected graduation dates.',
  },
];

export const adminAlerts = [
  {
    title: 'Critical course capacity shortage',
    detail: 'CSC 245 bottleneck impacting 289 students',
    severity: 'Critical',
  },
  {
    title: 'Advisor assignment coverage gap',
    detail: '412 students without assigned advisors',
    severity: 'High',
  },
  {
    title: 'Four-year graduation rate tracking below target',
    detail: '76.8% vs 80% target',
    severity: 'High',
  },
];

export const adminMetrics = [
  { label: 'Four-Year FTFT Graduation Rate', value: '62.8%' },
  { label: 'Six-Year FTFT Graduation Rate', value: '72.5%' },
  { label: 'Transfer 2-Year Graduation Rate', value: '69.4%' },
  { label: 'Active Degree Completion Plans', value: '38,123' },
  { label: 'Students Requiring Support', value: '2,847' },
  { label: 'Total Courses Offered', value: '2,184' },
];

export const collegeProgress = [
  { college: 'Engineering', onTrack: 58, supportNeeded: 27, offTrack: 15 },
  { college: 'Science', onTrack: 63, supportNeeded: 24, offTrack: 13 },
  { college: 'Business', onTrack: 74, supportNeeded: 18, offTrack: 8 },
  { college: 'Humanities', onTrack: 70, supportNeeded: 20, offTrack: 10 },
  { college: 'SBS', onTrack: 66, supportNeeded: 22, offTrack: 12 },
  { college: 'Education', onTrack: 71, supportNeeded: 21, offTrack: 8 },
];

export const advisingCoverage = [
  { label: 'Students with Advisor', value: '38,456' },
  { label: 'Pending Assignment', value: '4,123' },
  { label: 'Unassigned / At Risk', value: '2,638' },
  { label: 'Active Advisors', value: '287' },
  { label: 'Average Caseload', value: '134' },
];

export const criticalCourses = [
  { code: 'MATH 129', name: 'Calculus II', impacted: 487 },
  { code: 'CHEM 151', name: 'General Chemistry I', impacted: 392 },
  { code: 'PHYS 141', name: 'Introductory Physics', impacted: 356 },
  { code: 'CSC 245', name: 'Data Structures', impacted: 289 },
  { code: 'ECON 200', name: 'Microeconomics', impacted: 267 },
];
