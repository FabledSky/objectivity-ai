import timeline from './Historical-Timeline.md?raw'

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function parseSections(md) {
  const lines = md.split(/\r?\n/)
  const sections = []
  let currentSection = null
  let currentSub = null
  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentSub && currentSection) {
        currentSection.subsections.push(currentSub)
        currentSub = null
      }
      if (currentSection) sections.push(currentSection)
      const title = line.replace(/^## /, '').trim()
      currentSection = { title, slug: slugify(title), content: line + '\n', subsections: [] }
      continue
    }
    if (line.startsWith('### ')) {
      if (currentSub && currentSection) {
        currentSection.subsections.push(currentSub)
      }
      const title = line.replace(/^### /, '').trim()
      currentSub = { title, slug: slugify(title), content: line + '\n' }
      continue
    }
    if (currentSub) {
      currentSub.content += line + '\n'
    } else if (currentSection) {
      currentSection.content += line + '\n'
    }
  }
  if (currentSub && currentSection) {
    currentSection.subsections.push(currentSub)
  }
  if (currentSection) sections.push(currentSection)
  return sections
}

export const sections = parseSections(timeline)
