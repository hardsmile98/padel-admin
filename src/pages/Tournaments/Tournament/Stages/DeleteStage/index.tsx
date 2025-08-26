import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useDeleteStageMutation, type Tournament } from 'services';

function DeleteStage({
  open,
  onClose,
  stages,
}: {
  open: boolean,
  onClose: () => void,
  stages: Tournament['stages'],
}) {
  const [form, setForm] = useState({
    stageId: '',
  });

  const isDisabled = form.stageId === '';

  const [deleteStage, { isLoading, isSuccess, reset }] = useDeleteStageMutation();

  useEffect(() => {
    if (isSuccess) {
      reset();

      setForm({ stageId: '' });

      onClose();
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
        Удалить этап

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
          <FormControl fullWidth>
            <InputLabel>Этап</InputLabel>
            <Select
              label="Этап"
              value={form.stageId}
              onChange={(e) => setForm({ ...form, stageId: e.target.value })}
            >
              {stages.map((stage) => (
                <MenuItem key={stage.id} value={stage.id}>
                  {stage.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            disabled={isDisabled}
            onClick={() => deleteStage({ stageId: Number(form.stageId) })}
            loading={isLoading}
          >
            Удалить
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteStage;
