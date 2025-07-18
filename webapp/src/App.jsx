import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { sections } from './sections'
import './index.css'

function Section() {
  const { sectionSlug, subSlug } = useParams()
  const section = sections.find(s => s.slug === sectionSlug) || sections[0]
  const content = subSlug
    ? section.subsections.find(sub => sub.slug === subSlug)?.content
    : section.content
  return (
    <div className="prose max-w-none dark:prose-invert p-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}

function Sidebar({ open, setOpen }) {
  return (
    <aside className={`bg-[#0d1117] text-[#f0f6fc] border-r border-[#3d444d] md:w-64 p-4 overflow-y-auto fixed md:static inset-y-0 left-0 transform ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 z-50`}>
      <button className="md:hidden mb-4" onClick={() => setOpen(false)}>Close</button>
      <nav>
        {sections.map(sec => (
          <div key={sec.slug} className="mb-2">
            <Link className="font-semibold block text-[#58a6ff]" to={`/${sec.slug}`} onClick={() => setOpen(false)}>{sec.title}</Link>
            <ul className="ml-4">
              {sec.subsections.map(sub => (
                <li key={sub.slug}>
                  <Link to={`/${sec.slug}/${sub.slug}`} onClick={() => setOpen(false)} className="text-sm text-[#58a6ff]">
                    {sub.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  const first = sections[0]?.slug || ''
  return (
    <BrowserRouter basename="/">
      <div className="flex">
        <Sidebar open={open} setOpen={setOpen} />
        <div className="flex-1 md:ml-64">
          <header className="md:hidden p-2 border-b bg-[#151b23] text-[#f0f6fc] border-[#3d444d]">
            <button onClick={() => setOpen(true)}>Menu</button>
          </header>
          <Routes>
            <Route path="/" element={<Navigate to={`/${first}`} replace />} />
            {sections.map(sec => (
              <Route key={sec.slug} path={`${sec.slug}`} element={<Section />} />
            ))}
            {sections.flatMap(sec =>
              sec.subsections.map(sub => (
                <Route key={`${sec.slug}/${sub.slug}`} path={`${sec.slug}/${sub.slug}`} element={<Section />} />
              ))
            )}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
