import { Box, Button, Typography } from '@mui/material';
import type { Group } from 'services';
import { useState } from 'react';
import AddOrEditMatch from './AddOrEditMatch';
import MatchRow from './MatchRow';

function Matches({ matches, teams }: { matches: Group['matches'], teams: Group['teams'] }) {
  const [isOpen, setIsOpen] = useState(false);

  const [matchSelected, setMatchSelected] = useState<Group['matches'][number] | null>(null);

  const [type, setType] = useState<'add' | 'edit'>('add');

  const handleEditMatch = (match: Group['matches'][number]) => {
    setMatchSelected(match);
    setType('edit');
    setIsOpen(true);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        mb={2}
      >
        <Typography variant="h6">
          Сыгранные матчи
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setType('add');
            setIsOpen(true);
          }}
        >
          Добавить матч
        </Button>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        {matches && matches.length > 0 ? matches.map((match) => (
          <MatchRow
            key={match.id}
            match={match}
            teams={teams}
            onEdit={handleEditMatch}
          />
        )) : (
          <Typography color="text.secondary">
            Нет сыгранных матчей в группе
          </Typography>
        )}
      </Box>

      <AddOrEditMatch
        open={isOpen}
        onClose={() => setIsOpen(false)}
        match={matchSelected}
        type={type}
        teams={teams ?? []}
      />
    </>
  );
}

export default Matches;
