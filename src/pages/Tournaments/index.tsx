import { Routes, Route } from 'react-router-dom';
import List from './List';
import Tournament from './Tournament';
import Group from './Group';

function Tournaments() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/:id" element={<Tournament />} />
      <Route path="/:id/groups/:groupId" element={<Group />} />
    </Routes>
  );
}

export default Tournaments;
