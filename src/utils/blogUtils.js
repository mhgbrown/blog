export const shaMapping = {
  "1376722800000-Un-cyanogenmoding a Motorola Droid.md": "8fbc7c69f817fb6b3ecd6ccb634b7cfa06be4dfe",
  "1376982000000-To Europe (Again).md": "753100e5fd68545c55a8444291e8356a1b890cb5",
  "1377586800000-DAT IPHONE THO.md": "a110072adc259ef459c6230740d9f1ed39f03d93",
  "1378252800000-BYE IPHONE.md": "90d5ea37cd1b445030bb7eed99b8bf8e9c5468bf",
  "1378252800000-Leaving LinkedIn.md": "2c5eca54685b6d11211b60c1ff4fcdbd80998b2b",
  "1379314800000-San Francisco Post-Mortem.md": "f03dfd524a245b39b83dca4e8e21fe5fe0f09756",
  "1380178800000-Re Charleston.md": "34d2fea21163e927d42d7c03fb32139952b9b3d3",
  "1380585600000-Things I've Learned This Week.md": "f62fad7c1af68c47a13fecd53f750ce8e70f98e1",
  "1381820400000-Ha, Things I've Learned This Week.md": "c6c84bfa29988fc735300386de884a0cf9e2df4f",
  "1382338800000-Things I've Learned This Woche.md": "479888ce7959db837a282df45366e00c5358dc85",
  "1382943600000-Věci jsem se naučil tento týden.md": "f8532680e9ea6fbdd16527cd6ac186e297d0e51e",
  "1383523200000-TINGS I'VE LEARND THIS WEAK.md": "1d5c4176eff4adab47e986e5a8467caa59f2b462",
  "1384156800000-Things I Have Learned ẗḥîṩ ⱳəẻķ.md": "cb444b5f7f7f7e440a3c96f931982abaad36918d",
  "1384761600000-This Week, Things That Have Been Learned By Me.md": "e594ecd25b63a446ad4545532859a0b84a5f2a95",
  "1385539200000-Ik Leerde Sommige Dingen Deze Week.md": "571ef011a94e413b712914d862429902f11414b2",
  "1386028800000-Dis Wïk's Stuff.md": "04e5484b672ee2f1e0c528f2793f77141db220a4",
  "1386662400000-Vidz Instead.md": "a4286bc24c681cb98212e299fd7b8f9a19405bb5",
  "1387353600000-STUFF LEARNED THIS WEEK.md": "7daef6ced5283c53da1797cd316376234de3bbde",
  "1389600000000-Ok, It's been a while.md": "3a54554ee6768cec32270c736655a4152c07311c",
  "1390896000000-Hi, But Soon Bye.md": "3edaa7cc5a0be9cb5152cc433781af99abd406ee",
  "1392278400000-I'm Out.md": "cb093854da5f2798498d9b09c6e7515f1bd4c4e3",
  "1394694000000-Karneval + Berlin.md": "fa74ba7ce9c3172c839b338cfbefbc075bf85da2",
  "1397001600000-What I Dislike About Germany.md": "3b1f6852ff98395db0f86dc8a013b4c75987b54c",
  "1403161200000-It's Over...For Now.md": "8ae54f8e8a0e60435cd879ebc467a68105d7b74c",
  "1417334400000-I Love (Complaining About) New York.md": "1ca1f31f1735eb06583079d790aca676cd1eed1e",
  "1555693002901-Changing Google Play Store Country.md": "8d0449e818f5ca5e736fef932b2288037d4ad1cc",
  "1562342317717-Vue, Server Side Rendering, and Handling Dependencies that Require a Browser Environment.md": "d1c0455af9e8b36b6f837ac0817eb2d12576495a",
  "1566743768788-JSON Web Token (JSON Web Encryption) Authentication with Kirby CMS 3.md": "8b72bbdf90640d2cc4c60be189c43e353f766e18"
};

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function getSlug(id) {
  // id is e.g. "1376722800000-Un-cyanogenmoding a Motorola Droid"
  const parts = id.split('-');
  const titlePart = parts.slice(1).join('-');
  const cleanTitle = titlePart.replace(/\.md$/, '');
  return slugify(cleanTitle);
}

export function getSHA(id) {
  // Match key with or without .md (id normally doesn't have .md in Astro, but let's be safe)
  const exactKey = id.endsWith('.md') ? id : `${id}.md`;
  return shaMapping[exactKey] || null;
}

export function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
