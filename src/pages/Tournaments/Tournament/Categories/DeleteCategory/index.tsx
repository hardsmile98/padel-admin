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
import { useDeleteCategoryMutation, type Tournament } from 'services';

function DeleteCategory({
  open,
  onClose,
  categories,
}: {
  open: boolean,
  onClose: () => void,
  categories: Tournament['categories'],
}) {
  const [form, setForm] = useState({
    categoryId: '',
  });

  const isDisabled = form.categoryId === '';

  const [deleteCategory, { isLoading, isSuccess, reset }] = useDeleteCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      reset();

      setForm({ categoryId: '' });

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
        Удалить группу

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
            <InputLabel>Лига или подкатегория</InputLabel>
            <Select
              label="Лига или подкатегория"
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            disabled={isDisabled}
            loading={isLoading}
            onClick={() => deleteCategory({ categoryId: Number(form.categoryId) })}
          >
            Удалить
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteCategory;
