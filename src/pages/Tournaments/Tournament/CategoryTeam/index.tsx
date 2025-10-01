import {
  Box, Button, CircularProgress, Typography,
} from '@mui/material';
import { useState } from 'react';
import { useGetCategoryTeamsQuery } from 'services';
import AddTeam from './AddTeam';
import TeamRow from './TeamRow';

function Teams({ categoryId }: { categoryId: number }) {
  const [addTeamOpen, setAddTeamOpen] = useState(false);

  const { data, isLoading } = useGetCategoryTeamsQuery(categoryId);

  const teams = data?.teams ?? [];

  if (isLoading) {
    return <CircularProgress />;
  }

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
              В категории нет команд
            </Typography>
          )}
      </Box>

      <AddTeam
        open={addTeamOpen}
        onClose={() => setAddTeamOpen(false)}
        categoryId={categoryId}
      />
    </>
  );
}

export default Teams;
