import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useAddTournamentMutation } from 'services';

type AddTournamentProps = {
  open: boolean;
  onClose: () => void;
};

function AddTournament({ open, onClose }: AddTournamentProps) {
  const [form, setForm] = useState({
    name: '',
  });

  const isDisabled = !form.name;

  const [addTournament, { isLoading, isSuccess, reset }] = useAddTournamentMutation();

  useEffect(() => {
    if (isSuccess) {
      onClose();

      setForm({
        name: '',
      });

      reset();
    }
  }, [isSuccess, onClose]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          maxWidth: 600,
          width: '100%',
        },
      }}
    >
      <DialogTitle sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      >
        Добавить турнир

        <IconButton onClick={onClose}>
          <CloseIcon onClick={onClose} />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box py={1}>
          <TextField
            sx={{ mb: 2 }}
            label="Название"
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => addTournament(form)}
            loading={isLoading}
            disabled={isDisabled}
          >
            Добавить
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddTournament;
