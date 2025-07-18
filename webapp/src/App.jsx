import Sidebar from './components/Sidebar';
import Timeline from '../../Information-Hub/Israel-Palestine-Conflict/Historical-Timeline.md';
import './index.css';

export default function App() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <Timeline />
      </main>
    </div>
  );
}
