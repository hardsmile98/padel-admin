import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  IconButton,
  Button,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useAddStageMutation } from 'services';
import { useParams } from 'react-router-dom';

function AddStage({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [form, setForm] = useState({
    name: '',
    order: '1',
    isFinal: false,
  });

  const isDisabled = !form.name || !form.order;

  const [addStage, { isLoading, isSuccess, reset }] = useAddStageMutation();

  const { id: tournamentId } = useParams();

  useEffect(() => {
    if (isSuccess) {
      onClose();

      reset();

      setForm({
        name: '',
        order: '1',
        isFinal: false,
      });
    }
  }, [isSuccess]);

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
      <DialogTitle sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      >
        Добавить этап

        <IconButton onClick={onClose}>
          <CloseIcon onClick={onClose} />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          py: 1,
        }}
        >
          <TextField
            label="Название этапа"
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <FormControlLabel
            control={(
              <Checkbox
                checked={form.isFinal}
                onChange={(e) => setForm({
                  ...form,
                  ...form,
                  isFinal: e.target.checked,
                })}
              />
            )}
            label="Финальный этап"
          />

          <TextField
            label="Порядок отображения"
            type="number"
            fullWidth
            value={form.order}
            onChange={(e) => setForm({ ...form, order: e.target.value })}
            helperText="Первым идет этап с меньшим порядковым номером"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => addStage({
              tournamentId: Number(tournamentId),
              name: form.name,
              isFinal: form.isFinal,
              order: Number(form.order),
            })}
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

export default AddStage;
