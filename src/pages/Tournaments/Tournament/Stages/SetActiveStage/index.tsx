import {
  Box, Button, Dialog, DialogContent, DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSetActiveStageMutation, type Tournament } from 'services';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';

function SetActiveStage({
  open,
  onClose,
  stages,
  activeStage,
}: {
  open: boolean,
  onClose: () => void,
  stages: Tournament['stages'],
  activeStage: Tournament['stages'][number] | null,
}) {
  const { id: tournamentId } = useParams<{ id: string }>();

  const [selectedStage, setSelectedStage] = useState<number | null>(activeStage?.id ?? null);

  const [setActiveStage, { isLoading, isSuccess, reset }] = useSetActiveStageMutation();

  useEffect(() => {
    if (isSuccess) {
      onClose();

      reset();
    }
  }, [isSuccess, onClose]);

  return (
    <Dialog
      PaperProps={{
        sx: {
          maxWidth: 600,
          width: '100%',
        },
      }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Выбрать активный этап

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box py={1}>
          <Box mb={2}>
            <Typography>
              Текущий активный этап:
              {' '}
              {activeStage?.name || 'Не выбран'}
            </Typography>
          </Box>

          <FormControl sx={{ mb: 2 }} fullWidth>
            <InputLabel>Этап</InputLabel>
            <Select
              value={selectedStage}
              label="Этап"
              onChange={(e) => setSelectedStage(e.target.value as number)}
            >
              {stages?.map((stage) => (
                <MenuItem
                  key={stage.id}
                  value={stage.id}
                  disabled={stage.id === activeStage?.id}
                >
                  {stage.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => setActiveStage({
              tournamentId: Number(tournamentId),
              stageId: selectedStage ?? 0,
            })}
            disabled={!selectedStage}
            loading={isLoading}
          >
            Сохранить
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default SetActiveStage;
