import {
  Box, Button,
  CircularProgress,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { useGetPlayersQuery } from 'services';
import { useState } from 'react';
import { type Players as PlayersType } from 'services';
import PlayerRow from './PlayerRow';
import AddOrEditPlayer from './AddOrEditPlayer';

function Players() {
  const [isOpen, setIsOpen] = useState(false);

  const [type, setType] = useState<'add' | 'edit'>('add');

  const [player, setPlayer] = useState<PlayersType[number] | null>(null);

  const { data: players, isLoading } = useGetPlayersQuery({});

  const handleEditPlayer = (editedPlayer: PlayersType[number]) => {
    setPlayer(editedPlayer);
    setType('edit');
    setIsOpen(true);
  };

  return (
    <>
      <Box mb={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setType('add');
            setIsOpen(true);
          }}
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

      <AddOrEditPlayer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        player={player}
        type={type}
      />
    </>
  );
}

export default Players;
