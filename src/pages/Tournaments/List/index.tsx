import { Box, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useGetTournamentsQuery } from 'services';
import AddTournament from './AddTournament';
import Tournament from './Tournament';

function Tournaments() {
  const [addTournamentOpen, setAddTournamentOpen] = useState(false);

  const { data: tournaments, isLoading } = useGetTournamentsQuery({});

  return (
    <>
      <Box mb={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddTournamentOpen(true)}
        >
          Добавить турнир
        </Button>
      </Box>

      <Box>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
          >
            {tournaments?.map((tournament) => (
              <Tournament
                key={tournament.id}
                tournament={tournament}
              />
            ))}
          </Box>
        )}
      </Box>

      <AddTournament
        open={addTournamentOpen}
        onClose={() => setAddTournamentOpen(false)}
      />
    </>
  );
}

export default Tournaments;
