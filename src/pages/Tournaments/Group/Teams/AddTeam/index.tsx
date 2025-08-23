/* eslint-disable react/jsx-props-no-spreading */
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAddTeamMutation, useGetPlayersQuery } from 'services';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AddTeam({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { groupId } = useParams();

  const [form, setForm] = useState({
    player1Id: '',
    player2Id: '',
  });

  const isDisabled = form.player1Id === '' || form.player2Id === '';

  const { data: players, isLoading } = useGetPlayersQuery(undefined);

  const [addTeam, { isLoading: isAdding, isSuccess: isAdded, reset }] = useAddTeamMutation();

  useEffect(() => {
    if (isAdded) {
      reset();

      onClose();

      setForm({
        player1Id: '',
        player2Id: '',
      });
    }
  }, [isAdded, reset]);

  return (
    <Dialog
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '600px',
        },
      }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        Добавить команду

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box py={1}>
          {isLoading
            ? <CircularProgress />
            : (
              <Box>
                <Autocomplete
                  sx={{ mb: 2 }}
                  fullWidth
                  options={(players || []).map((player) => ({
                    id: player.id,
                    label: `${player.firstName} ${player.lastName}`,
                  }))}
                  renderInput={(params) => <TextField {...params} label="Игрок 1" />}
                  onChange={(_, value) => setForm({ ...form, player1Id: String(value?.id) })}
                  getOptionDisabled={(option) => option.id === +form.player2Id}
                  disableClearable
                />

                <Autocomplete
                  sx={{ mb: 2 }}
                  fullWidth
                  options={(players || []).map((player) => ({
                    id: player.id,
                    label: `${player.firstName} ${player.lastName}`,
                  }))}
                  renderInput={(params) => <TextField {...params} label="Игрок 2" />}
                  onChange={(_, value) => setForm({ ...form, player2Id: String(value?.id) })}
                  getOptionDisabled={(option) => option.id === +form.player1Id}
                  disableClearable
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isDisabled}
                  onClick={() => addTeam({
                    groupId: Number(groupId),
                    player1Id: +form.player1Id,
                    player2Id: +form.player2Id,
                  })}
                  loading={isAdding}
                >
                  Добавить команду
                </Button>
              </Box>
            )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddTeam;
