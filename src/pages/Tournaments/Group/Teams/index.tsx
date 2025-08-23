import {
  Box, Button, Typography,
} from '@mui/material';
import { useState } from 'react';
import type { Group } from 'services';
import AddTeam from './AddTeam';
import TeamRow from './TeamRow';

function Teams({ teams }: { teams: Group['teams'] }) {
  const [addTeamOpen, setAddTeamOpen] = useState(false);

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
          Команды (
          {teams.length}
          )
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddTeamOpen(true)}
        >
          Добавить команду
        </Button>
      </Box>

      <Box>
        {teams && teams.length > 0
          ? teams.map((team) => (
            <TeamRow key={team.id} team={team} />
          ))
          : (
            <Typography color="text.secondary">
              В группе нет команд
            </Typography>
          )}
      </Box>

      <AddTeam
        open={addTeamOpen}
        onClose={() => setAddTeamOpen(false)}
      />
    </>
  );
}

export default Teams;
