import {
  Box,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSetActiveTournamentMutation, type GetTournamentsResponse } from 'services';

type TournamentProps = {
  tournament: GetTournamentsResponse[number];
};

function Tournament({ tournament }: TournamentProps) {
  const [setActiveTournament, { isLoading }] = useSetActiveTournamentMutation();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        textDecoration: 'none',
        color: 'inherit',
      }}
      component={Link}
      to={`/tournaments/${tournament.id}`}
    >
      <Typography variant="body1">
        {tournament.name}
      </Typography>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
      >
        <Tooltip title="Статистика отображается только активного турнира, активный турнир может быть только один">
          <Typography variant="body1">
            {tournament.isActive ? (
              <Box
                component="span"
                color="primary.main"
              >
                Активен
              </Box>
            ) : (
              <Box
                component="span"
                color="error.main"
              >
                Неактивен
              </Box>
            )}
          </Typography>
        </Tooltip>

        <IconButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setActiveTournament(tournament.id);
          }}
          loading={isLoading}
        >
          <CheckCircleIcon color="primary" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Tournament;
