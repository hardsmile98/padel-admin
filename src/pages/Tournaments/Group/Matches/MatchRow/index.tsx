/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import {
  Box, Divider, IconButton, Typography,
} from '@mui/material';
import { useDeleteMatchMutation, type Group } from 'services';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function MatchRow({
  match,
  teams,
  onEdit,
}: {
  match: Group['matches'][number], teams: Group['teams'], onEdit: (match: Group['matches'][number]) => void;
}) {
  const team1 = teams?.find((team) => team.id === match.team1Id);

  const team2 = teams?.find((team) => team.id === match.team2Id);

  const winner = match.winnerId;

  const [deleteMatch, { isLoading: isDeleting }] = useDeleteMatchMutation();

  return (
    <Box sx={{
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      p: 2,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 2,
    }}
    >
      <Box flex={1} display="flex" flexDirection="column" justifyContent="center" gap={1}>
        <Box display="flex" gap={6} alignItems="center">
          <Box width={240}>
            <Typography textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
              {team1?.player1.firstName}
              {' '}
              {team1?.player1.lastName}
            </Typography>

            <Typography textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
              {team1?.player2.firstName}
              {' '}
              {team1?.player2.lastName}
            </Typography>
          </Box>

          <Box display="flex" flexDirection="row" gap={2}>
            {match.sets.map((set, index) => {
              const [team1Result] = set.split('-');

              return (
                <Typography key={index} width={40}>
                  {team1Result || '-'}
                </Typography>
              );
            })}
          </Box>

          { winner !== null ? winner === team1?.id ? (
            <Box sx={{ color: 'success.main' }}>
              W
            </Box>
          ) : (
            <Box sx={{ color: 'error.main' }}>
              L
            </Box>
          ) : (
            <Box>
              -
            </Box>
          )}
        </Box>

        <Divider />

        <Box display="flex" gap={6} alignItems="center">
          <Box width={240}>
            <Typography textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
              {team2?.player1.firstName}
              {' '}
              {team2?.player1.lastName}
            </Typography>

            <Typography textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
              {team2?.player2.firstName}
              {' '}
              {team2?.player2.lastName}
            </Typography>
          </Box>

          <Box display="flex" flexDirection="row" gap={2}>
            {match.sets.map((set, index) => {
              const [, team2Result] = set.split('-');

              return (
                <Typography key={index} width={40}>
                  {team2Result || '-'}
                </Typography>
              );
            })}
          </Box>

          {winner !== null ? winner === team2?.id ? (
            <Box sx={{ color: 'success.main' }}>
              W
            </Box>
          ) : (
            <Box sx={{ color: 'error.main' }}>
              L
            </Box>
          ) : (
            <Box>
              -
            </Box>
          )}
        </Box>
      </Box>

      <Box>
        <IconButton
          color="primary"
          onClick={() => onEdit(match)}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          color="error"
          onClick={() => deleteMatch({ matchId: match.id })}
          loading={isDeleting}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default MatchRow;
