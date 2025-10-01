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
import { useDeleteGroupMutation, type Tournament } from 'services';

function DeleteGroup({
  open,
  onClose,
  groups,
  isFinal,
}: {
  open: boolean,
  onClose: () => void,
  groups: Tournament['groups'],
  isFinal: boolean,
}) {
  const [form, setForm] = useState({
    groupId: '',
  });

  const isDisabled = form.groupId === '';

  const [deleteGroup, { isLoading, isSuccess, reset }] = useDeleteGroupMutation();

  useEffect(() => {
    if (isSuccess) {
      reset();

      setForm({ groupId: '' });

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
        {`Удалить ${isFinal ? 'этап финала' : 'группу'}`}

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
            <InputLabel>
              {isFinal ? 'Этап финала' : 'Группа'}
            </InputLabel>

            <Select
              label="Группа"
              value={form.groupId}
              onChange={(e) => setForm({ ...form, groupId: e.target.value })}
            >
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            disabled={isDisabled}
            onClick={() => deleteGroup({ groupId: Number(form.groupId) })}
            loading={isLoading}
          >
            Удалить
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteGroup;
