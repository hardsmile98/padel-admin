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
import { useAddCategoryMutation } from 'services';
import { useParams } from 'react-router-dom';

function AddCategory({
  open,
  onClose,
  stageId,
  parentCategoryId,
}: {
  open: boolean,
  onClose: () => void,
  stageId: number,
  parentCategoryId: number | null,
}) {
  const [form, setForm] = useState({
    name: '',
    order: '1',
  });

  const isDisabled = !form.name || !form.order;

  const [addCategory, { isLoading, isSuccess, reset }] = useAddCategoryMutation();

  const { id: tournamentId } = useParams();

  useEffect(() => {
    if (isSuccess) {
      onClose();

      reset();

      setForm({
        name: '',
        order: '1',
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
        {parentCategoryId ? 'Добавить подкатегорию' : 'Добавить лигу'}

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
            label={parentCategoryId ? 'Название подкатегории' : 'Название лиги'}
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <TextField
            label="Порядок отображения"
            type="number"
            fullWidth
            value={form.order}
            onChange={(e) => setForm({ ...form, order: e.target.value })}
            helperText="Первой идет лига с меньшим порядковым номером"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => addCategory({
              tournamentId: Number(tournamentId),
              stageId,
              parentCategoryId,
              name: form.name,
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

export default AddCategory;
