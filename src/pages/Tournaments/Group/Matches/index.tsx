import { Box, Button, Typography } from '@mui/material';
import type { Group } from 'services';
import { useState } from 'react';
import AddMatch from './AddMatch';
import MatchRow from './MatchRow';

function Matches({ matches, teams }: { matches: Group['matches'], teams: Group['teams'] }) {
  const [addMatchOpen, setAddMatchOpen] = useState(false);

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
          onClick={() => setAddMatchOpen(true)}
        >
          Добавить матч
        </Button>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        {matches && matches.length > 0 ? matches.map((match) => (
          <MatchRow key={match.id} match={match} teams={teams} />
        )) : (
          <Typography color="text.secondary">
            Нет сыгранных матчей в группе
          </Typography>
        )}
      </Box>

      <AddMatch
        open={addMatchOpen}
        onClose={() => setAddMatchOpen(false)}
        teams={teams ?? []}
      />
    </>
  );
}

export default Matches;
