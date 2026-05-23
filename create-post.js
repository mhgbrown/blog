import fs from 'fs';

const args = process.argv.slice(2);
const title = args[0];
if (!title) {
  console.error('Error: Please provide a post title.');
  console.error('Usage: npm run post "My New Post Title"');
  process.exit(1);
}

const date = +new Date();
const fileContent = `---
title: ${title}
date: ${date}
archived: false
---

This is a blog post.
`;

const destPath = `src/content/posts/${date}-${title}.md`;
fs.writeFileSync(destPath, fileContent, 'utf-8');
console.log(`✓ Created new post at: ${destPath}`);
