import { Box, IconButton, Typography } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteTeamMutation, type Group } from 'services';

function TeamRow({ team }: { team: Group['teams'][number] }) {
  const [deleteTeam, { isLoading }] = useDeleteTeamMutation();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap={1}
      mb={1}
    >
      <Typography display="flex" alignItems="center" gap={1}>
        <GroupIcon />

        {team.player1.firstName}
        {' '}
        {team.player1.lastName}
        {' и '}
        {team.player2.firstName}
        {' '}
        {team.player2.lastName}
      </Typography>

      <IconButton
        color="error"
        onClick={() => deleteTeam({ teamId: team.id })}
        loading={isLoading}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}

export default TeamRow;
