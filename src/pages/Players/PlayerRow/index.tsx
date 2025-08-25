import {
  Box, Button, TableCell, TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDeletePlayerMutation, type Players } from 'services';
import avatarPlaceholder from 'assets/images/avatar-placeholder.webp';

function PlayerRow({
  player,
  onEdit,
}: {
  player: Players[number];
  onEdit: (player: Players[number]) => void;
}) {
  const [deletePlayer, { isLoading: isDeleting }] = useDeletePlayerMutation();

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        <Box
          component="img"
          src={player.avatarUrl || avatarPlaceholder}
          alt={player.slug}
          width={50}
          height={50}
          sx={{ borderRadius: '50%' }}
        />
      </TableCell>
      <TableCell align="left">{player.slug}</TableCell>
      <TableCell align="left">{player.firstName}</TableCell>
      <TableCell align="left">{player.lastName}</TableCell>
      <TableCell align="left">{player.raiting}</TableCell>
      <TableCell align="right">
        <Box display="flex" gap={1} justifyContent="flex-end">
          <Button
            loading={isDeleting}
            variant="contained"
            color="primary"
            onClick={() => onEdit(player)}
          >
            <EditIcon />
          </Button>

          <Button
            loading={isDeleting}
            variant="contained"
            color="error"
            onClick={() => deletePlayer({ id: player.id })}
          >
            <DeleteIcon />
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default PlayerRow;
