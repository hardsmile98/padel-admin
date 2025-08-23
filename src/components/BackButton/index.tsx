import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function BackButton({ url }: { url?: string }) {
  const navigate = useNavigate();

  return (
    <Button
      variant="text"
      onClick={() => {
        if (url) {
          navigate(url);
        } else {
          navigate(-1);
        }
      }}
      startIcon={<ArrowBackIcon />}
      color="inherit"
    >
      Назад
    </Button>
  );
}

export default BackButton;
