import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  IconButton,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useAddGroupMutation } from 'services';
import { useParams } from 'react-router-dom';

function AddGroup({
  open,
  onClose,
  stageId,
  categoryId,
  isFinal,
}: {
  open: boolean,
  onClose: () => void,
  stageId: number,
  categoryId: number | null,
  isFinal: boolean,
}) {
  const [form, setForm] = useState({
    name: '',
  });

  const isDisabled = !form.name;

  const [addGroup, { isLoading, isSuccess, reset }] = useAddGroupMutation();

  const { id: tournamentId } = useParams();

  useEffect(() => {
    if (isSuccess) {
      onClose();

      reset();

      setForm({
        name: '',
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
        {`Добавить ${isFinal ? 'этап финала' : 'группу'}`}

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
            label={`Название ${isFinal ? 'этапа финала' : 'группы'}`}
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => addGroup({
              tournamentId: Number(tournamentId),
              stageId,
              categoryId,
              name: form.name,
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

export default AddGroup;
