import { useEffect, useState } from 'react';

export default function Sidebar() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll('main h2, main h3, main h4')
    );
    setItems(nodes.map(n => ({
      id:   n.id,
      text: n.textContent,
      level: parseInt(n.tagName.slice(1), 10)
    })));
  }, []);

  return (
    <nav className="toc">
      <ul>
        {items.map(({ id, text, level }) => (
          <li key={id} className={`toc-h${level}`}>
            <a href={`#${id}`}>{text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
