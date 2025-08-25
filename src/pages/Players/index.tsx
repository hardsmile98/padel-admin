import {
  Box, Button,
  CircularProgress,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { useGetPlayersQuery } from 'services';
import { useState } from 'react';
import { type Players as PlayersType } from 'services';
import PlayerRow from './PlayerRow';
import AddPlayer from './AddPlayer';
import EditPlayer from './EditPlayer';

function Players() {
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);

  const [isEditPlayerOpen, setIsEditPlayerOpen] = useState(false);

  const [player, setPlayer] = useState<PlayersType[number] | null>(null);

  const { data: players, isLoading } = useGetPlayersQuery({});

  const handleEditPlayer = (editedPlayer: PlayersType[number]) => {
    setPlayer(editedPlayer);
    setIsEditPlayerOpen(true);
  };

  return (
    <>
      <Box mb={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsAddPlayerOpen(true)}
        >
          Добавить игрока
        </Button>
      </Box>

      <Box>
        {isLoading ? <CircularProgress /> : (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Автарка</TableCell>
                  <TableCell align="left">Slug</TableCell>
                  <TableCell align="left">Имя</TableCell>
                  <TableCell align="left">Фамилия</TableCell>
                  <TableCell align="left">Рейтинг</TableCell>
                  <TableCell align="right">Действия</TableCell>
                </TableRow>
              </TableHead>

              {players && players.length > 0 && (
                <TableBody>
                  {(players || [])?.map((row) => (
                    <PlayerRow
                      key={row.slug}
                      player={row}
                      onEdit={handleEditPlayer}
                    />
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        )}
      </Box>

      <AddPlayer
        open={isAddPlayerOpen}
        onClose={() => setIsAddPlayerOpen(false)}
      />

      <EditPlayer
        open={isEditPlayerOpen}
        onClose={() => setIsEditPlayerOpen(false)}
        player={player}
      />
    </>
  );
}

export default Players;
