import {
  Box, Button,
  CircularProgress,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { useGetPlayersQuery } from 'services';
import { useState } from 'react';
import PlayerRow from './PlayerRow';
import AddPlayer from './AddPlayer';

function Players() {
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);

  const { data: players, isLoading } = useGetPlayersQuery({});

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
                  <TableCell>Slug</TableCell>
                  <TableCell align="right">Имя</TableCell>
                  <TableCell align="right">Фамилия</TableCell>
                  <TableCell align="right">Рейтинг</TableCell>
                  <TableCell align="right">Действия</TableCell>
                </TableRow>
              </TableHead>

              {players && players.length > 0 && (
                <TableBody>
                  {(players || [])?.map((row) => (
                    <PlayerRow key={row.slug} player={row} />
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
    </>
  );
}

export default Players;
