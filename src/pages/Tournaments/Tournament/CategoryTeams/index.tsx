import {
  Box, Button, CircularProgress, Typography,
} from '@mui/material';
import { useState } from 'react';
import { useGetCategoryTeamsQuery } from 'services';
import AddTeam from './AddTeam';
import TeamRow from './TeamRow';

function CategoryTeams({ categoryId }: { categoryId: number }) {
  const [addTeamOpen, setAddTeamOpen] = useState(false);

  const [isExtra, setExtra] = useState(false);

  const {
    data: teamsData,
    isLoading: isTeamsLoading,
  } = useGetCategoryTeamsQuery({ categoryId });

  const {
    data: extraTeamsData,
    isLoading: isExtraTeamsLoading,
  } = useGetCategoryTeamsQuery({
    categoryId,
    type: 'extra',
  });

  const teams = teamsData?.teams ?? [];

  const extraTeams = extraTeamsData?.teams ?? [];

  const isLoading = isTeamsLoading || isExtraTeamsLoading;

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Box mb={3}>
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
            onClick={() => {
              setAddTeamOpen(true);
              setExtra(false);
            }}
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
      </Box>

      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          mb={2}
        >
          <Typography variant="h6">
            Команды за 9-16 место (
            {extraTeams.length}
            )
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setAddTeamOpen(true);
              setExtra(true);
            }}
          >
            Добавить команду
          </Button>
        </Box>

        <Box>
          {extraTeams && extraTeams.length > 0
            ? extraTeams.map((team) => (
              <TeamRow key={team.id} team={team} />
            ))
            : (
              <Typography color="text.secondary">
                В категории нет команд
              </Typography>
            )}
        </Box>
      </Box>

      <AddTeam
        open={addTeamOpen}
        onClose={() => setAddTeamOpen(false)}
        categoryId={categoryId}
        isExtra={isExtra}
      />
    </>
  );
}

export default CategoryTeams;
