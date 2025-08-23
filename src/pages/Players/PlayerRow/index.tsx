import { Button, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeletePlayerMutation, type Players } from 'services';

function PlayerRow({ player }: { player: Players[number] }) {
  const [deletePlayer, { isLoading: isDeleting }] = useDeletePlayerMutation();

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {player.slug}
      </TableCell>
      <TableCell align="right">{player.firstName}</TableCell>
      <TableCell align="right">{player.lastName}</TableCell>
      <TableCell align="right">{player.raiting}</TableCell>
      <TableCell align="right">
        <Button
          loading={isDeleting}
          variant="contained"
          color="error"
          onClick={() => deletePlayer({ id: player.id })}
        >
          <DeleteIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default PlayerRow;
