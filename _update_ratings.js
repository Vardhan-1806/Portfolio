// Script to update CodeChef rating to 1119 and LeetCode to 1482 / 325 solved across all files
const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'about.html',
  'projects.html',
  'coding.html',
  'certifications.html',
  'resume.html',
  'contact.html',
  'project-lexassist.html',
  'project-travelmate.html',
  'project-socially.html',
  'project-algomotion.html',
  'shared.js',
  'deck-controller.js'
];

files.forEach(f => {
  const filePath = path.join(__dirname, f);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace CodeChef 1036 with 1119
  content = content.replace(/1,036/g, '1,119');
  content = content.replace(/1036/g, '1119');
  content = content.replace(/4 Contests/g, '5 Contests');
  content = content.replace(/4 Rated Contests/g, '5 Rated Contests');
  content = content.replace(/4 Official Contests/g, '5 Official Contests');
  content = content.replace(/4 contests/g, '5 contests');

  // Replace LeetCode 1454 with 1482
  content = content.replace(/1,454/g, '1,482');
  content = content.replace(/1454/g, '1482');

  // Replace LeetCode problems count 319 / 309 with 325
  content = content.replace(/319 Algorithmic Problems/g, '325 Algorithmic Problems');
  content = content.replace(/319 Problems Solved/g, '325 Problems Solved');
  content = content.replace(/319\+/g, '325+');
  content = content.replace(/319/g, '325');
  content = content.replace(/Easy: 237 · Medium: 81 · Hard: 1/g, 'Easy: 241 · Medium: 83 · Hard: 1');
  content = content.replace(/Top 60\.69%/g, 'Top 50.37%');
  content = content.replace(/7 Contests Attended/g, '8 Contests Attended');
  content = content.replace(/7 Contests/g, '8 Contests');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ratings in ${f}`);
});

console.log('All ratings updated successfully!');
